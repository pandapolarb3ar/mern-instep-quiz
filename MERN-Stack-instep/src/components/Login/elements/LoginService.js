import axios from 'axios';

const LoginService = data => (
	axios.get('http://34.91.61.43:5000/users/'+ data)
		.then(res => res.data[0] )
)

export default LoginService;