<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\ScoreGenerator;

class ScoreGeneratorController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function create(Request $request)
    {
        $scores = new ScoreGenerator;
        $scores->score = $request->score;
        $scores->save();

        return $scores;
    }

    public function list(): JsonResponse
    {
        $scores = ScoreGenerator::select(
            'score', 
            DB::raw('count(*) as counts'),
            DB::raw('DATE(created_at) as date'),
            DB::raw('MAX(TIME(created_at)) as time')
        )
        ->orderBy('score')
        ->groupBy('score', 'date')
        ->get();

        return response()->json($scores);
    }
}
