import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from '../redux/contacts/contactsActions';
import { Link } from 'react-router-dom';
import Contact from './Contact';

const Contacts = () => {
  const contactsState = useSelector((state) => state.contacts);
  const { contacts } = contactsState;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full p-5">
        <div className="w-full flex justify-between items-center pb-5 border-b-2">
          <h3 className="text-2xl font-medium">Contact List</h3>
          <Link
            to="/addcontact"
            className="text-white bg-blue-500 py-2 px-3 rounded shadow-md"
          >
            Add Contact
          </Link>
        </div>
        <ul className="w-full space-y-8 pt-5">
          {contacts.map((contact, idx, contactItems) => (
            <>
              <Contact key={contact.id} contactData={contact} />
              <div
                className={`w-full h-0.5 ${
                  idx + 1 === contactItems.length ? 'hidden' : 'block'
                } bg-black bg-opacity-20`}
              ></div>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Contacts;
