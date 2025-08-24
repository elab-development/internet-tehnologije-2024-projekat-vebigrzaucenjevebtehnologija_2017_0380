<?php

namespace App\Http\Controllers;

use App\Http\Resources\ChallengeResource;
use App\Models\Challenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ChallengeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Challenge::with('lesson');

        if ($request->has('lesson')) {
            $query->whereHas('lesson', function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->query('lesson') . '%');
            });
        }

        if ($request->has('title')) {
            $query->where('title', 'like', '%' . $request->query('title') . '%');
        }

        if ($request->has('type')) {
            $query->where('type', $request->query('type'));
        }

        if ($request->has('sort_points')) {
            $sortDirection = strtolower($request->query('sort_points')) === 'desc' ? 'desc' : 'asc';
            $query->orderBy('points_rewarded', $sortDirection);
        }

        $perPage = $request->query('per_page', 10);
        $page = $request->query('page', 1);

        $challenges = $query->paginate($perPage, ['*'], 'page', $page);

        return response()->json([
            'challenges' => ChallengeResource::collection($challenges),
            'meta' => [
                'current_page' => $challenges->currentPage(),
                'last_page' => $challenges->lastPage(),
                'per_page' => $challenges->perPage(),
                'total' => $challenges->total(),
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admins can create challenges'], 403);
        }

        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'title' => 'required|string|max:255',
            'type' => 'required|in:mcq,fill_blank,code',
            'question' => 'required|string',
            'answer' => 'required|string',
            'points_rewarded' => 'required|integer|min:0',
        ]);

        $challenge = Challenge::create($validated);

        return response()->json([
            'message' => 'Challenge created successfully',
            'challenge' => new ChallengeResource($challenge),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $challenge = Challenge::find($id);
        if (is_null($challenge)) {
            return response()->json('Challenge not found', 404);
        }

        return response()->json([
            'challenge' => new ChallengeResource($challenge),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Challenge $challenge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Challenge $challenge)
    {

        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admins can update challenges'], 403);
        }

        $validated = $request->validate([
            'lesson_id' => 'sometimes|exists:lessons,id',
            'title' => 'sometimes|string|max:255',
            'type' => 'sometimes|in:mcq,fill_blank,code',
            'question' => 'sometimes|string',
            'answer' => 'sometimes|string',
            'points_rewarded' => 'sometimes|integer|min:0',
        ]);

        $challenge->update($validated);

        return response()->json([
            'message' => 'Challenge updated successfully',
            'challenge' => new ChallengeResource($challenge),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Challenge $challenge)
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Only admins can delete challenges'], 403);
        }

        $challenge->delete();

        return response()->json(['message' => 'Challenge deleted successfully']);
    }
}
