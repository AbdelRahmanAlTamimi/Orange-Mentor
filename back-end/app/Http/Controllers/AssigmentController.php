<?php

namespace App\Http\Controllers;

use App\Models\Assigment;
use Illuminate\Http\Request;
use Storage;

class AssigmentController extends Controller
{
    // Get all assigments
    public function index()
    {
        $assigments = Assigment::all();
        return response()->json($assigments);
    }

    // Store a new assigment
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'nullable|string|max:255',
            'attachment' => 'nullable|file|mimes:pdf',
            'teacher_id' => 'nullable|integer',
        ]);

        $path = $request->file('attachment') ? $request->file('attachment')->store('pdfs', 'public') : null;

        $assigment = Assigment::create([
            'title' => $validated['title'],
            'attachment' => $path,
            'teacher_id' => $validated['teacher_id'],
        ]);

        return response()->json($assigment, 201);
    }

    // Show a specific assigment
    public function show($id)
    {
        $assigment = Assigment::find($id);

        if (!$assigment) {
            return response()->json(['message' => 'Assignment not found'], 404);
        }

        $assigment->attachment = Storage::url($assigment->attachment);
        
        return response()->json($assigment);
    }

    // Update an existing assigment
    public function update(Request $request, $id)
{
    try {
        $assigment = Assigment::find($id);

        if (!$assigment) {
            return response()->json(['message' => 'Assigment not found'], 404);
        }

        // Validate the input
        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'attachment' => 'sometimes|file|mimes:pdf',
            'teacher_id' => 'sometimes|integer',
        ]);

        // Update title if provided
        if (isset($validated['title'])) {
            $assigment->title = $validated['title'];
        }

          // Update teacher_id if provided
          if (isset($validated['teacher_id'])) {
            $assigment->teacher_id = $validated['teacher_id'];
        }

        // Handle attachment if provided
        if ($request->hasFile('attachment')) {
            if ($assigment->attachment) {
                Storage::disk('public')->delete($assigment->attachment);
            }
            $assigment->attachment = $request->file('attachment')->store('pdfs', 'public');
        }

      
        // dd($request->all());
        // Save the changes to the assignment
        $assigment->save();

        // Return the updated assignment as a response
        return response()->json([
            'message'=> 'assigment updated successfully',
            "assigment" => $assigment->fresh()
        ]);

    } catch (\Exception $e) {
        // Catch any exceptions and return an error response
        return response()->json([
            'message' => 'An error occurred while updating the assignment.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    // Delete an assigment
    public function destroy($id)
    {
        $assigment = Assigment::find($id);

        if (!$assigment) {
            return response()->json(['message' => 'Assigment not found'], 404);
        }

        $assigment->delete();

        return response()->json(['message' => 'Assigment deleted']);
    }
} 