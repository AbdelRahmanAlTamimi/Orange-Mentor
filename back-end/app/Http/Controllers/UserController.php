<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()  {
        $users =User::all();
        return response()->json([
            'results'=>$users
        ],200);
    }
    public function store(UserStoreRequest $request) {
        try{
            User::create([
                'name'=>$request->name,
                'email'=>$request->email,
                'password'=>$request->password,
            ]);
             return response()->json([
            'message'=>'user created successfully'
        ],200);

        }catch(Exception $e){
                  return response()->json([
            'message'=>'something wrong'
        ],500);
        }
    }
    public function show($id)  {
        $user =User::find($id);
        if(!$user){
              return response()->json([
            'message'=>'User Not Found'
        ],404);
        }
        return response()->json([
            'results'=>$user
        ],200);
    }

     public function update(UserStoreRequest $request,$id)  {
        try{
             $user =User::find($id);
        if(!$user){
            return response()->json([
            'message'=>'User Not Found'
        ],404);}
        $user->name=$request->name;
        $user->email=$request->email;
        $user->password=$request->password;
        $user->save();
          return response()->json([
            'message'=>'updated successfully'
        ],200);

        }catch(Exception $e){
                  return response()->json([
            'message'=>'something wrong'
        ],500);
        }
}



public function destroy($id){
             $user =User::find($id);
   if(!$user){
            return response()->json([
            'message'=>'User Not Found'
        ],404);}
        $user->delete();
              return response()->json([
            'message'=>'deleted successfully'
        ],200);
}




}
