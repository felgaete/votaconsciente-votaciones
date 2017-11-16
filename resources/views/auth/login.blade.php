@extends('layouts.app')
@section('title', 'Ingresa')
@section('content')
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">
                        Ingresa con tu cuenta.<br>
                        <small>Identíficate para que nos indiques tu preferencia de voto</small> 
                    </span>
                    <div class="row">
                        <div class="col s12">
                            @if (session('confirmation-success'))
                            <div class="card-panel green white-text">{{session('confirmation-success')}}</div>
                            @endif
                            @if (session('confirmation-danger'))
                            <div class="card-panel red white-text">{!! session('confirmation-danger') !!}</div>
                            @endif
                        </div>
                    </div>
                    <form role="form" method="post" action="{{ url('/login') }}">
                        @if($errors->has('email'))
                        <div class="card-panel red white-text">{{$errors->first('email')}}</div>
                        @endif
                        @if($errors->has('password'))
                        <div class="card-panel red white-text">{{$errors->first('password')}}</div>
                        @endif
                        {{csrf_field()}}
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate" id="email" type="email" name="email" value="{{old('email')}}" required autofocus>
                                <label for="email" @unless(empty(old('email'))) class="active" @endunless>Email</label>
                            </div>
                            <div class="input-field col s12">
                                <input class="validate" id="password" name="password" type="password" required>
                                <label for="password">Contraseña</label>
                            </div>
                            <div class="col s12">
                                <button class="btn waves-effect waves-light" type="submit">Ingresar</button>
                            </div>
                            <div class="col s12">
                                <a class="link" href="{{ url('password/reset') }}">¿Has olvidado tu contraseña?</a>
                            </div>
                            <div class="col s12">
                                <a href="{{ url('register') }}">¿No tienes cuenta? Registrate.</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
