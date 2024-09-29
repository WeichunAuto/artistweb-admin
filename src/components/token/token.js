import axiosInstance from '../axios/request'


let jwtToken = {
  getToken: async function(app) {
    jwtToken = await requestToken(app); // Wait for the token to be retrieved asynchronously
    // console.log('New jwtToken:', jwtToken);
    return jwtToken
  }
} 

// Asynchronous request
async function requestToken(app) {
    
    try {
      const jwtRes = await axiosInstance.post('/login', {
        appName: app.appName,
        appKey: app.appKey
      })
      const jwtObject = jwtRes.data

      return jwtObject.token
    } catch (error) {
      console.log('login token request error.....')
      return null
    }
  }

  export default jwtToken