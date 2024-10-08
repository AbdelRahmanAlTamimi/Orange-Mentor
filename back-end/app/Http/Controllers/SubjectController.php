<?php

namespace App\Http\Controllers;

use App\Models\Subject;
use Illuminate\Http\Request;

class SubjectController extends Controller
{
    // Method to retrieve all subjects
    public function index()
    {
        $subjects = Subject::all();
        return response()->json($subjects);
    }

    // Method to store a new subject
    public function store(Request $request)
    {
        $request->validate([
            'subject_name' => 'required|string|max:255',
            'semester' => 'required|string|max:255',
            'school_class_id' => 'required|integer',
            'teacher_id' => 'required|integer',
        ]);

        $subject = Subject::create($request->all());
        return response()->json($subject, 201);
    }

    // Method to show a specific subject
    public function show($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }
        return response()->json($subject);
    }

    // Method to update a subject
    public function update(Request $request, $id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $request->validate([
            'subject_name' => 'string|max:255',
            'semster' => 'string|max:255',
            'school_class_id' => 'integer',
            'teacher_id' => 'integer',
        ]);

        $subject->update($request->all());
        return response()->json($subject);
    }

    // Method to delete a subject
    public function destroy($id)
    {
        $subject = Subject::find($id);
        if (!$subject) {
            return response()->json(['message' => 'Subject not found'], 404);
        }

        $subject->delete();
        return response()->json(['message' => 'Subject deleted successfully']);
    }
}
