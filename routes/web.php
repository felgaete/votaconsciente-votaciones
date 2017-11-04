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

Route::middleware(['auth', 'auth.admin'])->group(base_path('routes/admin.php'));
