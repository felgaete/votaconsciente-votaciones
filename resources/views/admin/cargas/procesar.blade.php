@extends('layouts.admin', ['seccion' => 'carga'])
@section('content')
<div class="card">
    <div class="card-body">
        <h4 class="card-title">Detalles de procesamiento {{$archivo->name}}</h4>
        @if($archivo->type == \Votaconsciente\ServelArchivo::PADRON_ELECTORAL_TYPE)
        <div id="proceso" role="tablist">
            <div class="card">
                <div class="card-header" role="tab" id="headingCircunscripciones">
                    <h5 class="mb-0">
                        <a data-toggle="collapse" href="#circunscripciones" aria-expanded="false" aria-controls="circunscripciones">
                            Circunscripciones
                        </a>
                    </h5>
                </div>
                <div id="circunscripciones" class="collapse" role="tabpanel" aria-labelledby="headingCircunscripciones" data-parent="#proceso">
                    <div class="card-body">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($circunscripciones_nuevas->forPage(1, 10) as $c)
                                        <li>
                                            {{$c->circunscripcion}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($circunscripciones_existentes->forPage(1, 10) as $c)
                                        <li>
                                            {{$c->circunscripcion}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" role="tab" id="headingVotantes">
                    <h5 class="mb-0">
                        <a data-toggle="collapse" href="#votantes" aria-expanded="false" aria-controls="votantes">
                            Votantes
                        </a>
                    </h5>
                </div>
                <div id="votantes" class="collapse" role="tabpanel" aria-labelledby="headingVotantes" data-parent="#proceso">
                    <div class="card-body">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($votantes_nuevos->forPage(1, 15) as $v)
                                        <li>
                                            {{$v->ci}}, {{$v->circunscripcion->circunscripcion}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($votantes_existentes->forPage(1, 15) as $v)
                                        <li>
                                            {{$v->ci}}, {{$v->circunscripcion->circunscripcion}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form class="form-inline" action="{{route('admin-procesar-archivo', [$archivo->id])}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="archivo" value="{{$archivo->id}}">
            <button class="btn btn-primary">Confirmar</button>
        </form>
        @elseif($archivo->type == \Votaconsciente\ServelArchivo::CANDIDATURAS_TYPE)
        <div id="proceso" role="tablist">
            <div class="card">
                <div class="card-header" role="tab" id="headingElecciones">
                    <h5 class="mb-0">
                        <a data-toggle="collapse" href="#elecciones" aria-expanded="false" aria-controls="elecciones">
                            Elecciones
                        </a>
                    </h5>
                </div>
                <div id="elecciones" class="collapse" role="tabpanel" aria-labelledby="headingElecciones" data-parent="#proceso">
                    <div class="card-body">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($elecciones_nuevas->forPage(1, 15) as $e)
                                        <li>
                                            {{$e->tipo}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($elecciones_existentes->forPage(1, 15) as $e)
                                        <li>
                                            {{$e->tipo}}
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" role="tab" id="headingTerritorios">
                    <h5 class="mb-0">
                        <a data-toggle="collapse" href="#territorios" aria-expanded="false" aria-controls="territorios">
                            Territorios
                        </a>
                    </h5>
                </div>
                <div id="territorios" class="collapse" role="tabpanel" aria-labelledby="headingTerritorios" data-parent="#proceso">
                    <div class="card-body">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($territorios_nuevos->forPage(1, 10) as $t)
                                        <li>
                                            {{$t->nombre}} [{{$t->elecciones->first()->tipo}}]
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($territorios_existentes->forPage(1, 10) as $t)
                                        <li>
                                            {{$t->nombre}} [{{$t->elecciones->first()->tipo}}]
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-header" role="tab" id="headingCandidatos">
                    <h5 class="mb-0">
                        <a data-toggle="collapse" href="#candidatos" aria-expanded="false" aria-controls="candidatos">
                            Candidatos
                        </a>
                    </h5>
                </div>
                <div id="candidatos" class="collapse" role="tabpanel" aria-labelledby="headingCandidatos" data-parent="#proceso">
                    <div class="card-body">
                        <div class="card-group">
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($politicos_nuevos->forPage(1, 10) as $p)
                                        <li class="mb-2">
                                            {{$p->nombre}}<br>
                                            <small>
                                                CANDIDATURA {{$p->candidaturas->first()->eleccion->tipo}} {{$p->candidaturas->first()->territorio->nombre}}
                                            </small>
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-body">
                                    <ul class="list-unstyled">
                                        @foreach($politicos_existentes->forPage(1, 10) as $p)
                                        <li class="mb-2">
                                            {{$p->nombre}}<br>
                                            <small>
                                                CANDIDATURA {{$p->candidaturas->first()->eleccion->tipo}} {{$p->candidaturas->first()->territorio->nombre}}
                                            </small>
                                        </li>
                                        @endforeach
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <form class="form" action="{{route('admin-procesar-archivo', [$archivo->id])}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="archivo" value="{{$archivo->id}}">
            <div class="form-group">
                <label for="votaciones">Asociar a votacion</label>
                @if(!$votaciones->isEmpty())
                <select id="votaciones" class="form-control" name="votacion_id">
                    @forelse($votaciones as $votacion)
                    <option value="{{$votacion->id}}">{{$votacion->nombre}}</option>
                    @endforeach
                    <option value="0">Nueva votacion</option>
                </select>
                @endif
                <input type="text" class="form-control" name="votacion" value="" placeholder="Nueva votacion" required>
            </div>
            <div class="form-group">
                <button class="btn btn-primary">Confirmar</button>
            </div>
        </form>
        @endif
    </div>
</div>
@endsection
