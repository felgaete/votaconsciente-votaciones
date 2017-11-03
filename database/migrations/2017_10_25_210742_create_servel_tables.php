<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateServelTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('servel_archivos', function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('path');
            $table->string('type', 30);
            $table->integer('rows')->default(0);
            $table->boolean('completed')->default(false);
            $table->boolean('processed')->default(false);
            $table->timestamps();
        });
        Schema::create('servel_candidaturas', function(Blueprint $table){
            $table->increments('id');
            $table->string('tipo');
            $table->string('region', 3);
            $table->string('territorio');
            $table->string('lista', 2);
            $table->string('pacto');
            $table->string('subpacto');
            $table->string('nvoto', 4);
            $table->string('nombre_candidato');
            $table->string('partido_politico');
            $table->integer('servel_archivo_id')->unsigned();
            $table->foreign('servel_archivo_id')->references('id')->on('servel_archivos');
        });
        Schema::create('servel_votantes', function (Blueprint $table) {
            $table->increments('id');
            $table->string('nombre');
            $table->string('ci', 15);
            $table->string('sexo', 3);
            $table->string('domicilio')->nullable();
            $table->string('circunscripcion');
            $table->string('mesa', 10);
            $table->boolean('exported')->default(false);
            $table->integer('servel_archivo_id')->unsigned();
            $table->foreign('servel_archivo_id')->references('id')->on('servel_archivos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('servel_candidaturas');
        Schema::dropIfExists('servel_votantes');
        Schema::dropIfExists('servel_archivos');
    }
}
