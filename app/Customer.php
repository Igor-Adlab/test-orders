<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'shipping_address',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
