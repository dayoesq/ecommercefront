import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://www.investipz.com/v1'
})

// instance.defaults.headers.common['SOMETHING'] = 'something'

export default instance