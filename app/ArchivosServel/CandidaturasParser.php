<?php

namespace Votaconsciente\ArchivosServel;

use Votaconsciente\Territorio;
use Votaconsciente\Eleccion;
use Votaconsciente\Candidato;
use Illuminate\Support\Facades\DB;

class CandidaturasParser extends FileParser
{

    //Las elecciones que contiene este proceso
    protected $elecciones = null;

    public function __construct()
    {
        $parserTerritorio = new Parser(
            Territorio::class, 'servel_candidaturas', 'nombre', 'territorio',
             ['territorio as nombre', 'tipo as eleccion_n']);
        $parserTerritorio->setCreatedCallback($this->associate());
        $parserCandidato = new Parser(
            Candidato::class, 'servel_candidaturas', 'nombre', 'nombre_candidato',
            ['nombre_candidato as nombre', 'partido_politico', 'tipo as eleccion_n']);
        $parserCandidato->setCreatedCallback($this->associate());
        $this->addParser(Eleccion::class,
            new Parser(Eleccion::class, 'servel_candidaturas', 'tipo', 'tipo'));
        $this->addParser(Territorio::class, $parserTerritorio);
        $this->addParser(Candidato::class, $parserCandidato);
    }

    protected function associate()
    {
        //$cot es un modelo de Candidato o un Territorio
        return function($cot, $attrs = []){
            if($this->elecciones == null){
                $this->elecciones = $this->adds(Eleccion::class)
                    ->concat($this->exists(Eleccion::class));
            }

            $cot->elecciones->put(0,
                $this->elecciones->first(function($eleccion) use($attrs){
                    return $attrs['eleccion_n'] == $eleccion->tipo;
                })
            );

        };
    }

    public function save()
    {
        $q = DB::transaction(function($db) {
            $this->adds(Eleccion::class)->each(function($e){
                $e->save();
            });
            $setEleccion = function($cot){
                $this->associate()($cot, ['eleccion_n' => $cot->elecciones->first()->tipo]);
                $cot->save();
                $cot->elecciones()->sync($cot->elecciones->map(function($eleccion){
                    return $eleccion->id;
                })->toArray());
            };
            $this->adds(Territorio::class)->each($setEleccion);
            $this->adds(Candidato::class)->each($setEleccion);
            $this->getUltimoArchivo()->update(['processed' => true]);
        });
        //return back();
    }

}
