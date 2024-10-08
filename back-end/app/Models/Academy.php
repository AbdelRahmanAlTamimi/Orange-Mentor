<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Academy extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['id','location','supervisor_id'];

    public function supervisor() {
        return $this->belongsTo(Supervisor::class);
    }
    public function coaches() {
        return $this->hasMany(Coach::class);
    }
    public function students() {
        return $this->hasMany(Student::class);
    }

    public function technologies()
    {
        return $this->belongsToMany(Technology::class, 'academy_technology')->withTimestamps();
    }

}
