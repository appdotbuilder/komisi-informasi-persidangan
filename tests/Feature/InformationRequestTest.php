<?php

namespace Tests\Feature;

use App\Models\InformationRequest;
use App\Models\PublicBody;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class InformationRequestTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed();
    }

    /** @test */
    public function guests_can_view_information_requests_index()
    {
        $response = $this->get('/information-requests');
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('information-requests/index')
        );
    }

    /** @test */
    public function guests_can_create_information_requests()
    {
        $publicBody = PublicBody::first();
        
        $response = $this->get('/information-requests/create');
        $response->assertStatus(200);
        
        $requestData = [
            'applicant_name' => 'Test User',
            'applicant_address' => 'Test Address',
            'applicant_phone' => '081234567890',
            'applicant_email' => 'test@example.com',
            'applicant_nik' => '1234567890123456',
            'public_body_id' => $publicBody->id,
            'request_subject' => 'Test subject for information request',
            'request_purpose' => 'Test purpose for the request',
            'documents' => ['test-document.pdf'],
        ];

        $response = $this->post('/information-requests', $requestData);
        
        $response->assertRedirect();
        $this->assertDatabaseHas('information_requests', [
            'applicant_name' => 'Test User',
            'status' => 'submitted',
        ]);
    }

    /** @test */
    public function staff_can_review_submitted_requests()
    {
        $staff = User::where('role', 'staff')->first();
        $request = InformationRequest::factory()->submitted()->create();

        $response = $this->actingAs($staff)
            ->get("/staff/review/{$request->id}");
        
        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('staff/review-request')
                ->has('request')
                ->has('staffMembers')
        );
    }

    /** @test */
    public function staff_can_accept_requests()
    {
        $staff = User::where('role', 'staff')->first();
        $request = InformationRequest::factory()->submitted()->create();

        $response = $this->actingAs($staff)
            ->post("/staff/review/{$request->id}", [
                'action' => 'accept',
                'notes' => 'Request approved after verification',
                'assigned_staff_id' => $staff->id,
            ]);

        $response->assertRedirect();
        
        $request->refresh();
        $this->assertEquals('accepted', $request->status);
        $this->assertEquals($staff->id, $request->assigned_staff_id);
        $this->assertNotNull($request->reviewed_at);
    }

    /** @test */
    public function staff_can_request_completion()
    {
        $staff = User::where('role', 'staff')->first();
        $request = InformationRequest::factory()->submitted()->create();

        $response = $this->actingAs($staff)
            ->post("/staff/review/{$request->id}", [
                'action' => 'request_completion',
                'completion_notes' => 'Please provide additional documents',
            ]);

        $response->assertRedirect();
        
        $request->refresh();
        $this->assertEquals('needs_completion', $request->status);
        $this->assertEquals('Please provide additional documents', $request->completion_notes);
        $this->assertNotNull($request->reviewed_at);
    }

    /** @test */
    public function request_numbers_are_generated_correctly()
    {
        $requestNumber = InformationRequest::generateRequestNumber();
        
        $this->assertStringStartsWith('KIP-', $requestNumber);
        $this->assertStringContainsString(now()->year, $requestNumber);
        $this->assertStringContainsString(now()->format('m'), $requestNumber);
    }
}