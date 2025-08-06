<?php

namespace Database\Factories;

use App\Models\InformationRequest;
use App\Models\PublicBody;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\InformationRequest>
 */
class InformationRequestFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var class-string<\App\Models\InformationRequest>
     */
    protected $model = InformationRequest::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $status = $this->faker->randomElement([
            'submitted', 
            'under_review', 
            'needs_completion', 
            'accepted', 
            'in_process'
        ]);

        return [
            'request_number' => 'KIP-' . now()->year . now()->format('m') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'applicant_name' => $this->faker->name(),
            'applicant_address' => $this->faker->address(),
            'applicant_phone' => $this->faker->phoneNumber(),
            'applicant_email' => $this->faker->optional()->safeEmail(),
            'applicant_nik' => $this->faker->numerify('################'),
            'public_body_id' => PublicBody::factory(),
            'request_subject' => $this->faker->paragraph(3),
            'request_purpose' => $this->faker->paragraph(2),
            'documents' => $this->faker->optional()->randomElements([
                'KTP.pdf',
                'Surat Kuasa.pdf',
                'Bukti Permohonan Awal.pdf'
            ], random_int(1, 3)),
            'status' => $status,
            'user_id' => User::factory(),
            'submitted_at' => $status !== 'draft' ? $this->faker->dateTimeBetween('-30 days', 'now') : null,
            'reviewed_at' => in_array($status, ['accepted', 'needs_completion', 'in_process']) ? $this->faker->dateTimeBetween('-20 days', 'now') : null,
        ];
    }

    /**
     * Indicate that the request is in draft status.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'submitted_at' => null,
            'reviewed_at' => null,
        ]);
    }

    /**
     * Indicate that the request is submitted.
     */
    public function submitted(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'submitted',
            'submitted_at' => $this->faker->dateTimeBetween('-7 days', 'now'),
            'reviewed_at' => null,
        ]);
    }
}