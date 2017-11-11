<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Candidatura extends Model
{

    public function votantes()
    {
        return $this->belongsToMany(Votante::class, 'votos');
    }

    public function territorio()
    {
        return $this->belongsTo(Territorio::class);
    }

    public function politico()
    {
        return $this->belongsTo(Politico::class);
    }

    public function eleccion()
    {
        return $this->belongsTo(Eleccion::class);
    }
}
