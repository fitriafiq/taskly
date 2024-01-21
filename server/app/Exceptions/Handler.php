<?php

namespace App\Exceptions;

use App\Models\User;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;
use Illuminate\Routing\Exceptions\InvalidSignatureException;
use App\Providers\RouteServiceProvider;
use Illuminate\Support\Facades\Hash;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        // $this->reportable(function (Throwable $e) {
        //     //
        // });
        $this->renderable(function (InvalidSignatureException $e) {
            $user = User::find(request()->route('id'));
            return redirect()->intended(config('app.frontend_url') . RouteServiceProvider::EXPIRED . '?id=' . encrypt($user->id));
        });
    }
}
