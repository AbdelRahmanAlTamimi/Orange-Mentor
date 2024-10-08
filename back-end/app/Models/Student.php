<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Student extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id'];


    public function academy() {
        return $this->belongsTo(Academy::class);
    }
    public function user() {
        return $this->belongsTo(User::class, 'id', 'id');
    }
    public function submissions() {
        return $this->hasMany(Submission::class);
    }
}
