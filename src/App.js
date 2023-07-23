export default function App() {
  <div className="app">
    <Logo />
    <Form />
    <PackingList />
    <Stats />
  </div>;
}

function Logo() {
  return <h1>FAR AWAY</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h1>What do you need for your trip?</h1>
    </div>
  );
}

function PackingList() {
  <div className="list">LIST</div>;
}

function Stats() {
  return (
    <footer>You have x items on your list and you already packed X(x%)</footer>
  );
}
