// Imports
import React from 'react';
import { asyncComponent } from '@jaredpalmer/after';

// UI imports
import Loader from 'ui/Loader';

// App imports
import PagesHome from 'modules/pages/Home';
import PagesAbout from 'modules/pages/About';
import PagesLearn from 'modules/pages/Learn';
import UserLogin from 'modules/user/Login';
import UserRegister from 'modules/user/Register';
import UserProfile from 'modules/user/Profile';
import UserWorkspace from 'modules/user/Workspace';

// Routes
export const routes = {
  // Pages
  // pages - home
  pagesHome: {
    path: '/',
    component: PagesHome,
    exact: true
  },
  // pages - about
  pagesAbout: {
    path: '/about',
    component: PagesAbout
  },
  // pages - learn
  pagesLearn: {
    path: '/learn',
    component: PagesLearn
  },

  // User
  // user - login
  userLogin: {
    path: '/login',
    component: UserLogin
  },
  // user - register
  userRegister: {
    path: '/register',
    component: UserRegister
  },
  // user - profile
  userProfile: {
    path: '/profile',
    component: UserProfile
  },
  // user - workspace
  userWorkspace: {
    path: '/workspace',
    component: UserWorkspace,

    routes: {
      // user - workspace / editor
      editor: {
        path: '/workspace',
        component: asyncComponent({
          loader: () => import('modules/user/Workspace/Editor'),
          Placeholder: () => <Loader message="Loading workspace" />
        }),
        exact: true
      }
    }
  }
};

export default Object.values(routes);
