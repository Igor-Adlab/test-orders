<?php


namespace App\Helpers;


use App\Order;
use App\OrderItem;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Log;

class OrderHelper
{
    public static function processOrder(Order $order, Collection $items)
    {
        $updates = $items->reduce(function($acc, OrderItem $item) {
            $acc['total'] += $item->total;
            $acc['calculated'] += $item->calculated;

            return $acc;
        }, [ 'total' => 0, 'calculated' => 0 ]);

        $order->update($updates);
    }
}
