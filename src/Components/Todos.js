import React from "react";
import { useState, useEffect } from "react";
import "./todos.css";
import { auth } from "../firebase";

function Todos() {
  const [photourl, setPhotourl] = useState("");
  const [currentUser, setCurrentUser] = useState ("");
  const [user, setUser] = useState(null);
  const imageStyle = {
	marginTop: '20px'
       };

  useEffect(() => {

    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
	if(auth.currentUser && auth.currentUser.photoURL) {
	   setCurrentUser(auth.currentUser);
           setPhotourl(auth.currentUser.photoURL);
        }
      } else {
        // user logged out
	setCurrentUser("");
	setPhotourl("");
      }
    });
  }, [user]);

 
  return (
    <div className="todosSection">

{photourl && 
	<>
	<img src={photourl} alt="loggedInUser" style={imageStyle} /> 
	<h4>{currentUser.email}</h4>
	</>
}
    </div>
  );
}

export default Todos;
