<?php

namespace Votaconsciente\Http\Controllers\Resultados;

use Illuminate\Http\Request;
use Votaconsciente\Http\Controllers\Controller;
use Votaconsciente\Votacion;
use Votaconsciente\Eleccion;

class ResultadosController extends Controller
{
    public function principal()
    {
        $votaciones = Votacion::activas()->with('elecciones')->get();
        return view('resultados.main', compact('votaciones'));
    }

    public function eleccion($eleccion_id)
    {
        $eleccion = Eleccion::with(['candidaturas', 'candidaturas.politico', 'candidaturas.resultado'])
            ->findOrFail($eleccion_id);

        return $eleccion;
    }
}
