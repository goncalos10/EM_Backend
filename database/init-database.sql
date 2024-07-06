CREATE TABLE "user" (
  userid   SERIAL NOT NULL, 
  name     varchar(60) NOT NULL, 
  email    varchar(100) NOT NULL, 
  password varchar(255) NOT NULL, 
  address  varchar(125) NOT NULL, 
  city     varchar(70) NOT NULL, 
  roleid   int4 NOT NULL, 
  PRIMARY KEY (userid));

CREATE TABLE funeraria (
  funerariaid SERIAL NOT NULL, 
  name        varchar(60) NOT NULL, 
  email       varchar(100) NOT NULL UNIQUE, 
  address     varchar(125) NOT NULL, 
  postalcode  varchar(15) NOT NULL, 
  city        varchar(70) NOT NULL, 
  mobilephone varchar(30) NOT NULL, 
  phone       varchar(15) NOT NULL, 
  userid      int4 NOT NULL,
  deleted     bool DEFAULT false,
  PRIMARY KEY (funerariaid));

CREATE TABLE obito (
  obitoid     SERIAL NOT NULL, 
  funerariaid int2 NOT NULL, 
  name        varchar(75) NOT NULL, 
  freguesia   varchar(50) NOT NULL, 
  diafuneral  date NOT NULL, 
  horafuneral time(7) NOT NULL, 
  diamissa    date NOT NULL, 
  horamissa   time(7) NOT NULL,
  igrejaid    int4 NOT NULL,
  capelaid    int4 NOT NULL,
  url         varchar(100) NOT NULL,
  photo       varchar(100) DEFAULT NULL, 
  PRIMARY KEY (obitoid));

CREATE TABLE local (
  localid SERIAL NOT NULL, 
  name    varchar(75) NOT NULL, 
  address varchar(75) NOT NULL, 
  city    varchar(75) NOT NULL, 
  tipo    int2 NOT NULL,
  deleted bool DEFAULT false,
  PRIMARY KEY (localid));

CREATE TABLE obitolocal (
  obitoid int4 NOT NULL, 
  localid int4 NOT NULL, 
  PRIMARY KEY (obitoid, 
  localid));

CREATE TABLE comment (
  commentid SERIAL NOT NULL, 
  userid       int4 NOT NULL, 
  obitoid      int4 NOT NULL, 
  commenttext  varchar(150) NOT NULL, 
  PRIMARY KEY (commentid));

CREATE TABLE lembranca (
  userid  int4 NOT NULL, 
  obitoid int4 NOT NULL, 
  PRIMARY KEY (userid, 
  obitoid));

ALTER TABLE funeraria ADD CONSTRAINT FKFuneraria157253 FOREIGN KEY (userid) REFERENCES "user" (userid);
ALTER TABLE obito ADD CONSTRAINT FKObito32372 FOREIGN KEY (funerariaid) REFERENCES funeraria (funerariaid);
ALTER TABLE obitolocal ADD CONSTRAINT FKObitoLocal691556 FOREIGN KEY (obitoid) REFERENCES obito (obitoid);
ALTER TABLE obitolocal ADD CONSTRAINT FKObitoLocal998434 FOREIGN KEY (localid) REFERENCES "local" (localid);
ALTER TABLE lembranca ADD CONSTRAINT FKLembranca225433 FOREIGN KEY (userid) REFERENCES "user" (userid);
ALTER TABLE lembranca ADD CONSTRAINT FKLembranca912248 FOREIGN KEY (obitoid) REFERENCES obito (obitoid);
ALTER TABLE comment ADD CONSTRAINT FKComentario206127 FOREIGN KEY (userid) REFERENCES "user" (userid);
ALTER TABLE comment ADD CONSTRAINT FKComentario931554 FOREIGN KEY (obitoid) REFERENCES obito (obitoid);
