<?php

namespace Database\Seeders;

use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LessonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = [
            [
                'title' => 'Introduction to HTML',
                'description' => 'Learn the structure of HTML documents and basic tags.',
                'content' => '<h1>This is a Heading</h1><p>This is a paragraph.</p>',
                'category' => 'HTML',
                'difficulty' => 'beginner',
            ],
            [
                'title' => 'CSS Flexbox Basics',
                'description' => 'Understand how Flexbox layouts work in CSS.',
                'content' => 'display: flex; justify-content: center; align-items: center;',
                'category' => 'CSS',
                'difficulty' => 'intermediate',
            ],
            [
                'title' => 'JavaScript Loops',
                'description' => 'Learn how to use for, while, and do...while loops.',
                'content' => 'for(let i=0; i<10; i++){ console.log(i); }',
                'category' => 'JavaScript',
                'difficulty' => 'beginner',
            ],
        ];

        foreach ($lessons as $lesson) {
            Lesson::create($lesson);
        }
    }
}
