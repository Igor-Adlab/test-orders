<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'customer_id', 'total', 'calculated',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function discounts()
    {
        return $this->hasManyThrough(GroupDiscount::class, OrderItem::class, 'group_discount_id', 'id', 'id', 'order_id');
    }

    public function items()
    {
        return $this->hasManyThrough(Item::class, OrderItem::class, 'item_id', 'id', 'id', 'order_id');
    }

    public function ordered()
    {
        return $this->hasMany(OrderItem::class);
    }
}
