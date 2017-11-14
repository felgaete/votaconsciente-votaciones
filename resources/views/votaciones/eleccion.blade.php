@extends('layouts.app')
@section('title',  'Elección ' . Illuminate\Support\Str::title($eleccion->tipo) . ' - ' . $votacion->nombre)
@section('content')
<h4>Elección {{ Illuminate\Support\Str::title($eleccion->tipo) }}</h4>
<div class="divider"></div>
@empty(Auth::user()->votante)
<div class="card-panel red white-text">
  No puedes votar hasta que modifiques tu perfil.<br>
  Puedes realizar esta acción <a class="white-text" style="text-decoration: underline;" href="{{ route('votante-edit') }}">aquí</a>
</div>
@endempty
@foreach($eleccion->candidaturas->groupBy('territorio_id') as $group)
@if($group->first() && ($territorio = $group->first()->territorio))
<?php $canVotar = $votar($territorio); ?>
<div class="section">
    <h5>Territorio {{Illuminate\Support\Str::title($territorio->nombre)}}</h5>
    @if(session('voto'))
    <div class="card-panel green white-text">
        Se ha ingresado tu voto, si deseas puedes anularlo presionando el botón
        junto al candidato por el que has votado.
    </div>
    @endif
    @if(session('anular'))
    <div class="card-panel green white-text">
        Se ha anulado tu voto
    </div>
    @endif
    @foreach($group->chunk(3) as $candidatura_group)
    <div class="row">
        @foreach($candidatura_group as $candidatura)
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img class="card-img-top responsive-img" src="{{$candidatura->politico->imagen}}" alt="">
                    @if($canVotar)
                    <form action="{{route('votacion-votar')}}" method="post">
                        {{csrf_field()}}
                        <input type="hidden" name="candidatura" value="{{$candidatura->id}}">
                        <button type="submit" class="btn-large btn-floating halfway-fab waves-effect waves-light green"
                            data-position="bottom" data-delay="50" data-tooltip="Vota por este candidato">
                            <i class="material-icons">thumb_up</i>
                        </button>
                    </form>
                    @elseif($voto = $votos->where('candidatura_id', $candidatura->id)->first())
                    <form method="post" action="{{route('votacion-anular')}}">
                        {{csrf_field()}}
                        <input type="hidden" name="voto" value="{{$voto->id}}">
                        <button type="submit" class="btn-floating btn-large halfway-fab waves-effect waves-light red"
                            data-position="bottom" data-delay="50" data-tooltip="Anula tu voto">
                            <i class="material-icons">thumb_down</i>
                        </button>
                    </form>
                    @endif
                </div>
                <div class="card-content">
                    <span class="card-title">{{Illuminate\Support\Str::title($candidatura->politico->nombre)}}</span>
                    <p>{{$candidatura->politico->partido_politico}}</p>
                    <div class="card-action">
                        <a class="blue-text" href="{{$candidatura->politico->url}}" target="_top">+ información</a>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
    @endforeach
</div>
@endif
@endforeach
@endsection
