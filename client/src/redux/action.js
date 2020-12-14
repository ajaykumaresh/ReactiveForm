import axios  from "axios";
import {API_SAMPLE} from "./type";
export const saveUserDetails=(paramRequest)=>{
    return (dispatchEvent)=>{
        axios({
            url: 'api/adduser',
            method: "POST",
            data: paramRequest,
        })
        .then(response=>dispatchEvent(saveUserDetailsAction(response.data)))
        .catch(err=>console.error(err))
    }
}

export const saveUserDetailsAction=(response)=>{
    console.info(response)
    return{
        type:API_SAMPLE,
        payload:response
    }
}