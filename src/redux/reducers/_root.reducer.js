import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import journal from './journal.reducer';
import completedGoal from './completedGoal.reducer';
import details from './cardDetails.reducer';
import selectGoal from './journalSelectGoal.reducer';
import journalPosts from './journalPosts.reducer';
import activeGoals from './activeGoals.reducer';
import activeGoalDetails from './viewActiveGoalDetails.reducer';
import lastGoal from './lastGoal.reducer';
import activeGoalBudgetReducer from './activeGoalBudget.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  journal, // will hold data relating to the journal feed
  completedGoal, // will hold data relating to completed goals
  details, // will hold goal and budget details based on a specific goal
  selectGoal,  // will hold the current active goals that will be shown on the dropdown on the journal post
  journalPosts, // will hold all journal posts related to a specific goal that is active
  activeGoals, // will hold all goals that are set to false via db
  selectGoal,  // will gold the current active goals that will be shown on the dropdown on the journal post
  activeGoalDetails, // will hold information pertaining to an active goal
  lastGoal, // will grab the most recent goal that was entered into the database for the budget page
  activeGoalBudgetReducer, // will hold a goals budget table that is displayed when viewed is clicked on RenderedCards
});

export default rootReducer;
