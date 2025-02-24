import { create } from "zustand";

const useAuthStore =create(()=>{
    return{
        token:"",
        user:null
    }
})

export default useAuthStore