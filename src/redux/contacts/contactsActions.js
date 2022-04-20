import api from '../../api/contacts';

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

export const addContact = (contact) => {
  return {
    type: 'ADD_CONTACT',
    payload: contact,
  };
};

export const removeContact = (contact) => {
  return {
    type: 'ADD_CONTACT',
    payload: contact,
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
