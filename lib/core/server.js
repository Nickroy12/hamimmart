const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const serverMutation = async(path , data , method = 'POST')=>{
    const res = await fetch(`${baseUrl}${path}`,{
        method,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
     return res.json()
}
export const serverFetch = async(path)=>{
  
try {

    const res = await fetch(`${baseUrl}${path}`)
  return await res.json()
  
} catch (error) {
  console.log(error);
  return {}
}
}
