import axios from 'axios';

const LoginService = data => (
	axios.get('http://localhost:5000/users/'+ data)
		.then(res => res.data[0].tested )
)

export default LoginService;