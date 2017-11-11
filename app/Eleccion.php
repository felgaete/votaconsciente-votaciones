<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Eleccion extends Model
{

    protected $table = 'elecciones';

    protected $fillable = ['tipo'];

    public function votacion()
    {
        return $this->belongsTo(Votacion::class);
    }

    public function territorios()
    {
        return $this->belongsToMany(Territorio::class, 'territorio_electoral');
    }

    public function candidaturas()
    {
        return $this->hasMany(Candidatura::class);
    }

}
