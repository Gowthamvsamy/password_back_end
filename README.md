## Back-End User Authentication API
This back-end project is built using Node.js, Express, and Mongoose. It includes a userModel to manage user-related operations such as registration, email validation, and secure password storage with hashing using bcrypt.

- --

## Features

## User Schema
  - The user schema defines the structure for storing user information in a MongoDB database.
  - **Fields include:**
      - `username:` Stores the user's name (required).
      - `email:` Stores the user's email (required, unique, and validated using a regex pattern).
      - `password:` Stores the hashed password (required, minimum length of 8 characters).

## Password Hashing
  - The `userSchema` includes a `pre-save` middleware that hashes the user's password using `bcrypt` before saving it to the database.
  - This ensures that passwords are stored securely and cannot be retrieved in plain text.

## Validation
  - Emails are validated using a regex pattern to ensure they match standard email formats.
  - Passwords must be at least 8 characters long.

## Unique Constraints
  - The `email` field is marked as `unique` to ensure no duplicate user accounts are created with the same email.

- --

## License
This project is open-source and available under the MIT License.
