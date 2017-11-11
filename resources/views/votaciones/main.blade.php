@extends('layouts.app')
@section('content')
@empty($votacion)
asdasd
@else
@include('votaciones.view', compact('votacion'))
@endempty
@endsection
