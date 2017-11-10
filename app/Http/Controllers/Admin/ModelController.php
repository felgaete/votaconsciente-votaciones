<?php

namespace Votaconsciente\Http\Controllers\Admin;

use Illuminate\Http\Request;
use Votaconsciente\Http\Controllers\Controller;

abstract class ModelController extends Controller
{
    protected $views = [];
    protected $model = null;

    public function __construct($model = null)
    {
        $this->model = $model;
    }

    public function addView($name, $view, $required_id = false)
    {
        $this->views[$name] = [
            'view' => $view,
            'required_id' => $required_id
        ];
    }

    public function view(Request $r, $section, $id = null)
    {
        if(!array_key_exists($section, $this->views)){
            return abort(404);
        }

        $view = $this->views[$section];

        if(method_exists($this, $section.'View')){
            return $this->{$section}($r, $view);
        }

        if($view['required_id'] && is_null($id)){
            return abort(404);
        }

        $model = null;
        if($id){
            $model = ($this->model)::findOrFail($id);
        }

        return view($view['view'])->with(compact('model'));
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
        return $query->get();
    }

    protected function validateExists(Request $r, $id,
                                            $add_rules = [], $messages = [])
    {
        $this->validate($r, array_merge([
            'id' => "required|integer|exists:".($this->model)::table()."|in:$circunscripcion_id"
        ], $add_rules), $messages);
        return ($this->model)::findOrFail($circunscripcion_id);
    }

}
