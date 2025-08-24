<?php

namespace Database\Seeders;

use App\Models\Challenge;
use App\Models\User;
use App\Models\UserChallenge;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::where('role', 'user')->get();
        $challenges = Challenge::all();

        foreach ($users as $user) {
            foreach ($challenges->random(rand(2, 3)) as $challenge) {
                UserChallenge::create(
                    [
                        'user_id' => $user->id,
                        'challenge_id' => $challenge->id,
                        'is_completed' => true,
                        'score' =>  $challenge->points_rewarded,
                    ],
                );
            }
        }
    }
}
