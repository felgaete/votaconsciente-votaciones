<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCircunscripcionTerritorioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('circunscripcion_territorio', function (Blueprint $table) {
            $table->integer('circunscripcion_id')->unsigned();
            $table->integer('territorio_id')->unsigned();
            $table->primary(['circunscripcion_id', 'territorio_id'], 'circunscripcion_territorio_id');
            $table->foreign('circunscripcion_id')->references('id')->on('circunscripciones');
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
        Schema::dropIfExists('circunscripcion_territorio');
    }
}
