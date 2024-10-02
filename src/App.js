import React, { Component } from 'react'
// import { Navigate } from 'react-router-dom'
import Login from './components/login'
import Body from './components/body'

export class App extends Component {

  state = {jwtToken: null}

  componentDidMount() {
    const cacheToken = localStorage.getItem('token')
    
    if(cacheToken === null) {
          
      this.setState({jwtToken: null})
    } else {
        const token = atob(cacheToken)  // base64 decode token after getting from local storage.
        this.setState({jwtToken: token})
    }
  }

  setJwtToken = (token) => {
    this.setState({jwtToken: token})
    const base64Token = btoa(token)
    localStorage.setItem('token', base64Token) // Save token with Base64 encode.
  }

  render() {
    return (
      <div>
        {
          this.state.jwtToken === null 
          ? <Login setJwtToken={this.setJwtToken}/> // Bypass the method 'setJwtToken' through props
          : <Body setJwtToken={this.setJwtToken} />
        } 
      </div>
    )
  }
}

export default App
