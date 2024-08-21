// example.js

import React from 'react'

// Missing semi-colon and unused variable
const unusedVariable = 'I am not used'

// Incorrect indentation and missing semi-colon
function HelloWorld() {
console.log("Hello, world!")
}

// Unused function parameter and missing prop-types validation
const Greeting = (props) => {
    return <div>Hello, {props.name}</div>
}

export default Greeting
