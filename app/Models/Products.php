<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Products extends Model
{
    use HasFactory;
    protected $fillable = ['price','quantity','description','name'];

    /**
    * Get the Product_Audit_logs for the product.
    */
    public function logs(): HasMany
    {
        return $this->hasMany(Audit::class,'products_id');
    }
}
