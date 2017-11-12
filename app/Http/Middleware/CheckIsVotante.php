<?php

namespace Votaconsciente\Http\Middleware;

use Closure;
use Illuminate\Validation\UnauthorizedException;

class CheckIsVotante
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->user()->votante){
            return $next($request);
        }

        throw new UnauthorizedException('No habilitado como votante');

    }
}
