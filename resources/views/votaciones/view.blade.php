<div class="container-fluid">
    <h3>{{$votacion->nombre}}</h3>
    <div class="row">
        <div class="col col-md-4">
            <ul class="nav nav-pills">
                @foreach($votacion->elecciones as $eleccion)
                <li class="nav-item">
                    <a class="nav-link" href="{{route('votacion-eleccion-view', [$votacion->id, $eleccion->id])}}">{{$eleccion->tipo}}</a>
                </li>
                @endforeach
            </ul>
        </div>
    </div>
</div>
