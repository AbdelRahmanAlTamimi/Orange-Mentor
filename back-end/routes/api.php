<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\SupervisorController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\ManagerController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\AcademyController;
use App\Http\Controllers\TechnologyController;
use App\Http\Controllers\AssigmentController;




//Route::post('/register', [AuthController::class, 'register']);
//Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
//    Route::post('/logout', [AuthController::class, 'logout']);
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
Route::post('login', [AuthController::class, 'login']);// done
Route::post('register', [AuthController::class, 'register']); //done
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



//------------- Supervisor -------------------------------------------
Route::get('supervisors',[SupervisorController::class,'index']);
Route::get('supervisor/{id}',[SupervisorController::class,'show']);
Route::post('add_supervisor',[SupervisorController::class,'store']);
Route::put('supervisorUpdate/{id}',[SupervisorController::class,'update']);
Route::delete('supervisorDelete/{id}',[SupervisorController::class,'destroy']);

//---------------- Coach -----------------------------------------
Route::get('coaches', [CoachController::class, 'index']);
Route::get('/coaches/{id}', [CoachController::class, 'show']);
Route::post('/add_coaches', [CoachController::class, 'store']);
Route::put('/coachesUpdate/{id}', [CoachController::class, 'update']);
Route::delete('/coachesDelete/{id}', [CoachController::class, 'destroy']);

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
//----------------------Academy------------------------------
Route::get('/Academies', [AcademyController::class, 'index']);
Route::get('/Academies/{id}', [AcademyController::class, 'show']);
Route::post('/add_Academy', [AcademyController::class, 'store']);
Route::put('/AcademyUpdate/{id}', [AcademyController::class, 'update']);
Route::delete('/AcademyDelete/{id}', [AcademyController::class, 'destroy']);


//---------------- Technology -----------------------------------------
Route::get('/technologies', [TechnologyController::class, 'index']);
Route::get('/technologies/{id}', [TechnologyController::class, 'show']);
Route::post('/add_technology', [TechnologyController::class, 'store']);
Route::put('/technologyUpdate/{id}', [TechnologyController::class, 'update']);
Route::delete('/technologyDelete/{id}', [TechnologyController::class, 'destroy']);
Route::post('technologies/{technology}/attach', [TechnologyController::class, 'attachToAcademy']);
Route::post('technologies/{technology}/detach', [TechnologyController::class, 'detachFromAcademy']);
Route::get('technologies/{technology}/academies', [TechnologyController::class, 'getAssociatedAcademies']);

//---------------- assigment -----------------------------------------

Route::get('/assigments', [AssigmentController::class, 'index']);
Route::post('/assigments', [AssigmentController::class, 'store']);
Route::get('/assigments/{id}', [AssigmentController::class, 'show']);
Route::put('/assigments/{id}', [AssigmentController::class, 'update']);
Route::delete('/assigments/{id}', [AssigmentController::class, 'destroy']);


