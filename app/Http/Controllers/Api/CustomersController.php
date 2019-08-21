<?php

namespace App\Http\Controllers\Api;

use App\Customer;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CustomersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $query = Customer::query();

        foreach ($request->input('filters', []) as $filter) {
            $sign = isset($filter['sign']) ? $filter['sign'] : '=';

            $value = $sign === 'like'
                ? "%" . $filter['value'] . "%" : $filter['value'];

            $query->where($filter['field'], $sign, $value );
        }

        $pagination = $query->paginate(20);
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
        $customer = new Customer($request->input());
        $customer->save();

        return response()->json($customer);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->input());
        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param \App\Customer $customer
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Customer $customer)
    {
        try {
            $customer->delete();
            return response()->json([ 'ok' => true ]);
        } catch (\Exception $e) {
            return response()->json([ 'ok' => false, 'error' => $e->getMessage() ]);
        }
    }

    /**
     * Search customers by name.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function select(Request $request)
    {
        $name = $request->input('q', '');
        $customers = Customer::where('name', 'like', '%' . $name . '%')->get();

        return response()->json($customers);
    }
}
