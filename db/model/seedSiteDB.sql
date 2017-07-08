USE `sitedb` ;

INSERT INTO location(name,longitude,latitude) VALUES('4000 Central Florida Blvd, Orlando, FL 32816', 28.6024274, -81.200081);
INSERT INTO location(name,longitude,latitude) VALUES('Gainesville, FL 32611', 29.644012,  -82.354932);

INSERT INTO university(name, numStudents, location_locationID) VALUES('University of Central Florida', 64318, 1);
INSERT INTO university(name, numStudents, location_locationID) VALUES('University of Florida', 52286, 1);

INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('tuan@ucf.edu', 'asdf', 'Student', 1, 'Tuan', 'Pham');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('admin@ucf.edu', 'asdf', 'Admin', 1, 'Regular', 'Admin');
INSERT INTO user(emailAddress, password, type, university_universityID, firstname, lastname) VALUES ('super@ucf.edu', 'asdf', 'Super Admin', 1, 'Super', 'Admin');

INSERT INTO rso(name, university_universityID, user_adminID) VALUES ('Kickboxing Club', 1,2);

INSERT INTO event(name, date, contactPhone, contactEmail, type, scope, location_locationID, RSO_rsoID) 
VALUES ('Fight Club 2017', '2017-12-12 12:00:00', '4078008000', 'admin@ucf.edu', 'Athletic','Public', 1, 1);

INSERT INTO comment(content, user_userID, event_eventID,name) VALUES('THIS IS AWESOME!!!', 1, 1, 'Tuan Pham');
INSERT INTO comment(content, user_userID, event_eventID,name) VALUES('Can not wait.', 2, 1, 'Regular Admin');
INSERT INTO comment(content, user_userID, event_eventID,name) VALUES('This event seems a little violent', 3, 1,'Super Admin');

INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(1,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(2,1);
INSERT INTO students_rso(user_userID, RSO_rsoID) VALUES(3,1);

