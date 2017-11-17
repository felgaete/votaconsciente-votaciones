<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class ResultadoCandidatura extends Model
{
    protected $table = 'resultado_candidatura_view';

    public function candidatura()
    {
        return $this->belongsTo(Candidatura::class);
    }
}
