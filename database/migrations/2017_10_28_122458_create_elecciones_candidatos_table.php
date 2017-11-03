<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEleccionesCandidatosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elecciones_candidatos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('candidato_id')->unsigned();
            $table->integer('eleccion_id')->unsigned();
            $table->unique(['candidato_id', 'eleccion_id']);
            $table->foreign('candidato_id')->references('id')->on('candidatos');
            $table->foreign('eleccion_id')->references('id')->on('elecciones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('elecciones_candidatos');
    }
}
