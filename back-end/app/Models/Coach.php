<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Coach extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['academy_id'];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function academy() {
        return $this->belongsTo(Academy::class);
    }
    public function submissions() {
        return $this->hasMany(Submission::class);
    }
    public function tasks() {
        return $this->hasMany(Task::class);
    }
}
