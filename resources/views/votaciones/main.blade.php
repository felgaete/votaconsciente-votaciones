@extends('layouts.app')
@section('title', 'Votaciones')
@section('content')
<div class="row">
    @forelse($votaciones as $votacion)
    <div class="card col s12 m4 l3">
        <span class="card-title">{{$votacion->nombre}}</span>
        <div class="card-action">
            @foreach($votacion->elecciones as $eleccion)
            <a class="blue-text center-align" href=" {{ route('votacion-eleccion-view', [$votacion->id, $eleccion->id]) }}">{{$eleccion->tipo}}</a>
            @endforeach
        </div>
    </div>
    @empty
    <div class="col s12">
        <h1 class="center-align">No hay votaciones activas</h1>
    </div>
    @endforelse
</div>

@endsection
