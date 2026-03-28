<?php
namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table      = 'auth_user';
    protected $primaryKey = 'id';

    protected $allowedFields = [
        'email', 'first_name', 'last_name', 'password', 'is_active'
    ];

    protected $beforeInsert = ['hashPassword'];

    protected function hashPassword(array $data): array
    {
        if (isset($data['data']['password'])) {
            $data['data']['password'] = password_hash(
                $data['data']['password'],
                PASSWORD_BCRYPT
            );
        }
        return $data;
    }
}