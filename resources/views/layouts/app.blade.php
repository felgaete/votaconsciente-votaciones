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
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        <nav class="navbar navbar-expand-md navbar-dark bg-primary bd-navbar">
            <!-- Branding Image -->
            <a class="navbar-brand" href="{{ url('/') }}">
                {{ config('app.name', 'Laravel') }}
            </a>
            <!-- Collapsed Hamburger -->
            <button type="button" class="navbar-toggler collapsed" data-toggle="collapse" data-target="#app-navbar-collapse">
                <span class="sr-only">Toggle Navigation</span>
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="app-navbar-collapse">
                <!-- Left Side Of Navbar -->
                <ul class="nav navbar-nav mr-auto">
                    @auth
                    <li class="nav-item {{isset($activo) && $activo == 'votar' ? 'active' : ''}}">
                        <a href="{{route('votacion-main')}}" class="nav-link">Votaciones</a>
                    </li>
                    <li class="nav-item {{isset($activo) && $activo == 'candidatos' ? 'active' : ''}}">
                        <a href="#" class="nav-link">Candidatos</a>
                    </li>
                    @endauth
                </ul>
                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav">
                    <!-- Authentication Links -->
                    @guest
                    <li><a class="nav-link" href="{{ route('login') }}">Ingresar</a></li>
                    <li><a class="nav-link" href="{{ route('register') }}">Registrarse</a></li>
                    @else
                    <li class="nav-item dropdown">
                        <a href="#" class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            {{ Auth::user()->name }} <span class="caret"></span>
                        </a>

                        <ul class="dropdown-menu" role="menu">
                            @if(!Auth::user()->votante)
                            <li class="dropdown-item">
                                <a href="{{ route('votante-habilitar-view') }}">Habilitar voto</a>
                            </li>
                            @endif
                            @if(Auth::user()->is_admin)
                            <li class="dropdown-item">
                                <a href="{{route('admin-index')}}">Administracion</a>
                            </li>
                            @endif
                            <li class="dropdown-item">
                                <a href="{{ route('logout') }}"
                                onclick="event.preventDefault();
                                document.getElementById('logout-form').submit();">
                                Salir
                                </a>

                                <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                </form>
                            </li>
                        </ul>
                    </li>
                    @endguest
                </ul>
            </div>
        </nav>
        @auth
        <main>
            @if(!Auth::user()->votante)
            <div class="container mt-1">
                <div class="row justify-content-center">
                    <div class="col-md-8 col-md-offset-2">
                        <div class="alert alert-warning " role="alert">
                            <h4 class="alert-heading">Atención!</h4>
                            <p>
                                <span class="glyphicon glyphicon-alert" aria-hidden="true"></span>
                                <span class="sr-only"></span>
                                Para permitir ingresar tu voto, primero tienes que habilitarte como votante,
                                puedes hacerlo desde <a class="alert-link" href="{{route('votante-habilitar')}}">aquí</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            @endif
            @endauth
            @yield('content')
        </main>
    </div>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>
