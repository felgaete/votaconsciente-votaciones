<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;

class ServelVotante extends Model
{
    protected $table = 'servel_votantes';

    public $timestamps = false;

    protected $fillable = [
      'nombre', 'ci', 'sexo', 'domicilio', 'circunscripcion', 'mesa', 'servel_archivo_id'
    ];

    public function archivo()
    {
        return $this->belongsTo(ServelArchivo::class);
    }

}
