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
        'name', 'email', 'password', 'rut',
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

    public function habilitarVoto(Votante $votante = null)
    {
        if($this->votante){
            return true;
        }
        $ci = $this->rut;
        if(is_null($votante)){
            try{
                $votante = Votante::whereCi($ci)->whereNull('user_id')->firstOrFail();
            }catch(ModelNotFoundException $e){
                return false;
            }
        }
        $votante->user()->associate($this);
        $votante->save();
        return true;
    }

}
