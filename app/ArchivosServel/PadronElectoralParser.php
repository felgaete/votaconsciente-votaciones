<?php

namespace Votaconsciente\ArchivosServel;

use Votaconsciente\Circunscripcion;
use Votaconsciente\Votante;
use Votaconsciente\ServelArchivo;
use Illuminate\Support\Facades\DB;

class PadronElectoralParser extends FileParser
{

    protected $circunscripciones;

    public function __construct()
    {
        $c = new Parser(Circunscripcion::class, 'servel_votantes', 'circunscripcion', 'circunscripcion');
        $v = new Parser(Votante::class, 'servel_votantes', 'ci', 'ci', ['ci', 'circunscripcion as c_name']);
        $v->setCreatedCallback($this->associate());
        $v->setLoadedCallback($this->associate());
        $this->addParser(Circunscripcion::class, $c);
        $this->addParser(Votante::class, $v);
    }

    protected function associate()
    {
        //A los nuevos votantes se les asocia las circunscripciones existentes
        //o nuevas por nombre de circunscripcion, al array de Votante se le carga
        //un index circunscripcion_id que contiene el nombre para asociar al modelo
        return function($votante, $attrs = []){
            if($this->circunscripciones == null){
                $this->circunscripciones = $this->adds(Circunscripcion::class)
                    ->concat($this->exists(Circunscripcion::class));
            }
            $votante->circunscripcion()->associate($this->circunscripciones->first(
                function($circunscripcion) use($votante, $attrs){
                    return $circunscripcion->circunscripcion ==
                        ($attrs['c_name'] ?: $votante->c_name);
                })
            );
        };
    }

    public function save()
    {
        $q = DB::transaction(function($db) {
            $this->adds(Circunscripcion::class)->each(function($c){
                $c->save();
            });
            $this->adds(Votante::class)->each(function($v){
                $this->associate()($v, ['c_name' => $v->circunscripcion->circunscripcion]);
                $v->save();
            });
            $this->getUltimoArchivo()->update(['processed' => true]);
        });
    }

}
