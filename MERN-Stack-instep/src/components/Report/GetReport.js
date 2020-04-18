import axios from 'axios';

const GetReport = data => (
	axios.get('http://34.91.61.43:5000/report/'+ data)
		.then(res => res.data )
)

export default GetReport;