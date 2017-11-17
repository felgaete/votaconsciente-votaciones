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
        $votaciones = $this->resultados();
        return view('resultados.main', compact('votaciones'));
    }

    public function eleccion($eleccion_id)
    {
        $eleccion = Eleccion::with(['candidaturas', 'candidaturas.politico', 'candidaturas.resultado'])
            ->findOrFail($eleccion_id);

        return $eleccion;
    }

    public function eleccionFrame($eleccion_id)
    {
        $votaciones = $this->resultados();

        return view('resultados.votaciones', compact('votaciones'));
    }

    protected function resultados()
    {
        return Votacion::activas()->with([
            'elecciones',
            'elecciones.candidaturas' => function($builder){
                return $builder->join('resultado_candidatura_view as rc', 'rc.candidatura_id', '=', 'candidaturas.id')
                    ->orderBy('rc.votos', 'desc');
            },
            'elecciones.candidaturas.politico'
        ])->get();
    }
}
