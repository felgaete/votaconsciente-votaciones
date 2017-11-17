@extends('layouts.app')
@section('title', 'Resultados')
@section('js')
<script src="{{asset('js/charts.js')}}" charset="utf-8"></script>
<script type="text/javascript">
$(function(){
    loadCharts({!! $votaciones !!});
});
</script>
@endsection
@section('content')
<h4>Resultados de las votaciones</h4>
<h6>Por elección</h6>
<div class="divider"></div>
<div class="section">
    <div class="row">
        <div class="col s12">
            @foreach($votaciones as $votacion)
            <div class="section">
                <h5>{{$votacion->nombre}}</h5>
                <div class="divider"></div>
                <div class="section">
                    <div class="row">
                        @foreach($votacion->elecciones as $eleccion)
                        <div class="col s9">
                            <div class="card">
                                <div class="center-align card-title">Resultados de la elección</div>
                                <div class="card-content">
                                    <div class="chart-container" style="position: relative; height:100%; width:100%">
                                        <canvas id="resultado-eleccion-{{$eleccion->id}}"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col s3">
                            <div class="card-panel">
                                <table>
                                    <thead>
                                        <tr>
                                            <th class="center-align" colspan="2">Total de votos: {{$eleccion->candidaturas->first()->resultado->total_votos}}</th>
                                        </tr>
                                        <tr>
                                            <th>Candidato</th>
                                            <th>Votos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        @foreach($eleccion->candidaturas as $candidatura)
                                        <tr>
                                            <td>{{\Illuminate\Support\Str::title($candidatura->politico->nombre)}}</td>
                                            <td>{{$candidatura->resultado->votos}}</td>
                                        </tr>
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        @endforeach
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</div>
@endsection
