<?php

namespace Votaconsciente\Policies;

use Votaconsciente\Eleccion;
use Votaconsciente\Territorio;
use Votaconsciente\User;

class TerritorioElectoralPolicy extends VotoPolicy
{
    public function votar(User $user, Eleccion $eleccion, Territorio $territorio)
    {
        return $this->query($user, $eleccion, $territorio)->count() > 0;
    }
}
