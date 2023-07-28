import { useState } from "react";

export default function Form({ setItems }) {
  const [description, setDescription] = useState("");
  const [itemsCount, setItemsCount] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = {
      description,
      quantity: itemsCount,
      id: Date.now(),
      packed: false
    };
    // adding new Item
    setItems(i => [...i, newItem]);

    setDescription("");
    setItemsCount(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip?</h3>
      <select
        value={itemsCount}
        onChange={e => setItemsCount(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
