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
                        <div class="col s12">
                            <div class="chart-container" style="position: relative; height:40vh; width:80vw">
                                <canvas id="resultado-eleccion-{{$eleccion->id}}"></canvas>
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
