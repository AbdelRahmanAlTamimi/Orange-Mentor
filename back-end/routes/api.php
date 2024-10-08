<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\SchoolClassController;
use App\Http\Controllers\SubjectController;
use App\Http\Controllers\AssigmentController;

use App\Http\Controllers\EventController;
use App\Http\Controllers\ImageController;


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::middleware('role:1')->group(function () {
        Route::get('/admin', function () {
            return response()->json(['message' => 'Admin access granted']);
        });
    });

    Route::middleware('role:0,1')->group(function () {
        Route::get('/protected', function () {
            return response()->json(['message' => 'Protected access granted']);
        });
    });
});

//----------------- Auth --------------------------------
Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);
//--------------- User ---------------------------------
Route::get('users',[UserController::class,'index']);
Route::get('users/{id}',[UserController::class,'show']);
Route::post('add_user',[UserController::class,'store']);
Route::put('userUpdate/{id}',[UserController::class,'update']);
Route::delete('userDelete/{id}',[UserController::class,'destroy']);

//------------------ Student -----------------------------------
Route::get('students',[StudentController::class,'index']);
Route::get('student/{id}',[StudentController::class,'show']);
Route::post('add_student',[StudentController::class,'store']);
Route::put('studentUpdate/{id}',[StudentController::class,'update']);
Route::delete('studentDelete/{id}',[StudentController::class,'destroy']);

//---------------- Message -----------------------------------------
Route::get('messages',[MessageController::class,'index']);
Route::get('message/{id}',[MessageController::class,'show']);
Route::delete('messageDelete/{id}',[MessageController::class,'destroy']);

//------------- Supervisor -------------------------------------------
Route::get('supervisors',[SupervisorController::class,'index']);
Route::get('supervisor/{id}',[SupervisorController::class,'show']);
Route::post('add_supervisor',[SupervisorController::class,'store']);
Route::put('supervisorUpdate/{id}',[SupervisorController::class,'update']);
Route::delete('supervisorDelete/{id}',[SupervisorController::class,'destroy']);

//---------------- Teacher -----------------------------------------
Route::get('teachers', [TeacherController::class, 'index']);
Route::get('/teachers/{id}', [TeacherController::class, 'show']);
Route::post('/add_teachers', [TeacherController::class, 'store']);
Route::put('/teachersUpdate/{id}', [TeacherController::class, 'update']);
Route::delete('/teachersDelete/{id}', [TeacherController::class, 'destroy']);

//---------------- Managers -----------------------------------------
Route::get('managers', [ManagerController::class, 'index']);
Route::get('/managers/{id}', [ManagerController::class, 'show']);
Route::post('/add_managers', [ManagerController::class, 'store']);
Route::put('/managersUpdate/{id}', [ManagerController::class, 'update']);
Route::delete('/managersDelete/{id}', [ManagerController::class, 'destroy']);

//----------------------Feedback------------------------------
Route::get('/feedbacks', [FeedbackController::class, 'index']);
Route::get('/feedbacksview/{id}', [FeedbackController::class, 'show']);
Route::post('/feedbacksstore', [FeedbackController::class, 'store']);
Route::put('/feedbacksupdate/{id}', [FeedbackController::class, 'update']);
Route::delete('/feedbacksdelete/{id}', [FeedbackController::class, 'destroy']);
//----------------------SchoolClass------------------------------
Route::get('/class', [SchoolClassController::class, 'index']);
Route::get('/classview/{id}', [SchoolClassController::class, 'show']);
Route::post('/classstore', [SchoolClassController::class, 'store']);
Route::put('/classupdate/{id}', [SchoolClassController::class, 'update']);
Route::delete('/classdelete/{id}', [SchoolClassController::class, 'destroy']);


//---------------- Subjects -----------------------------------------

Route::get('/subjects', [SubjectController::class, 'index']);

Route::post('/subjects', [SubjectController::class, 'store']);

Route::get('/subjects/{id}', [SubjectController::class, 'show']);

Route::put('/subjects/{id}', [SubjectController::class, 'update']);

Route::delete('/subjects/{id}', [SubjectController::class, 'destroy']);

//---------------- assigment -----------------------------------------

Route::get('/assigments', [AssigmentController::class, 'index']);
Route::post('/assigments', [AssigmentController::class, 'store']);
Route::get('/assigments/{id}', [AssigmentController::class, 'show']);
Route::put('/assigments/{id}', [AssigmentController::class, 'update']);
Route::delete('/assigments/{id}', [AssigmentController::class, 'destroy']);


