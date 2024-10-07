<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Submission extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['feedback','submission_date','github_repo_url','live_url','task_id','coach_id','student_id'];

    public function student() {
        return $this->belongsTo(Student::class);
    }

    public function task() {
        return $this->belongsTo(Task::class);
    }
    public function coach() {
        return $this->belongsTo(Coach::class);
    }
}
