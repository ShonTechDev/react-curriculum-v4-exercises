function SnackList() {
  const snacks = [
    { name: 'Cake', rank: 3 },
    { name: 'Cinnamon Rolls', rank: 1 },
    { name: 'Homemade Cookies', rank: 2 },
    { name: 'Popcorn', rank: 4 },
  ];

  const sortedSnacks = snacks.toSorted((a, b) => a.rank - b.rank);

  return (
    <ol>
      {sortedSnacks.map((snack) => (
        <li key={snack.rank}>{snack.name}</li>
      ))}
    </ol>
  );
}

export default SnackList;
