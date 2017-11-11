<?php

namespace Votaconsciente\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'Votaconsciente\Candidatura' => 'Votaconsciente\Policies\CandidaturaPolicy',
        'Votaconsciente\Voto' => 'Votaconsciente\Policies\VotoPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('votar-territorio-electoral', 'Votaconsciente\Policies\TerritorioElectoralPolicy@votar');
    }
}
