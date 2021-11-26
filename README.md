# Artemis Frontend v2

Products
- Pools
- Staking
- ArtemisPad
- Incubator

If you'd like to contribute (hugely appreciated), pull from the beta branch, we'll then merge to main! Read the guidelines below...

#### Install dependencies and run locally

    yarn

    yarn start  
    
#### Project structure

    components: contains generic components used inside the application.
    views: contains building blocks for each page. The entry point of a view is used as the root component of each route.
    config: contains all the config files and ABIs.
    state: contains the redux files for the global state of the app.
    context: contains global contexts (separated from the redux store)
    hooks: contains generic hooks.
    utils: contains generic utilities functions.

#### Project structure

    Run tests with yarn test.

