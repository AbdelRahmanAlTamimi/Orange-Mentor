<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Student;
use App\Models\Coach;
use App\Models\Task;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Submission>
 */
class SubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'feedback' => $this->faker->optional()->text,   // Optionally generates feedback text
            'submission_date' => $this->faker->dateTimeBetween('-1 month', 'now'), // Generates a submission date
            'github_repo_url' => $this->faker->url,         // Generates a URL for the GitHub repository
            'live_url' => $this->faker->url,                // Generates a URL for the live demo
            'task_id' => Task::factory(),                   // Generates a task and assigns its ID
            'coach_id' => Coach::factory(),                 // Generates a coach and assigns its ID
            'student_id' => Student::factory(),             // Generates a student and assigns its ID
        ];
    }
}
