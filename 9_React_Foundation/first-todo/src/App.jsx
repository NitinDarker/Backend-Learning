import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([{
    title: "Go to gym",
    description: "Body bana le madarchod",
    done: false
  }]);

  function appendTodo() {
    const titleInput = document.getElementById("titleInput").value;
    const descInput = document.getElementById("descInput").value;
    const obj = {
      title: titleInput,
      description: descInput,
      done: false
    }

    setTodoList((todoList) => {
      [...todoList, obj];
    })
  }

  return (
    <>
      <h1>TODO </h1>
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div> */}
      <div>
        <input id="titleInput" className="inputBox" placeholder="Enter Title"></input>
        <input id="descInput" className="inputBox" placeholder="Enter Description"></input>
        <button onClick={appendTodo}>Add Todo</button>
      </div>
      <div className="todoContainer">
        {todoList.map((todo, index) => (
          <div key={index}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
