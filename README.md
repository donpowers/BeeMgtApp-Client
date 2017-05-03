
[![General Assembly Logo](https://camo.githubusercontent.com/1a91b05b8f4d44b5bbfb83abac2b0996d8e26c92/687474703a2f2f692e696d6775722e636f6d2f6b6538555354712e706e67)](https://generalassemb.ly/education/web-development-immersive)

# Honey Bee Colony Management Client https://donpowers.github.io/BeeMgtApp-Client/
Repo: https://github.com/donpowers/BeeMgtApp-Client
Repo: https://github.com/donpowers/BeeMgtApp-Api

Goals

1. Build a single-page application (SPA) with basic user authentication (sign up, sign in, sign out, change password) that interacts with a custom API that I built.
2. Build an app that can create, read, update, and delete data in a SQL database where the tables had a one to many relationship.
3. Create user stories and wireframes.
4. Confidently present your work to a technical audience

Objectives

1. A working full-stack application, built by me, hosted on the internet.
2. Source Control: Managing and interacting with a git repository to store changes to code.

Requirements

1. Single-page application.
2. Deployed online, where the rest of the world can access it.
3. Provide the ability to Sign-Up, Sign-In, Change Password and sign-out
4. Provide the ability to perform CRUD operations on a DB table.
5. API that is securely accessible by your browser app.
6. Create at least 4 RESTful routes for handling GET, POST, PUT/PATCH, and DELETE requests. Any actions which change data must be authenticated, and the data must be "owned" by the user performing the change.
7. Utilize an ORM to create a database table structure and interact with data.
8. Use a front-end Javascript app to communicate with your API (both read and write) and render data that it receives in the browser

Wireframe of your planned front end. http://i.imgur.com/HLqrOfv.jpg

##User stories

The user: beekeeper who wants to manage their hives online.

Story: As a User, I want to create a hive(name), So that I can manage it.
Story: As a User, I want to add what type of queen the hive has, So that I know what type of queen this have has.
Story: As a User, I want to add the location of my hive, So that I know
where it is located
Story: As a User, I want my know how many brood supers per hive, So that I can plan on replacing frames for my IPM.
Story: As a User, I want my know how many honey supers per hive, So that I can plan for extraction.
Story: As a User, I want update my hive information, So that I can update changes that have occurred.
Story: As a User, I want delete a hive, So that my hive list is updated

##Wireframe
The initial wireframe mockup of a potential site design is located here
http://i.imgur.com/Ml7FeJx.jpg

##Data Model(ERD)
http://i.imgur.com/sGyoD9N.png

##Full Stack Project approach

1.Identify what is needed for Minimum Viable Product or MVP. The goal is have a product with the minimal features, so that users feedback can be received early, allowing adjustments to be made, with minimal work upfront.
2.Determine what DB tables are required and relationships
3.Build MVP UI for sign up/in/out/password
4.Build out rails scaffold for new tables to support features.
5.Implement routes and controllers along with curl scripts for support features.
6.Add 'current_user' support.
7.Build custom route(return on those hives for the user logged in)
8.Build MVP UI for CRUD operations on hive.
9.Deploy repo's to production sites.
10.Refactor basic UI to improve appearance and error handling.

I followed my project approach as listed above.  It worked well. I had
only a few challenges: current user support and heroku deploy. Working
through those issues were accomplished relatively quickly(< 2hours).

I observed that CRUD operations via the client did take some time to get all the 'ducks' lined up. From UI components, handlers, data
transformation, api calls and the UI updates once the API response was
processed.

For UI components that were not needed, they were not displayed.

Added messaging when user actions were performed to improve user experience.
