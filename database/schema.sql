CREATE DATABASE IF NOT EXISTS teacher_management;
USE teacher_management;

CREATE TABLE auth_user (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  first_name  VARCHAR(100) NOT NULL,
  last_name   VARCHAR(100) NOT NULL,
  password    VARCHAR(255) NOT NULL,
  is_active   TINYINT(1) DEFAULT 1,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE teachers (
  id               INT AUTO_INCREMENT PRIMARY KEY,
  user_id          INT NOT NULL UNIQUE,
  university_name  VARCHAR(255) NOT NULL,
  gender           ENUM('Male','Female','Other') NOT NULL,
  year_joined      YEAR NOT NULL,
  department       VARCHAR(100) NOT NULL,
  phone            VARCHAR(20),
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES auth_user(id) ON DELETE CASCADE
);