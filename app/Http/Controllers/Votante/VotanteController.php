<?php

namespace Votaconsciente\Http\Controllers\Votante;

use Illuminate\Http\Request;
use Votaconsciente\Http\Controllers\FrontController as Controller;
use Votaconsciente\Votante;
use Votaconsciente\Rules\Rut;

class VotanteController extends Controller
{
    public function edit(Request $r)
    {
        $user = $r->user();
        $conVoto = (bool)$user->votante;
        return view('votante.edit')->with(compact('user', 'conVoto'));
    }

    public function update(Request $r)
    {

        $this->validate($r, [
            'nombre' => 'required|max:255',
            'ci' => new Rut
        ],[
            'nombre.required' => 'Debes ingresar un nombre',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'ci' => 'Has ingresado un Rut no válido.'
        ]);

        $user = $r->user();
        $user->name = $r->nombre;
        $user->save();

        $habilitado = $this->habilitar($r);

        $result = back()->with(['editado' => 'Perfil editado']);
        if(is_null($habilitado)){
            return $result;
        }else if($habilitado){
            return $result->with(['habilitado' => true]);
        }else{
            return $result->withErrors('No se pudo habilitar el voto.');
        }

    }

    protected function habilitar(Request $r)
    {
        if(empty($r->ci)){
            return null;
        }
        //@TODO modificar $r->ci para que transforme el CI al formato esperado
        //por la base de datos (\d{1,3}\.)+\-[0-9k|K]
        $user = $r->user();
        if($user->votante){
            return;
        }
        $votante = Votante::whereCi($r->ci)->first();
        if($votante){
            $votante->user()->associate($user);
            $votante->save();
            return true;
        }
        return false;
    }
}
