import axios, { AxiosError } from "axios"

async function checkPermission(setUserPermission: React.Dispatch<React.SetStateAction<number | undefined>>){
  try{
    const response = await axios.get(`${process.env.REACT_APP_BASEURL}/checklogin`,{
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
    
    setUserPermission(response.status)
  }catch(error){
    if(error instanceof AxiosError){
      if(error.response?.status) setUserPermission(error.response.status)

      return
    }

    console.log(error)
  }
}

export default checkPermission