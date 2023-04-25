import React, { useRef } from 'react';

export function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null);
  function doSomething() {
    console.log('All the properties and methods of the input', inputRef.current);
  }
  return <input ref={inputRef} type="text" />;
}
