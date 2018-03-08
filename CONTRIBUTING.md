# Contributing

To contribute to hackd, clone/fork the repository, make changes and open a PR with your changes. Any type of change is welcomed, including bug fixes, new features, documentation or tests.

Opening issues for bugs, features or anything else is also welcomed.

If you are implementing a new feature, or modifying styles, please replace/add screenshot(s) to the [README](README.md).

### Prettier

[Prettier](https://github.com/prettier/prettier) is used to keep a consistent code style across the project. Before committing, run `npm run prettier` which will list all files that aren't formatted correctly, then rin `npm run prettier:write` to transform your code to fit the projects style.

### ESLint

[ESLint](https://github.com/eslint/eslint) is used for code linting inside your IDE/text editor. If you don't have ESLint installed in your editor, you should install it - [https://eslint.org/docs/user-guide/integrations](https://eslint.org/docs/user-guide/integrations). 

To find any errors or warnings, either view them in your editor once you've installed the right package, or run `npm run eslint`. Not all errors/warnings can be fixed, and some will be picked up by Prettier, so don't worry if you can't fix them. To automatically fix some errors/warnings, run `npm run eslint:fix`.

### Prettier & ESLint

To autoamtically format and fix linting errors, run `npm run format`. This runs Prettier, then ESLint. 

### Lock Files

All lock files (`package-lock.json`, `yarn.lock`) should be committed.

### Dependencies

Try to keep dependencies to a minimum where possible. If you are pulling a whole library for just one function, try to implement that function as a helper method.

### Testing

[Jest](https://github.com/facebook/jest) is used for testing. Once you've made changes, writing a test case helps to catch any bugs. Feel free to open a PR that just includes more tests.

### Setup

Follow the instructions in the [README](README.md) to get setup. Once hackd is running in the iOS simulator, you can enable debugging and view redux-logger logs in the console.