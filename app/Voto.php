<?php

namespace Votaconsciente;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Voto extends Model
{
    public function candidatura()
    {
        return $this->belongsTo(Candidatura::class);
    }

    public function votante()
    {
        return $this->belongsTo(Votante::class);
    }

    public function circunscripcion()
    {
        return $this->belongsTo(Circunscripcion::class);
    }

    public function anular()
    {
        DB::transaction(function(){
            $anulacion = new VotoAnulado;
            $anulacion->candidatura_id = $this->candidatura_id;
            $anulacion->votante_id = $this->votante_id;
            $anulacion->circunscripcion_id = $this->circunscripcion_id;
            $this->delete();
            $anulacion->save();
        });
    }
}
