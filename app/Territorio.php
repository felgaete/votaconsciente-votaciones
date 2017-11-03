<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Territorio extends Model
{
    public function circunscripciones()
    {
        return $this->belongsToMany(Circunscripcion::class);
    }

    public function elecciones()
    {
        return $this->belongsToMany(Eleccion::class);
    }
}
