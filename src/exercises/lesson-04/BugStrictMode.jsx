// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId); //cleanup function; to clear the old timer so two timers don't run simultaneously
    };
  }, []);

  return (
    <div>
      <h2>StrictMode Timer Bug</h2>
      <p>Count: {count}</p>
    </div>
  );
}
// Write your explanation of how StrictMode helps us catch this bug
/* 
-Strict Mode runs effects twice in development to help detect bugs.
-Without a cleanup function, multiple intervals are created, causing the count to increase faster than expected. 
-The cleanup function clears the previous interval beore a new one is created, 
  this ensures that only one interval runs at a time.

*/
