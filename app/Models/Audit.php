<?php

namespace App\Models;

use App\Models\User as ModelsUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Workbench\App\Models\User;

class Audit extends Model
{
    use HasFactory;
    protected $fillable = ['users_id','products_id','price','quantity','description','name'];

    /**
    * Get the product for the product_audit_log.
    */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Products::class,'products_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(ModelsUser::class,'users_id');
    }
}
