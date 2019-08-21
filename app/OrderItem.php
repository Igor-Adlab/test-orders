<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderItem extends Model
{
    use SoftDeletes;

    protected $table = "order_item";

    protected $fillable = [
        'qty', 'item_id', 'group_discount_id',
    ];

    public function discount()
    {
        return $this->belongsTo(GroupDiscount::class, 'group_discount_id');
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
