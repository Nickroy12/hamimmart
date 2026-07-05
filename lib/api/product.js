import { serverFetch } from "../core/server"

export const getAllProduct = async()=>{
     return serverFetch('/api/grocery')
}