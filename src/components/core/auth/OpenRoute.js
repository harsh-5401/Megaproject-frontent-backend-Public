// This will prevent unauthenticated users from accessing this route
// created so that non loggedin user can accessed this path 
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  console.log("toekn is " , token)

  if (token === null) {
    return children
  } else {
    return <Navigate to="/dashboard/my-profile" />
  }
}

export default OpenRoute