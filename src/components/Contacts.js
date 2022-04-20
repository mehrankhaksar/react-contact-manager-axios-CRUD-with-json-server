import React from 'react';
import { useState } from 'react';
import api from '../api/contacts';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Contact from './Contact';

const Contacts = () => {
  const [contactItems, setContactItems] = useState([]);

  const retrieveContacts = async () => {
    const res = await api.get('contacts');
    return res.data;
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContactItems(allContacts);
    };

    getAllContacts();
  }, []);

  console.log(contactItems);

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full space-y-4 p-5">
        <div className="w-full flex justify-between items-center">
          <h3 className="text-2xl font-medium">Contact List</h3>
          <Link
            to="/addcontact"
            className="text-sm text-white bg-blue-500 py-2 px-3 rounded-sm"
          >
            Add Contact
          </Link>
        </div>
        <ul className="w-full space-y-8 pt-5">
          {contactItems.map((item, idx, contactItems) => (
            <>
              <Contact key={item.id} contactData={item} />
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
