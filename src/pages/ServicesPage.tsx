import { services } from '../data/items';
import { Link, useSearchParams } from 'react-router-dom';

export default function ServicesPage() {
  const [searchParams] = useSearchParams();
  function getFilteredServices() {
    const search = searchParams.get('search');
    if (search === null || search === '') {
      return services;
    } else {
      return services.filter(
        (service) => service.name.toLowerCase().indexOf(search.toLowerCase()) > -1,
      );
    }
  }
  return (
    <div className="text-center p-5">
      <h2 className="text-xl font-bold text-slate-600">Here are some random services</h2>
      <ul className="list-none m-0 p-0">
        {getFilteredServices().map((service) => (
          <li key={service.id}>
            <Link
              to={`${service.id}`}
              className="p-1 text-base text-slate-800
          hover:underline"
            >
              {service.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
