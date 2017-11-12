<?php

namespace Votaconsciente\Http\Middleware;

use Closure;
use Illuminate\Validation\UnauthorizedException;

class CheckIsAdmin
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
        if(!$request->user()->is_admin){
          throw new UnauthorizedException("User doesn't have admin rights.");
        }
        return $next($request);
    }
}
