<?php

use App\Http\Controllers\CollectionsController;
use App\Http\Controllers\FoldersController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/user/account', [UsersController::class, 'account']);
    Route::put('/user/password', [UsersController::class, 'password']);
    Route::put('/user/preference', [UsersController::class, 'preference']);
});

Route::post('/folders', [FoldersController::class, 'store']);
Route::get('/folders', [FoldersController::class, 'index']);
Route::post('/folders/reorder', [FoldersController::class, 'reorder']);
Route::put('/folders/{id}', [FoldersController::class, 'update']);
Route::delete('/folders/{id}', [FoldersController::class, 'destroy']);

Route::post('/collections', [CollectionsController::class, 'store']);
Route::get('/collections', [CollectionsController::class, 'index']);
Route::post('/collections/reorder', [CollectionsController::class, 'reorder']);
Route::put('/collections/{id}', [CollectionsController::class, 'update']);
Route::delete('/collections/{id}', [CollectionsController::class, 'destroy']);
Route::post('/collections/duplicate', [CollectionsController::class, 'duplicate']);

Route::post('/tasks', [TasksController::class, 'store']);
Route::get('/tasks', [TasksController::class, 'index']);
Route::post('/tasks/reorder', [TasksController::class, 'reorder']);
Route::put('/tasks/{id}', [TasksController::class, 'update']);
Route::delete('/tasks/{id}', [TasksController::class, 'destroy']);
Route::post('/tasks/duplicate', [TasksController::class, 'duplicate']);
Route::post('/tasks/move', [TasksController::class, 'move']);
