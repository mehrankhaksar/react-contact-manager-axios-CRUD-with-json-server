import React, { useRef } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addContact } from '../redux/contacts/contactsActions';

const AddContact = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const fileInputRef = useRef();

  const [form, setForm] = useState({
    img: '',
    name: '',
    email: '',
  });

  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === 'img') {
      if (files[0].type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setForm({ ...form, [id]: reader.result });
        };
      } else {
        alert('Invalid Type!');
      }
    } else {
      setForm({ ...form, [id]: value });
    }
  };

  const addContactHandler = (e) => {
    e.preventDefault();
    dispatch(addContact(form));
    history.push('/');
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full space-y-4 py-10 px-5">
        <h1 className="text-3xl font-semibold">Add Contact</h1>
        <form onSubmit={addContactHandler} className="w-full space-y-6">
          {form.img ? (
            <img
              src={form.img}
              alt="Profile"
              className="w-28 h-28 object-contain rounded-full"
              onClick={() => setForm({ img: '' })}
            />
          ) : (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
                className="w-28 h-28 bg-blue-500 rounded-full cursor-pointer"
              >
                <i className="uil uil-image-plus text-4xl text-white"></i>
              </button>
              <input
                type="file"
                id="img"
                className="hidden"
                accept="image/*"
                ref={fileInputRef}
                onChange={changeHandler}
              />
            </>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-lg font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={form.name}
              placeholder="Name"
              className="w-full py-2 px-4 border-2 rounded-md"
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={form.email}
              placeholder="Email"
              className="w-full py-2 px-4 border-2 rounded-md"
              onChange={changeHandler}
            />
          </div>
          <button
            type="submit"
            className="text-lg font-semibold text-white bg-blue-500 py-2 px-4 rounded-sm"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
