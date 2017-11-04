<?php

namespace Votaconsciente\ArchivosServel;

use Illuminate\Support\Facades\DB;
use Votaconsciente\ServelArchivo;

class Parser
{
    /**
    * Modelo sobre el que trabajara el parser
    * @var string
    */
    protected $model;

    /**
    * Atributo sobre el cual se hara las comparaciones de existencia
    * @var string
    */
    protected $compareAttr;

    /**
    * Atributo de la fuente de datos sobre el cual se hara las comparaciones de existencia
    * @var string
    */
    protected $sourceCompareAttr;

    /**
    * Tabla donde se encuentra el modelo
    * @var string
    */
    protected $table;

    /**
    * Tabla de la fuente de datos
    * @var string
    **/
    protected $sourceTable;

    /**
    * Modelos que creara el Parser
    * @var array
    */
    protected $models = [];

    /**
    * Modelos que existen en el Parser pero ya se encuentran en la fuente de datos
    * @var array
    */
    protected $inDatabase = [];

    /**
    * Array de la seleccion de datos
    * @var array
    */
    protected $select;


    /**
    * Callback que se llamara al crear una nueva instancia del modelo
    * @var Callable
    */
    protected $created_cb = null;

    /**
    * Callback que se llamara al cargar una nueva instancia del modelo
    * @var Callable
    */
    protected $loaded_cb = null;

    /**
    * Crea un nuevo parser
    * @param modelClass El tipo de modelo que creara el parser
    * @param sourceTable La tabla de origen donde se realizaran comparaciones
    * @param attr El atributo de $modelClass con el que se compara
    * @param sourceAttr El atributo de $sourceTable con el que se compara
    */
    public function __construct($modelClass, $sourceTable, $attr = 'id', $sourceAttr = 'id', $select = null)
    {
        $this->compareAttr = $attr;
        $this->sourceCompareAttr = $sourceAttr;
        $this->sourceTable = $sourceTable;
        $this->select = collect($select ? $select : [$sourceAttr])->map(function($item){
            return $this->sourceTable.'.'.$item;
        })->toArray();
        $this->parseModel($modelClass);
    }

    public function setCreatedCallback($cb)
    {
        $this->created_cb = $cb;
    }

    public function setLoadedCallback($cb)
    {
        $this->loaded_cb = $cb;
    }

    /**
    * Cambia el modelo del parser
    * @param class Nombre de clase
    */
    public function parseModel($class)
    {
        $this->model = $class;
        $this->table = with(new $class)->getTable();
    }

    /**
    * Ejecuta este parser para el archivo cargado
    * @param archivo El archivo de servel a parsear
    */
    public function parse(ServelArchivo $archivo)
    {
        $existentes = $this->interseccion($archivo)->get();
        $nuevos = $this->diferencia($archivo)->get();
        $this->inDatabase = ($this->model)::hydrate($existentes->toArray());
        if(is_callable($this->loaded_cb)){
            $this->inDatabase->each($this->loaded_cb);
        }
        $this->models = $this->transform($nuevos->toArray());
    }

    protected function transform($attrs)
    {
        return collect(array_map(function($attr){
            $model = new $this->model((array) $attr);
            if(is_callable($this->created_cb)){
                ($this->created_cb)($model, (array) $attr);
            }
            return $model;
        }, $attrs));
    }

    /**
    * Obtiene la consulta para obtener la interseccion (elementos que existen)
    * en la tabla del modelo a transformar desde la tabla fuente de datos a partir del un archivo cargado
    * @see https://www.codeproject.com/KB/database/Visual_SQL_Joins/Visual_SQL_JOINS_orig.jpg
    * @param archivo El archivo del cual obtener la informacion
    */
    protected function interseccion(ServelArchivo $archivo)
    {
        /*
        * Se obtiene desde la tabla de la fuente, unida con la tabla del modelo
        * a traves de los atributos de comparacion de ambas tablas de un archivo
        * $archivo.
        * Luego selecciona los atributos de la tabla de la fuente distintos
        */
        return $this->conjunto($archivo)
            ->select(array_merge([$this->table.'.id'], $this->select))
            ->join($this->table, $this->sourceTable.'.'.$this->sourceCompareAttr, '=', $this->table.'.'. $this->compareAttr);
        }

    /**
    * Diferencia entre la tabla fuente con la tabla del modelo
    * a partir de los atributos de comparacion
    * @see https://www.codeproject.com/KB/database/Visual_SQL_Joins/Visual_SQL_JOINS_orig.jpg
    */
    protected function diferencia(ServelArchivo $archivo)
    {
        return $this->conjunto($archivo)
            ->leftJoin($this->table, $this->sourceTable.'.'.$this->sourceCompareAttr, '=', $this->table.'.'. $this->compareAttr)
            ->whereNull($this->table.'.'.$this->compareAttr);
    }

    protected function conjunto(ServelArchivo $archivo)
    {
        $builder = $archivo->getConnection()->query();
        return $builder
            ->from($this->sourceTable)
            ->where($this->sourceTable.'.servel_archivo_id', $archivo->id)
            ->select($this->select)
            ->distinct();
    }

    public function nuevos()
    {
        return $this->models;
    }

    public function existentes()
    {
        return $this->inDatabase;
    }


}
