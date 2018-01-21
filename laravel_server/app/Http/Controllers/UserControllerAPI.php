<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;

class UserControllerAPI extends Controller
{
    public function getUsers(Request $request)
    {
        
        return UserResource::collection(User::all());
        
    }

    public function getUser($id)
    {
        return new UserResource(User::find($id));
    }

    public function store(Request $request)
    {
        $data = [
            'name' => $request->name,
            'nickname' => $request->nickname,
            'email' => $request->email,
            'password' => $request->password
        ];
        $user = new User();
        $user->fill($data);
        $user->password = Hash::make($user->password);
        $user->save();
        return response()->json(['message' => 'registration success'], 200);

        //return response()->json(new UserResource($user), 201);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
                'name' => 'required',
                'email' => 'required|email|unique:users,email,'.$id,
                'nickname' => 'required|unique:users,email',
            ]);
        $user = User::findOrFail($id);
        $user->update($request->all());
        return new UserResource($user);
    }

    public function blockUser($id) {
        $user = User::findOrFail($id);
        $user->blocked = 1;
        $data = [
            'blocked' => $user->blocked
        ];
        $user->update($data);   
        return new UserResource($user);
    }

    public function unblockUser($id) {
        $user = User::findOrFail($id);
        $user->blocked = 0;
        $data = [
            'blocked' => $user->blocked
        ];
        $user->update($data);   
        return new UserResource($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function emailAvailable(Request $request)
    {
        $totalEmail = 1;
        if ($request->has('email') && $request->has('id')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->where('id', '<>', $request->id)->count();
        } else if ($request->has('email')) {
            $totalEmail = DB::table('users')->where('email', '=', $request->email)->count();
        }
        return response()->json($totalEmail == 0);
    }
}
