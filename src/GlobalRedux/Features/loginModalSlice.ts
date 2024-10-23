import {createSlice} from '@reduxjs/toolkit';
export interface showState {
    showLogin:boolean,
}
const initialState: showState = {
    showLogin:false

}
export const loginModalSlice = createSlice({
    name:'showLogin',
    initialState,
    reducers:{
        showLogin:(state)=>{
            state.showLogin=true
        },
        closeLogin:(state)=>{
            state.showLogin = false
        }
    }
})
export const {showLogin,closeLogin} = loginModalSlice.actions;
export default loginModalSlice.reducer;

