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
            'full_name' => $this->faker->name(),  // Generates a random full name
            'username' => $this->faker->unique()->userName(),  // Generates a unique username
            'email' => $this->faker->unique()->safeEmail(),  // Generates a unique email address
            'password' => bcrypt('password'),  // Default password for testing
            'role_id' => $this->faker->randomElement([0,1,2]),
            'DOB' => $this->faker->date(),  // Generates a random date of birth
            'gender' => $this->faker->randomElement(['male', 'female']),  // Randomly assigns gender
            'phone' => $this->faker->phoneNumber(),   // Optionally generates a date of birth
            'student_id' => Student::factory(), // Optionally generates a student and assigns its ID
            'coach_id' => Coach::factory(),   // Optionally generates a coach and assigns its ID
            'supervisor_id' => Supervisor::factory(), // Optionally generates a supervisor and assigns its ID
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
