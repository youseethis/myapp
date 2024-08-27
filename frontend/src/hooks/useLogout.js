//File name: frontend/hooks/useLogout.js
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.clear();


    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}