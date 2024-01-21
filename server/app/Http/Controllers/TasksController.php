<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $tasks = $user->folders->flatMap(function ($folder) {
            return $folder->tasks()->orderBy('order', 'asc')->get()->map(function ($task) use ($folder) {
                $task->folder_id = $folder->id;
                $task->color = $folder->collections->first(function ($collection) use ($task) {
                    return $collection->id === $task->collection_id;
                })->color;
                $task->collection_order = $folder->collections->first(function ($collection) use ($task) {
                    return $collection->id === $task->collection_id;
                })->order;
                return $task;
            });
        });

        return response()->json($tasks);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'collection_id' => 'required|integer',
            'name' => 'required|string|max:255'
        ]);

        $tasks = $user->folders->flatMap(function ($folder) {
            return $folder->tasks;
        });

        $maxOrder = $tasks->max('order');
        $validatedData['order'] = $maxOrder ? $maxOrder + 1 : 1;

        $task = Task::create([
            'collection_id' => $validatedData['collection_id'],
            'name' => $validatedData['name'],
            'order' => $validatedData['order'],
        ]);

        return response()->json($task, 201);
    }

    public function duplicate(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'collection_id' => 'required|integer',
            'name' => 'required|string|max:255',
            'content' => 'string|nullable',
            'status' => 'required|integer',
            'due_date' => 'date|nullable'
        ]);

        $tasks = $user->folders->flatMap(function ($folder) {
            return $folder->tasks;
        });

        $maxOrder = $tasks->max('order');
        $validatedData['order'] = $maxOrder ? $maxOrder + 1 : 1;

        $task = Task::create([
            'collection_id' => $validatedData['collection_id'],
            'name' => $validatedData['name'],
            'content' => $validatedData['content'],
            'status' => $validatedData['status'],
            'due_date' => $validatedData['due_date'],
            'order' => $validatedData['order'],
        ]);

        return response()->json($task, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $orderData = $request->validate([
            'name' => 'required|string',
            'content' => 'string|nullable',
            'status' => 'required|integer',
            'due_date' => 'date|nullable',
        ]);

        $task = Task::where('id', $id)
            ->update(['name' => $orderData['name'], 'content' => $orderData['content'], 'status' => $orderData['status'], 'due_date' => $orderData['due_date']]);

        return response()->json($task, 201);
    }

    public function reorder(Request $request)
    {
        $orderData = $request->validate([
            'tasks' => 'required|array',
            'tasks.*.id' => 'required|integer',
            'tasks.*.collection_id' => 'required|integer',
            'tasks.*.order' => 'required|integer',
        ]);

        foreach ($orderData['tasks'] as $item) {
            $task = Task::where('id', $item['id'])
                ->update(['order' => $item['order'], 'collection_id' => $item['collection_id']]);
        }

        return response()->json($task, 201);
    }

    public function move(Request $request)
    {
        $orderData = $request->validate([
            'task' => 'required|integer',
            'collection' => 'required|integer',
        ]);

        $task = Task::where('id', $orderData['task'])
            ->update(['collection_id' => $orderData['collection']]);

        return response()->json($task, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $task = Task::where('id', $id)->delete();

        return response()->json($task, 201);
    }
}
