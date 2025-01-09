<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\View\View;
use Illuminate\Response;
use Inertia\Inertia;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        $query = $request->input('search', '');


        $sortField = $request->input('sort', 'emp_no');
        $sortOrder = $request->input('order', 'asc');

        // Build the query
        $employees = DB::table('employees')
        ->where('first_name', 'like', '%' . $query . '%')
        ->orWhere('last_name', 'like', '%' . $query . '%')
        ->orderBy($sortField, $sortOrder)
        ->paginate(10);

        return Inertia::render('Employee/index', [
            'employees' => $employees,
            'query' => $query,
            'sortField' => $sortField,
            'sortOrder' => $sortOrder,
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
