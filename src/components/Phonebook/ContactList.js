import React from 'react';
import PropTypes from 'prop-types';
import ContactItem from './ContactItem';

const ContactList = ({contacts, onDeleteContact}) => (
  <ul>
    {contacts.map(({ id, name, number }) => (
      <ContactItem
        key={id}
        id={id}
        name={name}
        number={number}
        onDeleteContact={onDeleteContact}
      />
    ))}
  </ul>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func,
};

export default ContactList;