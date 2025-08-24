<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChallengeController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\UserChallengesController;
use App\Http\Controllers\UserController;
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

Route::get('/lessons', [LessonController::class, 'index']);
Route::get('/lessons/{id}', [LessonController::class, 'show']);

Route::get('/challenges', [ChallengeController::class, 'index']);
Route::get('/challenges/{id}', [ChallengeController::class, 'show']);

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::resource('lessons', LessonController::class)
        ->only(['store', 'update', 'destroy']);

    Route::resource('challenges', ChallengeController::class)
        ->only(['store', 'update', 'destroy']);

    Route::get('/user-challenges', [UserChallengesController::class, 'index']);
    Route::get('/user-challenges/{id}', [UserChallengesController::class, 'show']);
    Route::post('/user-challenges', [UserChallengesController::class, 'store']);

    Route::get('/users', [UserController::class, 'index']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
