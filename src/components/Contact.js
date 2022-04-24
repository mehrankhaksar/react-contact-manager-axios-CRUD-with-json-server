import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editContact, removeContact } from '../redux/contacts/contactsActions';

const Contact = ({ contactData }) => {
  const { id, img, name, email } = contactData;

  const dispatch = useDispatch();

  const fileInputRef = useRef();

  const [edit, setEdit] = useState(false);

  const [editForm, setEditForm] = useState({
    img: img,
    name: name,
    email: email,
  });

  const changeHandler = (e) => {
    const { id, value, files } = e.target;
    if (id === 'img') {
      if (files[0].type.substr(0, 5) === 'image') {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onloadend = () => {
          setEditForm({ ...editForm, [id]: reader.result });
        };
      } else {
        alert('Invalid Type!');
      }
    } else {
      setEditForm({ ...editForm, [id]: value });
    }
  };

  return (
    <div className="w-full grid grid-cols-3 place-items-center">
      <div className="col-span-2 w-full flex items-center gap-3">
        <div className="relative">
          {editForm.img ? (
            <img
              src={editForm.img}
              alt="Profile"
              className="w-20 h-16 object-contain rounded-full shadow-md"
            />
          ) : (
            <i className="uil uil-user-circle text-7xl text-gray-600"></i>
          )}
          {edit && (
            <>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  fileInputRef.current.click();
                }}
                className="w-7 h-7 flex justify-center items-center absolute right-0 bottom-0 bg-blue-500 rounded-full cursor-pointer z-10"
              >
                <i className="uil uil-image-plus text-lg text-white"></i>
              </button>
              <input
                type="file"
                id="img"
                className="hidden"
                ref={fileInputRef}
                onChange={changeHandler}
              />
              <button
                className="w-6 h-6 flex justify-center items-center absolute bottom-0 left-0 bg-red-500 rounded-full cursor-pointer z-10"
                onClick={() => setEditForm({ ...editForm, img: '' })}
              >
                <i className="uil uil-multiply text-white"></i>
              </button>
            </>
          )}
        </div>
        {edit ? (
          <div className="space-y-2 text-lg">
            <input
              type="text"
              id="name"
              value={editForm.name}
              onChange={changeHandler}
              className="w-full py-1 px-2 border-2 border-blue-500 rounded"
            />
            <input
              type="email"
              id="email"
              value={editForm.email}
              onChange={changeHandler}
              className="w-full py-1 px-2 border-2 border-blue-500 rounded"
            />
          </div>
        ) : (
          <div className="col-span-2 w-full space-y-1 text-xl whitespace-nowrap overflow-x-scroll">
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
