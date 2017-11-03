<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEleccionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('elecciones', function (Blueprint $table) {
            $table->increments('id');
            $table->string('tipo');
            $table->integer('votacion_id')->unsigned();
            $table->timestamps();
            $table->foreign('votacion_id')->references('id')->on('votaciones');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('elecciones');
    }
}
