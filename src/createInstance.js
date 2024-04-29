import axios from 'axios'
import { jwtDecode } from "jwt-decode";


const refreshToken = async () => {
    try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"/refreshToken",25,{
            withCredentials: true
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}

const refreshToken_v2 = async () => {
    const user_infor = JSON.parse(localStorage.getItem("tokens"))

    try {
        const res = await axios.post(process.env.REACT_APP_BACKEND_URL+"/refreshToken_v2",{accName:user_infor.accName}, {withCredentials: true})
        return res.data
    } catch (error) {
        console.log(error)
    }
}


export const createAxios = () => {
    const newInstance = axios.create()

    // newInstance.defaults.withCredentials = true

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date()
            
            const infor_user = JSON.parse(localStorage.getItem("tokens"))

            const decodedToken = jwtDecode(infor_user?.accessToken)
            if(decodedToken.exp < date.getTime()/1000) {
                const data = await refreshToken_v2()
                console.log(data)

                const refreshUser = {
                    ...infor_user,
                    accessToken: data.accessToken,
                }

                localStorage.setItem("tokens", JSON.stringify(refreshUser))

                // Authorization là prope ở header
                config.headers["Authorization"] = data.accessToken
            }
            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )
    return newInstance
}
