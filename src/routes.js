// using an ES6 transpiler, like babel 
import React from 'react';
import {Route, IndexRoute} from 'react-router';


import App from './containers/App.jsx';
import Home from './containers/Home.jsx';
import About from './containers/About.jsx';

import Posts from './containers/posts/Posts.jsx';
import PostAdd from './containers/posts/PostAdd.jsx';
import PostPage from './containers/posts/PostPage.jsx';
import PostUpdate from './containers/posts/PostUpdate.jsx';

import Dashboard from './containers/master/Dashboard.jsx';


export default (
  <Route path="/" component={App}>
	  <IndexRoute component={Home} />
	  <Route path="/posts" component={Posts} />
	  <Route path="/post/add" component={PostAdd} />
	  <Route path="/post/id/:nodeId" component={PostPage} />
	  <Route path="/post/update/:nodeId" component={PostUpdate} />

	   <Route path="/master" component={Dashboard}>
	   </Route>
  </Route>
  );
