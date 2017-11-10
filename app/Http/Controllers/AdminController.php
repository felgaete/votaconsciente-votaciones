<?php

namespace Votaconsciente\Http\Controllers;

use Illuminate\Http\Request;
use Votaconsciente\Circunscripcion;
use Votaconsciente\Territorio;

class AdminController extends Controller
{
    public function index()
    {
      return view('admin.index');
    }

    public function circunscripciones()
    {
        return view('admin.circunscripciones.list', [
            'circunscripciones' => Circunscripcion::all()
        ]);
    }

    public function territorios()
    {
        return view('admin.territorios.list', [
            'territorios' => Territorio::all(),
            'circunscripciones' => Circunscripcion::all()
        ]);
    }

    public function addCircunscripcionATerritorio(Request $r)
    {
        $territorio = Territorio::findOrFail($r->territorio);
        $circunscripcion_id = $r->circunscripcion;
        $territorio->circunscripciones()->attach($circunscripcion_id);
        return back();
    }
}
