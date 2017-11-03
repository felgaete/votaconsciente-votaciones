<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>Administración - {{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="col-sm-3">
            <div class="list-group">
                <a class="list-group-item list-group-item-action" href="{{route('admin-votaciones')}}">Votaciones</a>
                <a class="list-group-item list-group-item-action" href="{{route('admin-elecciones')}}">Elecciones</a>
                <a class="list-group-item list-group-item-action" href="{{route('admin-candidatos')}}">Candidatos</a>
                <a class="list-group-item list-group-item-action" href="{{route('admin-territorios')}}">Territorios</a>
                <a class="list-group-item list-group-item-action" href="{{route('admin-circunscripciones')}}">Circunscripciones</a>
                <a class="list-group-item list-group-item-action {{ ($seccion == 'carga') ? 'active' : '' }}" href="{{route('admin-cargas')}}">Cargas de archivos externos</a>
            </div>
        </div>
        <div class="col-sm-9">
          @if(session('message'))
          <div class="alert alert-success">
            {{session('message')}}
          </div>
          @endif
          @yield('content')
        </div>
      </div>
    </div>
    <script src="{{ asset('js/app.js') }}" charset="utf-8"></script>
  </body>
</html>
