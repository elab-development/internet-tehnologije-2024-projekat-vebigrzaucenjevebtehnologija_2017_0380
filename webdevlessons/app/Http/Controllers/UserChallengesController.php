<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserChallengeResource;
use App\Models\Challenge;
use App\Models\User;
use App\Models\UserChallenge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserChallengesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $challenges = $user->role === 'admin'
            ? UserChallenge::all()
            : UserChallenge::where('user_id', $user->id)->get();

        if ($challenges->isEmpty()) {
            return response()->json('No user challenges found.', 404);
        }

        return response()->json([
            'user_challenges' => UserChallengeResource::collection($challenges),
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
        $user = Auth::user();
        $userModel = User::find($user->id);

        if ($user->role !== 'user') {
            return response()->json(['error' => 'Only users can take challenges.'], 403);
        }

        $validated = $request->validate([
            'challenge_id' => 'required|exists:challenges,id',
            'answer' => 'required|string',
        ]);

        $challenge = Challenge::findOrFail($validated['challenge_id']);
        $existing = UserChallenge::where('user_id', $user->id)
            ->where('challenge_id', $challenge->id)
            ->first();

        $isCorrect = trim(strtolower($validated['answer'])) === trim(strtolower($challenge->answer));

        if ($existing) {
            if ($existing->is_completed) {
                return response()->json(['error' => 'You have already completed this challenge.'], 403);
            }

            if ($isCorrect) {
                $existing->update([
                    'is_completed' => true,
                    'score' => $challenge->points_rewarded,
                ]);
                $userModel->points += $challenge->points_rewarded;
                $userModel->save();
            } else {
                $existing->update(['score' => 0]);
            }

            return response()->json([
                'message' => $isCorrect ? 'Challenge completed!' : 'Incorrect answer.',
                'user_challenge' => new UserChallengeResource($existing),
            ]);
        }

        $newAttempt = UserChallenge::create([
            'user_id' => $user->id,
            'challenge_id' => $challenge->id,
            'is_completed' => $isCorrect,
            'score' => $isCorrect ? $challenge->points_rewarded : 0,
        ]);

        if ($isCorrect) {
            $userModel->points += $challenge->points_rewarded;
            $userModel->save();
        }

        return response()->json([
            'message' => $isCorrect ? 'Challenge completed!' : 'Incorrect answer.',
            'user_challenge' => new UserChallengeResource($newAttempt),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::user();
        $userChallenge = UserChallenge::find($id);

        if (!$userChallenge) {
            return response()->json('User challenge not found.', 404);
        }

        if ($user->role !== 'admin' && $userChallenge->user_id !== $user->id) {
            return response()->json(['error' => 'Access denied.'], 403);
        }

        return response()->json([
            'user_challenge' => new UserChallengeResource($userChallenge),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(UserChallenge $userChallenge)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, UserChallenge $userChallenge)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(UserChallenge $userChallenge)
    {
        //
    }
}
