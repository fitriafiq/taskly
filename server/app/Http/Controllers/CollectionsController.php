<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class CollectionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $collections = $user->collections;

        return response()->json($collections);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
            'folder_id' => 'required|integer',
        ]);

        $maxOrder = $user->collections()->max('collections.order');
        $validatedData['order'] = $maxOrder ? $maxOrder + 1 : 1;

        $collection = $user->collections()->create($validatedData);

        return response()->json($collection, 201);
    }

    public function duplicate(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
            'folder_id' => 'required|integer',
        ]);

        $maxOrder = $user->collections()->max('collections.order');
        $validatedData['order'] = $maxOrder ? $maxOrder + 1 : 1;

        $collection = $user->collections()->create($validatedData);

        $tasks = Task::where('collection_id', $request->id)->get();

        foreach ($tasks as $task) {
            Task::create([
                'collection_id' => $collection->id,
                'name' => $task->name,
                'content' => $task->content,
                'status' => $task->status,
                'due_date' => $task->due_date,
                'order' => $task->order,
            ]);
        }

        return response()->json($collection, 201);
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
            'name' => 'required|string|max:255',
            'color' => 'required|string|max:50',
            'folder_id' => 'required|nullable|integer',
        ]);

        $collection = $user->collections()
            ->where('collections.id', $id)
            ->update(['collections.name' => $orderData['name'], 'color' => $orderData['color'], 'folder_id' => $orderData['folder_id']]);

        return response()->json($collection, 201);
    }

    public function reorder(Request $request)
    {
        $user = $request->user();

        $orderData = $request->validate([
            'collections' => 'required|array',
            'collections.*.id' => 'required|integer',
            'collections.*.folder_id' => 'required|integer',
            'collections.*.order' => 'required|integer',
        ]);

        foreach ($orderData['collections'] as $item) {
            $collection = $user->collections()
                ->where('collections.id', $item['id'])
                ->update(['collections.order' => $item['order'], 'folder_id' => $item['folder_id']]);
        }

        return response()->json($collection, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $user = $request->user();

        $collection = $user->collections()->where('collections.id', $id)->delete();

        return response()->json($collection, 201);
    }
}
