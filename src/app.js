import React, { Component } from 'react'
import { render } from 'react-dom'
import './app.css'

const App = () => {
    return(
        <div>
            <h1>App Page</h1>
        </div>
    )
}

render(<App />, 
    document.getElementById('root')
)