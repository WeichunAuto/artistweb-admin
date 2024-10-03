import axiosInstance from '../axios/request'

let jwtToken = {
  getToken: async function(app) {
    return await requestToken(app); // Wait for the token to be retrieved asynchronously
  }
} 

// Asynchronous request
async function requestToken(app) {
  let [isSuccess, token, msg] = [false, '', '']
  try {
    const response = await axiosInstance.post('/login', {
      appName: app.appName,
      appKey: app.appKey
    })

    const statusCode = response.status
    // console.log('response code：', statusCode)
    if(statusCode === 200) {
      const jwtObject = response.data;
      [isSuccess, token, msg] = [true, jwtObject.token, 'success']
    } else if(statusCode === 401) {
      [isSuccess, token, msg] = [false, '', 'Invalid Credentials']
    }

  } catch(error) {
    console.log('Login token request error:', error);
  }
  
  return {isSuccess, token, msg}
   
}

export default jwtToken