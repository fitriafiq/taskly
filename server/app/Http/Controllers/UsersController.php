<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules;

class UsersController extends Controller
{

    /**
     * Update the specified resource in storage.
     */
    public function account(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'first_name' => 'string|required|max:255',
            'last_name' => 'string|required|max:255',
            'avatar' => 'image|mimes:jpg,jpeg,png|max:1024',
        ]);

        $avatar = $request->file('avatar');

        if ($avatar) {
            $avatarPath = $avatar->store('avatars', 'public');
            $user->avatar = $avatarPath;
        }

        if ($user instanceof User) {
            $user->update([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name')
            ]);
        }

        return response()->json($request);
    }

    public function preference(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'setting_all' => 'required|integer',
            'setting_today' => 'required|integer',
            'setting_upcoming' => 'required|integer',
            'setting_completed' => 'required|integer',
            'setting_theme' => 'required|integer',
        ]);

        if ($user instanceof User) {
            $user->update([
                'setting_all' => $request->input('setting_all', $user->setting_all),
                'setting_today' => $request->input('setting_today', $user->setting_today),
                'setting_upcoming' => $request->input('setting_upcoming', $user->setting_upcoming),
                'setting_completed' => $request->input('setting_completed', $user->setting_completed),
                'setting_theme' => $request->input('setting_theme', $user->setting_theme),
            ]);
        }

        return response()->json(['message' => 'User data updated successfully']);
    }

    public function password(Request $request)
    {
        $user =  Auth::user();
        $errors = [];

        if (!Hash::check($request->input('current_password'), $user->password)) {
            $errors['current_password'] = 'Current password is incorrect';
        }

        $validator = Validator::make($request->all(), [
            'current_password' => 'required',
            'new_password' => ['required', Rules\Password::defaults(), 'confirmed'],
        ]);

        if ($validator->fails()) {
            $errors = array_merge($errors, $validator->errors()->toArray());
        }

        if (isset($errors['new_password'])) {
            $errors['new_password'] = $errors['new_password'][0];
        }

        if (!empty($errors)) {
            return response()->json(['errors' => $errors], 422);
        }

        if ($user instanceof User) {
            $user->update([
                'password' => Hash::make($request->input('new_password')),
            ]);
        }

        return response()->json(['message' => 'Password updated successfully']);
    }
}
