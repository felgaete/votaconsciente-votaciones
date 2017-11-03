<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class ServelCandidatura extends Model
{
    protected $table = 'servel_candidaturas';

    protected $fillable = [
        'tipo', 'region', 'territorio', 'lista', 'pacto', 'subpacto', 'nvoto',
        'nombre_candidato', 'partido_politico', 'servel_archivo_id'
    ];

    public $timestamps = false;

    public function archivo()
    {
        return $this->belongsTo(ServelArchivo::class);
    }
}
