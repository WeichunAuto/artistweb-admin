const devBaseUrl = 'http://localhost:8080/users/'
const productBaseUrl = 'http://3.24.110.157:8080/users/'

// Restful API related while using axios.
 export const ApiCon = {
        BASE_URL: process.env.NODE_ENV === 'development' ? devBaseUrl : productBaseUrl,
        TIMEOUT: 5000
    }


    

