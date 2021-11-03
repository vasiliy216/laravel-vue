<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Carbon\Carbon;

class AppController extends Controller
{
    public function init(Request $request)
    {
        $user = Auth::user();

        return response()->json(
            [
                'user' => $user
            ], 200);
    }

    public function register(Request $request)
    {

        // $request->validate([
        //     'username' => 'required|string',
        //     'email' => 'required|string|unique:users,email',
        //     'password' => 'required|string'
        // ]);

        $user = User::where('email', $request->email)->first();

        if(isset($user->id)) {
            return response()->json(["error" => 'Email is already exists.'], 401);
        }

        $user = User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        $token = $user->createToken('myapptoken')->plainTextToken;

        $user->save();

        Auth::login($user);

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string'
        ]);

        // Check email
        $user = User::where('email', $request->email)->first();

        // Check password
        if(!$user || !Hash::check($request->password, $user->password)) {
            return response([
                'message' => 'Bad creds'
            ], 401);
        }

        $token = $user->createToken('myapptoken')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 200);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message' => 'Logged out'
        ];
    }
}
