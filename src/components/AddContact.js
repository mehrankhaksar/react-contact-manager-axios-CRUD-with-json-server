import React from 'react';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import api from '../api/contacts';
import { useHistory } from 'react-router-dom';

const AddContact = () => {
  const history = useHistory();

  const [form, setForm] = useState({
    name: '',
    email: '',
  });

  const changeHandler = (e) => {
    const { id, value } = e.target;
    setForm({ ...form, [id]: value });
  };

  const addContact = async (e) => {
    e.preventDefault();
    const request = { id: uuid(), ...form };
    await api.post('contacts', request);
    history.push('/');
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto w-full space-y-4 py-10 px-5">
        <h1 className="text-3xl font-semibold">Add Contact</h1>
        <form onSubmit={addContact} className="w-full space-y-6">
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
