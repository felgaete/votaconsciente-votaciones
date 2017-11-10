<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Http\Controllers\Controller;
use Votaconsciente\Circunscripcion;

class CircunscripcionController extends Controller
{

    private $views = [
        'list' => [
            'view' => 'admin.circunscripciones.list',
            'id_required' => false
        ],
        'add' => [
            'view' => 'admin.circunscripciones.add',
            'id_required' => false
        ],
        'update' => [
            'view' => 'admin.circunscripciones.update',
            'id_required' => true
        ]
    ];

    public function view(Request $r, $section, $id = null)
    {
        if(!array_key_exists($section, $this->views)){
            return abort(404);
        }

        $view = $this->views[$section];

        if(method_exists($this, $section.'View')){
            return $this->{$section}($r, $view);
        }

        if($view['id_required'] && is_null($id)){
            return abort(404);
        }

        $circunscripcion = null;
        if($id){
            $circunscripcion = Circunscripcion::findOrFail($id);
        }

        return view($view['view'])->with(compact('circunscripcion'));
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

    protected function success()
    {
        return back()->with(['success' => true]);
    }

    protected function pagination(Request $r, $query, $items = 10)
    {
        if($r->has('paginate'))
        {
            $items = $r->get('items', $items);
            return $query->paginate($items);
        }
        return $query;
    }

}
