import React from 'react';
import PropTypes from 'prop-types';

import styles from './Filter.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <div className={styles.contacts}>
      <label className={styles.label}>
          Find contacts by name
        <input className={styles.input}
          type="text"
          name="filter"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;