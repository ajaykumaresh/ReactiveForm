import {API_SAMPLE} from "./type";
let initalState={
    data:""
}

const BasicReducer=(state=initalState,action)=>{
   
    switch(action.type){
        case API_SAMPLE:
            
            return{
                ...state,
                data:action.payload
            }
            default:
                
                return state
    }
}

export default BasicReducer;