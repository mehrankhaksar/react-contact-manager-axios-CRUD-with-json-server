import { combineReducers } from 'redux';
import contactsReducer from './contacts/contactsReducer';

const reducers = combineReducers({
  contacts: contactsReducer,
});

export default reducers;
