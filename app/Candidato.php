<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Candidato extends Model
{

    protected $fillable = ['nombre', 'partido_politico'];

    public function elecciones()
    {
        return $this->belongsToMany(Eleccion::class, 'elecciones_candidatos');
    }

}
