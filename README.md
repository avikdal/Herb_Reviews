# Herb_Reviews

Herbs_Review is a web application built using Ruby on Rails as the backend framework, ActiveRecord as the database ORM, and React for the frontend. The application focuses on herb reviews and features user authentication with login capabilities.

[See a walkthrough here](https://www.canva.com/design/DAF1ZPBI40M/watch)

## Features

1. Tech Stack
Backend: Ruby on Rails API
Frontend: React
2. Utilizes proper RESTful routing.
3. Models
Includes many-to-many relationship; Herbs can have many Users and Users can have many Herbs
Utilizes a join table with two foreign keys.
Implements two has-many/belongs-to relationships.
Implements two has-many-through relationships to achieve the many-to-many association.
4. Data Refresh
No Reliance on Reloads: Does not rely on redirects and reloads to refresh data.
No document.reload or window.reload: Application does not use these methods.
5. Separation of Concerns
Ensures separation of concerns between frontend and backend.
Passes needed associated objects in JSON responses, avoiding unnecessary frontend processing.
6. CRUD Actions
Implements full CRUD actions for Reviews resource.
Implements Create & Read functionality for Herbs resource.
7. Validations and Error Messages
Includes validations and displays appropriate error messages.
8. Authentication/Authorization
Implements authentication and authorization features.
Ensures secure password protection for user login.
Allows users to stay logged in via user ID in the session hash.
9. User Resource
Ensures that one user cannot edit or delete a resource created by another user.
Provides edit and delete capabilities only if the logged-in user is the creator of the resource.
10. React Hooks - useContext
Utilizes React hook useContext to persist the user object in frontend state.

## Ruby Version
Ensure you have Ruby version 2.7.4 installed. You can manage your Ruby version using tools like RVM or rbenv.

   ```console
   $ ruby "2.7.4"
   ```


## System Dependencies
The app relies on several gems and dependencies. Here are the key gems mentioned in the Gemfile:

* rails - Version 7.0.8 is used as the Rails framework.
* sqlite3 - SQLite is the chosen database for Active Record.
* puma - Puma is the web server used for the application.
* bcrypt - Provides password hashing for user authentication.
* tzinfo-data - Required for time zone information.
* bootsnap - Used to reduce boot times through caching.
* rack-cors - Handles Cross-Origin Resource Sharing (CORS) for enabling cross-origin AJAX.

Please run `bundle install` to install all the required gems.

## What I learned

Building this project was an enjoyable experience for me. I was particularly thrilled by how quickly Rails allowed me to set up the backend using the `rails g command, which facilitated the creation of models, controllers, and serializers.

One of the most challenging aspects of the project was updating the frontend state. This marked my first encounter with `useContext in React, and while I found it fascinating, I acknowledge that I have more practice ahead to become entirely comfortable with it. Nevertheless, it proved to be an interesting and helpful hook, and I am eager to deepen my familiarity with it through continued exploration and practice.





