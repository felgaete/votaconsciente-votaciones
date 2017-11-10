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
          </div>
          @endforeach
      </div>
    </div>
</main>
@endsection
