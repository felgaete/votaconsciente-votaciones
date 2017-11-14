<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPoliticoInfo extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('politicos', function (Blueprint $table) {
            $table->string('imagen');
            $table->string('url');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('politicos', function (Blueprint $table) {
            $table->dropColumn('imagen');
            $table->dropColumn('url');
        });
    }
}
