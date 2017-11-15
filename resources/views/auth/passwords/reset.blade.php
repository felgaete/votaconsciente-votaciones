@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Reestablecer contraseña</span>
                    @if($errors->isNotEmpty())
                    <div class="row">
                        <div class="col s12">
                            <div class="card-panel red white-text">
                                <ul>
                                    @foreach($errors->all() as $e)
                                    <li>{{$e}}</li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    @endif
                    <form role="form" method="post" action="{{ route('password.request') }}">
                        {{csrf_field()}}
                        <input type="hidden" name="token" value="{{ $token }}">
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate" id="email" type="email" name="email" value="{{ $email or old('email') }}" required autofocus>
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
                                <button class="btn waves-effect waves-light" type="submit">Reestablecer</button>
                            </div>
                            <div class="col s12">
                                <a href="{{ url('login') }}">Volver</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
