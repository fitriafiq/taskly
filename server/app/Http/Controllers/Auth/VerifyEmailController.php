<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $user = User::find($request->id);

        if (!hash_equals(sha1($user->getEmailForVerification()), (string) $request->hash)) {
            throw new AuthorizationException;
        }

        if ($user->hasVerifiedEmail()) {
            return redirect()->intended(
                config('app.frontend_url') . RouteServiceProvider::VERIFY
            );
        }

        if ($user->markEmailAsVerified()) {
            event(new Verified($user));
        }

        return redirect()->intended(
            config('app.frontend_url') . RouteServiceProvider::VERIFY
        );
    }
}
