<?php

namespace Votaconsciente\Http\Controllers\Votante;

use Illuminate\Http\Request;
use Votaconsciente\Http\Controllers\FrontController as Controller;
use Votaconsciente\Votante;

class VotanteController extends Controller
{
    public function edit()
    {
        return view('votante.edit');
    }

    public function update()
    {
        throw new \NotImplementedException;
    }

    public function habilitarView()
    {
        return view('votante.habilitar');
    }

    public function habilitar(Request $r)
    {
        //@TODO modificar $r->ci para que transforme el CI al formato esperado
        //por la base de datos (\d{1,3}\.)+\-[0-9k|K]
        $user = $r->user();
        if($user->votante){
            return redirect()->route('votante-edit');
        }
        $votante = Votante::whereCi($r->ci)->first();
        if($votante){
            $votante->user()->associate($user);
            $votante->save();
            return redirect()->route('votante-edit')->with(['success' => true]);
        }
        return back()->withErrors(['No se pudo asociar el rut a un votante valido.']);
    }
}
