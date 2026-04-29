// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render

import { useRef } from 'react';

export default function FindCorrectHook() {
  let clickCount = useRef(0);

  const buttonRef = useRef();

  function handleClick() {
    clickCount.current++;
  }

  return (
    <div>
      <h2>useRef vs useState Decision</h2>
      <button ref={buttonRef} onClick={handleClick}>
        {clickCount.current} Clicks
      </button>
    </div>
  );
}
