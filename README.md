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
