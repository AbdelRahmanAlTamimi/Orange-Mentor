<?php

namespace App\Http\Controllers;

use App\Models\Technology;
use App\Models\Academy;
use Illuminate\Http\Request;

class TechnologyController extends Controller
{

    public function index()
    {
        $technologies = Technology::all();
        return response()->json($technologies);
    }


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:technologies',
            'status' => 'required|in:active,inactive',
        ]);

        $technology = Technology::create($validatedData);
        return response()->json($technology, 201);
    }


    public function show($id)
    {
        $technology = Technology::find($id);
        return response()->json($technology);
    }


    public function update(Request $request, $id)
    {
        $technology = Technology::find($id);
        $validatedData = $request->validate([
            'name' => 'sometimes|required|string|max:255|unique:technologies,name,' . $technology->id,
            'status' => 'sometimes|required|in:active,inactive',
        ]);

        $technology->update($validatedData);
        return response()->json([
            'message' => 'Technology updated successfully.',
            'technology' => $technology
            ], 200);
    }


    public function destroy($id)
    {
        $technology = Technology::find($id);
        $technology->delete();
        return response()->json(['message' =>" Technology deleted successfully"], 200);
    }


    public function attachToAcademy(Request $request, Technology $technology)
    {
        $validatedData = $request->validate([
            'academy_id' => 'required|exists:academies,id',
        ]);

        $academy = Academy::findOrFail($validatedData['academy_id']);
        $technology->academies()->attach($academy);

        return response()->json(['message' => 'Technology attached to academy successfully']);
    }

    public function detachFromAcademy(Request $request, Technology $technology)
    {
        $validatedData = $request->validate([
            'academy_id' => 'required|exists:academies,id',
        ]);

        $academy = Academy::findOrFail($validatedData['academy_id']);
        $technology->academies()->detach($academy);

        return response()->json(['message' => 'Technology detached from academy successfully']);
    }


    public function getAssociatedAcademies(Technology $technology)
    {
        $academies = $technology->academies;
        return response()->json($academies);
    }
}
