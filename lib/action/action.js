'use server'
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const addGrocery = async(newGrocery)=>{
    const res = await fetch(`${baseUrl}/api/grocery`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGrocery)
    })
     return res.json()
}