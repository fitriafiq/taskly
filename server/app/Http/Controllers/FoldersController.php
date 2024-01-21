<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FoldersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $folders = $user->folders()->orderBy('order', 'asc')->get();

        return response()->json($folders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'required|integer',
        ]);

        // $user->collections()->increment('order');
        $maxOrder = $user->folders()->max('order');
        $validatedData['order'] = $maxOrder ? $maxOrder + 1 : 1;

        $folder = $user->folders()->create($validatedData);

        return response()->json($folder, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = $request->user();

        $orderData = $request->validate([
            'name' => 'required|string',
        ]);

        $folder = $user->folders()->where('id', $id)->update(['name' => $orderData['name']]);

        return response()->json($folder, 201);
    }

    public function reorder(Request $request)
    {
        $user = $request->user();

        $orderData = $request->validate([
            'folders' => 'required|array',
            'folders.*.id' => 'required|integer',
            'folders.*.order' => 'required|integer',
        ]);

        foreach ($orderData['folders'] as $item) {
            $folder = $user->folders()->where('id', $item['id'])->update(['order' => $item['order']]);
        }

        return response()->json($folder, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $user = $request->user();

        $inbox = $user->folders()->where('name', 'Inbox')->first();

        $user->collections()->where('folder_id', $id)->update(['folder_id' => $inbox->id]);

        $folder = $user->folders()->where('id', $id)->delete();

        return response()->json($folder, 201);
    }
}
