<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Votacion extends Model
{

    protected $table = 'votaciones';

    protected $fillable = ['nombre'];

    public function elecciones()
    {
        return $this->hasMany(Eleccion::class);
    }

    public function scopeActivas($builder)
    {
        return $builder->where('activa', true);
    }


}
