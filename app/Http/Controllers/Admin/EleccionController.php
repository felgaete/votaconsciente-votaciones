<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Eleccion;
use Votaconsciente\Votacion;

class EleccionController extends ModelController
{
    public function __construct()
    {
        parent::__construct(Eleccion::class);
        $this->viewAdd('list', 'admin.elecciones.list');
        $this->viewAdd('add', 'admin.elecciones.add');
        $this->viewAdd('update', 'admin.elecciones.update', true);
    }

    public function listView(Request $r, $v = null)
    {
        if(is_null($v)){
            $v = $this->views['list'];
        }

        $elecciones = $this->pagination($r, Eleccion::query());

        return view($v['view'])->with(compact('elecciones'));
    }

    public function add(Request $r)
    {
        $this->validate($r, [
            'nombre' => 'required|max:255',
            'votacion' => 'required|exists:votaciones,id'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'votacion.required' => 'Debes indicar una votacion asociada.',
            'votacion.exists' => 'La votacion indicada no existe.'
        ]);

        $eleccion = new Eleccion;
        $eleccion->tipo = $r->nombre;
        $eleccion->votacion()->associate(Votacion::findOrFail($r->votacion));

        $eleccion->save();

        return $this->success();
    }

    public function update(Request $r, $id)
    {
        $eleccion = $this->validateExists($r, $id, [
            'nombre' => 'required|max:255',
            'votacion' => 'required|exists:votaciones,id'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'votacion.required' => 'Debes indicar una votacion asociada.',
            'votacion.exists' => 'La votacion indicada no existe.'
        ]);

        $candidato->nombre = $r->nombre;
        $eleccion->tipo = $r->nombre;
        $eleccion->votacion()->associate(Votacion::findOrFail($r->votacion));

        $candidato->save();

        return $this->success();
    }

    public function delete(Request $r, $id)
    {
        $candidato = $this->validateExists($r, $id);

        $candidato->delete();

        return $this->success();
    }
}
