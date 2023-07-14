import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// const INITIAL_STATE = {
//   contacts: [
//     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//   ],
//   filter: '',
// };

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredList = value => {
    setFilter(value);
  };

  const addNewName = (name, number) => {
    setContacts([
      ...contacts,
      {
        id: nanoid(),
        name,
        number,
      },
    ]);
  };

  const isNameOnList = (name, number) => {
    const onlyNames = contacts.map(contact => contact.name);
    onlyNames.includes(name)
      ? alert(name + ' is already in contacts')
      : addNewName(name, number);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filteredContacts = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  //componentDidMount
  useEffect(() => {
    setContacts(JSON.parse(localStorage.getItem('Contacts')));
  }, []);

  //componentDidUpdate
  useEffect(() => {
    localStorage.setItem('Contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="container">
      <h1>Phonebook</h1>
      <ContactForm onSubmit={isNameOnList} />

      <h2>Contacts</h2>
      <Filter contacts={contacts} filteredList={filteredList} />
      <ContactList
        deleteContact={deleteContact}
        filteredContacts={filteredContacts()}
      />
    </div>
  );
};

App.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  filter: PropTypes.string,
};

export default App;
