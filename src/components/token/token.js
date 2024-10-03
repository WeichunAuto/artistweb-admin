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

    const jwtObject = response.data;

    isSuccess = true;
    token = jwtObject.token;
    msg = 'success';

  } catch(error) {
    console.log('Login token request error:', error);
    isSuccess = false;
    token = '';
    msg = 'Invalid Credentials';
  }
  
  return {isSuccess, token, msg}
   
}

export default jwtToken