import React from 'react';

const Contact = ({ contactData }) => {
  const { name, email } = contactData;

  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center gap-2">
        <i className="uil uil-user-circle text-5xl text-gray-600"></i>
        <div className="space-y-1 text-xl">
          <h3 className="font-medium">{name}</h3>
          <span className="text-lg">{email}</span>
        </div>
      </div>
      <div>
        <i className="uil uil-trash-alt text-3xl text-red-500"></i>
      </div>
    </div>
  );
};

export default Contact;
