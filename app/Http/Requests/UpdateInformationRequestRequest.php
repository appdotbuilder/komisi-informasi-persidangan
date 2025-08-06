<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateInformationRequestRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'applicant_name' => 'required|string|max:255',
            'applicant_address' => 'required|string|max:1000',
            'applicant_phone' => 'required|string|max:20',
            'applicant_email' => 'nullable|email|max:255',
            'applicant_nik' => 'required|string|max:20',
            'public_body_id' => 'required|exists:public_bodies,id',
            'request_subject' => 'required|string|max:1000',
            'request_purpose' => 'required|string|max:1000',
            'documents' => 'nullable|array',
            'documents.*' => 'string|max:255',
            'status' => 'sometimes|in:draft,submitted,under_review,needs_completion,accepted,in_process,decided,closed',
            'staff_notes' => 'nullable|string|max:1000',
            'completion_notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'applicant_name.required' => 'Nama pemohon wajib diisi.',
            'applicant_address.required' => 'Alamat pemohon wajib diisi.',
            'applicant_phone.required' => 'Nomor telepon pemohon wajib diisi.',
            'applicant_email.email' => 'Format email tidak valid.',
            'applicant_nik.required' => 'NIK/identitas pemohon wajib diisi.',
            'public_body_id.required' => 'Badan publik wajib dipilih.',
            'public_body_id.exists' => 'Badan publik yang dipilih tidak valid.',
            'request_subject.required' => 'Substansi permohonan wajib diisi.',
            'request_purpose.required' => 'Tujuan permohonan wajib diisi.',
        ];
    }
}