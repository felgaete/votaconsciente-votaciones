<?php
$str_class = 'Illuminate\Support\Str';
?>
@extends('layouts.app')
@section('title', $str_class::title($votacion->nombre))
@section('content')
<h3>{{$str_class::title($votacion->nombre)}}</h3>



@endsection
