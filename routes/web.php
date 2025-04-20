<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MultiverseController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('multiverse/create', function () {
        return Inertia::render('multiverse/create');
    })->name('multiverse.create');
    Route::get('multiverse', [MultiverseController::class, 'index'])->name('multiverse.index');
    Route::post('multiverse', [MultiverseController::class, 'store'])->name('multiverse.store');
    Route::get('multiverse/{id}', [MultiverseController::class, 'show'])->name('multiverse.show');  // New route
    Route::get('multiverse/{id}/edit', [MultiverseController::class, 'edit'])->name('multiverse.edit');  // Edit route

    Route::put('multiverse/{id}', [MultiverseController::class, 'update'])->name('multiverse.update');  // Update existing multiverse
    Route::delete('multiverse/{id}', [MultiverseController::class, 'destroy'])->name('multiverse.destroy');  // Delete multiverse



});
//
require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
