<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->get('/', 'Home::index');
$routes->post('api/auth/register', 'Auth::register');
$routes->post('api/auth/login',    'Auth::login');

$routes->group('api', ['filter' => 'jwtAuth'], function($routes) {
    $routes->post('teachers',  'Teachers::create');
    $routes->get('teachers',   'Teachers::index');
    $routes->get('auth-users', 'Auth::listUsers');
});