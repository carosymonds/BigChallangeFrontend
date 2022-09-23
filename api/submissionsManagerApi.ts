import axios from 'axios';
import Cookies from 'js-cookie';


const submissionsManagerApi = axios.create({
    baseURL: 'http://0.0.0.0:80/api',
    headers: {'Authorization': 'Bearer '+ Cookies.get('token')}
});



export default submissionsManagerApi; 