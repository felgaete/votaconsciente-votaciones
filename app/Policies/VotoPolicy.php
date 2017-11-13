<?php

namespace Votaconsciente\Policies;

use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Support\Facades\DB;
use Votaconsciente\User;
use Votaconsciente\Eleccion;
use Votaconsciente\Territorio;
use Votaconsciente\Voto;

class VotoPolicy
{
    use HandlesAuthorization;

    protected $db;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->db = DB::query();
    }

    protected function query(User $user, Eleccion $eleccion, Territorio$territorio)
    {
        if($user->votante){
            return $this->db->from('votante_territorio_electoral')
            ->where('votante_id', $user->votante->id)
            ->where('eleccion_id', $eleccion->id)
            ->where('territorio_id', $territorio->id);
        }
        return false;
    }

    public function anular(User $user, Voto $voto)
    {
        if($user->votante){
            return $voto->votante->id == $user->votante->id;
        }
        return false;
    }
}
