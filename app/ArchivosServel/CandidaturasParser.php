<?php

namespace Votaconsciente\ArchivosServel;

use Votaconsciente\Territorio;
use Votaconsciente\Eleccion;
use Votaconsciente\Politico;
use Votaconsciente\Candidatura;
use Illuminate\Support\Facades\DB;

class CandidaturasParser extends FileParser
{

    //Las elecciones que contiene este proceso
    protected $elecciones = null;
    //Territorios del proceso
    protected $territorios = null;

    public function __construct()
    {
        //el parser de territorio obtiene los territorios del documento
        $parserTerritorio = new Parser(
            Territorio::class, 'servel_candidaturas', 'nombre', 'territorio',
             ['territorio as nombre', 'tipo as eleccion_n']
        );
        //Al encontrar un nuevo territorio, se asocia a la eleccion
        $parserTerritorio->setCreatedCallback($this->associateTerritorioEleccion());
        //el parser de politicos crea los politicos del archivo
        $parserPolitico = new Parser(
            Politico::class, 'servel_candidaturas', 'nombre', 'nombre_candidato',
            [
                'nombre_candidato as nombre', 'partido_politico',
                'tipo as eleccion_n', 'territorio as territorio_n'
            ]
        );

        //Al encontrar un nuevo politico, se asocia a la eleccion y territorio
        $parserPolitico->setCreatedCallback($this->associatePolitico());

        //Se agregan los parsers para eleccion, territorio y politicos
        $this->addParser(Eleccion::class,
            new Parser(Eleccion::class, 'servel_candidaturas', 'tipo', 'tipo')
        );
        $this->addParser(Territorio::class, $parserTerritorio);
        $this->addParser(Politico::class, $parserPolitico);
    }

    protected function associateTerritorioEleccion()
    {
        return function($territorio, $attrs = []){
            //Se toman todas las elecciones obtenidas del parseo
            if($this->elecciones == null){
                $this->elecciones = $this->adds(Eleccion::class)
                    ->concat($this->exists(Eleccion::class));
            }
            //Se asocia el territorio a la eleccion
            $territorio->elecciones->put(0,
                $this->elecciones->first(
                    function($eleccion) use($attrs){
                        return $attrs['eleccion_n'] == $eleccion->tipo;
                    }
                )
            );
        };
    }

    protected function associatePolitico()
    {
        return function($politico, $attrs = []){
            //Se toman todas las elecciones obtenidas del parseo
            if($this->elecciones == null){
                $this->elecciones = $this->adds(Eleccion::class)
                    ->concat($this->exists(Eleccion::class));
            }
            //Se toman todos los territorios obtenidos del parseo
            if($this->territorios == null){
                $this->territorios = $this->adds(Territorio::class)
                    ->concat($this->exists(Territorio::class));
            }
            //Se asocia el territorio y la eleccion al politico
            //a traves de una candidatura
            $candidatura = new Candidatura;
            $candidatura->politico()->associate($politico);
            $candidatura->eleccion()->associate($this->elecciones->first(
                function($eleccion) use($attrs){
                    return $attrs['eleccion_n'] == $eleccion->tipo;
                }
            ));
            $candidatura->territorio()->associate($this->territorios->first(
                function($territorio) use($attrs){
                    return $attrs['territorio_n'] == $territorio->nombre;
                }
            ));
            $politico->candidaturas->put(0, $candidatura);
        };
    }

    public function save()
    {
        DB::transaction(function($db) {
            $this->adds(Eleccion::class)->each(function($e){
                $e->save();
            });
            $setEleccion = function($t){
                $this->associateTerritorioEleccion()
                ($t, ['eleccion_n' => $t->elecciones->first()->tipo]);
                $t->save();
                $t->elecciones()->sync($t->elecciones->map(function($eleccion){
                    return $eleccion->id;
                })->toArray());
            };
            $this->adds(Territorio::class)->each($setEleccion);
            $this->adds(Politico::class)->each(function($p){
                $p->save();
                $this->associatePolitico()
                ($p, [
                    'eleccion_n' => $p->candidaturas->first()->eleccion->tipo,
                    'territorio_n' => $p->candidaturas->first()->territorio->nombre
                ]);
                $p->candidaturas->first()->save();
            });
            $this->getUltimoArchivo()->update(['processed' => true]);
        });
    }

}
