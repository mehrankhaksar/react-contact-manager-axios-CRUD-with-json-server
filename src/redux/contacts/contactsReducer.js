import {
  fetchContactsRequest,
  fetchContactsSuccess,
  fetchContactsFailure,
  addContactRequest,
  isContactExisted,
  addContactSuccess,
  addContactFailure,
  removeContactRequest,
  removeContactSuccess,
  removeContactFailure,
  editContactRequest,
  editContactSuccess,
  editContactFailure,
} from './contactsTypes';
import { v4 as uuid } from 'uuid';

const initialState = {
  loading: false,
  contacts: [],
  errMsg: '',
  isExisted: null,
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
    case addContactRequest:
      return {
        ...state,
        loading: true,
      };
    case isContactExisted:
      return {
        ...state,
        isExisted: action.payload,
      };
    case addContactSuccess:
      if (!state.contacts.find((contact) => contact.id === action.payload.id)) {
        state.contacts.push({ id: uuid(), ...action.payload });
      }

      return {
        ...state,
        loading: false,
        contacts: [...state.contacts],
        isExisted: null,
      };
    case addContactFailure:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };
    case removeContactRequest:
      return {
        ...state,
        loading: true,
      };
    case removeContactSuccess:
      const newContacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );

      return {
        ...state,
        loading: false,
        contacts: [...newContacts],
      };
    case removeContactFailure:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };
    case editContactRequest:
      return {
        ...state,
        loading: true,
      };
    case editContactSuccess:
      const iIdx = state.contacts.findIndex(
        (contact) => contact.id === action.payload.id
      );

      state.contacts[iIdx] = action.payload;

      return {
        ...state,
        loading: false,
      };
    case editContactFailure:
      return {
        ...state,
        loading: false,
        errMsg: action.payload,
      };
    default:
      return state;
  }
};

export default contactsReducer;
