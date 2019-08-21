<?php


namespace App\Helpers;


use App\GroupDiscount;
use App\Item;
use App\OrderItem;
use Illuminate\Support\Facades\Log;

class DiscountHelper
{
    /**
     * @param OrderItem $record
     * @return  OrderItem $record
     */
    public static function processItem(OrderItem $record)
    {
        /** @var integer $qty */
        $qty = $record->qty;

        /** @var Item $product */
        $product = $record->item;

        /** @var GroupDiscount $discount */
        $discount = $record->discount;

        $record->total = $qty * $product->price;
        $record->calculated = $record->total - self::getDiscountValue($record->total, $discount);

        $record->save();

        return $record;
    }

    /**
     * @param float $price
     * @param GroupDiscount $discount
     * @return float
     */
    public static function getDiscountValue($price, GroupDiscount $discount = null)
    {
        if (!$discount) {
            return 0;
        }

        if ($discount->type === 'percent') {
            return self::percent($price, $discount->value);
        } else {
            return $discount->value;
        }
    }

    /**
     * @param float $price
     * @param float $percent
     *
     * @return float
     */
    public static function percent($price, $percent)
    {
        return  ($price / 100) * $percent;
    }
}
