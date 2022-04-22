import api from '../../api/contacts';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export const fetchContactsRequest = () => {
  return {
    type: 'FETCH_CONTACTS_REQUEST',
  };
};

export const fetchContactsSuccess = (contacts) => {
  return {
    type: 'FETCH_CONTACTS_SUCCESS',
    payload: contacts,
  };
};

export const fetchContactsFailure = (errMsg) => {
  return {
    type: 'FETCH_CONTACTS_FAILURE',
    payload: errMsg,
  };
};

export const addContactRequest = () => {
  return {
    type: 'ADD_CONTACT_REQUEST',
  };
};

export const addContactSuccess = (contact) => {
  return {
    type: 'ADD_CONTACT_SUCCESS',
    payload: contact,
  };
};

export const addContactFailure = (errMsg) => {
  return {
    type: 'ADD_CONTACT_FAILURE',
    payload: errMsg,
  };
};

export const removeContactRequest = () => {
  return {
    type: 'REMOVE_CONTACT_REQUEST',
  };
};

export const removeContactSuccess = (id) => {
  return {
    type: 'REMOVE_CONTACT_SUCCESS',
    payload: id,
  };
};

export const removeContactFailure = (errMsg) => {
  return {
    type: 'REMOVE_CONTACT_FAILURE',
    payload: errMsg,
  };
};

export const editContactRequest = () => {
  return {
    type: 'EDIT_CONTACT_REQUEST',
  };
};

export const editContactSuccess = (id) => {
  return {
    type: 'EDIT_CONTACT_SUCCESS',
    payload: id,
  };
};

export const editContactFailure = (errMsg) => {
  return {
    type: 'EDIT_CONTACT_FAILURE',
    payload: errMsg,
  };
};

export const fetchContacts = () => {
  return (dispatch) => {
    dispatch(fetchContactsRequest());
    api
      .get('contacts')
      .then((res) => {
        const contacts = res.data;
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(fetchContactsFailure(errMsg));
      });
  };
};

export const addContact = (contact) => {
  return (dispatch) => {
    dispatch(addContactRequest());
    const request = {
      id: uuid(),
      ...contact,
    };
    api
      .post('contacts', request)
      .then((res) => {
        const contact = res.data;
        dispatch(addContactSuccess(contact));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(addContactFailure(errMsg));
      });
  };
};

export const removeContact = (id) => {
  return (dispatch) => {
    dispatch(removeContactRequest());
    api
      .delete(`contacts/${id}`)
      .then(() => {
        dispatch(removeContactSuccess(id));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(removeContactFailure(errMsg));
      });
  };
};

export const editContact = (id, editForm) => {
  return (dispatch) => {
    dispatch(editContactRequest());
    api
      .put(`contacts/${id}`, editForm)
      .then((res) => {
        const editedContact = res.data;
        dispatch(editContactSuccess(editedContact));
      })
      .catch((err) => {
        const errMsg = err.message;
        dispatch(removeContactFailure(errMsg));
      });
  };
};
