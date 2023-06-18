import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { NavLink, Link, useSearchParams, Form } from 'react-router-dom';
import { User } from './api/authenticate';
import { authenticate } from './api/authenticate';
import { authorize } from './api/authorize';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store/store';
import {
  authenticateAction,
  authenticatedAction,
  autorizeAction,
  autorizedAction,
} from './store/userSlice';

type Props = {
  user: undefined | User;
  onSignInClick: () => void;
  loading: boolean;
};

export function Header({}: Props) {
  const [searchParams] = useSearchParams();
  const user = useSelector((state: RootState) => state.user.user);
  const loading = useSelector((state: RootState) => state.user.loading);
  const dispatch = useDispatch();

  async function handleSignInClick() {
    dispatch(authenticateAction());
    const authenticatedUser = await authenticate();
    dispatch(authenticatedAction(authenticatedUser));
    if (authenticatedUser !== undefined) {
      dispatch(autorizeAction());
      const authorizedPermissions = await authorize(authenticatedUser.id);
      dispatch(autorizedAction(authorizedPermissions));
    }
  }

  // function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   const formData = new FormData(e.currentTarget);
  //   const search = formData.get('search') as string;
  //   navigate(`/products/?search=${search}`);
  // }
  return (
    <header className=" text-gray-50 bg-slate-900 min-h-40 px-5 py-6 border-b border-gray-100">
      {user ? (
        <span className="ml-auto font-bold">{user.name} has signed in</span>
      ) : (
        <button
          onClick={handleSignInClick}
          className="whitespace-nowrap inline-flex items-
            center justify-center ml-auto px-4 py-2 w-36
            border border-transparent rounded-md
            shadow-sm text-base font-medium text-white
            bg-indigo-600 hover:bg-indigo-700"
          disabled={loading}
        >
          {loading ? '...' : 'Sign in'}
        </button>
      )}
      <Form className="relative text-right" action="/services">
        <input
          type="search"
          name="search"
          placeholder="Search"
          defaultValue={searchParams.get('search') ?? ''}
          className="absolute right-0 top-0 rounded py-2 px-3
        text-gray-700"
        />
      </Form>
      <Link to="">
        <img src={reactLogo} alt="Logo React" className="inline-block h-20" />
        <img src={viteLogo} alt="Logo Vite" className="inline-block h-20" />
      </Link>
      <Link to="">
        <h1 className="text-2xl">React Tools</h1>
      </Link>
      <nav>
        <NavLink
          to="products"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
              border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Productssss
        </NavLink>
        <NavLink
          to="admin"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Admin
        </NavLink>
        <NavLink
          to="services"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Servises
        </NavLink>
        <NavLink
          to="form"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Contact form
        </NavLink>
        <NavLink
          to="blog"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Blog
        </NavLink>
        <NavLink
          to="github"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Github search
        </NavLink>
        <NavLink
          to="checklist"
          className={({ isActive }) =>
            `text-white no-underline p-1 pb-0.5 border-solid
        border-b-2 ${isActive ? 'border-white' : 'border-transparent'}`
          }
        >
          Checklist
        </NavLink>
      </nav>
    </header>
  );
}
