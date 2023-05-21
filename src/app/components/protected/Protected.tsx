import { Navigate } from "react-router-dom"
import Props from "./props"
import { useState, useEffect } from "react"
import checkPermission from "./checkPermission"


const Protected: React.FC<Props> = ({ page }) => {

  const [userPermission, setUserPermission] = useState<number>()

  useEffect(() => {
    checkPermission(setUserPermission)
  },[])

  if(!userPermission){
    return null
  }

  if(userPermission === 200){
    return <>{page}</>
  }

  return <Navigate to="/signin" />
}

export default Protected