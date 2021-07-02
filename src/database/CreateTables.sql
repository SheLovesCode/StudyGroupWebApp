---Create Tables
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id int identity NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
   -- firstName varchar(255) NOT NULL,
   -- lastName varchar(255) NOT NULL,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
	address varchar(255) NOT NULL,
    PRIMARY KEY(username)
);

DROP TABLE IF EXISTS Groups;

CREATE TABLE Groups (
    id int identity NOT NULL,
    groupcreator varchar(255) NOT NULL UNIQUE,
    groupname varchar(255) NOT NULL UNIQUE,
    grouprating int NOT NULL,
    PRIMARY KEY(id)
);

DROP TABLE IF EXISTS ChatsMessage;

CREATE TABLE ChatsMessage (
    messageid int identity NOT NULL,
    username varchar(255) NOT NULL UNIQUE,
    time varchar(255) NOT NULL UNIQUE,
    groupname varchar(255) NOT NULL UNIQUE,
	message varchar(255) NOT NULL UNIQUE,
    PRIMARY KEY(messageid)
);

DROP TABLE IF EXISTS GroupMembership;

CREATE TABLE GroupMembership (
    id int identity NOT NULL,
    groupname varchar(255) NOT NULL,
    member varchar(255) NOT NULL,
    memberrating varchar(255) NULL,
    PRIMARY KEY(id)
);
