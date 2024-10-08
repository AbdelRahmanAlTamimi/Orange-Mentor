<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\ManagerStoreRequest;
use Exception;

class ManagerController extends Controller
{

  


    public function index()  {
        $managers = User::where('role_id', 3)->get();

  
        return response()->json([
            'results' => $managers
        ], 200);
    }

 
// abood
    public function store(Request $request)
    {
        try {
            // Validate input data
            $validatedData = $request->validate([
                'Full_name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'address' => 'nullable|string|max:255',
                'DOB' => 'nullable|date',
                'gender' => 'nullable|string|in:male,female',
                'phone' => 'nullable|string|max:20',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);

            // Prepare user data
            $userData = [
                'Full_name' => $validatedData['Full_name'],
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'role_id' => 3,
                'address' => $validatedData['address'] ?? null,
                'DOB' => $validatedData['DOB'] ?? null,
                'gender' => $validatedData['gender'] ?? null,
                'phone' => $validatedData['phone'] ?? null,
            ];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $filename = time() . '_' . preg_replace('/\s+/', '_', pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->storeAs('public/Manager', $filename); // Store the image
                $userData['image'] = $filename;
            }

            $user = User::create($userData);

            $Manager = Manager::create([
                'id'=>$user->id,

            ]);

            $user->Manager_id = $Manager->id;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => "Manager created successfully"
            ], 201);

        } catch (\Exception $e) {
            // Catch any exceptions and return an error response

            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {

        $manager = User::where('id', $id)->where('role_id', 3)->first();
        if (!$manager) {
            return response()->json([
                'message' => 'Supervisor Not Found'

            ], 404);
        }
        return response()->json([
            'results' => $manager
        ], 200);
    }

    public function update(ManagerStoreRequest $request, $id)
    {
        try {
            $manager = Manager::find($id);
            if (!$manager) {
                return response()->json([
                    'message' => 'Manager Not Found'
                ], 404);
            }

            $manager->user->update([
                'Full_name' => $request->Full_name,
                'username' => $request->username,
                'email' => $request->email,
                'address' => $request->address,
                'DOB' => $request->dob,
                'gender' => $request->gender,
                'phone' => $request->phone,
                'image' => $request->image,
            ]);

            if ($request->has('password')) {
                $manager->user->update(['password' => bcrypt($request->password)]);
            }

            return response()->json([
                'message' => 'Manager updated successfully',
                'manager' => $manager->load('user')
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy($id)
    {
        $manager = Manager::find($id);
        if (!$manager) {
            return response()->json([
                'message' => 'Manager Not Found'
            ], 404);
        }
        $manager->user->delete();
        return response()->json([
            'message' => 'Manager deleted successfully'
        ], 200);
    }
}
