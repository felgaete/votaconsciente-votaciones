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

Route::get('/', 'VotacionController@index')->name('inicio');
Route::get('/votar', 'VotacionController@votar')->name('votar');
Route::get('/habilitar', 'VotacionController@habilitar')->name('habilitar');
Route::post('/habilitar', 'VotacionController@postHabilitar')->name('post-habilitar');
Route::get('/votar/eleccion/{id}', 'VotacionController@votar')->name('votar-eleccion');

Route::middleware(['auth', 'auth.admin'])->namespace('Admin')->prefix('admin')->group(base_path('routes/admin.php'));
