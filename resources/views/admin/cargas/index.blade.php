@extends('layouts.admin', ['seccion' => 'carga'])
@section('content')
<div class="row">
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Padrón Electoral</h4>
                <form method="post" action="{{route('admin-carga-padron')}}" enctype="multipart/form-data">
                    {{ csrf_field() }}
                    <div class="form-group {{$errors->has('pefile') ? 'has-error' : ''}}">
                        <label>
                            <input type="file" name="pefile" class="form-control-file" />
                        </label>
                        @if($errors->has('pefile'))
                        <span class="help-block">
                            <strong>{{$errors->first('pefile')}}</strong>
                        </span>
                        @endif
                    </div>
                    <div class="form-group">
                        <input type="Submit" class="btn btn-primary" value="Enviar" />
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">Candidaturas</h4>
                <form method="post" enctype="multipart/form-data" action="{{route('admin-carga-candidaturas')}}">
                    {{ csrf_field() }}
                    <div class="form-group {{$errors->has('cdfile') ? 'has-error' : ''}}">
                        <label>
                            <input type="file" name="cdfile" class="form-control-file" />
                        </label>
                        @if($errors->has('cdfile'))
                        <span class="help-block">
                            <strong>{{$errors->first('cdfile')}}</strong>
                        </span>
                        @endif
                    </div>
                    <div class="form-group">
                        <input type="submit" class="btn btn-primary" value="Enviar">
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
<hr>
<div class="card">
  <div class="card-header">
    <h4 class="card-title">Archivos cargados</h4>
  </div>
  <div class="card-body">
      <table class="table">
          <thead>
              <th>Archivo</th>
              <th>Tipo</th>
              <th>Cargado el</th>
              <th>Filas</th>
              <th>Cargado</th>
              <th>Acciones</th>
          </thead>
          <tbody>
              @foreach($archivos as $archivo)
              <tr>
                  <td>{{$archivo->name}}</td>
                  <td>{{$archivo->type}}</td>
                  <td>{{$archivo->created_at}}</td>
                  <td>{{$archivo->rows}}</td>
                  <td>{{$archivo->completed}}</td>
                  <td>
                      @if($archivo->completed && !$archivo->processed)
                      <a class="btn btn-primary btn-sm" href="{{route('admin-procesar-archivo', ['id' => $archivo->id])}}">Procesar</a>
                      @endif
                  </td>
              </tr>
              @endforeach
          </tbody>
      </table>
  </div>
</div>
@endsection
