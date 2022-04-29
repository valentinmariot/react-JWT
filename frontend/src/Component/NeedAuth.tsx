import { Navigate } from "react-router"

export default function NeedAuth({user, children}) {
    if (user){
        return children
  }else{
      return(
         <Navigate to='/notAuthorized'/>
    )
}
}