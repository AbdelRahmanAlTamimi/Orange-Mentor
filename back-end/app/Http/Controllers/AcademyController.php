<?php

namespace App\Http\Controllers;

use App\Models\Academy;
use Illuminate\Http\Request;

class AcademyController extends Controller
{

    public function index()
    {
        $academies = Academy::all();
        return response()->json($academies);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'supervisor_id' => 'required|exists:supervisors,id',
            'location' => 'required|string|max:255',
        ]);

        $academy = Academy::create($validatedData);
        return response()->json($academy, 201);
    }


    public function show($id)
    {
        $academy = Academy::find($id);
        return response()->json($academy);
    }


    public function update(Request $request, Academy $academy)
    {
        $validatedData = $request->validate([
            'supervisor_id' => 'sometimes|required|exists:supervisors,id',
            'location' => 'sometimes|required|string|max:255',
        ]);

        $academy->update($validatedData);
        return response()->json($academy);
    }

    public function destroy($id)
    {
        $academy = Academy::find($id);
        if (!$academy) {
            return response()->json([
                'message' => 'Academy Not Found'
            ], 404);
        }
        $academy->delete();
        return response()->json(
            ['message' => 'Academy deleted successfully'
            ], 200);
    }
}
