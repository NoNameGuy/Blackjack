<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Contracts\Support\Jsonable;

use App\Http\Resources\User as UserResource;
use Illuminate\Support\Facades\DB;

use App\User;
use App\StoreUserRequest;
use Hash;
use App\Mail\MailSender;

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
            'password' => $request->password,
            'activated' => 0,
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

    public function blockUser(Request $request, $id) {
        $request->validate([
            'reason_blocked' => 'required'
        ]);
        $user = User::findOrFail($id);
        $user->blocked = 1;
        $user->update($request->all());
        /* Send Email to notify user */
        \Mail::to($user)->send(new MailSender('emails.block', $user));
        
        /* End notification */
        return new UserResource($user);
    }

    public function unblockUser(Request $request, $id) {
        $request->validate([
            'reason_reactivated' => 'required'
        ]);
        $user = User::findOrFail($id);
        $user->blocked = 0;
        $user->update($request->all());

        /* Send Email to notify user */
        \Mail::to($user)->send(new MailSender('emails.unblock', $user));
        

        /* End notification */
        return new UserResource($user);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        /* Send Email to notify user */
        
        \Mail::to($user)->send(new MailSender('emails.delete', $user));
        
        /* End notification */
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

    public function resetPass(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user != null) {
            if(Hash::check($request->password, $user->password))
            {
                $user->password = Hash::make($request->password); 
                $user->save();         
                return response()->json(['message' => 'Current Password is correct'], 200);
            }
    /*
            $newHash = Hash::make($request->password);
            if ($newHash == $user->password) {
                $user->password = $newHash;
                return response()->json(['message' => 'Current Password is correct'], 200);
            }
            */
            
            return response()->json(['message' => 'Current Password is NOT correct'], 422);
        }
        
        return response()->json(['message' => 'Not allowed'], 401);

    }

    public function getAdmin(Request $request)
    {
        $admin = User::where('email', $request->email)->first();
        if ($admin != null && $admin->admin == 1) {
            return response()->json(['admin' => '1'], 200);
        }
        return response()->json(['admin' => '0'], 401);
        
    }

    public function sendMail(Request $request) {
        $admin = User::where('email', $request->email)->first();
        if ($admin != null && $admin->admin == 1) {
            \Mail::to($admin)->send(new MailSender('emails.adminReset', $admin));
            return response()->json(['admin' => '1'], 200);
        }
        return response()->json(['admin' => '0'], 401);
    }

    

    /*public function getDefesa () {
        $blockeds = User::where('blocked', 1)->count();

        return response()->json(['isBlock' => $blockeds], 200);

        //return new UserResource(User::where('blocked', 1)->count());
    }*/
  }
