<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotanteTerritorioElectoralView extends Migration
{

    protected $viewName = 'votante_territorio_electoral';

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        $sql = <<<VIEW
        CREATE VIEW {$this->viewName} AS
        SELECT
        	v.id AS votante_id,
            vt.id AS voto_id,
        	te.eleccion_id AS eleccion_id,
        	te.territorio_id AS territorio_id
        FROM
        	votantes v
		INNER JOIN circunscripciones cc ON cc.id = v.circunscripcion_id
		INNER JOIN circunscripcion_territorio ct ON ct.circunscripcion_id = cc.id
        INNER JOIN votos vt ON v.id = vt.votante_id
        INNER JOIN candidaturas c ON c.id = vt.candidatura_id
        INNER JOIN territorio_electoral te ON te.eleccion_id = c.eleccion_id AND te.territorio_id = c.territorio_id AND te.territorio_id = ct.territorio_id
VIEW;

        DB::unprepared($sql);
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $sql = "drop view if exists {$this->viewName}";
        DB::unprepared($sql);
    }
}
