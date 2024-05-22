# nodejs-shop

A Node.js express server for ecommerce shop for handling products and orders.

## Getting started

### Installation

1. Clone the repo

    ```
    git clone https://github.com/ZaibLComrade/nodejs-shop
    ```

2. Change directory into project directory

    ```
    cd ./nodejs-shop
    ```

3. Install dependencies
    ```
    npm i
    ```

### Env

Create a `.env` file to configure API keys. Examples for environment variables are documented in `.env.example` file.

### Scripts

`start`: Runs the server and watches for changes in `dist` directory (Must be built before run).  
`build`: transpiles .ts files in `src` directory into `dist`. Build project.  
`build:watch`: Watches for changes in .ts files in `src` directory.  
`lint`: Checks for eslint errors or warnings.  
`lint:fix`: Solves fixable eslint issues.  
`format`: Format files with prettier.
