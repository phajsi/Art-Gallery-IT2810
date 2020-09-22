import React, {useState, useEffect, useContext} from 'react';
import './components.css'
import {useLocalStorage} from "../hooks/useLocalStorage"
import ThemeContext from "../contexts/ThemeContext";

function DisplayPoem() {

  const theme = useContext(ThemeContext);

  const [listState, setListState] = useState()
  const [poem, getPoem] = useLocalStorage("poem", null)

  useEffect( () => {
    const result = fetch('https://poetrydb.org/linecount/10')
     .then(res => res.json())
     .then((data: any) =>{
        setListState(data);
     })
   }, []
   )

   const handleClick = () => {
       const randomNumb = Math.floor(Math.random()*listState.length)
       getPoem(listState[randomNumb]);
     }

  return (
    <div style={theme}>
      <button onClick = {handleClick} > generate poem </button>
    { !poem ?
      ( <div> loading... </div> ) :
      (
        <div className="content">
        <p className="poem_title"> {poem.title} </p>
          {poem.lines.map((item : any, index:any) => {
           return <p key={index}> {item } </p> })}
        <p className="poem_author"> {poem.author} </p>

        </div>
      )}
    </div>
)
}
export {DisplayPoem} ;
