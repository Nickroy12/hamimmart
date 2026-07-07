'use server'

import { serverMutation } from "../core/server"


export const addGrocery = async(newGrocery)=>{
  return serverMutation('/api/grocery',newGrocery)
}

export const createOrder = async(newOrder) =>{
  return serverMutation('/api/order', newOrder)
}