import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([
    { id: 1, description: "Passports", quantity: 2, packed: false },
    { id: 2, description: "Socks", quantity: 12, packed: false }
  ]);

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems(items =>
      items.map(item =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleDeleteAllItems() {
    const confirmed = window.confirm('Are you sure you want to delete all items?')

    if(confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form setItems={setItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onDeleteAllItems={handleDeleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form({ setItems }) {
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

function PackingList({ items, onDeleteItem, onToggleItem, onDeleteAllItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  // alphabetical sorting
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description
      .localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map(item => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="input">sort by input order</option>
          <option value="description">sort by description</option>
          <option value="packed">sort by packed status</option>
        </select>
        <button onClick={onDeleteAllItems}>clear list</button>
      </div>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => onToggleItem(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>&times;</button>
    </li>
  );
}

function Stats({ items }) {
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



