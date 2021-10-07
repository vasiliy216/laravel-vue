<?php

use Illuminate\Support\Facades\Route;

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

Route::prefix('auth')->group(function () {
    Route::get('init', [AppController::class, 'init']);

    Route::post('register', [AppController::class, 'register']);
    Route::post('login', [AppController::class, 'login']);
    Route::post('logout', [AppController::class, 'logout']);
});
