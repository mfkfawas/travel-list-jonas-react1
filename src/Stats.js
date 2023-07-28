export default function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numOfItems = items.length;
  const numPackedItems = items.filter(item => item.packed === true).length;
  const percentOfPackedItems = Math.round((numPackedItems / numOfItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentOfPackedItems === 100
          ? "You got everything! Ready to go ✈️"
          : ` 💼 You have ${numOfItems} items on your list, and you already packed ${numPackedItems} (${percentOfPackedItems}%)`}
      </em>
    </footer>
  );
}
