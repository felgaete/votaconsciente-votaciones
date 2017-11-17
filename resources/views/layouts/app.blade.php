<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title') - Votaconsciente</title>
    <!-- Styles -->
    @yield('css')
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <div class="section">
            @if((!isset($nomenu) && Auth::check()) || (isset($nomenu) && !$nomenu && Auth::check()))
            <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                {{ csrf_field() }}
            </form>
            <div class="row">
                <div class="col m2 s12">
                    <div class="collection">
                        <a href="{{route('votacion-main')}}" class="collection-item">Votaciones</a>
                        <a href="{{route('resultados-main')}}" class="collection-item">Resultados</a>
                        <a href="{{route('votante-edit')}}" class="collection-item">Mis datos</a>
                        <a class="collection-item" href="{{ route('logout') }}"
                            onclick="event.preventDefault();
                            document.getElementById('logout-form').submit();">
                            Salir
                        </a>

                    </div>
                </div>
                <div class="col m10 s12">
                    @yield('content')
                </div>
            </div>
            @else
            @yield('content')
            @endauth
        </div>
    </div>
    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
    @yield('js')
</body>
</html>
