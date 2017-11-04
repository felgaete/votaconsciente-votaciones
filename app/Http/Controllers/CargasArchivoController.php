<?php

namespace Votaconsciente\Http\Controllers;

use Illuminate\Http\Request;
use Votaconsciente\ServelArchivo;
use Votaconsciente\Jobs\ProcessPadronElectoralFileJob;
use Votaconsciente\Jobs\ProcessCandidaturasFileJob;
use Votaconsciente\ArchivosServel\PadronElectoralParser;
use Votaconsciente\ArchivosServel\CandidaturasParser;
use Votaconsciente\Circunscripcion;
use Votaconsciente\Votante;
use Votaconsciente\Territorio;
use Votaconsciente\Eleccion;
use Votaconsciente\Candidato;
use Votaconsciente\Votacion;

class CargasArchivoController extends Controller
{

    public function index()
    {
      return view('admin.cargas.index', ['archivos' => ServelArchivo::all()]);
    }

    protected function csvRules($inputName)
    {
      return [[
        $inputName => 'required|file|mimes:csv,txt'
      ], [
        "$inputName.required" => 'Se debe indicar un archivo.',
        "$inputName.file" => 'Se debe indicar un archivo.',
        "$inputName.mimes" => 'El archivo debe ser un archivo csv.'
      ]];
    }

    public function cargaPadronElectoral(Request $request)
    {
      $request->validate(...$this->csvRules('pefile'));

      $file = $request->file('pefile');
      $separador = $request->separador;
      if($separador == ''){
          $separador = ',';
      }
      return $this->saveFileEjecuteJob($file, ServelArchivo::PADRON_ELECTORAL_TYPE, $separador, ProcessPadronElectoralFileJob::class);
    }

    public function cargaCandidaturas(Request $request)
    {
      $request->validate(...$this->csvRules('cdfile'));

      $file = $request->file('cdfile');
      $separador = $request->separador;
      if($separador == ''){
          $separador = ',';
      }

      return $this->saveFileEjecuteJob($file, ServelArchivo::CANDIDATURAS_TYPE, $separador, ProcessCandidaturasFileJob::class);
    }

    protected function saveFileEjecuteJob($file, $fileType, $separador, $jobClass)
    {
        $path = $file->store('csv');

        $archivoServel = ServelArchivo::create([
          'name' => $file->getClientOriginalName(),
          'path' => $path,
          'type' => $fileType
        ]);

        $jobClass::dispatch($archivoServel, $separador);
        return back()->with(['message' => 'Archivo cargado con éxito.']);
    }

    protected function getParser(ServelArchivo $archivo)
    {
        if($archivo->type == ServelArchivo::PADRON_ELECTORAL_TYPE){
            $parser = new PadronElectoralParser();
        }else{
            $parser = new CandidaturasParser();
        }
        return $parser;
    }

    public function procesar($archivoId)
    {
        $archivo = ServelArchivo::findOrFail($archivoId);
        $parser = $this->getParser($archivo);
        $parser->parse($archivo);
        $view_data = [];
        if($archivo->type == ServelArchivo::PADRON_ELECTORAL_TYPE){
            $circunscripciones_nuevas = $parser->adds(Circunscripcion::class);
            $votantes_nuevos = $parser->adds(Votante::class);
            $circunscripciones_existentes = $parser->exists(Circunscripcion::class);
            $votantes_existentes = $parser->exists(Votante::class);
            $view_data = compact(
                "archivo", "circunscripciones_nuevas", "votantes_nuevos",
                "circunscripciones_existentes", "votantes_existentes"
            );
        }else{
            $territorios_nuevos = $parser->adds(Territorio::class);
            $territorios_existentes = $parser->exists(Territorio::class);
            $elecciones_nuevas = $parser->adds(Eleccion::class);
            $elecciones_existentes = $parser->exists(Eleccion::class);
            $candidatos_nuevos = $parser->adds(Candidato::class);
            $candidatos_existentes = $parser->exists(Candidato::class);
            $votaciones = Votacion::all();
            $view_data = compact(
                'archivo', 'territorios_nuevos', 'territorios_existentes',
                'elecciones_nuevas', 'elecciones_existentes',
                'candidatos_nuevos', 'candidatos_existentes',
                'votaciones'
            );
        }

        return view('admin.cargas.procesar', $view_data);
    }

    public function confirmarProcesar($id, Request $request)
    {
        if($id == $request->archivo)
        {
            $archivo = ServelArchivo::findOrFail($id);
            $parser = $this->getParser($archivo);
            if($archivo->type == ServelArchivo::CANDIDATURAS_TYPE){
                $votacion = Votacion::firstOrCreate(
                    ['id' => $request->votacion_id], ['nombre' => $request->votacion]
                );
                $parser->getParser(Eleccion::class)->setCreatedCallback(function($eleccion) use($votacion){
                    $eleccion->votacion()->associate($votacion);
                });
            }
            $parser->parse($archivo);
            $parser->save();
        }

        return back();
    }
}
