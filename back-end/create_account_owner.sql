DROP DATABASE IF EXISTS `account_owners`;

CREATE DATABASE  IF NOT EXISTS `account_owners`;
USE `account_owners`;

DROP TABLE IF EXISTS `account_owners`;
CREATE TABLE `account_owners` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `birth_date` date NOT NULL,
  `email` varchar(45) NOT NULL UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
