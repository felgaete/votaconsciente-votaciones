@extends('layouts.app')
@section('content')
<div class="container mt-3">
    <div class="mx-auto w-50">
        <form novalidate method="post" action="{{route('votante-habilitar')}}">
            {{csrf_field()}}
            <div class="form-group">
                <label for="ci">Rut</label>
                @if(false === session('habilitado'))
                <input type="text" class="form-control is-invalid" id="ci" name="ci" placeholder="9.999.999-9" required>
                <div class="invalid-feedback">
                    No se pudo habilitar el voto por el rut dado.
                </div>
                @else
                <input type="text" class="form-control" id="ci" name="ci" placeholder="9.999.999-9" required>
                @endif
            </div>
            <div class="form-group">
                <button type="submit" class="btn btn-primary">Habilitar voto</button>
            </div>
        </form>
    </div>
</div>
@endsection
