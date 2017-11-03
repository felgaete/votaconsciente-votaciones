<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{

    public function elecciones()
    {
        return $this->belongsToMany(Votaconsciente\Eleccion);
    }

}
