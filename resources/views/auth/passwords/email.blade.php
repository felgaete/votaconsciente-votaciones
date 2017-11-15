@extends('layouts.app')
@section('title', 'Recuperar contraseña')
@section('content')
<div class="container">
    <div class="row">
        <div class="col s12 m8 offset-m2">
            <div class="card">
                <div class="card-content">
                    <span class="card-title">Reestablecer contraseña</span>
                    @if(session('status'))
                    <div class="card-panel green white-text">
                        {{session('status')}}
                    </div>
                    @endif
                    <form role="form" method="post" action="{{ route('password.email') }}">
                        {{csrf_field()}}
                        <div class="row">
                            <div class="input-field col s12">
                                <input class="validate" id="email" type="email" name="email" value="{{old('email')}}" required>
                                <label for="email" @unless(empty(old('email'))) class="active" @endunless>Email</label>
                            </div>
                            <div class="col s12">
                                <button class="btn waves-effect waves-light" type="submit">Enviar link de reseteo</button>
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
