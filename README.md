# webcrawlerhttp
Project for the Learn HTTP course

## Setup steps

1. Install nvm

- type in cmd
```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

- add `.nvmrc` file
In this file, type the node version you want to install, e.g. 20.12.0

- type `nvm install` in cmd
This will install node version 20.12.0

- type `nvm use` in cmd
This will switch the node version to 20.12.0

- type `node --version` in cmd
Make sure we successfully install the node


2. Setup npm

- type `npm init` in cmd
Just use the default setup, it'll create a `package.json` file

- In `package.json`, add `"start": "node main.js"` in `"scripts:{}`
Now, we can just type `npm start` in cmd to run the code, so that the dependancies will be available


3. Install Jest

- type `npm install --save-dev jest` in cmd
This will update the `package.json` file with `"devDependencies"` and create a `package-lock.json` file and a `node_modules` folder
The `package-lock.json` and `node_modules` files contain the dependencies for jest

- In the `package.json`, switch the `"test": "jest"` in `"scripts"`, so that we can type `npm test` in cmd to run jest


4. Add .gitignore

- Add `.gitignore` and add `node_modules/` in it
When other people pull this repo, just type `npm install` to install the dependencies list in the `package.json` file.


5. Add test

- The jest will find the `.test.js` files and run it as tests

- e.g. We have `crawl.js` and `crawl.test.js`

- In `.test.js` file, we need to include `jest`. e.g. `const {test, expect} = require('@jest/globals')`


Now we can start to write tests and code

