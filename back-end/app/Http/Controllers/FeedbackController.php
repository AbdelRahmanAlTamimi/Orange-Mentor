<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{

    public function index()
    {
        $feedbacks = Feedback::with(['Student', 'Teacher', 'Supervisor', 'Manager'])->get();
        return response()->json($feedbacks, 200);
    }


    public function show($id)
    {
        $feedback = Feedback::with(['student', 'teacher', 'supervisor', 'manager'])->find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        return response()->json($feedback, 200);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'student_id' => 'nullable|exists:students,id',
            'teacher_id' => 'nullable|exists:teachers,id',
            'supervisor_id' => 'nullable|exists:supervisors,id',
            'manager_id' => 'nullable|exists:managers,id',
        ]);

        $feedback = Feedback::create($validatedData);
        return response()->json($feedback, 201);
    }


    public function update(Request $request, $id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'student_id' => 'nullable|exists:students,id',
            'teacher_id' => 'nullable|exists:teachers,id',
            'supervisor_id' => 'nullable|exists:supervisors,id',
            'manager_id' => 'nullable|exists:managers,id',
        ]);

        $feedback->update($validatedData);
        return response()->json($feedback, 200);
    }


    public function destroy($id)
    {
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json(['message' => 'Feedback not found'], 404);
        }

        $feedback->delete();
        return response()->json(['message' => 'Feedback deleted successfully'], 200);
    }
}
