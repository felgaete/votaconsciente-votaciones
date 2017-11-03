<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Circunscripcion extends Model
{
    protected $table = 'circunscripciones';

    protected $fillable = ['circunscripcion'];

    public function votantes()
    {
        return $this->hasMany(Votante::class);
    }

    public function territorios()
    {
        return $this->belongsToMany(Territorio::class);
    }
}
