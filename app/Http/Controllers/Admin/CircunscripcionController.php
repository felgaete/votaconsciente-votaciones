<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Circunscripcion;

class CircunscripcionController extends ModelController
{

    public function __construct()
    {
        parent::__construct(Circunscripcion::class);
        $this->addView('list', 'admin.circunscripciones.list');
        $this->addView('add', 'admin.circunscripciones.add');
        $this->addView('update', 'admin.circunscripciones.update');
    }

    public function add(Request $r)
    {
        $this->validate($r, [
            'nombre' => 'required|max:255|unique:circunscripciones.circunscripcion'
        ],[
            'nombre.required' => 'Debes indicar un nombre.',
            'nombre.max' => 'La cantidad de caracteres debe ser {max} maximo.',
            'nombre.unique' => 'El nombre ya existe.'
        ]);

        $circunscripcion = new Circunscripcion;
        $circunscripcion->circunscripcion = $r->nombre;

        $circunscripcion->save();

        return success();

    }

    public function update(Request $r, $circunscripcion_id)
    {
        $circunscripcion = $this->validateExists($r, $circunscripcion_id, [
            'nombre' => 'required|max:255|unique:circunscripciones.circunscripcion',
            'territorios' => 'array'
        ], [
            'nombre' => 'El nombre ya existe.'
        ]);
        $circunscripcion->circunscripcion = $r->nombre;

        $circunscripcion->save();
        if($r->has('territorios')){
            $circunscripcion->territorios()->sync($r->territorios);
        }

        return success();
    }

    public function listView(Request $r, $view_data = null)
    {
        if(is_null($view_data)){
            $view_data = $this->views['list'];
        }
        $query = $this->pagination($r, Circunscripcion::query());
        $circunscripciones = $query->get();
        return view($view_data['view'])->with(compact('circunscripciones'));
    }

    public function delete(Request $r, $circunscripcion_id)
    {
        $circunscripcion = $this->validateExists($r, $circunscripcion_id);
        $circunscripcion->delete();

        return success();
    }

    protected function validateExists(Request $r, $circunscripcion_id,
                                            $add_rules = [], $messages = [])
    {
        $this->validate($r, array_merge([
            'id' => "required|integer|exists:circunscripciones|in:$circunscripcion_id"
        ], $add_rules), $messages);
        return Circunscripcion::findOrFail($circunscripcion_id);
    }

}
