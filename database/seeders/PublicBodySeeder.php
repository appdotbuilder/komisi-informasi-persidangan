<?php

namespace Database\Seeders;

use App\Models\PublicBody;
use Illuminate\Database\Seeder;

class PublicBodySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $publicBodies = [
            [
                'name' => 'Sekretariat Daerah Provinsi',
                'code' => 'SETDA',
                'address' => 'Jl. Gubernur No. 1, Kota Provinsi',
                'phone' => '021-12345678',
                'email' => 'setda@provinsi.go.id',
                'status' => 'active',
            ],
            [
                'name' => 'Dinas Pendidikan Provinsi',
                'code' => 'DISDIK',
                'address' => 'Jl. Pendidikan No. 10, Kota Provinsi',
                'phone' => '021-12345679',
                'email' => 'disdik@provinsi.go.id',
                'status' => 'active',
            ],
            [
                'name' => 'Dinas Kesehatan Provinsi',
                'code' => 'DINKES',
                'address' => 'Jl. Kesehatan No. 5, Kota Provinsi',
                'phone' => '021-12345680',
                'email' => 'dinkes@provinsi.go.id',
                'status' => 'active',
            ],
            [
                'name' => 'Dinas Pekerjaan Umum dan Penataan Ruang',
                'code' => 'PUPR',
                'address' => 'Jl. PUPR No. 15, Kota Provinsi',
                'phone' => '021-12345681',
                'email' => 'pupr@provinsi.go.id',
                'status' => 'active',
            ],
            [
                'name' => 'Badan Perencanaan Pembangunan Daerah',
                'code' => 'BAPPEDA',
                'address' => 'Jl. Perencanaan No. 8, Kota Provinsi',
                'phone' => '021-12345682',
                'email' => 'bappeda@provinsi.go.id',
                'status' => 'active',
            ],
            [
                'name' => 'Dinas Lingkungan Hidup',
                'code' => 'DLH',
                'address' => 'Jl. Lingkungan No. 3, Kota Provinsi',
                'phone' => '021-12345683',
                'email' => 'dlh@provinsi.go.id',
                'status' => 'active',
            ],
        ];

        foreach ($publicBodies as $body) {
            PublicBody::create($body);
        }
    }
}