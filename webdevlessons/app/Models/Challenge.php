<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Challenge extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'lesson_id',
        'type',
        'question',
        'answer',
        'points_rewarded'
    ];

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function userAttempts()
    {
        return $this->hasMany(UserChallenge::class);
    }
}
