import React, { useState } from 'react'

export default function TextForm(props) {
  const [text, setText] = useState('');
  const handleUpperCase = () =>{
    //console.log('uppercase clicked')
    let newText = text.toUpperCase();
    setText(newText)
    props.showAlert("Converted to Uppercase", "success");
  }

  const handleLowerCase = () =>{
    //console.log('lowercase clicked')
    let newText = text.toLowerCase();
    setText(newText)
    props.showAlert("Converted to Lowercase", "success");
  }

  const handleClearText = () =>{
    //console.log('Text clear')
    let newText = '';
    setText(newText)
  }

  const handleinverseclick = () => {
    console.log("inverse click is triggered");
    let newtext = "";
    for (let i = text.length - 1; i >= 0; i--) {
      newtext += text[i];
    }
    setText(newtext);
  }

  const copyToClipboard = () => {
    const textElement = document.getElementById("myBox");
    if (textElement) {
      const text = textElement.innerText || textElement.value;
      navigator.clipboard.writeText(text)
        // .then(() => alert("Copied to clipboard!"))
        // .catch(err => console.error("Failed to copy: ", err));
    } else {
      console.error("Element with ID 'myBox' not found");
    }
    props.showAlert("Copied to Clipboard", "success");
  };
  
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      setText(event.results[0][0].transcript);
    };

    recognition.start();
    props.showAlert("Microphone starts recording sound", "warning");
  };

  const handleOnChange = (event) =>{
    //console.log('onchange')
    setText(event.target.value)
  }
  function wordCount(text) {
    return text.trim() ? text.trim().split(/\s+/).length : 0;
  }

  function minutesRead(text) {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    return (0.008 * words).toFixed(2); // Rounds to 2 decimal places
}

  return (
    <>
      <div className="container" style={{ color: props.mode === 'light'? 'black' : 'white' }}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
            <textarea className="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'light'? 'white' : '#616161', color: props.mode === 'light'? 'black' : 'white' } }  id="myBox" rows="10"></textarea>
        </div>
        <button className="btn btn-primary mx-1" onClick={handleUpperCase}>Convert to Uppercase</button>
        <button className="btn btn-primary mx-1" onClick={handleLowerCase}>Convert to Lowercase</button>
        <button className="btn btn-primary mx-1" onClick={handleClearText}>Clear Text</button>
        <button className="btn btn-primary mx-1" onClick={handleinverseclick}>Inverse Sentence</button>
        <button className="btn btn-primary mx-1" onClick={copyToClipboard}>Copy Text</button>
        <button className="btn btn-danger mx-1" onClick={startListening}>Speak</button>


      </div>
      <div className="container my-3"style={{ color: props.mode === 'light'? 'black' : 'white' }} >
        <h2>Your text summary</h2>
        <p>{wordCount(text)} words and {text.length} characters</p>
        <p>{minutesRead(text)} minutes read </p>
        <h2>Preview</h2>
        <p>{text.length>0? text:'Enter text above to preview' }</p>
      </div>
    </>
  )
}
