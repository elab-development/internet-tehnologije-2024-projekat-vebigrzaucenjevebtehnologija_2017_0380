<?php

namespace Database\Factories;

use App\Models\Lesson;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Challenge>
 */
class ChallengeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'lesson_id' => Lesson::factory(),
            'title' => fake()->sentence(2),
            'type' => fake()->randomElement(['mcq', 'fill_blank', 'code']),
            'question' => fake()->paragraph(),
            'answer' => fake()->sentence(),
            'points_rewarded' => fake()->numberBetween(5, 20),
        ];
    }
}
