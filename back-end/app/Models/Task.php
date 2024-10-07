<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['title','due_date','attachment','technology_id','coach_id'];

    public function technology() {
        return $this->belongsTo(Technology::class);
    }
    public function coach() {
        return $this->belongsTo(Coach::class);
    }
    public function submissions() {
        return $this->hasMany(Submission::class);
    }
}
