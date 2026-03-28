-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2026 at 10:51 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `teacher_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth_user`
--

CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth_user`
--

INSERT INTO `auth_user` (`id`, `email`, `first_name`, `last_name`, `password`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'test@example.com', 'John', 'Doe', '$2y$10$18/3bVUGLeq0VfnHAWeLhu1/q2cKSKdv3xekSB.YMPexC4t60yVKq', 1, '2026-03-28 12:07:44', '2026-03-28 12:07:44'),
(2, 'teacher@example.com', 'Jane', 'Smith', '$2y$10$SSpzcZzoAXHwTcZRWWhNMuHAfjLu83y4sfkazhWPP8uwXmUHdq6Au', 1, '2026-03-28 12:13:15', '2026-03-28 12:13:15'),
(3, 'test2@example.com', 'John', 'Doe', '$2y$10$/viNQlsN/E2d1mrjCtBflefJiuCkLCxj.HGMKWy0V8PrId8PMe5qi', 1, '2026-03-28 12:22:32', '2026-03-28 12:22:32'),
(4, 'test3@example.com', 'John', 'Doe', '$2y$10$RQUTQJC.XMHDhvr8VGSUuOB7eYQFq7oJ3a/1qi7wUHaCRtaK235l6', 1, '2026-03-28 12:25:33', '2026-03-28 12:25:33'),
(5, 'teacher1@example.com', 'Jane', 'Smith', '$2y$10$jJxOqe9qbkUGdA5JYfNoee8EKIvExC19/DsTI3hRD7sEu9EXq1Sha', 1, '2026-03-28 12:27:29', '2026-03-28 12:27:29'),
(6, 'singhapoorva860@gmail.com', 'Apoorva', 'singh', '$2y$10$1FNpPiIbl7wcGl.MipoAMud1X/wPrCccepUbQSwGOSidSVJGp4Ce.', 1, '2026-03-28 15:13:39', '2026-03-28 15:13:39'),
(7, 'apoorva@gmail.com', 'Apoorva', 'singh', '$2y$10$HBEfKWwIwKpAN0VYy3O.VuMpnt2D4J.qFwUU5lG.FgDJlC6UdQjy6', 1, '2026-03-28 15:18:57', '2026-03-28 15:18:57');

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `university_name` varchar(255) NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `year_joined` year(4) NOT NULL,
  `department` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `user_id`, `university_name`, `gender`, `year_joined`, `department`, `phone`, `created_at`) VALUES
(1, 2, 'Delhi University', 'Female', '2020', 'Computer Science', '9876543210', '2026-03-28 12:13:15'),
(2, 5, 'Delhi University', 'Female', '2020', 'Computer Science', '9876543210', '2026-03-28 12:27:29'),
(3, 7, 'IIIT manipur', 'Female', '2021', 'ece', '', '2026-03-28 15:18:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth_user`
--
ALTER TABLE `auth_user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth_user`
--
ALTER TABLE `auth_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `teachers`
--
ALTER TABLE `teachers`
  ADD CONSTRAINT `teachers_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
