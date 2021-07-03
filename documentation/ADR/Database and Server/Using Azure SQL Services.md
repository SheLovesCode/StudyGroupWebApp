# 1. Using Azure SQL services

Date: 2021-06-16

## Status

Accepted 

## Context

In order to store the data once the application is deploy on production online the web application cloud storage services are needed. Azure provides student package that permit the use of an Azure SQL Server and Database for web applications.

## Decision

The group will use Azure SQL Server and Databases:
* It will be configure with the groups github repository details.
* It uses MSSQL which is a language the group is comfortable using.
* Environment variables must be used for any identification purposes.
* It is free of charge for students.

Elijah (kadel08): *Azure Technician* (Person in charge of anything related to Azure)


## Consequences

Members are able to create tables and store data into the respective tables. Services are sufficient, with a databse with more than enough memory for the teams use of it in the creation of the web application. Group can perform coding in a persistent manner. 