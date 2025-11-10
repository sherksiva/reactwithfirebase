import React from "react";
import Todo from "./Todo";
import { useState, useEffect } from "react";
import { Input, Stack, Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./todos.css";
import { auth, db,  } from "../firebase";

function Todos() {
  const ariaLabel = { "aria-label": "description" };

  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const [photourl, setPhotourl] = useState("");
  const [currentUser, setCurrentUser] = useState ("");
  const [user, setUser] = useState(null);
  const imageStyle = {
	marginTop: '20px'
       };

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
	if(auth.currentUser && auth.currentUser.photoURL) {
	   setCurrentUser(auth.currentUser);
           setPhotourl(auth.currentUser.photoURL);
        }
        db.collection(auth.currentUser.uid)
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setTodos(
              snapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  todoText: doc.data().todoText,
                  timestamp: doc.data().timestamp,
                };
              })
            );
          });
      } else {
        // user logged out
	setCurrentUser("");
	setPhotourl("");
      }
    });
  }, [user]);

  const addTodo = (e) => {
    e.preventDefault();
    db.collection(auth.currentUser.uid).doc(input).set({
      todoText: input,
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };

  const deleteTodo = (id) => {
    try {
      db.collection(auth.currentUser.uid).doc(id).delete();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="todosSection">

{photourl && 
	<>
	<img src={photourl} alt="loggedInUser" style={imageStyle} /> 
	<h4>{currentUser.email}</h4>
	</>
}
     {/* <form>
        <Input
          name="todoname"
          className="todoInput"
          placeholder="Add a todo"
          inputProps={ariaLabel}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button type="submit" onClick={addTodo} variant="outlined">
          Add
        </Button>
      </form>

      {todos.map((todo) => {
        return (
          <Todo
            key={todo.id}
            todoText={todo.todoText}
            timestamp={todo.timestamp}
            deleteTodo={deleteTodo}
            todoID={todo.id}
          />
        );
      })} */}
    </div>
  );
}

export default Todos;
