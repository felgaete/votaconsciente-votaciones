<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Candidato;

class CandidatoController extends ModelController
{

    public function __construct()
    {
        parent::__construct(Candidato::class);
        $this->viewAdd('list', 'admin.candidatos.list');
        $this->viewAdd('add', 'admin.candidatos.add');
        $this->viewAdd('update', 'admin.candidatos.update', true);
    }

    public function listView(Request $r, $view = null)
    {
        if(is_null($view)){
            $view = $this->views['list'];
        }

        $candidatos = $this->pagination($r, Candidato::query());

        return view($view['view'])->with(compact('candidatos'));

    }

    public function add(Request $r)
    {
        $this->validate($r, [
            'nombre' => 'required|max:255|unique:candidatos,nombre',
            'partido_politico' => 'max:255'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'nombre.unique' => 'El nombre ya existe.',
            'partido_politico' => 'El partido politico no debe superar los :max caracteres.'
        ]);

        $candidato = new Candidato;
        $candidato->nombre = $r->nombre;
        $candidato->partido_politico = $r->partido_politico;
        $candidato->candidato_consciente = $r->consciente == '1';

        $candidato->save();

        return $this->success();
    }

    public function update(Request $r, $id)
    {
        $candidato = $this->validateExists($r, $id, [
            'nombre' => 'required|max:255|unique:candidatos.nombre',
            'partido_politico' => 'max:255',
            'consciente' => 'required|boolean'
        ], [
            'nombre.required' => 'Debes ingresar un nombre.',
            'nombre.max' => 'El nombre no debe superar los :max caracteres.',
            'nombre.unique' => 'El nombre ya existe.',
            'partido_politico' => 'El partido politico no debe superar los :max caracteres.',
            'consciente.required' => 'Debes indicar si el candidato es un candidato consciente.'
        ]);

        $candidato->nombre = $r->nombre;
        $candidato->partido_politico = $r->partido_politico;
        $candidato->candidato_consciente = $r->has('consciente');

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
