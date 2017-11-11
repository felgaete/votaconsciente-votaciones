@extends('layouts.app')
@section('title',  'Elección ' . Illuminate\Support\Str::title($eleccion->tipo) . ' - ' . $votacion->nombre)
@section('content')
<div class="container-fluid">
    <div class="row">
        <div class="col col-md-2">
            <ul class="nav nav-pills">
                @foreach($votacion->elecciones as $eleccion)
                <li class="nav-item">
                    <a href="{{route('votacion-eleccion-view', [$eleccion->votacion->id, $eleccion->id])}}" class="nav-link">{{$eleccion->tipo}}</a>
                </li>
                @endforeach
            </ul>
        </div>
        <div class="col col-md-10">
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
            @foreach($group->chunk(3) as $candidatura_group)
            <div class="card-deck">
                <?php $cgc = 0; ?>
                @foreach($candidatura_group as $candidatura)
                <div class="card">
                    <div class="card-header">
                        Partido político:
                        @empty($candidatura->politico->partido_politico)
                        No indicado
                        @else
                        $candidatura->politico->partido_politico
                        @endempty
                    </div>
                    <img class="card-img-top" src="{{$candidatura->politico->image}}" alt="Foto candidato">
                    <div class="card-body">
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
                <?php $cgc++; ?>
                @endforeach
                @for($i = $cgc; $i < 3; $i++)
                <div class="card invisible"></div>
                @endfor
            </div>
            @endforeach
            @endif
            @endforeach
        </div>
    </div>
</div>
@endsection
