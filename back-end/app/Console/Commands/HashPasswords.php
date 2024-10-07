<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class HashPasswords extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'users:hash-passwords';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hash all user passwords with bcrypt';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $users = User::all();
        foreach ($users as $user) {
            if (Hash::needsRehash($user->password)) {
                $user->password = Hash::make($user->password);
                $user->save();
                $this->info("Password for user {$user->email} has been hashed.");
            }
        }

        $this->info('All passwords have been hashed.');
        return 0;
    }
}
