export const initialState={
    avator:""
}
export const reducer =(state,action) =>{
    console.log(action)
    switch(action.type){
        case 'SET_AVATOR' :{
            return{
                ...state,
                avator:action.avator
            }
        }
        case 'SET_USER' : {
            return {
                ...state,
                user:action.user
            }
        
        }
    }
    
    return state
}