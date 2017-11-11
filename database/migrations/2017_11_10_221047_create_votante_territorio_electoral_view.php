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
        	te.eleccion_id AS eleccion_id,
        	te.territorio_id AS territorio_id
        FROM
        	votantes v
        INNER JOIN circunscripcion_territorio ct ON ct.circunscripcion_id = v.circunscripcion_id
        INNER JOIN territorio_electoral te ON te.territorio_id = ct.territorio_id
        LEFT JOIN votos vt ON v.id = vt.votante_id
        LEFT JOIN candidaturas c ON c.id = vt.candidatura_id AND c.territorio_id = te.territorio_id AND c.eleccion_id = te.eleccion_id
        WHERE vt.id IS NULL
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
