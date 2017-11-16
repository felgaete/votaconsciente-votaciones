@extends('layouts.app')
@section('title', 'Editar mis datos')
@section('content')
<h4>Mis datos</h4>
<h6>Edita tu perfil de votante</h6>
<div class="divider"></div>
<div class="section">
    <div class="row">
        <div class="col s12 m10 l8 ofsset-m1 offset-l2">
            <form action="{{route('votante-update')}}" method="post">
                {{csrf_field()}}
                <div class="card">
                    <div class="card-content">
                        <span class="card-title">
                            Edita tus datos<br>
                            <small>
                                En caso de no tener tu voto validado, acá puedes hacerlo indicándonos tu Rut.<br>
                                Si lo deseas, puedes modificar tu nombre también.
                            </small>
                        </span>
                        <div class="row">
                            <div class="col s8 offset-s2">
                                @if(session('editado'))
                                <div class="card-panel green white-text">
                                    {{session('editado')}}
                                </div>
                                @endif
                                @if(session()->has('habilitado'))
                                @if(session('habilitado'))
                                <div class="card-panel green white-text">
                                    <strong>Gracias!</strong><br>
                                    Se ha habilitado tu perfil para votar.
                                </div>
                                @else
                                <div class="card-panel red white-text">
                                    <div class="row">
                                        <div class="col s1 text-center valign-wrapper">
                                            <i class="material-icons">warning</i>
                                        </div>
                                        <div class="col s11">
                                            <p>No se pudo validar tu Rut como un votante válido.</p>
                                            <p>¿Se trata de un error? Envíanos un mensaje privado a través del
                                                <a class="white-text" style="text-decoration: underline;" href="https://www.facebook.com/VotaConscienteChile" target="_blank">fanpage de vota consciente</a>
                                                indicándonos esta situación.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                @endif
                                @endif
                                @if($errors->isNotEmpty())
                                <div class="card-panel red white-text form-errors">
                                    <ul>
                                        @foreach($errors->all() as $e)
                                        <li>{{$e}}</li>
                                        @endforeach
                                    </ul>
                                </div>
                                @endif
                            </div>
                        </div>
                        <div class="row">
                            <div class="input-field col s12">
                                <i class="material-icons prefix">perm_identity</i>
                                <input class="ci-field" {{ $conVoto ? 'readonly' : ''}} name="ci" id="ci" type="text" value="{{$user->votante ? $user->votante->ci : ''}}">
                                <label for="ci" class="active">Rut</label>
                            </div>
                            <div class="input-field col s12">
                                <i class="material-icons prefix">account_circle</i>
                                <input id="nombre" type="text" name="nombre" value="{{$user->name}}" class="validate" required>
                                <label for="nombre" class="active">Nombre</label>
                            </div>
                            <div class="col s12">
                                <button class="btn waves-effect waves-light" type="submit">Actualizar mis datos</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection
