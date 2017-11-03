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
        @elseif($archivo->type == \Votaconsciente\ServelArchivo::CANDIDATURAS_TYPE)
        <table class="table">
            <caption>Nuevos Territorios: {{count($territorios_nuevos)}}</caption>
            <thead>
                <th>Nombre</th>
            </thead>
            <tbody>
                @foreach($territorios_nuevos as $territorio)
                <tr>
                    <td>{{$territorio->nombre}}</td>
                </tr>
                @endforeach
            </tbody>
        </table>
        @endif
        <form class="form-inline" action="{{route('admin-procesar-archivo', [$archivo->id])}}" method="post">
            {{csrf_field()}}
            <input type="hidden" name="archivo" value="{{$archivo->id}}">
            <button class="btn btn-primary">Confirmar</button>
        </form>
    </div>
</div>
@endsection
