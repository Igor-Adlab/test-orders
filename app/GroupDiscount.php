<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class GroupDiscount extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'name', 'min_quantity', 'max_quantity', 'value', 'type', 'item_id',
    ];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
}
