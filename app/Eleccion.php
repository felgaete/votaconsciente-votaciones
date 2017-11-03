<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Eleccion extends Model
{

    public function votacion()
    {
        return $this->belongsTo(Votacion::class);
    }

    public function territorios()
    {
        return $this->belongsToMany(Territorio::class);
    }

    public function eleccionesCandidatos()
    {
        return $this->hasMany(EleccionCandidado::class);
    }
