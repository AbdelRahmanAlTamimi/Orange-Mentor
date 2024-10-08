<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function index()  {
        $messages =Message::all();
        return response()->json([
            'results'=>$messages
        ],200);
    }

    public function show($id)  {
        $messages =Message::find($id);
        if(!$messages){
            return response()->json([
                'message'=>'Message Not Found'
            ],404);
        }
        return response()->json([
            'results'=>$messages
        ],200);
    }

    public function destroy($id){
        $messages =Message::find($id);
        if(!$messages){
            return response()->json([
                'message'=>'Message Not Found'
            ],404);}
        $messages->delete();
        return response()->json([
            'message'=>'deleted successfully'
        ],200);
    }

}
