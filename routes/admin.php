<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Rutas para la administracion de los modelos del sitio
|
*/
Route::get('/', 'AdminController@index')->name('admin-index');
Route::get('votaciones', 'AdminController@votaciones')->name('admin-votaciones');
Route::get('elecciones', 'AdminController@elecciones')->name('admin-elecciones');
Route::get('candidatos', 'AdminController@candidatos')->name('admin-candidatos');
Route::get('cargas', 'CargasArchivoController@index')->name('admin-cargas');
Route::get('cargas/procesar/{id}', 'CargasArchivoController@procesar')->name('admin-procesar-archivo');
Route::post('cargas/procesar/{id}', 'CargasArchivoController@confirmarProcesar')->name('admin-procesar-archivo-confirmar');
Route::post('cargas/padron-electoral', 'CargasArchivoController@cargaPadronElectoral')->name('admin-carga-padron');
Route::post('cargas/candidaturas', 'CargasArchivoController@cargaCandidaturas')->name('admin-carga-candidaturas');
Route::post('territorios/add-circunscripcion', 'AdminController@addCircunscripcionATerritorio')->name('admin-territorio-add-circunscripcion');

/*
* Circunscripciones
*/
Route::prefix('circunscripciones')->group(function(){
    Route::get('/', 'CircunscripcionController@listView')->name('admin-circunscripciones');
    Route::get('/{view}/{id?}', 'CircunscripcionController@view')->name('admin-circunscripciones-view');
    Route::post('/add', 'CircunscripcionController@add')->name('admin-circunscripciones-postadd');
    Route::post('/update/{id}', 'CircunscripcionController@update')->name('admin-circunscripciones-postupdate');
    Route::post('/delete/{id}', 'CircunscripcionController@delete')->name('admin-circunscripciones-postdelete');
});

/*
* Territorios
*/
Route::prefix('territorios')->group(function(){
    Route::get('/', 'TerritorioController@listView')->name('admin-territorios');
    Route::get('/{view}/{$id?}', 'TerritorioController@view')->name('admin-territorios-view');
    Route::post('/add', 'TerritorioController@add')->name('admin-circunscripciones-postadd');
    Route::post('/update/{id}', 'TerritorioController@update')->name('admin-circunscripciones-postupdate');
    Route::post('/delete/{id}', 'TerritorioController@delete')->name('admin-circunscripciones-postdelete');
});
