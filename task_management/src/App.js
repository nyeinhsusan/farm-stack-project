import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import TodoView from "./components/TodoView";

const App = () => {
  const [todolist, setTodolist] = useState([{}]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  //Read all the todos

  // const fetchdata = async()=>{
  //   const res = axios.get('http://localhost:8000/api/todo')
  //  console.log(res);
  //  console.log(res.data)
  //setTodolist(res.data)
  // }                                                                          
  // useEffect(()=>{
  //  fetchdata()
  // },[])

  useEffect(() => {
    axios.get("http://localhost:8000/api/todo").then((res) => {
      setTodolist(res.data);
    });
  }, []);
  //console.log(todolist);

  const addTodoHandler = () => {
    axios
      .post("http://localhost:8000/api/todo/", {
        title: title,
        description: description,
      })
      // .then((res) => console.log(res));
      .then((res) => {
        setTodolist([...todolist, res.data]);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5 row">
      <div className="col-6">
        <h3 className="bg-success-subtle text-dark border border-primary text-center mt-3">
          Task Management
        </h3>
        <h4 className="bg-success-subtle text-dark border border-primary text-center mt-3 mb-3">
          FARM Stack Developement
        </h4>
        <div className="m-3 p-3 mt-3 mb-3 ">
          <input
            type="text"
            className="form-control mb-3 border-primary text-dark"
            placeholder="title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            className="form-control border-primary text-dark"
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary mb-3 border-dark"
            type="button"
            onClick={() => addTodoHandler()}
          >
            Task Add
          </button>
        </div>
        <h3 className="bg-success-subtle text-dark border border-primary  mt-3 mb-3 text-center">
          Your Task
        </h3>
    <div>
    <TodoView todolist={todolist}/>
    </div>
        <h5 className="bg-warning-subtle  text-dark border border-dark  mt-3 text-center">
          copyright@by nyeinhsusan
        </h5>
      </div>
    </div>
  );
};

export default App;
