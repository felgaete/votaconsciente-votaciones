<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCandidaturaView extends Migration
{

    protected $viewName = 'resultado_candidatura_view';

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
        	c.id AS candidatura_id,
        	count(DISTINCT v.id) AS votos,
        	COUNT(DISTINCT vt.id) AS total_votos
        FROM
        	candidaturas c
        LEFT JOIN votos v ON v.candidatura_id = c.id
        LEFT JOIN candidaturas t ON t.eleccion_id = c.eleccion_id
        LEFT JOIN votos vt ON vt.candidatura_id = t.id
        GROUP BY
        	c.id, t.eleccion_id
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
