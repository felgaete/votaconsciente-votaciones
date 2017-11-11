@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col col-md-3">
            <ul class="nav nav-pills">
                @foreach($eleccion->votacion->elecciones as $eleccion)
                <li class="nav-item">
                    <a href="{{route('votacion-eleccion-view', [$eleccion->votacion->id, $eleccion->id])}}" class="nav-link">{{$eleccion->tipo}}</a>
                </li>
                @endforeach
            </ul>
        </div>
        <div class="col col-md-9">
            @foreach($eleccion->candidaturas->groupBy('territorio_id') as $group)
            @if($group->first() && ($territorio = $group->first()->territorio))
            <?php $votado = Gate::denies('votar-territorio-electoral', [$eleccion, $territorio]); ?>
            <h3>
                {{$territorio->nombre}}
                @if($votado)
                <?php $voto =  Auth::user()->votante->voto($eleccion, $territorio)->firstOrFail();?>
                <form method="post" class="form-inline" action="{{route('votacion-anular')}}">
                    {{csrf_field()}}
                    <input type="hidden" name="voto" value="{{$voto->id}}">
                    <button class="btn btn-link" type="submit">Anular voto</button>
                </form>
                @endif
            </h3>
            <div class="row">
                @foreach($group as $candidatura)
                <div class="col col-md-4">
                    <div class="card">
                        <img class="card-img-top" src="{{$candidatura->politico->image}}" alt="Foto candidato">
                        <div class="card-block">
                            <h4 class="card-title">{{$candidatura->politico->nombre}}</h4>
                            <p class="card-text">{{$candidatura->politico->partido_politico}}</p>
                            @unless($votado)
                            <form action="{{route('votacion-votar')}}" method="post">
                                {{csrf_field()}}
                                <input type="hidden" name="candidatura" value="{{$candidatura->id}}">
                                <button type="submit" class="btn btn-primary">Votar</button>
                            </form>
                            @endunless
                        </div>
                    </div>
                </div>
                @endforeach
            </div>
            @endif
            @endforeach
        </div>
    </div>
</div>
@endsection
