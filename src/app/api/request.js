import axios from 'axios'
import { HOST_URL } from 'app/constant/index';

import {
  getQueryString,
} from 'helper/queryHelper'

function send({
  method = 'GET', path, data = null, query = null, headers = {}, newUrl
}, hosting = null) {
  return new Promise((resolve) => {
    let url = (hosting ? hosting : HOST_URL) + `${path}${getQueryString(query)}`
    if (newUrl) {
      url = `${newUrl}${getQueryString(query)}`
    }
    axios({
      method, url, data, headers,
    })
      .then((result) => {
        const data = result.data
        return resolve(data)
      })
      .catch((error) => {
        const {response ={}} = error
        
        const result = response.data ? response.data :null
        
        if (!result) {
          return resolve({status: 404, message: ""})
        } else {
          const { status, message: data } = result
          
          if (status === 401) {
            //message.warn(data || "Đã có lỗi xảy ra" )
            setTimeout(()=>{
              window.localStorage.clear()
              window.location.href = '/'
            },1000)
           
          }
          else if (
            (status === 401 && data === 'Unauthorized') || (status === 403 && data === 'InvalidToken')) {
              window.localStorage.clear()
              window.location.href = '/'
            
          }
         
          else {
            return resolve(result)
          }
        }
      })
  })
}

export default {
  send,
}