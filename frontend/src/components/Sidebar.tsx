import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Users, BookUser, Briefcase, CheckSquare,
  BarChart2, Settings, LogOut
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard', disabled: true },
  { icon: Users,           label: 'Leads',     to: '/leads',     disabled: false },
  { icon: BookUser,        label: 'Contacts',  to: '/contacts',  disabled: true },
  { icon: Briefcase,       label: 'Accounts',  to: '/accounts',  disabled: true },
  { icon: CheckSquare,     label: 'Tasks',     to: '/tasks',     disabled: true },
  { icon: BarChart2,       label: 'Reports',   to: '/reports',   disabled: true },
  { icon: Settings,        label: 'Settings',  to: '/settings',  disabled: true },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        </div>
        <span>Estetica CRM</span>
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>
        {navItems.map(({ icon: Icon, label, to, disabled }) =>
          disabled ? (
            <div key={to} className="nav-item disabled">
              <Icon size={16} className="nav-icon" />
              {label}
            </div>
          ) : (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}
            >
              <Icon size={16} className="nav-icon" />
              {label}
            </NavLink>
          )
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="user-avatar">JD</div>
        <div className="user-info">
          <div className="user-name">John Doe</div>
          <div className="user-role">Admin</div>
        </div>
        <LogOut size={15} style={{ color: 'rgba(255,255,255,.4)', flexShrink: 0 }} />
      </div>
    </aside>
  );
}
