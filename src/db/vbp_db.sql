-- phpMyAdmin SQL Dump
-- version 4.8.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 04, 2018 at 07:41 AM
-- Server version: 10.1.32-MariaDB
-- PHP Version: 5.6.36

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vbp_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `activities`
--

CREATE TABLE `activities` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `userid` int(11) NOT NULL,
  `company` int(11) NOT NULL,
  `role` int(11) NOT NULL,
  `kpi` int(11) NOT NULL,
  `procedures` text NOT NULL,
  `video` varchar(225) NOT NULL,
  `modified` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activities`
--

INSERT INTO `activities` (`id`, `title`, `userid`, `company`, `role`, `kpi`, `procedures`, `video`, `modified`, `created`) VALUES
(1, 'dfg', 911, 4, 4, 4, 'dfg', 'd', '2018-08-29 00:00:00', '2018-08-29 07:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `abbreviation` varchar(500) NOT NULL,
  `website` varchar(500) NOT NULL,
  `profile` text NOT NULL,
  `unit_no` varchar(225) NOT NULL,
  `street_name` varchar(500) NOT NULL,
  `street_type` int(11) NOT NULL,
  `state` varchar(500) NOT NULL,
  `passcode` int(11) NOT NULL,
  `admin_firstname` varchar(500) NOT NULL,
  `admin_lastname` varchar(500) NOT NULL,
  `admin_email` varchar(500) NOT NULL,
  `admin_timezone` varchar(11) NOT NULL,
  `admin_mobile` int(11) NOT NULL,
  `admin_department` int(11) NOT NULL,
  `logo` text NOT NULL,
  `modified` datetime NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `userid`, `name`, `abbreviation`, `website`, `profile`, `unit_no`, `street_name`, `street_type`, `state`, `passcode`, `admin_firstname`, `admin_lastname`, `admin_email`, `admin_timezone`, `admin_mobile`, `admin_department`, `logo`, `modified`, `created`) VALUES
(1, 0, 'Companyname', 'CompanyAbrreviation', 'Companywebsite', '', '', '', 0, '', 0, 'Alvin', 'Ado', 'company@test.com', '', 12345, 0, '', '2018-09-04 03:06:10', '2018-09-04 03:06:10'),
(2, 0, 'Sawyer', '', '', '', '', '', 0, '', 0, 'Gannon', 'Miranda', 'Althea', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(3, 0, 'Vladimir', '', '', '', '', '', 0, '', 0, 'Elton', 'Martina', 'Grant', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(4, 0, 'Norman', '', '', '', '', '', 0, '', 0, 'Tyrone', 'Jana', 'Rae', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(5, 0, 'Armando', '', '', '', '', '', 0, '', 0, 'Axel', 'Larissa', 'Leo', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(6, 0, 'Howard', '', '', '', '', '', 0, '', 0, 'Chandler', 'Carissa', 'Camilla', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(7, 0, 'Dolan', '', '', '', '', '', 0, '', 0, 'Michael', 'Freya', 'Katell', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(8, 0, 'Caleb', '', '', '', '', '', 0, '', 0, 'Kyle', 'Carissa', 'Ivana', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(9, 0, 'Xenos', '', '', '', '', '', 0, '', 0, 'Vernon', 'Amethyst', 'Isadora', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(10, 0, 'Fulton', '', '', '', '', '', 0, '', 0, 'Wing', 'Juliet', 'Gray', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(11, 0, 'Tiger', '', '', '', '', '', 0, '', 0, 'Shad', 'Ivana', 'Hall', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(12, 0, 'Omar', '', '', '', '', '', 0, '', 0, 'Colton', 'Katelyn', 'Carter', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(13, 0, 'Lee', '', '', '', '', '', 0, '', 0, 'Forrest', 'Isadora', 'Ann', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(14, 0, 'Garth', '', '', '', '', '', 0, '', 0, 'Rafael', 'Rhiannon', 'Emi', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(15, 0, 'Fulton', '', '', '', '', '', 0, '', 0, 'Owen', 'Jolene', 'Anika', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(16, 0, 'Silas', '', '', '', '', '', 0, '', 0, 'Ulysses', 'Stella', 'Bruce', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(17, 0, 'Wyatt', '', '', '', '', '', 0, '', 0, 'Wade', 'Reagan', 'Harrison', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(18, 0, 'Steel', '', '', '', '', '', 0, '', 0, 'Brennan', 'Uma', 'Galena', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(19, 0, 'Dalton', '', '', '', '', '', 0, '', 0, 'Keefe', 'Brynne', 'Plato', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(20, 0, 'Theodore', '', '', '', '', '', 0, '', 0, 'Kennedy', 'Karly', 'Willow', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(21, 0, 'Tarik', '', '', '', '', '', 0, '', 0, 'Hamish', 'Cecilia', 'Carlos', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(22, 0, 'Deacon', '', '', '', '', '', 0, '', 0, 'Hiram', 'Evangeline', 'Xander', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(23, 0, 'Russell', '', '', '', '', '', 0, '', 0, 'Hyatt', 'Scarlet', 'Brady', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(24, 0, 'Oscar', '', '', '', '', '', 0, '', 0, 'Matthew', 'Denise', 'Brent', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(25, 0, 'Graiden', '', '', '', '', '', 0, '', 0, 'Amery', 'Beverly', 'Yen', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(26, 0, 'Reuben', '', '', '', '', '', 0, '', 0, 'Burke', 'Brianna', 'Noble', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(27, 0, 'Brenden', '', '', '', '', '', 0, '', 0, 'Ignatius', 'Reagan', 'Dora', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(28, 0, 'John', '', '', '', '', '', 0, '', 0, 'Flynn', 'Winter', 'Oscar', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(29, 0, 'Stuart', '', '', '', '', '', 0, '', 0, 'Harlan', 'Imelda', 'Montana', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(30, 0, 'Eagan', '', '', '', '', '', 0, '', 0, 'Brennan', 'Shelby', 'Callum', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(31, 0, 'Quentin', '', '', '', '', '', 0, '', 0, 'Zephania', 'Jorden', 'Ross', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(32, 0, 'Uriel', '', '', '', '', '', 0, '', 0, 'Nissim', 'TaShya', 'Jael', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(33, 0, 'Griffith', '', '', '', '', '', 0, '', 0, 'Mark', 'Zenia', 'Patricia', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(34, 0, 'Trevor', '', '', '', '', '', 0, '', 0, 'Gannon', 'Ainsley', 'Gary', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(35, 0, 'Kaseem', '', '', '', '', '', 0, '', 0, 'Wyatt', 'Macy', 'Lev', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(36, 0, 'Eric', '', '', '', '', '', 0, '', 0, 'Oleg', 'Amity', 'Herman', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(37, 0, 'Elijah', '', '', '', '', '', 0, '', 0, 'Dorian', 'Evangeline', 'Amanda', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(38, 0, 'Colin', '', '', '', '', '', 0, '', 0, 'Nolan', 'Kiona', 'Nevada', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(39, 0, 'Ignatius', '', '', '', '', '', 0, '', 0, 'Dale', 'Mollie', 'Tad', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(40, 0, 'Caesar', '', '', '', '', '', 0, '', 0, 'Herrod', 'Zorita', 'Rina', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(41, 0, 'Thane', '', '', '', '', '', 0, '', 0, 'Isaiah', 'Emerald', 'Alden', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(42, 0, 'Aristotle', '', '', '', '', '', 0, '', 0, 'Colt', 'Signe', 'Venus', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(43, 0, 'Myles', '', '', '', '', '', 0, '', 0, 'Vincent', 'Nora', 'Martin', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(44, 0, 'Timon', '', '', '', '', '', 0, '', 0, 'Wesley', 'Ainsley', 'Holly', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(45, 0, 'Isaac', '', '', '', '', '', 0, '', 0, 'Chadwick', 'Sonya', 'Ethan', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(46, 0, 'Chaney', '', '', '', '', '', 0, '', 0, 'Aristotle', 'Hanna', 'Baxter', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(47, 0, 'Alexander', '', '', '', '', '', 0, '', 0, 'Yuli', 'Aileen', 'Cooper', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(48, 0, 'Randall', '', '', '', '', '', 0, '', 0, 'Acton', 'Brianna', 'Eric', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(49, 0, 'Stewart', '', '', '', '', '', 0, '', 0, 'Edan', 'Kaitlin', 'Gray', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(50, 0, 'Levi', '', '', '', '', '', 0, '', 0, 'Boris', 'Leila', 'Hayden', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(51, 0, 'Cyrus', '', '', '', '', '', 0, '', 0, 'Dean', 'Nell', 'Neville', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(52, 0, 'Macaulay', '', '', '', '', '', 0, '', 0, 'Chaney', 'Xyla', 'Jerry', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(53, 0, 'Cyrus', '', '', '', '', '', 0, '', 0, 'Raphael', 'Lillith', 'Arthur', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(54, 0, 'Castor', '', '', '', '', '', 0, '', 0, 'Ahmed', 'Alfreda', 'Julian', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(55, 0, 'Dexter', '', '', '', '', '', 0, '', 0, 'Dieter', 'Tana', 'Minerva', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(56, 0, 'Edan', '', '', '', '', '', 0, '', 0, 'Tobias', 'Giselle', 'Naomi', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(57, 0, 'Ulysses', '', '', '', '', '', 0, '', 0, 'Igor', 'Aubrey', 'Dana', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(58, 0, 'Lewis', '', '', '', '', '', 0, '', 0, 'Victor', 'Maggy', 'Mona', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(59, 0, 'Moses', '', '', '', '', '', 0, '', 0, 'Martin', 'Jamalia', 'Fulton', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(60, 0, 'Garrett', '', '', '', '', '', 0, '', 0, 'Henry', 'Bree', 'Casey', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(61, 0, 'Aladdin', '', '', '', '', '', 0, '', 0, 'Hilel', 'Lavinia', 'Nissim', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(62, 0, 'Fitzgerald', '', '', '', '', '', 0, '', 0, 'Buckminster', 'Kelly', 'Idola', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(63, 0, 'Jacob', '', '', '', '', '', 0, '', 0, 'Dalton', 'Kaye', 'Plato', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(64, 0, 'Lane', '', '', '', '', '', 0, '', 0, 'Hasad', 'Fatima', 'Ali', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(65, 0, 'Oliver', '', '', '', '', '', 0, '', 0, 'Ali', 'Wyoming', 'Erica', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(66, 0, 'Darius', '', '', '', '', '', 0, '', 0, 'Vladimir', 'Hayfa', 'Jamal', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(67, 0, 'Fritz', '', '', '', '', '', 0, '', 0, 'Colby', 'Idona', 'Portia', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(68, 0, 'Reece', '', '', '', '', '', 0, '', 0, 'Leonard', 'Tana', 'Harding', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(69, 0, 'Drew', '', '', '', '', '', 0, '', 0, 'Barrett', 'Guinevere', 'Cade', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(70, 0, 'Bert', '', '', '', '', '', 0, '', 0, 'Nash', 'Venus', 'Ryder', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(71, 0, 'Cruz', '', '', '', '', '', 0, '', 0, 'Reed', 'Veronica', 'Zelda', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(72, 0, 'Austin', '', '', '', '', '', 0, '', 0, 'Dieter', 'Joy', 'Randall', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(73, 0, 'Ezra', '', '', '', '', '', 0, '', 0, 'Harlan', 'Lynn', 'Ferris', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(74, 0, 'Abbot', '', '', '', '', '', 0, '', 0, 'Hector', 'Deirdre', 'Howard', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(75, 0, 'Thane', '', '', '', '', '', 0, '', 0, 'Orlando', 'Mara', 'Autumn', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(76, 0, 'Elmo', '', '', '', '', '', 0, '', 0, 'Jacob', 'Kellie', 'Boris', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(77, 0, 'Aaron', '', '', '', '', '', 0, '', 0, 'Abdul', 'Candice', 'TaShya', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(78, 0, 'Julian', '', '', '', '', '', 0, '', 0, 'Omar', 'Xena', 'Solomon', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(79, 0, 'Dalton', '', '', '', '', '', 0, '', 0, 'Matthew', 'Ramona', 'Cheryl', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(80, 0, 'Daquan', '', '', '', '', '', 0, '', 0, 'Declan', 'Hadley', 'Rhoda', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(81, 0, 'Dominic', '', '', '', '', '', 0, '', 0, 'Nehru', 'Petra', 'Zenaida', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(82, 0, 'Ishmael', '', '', '', '', '', 0, '', 0, 'Xavier', 'Desirae', 'Nigel', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(83, 0, 'Jonah', '', '', '', '', '', 0, '', 0, 'Davis', 'Sybill', 'Lani', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(84, 0, 'William', '', '', '', '', '', 0, '', 0, 'Chadwick', 'Mary', 'Danielle', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(85, 0, 'Phelan', '', '', '', '', '', 0, '', 0, 'Forrest', 'Ursa', 'Galvin', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(86, 0, 'Lucius', '', '', '', '', '', 0, '', 0, 'Roth', 'Anne', 'Tanya', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(87, 0, 'Conan', '', '', '', '', '', 0, '', 0, 'Abdul', 'Jennifer', 'Nichole', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(88, 0, 'Akeem', '', '', '', '', '', 0, '', 0, 'Holmes', 'Tatiana', 'Abdul', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(89, 0, 'Duncan', '', '', '', '', '', 0, '', 0, 'Perry', 'Alfreda', 'Charlotte', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(90, 0, 'George', '', '', '', '', '', 0, '', 0, 'Gil', 'Morgan', 'Barrett', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(91, 0, 'Griffith', '', '', '', '', '', 0, '', 0, 'Craig', 'Lunea', 'Avye', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(92, 0, 'Tyrone', '', '', '', '', '', 0, '', 0, 'Marshall', 'Jorden', 'Maryam', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(93, 0, 'Yoshio', '', '', '', '', '', 0, '', 0, 'Xander', 'Sierra', 'Ariel', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(94, 0, 'Felix', '', '', '', '', '', 0, '', 0, 'Giacomo', 'Quon', 'Chaim', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(95, 0, 'Luke', '', '', '', '', '', 0, '', 0, 'Baker', 'Stacey', 'Sara', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(96, 0, 'Todd', '', '', '', '', '', 0, '', 0, 'Ivan', 'Larissa', 'Garrison', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(97, 0, 'Holmes', '', '', '', '', '', 0, '', 0, 'Phillip', 'MacKenzie', 'Buckminster', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(98, 0, 'Jermaine', '', '', '', '', '', 0, '', 0, 'Rafael', 'Melyssa', 'Tarik', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(99, 0, 'Travis', '', '', '', '', '', 0, '', 0, 'Jeremy', 'Barbara', 'Joseph', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(100, 0, 'Wyatt', '', '', '', '', '', 0, '', 0, 'Jerome', 'Rebecca', 'Briar', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(101, 0, 'Gavin', '', '', '', '', '', 0, '', 0, 'Dominic', 'Cora', 'Hadley', '', 2147483647, 0, '', '0000-00-00 00:00:00', '2018-09-04 03:55:55'),
(102, 0, 'ddddd', 'ddd', 'ddddd', '', '', '', 0, '', 0, 'sd', 'dsfd', 'tes', '', 32, 0, '', '2018-09-04 04:25:07', '2018-09-04 04:25:07'),
(103, 0, 'test', 'test', 'test', '', '', '', 0, '', 0, 'test', 'test', 'test', '', 23234324, 0, '', '2018-09-04 05:27:18', '2018-09-04 05:27:18'),
(104, 0, 'test', 'test', 'test', '', '', '', 0, '', 0, 'test', 'test', 'test', '', 45435, 0, '', '2018-09-04 05:30:05', '2018-09-04 05:30:05'),
(105, 0, 'test', 'test', 'test', '', '', '', 0, '', 0, 'test', 'test', 'testt', '', 323423, 0, '', '2018-09-04 05:30:23', '2018-09-04 05:30:23'),
(106, 0, 'test', 'test', 'test', '', '', '', 0, '', 0, 'test', 'test', 'test', '', 44344344, 0, '', '2018-09-04 05:32:14', '2018-09-04 05:32:14');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `name` varchar(225) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `name`, `created`) VALUES
(1, 'Administrator', '2018-08-06 01:42:56'),
(4, 'User\r\n', '2018-08-06 01:43:54');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(225) NOT NULL,
  `firstname` varchar(225) NOT NULL,
  `lastname` varchar(225) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` int(11) NOT NULL,
  `role` varchar(100) NOT NULL,
  `company` int(11) NOT NULL,
  `photo` varchar(225) NOT NULL,
  `type` varchar(80) NOT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `firstname`, `lastname`, `email`, `password`, `phone`, `role`, `company`, `photo`, `type`, `created`, `modified`) VALUES
(1, 'Admin Name', 'Admin', 'Name', 'admin1@test.com', '$2y$10$gbZiE/L3DAri2w.ZgbFdsOY6K.iNyI/frdnXs7Gx3OhzTthbzFw5m', 1223, '1', 0, '', '', '2018-07-03 23:59:38', '2018-07-03 23:59:38'),
(2, 'Admin Name', 'Admin2', 'Name', 'testme@test.com', '$2y$10$gbZiE/L3DAri2w.ZgbFdsOY6K.iNyI/frdnXs7Gx3OhzTthbzFw5m', 123, '1', 0, '', '', '2018-07-04 01:32:30', '2018-07-04 01:32:30'),
(907, '', 'dddddddd', '', '', '', 0, '', 0, '', '', '2018-08-17 07:22:41', '2018-08-17 07:22:41'),
(908, '', 'test', '', '', '', 0, '', 0, '', '', '2018-08-17 07:27:50', '2018-08-17 07:27:50'),
(909, '', 'Neil ', '', '', '', 0, '', 0, '', '', '2018-08-17 07:34:26', '2018-08-17 07:34:26'),
(910, '', 'Neil', 'Rances', '', '', 0, '', 0, '', '', '2018-08-17 07:36:37', '2018-08-17 07:36:37'),
(911, '', 'sdf', 'sdfds', 'sdfsdsdsdsdf@gmail.com', '', 545454, '', 0, '', '', '2018-08-17 07:53:33', '2018-08-17 07:53:33'),
(912, '', 'dd', 'Rances', 'dfsdf@gmail.com', '', 234342, '', 0, '', '', '2018-08-17 07:56:11', '2018-08-17 07:56:11'),
(913, '', 'ddddd', 'dddd', 'ddd@how.com', '', 2323, '', 0, '', '', '2018-08-17 07:57:31', '2018-08-17 07:57:31'),
(914, '', 'test', 'sdfds', 'dfsdf@gmaddil.comdd', '', 22222, '', 0, '', '', '2018-08-17 08:23:45', '2018-08-17 08:23:45'),
(915, '', 'dddddddd', 'ddddddd', 'dfsdf33@gmail.com', '', 234342, '', 0, '', '', '2018-08-17 08:35:48', '2018-08-17 08:35:48'),
(916, '', 'test', 'sdfds', 'dfsdfddd@gmail.com', '', 234342, '', 0, '', '', '2018-08-17 08:56:27', '2018-08-17 08:56:27'),
(917, '', 'test', 'Rances', 'dfstestdf@gmail.com', '', 234342, '', 0, '', '', '2018-08-17 08:57:42', '2018-08-17 08:57:42'),
(918, '', 'ddddd', 'dddd', 'ddddfsdf@gmail.comdd', '', 234342, '', 0, '', '', '2018-08-17 09:04:02', '2018-08-17 09:04:02'),
(919, '', 'test', 'test', 'fghf@gmail.com', '', 234342, '', 0, '', '', '2018-08-20 03:23:10', '2018-08-20 03:23:10'),
(920, '', 'Ezekiel', '', '', '', 0, '', 0, '', '', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activities`
--
ALTER TABLE `activities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role` (`role`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activities`
--
ALTER TABLE `activities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=921;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activities`
--
ALTER TABLE `activities`
  ADD CONSTRAINT `activities_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
