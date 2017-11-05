<?php

namespace Votaconsciente\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Votaconsciente\Eleccion;
use Votaconsciente\Candidato;

class VotacionController extends Controller
{

  public function __construct()
  {
    $this->middleware('auth');
  }

  public function index()
  {
      return view('votacion.index');
  }

  public function votar($id = null)
  {
      $elecciones = Eleccion::all();
      $eleccion = false;
      if($id){
          $eleccion = Eleccion::findOrFail($id);
      }
      $candidatos = Candidato::query();
      if($eleccion){
          $candidatos->whereHas('elecciones', function($qb) use($eleccion){
              return $qb->where('eleccion_id', $eleccion->id);
          });
     };
     $candidatos = $candidatos->get();
     return view('votacion.votar', compact('elecciones', 'eleccion', 'candidatos'));
  }

  public function habilitar()
  {
    return view('votacion.habilitar');
  }

  public function postHabilitar(Request $r)
  {
      $resultado = Auth::user()->habilitarVoto($r->ci);
      if($resultado){
          return redirect()->route('votar')->with(['habilitado' => true]);
      }
      return redirect()->route('habilitar')->with(['habilitado' => false ]);
  }

}
