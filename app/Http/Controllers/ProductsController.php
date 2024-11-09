<?php

namespace App\Http\Controllers;

use App\Models\Products;
use App\Http\Controllers\Controller;
use App\Models\Audit;
use Illuminate\Auth\Access\Gate;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard', ['products' => Products::with('logs')->get() ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
    // Validate incoming request data
    $validated = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric|min:0',
        'quantity' => 'required|integer|min:0',
    ]);

    // Use a database transaction to ensure both Product and Audit entries are created together
    DB::transaction(function () use ($validated) {
        // Create the Product
        $product = Products::create($validated);

        // Create an Audit log for this creation event
        $audit = new Audit;
        $audit->users_id = Auth::guard()->id();
        $audit->products_id = $product->id;
        $audit->price = $product->price;
        $audit->quantity = $product->quantity;
        $audit->description = $product->description;
        $audit->name = $product->name;
        $audit->save();
    });

    // Redirect to the products index with a success message
    return redirect(route('product.index'))->with('success', 'Product created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Products $products)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Products $products)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Products $product): RedirectResponse
    {
        $audit = new Audit;

        $audit->users_id = Auth::guard()->id();
        $audit->products_id = $product->id;
 
        $validated = $request->validate([
            'description' => 'string',
            'name' => 'string|max:255',
            'price' => 'numeric',
            'quantity' => 'integer',
        ]);

        $audit->price = $product->price;
        $audit->quantity = $product->quantity;
        $audit->description = $product->description;
        $audit->name = $product->name;

 
        $product->update($validated);
        $audit->save();
 
        return redirect(route('product.index'))->with('success', 'Product edited successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Products $product): RedirectResponse
    {
        DB::transaction(function () use ($product) {
            $audit = new Audit;
            $audit->user_id = Auth::guard()->id();
            $audit->products_id = $product->id;
            $audit->price = 0.0;
            $audit->quantity = 0.0;
            $audit->description = $product->description;
            $audit->name = $product->name;
            $audit->save();
        
            $product->delete();
        });

        return redirect(route('product.index'))
                         ->with('success', 'Product deleted successfully.');
    }
}
