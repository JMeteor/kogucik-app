import { MouseEventHandler, ReactNode, useState } from 'react';
import styles from './Button.module.css';

interface ButtonProps {
  children: ReactNode;
  variant: 'primary' | 'secondary';
  onClick: MouseEventHandler<HTMLButtonElement>;
}

function Button({ children, variant, onClick }: ButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setLoading(true);
    onClick(event);
    setLoading(false);
  };

  return (
    <button
      className={`${styles.button} ${styles[`button__${variant}`]} text-white`}
      type="button"
      onClick={handleClick}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
}

export default Button;
