USE `sitedb` ;

INSERT INTO location(name,longitude,latitude) VALUES('4000 Central Florida Blvd, Orlando, FL 32816', 28.6024274, -81.200081);
INSERT INTO location(name,longitude,latitude) VALUES('Gainesville, FL 32611', 29.644012,  -82.354932);

INSERT INTO university(name, numStudents, location_locationID) VALUES('University of Central Florida', 64318, 1);
INSERT INTO university(name, numStudents, location_locationID) VALUES('University of Florida', 52286, 2);

INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('tuan@ucf.edu', 'asdf', 'Student', 1, 'Tuan', 'Pham');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('kyle@ucf.edu', 'password', 'Student', 1, 'Kyle', 'Jones');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('john@ucf.edu', 'idksomething', 'Student', 1, 'John', 'Deere');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('maxi@ucf.edu', 'secure', 'Student', 1, 'Maxi', 'Faxi');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('lexi@ucf.edu', 'autogen', 'Student', 1, 'Lexi', 'Steele');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('aden@ucf.edu', 'randy', 'Student', 1, 'Aden', 'Nguyen');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('jake@ucf.edu', 'LIVE', 'Student', 1, 'Jake', 'Statefarm');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('jack@ucf.edu', 'rawr', 'Student', 1, 'Jack', 'Bauer');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('luke@ucf.edu', 'alphonse', 'Student', 1, 'Luke', 'Cage');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('erin@ucf.edu', 'okay', 'Student', 1, 'Erin', 'Cage');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('addeline@ucf.edu', 'lerandom', 'Student', 1, 'Addeline', 'Zeus');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('Ziek@uf.edu', 'lelalela', 'Student', 2, 'Ziek', 'Geek');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('doof@uf.edu', 'maloof', 'Student', 2, 'Doof', 'Moof');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('garrus@uf.edu', 'areuserious', 'Student', 2, 'Garrus', 'Alterian');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('vera@uf.edu', 'blaze', 'Student', 2, 'Vera', 'Wang');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('lucille@uf.edu', 'nonon', 'Student', 2, 'Lucille', 'Ball');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('soren@uf.edu', 'ayeeayee', 'Student', 2, 'Soren', 'Pham');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('alfie@uf.edu', 'alpharetta', 'Student', 2, 'Alfie', 'Pham');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('rena@uf.edu', 'NOOOO', 'Student', 2, 'Rena', 'Le');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('dylan@uf.edu', 'reasdfjkl', 'Student', 2, 'Dylan', 'Johns');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('harley@uf.edu', 'Xjied8X', 'Student', 2, 'Harley', 'Johns');

INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('admin@ucf.edu', 'asdf', 'Admin', 1, 'Regular', 'Admin');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('aiden@ucf.edu', 'asdf', 'Admin', 1, 'Aiden', 'Jayden');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('kicker@uf.edu', 'asdf', 'Admin', 2, 'Kicker', 'McLicker');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('super@ucf.edu', 'asdf', 'Super Admin', 1, 'Super', 'Admin');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('duper@ucf.edu', 'asdf', 'Super Admin', 2, 'Duper', 'Admin');

INSERT INTO rso(name, university_universityID, user_adminID,active) VALUES ('Kickboxing Club', 1,22,'active');
INSERT INTO rso(name, university_universityID, user_adminID,active) VALUES ('Witchcraft and Wizardry Club', 1,23,'inactive');
INSERT INTO rso(name, university_universityID, user_adminID,active) VALUES ('Book Club', 2,24,'active');

INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Fight Club 2017', '2017-10-12 12:00:00', '4078008000', 'admin@ucf.edu', 'Athletic','Public', 1, 1);
INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Quidditch Tournament', '2017-11-12 12:00:00', '8004119871', 'aiden@ucf.edu', 'Athletic','Private', 1, 2);
INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Game of Thrones Discussion', '2017-12-12 12:00:00', '8080808080', 'kicker@uf.edu', 'Social','RSO Only', 2, 3);
INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Injury Prevention Discussion', '2017-12-12 12:00:00', '4078008000', 'admin@ucf.edu', 'Social','Private', 1, 1);
INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Member Recruiting Drive', '2017-12-10 12:00:00', '8004119871', 'aiden@ucf.edu', 'Social','Public', 1, 2);

INSERT INTO comment(content, user_userID, event_eventID) VALUES('THIS IS AWESOME!!!', 1, 1);
INSERT INTO comment(content, user_userID, event_eventID) VALUES('Can not wait.', 2, 1);
INSERT INTO comment(content, user_userID, event_eventID) VALUES('This event seems a little violent', 3, 1);
INSERT INTO comment(content, user_userID, event_eventID) VALUES('QUIDDITCH!!!', 8, 2);

INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(1,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(2,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(3,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(4,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(5,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(6,2);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(7,2);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(8,2);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(13,3);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(14,3);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(15,3);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(16,3);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(17,3);


