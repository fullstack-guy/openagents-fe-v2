import { Navigate } from 'react-router-dom';
import { useSupabaseContext } from 'src/supabase/SupabaseContext';

const PrivateRoute = ({ component: Component }) => {
  const { session } = useSupabaseContext()
  return !!session ? <Component /> : <Navigate to="/auth/login" />;
};

export default PrivateRoute;
