<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Votacion;

class VotacionController extends ModelController
{

    public function __construct()
    {
        parent::__construct(Votacion::class);
        $this->viewAdd('list', 'admin.votaciones.list');
        $this->viewAdd('add', 'admin.votaciones.add');
        $this->viewAdd('update', 'admin.votaciones.update', true);
    }

    public function listView(Request $r, $view = null)
    {
        if(is_null($view)){
            $view = $this->views['list'];
        }

        $votaciones = $this->pagination($r, Votacion::query());

        return view($view['view'])->with(compact('votaciones'));

    }

    public function add(Request $r)
    {
        $this->validate($r, [
            'nombre' => 'required|max:255|unique:candidatos.votaciones'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'nombre.unique' => 'El nombre ya existe.'
        ]);

        $votacion = new Votacion;
        $votacion->nombre = $r->nombre;

        $votacion->save();

        return success();
    }

    public function update(Request $r, $id)
    {
        $votacion = $this->validateExists($r, $id, [
            'nombre' => 'required|max:255|unique:candidatos.votaciones'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'nombre.unique' => 'El nombre ya existe.'
        ]);

        $votacion->nombre = $r->nombre;

        $votacion->save();

        return success();
    }

    public function delete(Request $r, $id)
    {
        $votacion = $this->validateExists($r, $id);

        $votacion->delete();

        return success();
    }
}
