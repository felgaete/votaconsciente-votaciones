<?php

namespace Votaconsciente\Http\Controllers;

use Illuminate\Http\Request;

class VotacionController extends Controller
{

  public function __construct()
  {
    $this->middleware('auth');
  }

  public function index()
  {
    return view('votacion.votar');
  }

  public function habilitar()
  {
    return view('votacion.habilitar');
  }

}
