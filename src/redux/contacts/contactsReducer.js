import {
  fetchContactsRequest,
  addContact,
  removeContact,
  fetchContactsSuccess,
  fetchContactsFailure,
} from './contactsTypes';
import { v4 as uuid } from 'uuid';

const initialState = {
  loading: false,
  contacts: [],
  errMsg: '',
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchContactsRequest:
      return {
        ...state,
        loading: true,
      };
    case fetchContactsSuccess:
      return {
        ...state,
        loading: false,
        contacts: action.payload,
      };
    case fetchContactsFailure:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };
    case addContact:
      if (!state.contacts.find((contact) => contact.id === action.payload.id)) {
        state.contacts.push({ id: uuid(), ...action.payload });
      }
      return {
        ...state,
      };
    case removeContact:
      const newContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload.id
      );
      return {
        ...state,
        contacts: [...newContacts],
      };
    default:
      return state;
  }
};

export default contactsReducer;
