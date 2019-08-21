<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use App\Item;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ItemsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagination = Item::with(['discounts'])->paginate(20);
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
        $item = new Item($request->input());
        $item->save();

        return response()->json($item);
    }

    /**
     * Display the specified resource.
     *
     * @param  Item  $item
     * @return \Illuminate\Http\Response
     */
    public function show(Item  $item)
    {
        return response()->json($item);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Item  $item
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Item  $item)
    {
        $item->update($request->input());
        return response()->json($item);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Item  $item
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Item  $item)
    {
        try {
            $item->delete();
            return response()->json([ 'ok' => true ]);
        } catch(\Exception $e) {
            return response()->json([ 'ok' => false, 'error' => $e->getMessage() ]);
        }
    }


    /**
     * Get discount for item
     *
     * @param Item $item
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function discount(Item  $item, Request $request)
    {
        $qty = $request->input('qty', 1);

        $discount = $item->discounts()
            ->where('max_quantity', '>=', $qty)
            ->orWhere('max_quantity', null)
            ->where('min_quantity', '<=', $qty)
            ->orderBy('value', 'desc')
            ->first();

        return response()->json([ 'item' => $item, 'discount' => $discount ]);
    }

    /**
     * Search items by name.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function select(Request $request)
    {
        $name = $request->input('q', '');
        $items = Item::where('name', 'like', '%' . $name . '%')->get();

        return response()->json($items);
    }
}
