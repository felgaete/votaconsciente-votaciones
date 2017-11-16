@extends('layouts.app')
@section('title',  'Elección ' . Illuminate\Support\Str::title($eleccion->tipo) . ' - ' . $votacion->nombre)
@section('content')
<h4>Elección {{ Illuminate\Support\Str::title($eleccion->tipo) }}</h4>
<h6>Candidatos de la elección por territorio</h6>
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
        <strong>Gracias!</strong><br>
        Hemos registrado tu voto. Si lo deseas, puedes anular tu preferencia con el botón <i>"Anular mi voto"</i>.
    </div>
    @endif
    @if(session('anular'))
    <div class="card-panel green white-text">
        Se ha anulado tu voto
    </div>
    @endif
    <div class="row">
        @foreach($group as $candidatura)
        <div class="col s12 m6 l3">
            <div class="card candidate">
                <div class="card-image">
                    <img class="card-img-top responsive-img" src="{{$candidatura->politico->imagen}}" alt="">
                </div>
                <div class="card-content candidate-name valign-wrapper">
                    <span class="card-title flow-text">{{Illuminate\Support\Str::title($candidatura->politico->nombre)}}</span>
                    <p>{{$candidatura->politico->partido_politico}}</p>
                </div>
                <div class="card-action">
                    <div class="row">
                        <div class="col s12 vote-actions">
                            @if($canVotar)
                            <form action="{{route('votacion-votar')}}" method="post">
                                {{csrf_field()}}
                                <input type="hidden" name="candidatura" value="{{$candidatura->id}}">
                                <button type="submit" class="btn halfway-fab waves-effect waves-light vote"
                                data-position="bottom" data-delay="50" data-tooltip="Vota por este candidato">
                                <i class="material-icons right">thumb_up</i> <span>Vota</span></button>
                            </form>
                            @elseif($voto = $votos->where('candidatura_id', $candidatura->id)->first())
                            <form method="post" action="{{route('votacion-anular')}}">
                                {{csrf_field()}}
                                <input type="hidden" name="voto" value="{{$voto->id}}">
                                <button type="submit" class=" btn halfway-fab waves-effect waves-light red vote cancel"
                                data-position="bottom" data-delay="50" data-tooltip="Anula tu voto">
                                <i class="material-icons right">thumb_down</i>Anular mi voto</button>
                            </form>
                            @else
                            <button class="btn vote none" type="button" disabled>Ya has votado</button>
                            @endif
                        </div>
                    </div>
                    <div class="row">
                        <div class="col s12">
                            <a class="blue-text valign-wrapper" href="{{$candidatura->politico->url}}" target="_top">
                                <i class="material-icons">info</i><span>Infórmate</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach
    </div>
</div>
@endif
@endforeach
@endsection
