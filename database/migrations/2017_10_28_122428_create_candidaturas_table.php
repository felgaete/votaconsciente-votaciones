<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCandidaturasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('candidaturas', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('politico_id')->unsigned();
            $table->integer('eleccion_id')->unsigned();
            $table->integer('territorio_id')->unsigned();
            $table->timestamps();
            $table->unique(['politico_id', 'eleccion_id']);
            $table->foreign('politico_id')->references('id')->on('politicos');
            $table->foreign(['eleccion_id', 'territorio_id'])
                  ->references(['eleccion_id', 'territorio_id'])
                  ->on('territorio_electoral');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('candidaturas');
    }
}
