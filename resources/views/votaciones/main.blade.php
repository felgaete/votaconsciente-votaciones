@extends('layouts.app')
@section('title', 'Votaciones')
@section('content')
<h4>Votaciones activas.</h4>
<h6>Selecciona la elección en la que deseas indicarnos tu preferencia.</h6>
<div class="divider"></div>
<div class="row">
    <div class="section">
        @forelse($votaciones as $votacion)
        <div class="card col s12 m4 l3 vote">
            <div class="card-content">
                <span class="card-title">{{$votacion->nombre}}</span>
            </div>
            <div class="card-action">
                    @foreach($votacion->elecciones as $eleccion)
                    <div class="election">
                        <a class="btn white-text center-align" href=" {{ route('votacion-eleccion-view', [$votacion->id, $eleccion->id]) }}">{{$eleccion->tipo}}</a>
                    </div>
                    @endforeach
                </ul>
            </div>
        </div>
        @empty
        <div class="col s12">
            <div class="card-panel red">
                <h5 class="white-text">No existen votaciones activas en este momento.</h5>
            </div>
        </div>
        @endforelse
    </div>
</div>

@endsection
