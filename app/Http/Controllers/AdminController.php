<?php

namespace Votaconsciente\Http\Controllers;

use Illuminate\Http\Request;
use Votaconsciente\Circunscripcion;

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
}
