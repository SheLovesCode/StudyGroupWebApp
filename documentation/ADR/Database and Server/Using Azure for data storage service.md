# 1. Using Azure as a server and for data storage

Date: 2021-06-16

## Status

Accepted 

## Context

In order to automate the production services of the web application and to integrate CI/CD to the project,
Travis-CI will be used.

## Decision

Travis will be used for CI/CD as well as Test coverage.
* It will be set at 3 stages, the push from a members local branch, the pull request and the merge into the main branch.
* Environment variables must be used for any identification purposes.
* Travis will only deploy for the main branch.

Elijah (kadel08): *Travis Technician* (Person in charge of Travis)


## Consequences

Members will be able to implement functionalities without hindering previous one's or each other.
Test coverage is easier for the group and the project. 
Group puts into practice the agile principle of CI/CD through Travis.