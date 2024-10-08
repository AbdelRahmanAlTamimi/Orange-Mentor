<?php

namespace App\Http\Controllers;

use App\Models\School_class; // Ensure you import your model
use Illuminate\Http\Request;
class SchoolClassController extends Controller
{
    // Display a listing of the classes
    public function index()
    {
        $classes = School_class::all();
        return response()->json($classes, 200); // Return all classes with a 200 status
    }

    // Display the specified class
    public function show($id)
    {
        $class = School_class::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        return response()->json($class, 200);
    }

    // Store a newly created class in storage
    public function store(Request $request)
    {
        // Validate the incoming request
        $validatedData = $request->validate([
            'class_name' => 'required|string|max:255',
        ]);

        $class = School_class::create($validatedData);
        return response()->json($class, 201); // Return created class with a 201 status
    }

    // Update the specified class in storage
    public function update(Request $request, $id)
    {
        $class = School_class::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        // Validate the incoming request
        $validatedData = $request->validate([
            'class_name' => 'sometimes|required|string|max:255',
        ]);

        $class->update($validatedData);
        return response()->json($class, 200); // Return updated class with a 200 status
    }

    // Remove the specified class from storage
    public function destroy($id)
    {
        $class = School_class::find($id);

        if (!$class) {
            return response()->json(['message' => 'Class not found'], 404);
        }

        $class->delete();
        return response()->json(['message' => 'Class deleted successfully'], 200); // Return success message with a 200 status
    }
}
