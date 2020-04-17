import axios from 'axios';

const GetReport = data => (
	axios.get('http://localhost:5000/report/'+ data)
		.then(res => res.data )
)

export default GetReport;