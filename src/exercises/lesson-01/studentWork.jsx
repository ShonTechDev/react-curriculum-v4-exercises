//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  //add variables here..
  const myName = 'Shonta';
  const myAge = 39;
  const myLocation = 'United States';

  const myHobbies = ['reading', 'singing', 'web development'];

  return (
    <div>
      <h1>About Me</h1>
      <p>
        Hello! I'm {myName}, I'm {myAge}, and I'm excited to be a student in
        Code The Dream's React class. I'm motivated and happy to learn all I
        can!
      </p>
      <h2>My Hobbies</h2>
      <ul>
        {myHobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
