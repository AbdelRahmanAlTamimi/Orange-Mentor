<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;

class ImageController extends Controller
{
    public function imageUpload(Request $req) {
        $postObj = new Image;

        if($req->hasFile('image')) {
            $filename = $req->file('image')->getClientOriginalName(); // get the file name
            $getfilenamewitoutext = pathinfo($filename, PATHINFO_FILENAME); // get the file name without extension
            $getfileExtension = $req->file('image')->getClientOriginalExtension(); // get the file extension
            $createnewFileName = time().'_'.str_replace(' ','_', $getfilenamewitoutext).'.'.$getfileExtension; // create new random file name
            $img_path = $req->file('image')->storeAs('public/post_img', $createnewFileName); // get the image path
            $postObj->image = $createnewFileName; // pass file name with column
        }

        if($postObj->save()) { // save file in databse
            return ['status' => true, 'message' => "Image uploded successfully"];
        }
        else {
            return ['status' => false, 'message' => "Error : Image not uploded successfully"];

        }

    }
}
