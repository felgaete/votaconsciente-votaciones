@extends('admin.index')
@section('content')
@foreach($circunscripciones as $c)
{{$c->circunscripcion}}
@endforeach
@endsection
