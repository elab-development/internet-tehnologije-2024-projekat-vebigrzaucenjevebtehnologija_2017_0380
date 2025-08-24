<?php

namespace Database\Seeders;

use App\Models\Challenge;
use App\Models\Lesson;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ChallengeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $htmlLesson = Lesson::where('title', 'Introduction to HTML')->first();
        $cssLesson = Lesson::where('title', 'CSS Flexbox Basics')->first();
        $jsLesson = Lesson::where('title', 'JavaScript Loops')->first();

        $challenges = [
            [
                'lesson_id' => $htmlLesson->id,
                'title' => 'Basic Tags',
                'type' => 'mcq',
                'question' => 'Which tag is used for the largest heading?',
                'answer' => '<h1>',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $cssLesson->id,
                'title' => 'Flex Direction',
                'type' => 'fill_blank',
                'question' => 'To set flex direction to column, use: flex-____: column;',
                'answer' => 'direction',
                'points_rewarded' => 15,
            ],
            [
                'lesson_id' => $jsLesson->id,
                'title' => 'Loop Count',
                'type' => 'code',
                'question' => 'Write a loop that prints numbers 1 to 5.',
                'answer' => 'for(let i=1;i<=5;i++){console.log(i)}',
                'points_rewarded' => 20,
            ],
            [
                'lesson_id' => $htmlLesson->id,
                'title' => 'Paragraph Tag',
                'type' => 'fill_blank',
                'question' => 'Which tag is used to define a paragraph in HTML?',
                'answer' => '<p>',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $htmlLesson->id,
                'title' => 'Anchor Tag',
                'type' => 'mcq',
                'question' => 'Which tag is used to create a hyperlink?',
                'answer' => '<a>',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $htmlLesson->id,
                'title' => 'Image Tag',
                'type' => 'fill_blank',
                'question' => 'Which HTML tag is used to embed an image?',
                'answer' => '<img>',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $cssLesson->id,
                'title' => 'Center Content',
                'type' => 'mcq',
                'question' => 'Which property centers content horizontally in Flexbox?',
                'answer' => 'justify-content',
                'points_rewarded' => 15,
            ],
            [
                'lesson_id' => $cssLesson->id,
                'title' => 'Align Items',
                'type' => 'mcq',
                'question' => 'Which Flexbox property aligns items vertically?',
                'answer' => 'align-items',
                'points_rewarded' => 15,
            ],
            [
                'lesson_id' => $cssLesson->id,
                'title' => 'CSS Syntax',
                'type' => 'fill_blank',
                'question' => 'In CSS, to set text color to red: color: ____;',
                'answer' => 'red',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $jsLesson->id,
                'title' => 'Variable Declaration',
                'type' => 'mcq',
                'question' => 'Which keyword is used to declare a variable in JavaScript?',
                'answer' => 'let',
                'points_rewarded' => 15,
            ],
            [
                'lesson_id' => $jsLesson->id,
                'title' => 'Function Declaration',
                'type' => 'code',
                'question' => 'Write a JavaScript function named greet that logs "Hello World".',
                'answer' => 'function greet(){console.log("Hello World");}',
                'points_rewarded' => 20,
            ],
            [
                'lesson_id' => $jsLesson->id,
                'title' => 'Array Access',
                'type' => 'fill_blank',
                'question' => 'To access the first item in array `fruits`, use fruits[__];',
                'answer' => '0',
                'points_rewarded' => 10,
            ],
            [
                'lesson_id' => $jsLesson->id,
                'title' => 'Conditional Statement',
                'type' => 'code',
                'question' => 'Write an if statement that checks if x is greater than 5.',
                'answer' => 'if(x > 5){}',
                'points_rewarded' => 15,
            ],

        ];

        foreach ($challenges as $challenge) {
            Challenge::create($challenge);
        }
    }
}
