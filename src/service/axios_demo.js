import axios from 'axios'
axios.get('http://httpbin.org/#/HTTP_Methods/get_get').then((res) => {
  console.log(res)
})
axios.post('http://httpbin.org/post', {
  name: '我的名字',
  address: '华夏'
})
