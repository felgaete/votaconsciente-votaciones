<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Rutas para la administracion de los modelos del sitio
|
*/
Route::get('/admin', 'AdminController@index')->name('admin-index');
Route::get('/admin/votaciones', 'AdminController@votaciones')->name('admin-votaciones');
Route::get('/admin/elecciones', 'AdminController@elecciones')->name('admin-elecciones');
Route::get('/admin/candidatos', 'AdminController@candidatos')->name('admin-candidatos');
Route::get('/admin/circunscripciones', 'AdminController@circunscripciones')->name('admin-circunscripciones');
Route::get('/admin/territorios', 'AdminController@territorios')->name('admin-territorios');
Route::get('/admin/cargas', 'CargasArchivoController@index')->name('admin-cargas');
Route::get('/admin/cargas/procesar/{id}', 'CargasArchivoController@procesar')->name('admin-procesar-archivo');
Route::post('/admin/cargas/procesar/{id}', 'CargasArchivoController@confirmarProcesar')->name('admin-procesar-archivo-confirmar');
Route::post('/admin/cargas/padron-electoral', 'CargasArchivoController@cargaPadronElectoral')->name('admin-carga-padron');
Route::post('/admin/cargas/candidaturas', 'CargasArchivoController@cargaCandidaturas')->name('admin-carga-candidaturas');
