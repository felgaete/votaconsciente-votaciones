<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', function(){
    return redirect()->route('votacion-main');
});

Route::prefix('votante')->namespace('Votante')->middleware(['auth'])->group(function(){
    Route::get('/', 'VotanteController@edit')->name('votante-edit');
    Route::post('/update', 'VotanteController@update')->name('votante-update');
    Route::post('/habilitar', 'VotanteController@habilitar')->name('votante-habilitar');
});

Route::prefix('votacion')->namespace('Votacion')->middleware('auth')->group(function(){
    Route::get('/', 'VotacionController@principal')->name('votacion-main');
    Route::get('/{votacion}', 'VotacionController@votacion')->name('votacion-view');
    Route::get('/{votacion}/eleccion/{eleccion}', 'VotacionController@eleccion')->name('votacion-eleccion-view');
    Route::middleware('auth.votante')->group(function(){
        Route::post('/votar', 'VotacionController@votar')->name('votacion-votar');
        Route::post('/anular', 'VotacionController@anular')->name('votacion-anular');
    });
});

Route::middleware(['auth', 'auth.admin'])->namespace('Admin')->prefix('admin')->group(base_path('routes/admin.php'));
