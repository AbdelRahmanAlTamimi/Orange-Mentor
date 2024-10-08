<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Student;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['message' => 'Invalid login details'], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $user,
        ]);
    }

    public function register(Request $request)
    {
        try {
            DB::beginTransaction();

            $userData = [
                'username' => $request->username,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'role_id' => 0,
                'full_name' => $request->full_name,
                'DOB' => $request->DOB,
                'phone' => $request->phone,
                'gender' => $request->gender,
            ];

            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $filename = time() . '_' . preg_replace('/\s+/', '_', pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->storeAs('public/images', $filename); // Store the image
                $userData['image'] = $filename;
            }
            $user = User::create($userData);

            $student = Student::create([
                'id' => $user->id,
                'academy_id' =>$request->academy_id
            ]);

            $user->student_id = $student->id;
            $user->save();

            DB::commit();
            return response()->json([
                'message' => 'Student created successfully',
                'user' => $user,
                'student' => $student
            ], 201);

        } catch (Exception $e) {
            DB::rollBack();

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),

            ], 500);
        }
    }

    public function logout(Request $request)
    {
        try {
            if (!$request->user()) {
                throw new \Exception('User not authenticated');
            }

            $request->user()->currentAccessToken()->delete();
            return response()->json(['message' => 'You have been logged out']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 401);
        }
    }
}
