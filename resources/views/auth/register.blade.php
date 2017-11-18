@extends('layouts.app')
@section('title', 'Registrarse')
@section('content')
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        Registrate indicándonos tus datos. <br>
                        <small>
                            Con estos datos podemos validar tu voto y hacerlo único.<br>
                            Una vez registrado te llegará un correo de confirmación para validarlo.<br>
                            Estos datos no serán utilizados con otro fin que no sea el estadístico.
                        </small>
                    </span>
                    @if(session('confirmation-success'))
                    <div class="row">
                        <div class="col s12">
                            <div class="card-panel green white-text">
                                {{session('confirmation-success')}}
                            </div>
                        </div>
                    </div>
                    @else
                    <form class="block-on-submit" role="form" method="post" action="{{ url('/register') }}">
                        {{csrf_field()}}
                        @if($errors->isNotEmpty())
                        <div class="row">
                            <div class="col s12">
                                @if($errors->has('ci') && $errors->first('ci') === 'no-vote')
                                @include('votaciones.votante-no-encontrado')
                                @else
                                <div class="card-panel red white-text">
                                    <ul>
                                        @foreach($errors->all() as $e)
                                        <li>{{$e}}</li>
                                        @endforeach
                                    </ul>
                                </div>
                                @endif
                            </div>
                        </div>
                        @endif
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate ci-field" id="ci" type="text" name="ci" value="{{old('ci')}}" placeholder="99.999.999-9" required>
                                <label for="ci" @unless(empty(old('name'))) class="active" @endunless>Rut</label>
                                <small>Tu Rut nos permite que exista un voto por persona.</small>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="name" type="text" name="name" value="{{old('name')}}" required>
                                <label for="name" @unless(empty(old('name'))) class="active" @endunless>Nombre</label>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="email" type="email" name="email" value="{{old('email')}}" required>
                                <label for="email" @unless(empty(old('email'))) class="active" @endunless>Email</label>
                                <small>Tu correo nos indica que no eres un robot</small>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="password" name="password" type="password" required>
                                <label for="password">Contraseña</label>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="password-confirm" type="password" name="password_confirmation" required>
                                <label for="password-confirm">Confirma tu contraseña</label>
                            </div>
                            <div class="col s12">
                                <i class="material-icons left hide submit-icon">sync</i>
                                <button class="btn waves-effect waves-light" data-submit-text="Registrando" type="submit">Registrarse</button>
                            </div>
                            <div class="col s12">
                                <a href="{{ url('login') }}">¿Ya tienes cuenta? Ingresa.</a>
                            </div>
                        </div>
                    </form>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
