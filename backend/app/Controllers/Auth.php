<?php
namespace App\Controllers;

use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use Firebase\JWT\JWT;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function register()
    {
        $rules = [
            'email'      => 'required|valid_email|is_unique[auth_user.email]',
            'first_name' => 'required|min_length[2]',
            'last_name'  => 'required|min_length[2]',
            'password'   => 'required|min_length[6]',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors(), 422);
        }

        $model  = new UserModel();
        $userId = $model->insert([
            'email'      => $this->request->getVar('email'),
            'first_name' => $this->request->getVar('first_name'),
            'last_name'  => $this->request->getVar('last_name'),
            'password'   => $this->request->getVar('password'),
        ]);

        return $this->respondCreated([
            'status'  => true,
            'message' => 'User registered successfully',
            'user_id' => $userId,
        ]);
    }

    public function login()
    {
        $email    = $this->request->getVar('email');
        $password = $this->request->getVar('password');

        $model = new UserModel();
        $user  = $model->where('email', $email)->first();

        if (!$user || !password_verify($password, $user['password'])) {
            return $this->failUnauthorized('Invalid email or password');
        }

        $payload = [
            'iss'   => 'teacher-management-system',
            'iat'   => time(),
            'exp'   => time() + (60 * 60 * 24),
            'uid'   => $user['id'],
            'email' => $user['email'],
        ];

        $token = JWT::encode($payload, getenv('JWT_SECRET'), 'HS256');

        return $this->respond([
            'status' => true,
            'token'  => $token,
            'user'   => [
                'id'         => $user['id'],
                'email'      => $user['email'],
                'first_name' => $user['first_name'],
                'last_name'  => $user['last_name'],
            ],
        ]);
    }

    public function listUsers()
    {
        $model = new UserModel();
        $users = $model
            ->select('id, email, first_name, last_name, is_active, created_at')
            ->findAll();

        return $this->respond([
            'status' => true,
            'data'   => $users
        ]);
    }
}