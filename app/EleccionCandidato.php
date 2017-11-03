<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class EleccionCandidato extends Model
{
    protected $table = 'elecciones_candidatos';

    public function votantes()
    {
        return $this->belongsToMany(Votante::class, 'votos');
    }

    public function eleccion()
    {
        return $this->hasOne(Eleccion::class);
    }

    public function candidato()
    {
        return $this->hasOne(Candidato::class);
    }
}
