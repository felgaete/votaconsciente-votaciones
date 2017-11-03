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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/votar', 'VotacionController@index')->name('votar');
Route::get('/habilitar', 'VotacionController@habilitar')->name('habilitar');

Route::middleware(['auth', 'auth.admin'])->group(base_path('routes/admin.php'));
