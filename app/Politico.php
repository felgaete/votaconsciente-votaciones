<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class Politico extends Model
{

    protected $fillable = ['nombre', 'partido_politico'];

    public function candidaturas()
    {
        return $this->hasMany(Candidatura::class);
    }

}
