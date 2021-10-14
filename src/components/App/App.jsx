import React, { useEffect } from 'react';
// import "../App.css";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

// Imported Components
import Nav from '../Nav/Nav';
import BottomNavBar from '../BottomNavBar/BottomNavBar';;
import ActiveGoals from '../ActiveGoals/ActiveGoals.jsx';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import Journal from '../Journal/journal';
// import CreateGoal from '../CreateGoal/CreateGoal';
import CreateNewGoal from '../CreateGoal/CreateNewGoal';
import Footer from '../Footer/Footer';
import ViewActiveGoalDetails from '../ActiveGoals/ViewActiveGoalDetails';

import CompletedGoal from '../CompletedGoal/CompletedGoals';
import CompletedGoalCardView from '../CompletedGoal/CompletedGoalCardView';

import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav/>
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/activegoals" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            {/* <AboutPage /> */}
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          
          
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/activegoals"
          >
            
            <div className ="app__page">
              <BottomNavBar />
              <ActiveGoals />
            </div>
            {/* Body of activegoals page component */}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/active_goal_details"
          >
            
            <div className ="app__page">
              <BottomNavBar />
              <ViewActiveGoalDetails />

            </div>
              {/* Body of activegoals page component */}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/creategoal"
            
          >
            
            <div className ="app__page">

              <BottomNavBar />
              <CreateNewGoal />
            </div>
            {/* Body of create goal component */}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/journal"
          >
            
            <div className ="app__page">
              <BottomNavBar />
              <Journal />
            </div>
            {/* Body of journal component */}
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/accomplishedgoals"
          >
            
            <div className ="app__page">

            <BottomNavBar />
            <CompletedGoal />
            </div>
            {/* Body of accomplished goals component */}
          </ProtectedRoute>
          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/view"
          >
            
            <div className ="app__page">

              <BottomNavBar />
              <CompletedGoalCardView />
            
            
           </div>
            
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the login page
              
              <LoginPage />
            
              
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/activegoals" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/user" />
              :
              // Otherwise, show the Landing page
              {/* <LandingPage /> */}
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
