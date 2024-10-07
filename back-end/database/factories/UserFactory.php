<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Student;
use App\Models\Coach;
use App\Models\Supervisor;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'username' => $this->faker->userName,        // Generates a random username
            'full_name' => $this->faker->name,           // Generates a random full name
            'email' => $this->faker->unique()->safeEmail, // Generates a unique email address
            'email_verified_at' => now(),                // Sets email verified time to now
            'password' => bcrypt('password'),            // Assigns a hashed password (bcrypt)
            'image' => $this->faker->optional()->imageUrl(), // Optionally generates a URL for the image
            'gender' => $this->faker->randomElement(['male', 'female']), // Randomly assigns 'male' or 'female'
            'phone' => $this->faker->optional()->phoneNumber, // Optionally generates a phone number
            'role_id' => $this->faker->randomElement([0, 1, 2, 3]), // Randomly assigns a role ID
            'DOB' => $this->faker->optional()->date(),    // Optionally generates a date of birth
            'student_id' => Student::factory()->optional(), // Optionally generates a student and assigns its ID
            'coach_id' => Coach::factory()->optional(),   // Optionally generates a coach and assigns its ID
            'supervisor_id' => Supervisor::factory()->optional(), // Optionally generates a supervisor and assigns its ID
            'remember_token' => Str::random(10),          // Generates a random remember token
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
