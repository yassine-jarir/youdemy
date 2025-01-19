-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jan 19, 2025 at 01:47 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youdemy`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `category_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`category_id`, `name`, `created_at`) VALUES
(5, 'Web Development', '2025-01-15 23:17:18'),
(6, 'Data Science', '2025-01-15 23:17:18'),
(7, 'Graphic Design', '2025-01-15 23:17:18'),
(10, 'DATA S', '2025-01-18 19:53:19'),
(12, 'DEVOPS', '2025-01-18 21:18:21');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `course_id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `content` text NOT NULL,
  `category_id` int DEFAULT NULL,
  `teacher_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `content_url` varchar(255) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`course_id`, `title`, `description`, `content`, `category_id`, `teacher_id`, `created_at`, `updated_at`, `content_url`, `image_url`) VALUES
(4, 'Introduction to Programming', 'This course covers the basics of programming.', 'Course content goes here...', 7, 12, '2025-01-16 15:02:16', '2025-01-18 20:32:23', 'https://www.youtube.com/watch?v=MPibCgyGunM', '//images.ctfassets.net/yadj1kx9rmg0/wtrHxeu3zEoEce2MokCSi/cf6f68efdcf625fdc060607df0f3baef/quwowooybuqbl6ntboz3.jpg'),
(5, 'Introduction to Programming', 'This course covers the basics of programming.', 'Course content goes here...', 5, 12, '2025-01-17 00:48:38', '2025-01-18 20:41:05', 'https://www.youtube.com/watch?v=DWwxM4nkE_o', 'https://www.hocalwire.com/h-upload/uid/UrqcwKUWdSIBFwKspwg7hiPlTyX5TAoB7033284.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `course_tags`
--

CREATE TABLE `course_tags` (
  `course_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `course_tags`
--

INSERT INTO `course_tags` (`course_id`, `tag_id`) VALUES
(5, 3),
(5, 6),
(4, 32);

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `enrollment_id` int NOT NULL,
  `student_id` int DEFAULT NULL,
  `course_id` int DEFAULT NULL,
  `enrollment_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`enrollment_id`, `student_id`, `course_id`, `enrollment_date`) VALUES
(11, 9, 5, '2025-01-17 01:14:05');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `tag_id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`tag_id`, `name`) VALUES
(32, 'NodeJS'),
(6, 'PHP'),
(3, 'SQL');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('visitor','student','teacher','admin') NOT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `role`, `is_active`, `created_at`, `updated_at`) VALUES
(9, 'dfgdsxfg', 'df@eplsxe.com', '$2y$12$GKyYyotjn2WI82hLkkoFXesa77.QBUI.ZTgtcjf.zZQWo5lSYMfme', 'student', 1, '2025-01-14 22:14:07', '2025-01-16 17:24:13'),
(10, 'dfscgdsxfg', 'df@scplsxe.com', '$2y$12$80CvG/O8IhWQkZiBkR2FXuEEUNhoRYJnw1Qj7sYOtsCTVRYNYe3Hm', 'teacher', 0, '2025-01-14 22:14:43', '2025-01-18 21:43:26'),
(11, 'john_doe', 'john_doe@example.com', 'hashed_password_123', 'teacher', 0, '2025-01-15 23:18:28', '2025-01-18 21:43:26'),
(12, 'jane_doe', 'jane_doe@example.com', 'hashed_password_456', 'student', 1, '2025-01-15 23:18:28', '2025-01-15 23:18:28'),
(13, 'admin_user', 'admin@example.com', 'hashed_password_789', 'admin', 1, '2025-01-15 23:18:28', '2025-01-15 23:18:28'),
(14, 'yassine', 'test@test.com', '$2y$12$WO1gtT1TaaY95gcu.xDynucGIy7IPiQgzVFzRoupHUquuSjv4/YqC', 'student', 1, '2025-01-17 14:50:07', '2025-01-17 14:50:07'),
(15, 'vyryc', 'fizazu@mailinator.com', '$2y$12$52nY/BfC4Cm2tQbd/xTt.ObPX/S3rujK1kkTdJ2ZvTc6k3keGbe6u', 'student', 1, '2025-01-17 14:52:13', '2025-01-17 14:52:13'),
(16, 'daxaneqe', 'maderazego@mailinator.com', '$2y$12$dO/laBd3LolIy2Rw4OSL5.Vx8nsl6XDwd5.gNKT1yEngVrnx4LlD2', 'teacher', 0, '2025-01-17 14:54:21', '2025-01-18 21:43:27'),
(17, 'jihizibyj', 'byjezy@mailinator.com', '$2y$12$CS.DEKiRvnrbpYT.kpsUouKvFmx6tCl4zV7ERaYc3NC4n41QjmZOK', 'teacher', 0, '2025-01-17 14:55:05', '2025-01-18 21:43:27'),
(18, 'xyhijegi', 'dihed@mailinator.com', '$2y$12$pGTmsDRs9SJ4eTvh6jCczOK17yAWeGaRpJQXINQRMYVMg7MEqR8lm', 'teacher', 0, '2025-01-17 14:59:37', '2025-01-18 21:43:28'),
(19, 'wihetezib', 'cicu@mailinator.com', '$2y$12$wAGJtGQR5XibMEYw19pnxuip0VOB9.O02AGJjb2SwNdC6IvxznH0C', 'student', 1, '2025-01-17 15:02:52', '2025-01-17 15:02:52'),
(20, 'rydenikavi', 'jewo@mailinator.com', '$2y$12$LYNPeQagdEhLzfSDDb2treyynNFzm8CNFqQVcdMv156HfM9CwlnH.', 'teacher', 1, '2025-01-17 15:39:14', '2025-01-17 15:39:14'),
(21, 'renohi', 'hysybaduwi@mailinator.com', '$2y$12$xDfA1EZ/PPvtZAqedKDqZepZ0N7D/7UlOnflKw25U5b2MSm35RzNq', 'teacher', 1, '2025-01-17 15:39:54', '2025-01-17 15:39:54'),
(22, 'ramemy', 'suvycudyk@mailinator.com', '$2y$12$hkz8SaPejlDoOwZzN6ZoVuElI/W0YF0ESfAy5V.KvcGrJzMTs5Hje', 'student', 1, '2025-01-17 15:41:24', '2025-01-17 15:41:24'),
(23, 'fytefifika', 'dulydic@mailinator.com', '$2y$12$yQI9K4HzabHoO.bd2qYXne8auM1O1Ox.ti3jGWGvRNwVFXuvMv95q', 'student', 1, '2025-01-17 15:42:54', '2025-01-17 15:42:54'),
(24, 'boqucudule', 'lupa@mailinator.com', '$2y$12$9AhKVE/FBi4kHf7bQtMOs.SGF37EfMLEt736HErbO6IwUmWHioiMq', 'student', 1, '2025-01-17 15:44:46', '2025-01-17 15:44:46'),
(25, 'hutyfeky', 'nadi@mailinator.com', '$2y$12$caO7H/XrHEg2z2jeTSwJC.iENqBzE3rq6.WGdmhfr8p1E7eAK/iO.', 'teacher', 1, '2025-01-17 16:54:32', '2025-01-17 16:54:32'),
(26, 'cezugi', 'keby@mailinator.com', '$2y$12$qqJoOJCIe0SS/MNclvD0jeIyt92JvXu6g0GMrlIOwPheMvlijyFmi', 'student', 1, '2025-01-17 16:55:29', '2025-01-17 16:55:29'),
(27, 'nujisixar', 'cyhidu@mailinator.com', '$2y$12$ZgAkbSJgiVpiW2kwsohdqOguLZdRkNyFupFATSn2LgMNJeFAWrgtC', 'teacher', 1, '2025-01-17 16:56:45', '2025-01-17 16:56:45'),
(28, 'cakeko', 'basofu@mailinator.com', '$2y$12$HQbx56w/m8RxZCOtYNzJ5u/HuM35bUpYIYmUuG5e1D589GlgHLdY.', 'student', 1, '2025-01-17 16:57:49', '2025-01-17 16:57:49'),
(29, 'tawef', 'koqirysapi@mailinator.com', '$2y$12$BF3yqil6ISevsytOsxZKq.Q.sRJzPyZUD08nWdL9qWvoHV/8SxeFy', 'teacher', 1, '2025-01-17 16:58:47', '2025-01-17 16:58:47'),
(30, 'mifejysez', 'myge@mailinator.com', '$2y$12$nuDzW.Xv5MjkJAiaMULeSuLmwq3CvwKK38jwggdPWYigrFW6ZudG6', 'student', 1, '2025-01-17 16:59:47', '2025-01-17 16:59:47'),
(31, 'lilohu', 'votoqyvix@mailinator.com', '$2y$12$ajlUIcp3VxTkwxQ0nSKW/O.AZekplIObm1c2jwwvFlXDz0EaQ9FDC', 'teacher', 1, '2025-01-17 17:01:48', '2025-01-17 17:01:48'),
(32, 'savynano', 'dijylyju@mailinator.com', '$2y$12$Rwh.SVAPZpHMyWQXvrQSDuFLWcBeF.36NKUqoaHP0Eq2SMviBA462', 'admin', 1, '2025-01-17 17:03:00', '2025-01-18 13:39:42'),
(33, 'tidafu', 'qikebesy@mailinator.com', '$2y$12$LAWvNxqdaIqDtpL23lRaVu/xn5Nsz7M1L/dbgp9H.as6Xj7CErY7u', 'teacher', 1, '2025-01-17 17:04:47', '2025-01-17 17:04:47'),
(34, 'hufaseqin', 'wirasideg@mailinator.com', '$2y$12$Tf6sQMJ7UJa1SQBqlK07eesJoY4KqY6ozbuPb1NDmkPg/yGiiVcTe', 'teacher', 1, '2025-01-17 17:05:56', '2025-01-17 17:05:56'),
(35, 'huzuveg', 'gekuvebej@mailinator.com', '$2y$12$CbRc4dFMcJfSrgtFBsASFOCuL6tTaLetzxwCQ3gwr4P57x9R//Rrm', 'teacher', 1, '2025-01-17 17:08:58', '2025-01-17 17:08:58'),
(36, 'qororycare', 'rogojizibo@mailinator.com', '$2y$12$tJoxeULrzeiKZgF7rgj.futn5OZq772IJE9zWPN.9.lK4Nb/ESj.y', 'student', 1, '2025-01-17 17:09:21', '2025-01-17 17:09:21'),
(37, 'zalej', 'niqeqyz@mailinator.com', '$2y$12$CDc.rKS2uoYdnhtZPNT9ouLTOnh/ZFavsLjgdgqXUVnYKDEW96/b6', 'student', 1, '2025-01-17 17:11:34', '2025-01-17 17:11:34'),
(38, 'zawagimyzu', 'domewatoj@mailinator.com', '$2y$12$zdPyUR1MEdTB8yvSSzwF2.JWhfOdwkfEGhMo9yZA/7T135OZxsw/K', 'teacher', 1, '2025-01-17 17:11:50', '2025-01-17 17:11:50'),
(39, 'tapasonu', 'fenehetuny@mailinator.com', '$2y$12$uifkcFJCyPbWrqHV6Gs3Wu5ebF/XfhRTrTgITRpCgBSCJh8EXfJzm', 'teacher', 1, '2025-01-17 17:12:29', '2025-01-17 17:12:29'),
(40, 'vexij', 'mugupikobo@mailinator.com', '$2y$12$Ogad34jwiqkDky1PFvelbO.ZVYV3UrnyEE9h77KWG2LsqWGKN0sru', 'teacher', 1, '2025-01-17 17:13:56', '2025-01-18 21:38:17'),
(41, 'jahulegib', 'wironivo@mailinator.com', '$2y$12$qFljVRJbqv2JGflfwNqBSuV6sJtG5g2cJzN9.z0TL.NTWYGO/Mx72', 'teacher', 1, '2025-01-17 17:18:38', '2025-01-18 21:37:28'),
(42, 'zycuzijeka', 'nybogygel@mailinator.com', '$2y$12$3AUeZPYy2czVdmMkU2qq6OemMMC0CNxmKzq64Ht7l.9qIoPzJo7Cm', 'teacher', 1, '2025-01-17 17:20:05', '2025-01-17 17:20:05'),
(43, 'tulohyv', 'tejuwa@mailinator.com', '$2y$12$5ggr4tByIc8WxxfAhg2SYuEYk86gAuGgAgbV3RMjhJy3EhZYXPykW', 'student', 1, '2025-01-17 17:21:16', '2025-01-17 17:21:16'),
(44, 'palifum', 'lyqyfi@mailinator.com', '$2y$12$NYOcCLxQWEiVFNkEXz3Y9u7oPv5E9LmY74JxugIcP3LV3gZSYpNsS', 'teacher', 1, '2025-01-17 17:23:16', '2025-01-17 17:23:16'),
(45, 'tulygirobi', 'ruxofyzuni@mailinator.com', '$2y$12$DATIaV6hiszxztAbNivE0uQeYMe9A/G/2Kt2CrCN8CLIFuPtSKqki', 'student', 1, '2025-01-17 17:25:36', '2025-01-17 17:25:36'),
(46, 'yassasdine', 'teasdst@teasdasdst.com', '$2y$12$Ry2meURYzvMZAM195YKFCeXoJP0qrF8K1CRWk6Y9LvLU6zrgX/oZe', 'student', 1, '2025-01-17 17:27:59', '2025-01-17 17:27:59'),
(47, 'yassaxsdine', 'teasxdst@teasdxasdst.com', '$2y$12$nQ9W12tWrJqTsJQBh9FF5ull1ZuYIY7H9ffJCafz11wI4Q32TVGg2', 'student', 1, '2025-01-17 19:04:33', '2025-01-17 19:04:33'),
(48, 'testuser', 'test@example.com', '$2y$12$HnsgE0UjXVLrHdVBkNFcseLhsV9jjI7GNTH4VnyYl4CiD9NdJOl6S', 'student', 1, '2025-01-18 13:21:42', '2025-01-18 13:21:42'),
(49, 'jityr', 'fefabexo@mailinator.com', '$2y$12$7WQOlDVahr0FxwWLF/Xv7.lvGeNauZBv.KlWJ/HYHPf2zXrB1PUHy', 'teacher', 1, '2025-01-18 13:28:07', '2025-01-18 13:28:07'),
(50, 'menydavym', 'gybaxyw@mailinator.com', '$2y$12$HI5QnBjNL9gJHxxO7o88te/uG5ZTCww/6drRTb9Yr63hI4YTxo2ey', 'student', 1, '2025-01-18 13:28:20', '2025-01-18 13:28:20'),
(51, 'pucybew', 'ziducihada@mailinator.com', '$2y$12$aOLjskp9I0FF2CXhVc8SFu9mV2h5lvhMPCbBoXFaoaT/HfsVeZez6', 'student', 1, '2025-01-18 13:28:30', '2025-01-18 13:28:30'),
(52, 'mavinunyz', 'bytaza@mailinator.com', '$2y$12$LU8yMQ9cWwrw4aZib3FVP.9BmHAO1i70pnmfO/XX.NurpQlfeL9j2', 'teacher', 1, '2025-01-18 13:34:11', '2025-01-18 13:34:11');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`category_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `course_tags`
--
ALTER TABLE `course_tags`
  ADD PRIMARY KEY (`course_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`tag_id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `category_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `course_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `enrollment_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `tag_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `course_tags`
--
ALTER TABLE `course_tags`
  ADD CONSTRAINT `course_tags_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`tag_id`) ON DELETE CASCADE;

--
-- Constraints for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD CONSTRAINT `enrollments_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollments_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`course_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
