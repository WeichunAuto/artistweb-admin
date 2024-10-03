import React, { Component } from 'react'
import { Navigate } from 'react-router-dom'

export class App extends Component {

  render() {
    return <Navigate to='/body'/>
  }
}

export default App
