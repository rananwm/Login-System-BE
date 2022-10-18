-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 18, 2022 at 09:18 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `login_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`) VALUES
('7497bc90-ba0f-4aa7-8b15-dba6d0c50b58', 'fsdeveloper202@gmail.com', '$2a$10$37hMUSdeMtW9bBFkQLl3Q.Vol5Qp8mKxWl2bGDyai8mYtZWxzFAc.'),
('a8f74587-166a-4c81-a687-df9f50218bf8', 'fsd0faljlajhffkalfaafaalfjljaa2@gmail.com', '$2a$10$uaUU848PdJXFzIb0x5974Ox74qjTTFGn3pauv2WNXddS25vNIUcXm'),
('ee78971f-93dd-43fe-8860-7958828c105d', 'sarwarf271@gmail.com', '$2a$10$dKtWolOGlFIuFQWm2hPYTuGN/BkXXgo/aZz6ZIajXi01akTmkIBZm');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
