<?php

namespace Votaconsciente\Policies;

use Votaconsciente\User;
use Votaconsciente\Candidatura;

class CandidaturaPolicy extends VotoPolicy
{

    public function votar(User $user, Candidatura $candidatura)
    {
        return $this->query($user, $candidatura->eleccion, $candidatura->territorio)
            ->count() > 0;
    }
}
