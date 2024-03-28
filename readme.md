This website is form hospital management and its runs on local machine (localhost:5500) or pc.
it uses js,css,html and sql knowledge to build it.


run following commands on sql workbench to make tables used in this project:(use 'hospital' as a database name)



1---> for creating user table which contains info about employees

create table usertype(
    id varchar(12) primary key,
    username varchar(20),
    name varchar(20),
    age numeric(3),
    gender char(1),
    address varchar(50),
    email varchar(30),
    usertype varchar(20),
    phoneno numeric(10) unique,
    password varchar(20)
);



2--->create doctor table

create table doctor(
    docid varchar(20),
    cabino integer(3) not null,
    speciality varchar(25)
);




3--->create admitted table

CREATE TABLE admitted (
  pid int NOT NULL,
  roomno int NOT NULL
);



4--->create appointment table

CREATE TABLE appointment (
  pid int NOT NULL,
  did varchar(20) NOT NULL,
  date date NOT NULL,
  status varchar(1) DEFAULT '0',
  PRIMARY KEY (pid,did,date)
) 



5--->create  patient table whith id of patient taken as patient

CREATE TABLE patient (
  patient int NOT NULL AUTO_INCREMENT,
  name varchar(20) not null,
  age int NOT NULL,
  sex char(1) NOT NULL,
  phone int NOT NULL
) 


6---> create pharmacy table


CREATE TABLE pharmacy(
  medname varchar(20) DEFAULT NULL,
  quantity int DEFAULT NULL,
  med_id int NOT NULL primary key AUTO_INCREMENT,
  price int NOT NULL
) 

7--->create rooms table 

CREATE TABLE room (
  roomno int NOT NULL primary key,
  available_beds int default 0,
  roomtype varchar(20) NOT NULL
) 


--->adding foreign keys

alter table admitted add foreign key roomno references room(roomno);

alter table admitted add foreign key pid references patient(patient);

alter table doctor add foreign key docid references usertype(id) on delete cascade;

alter table appointment add foreign key(did) references doctor(docid);

alter table appointment add foreign key(pid) references patient(patient);











