# Coding review guide
* Reference: https://google.github.io/eng-practices/review/reviewer/standard.html
* Reference: https://google.github.io/eng-practices/review/reviewer/looking-for.html

## Introduction

In this file, the coding review guidelines are provided. Coding review is used to maintain a healthy overall code over a period of time. In a code review, there are at least two individual of interest, the reviewer and the developer. The reviewer is in charge of making sure to code is up to standard and the developer is the one who makes it. Code reviewing ensures that during the course of the project the developer produce efficient code improving the overall effectiveness and efficiency of the program.

---

The following describe what standards are reviewed for the project:

## Design
* The code is well-designed. (Do the interactions of various pieces of code make sense? Does the changes belong in the codebase, or in a library? Does it integrate well with the rest of the code/system?)

## Functionality
* The functionality is good for the users of the code.
* Any UI changes are sensible and look good.
* Any parallel programming is done safely.

## Complexity
* The code is not more complex than it needs to be.
* The developers are not implementing things they need in the future rather than things they require/need now.

## Tests
* The code has appropriate unit tests.
* The tests for the code are well-designed (they are correct, sensible, and useful).
* The tests must be well maintained.
* The tests do not require client input.

## Naming
* The developer used clear names for everything.
* The developer used the appropriate coding style guides for naming conventions.
* Ambiguos names have comments to indicate the identity.

## Comments
* Comments must be clear and useful.
* Comments must explain why instead of what.
* No comments necessary for self explanatory functions.

## Style
* The code conforms to the coding style guides provided.

## Documentation
* Code is appropriately documented.

---

Below are the conducts the reviewer and developer need to have during a code review:

## Respect (Mentoring)

* (Reviewer) Leave comments that help a developer learn something new.(if comment is purely educational, but not critical to meeting the standards described in this document, prefix it with “Nit: “ or otherwise indicate that it’s not mandatory for the author to resolve it).
* (Reviewee) checks comments and answers with the actions they  are going to take and inform the (Reviewer) when the actions are done.


## Principle

* Technical facts and data overrule opinions and personal preferences.

* With regards to the coding style, the coding style guide is the absolute authority. The style should be consistent with what is there. If there is no previous style, accept the author’s.

* If the author can demonstrate (either through data or based on solid engineering principles) that several approaches are equally valid, then the reviewer should accept the preference of the author. Otherwise the choice is dictated by standard principles of software design.

* If no other rule applies, then the reviewer may ask the author to be consistent with what is in the current codebase, as long as that doesn’t worsen the overall code health of the system.

## Conflict resolution

* In any conflict on a code review, the first step should always be for the developer and reviewer to try to come to consensus, based on the contents of this document and the other documents provided.

* When coming to consensus is difficult, have a face-to-face meeting or a video conference between the reviewer and the author. (Doing this requires proof of the discussion ensuing)

* If a situation still remains unresolved, the most common way to resolve it is to escalate it.









