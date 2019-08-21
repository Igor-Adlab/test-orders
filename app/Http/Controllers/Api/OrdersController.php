<?php

namespace App\Http\Controllers\Api;

use App\Order;
use App\OrderItem;
use App\Helpers\OrderHelper;
use Illuminate\Http\Request;
use App\Helpers\DiscountHelper;
use App\Http\Controllers\Controller;

class OrdersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Order::query();

        foreach ($request->input('filters', []) as $filter) {
            $sign = isset($filter['sign']) ? $filter['sign'] : '=';

            $value = $sign === 'like'
                ? "%" . $filter['value'] . "%" : $filter['value'];

            $query->where($filter['field'], $sign, $value );
        }

        $pagination = $query->with([ 'discounts', 'customer', 'ordered.item' ])
            ->paginate(20);

        return response()->json($pagination);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /** @var Order $order */
        $order = new Order($request->except([ 'items' ]));
        $order->save();

        $items = collect($request->input('items'))
            ->map(function($record) use ($order) {
                return $order->ordered()->create($record);
            })
            ->map(function(OrderItem $item) {
                return DiscountHelper::processItem($item);
        });

        OrderHelper::processOrder($order, $items);

        return response()->json($order);
    }

    /**
     * Display the specified resource.
     *
     * @param  Order  $order
     * @return \Illuminate\Http\Response
     */
    public function show(Order  $order)
    {

    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order  $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order  $order)
    {
        try {
            $order->delete();
            return response()->json([ 'ok' => true ]);
        } catch(\Exception $e) {
            return response()->json([ 'ok' => false, 'error' => $e->getMessage() ]);
        }
    }
}
