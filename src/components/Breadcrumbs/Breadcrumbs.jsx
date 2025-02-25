import { Link } from 'react-router-dom';

export default function Breadcrumbs({ pathList = [] }) {
  return (
    <p className="flex flex-row gap-2">
      {pathList.map((path, index) => {
        let isCurrentPath = index === pathList.length - 1;
        return (
          <Link
            to={path.to}
            className={`text-sm ${isCurrentPath ? 'text-black' : 'text-[#808080]'}`}
            key={index}
          >
            {path.name}
            <span className="ml-2">{!isCurrentPath ? '/' : ''}</span>
          </Link>
        );
      })}
    </p>
  );
}
