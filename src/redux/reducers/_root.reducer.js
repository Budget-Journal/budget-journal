import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import journal from './journal.reducer';
import goal from './goal.reducer';
import details from './cardDetails.reducer';
import selectGoal from './journalSelectGoal.reducer';
import activePosts from './activeJournalPosts.reducer';
import activeGoals from './activeGoals.reducer';



// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  journal, // will hold data relating to the journal feed
  goal, // will hold data relating goals
  details, // will hold goal and budget details based on a specific goal
  selectGoal,  // will hold the current active goals that will be shown on the dropdown on the journal post
  activePosts, // will hold all journal posts related to a specific goal that is active
  activeGoals // will hold all goals that are set to false via db
});

export default rootReducer;
