@extends('layouts.app')
@section('title',  'Elección ' . Illuminate\Support\Str::title($eleccion->tipo) . ' - ' . $votacion->nombre)
@section('content')
<h4>Elección {{ Illuminate\Support\Str::title($eleccion->tipo) }}</h4>
<div class="divider"></div>
@foreach($eleccion->candidaturas->groupBy('territorio_id') as $group)
@if($group->first() && ($territorio = $group->first()->territorio))
<?php $canVotar = $votar($territorio); ?>
<div class="section">
    <h5>Territorio {{Illuminate\Support\Str::title($territorio->nombre)}}</h5>
    @foreach($group->chunk(3) as $candidatura_group)
    <div class="row">
        @foreach($candidatura_group as $candidatura)
        <div class="col s12 m6 l4">
            <div class="card">
                <div class="card-image">
                    <img class="card-img-top responsive-img" src="http://lorempixel.com/400/200/people/" alt="Foto candidato">
                    @if($canVotar)
                    <form action="{{route('votacion-votar')}}" method="post">
                        {{csrf_field()}}
                        <input type="hidden" name="candidatura" value="{{$candidatura->id}}">
                        <button type="submit" class="btn-floating halfway-fab waves-effect waves-light green">
                            <i class="material-icons">thumb_up</i>
                        </button>
                    </form>
                    @elseif($voto = $votos->where('candidatura_id', $candidatura->id)->first())
                    <form method="post" action="{{route('votacion-anular')}}">
                        {{csrf_field()}}
                        <input type="hidden" name="voto" value="{{$voto->id}}">
                        <button class="btn-floating halfway-fab waves-effect waves-light red" type="submit">
                            <i class="material-icons">thumb_down</i>
                        </button>
                    </form>
                    @endif
                </div>
                <div class="card-content">
                    <span class="card-title">{{Illuminate\Support\Str::title($candidatura->politico->nombre)}}</span>
                    <p>{{$candidatura->politico->partido_politico}}</p>
                    <div class="card-action">
                        <a class="blue-text" href="#">+ información</a>
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
