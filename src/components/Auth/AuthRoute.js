import { Navigate } from 'react-router-dom';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';


const AuthRoute = ({ component: Component, redirectTo = '/feed' }) => {
  const { session } = useSupabaseContext()
  return session ? <Navigate to={redirectTo} /> : <Component />;
}

export default AuthRoute;
