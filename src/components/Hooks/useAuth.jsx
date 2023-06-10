import { useContext } from "react"
import { AuthContext } from '../Providers/AuthProvider'

export const useAuth = () => {
    const { user, setUser, loading, setLoading, createUser, signInUser, googleSignInUser, signOutUser, updateUserProfile } = useContext(AuthContext)
    return { user, setUser, loading, setLoading, createUser, signInUser, googleSignInUser, signOutUser, updateUserProfile }
}