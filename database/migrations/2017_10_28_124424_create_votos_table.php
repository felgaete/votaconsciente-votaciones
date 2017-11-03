<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVotosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('votos', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('candidato_eleccion_id')->unsigned();
            $table->integer('votante_id')->unsigned();
            $table->integer('circunscripcion_id')->unsigned();
            $table->unique(['candidato_eleccion_id', 'votante_id']);
            $table->timestamps();
            $table->foreign('candidato_eleccion_id')->references('id')->on('elecciones_candidatos');
            $table->foreign('votante_id')->references('id')->on('votantes');
            $table->foreign('circunscripcion_id')->references('id')->on('circunscripciones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('votos');
    }
}
