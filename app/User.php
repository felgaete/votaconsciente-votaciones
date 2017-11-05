<?php

namespace Votaconsciente;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class User extends Authenticatable
{
    use Notifiable;

    /**
    * Model table
    */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'confirmed'
    ];

    public function votante()
    {
        return $this->hasOne(Votante::class);
    }

    public function habilitarVoto($ci)
    {
        if($this->votante){
            return true;
        }
        try{
            $votante = Votante::whereCi($ci)->firstOrFail();
        }catch(ModelNotFoundException $e){
            return false;
        }
        $votante->user()->associate($this);
        $votante->save();
        return true;
    }

}
