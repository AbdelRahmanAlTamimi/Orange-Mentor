<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Technology extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = ['name','status'];

    public function tasks() {
        return $this->hasMany(Task::class);
    }
    public function academies()
    {
        return $this->belongsToMany(Academy::class, 'academy_technology')->withTimestamps();
    }
}
