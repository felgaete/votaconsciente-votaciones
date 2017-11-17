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
            @include('resultados.votaciones', compact('votaciones'))
        </div>
    </div>
</div>
@endsection
