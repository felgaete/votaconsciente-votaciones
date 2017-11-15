@extends('layouts.app')
@section('title', 'Registrarse')
@section('content')
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Registrarse</span>
                    @if(session('confirmation-success'))
                    <div class="card-panel green white-text">
                        {{session('confirmation-success')}}
                    </div>
                    @else
                    <form role="form" method="post" action="{{ url('/register') }}">
                        {{csrf_field()}}
                        @if($errors->isNotEmpty())
                        <div class="card-panel red white-text">
                            <ul>
                                @foreach($errors->all() as $e)
                                <li>{{$e}}</li>
                                @endforeach
                            </ul>
                        </div>
                        @endif
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate" id="name" type="text" name="name" value="{{old('name')}}" required>
                                <label for="name" @unless(empty(old('name'))) class="active" @endunless>Nombre</label>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="email" type="email" name="email" value="{{old('email')}}" required>
                                <label for="email" @unless(empty(old('email'))) class="active" @endunless>Email</label>
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
                                <button class="btn waves-effect waves-light" type="submit">Registrar</button>
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
