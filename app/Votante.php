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

    public function votos(Eleccion $eleccion = null)
    {
        if($eleccion){
            return $this->votos()->whereHas('candidatura',
                function($builder) use($eleccion){
                    return $builder->where('eleccion_id', $eleccion->id);
                }
            );
        }else{
            return $this->hasMany(Voto::class);
        }
    }

    public function voto(Eleccion $eleccion, Territorio $territorio)
    {
        return $this->votos($eleccion)->whereHas('candidatura',
            function($builder) use($territorio){
                return $builder->where('territorio_id', $territorio->id);
            }
        );
    }
}
