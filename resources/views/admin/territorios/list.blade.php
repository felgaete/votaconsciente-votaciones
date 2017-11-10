@extends('admin.index')
@section('content')
<main class="mt-5">
    <div class="card">
      <div class="card-block">
        <h4 class="card-title text-center">Territorios</h4>
      </div>
      <div class="card-body">
          @foreach($territorios as $t)
          <div class="card mb-2">
              <div class="card-header">
                  {{$t->nombre}}
              </div>
              <div class="card-body">
                  <div class="card-title">Circunscripciones</div>
                  <div class="card-body">
                      @foreach($t->circunscripciones as $c)
                      <div>{{$c->circunscripcion}}</div>
                      @endforeach
                      <form action="{{route('admin-territorio-add-circunscripcion')}}" method="post">
                          {{csrf_field()}}
                          <input type="hidden" name="territorio" value="{{$t->id}}">
                          <select class="form-control" name="circunscripcion">
                              @foreach($circunscripciones->diff($t->circunscripciones) as $c)
                              <option value="{{$c->id}}">{{$c->circunscripcion}}</option>
                              @endforeach
                          </select>
                          <button type="submit" class="btn btn-primary" name="button">Agregar</button>
                      </form>
                  </div>
              </div>
          </div>
          @endforeach
      </div>
    </div>
</main>
@endsection
