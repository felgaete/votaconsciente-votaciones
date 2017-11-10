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
Route::get('cargas', 'CargasArchivoController@index')->name('admin-cargas');
Route::get('cargas/procesar/{id}', 'CargasArchivoController@procesar')->name('admin-procesar-archivo');
Route::post('cargas/procesar/{id}', 'CargasArchivoController@confirmarProcesar')->name('admin-procesar-archivo-confirmar');
Route::post('cargas/padron-electoral', 'CargasArchivoController@cargaPadronElectoral')->name('admin-carga-padron');
Route::post('cargas/candidaturas', 'CargasArchivoController@cargaCandidaturas')->name('admin-carga-candidaturas');

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
    Route::get('/{view}/{id?}', 'TerritorioController@view')->name('admin-territorios-view');
    Route::post('/add', 'TerritorioController@add')->name('admin-territorios-postadd');
    Route::post('/update/{id}', 'TerritorioController@update')->name('admin-territorios-postupdate');
    Route::post('/delete/{id}', 'TerritorioController@delete')->name('admin-territorios-postdelete');
});

/*
* Candidatos
*/
Route::prefix('candidatos')->group(function(){
    Route::get('/', 'CandidatoController@listView')->name('admin-candidatos');
    Route::get('/{view}/{id?}', 'CandidatoController@view')->name('admin-candidatos-view');
    Route::post('/add', 'CandidatoController@add')->name('admin-candidatos-postadd');
    Route::post('/update/{id}', 'CandidatoController@update')->name('admin-candidatos-postupdate');
    Route::post('/delete/{id}', 'CandidatoController@delete')->name('admin-candidatos-postdelete');
});

/*
* Elecciones
*/
Route::prefix('elecciones')->group(function(){
    Route::get('/', 'EleccionController@listView')->name('admin-elecciones');
    Route::get('/{view}/{id?}', 'EleccionController@view')->name('admin-elecciones-view');
    Route::post('/add', 'EleccionController@add')->name('admin-elecciones-postadd');
    Route::post('/update/{id}', 'EleccionController@update')->name('admin-elecciones-postupdate');
    Route::post('/delete/{id}', 'EleccionController@delete')->name('admin-elecciones-postdelete');
});
