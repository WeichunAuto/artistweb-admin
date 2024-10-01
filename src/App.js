import React, { Component } from 'react'
import Login from './components/login'
import Body from './components/body'

export class App extends Component {

  state = {jwtToken: null}

  componentDidMount() {
    const cacheToken = localStorage.getItem('token')
    
        if(cacheToken) {
            const token = atob(cacheToken)  // base64 decode token after getting from local storage.
            if(token === 'null') {
              this.setState({jwtToken: null})
            } else {
              this.setState({jwtToken: token})
            }
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
        {this.state.jwtToken === null ? <Login setJwtToken={this.setJwtToken}/> : <Body setJwtToken={this.setJwtToken}/>}
      </div>
    )
  }
}

export default App
