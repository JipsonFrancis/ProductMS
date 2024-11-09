<?php

namespace Database\Seeders;

use App\Models\Products;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            Products::create([
                'name' => "Sample Product $i",
                'description' => "Description for sample product $i",
                'price' => rand(10, 100),
                'quantity' => rand(1, 100),
            ]);
        }
    }
}
