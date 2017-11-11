<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class VotoAnulado extends Model
{

    protected $table = 'votos_anulados';

    public function votante()
    {
        return $this->belongsTo(Votante::class);
    }

    public function candidatura()
    {
        return $this->belongsTo(Candidatura::class);
    }

    public function circunscripcion()
    {
        return $this->belongsTo(Circunscripcion::class);
    }

}
