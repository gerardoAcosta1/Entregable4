import axios from "axios"
import { useState } from "react"

const useFetch = (baseUrl, callback) => {

 const [infoApi, setInfoApi] = useState()

 //get
 const getApi = (path) => {
    const url = `${baseUrl}${path}/`
    axios.get(url)
    .then(res => setInfoApi(res.data))
    .catch(err => console.log(err))
    /*
    fetch(url)
    .then(res => res.json())
    .then(data => setInfoApi(data))
    .catch(err => console.log(err))
    */
 }

 /*const getApi = () =>{ with Fetch
    const url = ''
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
 }*/
 //post
 const postApi = (path, data) => {
    const url = `${baseUrl}${path}/`
    axios.post(url, data)
    .then(res => {
        console.log(res.data)
        setInfoApi([...infoApi, res.data])
        callback(true)
    })
    .catch(err => console.log(err))
 }
 //delete
 const deleteApi = (path, id) => {
    const url = `${baseUrl}${path}/${id}/`
    axios.delete(url)
    .then(res => {
        console.log(res.data)
        const infoApiFiltered = infoApi.filter(e => e.id !== id)
        setInfoApi(infoApiFiltered)
    })
    .catch(err => console.log(err))
 }
 //update
 const updateApi = (path, id, data) => {
    const url = `${baseUrl}${path}/${id}/`
    axios.patch(url, data)
    .then(res => {
        console.log(res.data)
        const infoApiMap = infoApi.map(e => e.id === id ? res.data : e)
        setInfoApi(infoApiMap)
        callback(true)
    })
    .catch(err => console.log(err))
 }

return [infoApi, getApi, postApi, deleteApi, updateApi]
}

export default useFetch