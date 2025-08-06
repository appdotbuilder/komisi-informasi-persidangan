<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('information_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_number')->unique()->comment('Unique request number');
            
            // Applicant data
            $table->string('applicant_name');
            $table->text('applicant_address');
            $table->string('applicant_phone');
            $table->string('applicant_email')->nullable();
            $table->string('applicant_nik');
            
            // Requested party data
            $table->foreignId('public_body_id')->constrained();
            
            // Request details
            $table->text('request_subject');
            $table->text('request_purpose');
            $table->json('documents')->nullable();
            
            // Status and workflow
            $table->enum('status', [
                'draft',
                'submitted', 
                'under_review',
                'needs_completion',
                'accepted',
                'in_process',
                'decided',
                'closed'
            ])->default('draft');
            
            $table->text('staff_notes')->nullable();
            $table->text('completion_notes')->nullable();
            
            // Timestamps and user tracking
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('assigned_staff_id')->nullable()->constrained('users');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamp('decided_at')->nullable();
            $table->timestamps();
            
            // Indexes
            $table->index('request_number');
            $table->index('status');
            $table->index('user_id');
            $table->index('public_body_id');
            $table->index('assigned_staff_id');
            $table->index('submitted_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('information_requests');
    }
};