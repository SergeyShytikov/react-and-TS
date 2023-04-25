import { User } from './api/authenticate';
import AdminPage from './AdminPage';

type Props = {
  user: undefined | User;
  permissions: undefined | string[];
};

export function HomePage({ user, permissions }: Props) {
  return (
    <main className="py-8">
      <div className="text-center p-5 text-xl">
        <h1 className="text-xl text-slate-900">Welcome to React Tools!</h1>
        <p className="mt-8 text-xl text-center">
          {user ? `Hello ${user.name}!` : 'Please sign in'}
        </p>
        <AdminPage permissions={permissions} />
      </div>
    </main>
  );
}
