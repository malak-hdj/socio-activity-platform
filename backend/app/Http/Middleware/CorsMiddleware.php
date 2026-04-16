<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Si c'est une requête OPTIONS (preflight), on répond directement
        if ($request->getMethod() === "OPTIONS") {
            return $this->buildResponse($request);
        }

        $response = $next($request);

        return $this->buildResponse($request, $response);
    }

    private function buildResponse(Request $request, Response $response = null): Response
    {
        $allowedOrigins = [
            'http://localhost:5173',    // Frontend Vite dev
            'http://localhost:3000',    // Alternative
            'http://127.0.0.1:5173',
        ];

        $origin = $request->header('Origin');

        if (in_array($origin, $allowedOrigins)) {
            if (!$response) {
                $response = response('', 200);
            }

            $response->header('Access-Control-Allow-Origin', $origin);
            $response->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
            $response->header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
            $response->header('Access-Control-Allow-Credentials', 'true');
            $response->header('Access-Control-Max-Age', '3600');
        }

        return $response;
    }
}
