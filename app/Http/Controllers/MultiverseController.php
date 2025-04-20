<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Multiverse;
use Illuminate\Http\Request;

class MultiverseController extends Controller
{

    public function index()
    {
        // Fetch all multiverses from the database
        $multiverses = Multiverse::all();

        // Return the list of multiverses to the view via Inertia
        return Inertia::render('multiverse/index', [
            'multiverses' => $multiverses,
            'flash' => session('flash') ?? [], // Passing flash session data to Inertia
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $multiverse = new \App\Models\Multiverse();
        $multiverse->name = $request->input('name');
        $multiverse->description = $request->input('description');
        $multiverse->save();

        return Inertia::render('multiverse/index', [
            'multiverse' => $multiverse,
        ]);
    }

    // Show method to display a specific multiverse
    public function show($id)
    {
        // Fetch the multiverse based on the ID
        $multiverse = Multiverse::find($id);

        // If the multiverse exists, return it to the view
        if ($multiverse) {
            return Inertia::render('multiverse/show', [
                'multiverse' => $multiverse,
            ]);
        }

        // If not found, redirect with an error message
        return redirect()->route('multiverse.index')->with('error', 'Multiverse not found');
    }

    public function edit($id)
    {
        $multiverse = Multiverse::find($id);

        if ($multiverse) {
            return Inertia::render('multiverse/edit', [
                'multiverse' => $multiverse,
            ]);
        }

        return redirect()->route('multiverse.index')->with('error', 'Multiverse not found');
    }

    // Update method to edit an existing multiverse
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        $multiverse = Multiverse::find($id);

        if ($multiverse) {
            $multiverse->name = $request->input('name');
            $multiverse->description = $request->input('description');
            $multiverse->save();

            return Inertia::render('multiverse/index', [
                'multiverse' => $multiverse,
                'success' => 'Multiverse updated successfully!',
            ]);
        }

        return redirect()->route('multiverse.index')->with('error', 'Multiverse not found');
    }

    // Destroy method to delete a specific multiverse
    public function destroy($id)
    {
        $multiverse = Multiverse::find($id);

        if ($multiverse) {
            $multiverse->delete();

            // Send success flash message and re-render the index page
            return Inertia::render('multiverse/index', [
                'multiverses' => Multiverse::all(), // Fetch updated multiverses
                'flash' => ['success' => 'Multiverse deleted successfully!'], // Flash success message
            ]);
        }

        return redirect()->route('multiverse.index')->with('error', 'Multiverse not found');
    }

}
