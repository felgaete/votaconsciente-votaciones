@extends('layouts.app')
@section('title', 'Editar mis datos')
@section('content')

<div class="section">
    <h2>Mis datos</h2>
    <div class="divider"></div>
    <div class="section">
        <form action="{{route('votante-update')}}" method="post">
            {{csrf_field()}}
            <div class="card">
                <div class="card-content">
                    <div class="row">
                        <div class="col s8 offset-s2">
                            @if(session('editado'))
                            <div class="card-panel green white-text">
                                {{session('editado')}}
                            </div>
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
                            <label for="ci" class="active">Rut de voto</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">account_circle</i>
                            <input id="nombre" type="text" name="nombre" value="{{$user->name}}" class="validate" required>
                            <label for="nombre" class="active">Nombre</label>
                        </div>
                        <div class="input-field col s12">
                            <i class="material-icons prefix">email</i>
                            <input readonly type="text" value="{{$user->email}}">
                            <label for="nombre" class="active">Email</label>
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

@endsection
