import React from 'react';
import { Text, Button } from '../';
import './index.css';

interface AdminTableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: AdminTableColumn[];
  data: any[];
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  className?: string;
  emptyMessage?: string;
}

const AdminTable: React.FC<AdminTableProps> = ({
  columns,
  data,
  onSort,
  onEdit,
  onDelete,
  onView,
  className = '',
  emptyMessage = 'No data available'
}) => {
  const [sortKey, setSortKey] = React.useState<string>('');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (key: string) => {
    if (!onSort) return;
    
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortDirection(newDirection);
    onSort(key, newDirection);
  };

  const renderCell = (column: AdminTableColumn, item: any) => {
    if (column.render) {
      return column.render(item[column.key], item);
    }
    return item[column.key];
  };

  const getStatusBadge = (isActive: boolean, isOpen: boolean) => {
    if (!isActive) {
      return (
        <span className="admin-table__status admin-table__status--inactive">
          Inactive
        </span>
      );
    }
    return (
      <span className={`admin-table__status admin-table__status--${isOpen ? 'open' : 'closed'}`}>
        {isOpen ? 'Open' : 'Closed'}
      </span>
    );
  };

  const getRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return (
      <div className="admin-table__rating">
        <span className="admin-table__stars">{stars.join('')}</span>
        <Text variant="span" size="xs" color="muted" className="admin-table__rating-value">
          {rating.toFixed(1)}
        </Text>
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div className={`admin-table admin-table--empty ${className}`}>
        <div className="admin-table__empty">
          <Text variant="p" size="md" color="muted">
            {emptyMessage}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`admin-table ${className}`}>
      <div className="admin-table__container">
        <table className="admin-table__table">
          <thead className="admin-table__header">
            <tr className="admin-table__header-row">
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`admin-table__header-cell ${
                    column.sortable ? 'admin-table__header-cell--sortable' : ''
                  }`}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="admin-table__header-content">
                    <Text variant="span" size="sm" color="primary" className="admin-table__header-text">
                      {column.label}
                    </Text>
                    {column.sortable && (
                      <span className="admin-table__sort-icon">
                        {sortKey === column.key ? (sortDirection === 'asc' ? '↑' : '↓') : '↕'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              <th className="admin-table__header-cell admin-table__header-cell--actions">
                <Text variant="span" size="sm" color="primary">
                  Actions
                </Text>
              </th>
            </tr>
          </thead>
          <tbody className="admin-table__body">
            {data.map((item, index) => (
              <tr key={item.id || index} className="admin-table__row">
                {columns.map((column) => (
                  <td key={column.key} className="admin-table__cell">
                    {column.key === 'status' ? getStatusBadge(item.isActive, item.isOpen) :
                     column.key === 'rating' ? getRatingStars(item.rating) :
                     column.key === 'image' ? (
                       <div className="admin-table__image">
                         <img src={item.image} alt={item.name} className="admin-table__image-img" />
                       </div>
                     ) :
                     renderCell(column, item)}
                  </td>
                ))}
                <td className="admin-table__cell admin-table__cell--actions">
                  <div className="admin-table__actions">
                    {onView && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(item)}
                        className="admin-table__action-btn"
                      >
                        👁️
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(item)}
                        className="admin-table__action-btn"
                      >
                        ✏️
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(item)}
                        className="admin-table__action-btn admin-table__action-btn--danger"
                      >
                        🗑️
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTable;
