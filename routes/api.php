<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\AppController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
Route::prefix('/item')->group(function() {
    Route::post('/store', [ItemController::class, 'store']);
    Route::put('/{id}', [ItemController::class, 'update']);
    Route::delete('/{id}', [ItemController::class, 'destroy']);
});

Route::prefix('/auth')->group(function () {
    Route::post('/register', [AppController::class, 'register']);
    Route::post('/login', [AppController::class, 'login']);
});

// Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/items', [ItemController::class, 'index']);
    Route::get('/auth/init', [AppController::class, 'init']);
    Route::get('/auth/logout', [AppController::class, 'logout']);
});

Route::group( [ 'middleware' => 'admin', 'prefix' => 'admin' ], function () {
    // только для админа
});
