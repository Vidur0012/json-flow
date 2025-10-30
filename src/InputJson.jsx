import { useState } from 'react';
import styles from './InputWithButton.module.scss';

export function InputWithButton({
  placeholder = 'Paste your JSON here...',
  buttonText = 'Visualize',
  onVisualize
}) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onVisualize === 'function') 
      onVisualize(value);
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <label className={styles.label}>
        <span className={styles.srOnly}>JSON input</span>
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="json input"
        />
      </label>

      <button type="submit" className={styles.button}>
        {buttonText}
      </button>
    </form>
  );
}
