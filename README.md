# PN Leave Tool - Backend

The 'PN Leave Tool' is a tool designed to allow Pacific National Employees to estimate the likelihood of a request for annual leave being approved or denied.

This is the codebase for the backend web server component of the project

## Packages

The PN Leave Tool is split into 3 separate packages/repositories:

- **[Frontend](https://github.com/TClark1011/pn-leave-tool):** Frontend web application
- **[Backend](https://github.com/TClark1011/pn-leave-tool-backend):** Backend web server.
- **[Common](https://github.com/TClark1011/pn-leave-tool-common):** Common code components that are used in both the frontend and backend codebases. Contains logic for form validation and parameters for estimating annual leave such as minimum required notice and minimum/maximum leave length.
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
- `test:dev` - Run the server in watch mode, causing it to rerun tests when changes are detected.
- `build` - Build the program (goes into the 'build' folder).
- `update-common` - Install the latest version of the `pn-leave-tool-common` npm package.

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

	

## Logging

This project uses a custom logging function that uses winston, both for automatic logging requests and for manual console logging. In any situation where you would normally use 'console.log', you should instead use the 'log' function exported from `src/middleware/loggingMiddleware`.  This custom logging function takes a message parameter and an optional "level" parameter which determines how the message will be tagged when printed to the console and whether or not the message will also appear in log files. The levels are as follows:

1. `error`
2. `warn`
3. `info` (default)
4. `cleanup `
5. `debug `

All levels will be logged into log files except for 'Debug', which will only appear in the console while the server is running.

## Linting

This project uses `eslint` and `prettier` to enforce a specific code style. The most notable linting rules that are used are:

- **Quotes: ** Must use double quotes. Exceptions to this rule include uses of backticks for template literals with included variables such as `` `Hello ${name}` ``, and when using single quotes to allow the use of double quotes in a string such as `'I said "Hello" to you'`.
- **Semicolon: ** Must always use semicolons at the end of lines.
- **Indentation: ** Must use tabs for indentation.
- **Quote Props: ** Property keys in objects must always be wrapped in quotes, except when using the shorthand to pass a variable as both the key and property value.
- **Require JSDoc: ** All functions must include a JSDoc comment to document it. [JSDoc](https://jsdoc.app/) documentation.
- **Prefer Arrow Functions: ** You must use arrow functions (eg; `const func = (param) => {...};`). The `function` syntax can be used if the `this` keyword is used in the function body eg; `function func(param) {return this.result};`

## Cleanup

Whenever a request is received, a 'cleanup' function is executed asynchronously. This cleanup functions deletes items from the database that meet certain criteria to be considered irrelevant and will no longer to either be required for the application to correctly operate or to be requested by a user. The deletion operations along with their corresponding irrelevancy criteria are as follows:

- Delete Unverified Users - User objects that were created but have remained unverified for one hour.
- Delete Expired Leave Requests - Leave requests with end dates that passed at least 1 year ago.

The cleanup function will be executed at most once per hour. If cleanup had been run within an hour when a request is received then cleanup is not executed.