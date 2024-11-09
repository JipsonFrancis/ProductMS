<?php

namespace Database\Seeders;

use App\Models\Audit;
use Illuminate\Container\Attributes\DB;
use Illuminate\Container\Attributes\Log;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AuditSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        // You can replace these with actual user and product IDs from your database

        for ($i = 1; $i <= 10; $i++) {
            Audit::create([
                'users_id' => 1, // Random user ID
                'products_id' => 1, // Random product ID
                'price' => '0',  // Indicates before edit
                'quantity' => '1',  // Indicates after edit
                'description' => 'before',  // Indicates before description change
                'name' => 'after',  // Indicates after name change
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

    }
}
