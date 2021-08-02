import React, { Component } from 'react';
import ContactAddForm from './components/Phonebook/ContactAddForm';
import ContactList from './components/Phonebook/ContactList';
import Filter from './components/Phonebook/Filter';
import shortid from 'shortid';


class App extends Component {
  state = {
    contacts: [
    ],
    filter: '',
  };

componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    };
  };

  componentDidUpdate(prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    };
  };

  addTodo = text => {
    const contact = {
      id: shortid.generate(),
      text,
      completed: false,
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

   formSubmitHandler = ({ id, name, number }) => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, { id, name, number }],
    }));
  };

 changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  

  render() {  
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactAddForm contacts={contacts} onSubmit={this.formSubmitHandler}/>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter}/>
        <ContactList
          contacts={visibleContacts}
          onChange={this.changeFilter}
          onDeleteContact={this.deleteContact}/>
      </div>
    )
  };
};

export default App;