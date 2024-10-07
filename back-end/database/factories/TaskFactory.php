<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Technology;
use App\Models\Coach;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence,          // Generates a random task title
            'due_date' => $this->faker->dateTimeBetween('now', '+1 month'), // Generates a due date between now and a month later
            'attachment' => $this->faker->optional()->url, // Optionally generates a URL as the attachment
            'technology_id' => Technology::factory(),   // Generates a technology and assigns its ID
            'coach_id' => Coach::factory(),             // Generates a coach and assigns its ID
        ];
    }
}
