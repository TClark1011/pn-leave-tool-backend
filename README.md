# PN Leave Tool - Backend

The 'PN Leave Tool' is a tool designed to allow Pacific National Employees to estimate the likelihood of a request for annual leave being approved or denied.

This is the codebase for the backend web server component of the project

## Packages

The PN Leave Tool is split into 3 separate packages/repositories:

- **[Frontend](https://github.com/TClark1011/pn-leave-tool):** Frontend web application
- **[Backend](https://github.com/TClark1011/pn-leave-tool-backend):** Backend web server.
- **[Common](https://github.com/TClark1011/pn-leave-tool-common):** Common code components that are used in both the frontend and backend codebases. Contains logic for form validation and parameters for estimating annual leave such as minimum required notice and minimum/maximum leave length. This package is shared between the frontend and backend via [npm](https://www.npmjs.com/package/pn-leave-tool-common/).
<!-- REPO URLS: Make sure to update this section if the name/ownership of the repos are ever changed. -->

## Get Started

This section details how to contribute/start working on this project:

1. Make sure you have a recent version Node.js installed ([link](https://nodejs.org/en/)).
1. Clone this repository along with the repository for the backend server code with the following terminal commands:

   **Frontend:** `git clone https://github.com/TClark1011/pn-leave-tool.git`<br>
   **Backend:** `git clone https://github.com/TClark1011/pn-leave-tool-backend.git`<br>
   <!-- REPO URLS: Make sure to update this section if the name/ownership of the repos are ever changed. -->

   It's possible you will get an error when running this command that states that the repositories do not exist. The most likely cause of this error is that either the repositories have changed name or ownership, or you are not authenticated.

1. Run the `npm install` command in both projects
1. Create the required environment variables in a `.env` file in the root directory of each project. What environment variables are required are described in the readme of each project.
1. You can now begin work on the project. To start the applications, run the command `npm run start:dev` in both projects. Other available scripts are described in the [scripts](#scripts) section of this readme file.

## Scripts

This section details the scripts defined in `package.json` that can be executed using the terminal command `npm run *script_name*`.

- `start` - Run the `index.js` file within the `build/` directory. Used to launch the server when in production.
- `start:dev` - Launches the `index.js` file within the `src/` directory using `nodemon`, allowing it to automatically restart when any changes are detected. **NOTE:** The server must be manually restarted before it will detect newly created environment variables.
- `test` - Test the server using `jest`.
- `test:dev` - Run the tests in watch mode, causing it to rerun tests when changes are detected.
- `build` - Build the program (goes into the 'build' folder).
- `update-common` - Install the latest version of the `pn-leave-tool-common` npm package.

## Routes

This section describes all the request routes for the PN Leave Tool API. All router root URLs are relevant to the root URL of the server. All request Addresses are relevant to the root URL of the corresponding router. URL parameters are denoted by `:param`. Eg; `/objects/delete/:id` is a dynamic url where an object id should be substituted into the string, replacing `:id`. For more information on route authentication, see the [Authentication](##authentication) section in this file. The 'Request Body' column describes the expected structure of request bodies.

### Depots

**File: **`src/routes/Depot.router.js`

**Root URL: ** `/depots`

| Function           | Address | Request Type | Authentication      | Request Body            |
| ------------------ | ------- | ------------ | ------------------- | ----------------------- |
| Fetch all depots   | /       | GET          | None                | None                    |
| Create a new depot | /       | POST         | Operator Access Key | See 'Depot' data object |
| Delete a depot     | /:id    | DELETE       | Operator Access Key | None                    |

### Leave Requests

**File: **`src/routes/Leave.router.js`

**Root URL: ** `/leave`

| Function                                     | Address  | Request Type | Authentication      | Request Body                   |
| -------------------------------------------- | -------- | ------------ | ------------------- | ------------------------------ |
| Request annual leave availability estimation | /request | POST         | Login               | See 'Leave' data object        |
| Submit CSV data exported from LMS            | /lmsData | POST         | Operator Access Key | CSV LMS data converted to JSON |

### User

**File: **`src/routes/User.router.js`

**Root URL: ** `/users`

| Function                               | Address                             | Request Type | Authentication | Request Body                      |
| -------------------------------------- | ----------------------------------- | ------------ | -------------- | --------------------------------- |
| Attempt to login                       | /login                              | POST         | None           | - employee_number<br />- password |
| Register a new user account            | /register                           | POST         | None           | See 'User' data object            |
| Resend registration verification email | /resendVerification/:employeeNumber | POST         | None           | None                              |
| Complete registration verification     | /verify/:verification_token*        | GET          | None           | None                              |
| Update user details                    | /update                             | POST         | Login          | See 'User' data object**          |
| Begin the password change process      | /forgotPassword/:employee_number    | POST         | None           | None                              |
| Complete the password change process   | /resetPassword/:reset_key***        | POST         | None           | - password                        |

*verification token included is contained in the verification email that is sent after a valid registration request is received
**Only the 'depot' and 'name' fields from the provided 'User' object will be used when updating user information
\*\*\*The password reset key is contained in the email that is sent after the request to begin the password change process is received

** **

## Environment Variables

The following environment variables are stored in `.env` files which are not tracked by git. Unless specified as optional, each environment variable must be set for every environment this project is deployed in. Environment variables are usually set by either creating a `.env` file in the root directory of the environment, or in the case of certain hosting providers such as 'Vercel' or 'Heroku', through a provided user interface.

All environment variables are exported from `src/constants/env.js`. This allows for a more convenient syntax as well as env variable mocking during tests.

### Email

- `EMAIL_ADDRESS` - The email address to be used to send out emails.
- `EMAIL_USER` - The username of the email account used to send emails.
- `EMAIL_OAUTH_ID` - Google 'OAuth' ID used to authenticate access to email.
- `EMAIL_OAUTH_CLIENT_SECRET` - The 'OAuth' client secret.
- `EMAIL_REFRESH_TOKEN` - The token that is used to generate 'OAuth' access keys.
- `EMAIL_TESTING_API_KEY` - An API key for the API used to test email functionality.
- `SUPPORT_EMAIl` - The email address to use when sending customer support related emails.
- `VALIDATE_EMAIL` - Whether or not ("true"/"false") to validate email addresses during user registration. Defaults to "false".

### Authentication

- `JWT_SECRET` - The string used to generate web tokens.
- `OPERATOR_ACCESS_KEY` - String that must be provided when planners are submitting roster CSV data.

### Urls

- `BACKEND_URL` - The root url of the API.
- `FRONTENT_URL` - The root url of the frontend web application component of the PN Leave Tool.

### Misc.

- `PORT` - The port the server will run on. Most hosting providers will automatically provide this and will not require it to be set manually.
- `MONGO_URI` - The connection string used to connect to the database.

## Linting

This project uses `eslint` and `prettier` to enforce a specific code style. The most notable linting rules that are used are:

- **Quotes: ** Must use double quotes. Exceptions to this rule include uses of backticks for template literals with included variables such as `` `Hello ${name}` ``, and when using single quotes to allow the use of double quotes in a string such as `'I said "Hello" to you'`.
- **Semicolon: ** Must always use semicolons at the end of lines.
- **Indentation: ** Must use tabs for indentation.
- **Quote Props: ** Property keys in objects must always be wrapped in quotes, except when using the shorthand to pass a variable as both the key and property value.
- **Require JSDoc: ** All functions must include a JSDoc comment to document it. [JSDoc](https://jsdoc.app/) documentation.
- **Prefer Arrow Functions: ** You must use arrow functions (eg; `const func = (param) => {...};`). The `function` syntax can be used if the `this` keyword is used in the function body eg; `function func(param) {return this.result};`

## Database

The database used to store data is a MongoDB database that is stored in a MongoDB Atlas cloud database.

## Data Objects

This section describes important data types and their corresponding fields. As well as the fields described, each data type also has special fields which are automatically provided by MongoDB. The most important of this is `_id`, which is a unique identifier.

If a field does not have a default value then that field is required and cannot be left out when creating a new instance of that data type. If a default value is wrapped in square brackets ('[...]') that denotes that that field is a special field and should not be provided, if the value is provided it will be discarded by the server in favour of the stated default value. If a Field's type is prefixed with "!" that means that it is a 'unique' field, meaning all instances of the data type must have a unique value for this field.

### Depot

| Field   | Description                                                | Type    | Default Value |
| ------- | ---------------------------------------------------------- | ------- | ------------- |
| name    | The name of the depot.                                     | !String | N/A           |
| drivers | The number of drivers assigned to the depot                | Number  | N/A           |
| hidden  | Whether or not a depot should be hidden from the frontend* | Boolean | `false`       |

\*If a depot is set to hidden, it means it will only appear in the frontend application in development environments. In production environments it will not be shown to users.

### Leave

| Field       | Description                                               | Type    | Default Value |
| ----------- | --------------------------------------------------------- | ------- | ------------- |
| dates       | ---                                                       | Object  | N/A           |
| dates.start | The start date of the leave request                       | Date    | N/A           |
| dates.end   | The end date of the leave request                         | Date    | N/A           |
| user        | The employee number of the user making the request        | String* | N/A           |
| status      | The current approval status of the request*               | Number  | N/A           |
| depot       | The `objectId` of the depot the request is being made for | String  | N/A           |
| submitted   | The time at which the request was submitted               | Date    | `Date.now()`  |

\*-1 = Denied, 0 = Pending (not currently implemented), 1 = Approved

### User

| Field                                 | Description                                                  | Type    | Default Value     |
| ------------------------------------- | ------------------------------------------------------------ | ------- | ----------------- |
| employee_number                       | Employee Number                                              | !String | N/A               |
| password                              | Password                                                     | String  | N/A               |
| name                                  | The user's name                                              | String  | N/A               |
| depot                                 | `objectId` corresponding to the depot to which the user is assigned. | String  | N/A               |
| email                                 | The user's email address. May be required to be an official Pacific National Email. See the 'VALIDATE_EMAIL' [environment variable](##environment-variables) for how to enable/disable the enforcement of email validation. | String  | N/A               |
| date_created                          | The date at which the user registered their account.         | Date    | [`Date.now()`]    |
| verified                              | Whether or not the user has verified their account.          | Boolean | [`false`]         |
| passwordReset                         | ---                                                          | Object  | N/A               |
| passwordReset.isResettingPassword     | Whether or not the user is currently resetting their password | Boolean | [`false`]         |
| passwordReset.resetPasswordKey        | The key that is used to verify the user's identity when they update their password | String  | [`""`]            |
| passwordReset.resetPasswordKeyExpires | When the `resetPasswordKey` expires and can then no longer be used. | Date    | [`new Date(0)`]\* |

\*This default value is only used because the field requires it be filled by some value. 

### Roster Day

This represents a single day in a roster. It tracks how many drivers are rostered off on that date.

| Field         | Description                                               | Type   | Default Value |
| ------------- | --------------------------------------------------------- | ------ | ------------- |
| date          | The date this object represents                           | Date   | N/A           |
| absentDrivers | The number of drivers rostered of on that date            | Number | `0`           |
| depot         | The `objectId` of the depot the request is being made for | String | N/A           |

## Authentication

This section describes the two different methods of authentication used in the server

- **Operator Access Key: ** When roster planners are submitting CSV data from the LMS, they must provide an access key.
- **Login: **This method of authentication requires a JWT authentication token be provided by the client. The required token is provided by the server upon successful login.

## Adjustments

This section will detail how to make adjustments to certain parameters within the application:

- **Set Email Validation: **To enable/disable validation that enforces all user email addresses be official PN email accounts, you must set the `VALIDATE_EMAIL` to either `true` for `false` depending on whether or not you want email addresses .
- **Hosting:** Deploying this project will not require many special steps and will largely be the same as deploying any other project to a hosting provider. However, when doing so make sure to update the `BACKEND_URL` AND `FRONTEND_URL` environment variables when you do so, along with the `REACT_APP_BACKEND_URL` in the frontend application.
- **Operator Access Key: ** To change the operator access key that must be provided by roster planners when uploading CSV data pulled from the LMS, change the `OPERATOR_ACCESS_KEY` environment variable.
- **Leave Parameters: **To adjust the minimum/maximum length of annual leave or the minimum required notice a driver must provide before taking leave, you must first clone the [repository containing the common components](https://github.com/TClark1011/pn-leave-tool-common) and navigate to the `src/leaveParams.js` file and make your changes. Save your changes and push them to the main branch. Run `npm version patch` in the command line, then run `npm publish`. Then, execute the the command `npm run update-common` in the frontend and backend codebases.

## Miscellaneous Functionality

This section describes miscellaneous aspects of the server's functionality.

### Babel

This project uses babel to compile the compile the modern ES6 syntax to the more standard 'CommonJS' syntax that will be run in production.

### Leave Approval Estimation

The way leave request approval estimation works on a basic level is by iterating over each day that in the time period for which a user has requested leave and checking that each and every day will still have the required workforce with the requesting employee being absent. If the roster would still be above the required workforce with the requesting driver absent for every day, then the leave is estimated to be approved, otherwise it is estimated to be false. When a request is estimated to be approved, that driver's absence is recorded in the database so it will be considered when other drivers request estimations.

### Leave Requests VS LMS Data

The way successful leave requests are recorded and the way data from LMS is handled is slightly different. When a leave request is processed and estimated to be approved, that user's absence is recorded in addition to the existing roster data. When LMS data is submitted, it overwrites any roster data that may have been recorded for the specified dates.

### Email Testing

In order to test the email sending functionality, we make use of the [Temp Mail API](https://rapidapi.com/Privatix/api/temp-mail) which allows to generate and check the status of temporary email inboxes during our tests. We test email sending functionality (as seen in the registration and password reset processes) by generating a new inbox before the tests and providing the address for that email to the registration/password reset tests and checking the state of the inbox to see if the emails were sent and received.

### Email HTML

To generate the HTML for our emails, we make use of handlebars HTML templates.

### Logging

This project uses a custom logging function that uses winston, both for automatic logging requests and for manual console logging. In any situation where you would normally use 'console.log', you should instead use the 'log' function exported from `src/middleware/loggingMiddleware`.  This custom logging function takes a message parameter and an optional "level" parameter which determines how the message will be tagged when printed to the console and whether or not the message will also appear in log files. The levels are as follows:

1. `error`
2. `warn`
3. `info` (default)
4. `cleanup `
5. `debug `

All levels will be logged into log files except for 'Debug', which will only appear in the console while the server is running.

### Cleanup

Whenever a request is received, a 'cleanup' function is executed asynchronously. This cleanup functions deletes items from the database that meet certain criteria to be considered irrelevant and will no longer to either be required for the application to correctly operate or to be requested by a user. The deletion operations along with their corresponding irrelevancy criteria are as follows:

- Delete Unverified Users - User objects that were created but have remained unverified for one hour.
- Delete Expired Leave Requests - Leave requests with end dates that passed at least 1 year ago.

The cleanup function will be executed at most once per hour. If cleanup had been run within an hour when a request is received then cleanup is not executed.