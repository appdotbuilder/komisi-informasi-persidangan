<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreInformationRequestRequest;
use App\Http\Requests\UpdateInformationRequestRequest;
use App\Models\InformationRequest;
use App\Models\PublicBody;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InformationRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        
        $query = InformationRequest::with(['publicBody', 'applicant', 'assignedStaff']);
        
        // Filter based on user role
        if ($user && $user->isApplicant()) {
            $query->where('user_id', $user->id);
        }
        
        if ($user && $user->isStaff()) {
            // Staff can see all requests or only assigned ones
            if ($request->get('assigned') === 'true') {
                $query->where('assigned_staff_id', $user->id);
            }
        }
        
        // Apply filters
        if ($request->filled('status')) {
            $query->where('status', $request->get('status'));
        }
        
        if ($request->filled('public_body')) {
            $query->where('public_body_id', $request->get('public_body'));
        }
        
        $requests = $query->latest()->paginate(10);
        
        return Inertia::render('information-requests/index', [
            'requests' => $requests,
            'publicBodies' => PublicBody::active()->orderBy('name')->get(),
            'filters' => $request->only(['status', 'public_body', 'assigned']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('information-requests/create', [
            'publicBodies' => PublicBody::active()->orderBy('name')->get(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreInformationRequestRequest $request)
    {
        $validated = $request->validated();
        
        // Generate unique request number
        $validated['request_number'] = InformationRequest::generateRequestNumber();
        
        // Set user_id if authenticated
        if ($request->user()) {
            $validated['user_id'] = $request->user()->id;
        }
        
        // Set initial status
        $validated['status'] = 'submitted';
        $validated['submitted_at'] = now();
        
        $informationRequest = InformationRequest::create($validated);

        return redirect()->route('information-requests.show', $informationRequest)
            ->with('success', 'Permohonan informasi berhasil diajukan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(InformationRequest $informationRequest)
    {
        $informationRequest->load(['publicBody', 'applicant', 'assignedStaff']);
        
        return Inertia::render('information-requests/show', [
            'request' => $informationRequest,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(InformationRequest $informationRequest)
    {
        return Inertia::render('information-requests/edit', [
            'request' => $informationRequest,
            'publicBodies' => PublicBody::active()->orderBy('name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateInformationRequestRequest $request, InformationRequest $informationRequest)
    {
        $validated = $request->validated();
        
        $informationRequest->update($validated);

        return redirect()->route('information-requests.show', $informationRequest)
            ->with('success', 'Permohonan informasi berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(InformationRequest $informationRequest)
    {
        $informationRequest->delete();

        return redirect()->route('information-requests.index')
            ->with('success', 'Permohonan informasi berhasil dihapus.');
    }
}