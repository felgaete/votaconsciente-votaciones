@extends('layouts.app', ['activo' => 'votar'])
@section('content')
<div class="container-fluid">
    <div class="row mt-3">

        <nav class="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
            <ul class="nav nav-pills flex-column">
                @foreach($elecciones as $e)
                <li class="nav-item">
                    <a class="nav-link {{$eleccion && $eleccion->id == $e->id ? 'active' : ''}}" href="{{route('votar-eleccion', ['id' => $e->id])}}">{{$e->tipo}}</a>
                </li>
                @endforeach
            </ul>
        </nav>

        <div class="col-lg-9">
            <div class="row">
                @foreach($candidatos as $c)
                <div class="card col-md-4">
                    <img class="card-img-top" data-src="" alt="img">
                    <div class="card-block">
                        <h4 class="card-title">{{$c->nombre}}</h4>
                        <p class="card-text">{{$c->partido_politico}}</p>
                        <a href="#" class="btn btn-primary">Votar</a>
                    </div>
                </div>
                @endforeach
            </div>
        </div>

    </div>

</div>
@endsection
