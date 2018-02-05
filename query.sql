create database workshop;
\c workshop;

create role webuser with login;

create table workshop_table (
	id serial,
	attendee text,
	workshop text,
	primary key(id));

grant select, insert on workshop_table to webuser;

grant usage,select on  SEQUENCE workshop_table_id_seq to webuser;

alter user webuser with password 'i2E1CUXs';


insert into workshop_table (attendee,workshop) values ('Bruce Morrow', 'PostgreSQL'),
	('Willard Sears','MySQL'), 
	('Leona Wilcox', 'Node JS'),
	('Joy Lamb', 'React Fundamentals'),
	('Don Adkins','React Fundamentals'),
	('Kevin Ellis','MySQL'),
	('Thomas Powers', 'Node JS' );