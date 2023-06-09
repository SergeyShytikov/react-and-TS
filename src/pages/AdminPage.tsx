import { User } from '../api/authenticate';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

function Greeting({ user }: Props) {
  return (
    <p className="mt-8 text-xl text-center">{user ? `Hello ${user.name}!` : 'Please sign in'}</p>
  );
}

function AdminContent() {
  return <p className="mt-4 text-l text-center">Some important stuff that only an admin can do</p>;
}

function InsufficientPermissions() {
  return <p className="mt-4 text-l text-center">Insufficient permissions</p>;
}

function hasAdminPermission(permissions: string | string[]) {
  return permissions && permissions.includes('admin');
}

export default function AdminPage({}) {
  const user = useSelector((state: RootState) => state.user.user);
  const permissions = useSelector((state: RootState) => state.user.permissions);

  if (permissions === undefined) {
    return <Greeting user={user} permissions={undefined} />;
  }

  return hasAdminPermission(permissions) ? <AdminContent /> : <InsufficientPermissions />;
}
