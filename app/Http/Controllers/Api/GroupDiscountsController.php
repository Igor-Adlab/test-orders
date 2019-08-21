<?php

namespace App\Http\Controllers\Api;

use App\GroupDiscount;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class GroupDiscountsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $pagination = GroupDiscount::with('item')->paginate(20);
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
        $discount = new GroupDiscount($request->input());
        $discount->save();
        return response()->json($discount);
    }

    /**
     * Display the specified resource.
     *
     * @param  GroupDiscount  $discount
     * @return \Illuminate\Http\Response
     */
    public function show(GroupDiscount $discount)
    {
        return response()->json($discount);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  GroupDiscount  $discount
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, GroupDiscount $discount)
    {
        $discount->update($request->input());
        return response()->json($discount);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param GroupDiscount $discount
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(GroupDiscount $discount)
    {
        try {
            $discount->delete();
            return response()->json([ 'ok' => true ]);
        } catch (\Exception $e) {
            return response()->json([ 'ok' => false, 'error' => $e->getMessage() ]);
        }
    }
}
