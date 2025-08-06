<?php

namespace Database\Seeders;

use App\Models\InformationRequest;
use App\Models\PublicBody;
use App\Models\User;
use Illuminate\Database\Seeder;

class InformationRequestSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some sample requests with the test applicant
        $applicant = User::where('role', 'applicant')->first();
        $publicBodies = PublicBody::all();
        
        if ($applicant && $publicBodies->count() > 0) {
            // Create a submitted request ready for review
            InformationRequest::create([
                'request_number' => InformationRequest::generateRequestNumber(),
                'applicant_name' => $applicant->name,
                'applicant_address' => $applicant->address ?? 'Jl. Test No. 123, Jakarta',
                'applicant_phone' => $applicant->phone ?? '081234567890',
                'applicant_email' => $applicant->email,
                'applicant_nik' => $applicant->nik ?? '3174010101900001',
                'public_body_id' => $publicBodies->random()->id,
                'request_subject' => 'Permohonan data anggaran dan realisasi program pembangunan infrastruktur jalan di wilayah Jakarta Selatan tahun 2023-2024. Termasuk detail alokasi per proyek, kontraktor yang terlibat, dan timeline pelaksanaan.',
                'request_purpose' => 'Untuk keperluan penelitian akademis terkait efektivitas program pembangunan infrastruktur publik dan transparansi pengelolaan anggaran daerah.',
                'documents' => ['KTP.pdf', 'Surat Pengantar Universitas.pdf'],
                'status' => 'submitted',
                'user_id' => $applicant->id,
                'submitted_at' => now()->subDays(2),
            ]);

            // Create an accepted request
            InformationRequest::create([
                'request_number' => InformationRequest::generateRequestNumber(),
                'applicant_name' => $applicant->name,
                'applicant_address' => $applicant->address ?? 'Jl. Test No. 123, Jakarta',
                'applicant_phone' => $applicant->phone ?? '081234567890',
                'applicant_email' => $applicant->email,
                'applicant_nik' => $applicant->nik ?? '3174010101900001',
                'public_body_id' => $publicBodies->random()->id,
                'request_subject' => 'Informasi mengenai jumlah dan jenis pelayanan kesehatan yang tersedia di Puskesmas se-Jakarta, termasuk data kunjungan pasien dan tingkat kepuasan masyarakat.',
                'request_purpose' => 'Untuk evaluasi kualitas pelayanan kesehatan publik sebagai bagian dari tugas akhir mahasiswa kesehatan masyarakat.',
                'status' => 'accepted',
                'user_id' => $applicant->id,
                'staff_notes' => 'Permohonan telah diverifikasi dan memenuhi persyaratan formal. Diteruskan untuk proses lebih lanjut.',
                'submitted_at' => now()->subDays(10),
                'reviewed_at' => now()->subDays(7),
                'assigned_staff_id' => User::where('role', 'staff')->first()?->id,
            ]);

            // Create a request that needs completion
            InformationRequest::create([
                'request_number' => InformationRequest::generateRequestNumber(),
                'applicant_name' => 'Budi Santoso',
                'applicant_address' => 'Jl. Mawar No. 45, Bandung',
                'applicant_phone' => '082345678901',
                'applicant_email' => 'budi@example.com',
                'applicant_nik' => '3273010101850001',
                'public_body_id' => $publicBodies->random()->id,
                'request_subject' => 'Data statistik pendidikan tingkat SMA di wilayah Bandung',
                'request_purpose' => 'Untuk penelitian',
                'status' => 'needs_completion',
                'completion_notes' => 'Mohon melengkapi dokumen identitas yang sah (KTP) dan surat pengantar dari instansi terkait. Tujuan permohonan juga perlu dijelaskan lebih detail.',
                'submitted_at' => now()->subDays(5),
                'reviewed_at' => now()->subDays(3),
                'assigned_staff_id' => User::where('role', 'staff')->first()?->id,
            ]);
        }
    }
}