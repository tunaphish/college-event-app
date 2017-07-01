-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema sitedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema sitedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `sitedb` DEFAULT CHARACTER SET utf8 ;
USE `sitedb` ;

-- -----------------------------------------------------
-- Table `sitedb`.`location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`location` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`location` (
  `locationID` INT NOT NULL,
  `longitude` DECIMAL(10,6) NULL,
  `latitude` DECIMAL(10,6) NULL,
  PRIMARY KEY (`locationID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`university`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`university` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`university` (
  `universityID` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `numStudents` INT NULL,
  `picture` BINARY(255) NULL,
  `location_locationID` INT NOT NULL,
  PRIMARY KEY (`universityID`, `location_locationID`),
  INDEX `fk_university_location1_idx` (`location_locationID` ASC),
  CONSTRAINT `fk_university_location1`
    FOREIGN KEY (`location_locationID`)
    REFERENCES `sitedb`.`location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`user` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`user` (
  `userID` INT NOT NULL,
  `emailAddress` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  `university_universityID` INT NOT NULL,
  PRIMARY KEY (`userID`, `university_universityID`),
  INDEX `fk_user_university1_idx` (`university_universityID` ASC),
  CONSTRAINT `fk_user_university1`
    FOREIGN KEY (`university_universityID`)
    REFERENCES `sitedb`.`university` (`universityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`RSO`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`RSO` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`RSO` (
  `rsoID` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `active` TINYINT NULL,
  `university_universityID` INT NOT NULL,
  `user_adminID` INT NOT NULL,
  PRIMARY KEY (`rsoID`, `university_universityID`, `user_adminID`),
  INDEX `fk_RSO_university1_idx` (`university_universityID` ASC),
  INDEX `fk_RSO_user1_idx` (`user_adminID` ASC),
  CONSTRAINT `fk_RSO_university1`
    FOREIGN KEY (`university_universityID`)
    REFERENCES `sitedb`.`university` (`universityID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RSO_user1`
    FOREIGN KEY (`user_adminID`)
    REFERENCES `sitedb`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`event` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`event` (
  `eventID` INT NOT NULL,
  `name` VARCHAR(255) NULL,
  `startDate` DATETIME NULL,
  `endDate` DATETIME NULL,
  `locationID` INT NULL,
  `contactPhone` VARCHAR(10) NULL,
  `contactEmail` VARCHAR(255) NULL,
  `type` VARCHAR(255) NULL,
  `scope` VARCHAR(255) NULL,
  `location_locationID` INT NOT NULL,
  `user_userID` INT NOT NULL,
  PRIMARY KEY (`eventID`, `location_locationID`, `user_userID`),
  INDEX `fk_event_location1_idx` (`location_locationID` ASC),
  INDEX `fk_event_user1_idx` (`user_userID` ASC),
  CONSTRAINT `fk_event_location1`
    FOREIGN KEY (`location_locationID`)
    REFERENCES `sitedb`.`location` (`locationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_user1`
    FOREIGN KEY (`user_userID`)
    REFERENCES `sitedb`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`comment`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`comment` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`comment` (
  `commentID` INT NOT NULL,
  `content` VARCHAR(255) NULL,
  `user_userID` INT NOT NULL,
  `event_eventID` INT NOT NULL,
  PRIMARY KEY (`commentID`, `user_userID`, `event_eventID`),
  INDEX `fk_comment_user1_idx` (`user_userID` ASC),
  INDEX `fk_comment_event1_idx` (`event_eventID` ASC),
  CONSTRAINT `fk_comment_user1`
    FOREIGN KEY (`user_userID`)
    REFERENCES `sitedb`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_event1`
    FOREIGN KEY (`event_eventID`)
    REFERENCES `sitedb`.`event` (`eventID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `sitedb`.`students_rso`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `sitedb`.`students_rso` ;

CREATE TABLE IF NOT EXISTS `sitedb`.`students_rso` (
  `user_userID` INT NOT NULL,
  `RSO_rsoID` INT NOT NULL,
  PRIMARY KEY (`user_userID`, `RSO_rsoID`),
  INDEX `fk_students_rso_RSO1_idx` (`RSO_rsoID` ASC),
  CONSTRAINT `fk_students_rso_user1`
    FOREIGN KEY (`user_userID`)
    REFERENCES `sitedb`.`user` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_students_rso_RSO1`
    FOREIGN KEY (`RSO_rsoID`)
    REFERENCES `sitedb`.`RSO` (`rsoID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
