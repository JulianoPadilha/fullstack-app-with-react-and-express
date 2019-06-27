# Building a Full Stack App with React and Express

> https://app.pluralsight.com/library/courses/react-express-full-stack-app-building/table-of-contents

## Structure of Full Stack Applications

### Why Businesses need full stack applications

- Users expect a fast, fluid experience (dedicated fron end component)
- User-created content must still be there next time (data persistence)
- Processing payments and managing user data are critical to generating revenue

![Whats Fullstack](readme_files/whats_fullstack.png)

### Front End (Also called the "client")

- Comprises pages, buttons and forms for the user to interact with
- Concerned with user experience design, polish, speed, etc.
- Can change appearance for different devices ("reactivity")
- Consistently made up of JavaScript, HTML and CSS

### Client Limitations (Why do we need a back end?)

- Client can't persist data reliably
- Not possible to hide secrets on client
- No control over end user's hardware (may be too slow to handle necessary calculations)

### Back End (Also called the "server")

- Persists user experience by storing data permanently in databases
- Conceals information (such as secret keys, other user's data) from end user
- Communicates with third-party APIs, i.e. payment processors

### Server Limitations (Why do we need a front end?)

- Applications without client are difficult to use without technical knowledge (i.e. BASH commands, SQL queries)
- Wweb browsers allow for images, animation and styling, creating a favorable impression of your organization 

### What comprises a Back End?

- Database

> Provides a place for data to go. When databases do their job, they are very boring and predictable

- Server

> Provides a place to sore secret business logic or authorization, and to communicate with the database 

### Advantages of JavaScript-based Back End vs. Other Languages

- Developers can be hired flexibly
- Constants and formulas may be shared directly between front and back end
- Server can more easily pre-render pages or assist with calculations

### Limitations of using a JavaScript Back End

- Sluggish processing, greatly limited and slow math capabilities (no integer math, only floating-point)
- Some languages have a larger selection of certain libraries (i.e., data science and Python)
- Typically more challenging and expensive to deploy than Java, PHP, etc.

### Client-Server Workflow

![Client-server workflow](readme_files/client_server_workflow.png)

## Configuring the Development Environment with Webpack and Babel

### Webpack

- Uses *babel* used to convert *.jsx* and ES6 files into *.js* files
- Bundles set of files connected by *import* statements into one file
- Uses *webpack-dev-server* plugin to create convenient environment

```bash
npm init -y
```

```bash
npm install --save-dev webpack webpack-cli webpack-dev-server
```

```bash
npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/preset-react @babel/register babel-loader
```

> .babelrc

```json
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "node": "current"
      }
    }],
    "@babel/preset-react"
  ]
}
```

> webpack.config.js

```js
const path = require('path');

module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, 'src', 'app'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: "babel-loader"
    }]
  }
}
```

## Implementing React Components and Redux State

### Overview of Redux

- Manages underlying data
- Application state can be easily accessed
- Changing application state occurs only via actions
- Redux state is provided to React components via React-Redux, a small connector library

### Create default application state as JSON file for development - Demo

> src/server/defaultServer.js

```js
export const defaultState = {
  users: [{
    id: "U1",
    name: "Dev"
  }, {
    id: "U2",
    name: "C. Eeyo"
  }],
  groups: [{
    name: "To Do",
    id: "G1",
    owner: "U1"
  }, {
    name: "Doing",
    id: "G2",
    owner: "U1"
  }, {
    name: "Done",
    id: "G3",
    owner: "U1"
  }],
  tasks: [{
    name: "Refactor tests",
    id: "T1",
    group: "G1",
    owner: "U1",
    isComplete: false,
  }, {
    name: "Meet with CTO",
    id: "T2",
    group: "G1",
    owner: "U1",
    isComplete: true,
  }, {
    name: "Compile ES6",
    id: "T3",
    group: "G2",
    owner: "U2",
    isComplete: false,
  }, {
    name: "Update component snapshots",
    id: "T4",
    group: "G2",
    owner: "U1",
    isComplete: true,
  }, {
    name: "Production optimizations",
    id: "T5",
    group: "G3",
    owner: "U1",
    isComplete: false,
  }],
  comments: [{
    owner: "U1",
    id: "C1",
    task: "T1",
    content: "Great work!"
  }]
} 
```

### Create basic Redux store to provide state to application as necessary - Demo

```bash
npm install --save redux@4.0.0
```

> src/app/store/index.js

```js
import { createStore } from 'redux';
import { defaultState } from '../../server/defaultState';

const reducer = (state = defaultState, action) => state;

export const store = createStore(
  reducer
)
```

> update: src/app/index.js

```js
console.log('hello world');

import { store } from './store';

console.log(store.getState());

```

### Adding a Dashboard Component - Demo

```bash
npm install --save react@16.5.0 react-dom@16.5.0 react-redux@5.0.7
```

> src/components/Dashboard.js

```js
import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

export const Dashboard = ({ groups }) => (
  <div>
    <h1>Dashboard</h1>
    {
      groups.map(group => (
        <ConnectedTaskList id={group.id} name={group.name} />
      ))
    }
  </div>
);

const mapStateToProps = state => {
  return {
    groups: state.groups
  }
}

export const ConnectedDashboard = connect(mapStateToProps)(Dashboard);
```

> src/components/Main.js

```js
import React  from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';

export const Main = () => (
  <Provider store={store}>
    <div>
      <ConnectedDashboard />
    </div>
  </Provider>
)
```

> src/components/TaskList.js

```js
import React from 'react';
import { connect } from 'react-redux';

export const TaskList = ({ tasks, name }) => (
  <div>
    <h3>
      { name }
    </h3>
    <div>
      {
        tasks.map(task => (
          <div>{ task.name }</div>
        ))
      }
    </div>
  </div>
)

const mapStateToProps = (state, ownProps) => {
  let groupID = ownProps.id;
  return {
    name: ownProps.name,
    id: groupID,
    tasks: state.tasks.filter(task => task.group === groupID)
  }
}

export const ConnectedTaskList = connect(mapStateToProps)(TaskList);
```

### Routing and Navigation

- "Routing" is a term for when the form of the application is affected by the URL bar
- ```react-router```determines which React component to display based on URL
- Good use of routing allows a lot of information to be codified in URL

### Routing and Navigation - Demo

> npm install --save react-router-dom

> npm install --save history

> src/components/Navigation.js

```js
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';

 const Nagivation = () => (
   <div>
     <Link to='/dashboard'>
        <h1>My Application</h1>
     </Link>
   </div>
 )

 const mapStateToProps = state => {
   return state;
 }

 export const ConnectedNavigation = connect(mapStateToProps)(Nagivation);
```

> src/store/history.js

```js
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
```

> update: src/components/Main.js

```js
import React  from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { Router, Route } from 'react-router-dom';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';

export const Main = () => (
  <Router history={ history }>
    <Provider store={store}>
      <div>
        <ConnectedNavigation />
        <Route exact path='/dashboard' render={
          () => (<ConnectedDashboard />)
        }>

        </Route>
      </div>
    </Provider>
  </Router>
)
```

### Adding new taks

- Reducer must bet updated to allow tasks array to be changed
- Tasks need random ID, reducers can't be random, therefore Saga or Thunk is needed
- Updated state is reflected automatically in React component appearance

#### Sagas in brief

- Sagas run in the background of Redux applications
- Respond to actions by generating "side-effects" (anything outside the app)
- One of only a few places where generator functions are found

#### Generators in brief

- Standard JavaScript functions (non-generator) return a single value, instantly
- Generators can return any number of values, not just one
- Generator values can be returned at a later time (asynchronously)

### Adding new taks - Demo

> npm install --save redux-logger redux-saga

> npm install --save uuid

Files with changes or created:

> src/components/Dashboard.js

> src/components/TaskList.js

> src/store/index.js

> src/store/mutations.js

> src/store/sagas.mock.js
