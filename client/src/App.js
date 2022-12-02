
import './App.css';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useState } from 'react';
import React, { useRef } from 'react'

function App() {
  const [textInput, setTextInput] = useState('');
  const [textvalue, settextvalue] = useState('');

  function refreshPage() {
    window.location.reload(false);
  }
    const handleTextInputChange = event => {
        setTextInput(event.target.value);
    };
  function handleSubmit(e) {
    axios.post('http://localhost:4001/api/user/Token/'+ textInput).then((data) => {
      console.log(data.data.token,"lplpl");
      settextvalue(data.data.token);
    })
    .catch((err) => {
        alert("Please Type Somthing");
        <form>
            <input type="button" value="Click Me" onclick={window.location.href = "/"} />
        </form>
    });
}
  return (
        <Box
      // component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <h1>Token Generator</h1>
      <div><TextField id="outlined-basic" className='textfield' label="Type Hear" value= {textInput} onChange= {handleTextInputChange}/></div>
      <div><Button variant="contained"  onClick={handleSubmit} >Click</Button></div>
      <div><TextField
          className='textfield'
           id="outlined-multiline-static"
          label="Token"
          multiline
          rows={6}
          defaultValue="Default Value"
          variant="filled"  
          value= {textvalue}
        /></div>
        <div><Button variant="contained" onClick={refreshPage}>Refresh</Button></div>
    </Box>
  );
}

export default App;
