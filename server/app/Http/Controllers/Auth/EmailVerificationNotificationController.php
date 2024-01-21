<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Validator;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): JsonResponse|RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        $request->user()->sendEmailVerificationNotification();

        return response()->json(['status' => 'verification-link-sent']);
    }

    public function resend(Request $request): JsonResponse|RedirectResponse
    {
        $validator = Validator::make($request->all(), [
            'id' => 'email',
        ]);

        if ($validator->fails()) {
            $user = User::find(decrypt($request->id));
        } else {
            $user = User::where('email', $request->id)->first();
        }

        if (!$user) {
            return response()->json(['errors' => ['email' => 'Email does not exist']], 422);
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(RouteServiceProvider::HOME);
        }

        $user->sendEmailVerificationNotification();

        return response()->json(['status' => 'verification-link-resent']);
    }
}
