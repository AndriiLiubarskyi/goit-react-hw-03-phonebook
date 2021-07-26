import React, {Component} from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import styles from './ContactAddForm.module.css';

class ContactAddForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const {name, value} = e.currentTarget;
    this.setState({ id: shortid.generate(), [name]: value });
  };

  findName = contactName => {
    return this.props.contacts.some(({ name }) => name === contactName);
  };

  handleSubmit = e => {
    e.preventDefault();
    const {name} = this.state;
    if (this.findName(name)) {
      alert(`${name} is already in contacts!`);
      return;
    };
    this.props.onSubmit(this.state);
    this.cleaningForm();
  };

  cleaningForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <div className={styles.addForm}>
        <form onSubmit={this.handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Name
            <input className={styles.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
              required            value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label className={styles.label}>
            Number
            <input className={styles.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
              required
              value={this.state.number}
              onChange={this.handleChange}
            />
          </label>
          <button className={styles.buttonAdd} type="submit">
            Add contact
          </button>
        </form>
      </div>
    )
  };
};

ContactAddForm.propTypes = {
    contacts: PropTypes.array.isRequired,
    onSubmit: PropTypes.func.isRequired,
};


export default ContactAddForm;