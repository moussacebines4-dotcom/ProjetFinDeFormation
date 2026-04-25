import {create} from "zustand"
import axios from "axios"
import { Code } from "lucide-react"

const API_URL ="http://localhost:3000/api/auth"

export const useAuthStore = create((set)=>({
    user : null,
    isAuthenticated : false,
    error : null,
    isLoading : false,
    isCheckingAuth: true,
    message: null,


    signup: async(email , password , name)=>{
        set({isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/signup`, {email, password, name})
            set({user : response.data.user, 
                isAuthenticated : true,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error signing up!", isLoading: false})
            throw error
        }
    },

    verifyEmail: async(code)=>{
        set({isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/verify-email`, {code})
            set({user: response.data.user, 
                isAuthenticated : true,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error Verifying Email!", isLoading: false})
            throw error
        }
    },

    checkAuth: async()=>{
        set({isCheckingAuth: true , error: null})
        try {
            const response = await axios.get(`${API_URL}/check-auh`)
            set({user: response.data.user, 
                isAuthenticated : true,
                isCheckingAuth : false,
            })
        } catch (error) {
            set({error: null , isCheckingAuth:false , isAuthenticated: false})
        
        }

    },

    login: async(email, password)=>{
         set({isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/login`, {email, password})
            set({isAuthenticated : true,
                user: response.data.user, 
                error: null,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error logging  in!", isLoading: false})
            throw error
        }

    },

    logout : async()=>{
        set({isLoading: true , error: null})
        try {
            await axios.post(`${API_URL}/logout`)
            set({user: null, 
                isAuthenticated : false,
                error: null,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error logging out!", isLoading: false})
            throw error
        }
    },

    ForgotPassword : async(email)=>{
        set({isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/forgotPassword`, {email})
            set({
                message:response.data.message,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error sending reset password message!", isLoading: false})
            throw error
        }
    },

     resetPassword : async(email, password)=>{
        set({isLoading: true , error: null})
        try {
            const response = await axios.post(`${API_URL}/resetPassword/${token}`, {password})
            set({
                message:response.data.message,
                isLoading : false
            })
        } catch (error) {
            set({error: error.response.data.message || "Error resetting password!", isLoading: false})
            throw error
        }
    },




}))