import { urlApi } from "./../constants/config.js";

const callApi = (uri, method, data) =>{
    return axios({
        url : `${urlApi}/${uri}`,
        method, // method : method,
        data    // data: data
        
        
    })
}

const getListProduct  = () => {
      return  axios({
          url: "http://5e52260cd90e6c0014990fcd.mockapi.io/SanPham",
          method: "GET"
      });
}

const deleteProduct = (id) => {
    return axios({
        url : `http://5e52260cd90e6c0014990fcd.mockapi.io/SanPham/${id}`,
        method: 'DELETE'
    })
}
const getProductById = (id) => {
    return axios({
        url : `http://5e52260cd90e6c0014990fcd.mockapi.io/SanPham/${id}`,
        method: 'GET'
    })
}
const updateProduct = (id, product) => {
    return axios({
        url : `http://5e52260cd90e6c0014990fcd.mockapi.io/SanPham/${id}`,
        method : 'PUT',
        data: product //Biet data moi de update
    })
}

const addProduct = product => {
    return axios({
        url : `http://5e52260cd90e6c0014990fcd.mockapi.io/SanPham`,
        method : 'POST',
        data: product
    })
}

export { getListProduct , deleteProduct , getProductById , updateProduct , addProduct, callApi} ;