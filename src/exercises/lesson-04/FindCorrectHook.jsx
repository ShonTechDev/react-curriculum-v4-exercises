import { useRef } from 'react';

// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render

export default function FindCorrectHook() {
  const clickCount = useRef(0);
  const buttonRef = useRef();

  function handleClick() {
    clickCount.current++;
    buttonRef.current.textContent = `${clickCount.current} Clicks`;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button ref={buttonRef} onClick={handleClick}>
        0 Clicks
      </button>
    </div>
  );
}
