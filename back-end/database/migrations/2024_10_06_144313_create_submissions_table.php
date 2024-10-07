<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->text('feedback')->nullable();
            $table->dateTime('submission_date');
            $table->text('github_repo_url');
            $table->text('live_url');
            $table->foreignId('task_id')->constrained();
            $table->foreignId('coach_id')->constrained();
            $table->foreignId('student_id')->constrained();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
