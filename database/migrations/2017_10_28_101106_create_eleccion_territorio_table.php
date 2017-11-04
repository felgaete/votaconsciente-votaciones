<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEleccionTerritorioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eleccion_territorio', function (Blueprint $table) {
            $table->integer('eleccion_id')->unsigned();
            $table->integer('territorio_id')->unsigned();
            $table->primary(['eleccion_id', 'territorio_id'], 'eleccion_territorio_id');
            $table->foreign('eleccion_id')->references('id')->on('elecciones');
            $table->foreign('territorio_id')->references('id')->on('territorios');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eleccion_territorio');
    }
}
