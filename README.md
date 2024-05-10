# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

IMPORTANT NOTE ABOUT OUR BE ENDPOINT: we have been getting a weird cors error only on POST requests whenever we try to run out FE against our local BE endpoint ("http://127.0.0.1:8000/") so we have set our path in constants.js to always hit our deployed BE endpoint "https://commonground.pythonanywhere.com/" \
\
It seems that the cors issue goes away sometimes with our local endpoint but it's not consistent and after trying to debug for weeks we found that all CORS issues go away with the deployed endpoint and it seems the issue is not with our code but maybe with the browsers we've been using. Professor is aware of this issue and we're still actively trying to find a solve for this. 

## Available Scripts 

Start by cloaning this repository using the script: 

### `git clone https://github.com/iss6518/commnGroundIccha.git`

Under the project repository run the following script to install all necessary node modules

### `npm install`

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Running the back-end:

To see data from BE, you need the back-end running in the background.

If you haven't done so, open a new terminal window and clone the team-slick BE repo using the script:

### `git clone https://github.com/iss6518/team-slick.git`

cd into your team-slick directory and run all necessary set up commands:

1) to set your python environment variable
### export PYTHONPATH=$PYTHONPATH:$(pwd)
2) to pip install necessary dependancies for project
### make dev_env
3) to start a mongo service on your device
### sudo service mongod start
4) to signin to our cloud mongoDB 
### export MONGODB_PASSWORD=<INSERT OUR MONGODB PW HERE>
5) set to 1 in order to run against our cloud mongoDB
### export CLOUD_MONGO=1
6) to run the swagger endpoint on http://127.0.0.1:8000/
### ./local.sh


## Additional scripts:

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
