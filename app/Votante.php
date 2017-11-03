<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Votante extends Model
{

    protected $fillable = ['ci'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function circunscripcion()
    {
        return $this->belongsTo(Circunscripcion::class);
    }

    public function votos()
    {
        return $this->belongsToMany(EleccionCandidato::class);
    }
}
