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
        Schema::create('public_bodies', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Name of the public body');
            $table->string('code')->unique()->comment('Unique code for the public body');
            $table->text('address')->nullable()->comment('Address of the public body');
            $table->string('phone')->nullable()->comment('Phone number');
            $table->string('email')->nullable()->comment('Email address');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            // Indexes
            $table->index('name');
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('public_bodies');
    }
};