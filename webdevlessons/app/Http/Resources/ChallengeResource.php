<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class ChallengeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'type' => $this->type,
            'question' => $this->question,
            'answer' => Auth::user()?->role === 'admin' ? $this->answer : null,
            'points_rewarded' => $this->points_rewarded,
            'lesson' => new LessonResource($this->whenLoaded('lesson')),
        ];
    }
}
