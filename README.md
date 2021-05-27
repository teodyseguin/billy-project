# Welcome to billy-csv-vouchers

Webapp for uploading vouchers via CSV to Billy

## Tech in Use

- React
- Node
- MondoDB [mLab](https://mlab.com/)
- Bootstrap
- SASS

## Pre-requisite Tools

- Node: [https://nodejs.org/en/download/package-manager/](https://nodejs.org/en/download/package-manager/)
- NPM: [https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)
- Compass: [http://compass-style.org/install/](http://compass-style.org/install/)
-- You need to install Gem as well, in order to install Compass

## Setup

- Change directory to the root directory and run `npm install` to download the project dependencies

## How to work with the code base?

- Style partials OR SCSS files are located from `/app/sass` directory.

- You need to install `sass-globbing`, if you are going to add new style partials (scss files), because this plugin is used to auto scrape the sass directory whenever you add a new one. Run `gem install sass-globbing`.

- To automatically compile `style.css` while you add new style partials or updating existing style partials, run `compass watch` from `/app` directory.

- To compile `style.css` one time, run `compass compile`.

- Pages are represented as containers. Containers are found in `/app/containers`

- Components are small bits of functionalities that are added as neccessary. They are located at `/app/components`

- If you are going to work or interact with the components and do some modifications, you can run `npm run dev`, so that it auto refreshes your changes to the front end. You should view your changes from `http://localhost:8080`. Although this will not be able to communicate with the server API.

- If you needed to work with the server API while doing modifications to the front end, do your changes and compile manually. Run `npm run build`, and along side that, you should have the node server running via `node server/server`. With this, you should be seeing your changes at `http://localhost:3000`.

- You can also install `supervisor (npm install -g supervisor)` so that it auto restarts your node server when you do changes. Run `supervisor server/`.

## Standard Practice

- For the codebase, I use 2 spaces for indentions
- `feature/brief-description`, `bugfix/brief-description`, `hotfix/brief-description` for git branch namings
- For git commits, I follow [this](https://gist.github.com/stephenparish/9941e89d80e2bc58a153).  
