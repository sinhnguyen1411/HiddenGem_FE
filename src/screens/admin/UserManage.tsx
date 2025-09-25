import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title, Text, Button, Input, AdminTable } from '../../components';
import { adminService } from '../../services/admin';
import { User } from '../../services/types';
import './UserManage.css';

interface UserManageProps {
  className?: string;
}

const UserManage: React.FC<UserManageProps> = ({ className = '' }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAddModal, setShowAddModal] = useState(false);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await adminService.getUsers();
        console.log('response', response)
        setUsers(response.data);
      } catch (err) {
        setError('Failed to load users');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Static data for filters
  const userRoles = [
    { id: 'all', label: 'All Roles' },
    { id: 'customer', label: 'Customer' },
    { id: 'admin', label: 'Admin' },
    { id: 'moderator', label: 'Moderator' }
  ];

  const userSortOptions = [
    { value: 'name-asc', label: 'Name A-Z' },
    { value: 'name-desc', label: 'Name Z-A' },
    { value: 'email-asc', label: 'Email A-Z' },
    { value: 'email-desc', label: 'Email Z-A' },
    { value: 'join-desc', label: 'Newest First' },
    { value: 'join-asc', label: 'Oldest First' }
  ];

  const userFilter = {
    searchPlaceholder: 'Search users...'
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    let filtered = users.filter(user => {
      const fullName = user.full_name.toLowerCase();
      const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === 'all' || user.role === roleFilter;

      return matchesSearch && matchesRole;
    });

    // Sort users
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.full_name.localeCompare(b.full_name);
        case 'name-desc':
          return b.full_name.localeCompare(a.full_name);
        case 'email-asc':
          return a.email.localeCompare(b.email);
        case 'email-desc':
          return b.email.localeCompare(a.email);
        case 'join-desc':
          return new Date(b.joined_at).getTime() - new Date(a.joined_at).getTime();
        case 'join-asc':
          return new Date(a.joined_at).getTime() - new Date(b.joined_at).getTime();
        case 'orders-desc':
        case 'orders-asc':
        case 'spent-desc':
        case 'spent-asc':
          // These fields don't exist in the API, so just return 0
          return 0;
        default:
          return 0;
      }
    });

    return filtered;
  }, [users, searchTerm, roleFilter, sortBy]);

  const handleViewUser = (user: User) => {
    navigate(`/admin/users/${user.id_user}`, { state: { user } });
  };

  const handleEditUser = (user: User) => {
    navigate(`/admin/users/${user.id_user}/edit`);
  };

  const handleDeleteUser = async (user: User) => {
    if (window.confirm(`Are you sure you want to delete user "${user.full_name}"?`)) {
      try {
        setLoading(true);
        setError(null);
        
        await adminService.deleteUser(user.id_user);
        
        // Refetch users after successful deletion
        const response = await adminService.getUsers();
        setUsers(response.data);
        
        console.log('User deleted successfully:', user.id_user);
      } catch (err) {
        setError('Failed to delete user');
        console.error('Error deleting user:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddUser = () => {
    setShowAddModal(true);
  };

  const handleSort = (key: string, direction: 'asc' | 'desc') => {
    // This would be handled by the table component
    console.log('Sort by:', key, direction);
  };


  const getRoleBadge = (role: string) => {
    const roleConfig = userRoles.find(r => r.id === role);
    return (
      <span className={`user-manage__role-badge user-manage__role-badge--${role}`}>
        {roleConfig?.label || role}
      </span>
    );
  };

  const tableColumns = [
    {
      key: 'avatar',
      label: 'Avatar',
      width: '80px',
      render: (value: string, item: User) => (
        <div className="user-manage__avatar">
          <img src={'https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png'} alt={item.full_name} className="user-manage__avatar-img" />
        </div>
      )
    },
    {
      key: 'name',
      label: 'Name',
      sortable: true,
      width: '250px',
      render: (value: string, item: User) => (
        <div className="user-manage__user-info">
          <Text variant="p" size="sm" color="primary" className="user-manage__user-name">
            {item.full_name}
          </Text>
          <Text variant="p" size="xs" color="muted" className="user-manage__user-email">
            {item.email}
          </Text>
        </div>
      )
    },
    {
      key: 'role',
      label: 'Role',
      width: '120px',
      render: (value: string) => getRoleBadge(value)
    },
    {
      key: 'username',
      label: 'Username',
      width: '150px',
      render: (value: string, item: User) => (
        <Text variant="span" size="sm" color="muted">
          {item.username}
        </Text>
      )
    },
    {
      key: 'phone',
      label: 'Phone',
      width: '120px',
      render: (value: string, item: User) => (
        <Text variant="span" size="sm" color="muted">
          {item.phone_number}
        </Text>
      )
    },
    {
      key: 'joined_at',
      label: 'Joined',
      sortable: true,
      width: '120px',
      render: (value: string) => (
        <Text variant="span" size="sm" color="muted">
          {new Date(value).toLocaleDateString()}
        </Text>
      )
    }
  ];

  if (loading) {
    return (
      <div className={`user-manage ${className}`}>
        <div className="user-manage__loading">
          <Text>Loading users...</Text>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`user-manage ${className}`}>
        <div className="user-manage__error">
          <Title level="h1" size="lg" color="primary">
            {error}
          </Title>
          <Button
            variant="primary"
            size="md"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`user-manage ${className}`}>
      <div className="user-manage__header">
        <div className="user-manage__title-section">
          <Title level="h1" size="xl" color="primary" className="user-manage__title">
            User Management
          </Title>
          <Text variant="p" size="md" color="secondary" className="user-manage__subtitle">
            Manage all users in your platform
          </Text>
        </div>

        <div className="user-manage__actions">
          <Button
            variant="primary"
            size="md"
            onClick={handleAddUser}
            className="user-manage__add-btn"
          >
            + Add New User
          </Button>
        </div>
      </div>

      <div className="user-manage__filters">
        <div className="user-manage__filter-group">
          <Input
            type="text"
            placeholder={userFilter.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="user-manage__search-input"
          />
        </div>

        <div className="user-manage__filter-group">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="user-manage__filter-select"
          >
            {userRoles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        <div className="user-manage__filter-group">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="user-manage__filter-select"
          >
            {userSortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="user-manage__stats">
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Total Users
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Customers
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.filter(user => user.role === 'customer').length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            Admins
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.filter(user => user.role === 'admin').length}
          </Text>
        </div>
        <div className="user-manage__stat">
          <Text variant="p" size="sm" color="muted" className="user-manage__stat-label">
            New This Month
          </Text>
          <Text variant="p" size="lg" color="primary" className="user-manage__stat-value">
            {filteredAndSortedUsers.filter(user => {
              const joinDate = new Date(user.joined_at);
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
              return joinDate >= oneMonthAgo;
            }).length}
          </Text>
        </div>
      </div>

      <div className="user-manage__table">
        <AdminTable
          columns={tableColumns}
          data={filteredAndSortedUsers}
          onSort={handleSort}
          onView={handleViewUser}
          onEdit={handleEditUser}
          onDelete={handleDeleteUser}
          emptyMessage="No users found matching your criteria"
        />
      </div>

      {showAddModal && (
        <div className="user-manage__modal-overlay">
          <div className="user-manage__modal">
            <div className="user-manage__modal-header">
              <Title level="h2" size="lg" color="primary">
                Add New User
              </Title>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAddModal(false)}
                className="user-manage__modal-close"
              >
                ✕
              </Button>
            </div>
            <div className="user-manage__modal-content">
              <Text variant="p" size="md" color="secondary">
                User creation form would go here. This is a placeholder for the add user functionality.
              </Text>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManage;
