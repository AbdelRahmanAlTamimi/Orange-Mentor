<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Academy extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['location'];

    public function supervisor() {
        return $this->belongsTo(Supervisor::class);
    }
    public function coaches() {
        return $this->hasMany(Coach::class);
    }
    public function students() {
        return $this->hasMany(Student::class);
    }

}
