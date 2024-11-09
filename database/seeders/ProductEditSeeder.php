<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class ProductEditSeeder extends Seeder
{
    public function run()
    {
        // You can replace these with actual user and product IDs from your database
        $userIds = 1;
        $productIds = \App\Models\Products::pluck('id')->toArray();

        // Generate some sample edits
        $productEdits = [
            [
                'user_id' => $userIds, // Random user ID
                'product_id' => 1, // Random product ID
                'price' => '0',  // Indicates before edit
                'quantity' => '1',  // Indicates after edit
                'description' => 'before',  // Indicates before description change
                'name' => 'after',  // Indicates after name change
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'user_id' => $userIds, // Random user ID
                'product_id' => 1, // Random product ID
                'price' => '1',  // Indicates after price edit
                'quantity' => '0',  // Indicates before quantity edit
                'description' => 'after',  // Indicates after description change
                'name' => 'before',  // Indicates before name change
                'created_at' => now(),
                'updated_at' => now(),
            ],
            // Add more entries as needed
        ];

        // Insert data into the product_edits table
        DB::table('audits')->insert($productEdits);

        Log::info('Product edits seeded successfully.');
    }
}

