<?php

namespace Votaconsciente\Http\Controllers\Votacion;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Votaconsciente\Http\Controllers\FrontController as Controller;
use Votaconsciente\Votacion;
use Votaconsciente\Eleccion;

class VotacionController extends Controller
{

    public function principal()
    {
        $votacion = Votacion::where('principal', true)->first();

        return view('votaciones.main')->with(compact('votacion'));
    }

    public function votacion(Request $r, $votacion_id)
    {
        $votacion = Votacion::findOrFail($votacion_id);

        return view('votaciones.votacion')->with(compact('votacion'));
    }

    public function eleccion($votacion_id, $eleccion_id)
    {
        $eleccion = Eleccion::where('votacion_id', $votacion_id)
            ->findOrFail($eleccion_id);
        return view('votaciones.eleccion', compact('eleccion'));
    }

    public function votar(Request $r, $votacion_id, $eleccion_id)
    {
        
    }

}
