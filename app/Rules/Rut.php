<?php

namespace Votaconsciente\Rules;

use Illuminate\Contracts\Validation\Rule;
use Illuminate\Support\Str;

class Rut implements Rule
{
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
        if(strlen($value) === 0){
            return true;
        }
        if(!preg_match("/^(\d{1,3})(\.\d{3})*\-[\d|k|K]$/", $value)){
            return false;
        }

        try{
            $value = str_replace('.', '', $value);
            $d = preg_split('/\-/', $value);
            if(count($d) !== 2){
                return false;
            }
            $rut = $d[0];
            $dv = $d[1];
            $sum = 0;
            $j = 2;
            for($i = strlen($rut) - 1; $i >= 0; $i--){
                $sum += $j * $rut[$i];
                $j++;
                if($j == 8){
                    $j = 2;
                }
            }

            $dvr = 11 - $sum % 11;
            if($dvr == 10){
                $dvr = 'K';
            }else if($dvr == 11){
                $dvr = '0';
            }else{
                $dvr = (string)$dvr;
            }
            return strtoupper($dv) === $dvr;

        }catch(\Exception $e){
            return false;
        }

    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'El rut que ingresaste no es válido. Debe ser en el formato XX.XXX.XXX-X.';
    }
}
