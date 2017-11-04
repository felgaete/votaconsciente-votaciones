<?php

namespace Votaconsciente\ArchivosServel;

use Votaconsciente\ServelArchivo;

abstract class FileParser
{
    protected $parsers = [];

    protected $models = ['n' => [], 'e' => []];

    /**
    * Mantiene el ultimo archivo procesado
    * @var ServelArchivo|null
    */
    protected $ultimoArchivo = null;

    public function parse(ServelArchivo $archivo)
    {
        foreach($this->parsers as $model => $parser){
            $parser->parse($archivo);
            $this->models['n'][$model] = $parser->nuevos();
            $this->models['e'][$model] = $parser->existentes();
        }
        $this->ultimoArchivo = $archivo;

    }

    public function getUltimoArchivo()
    {
        return $this->ultimoArchivo;
    }

    public function addParser($model, Parser $parser)
    {
        $this->parsers[$model] = $parser;
        $this->models['n'][$model] = collect();
        $this->models['e'][$model] = collect();
    }

    public abstract function save();

    public function getParser($model)
    {
        return $this->parsers[$model] ?: null;
    }

    public function adds($model)
    {
        return $this->models['n'][$model];
    }

    public function exists($model)
    {
        return $this->models['e'][$model];
    }
}
