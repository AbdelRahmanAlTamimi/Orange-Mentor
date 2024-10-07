<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Supervisor;
use App\Models\Academy;
use App\Models\Coach;
use App\Models\Student;
use App\Models\Technology;
use App\Models\Task;
use App\Models\Submission;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Supervisors
        Supervisor::factory(3)->create();

        // Create Academies and link them to Supervisors
        Academy::factory(5)->create();

        // Create Coaches and link them to Academies
        Coach::factory(10)->create();

        // Create Students and link them to Academies
        Student::factory(20)->create();

        // Create Technologies
        Technology::factory(5)->create();

        // Create Tasks and link them to Technologies and Coaches
        Task::factory(30)->create();

        // Create Users (which may represent Students, Coaches, or Supervisors)
        User::factory(25)->create();

        // Create Submissions linked to Tasks, Coaches, and Students
        Submission::factory(20)->create();

    }
}
