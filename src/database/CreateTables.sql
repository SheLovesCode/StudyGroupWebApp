---Create Tables

DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
    id STRING NOT NULL UNIQUE,
    name varchar(255) NOT NULL UNIQUE,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    PRIMARY KEY (id)
);