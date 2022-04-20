import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editContact, removeContact } from '../redux/contacts/contactsActions';

const Contact = ({ contactData }) => {
  const { id, name, email } = contactData;

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const [editForm, setEditForm] = useState({
    name: name,
    email: email,
  });

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setEditForm({ ...editForm, [id]: value });
  };

  return (
    <div className="w-full grid grid-cols-3 place-items-center">
      <div className="col-span-2 w-full flex items-center gap-2">
        <i className="uil uil-user-circle text-5xl text-gray-600"></i>
        {edit ? (
          <div className="space-y-2 text-lg">
            <input
              type="text"
              id="name"
              value={editForm.name}
              onChange={changeHandler}
              className="py-1 px-2 border-2 border-blue-500 rounded"
            />
            <input
              type="email"
              id="email"
              value={editForm.email}
              onChange={changeHandler}
              className="py-1 px-2 border-2 border-blue-500 rounded"
            />
          </div>
        ) : (
          <div className="space-y-1 text-xl whitespace-nowrap overflow-x-scroll">
            <h3 className="font-medium">{name}</h3>
            <span className="text-lg">{email}</span>
          </div>
        )}
      </div>
      <div className="col-span-1 w-full flex justify-end items-center gap-2">
        <div className="text-3xl cursor-pointer" onClick={() => setEdit(!edit)}>
          {edit ? (
            <i
              className="uil uil-check text-green-500"
              onClick={() => dispatch(editContact(id, editForm))}
            ></i>
          ) : (
            <i className="uil uil-edit"></i>
          )}
        </div>
        <i
          className="uil uil-trash-alt text-3xl text-red-500 cursor-pointer"
          onClick={() => dispatch(removeContact(id))}
        ></i>
      </div>
    </div>
  );
};

export default Contact;
