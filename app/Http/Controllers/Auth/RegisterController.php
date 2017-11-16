<?php

namespace Votaconsciente\Http\Controllers\Auth;

use Votaconsciente\User;
use Votaconsciente\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Bestmomo\LaravelEmailConfirmation\Traits\RegistersUsers;
use Votaconsciente\Rules\Rut;

class RegisterController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Register Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users as well as their
    | validation and creation. By default this controller uses a trait to
    | provide this functionality without requiring any additional code.
    |
    */

    use RegistersUsers;

    /**
     * Where to redirect users after registration.
     *
     * @var string
     */
    protected $redirectTo = '/login';

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest');
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'ci' => ['required' ,new Rut, 'exists:servel_votantes,ci', 'unique:users,rut'],
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'ci.required' => 'Debes ingresar tu Rut',
            'ci.unique' => 'El rut que ingresaste, ya está siendo utilizado.',
            'ci.exists' => 'no-vote',
            'name.required' => 'Debes ingresar un nombre',
            'email.required' => 'Debes ingresar un correo electrónico válido',
            'email.email' => 'Debes ingresar un correo electrónico válido',
            'email.unique' => 'El correo electrónico ya se encuentra utilizado',
            'password.required' => 'Debes ingresar una contraseña',
            'password.confirmed' => 'Las contraseñas ingresadas no coinciden',
            'password.min' => 'La contraseña debe ser de al menos 6 caracteres.'
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return \Votaconsciente\User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
            'rut' => $data['ci']
        ]);
    }
}
