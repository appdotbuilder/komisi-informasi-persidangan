<?php

namespace Database\Factories;

use App\Models\PublicBody;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PublicBody>
 */
class PublicBodyFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\PublicBody>
     */
    protected $model = PublicBody::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company() . ' ' . $this->faker->randomElement(['Provinsi', 'Kota', 'Kabupaten']),
            'code' => strtoupper($this->faker->unique()->lexify('???')),
            'address' => $this->faker->address(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'status' => 'active',
        ];
    }
}