<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
        public function index()
    {
        $events = Event::all();
        return response()->json($events);
    }
       public function show($id)
    {       $event = Event::findOrFail($id);

        return response()->json($event);
    }

public function store(Request $request)
{
    try {
        // Validate incoming request data
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'nullable|date',
            'end_time' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image
        ]);

        // Create the event
        $event = new Event();
        $event->title = $validatedData['title'];
        $event->description = $validatedData['description'];
        $event->start_time = $validatedData['start_time'];
        $event->end_time = $validatedData['end_time'];

        // Handle image upload
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();  
            $request->image->move(public_path('images'), $imageName);
            $event->image_path = 'images/' . $imageName; // Save the image path to the image_path column
        }

        $event->save();

        return response()->json($event, 201); // Return the created event
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}



public function update(Request $request, $id)

{
    $event = Event::findOrFail($id);

    $validatedData = $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'nullable|string',
        'start_time' => 'nullable|date',
        'end_time' => 'nullable|date|after:start_time',
    ]);

    $event->update($validatedData);

    return response()->json([
        'message' => 'Event updated successfully!',
        'event' => $event
    ]);
}

public function destroy($id)
{
    $event = Event::findOrFail($id);
    $event->delete();
    return response()->json([
        'message' => 'Event deleted successfully!'
    ]);
}




}
