<?php

namespace Votaconsciente\Http\Controllers\Auth;

use Votaconsciente\Http\Controllers\Controller;
use Bestmomo\LaravelEmailConfirmation\Traits\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = '/votar';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function validateLogin($request)
    {
      $this->validate($request, [
          $this->username() => 'required|string',
          'password' => 'required|string',
      ], [
        $this->username(). '.required' => 'Debes ingresar un correo elecrtónico',
        'password.required' => 'Debes ingresar una contraseña'
      ]);
    }
}
