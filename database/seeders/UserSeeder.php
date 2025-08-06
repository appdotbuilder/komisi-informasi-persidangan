<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create staff users
        User::create([
            'name' => 'Admin Staf KIP',
            'email' => 'staff@kip.go.id',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '021-11111111',
            'address' => 'Kantor Komisi Informasi Provinsi',
            'nik' => '1234567890123456',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Staf Verifikasi',
            'email' => 'verifikasi@kip.go.id',
            'password' => Hash::make('password'),
            'role' => 'staff',
            'phone' => '021-11111112',
            'address' => 'Kantor Komisi Informasi Provinsi',
            'nik' => '1234567890123457',
            'status' => 'active',
        ]);

        // Create commissioner users
        User::create([
            'name' => 'Ketua Komisioner',
            'email' => 'ketua@kip.go.id',
            'password' => Hash::make('password'),
            'role' => 'commissioner',
            'phone' => '021-22222221',
            'address' => 'Kantor Komisi Informasi Provinsi',
            'nik' => '2234567890123456',
            'status' => 'active',
        ]);

        User::create([
            'name' => 'Komisioner Anggota',
            'email' => 'anggota@kip.go.id',
            'password' => Hash::make('password'),
            'role' => 'commissioner',
            'phone' => '021-22222222',
            'address' => 'Kantor Komisi Informasi Provinsi',
            'nik' => '2234567890123457',
            'status' => 'active',
        ]);

        // Create applicant user for testing
        User::create([
            'name' => 'Pemohon Test',
            'email' => 'pemohon@example.com',
            'password' => Hash::make('password'),
            'role' => 'applicant',
            'phone' => '081234567890',
            'address' => 'Jl. Pemohon No. 123, Jakarta',
            'nik' => '3174010101900001',
            'status' => 'active',
        ]);
    }
}