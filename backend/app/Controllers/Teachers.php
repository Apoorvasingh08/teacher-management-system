<?php
namespace App\Controllers;

use App\Models\TeacherModel;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;

class Teachers extends ResourceController
{
    protected $format = 'json';

    public function create()
    {
        $rules = [
            'email'           => 'required|valid_email|is_unique[auth_user.email]',
            'first_name'      => 'required|min_length[2]',
            'last_name'       => 'required|min_length[2]',
            'password'        => 'required|min_length[6]',
            'university_name' => 'required',
            'gender'          => 'required|in_list[Male,Female,Other]',
            'year_joined'     => 'required|integer|greater_than[1900]',
            'department'      => 'required',
        ];

        if (!$this->validate($rules)) {
            return $this->fail($this->validator->getErrors(), 422);
        }

        $db = \Config\Database::connect();
        $db->transStart();

        try {
            $userModel = new UserModel();
            $userId    = $userModel->insert([
                'email'      => $this->request->getVar('email'),
                'first_name' => $this->request->getVar('first_name'),
                'last_name'  => $this->request->getVar('last_name'),
                'password'   => $this->request->getVar('password'),
            ]);

            $teacherModel = new TeacherModel();
            $teacherModel->insert([
                'user_id'         => $userId,
                'university_name' => $this->request->getVar('university_name'),
                'gender'          => $this->request->getVar('gender'),
                'year_joined'     => $this->request->getVar('year_joined'),
                'department'      => $this->request->getVar('department'),
                'phone'           => $this->request->getVar('phone'),
            ]);

            $db->transComplete();

            if ($db->transStatus() === false) {
                throw new \Exception('Transaction failed');
            }

            return $this->respondCreated([
                'status'  => true,
                'message' => 'Teacher created successfully',
            ]);

        } catch (\Exception $e) {
            $db->transRollback();
            return $this->failServerError(
                'Failed to create teacher: ' . $e->getMessage()
            );
        }
    }

    public function index()
    {
        $db = \Config\Database::connect();

        $teachers = $db->table('teachers t')
            ->select('t.id, t.university_name, t.gender, t.year_joined,
                      t.department, t.phone, t.created_at,
                      u.email, u.first_name, u.last_name')
            ->join('auth_user u', 'u.id = t.user_id')
            ->get()
            ->getResultArray();

        return $this->respond([
            'status' => true,
            'data'   => $teachers
        ]);
    }
}