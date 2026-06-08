import { Link } from 'react-router-dom';
import { Bell, Search } from 'lucide-react';

interface HeaderProps {
  breadcrumbs: { label: string; to?: string }[];
}

export default function Header({ breadcrumbs }: HeaderProps) {
  return (
    <header className="page-header">
      <nav className="breadcrumb">
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {i > 0 && <span className="breadcrumb-sep">/</span>}
            {crumb.to ? (
              <Link to={crumb.to}>{crumb.label}</Link>
            ) : (
              <span className="breadcrumb-current">{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>

      <div className="header-actions">
        <button className="icon-btn" title="Search">
          <Search size={16} />
        </button>
        <button className="icon-btn" title="Notifications">
          <Bell size={16} />
        </button>
        <div className="user-avatar" style={{ width: 34, height: 34, fontSize: 13 }}>JD</div>
      </div>
    </header>
  );
}
