<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Carbon\Carbon;

class AppController extends Controller
{
    public function init(Request $request)
    {
        // $token = $request->user()->createToken($request->token_name);
        $user = Auth::user();

        // $ttt = "79aaf39c6184643bfce86e14bcd820e1af0836cdc4b4d39e79bc92b2887ad214";
    
        // $user = User::find(1);

        print_r($request->all());

        return response()->json(
            [
                'user' => $user
            ], 200);
    }

    public function register(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if(isset($user->id)) {
            return response()->json(['error' => 'Email is already exists.'], 401);
        }

        $user = new User();

        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        $user->save();

        Auth::login($user);

        return response()->json($user, 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
            // 'remember_me' => 'boolean'
        ]);

        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json([
                'message' => 'Unauthorized',
                'status_code' => 401
            ], 401);
        } 

        $user = $request->user();

        $tokenData = $user->createToken('MyApp');

        // print_r($tokenData);

        $token = $tokenData->accessToken->token;

        // if($request->remember_me) {
            $tokenData->expires_at = Carbon::now()->addWeeks(1);
        // }

        if($token && $user->save()) {
            return response()->json([
                'user' => $user,
                'token' => $token,
                'access_token' => $tokenData->accessToken,
                'token_type' => 'Bearer',
                'token_scope' => $tokenData->plainTextToken[0],
                'expires_at' => Carbon::parse($tokenData->expires_at)->toDateTimeString(),
                'status_code' => 200
            ], 200);
        } else {
            return responce()->json([
                'message' => 'Some error occurred, please try again!',
                'status_code' => 500
            ], 500);
        }
    }

    public function logout()
    {
        Auth::logout();
    }
}
