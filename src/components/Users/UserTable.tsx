import React from 'react';
import TableOne, { TableColumn } from '../Table/TableOne';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  const columns: TableColumn[] = [
    {
      key: 'id',
      header: 'ID',
      className: 'w-16'
    },
    {
      key: 'name',
      header: 'Tên người dùng',
      render: (value: string) => (
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <span className="text-sm font-medium text-gray-700">
              {value.charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="font-medium text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'email',
      header: 'Email',
      render: (value: string) => (
        <span className="text-gray-600">{value}</span>
      )
    },
    {
      key: 'role',
      header: 'Vai trò',
      render: (value: string) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {value}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Trạng thái',
      render: (value: 'active' | 'inactive') => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value === 'active' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Ngày tạo',
      className: 'w-32',
      render: (value: string) => (
        <span className="text-gray-500 text-sm">
          {new Date(value).toLocaleDateString('vi-VN')}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Danh sách Người dùng</h2>
        <span className="text-sm text-gray-500">
          Tổng cộng: {users.length} người dùng
        </span>
      </div>
      
      <TableOne
        columns={columns}
        data={users}
        className="shadow-lg"
        headerClassName="bg-green-50"
      />
    </div>
  );
};

export default UserTable;
