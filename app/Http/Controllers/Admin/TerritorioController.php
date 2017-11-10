<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Territorio;

class TerritorioController extends ModelController
{

    public function __construct()
    {
        parent::__construct(Territorio::class);
        $this->viewAdd('list', 'admin.territorios.list');
        $this->viewAdd('add', 'admin.territorios.add');
        $this->viewAdd('update', 'admin.territorios.update', true);
    }

    public function listView(Request $r, $view_data = null)
    {
        if(is_null($view_data)){
            $view_data = $this->views['list'];
        }
        $territorios = $this->pagination($r, Territorio::query());

        return view($view_data['view'])->with(compact('territorios'));
    }

    public function add(Request $r)
    {
        $this->validate($r, [
            'nombre' => 'required|max:255|unique:territorios,nombre'
        ],[
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'La cantidad de caracteres debe ser :max maximo.',
            'nombre.unique' => 'El nombre ya existe.'
        ]);

        $territorio = new Territorio;
        $territorio->nombre = $r->nombre;

        $territorio->save();

        return $this->success();
    }

    public function update(Request $r, $id)
    {
        $territorio = $this->validateExists($r, $id, [
            'nombre' => 'required|max:255|unique:territorios,nombre',
            'circunscripciones' => 'array'
        ]);

        $territorio->nombre = $r->nombre;
        $territorio->save();

        if($r->has('circunscripciones')){
            $territorio->circunscripciones()->sync($r->circunscripciones);
        }

        return $this->success();

    }

    public function delete(Request $r, $id)
    {
        $territorio = $this->validateExists($r, $id);
        $territorio->delete();

        return $this->success();
    }

}
