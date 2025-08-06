<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\InformationRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StaffReviewController extends Controller
{
    /**
     * Accept a request after formal verification.
     */
    public function store(Request $request, InformationRequest $informationRequest)
    {
        $request->validate([
            'action' => 'required|in:accept,request_completion',
            'notes' => 'nullable|string|max:1000',
            'completion_notes' => 'nullable|string|max:1000',
            'assigned_staff_id' => 'nullable|exists:users,id',
        ]);

        $user = $request->user();
        
        if (!$user || !$user->isStaff()) {
            return redirect()->back()->with('error', 'Tidak memiliki akses untuk melakukan tindakan ini.');
        }

        if ($request->input('action') === 'accept') {
            $informationRequest->update([
                'status' => 'accepted',
                'staff_notes' => $request->input('notes'),
                'assigned_staff_id' => $request->input('assigned_staff_id', $user->id),
                'reviewed_at' => now(),
            ]);
            
            $message = 'Permohonan berhasil diterima dan akan diproses lebih lanjut.';
        } else {
            $informationRequest->update([
                'status' => 'needs_completion',
                'completion_notes' => $request->input('completion_notes'),
                'assigned_staff_id' => $user->id,
                'reviewed_at' => now(),
            ]);
            
            $message = 'Permohonan dikembalikan untuk dilengkapi.';
        }

        return redirect()->route('information-requests.show', $informationRequest)
            ->with('success', $message);
    }

    /**
     * Show the review form for staff.
     */
    public function create(InformationRequest $informationRequest)
    {
        if (!auth()->user() || !auth()->user()->isStaff()) {
            abort(403, 'Tidak memiliki akses.');
        }

        return Inertia::render('staff/review-request', [
            'request' => $informationRequest->load(['publicBody', 'applicant']),
            'staffMembers' => User::staff()->where('status', 'active')->orderBy('name')->get(['id', 'name']),
        ]);
    }
}