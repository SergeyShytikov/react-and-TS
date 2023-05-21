import { useOutletContext } from 'react-router-dom';
import { AdminPage } from './AdminPage';
import { User } from '../api/authenticate';

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

export default function AdminPageWrapper() {
  const { user, permissions } = useOutletContext<Props>();
  return <AdminPage user={user} permissions={permissions} />;
}
