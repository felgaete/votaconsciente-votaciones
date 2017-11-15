<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class ServelArchivo extends Model
{
    protected $table = 'servel_archivos';

    protected $guarded = ['id'];

    const PADRON_ELECTORAL_TYPE = 'padron_electoral';
    const CANDIDATURAS_TYPE = 'candidaturas';

    public function votantes()
    {
        return $this->hasMany(Votaconsciente\ServelVotante);
    }

    public function candidaturas()
    {
        return $this->hasMany(Votaconsciente\ServelCandidatura);
    }
}
