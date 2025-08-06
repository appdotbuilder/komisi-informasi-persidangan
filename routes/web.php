<?php

use App\Http\Controllers\InformationRequestController;
use App\Http\Controllers\StaffReviewController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome', [
        'laravelVersion' => app()->version(),
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Information Request routes - accessible by all users
Route::resource('information-requests', InformationRequestController::class);

// Staff review routes - restricted to staff users
Route::middleware(['auth'])->prefix('staff')->group(function () {
    Route::get('review/{informationRequest}', [StaffReviewController::class, 'create'])->name('staff.review.create');
    Route::post('review/{informationRequest}', [StaffReviewController::class, 'store'])->name('staff.review.store');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
