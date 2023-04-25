import { useState } from 'react';
// import './Alert.css';
import styles from './Alert.module.css';

type Props = {
  type?: string;
  heading: string;
  children: React.ReactNode;
  closable?: boolean;
  onClose?: () => void;
};

export function Alert({ type, heading, children, closable, onClose }: Props) {
  const [visible, setVisible] = useState<boolean>(true);
  if (!visible) return <div>Gone!</div>;

  function handleCloseClick() {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  }

  return (
    <div
      className={`inline-flex flex-col text-left px-4 py-3
    rounded-md border-1 border-transparent
    ${type === 'warning' ? 'text-amber-900' : 'text-teal-900'}
    ${type === 'warning' ? 'bg-violet-50' : 'bg-teal-50'}`}
    >
      {/* {`${styles.container} ${styles[type]}`} */}
      <div className="flex items-center mb-1">
        <span
          role="img"
          aria-label={type === 'warning' ? 'Warning' : 'Information'}
          className="w-7"
        >
          {type === 'warning' ? '⚠' : 'i'}
        </span>
        <span className="font-bold">{heading}</span>
        {closable && (
          <button
            aria-label="Close"
            onClick={handleCloseClick}
            className="border-none bg-transparent ml-auto cursor-
      pointer"
          >
            <span role="img" aria-label="Close">
              ❌
            </span>
          </button>
        )}
      </div>

      <div className="ml-7 text-black">{children}</div>
    </div>
  );
}
