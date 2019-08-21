<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use Sluggable, SoftDeletes;

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable()
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    protected $fillable = [
        'price', 'name', 'images', 'thumb',
    ];

    protected $casts = [
        'images' => 'array',
    ];

    public function orders()
    {
        return $this->hasManyThrough(Order::class,OrderItem::class);
    }

    public function discounts()
    {
        return $this->hasMany(GroupDiscount::class);
    }
}
