<?php

namespace Votaconsciente\Listeners;

use Illuminate\Auth\Events\Registered;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Votaconsciente\Votante;
use Votaconsciente\ServelVotante;
use Votaconsciente\Circunscripcion;
use Votaconsciente\Territorio;

class VotanteRegistradoListener
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $nuevoVotante = null;
        if($votante = session('validation.votante')){
            if(!($votante instanceof Votante)){
                //Existe un votante en sesion que no esta creado
                $circunscripcion = Circunscripcion
                ::where('circunscripcion', $votante->circunscripcion)->firstOrNew([
                    'circunscripcion' => $votante->circunscripcion
                ]);
                $territorio = null;
                if(!$circunscripcion->exists){
                    //Si la circunscripcion no existe se asocia al territorio nacional
                    //para no tener que hacerlo manualmente
                    $territorio = Territorio::where('nombre', 'NACIONAL')->first();
                }
                $circunscripcion->save();
                if(!is_null($territorio)){
                    $circunscripcion->territorios()->sync([$territorio->id]);
                }
                $nuevoVotante = new Votante([
                    'ci' => $votante->ci
                ]);
                $nuevoVotante->circunscripcion_id = $circunscripcion->id;
                $nuevoVotante->save();
            }else{
                $nuevoVotante = $votante;
            }
        }
        $event->user->habilitarVoto($nuevoVotante);
    }
}
