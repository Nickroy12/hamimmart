const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export const serverFetch = async(path)=>{
  
try {

    const res = await fetch(`${baseUrl}${path}`)
  return await res.json()
  
} catch (error) {
  console.log(error);
  return {}
}
}