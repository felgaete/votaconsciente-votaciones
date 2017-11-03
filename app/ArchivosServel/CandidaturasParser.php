<?php

namespace Votaconsciente\ArchivosServel;

use Votaconsciente\Territorio;
use Illuminate\Support\Facade\DB;

class CandidaturasParser extends FileParser
{
    public function __construct()
    {
        $this->addParser(Territorio::class,
            new Parser(Territorio::class, 'servel_candidaturas', 'nombre', 'territorio', ['territorio as nombre']));
    }

    public function associate()
    {
    }

    public function save()
    {
        $q = DB::transaction(function($db) {
            $this->adds(Circunscripcion::class)->save();
            $this->adds(Votante::class)->save();
        });
        dd($q);
    }

}
