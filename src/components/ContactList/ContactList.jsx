import './ContactList.css';
import { useDispatch, useSelector } from 'react-redux';

import { getFilter, getContacts } from '../../redux/selectors';
import { deleteContact } from '../../redux/contactsSlice';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const getFilteredContacts = (contacts, filter) => {
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    }
  };

  const filteredContacts = getFilteredContacts(contacts, filter);

  const delContact = id => {
    dispatch(deleteContact(id));
  };

  return (
    <ul>
      {filteredContacts.map(n => (
        <li className="item" key={n.id}>
          {n.name}: {n.number}
          <button
            className="deleteBtn"
            type="submit"
            onClick={() => delContact(n.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
