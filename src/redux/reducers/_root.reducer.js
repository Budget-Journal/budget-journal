import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import journal from './journal.reducer';
import completedGoal from './completedGoal.reducer';
import selectGoal from './journalSelectGoal.reducer';
import journalPosts from './journalPosts.reducer';
import activeGoals from './activeGoals.reducer';
import viewGoalDetails from './viewGoalDetails.reducer';
import lastGoal from './lastGoal.reducer';
import budgetTableReducer from './budgetTableReducer';
import totalGoalCost from './totalGoalCost.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in

  // Journal related reducers
  journal, // will hold data relating to the journal feed
  journalPosts, // will hold all journal posts related to a specific goal that is active  
  selectGoal,  // will hold the current active goals that will be shown on the dropdown on the journal post


  completedGoal, // will hold fetch goals that have been marked completed (TRUE in database)



  
  activeGoals, // will hold all goals that are set to false via db
  selectGoal,  // will gold the current active goals that will be shown on the dropdown on the journal post

  viewGoalDetails, // will hold the goal data of the goal that is being viewed (after clicking view button)
  budgetTableReducer, // will hold a goals budget table that is displayed when viewed is clicked
  
  lastGoal, //will grab the most recent goal that was entered into the database for the budget page
  totalGoalCost // will get the total cost of a goal

});

export default rootReducer;
