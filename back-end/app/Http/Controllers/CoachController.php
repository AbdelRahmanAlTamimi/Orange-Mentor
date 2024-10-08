<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\User;
use Illuminate\Http\Request;
use Exception;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class CoachController extends Controller
{
    public function index()
    {
        $coaches = User::where('role_id', 1)->get(); // Assuming role_id 1 is for coaches
        return response()->json([
            'results' => $coaches
        ], 200);
    }

    public function store(Request $request)
    {
        try {
            // Validate input data
            $validatedData = $request->validate([
                'full_name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
                'DOB' => 'nullable|date',
                'gender' => 'nullable|string|in:male,female',
                'phone' => 'nullable|string|max:20',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
            ]);

            // Prepare user data
            $userData = [
                'full_name' => $validatedData['full_name'],
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'role_id' => 1,
                'DOB' => $validatedData['DOB'] ?? null,
                'gender' => $validatedData['gender'] ?? null,
                'phone' => $validatedData['phone'] ?? null,
            ];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $imageFile = $request->file('image');
                $filename = time() . '_' . preg_replace('/\s+/', '_', pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME)) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->storeAs('public/coach', $filename); // Store the image
                $userData['image'] = $filename;
            }

            $user = User::create($userData);

            $coach = Coach::create([
                'id' => $user->id,
            ]);

            $user->coach_id = $coach->id;
            $user->save();

            return response()->json([
                'status' => true,
                'message' => "Coach created successfully"
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id)
    {
        $coach = Coach::with('user')->find($id);
        if (!$coach) {
            return response()->json([
                'message' => 'Coach Not Found'
            ], 404);
        }
        return response()->json([
            'results' => $coach
        ], 200);
    }

    public function update(Request $request, $id)
    {
        try {
            // Fetch the user by ID
            $user = User::findOrFail($id);

            // Validate input data
            $validatedData = $request->validate([
                'full_name' => 'required|string|max:255',
                'username' => 'required|string|max:255|unique:users,username,' . $user->id,
                'email' => 'required|email|unique:users,email,' . $user->id,
                'password' => 'nullable|string|min:6',
                'address' => 'nullable|string|max:255',
                'DOB' => 'nullable|date',
                'gender' => 'nullable|string|in:male,female',
                'phone' => 'nullable|string|max:20',
                'image' => 'nullable|image|mimes:jpg,jpeg,png,gif,svg|max:2048',
                'salary' => 'nullable|numeric',
                'degree' => 'nullable|string|max:255',
            ]);

            // Prepare the data for updating the user
            $userData = [
                'full_name' => $validatedData['full_name'],
                'username' => $validatedData['username'],
                'email' => $validatedData['email'],
                'address' => $validatedData['address'] ?? $user->address,
                'DOB' => $validatedData['DOB'] ?? $user->DOB,
                'gender' => $validatedData['gender'] ?? $user->gender,
                'phone' => $validatedData['phone'] ?? $user->phone,
            ];

            // Hash the password if provided
            if (!empty($validatedData['password'])) {
                $userData['password'] = bcrypt($validatedData['password']);
            }

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                // Delete old image if it exists
                if ($user->image && Storage::disk('public')->exists("coach/{$user->image}")) {
                    Storage::disk('public')->delete("coach/{$user->image}");
                }

                $imageFile = $request->file('image');
                $filename = time() . '_' . preg_replace(
                        '/\s+/',
                        '_',
                        pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME)
                    ) . '.' . $imageFile->getClientOriginalExtension();
                $imageFile->storeAs('public/coach', $filename);
                $userData['image'] = $filename;
            }

            // Update the user
            $user->update($userData);

            // Prepare coach data
            $coachData = [
                'salary' => $validatedData['salary'] ?? ($user->coach->salary ?? null),
                'degree' => $validatedData['degree'] ?? ($user->coach->degree ?? null),
            ];

            // Update or create the coach record
            if ($user->coach) {
                $user->coach->update($coachData);
            } else {
                $coach = Coach::create(array_merge($coachData, ['user_id' => $user->id]));
                $user->coach_id = $coach->id;
                $user->save();
            }

            return response()->json([
                'status' => true,
                'message' => "Coach updated successfully",
                'user' => $user->fresh()->load('coach'),
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Something went wrong',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function destroy($id)
    {
        $coach = User::find($id);
        if (!$coach) {
            return response()->json([
                'message' => 'Coach Not Found'
            ], 404);
        }
        $coach->delete();
        return response()->json([
            'message' => 'Coach deleted successfully'
        ], 200);
    }
}
