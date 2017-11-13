<?php

namespace Votaconsciente\Http\Controllers\Votacion;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\DB;
use Votaconsciente\Http\Controllers\FrontController as Controller;
use Votaconsciente\Votacion;
use Votaconsciente\Eleccion;
use Votaconsciente\Candidatura;
use Votaconsciente\Voto;
use Votaconsciente\Territorio;

class VotacionController extends Controller
{

    public function principal()
    {
        $votaciones = Votacion::activas()->get();

        return view('votaciones.main')->with(compact('votaciones'));
    }

    public function votacion(Request $r, $votacion_id)
    {
        $votacion = Votacion::findOrFail($votacion_id);

        return view('votaciones.votacion')->with(compact('votacion'));
    }

    public function eleccion($votacion_id, $eleccion_id)
    {

        $votacion = Votacion::with(['elecciones' => function($builder) use($eleccion_id){
            return $builder->where('id', '<>', $eleccion_id);
        }])->findOrFail($votacion_id);

        $eleccion = Eleccion::where('votacion_id', $votacion_id)
            ->with(['candidaturas.politico', 'candidaturas.territorio'])
            ->findOrFail($eleccion_id);

        $votar = function(Territorio $territorio) use($eleccion){
            return Gate::allows('votar-territorio-electoral', [$eleccion, $territorio]);
        };
        $votos = collect();
        if(Auth::user()->votante){
            $votos = Auth::user()->votante->votos($eleccion)->get();
        }
        return view('votaciones.eleccion', compact('eleccion', 'votacion',
            'votos', 'votar'));
    }

    public function votar(Request $r)
    {
        $candidatura = Candidatura::findOrFail($r->candidatura);

        $this->authorize('votar', $candidatura);

        $voto = new Voto;
        $votante = $r->user()->votante;
        $circunscripcion = $votante->circunscripcion;

        $voto->votante()->associate($votante);
        $voto->circunscripcion()->associate($circunscripcion);
        $voto->candidatura()->associate($candidatura);

        $voto->save();

        return back()->with(['voto' => true]);

    }

    public function anular(Request $r)
    {
        $voto = Voto::findOrFail($r->voto);
        $this->authorize('anular', $voto);

        $voto->anular();

        return back()->with(['anular' => true]);

    }

}
