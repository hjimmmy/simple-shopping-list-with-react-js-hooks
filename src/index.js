import React, { useState, useReducer } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, action.payload];
    case "remove":
      return state.filter((td) => action.payload !== td.id);
    default:
      return state;
  }
}

const AppFunction = () => {
  const [value, setValue] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);
  console.log({ todos });
  const handleChange = (e) => {
    const txt = e.target.value;
    if (!txt) return;
    setValue(txt);
  };
  const addItem = () => {
    const item = {
      id: new Date().toString(),
      value
    };
    dispatch({ type: "add", payload: item });
    setValue("");
  };

  const removeItem = (id) => {
    dispatch({ type: "remove", payload: id });
  };

  return (
    <div className="App" style={{ padding: "20px 40px" }}>
      <h3>Simple Shopping List</h3>
      <input
        type="text"
        name="ProductName"
        value={value}
        onChange={handleChange}
        placeholder="add products here"
        required
      />
      <button className="btn btn-info" onClick={addItem}>
        Add
      </button>
      <br />
      <ul className="list-group mt-3 mx-5">
        {todos.map((td) => (
          <li
            key={td.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {td.value}
            <button
              className="btn btn-warning"
              onClick={removeItem.bind(this, td.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

class App extends React.Component {
  state = {
    todos: [],
    todo: ""
  };
  handleChange = (e) => {
    this.setState({ todo: e.target.value });
  };
  addItem = () => {
    if (!this.state.todo) return;
    const newItem = {
      id: new Date().toString(),
      value: this.state.todo
    };
    this.setState((state) => ({
      todos: state.todos.concat(newItem),
      todo: ""
    }));
  };
  removeItem = (id) => {
    this.setState((state) => ({
      todos: state.todos.filter((td) => td.id !== id)
    }));
  };
}

const rootElement = document.getElementById("root");
ReactDOM.render(<AppFunction />, rootElement);
