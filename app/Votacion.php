<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Votacion extends Model
{
    public function elecciones()
    {
        return $this->hasMany(Eleccion::class);
    }

    
}
