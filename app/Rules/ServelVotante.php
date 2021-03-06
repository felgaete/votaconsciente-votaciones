<?php

namespace Votaconsciente\Rules;

use Illuminate\Contracts\Validation\Rule;
use Votaconsciente\ServelVotante as VotanteServel;
use Votaconsciente\Votante;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class ServelVotante implements Rule
{

    protected $message;

    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        //Si el rut esta vacio se permite
        //ya que es la regla required que debe hacer esta pega
        if(empty($value)){
            return true;
        }
        //En este punto, $value es el rut del usuario en el formato XX.XXX.XXX-X
        //Primero se obtiene de la tabla votantes el rut dado
        $votante = Votante::where('ci', $value)->first();

        if(!is_null($votante) && $votante->user_id){
            //El votante obtenido dentro de la validacion, ya tiene un
            //usuario asociado, lo que significa que el no tiene el rut
            //en la tabla de usuarios esto no deberia ocurrir dentro de la aplicacion
            //pero por seguridad se agrega
            $this->message = 'El rut ingresado ya fue utilizado.';
            return false;
        }

        if(is_null($votante)){
            //Luego se busca en la tabla servel_votantes
            $votante = VotanteServel::where('ci', $value)->first();
            if(is_null($votante)){
                //Si no se encuentra en la tabla del servel, se busca en la
                //tabla votante_data
                $votante = DB::query()->from('votantes_data')->where('ci', $value)->first();
            }
        }

        if(is_null($votante)){
            //No se encontro ni en las cargas del sistema, ni la carga masiva
            $this->message = 'no-vote';
            return false;
        }
        session(['validation.votante' => $votante]);
        return true;

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return $this->message;
    }
}
