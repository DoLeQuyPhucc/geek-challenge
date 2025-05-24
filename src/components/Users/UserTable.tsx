import React from "react";
import { Eye } from "lucide-react";
import TableOne, { TableColumn } from "../Table/TableOne";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  username: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  company?: {
    name: string;
  };
}

interface UserTableProps {
  users: User[];
  onViewDetail: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onViewDetail }) => {
  const generateAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=random&color=fff&size=64`;
  };

  const columns: TableColumn[] = [
    {
      key: "id",
      header: "ID",
      className: "w-16",
    },
    {
      key: "avatar",
      header: "Avatar",
      className: "w-20",
      render: (value: string, row: User) => (
        <div className="flex items-center justify-center">
          <img
            src={generateAvatarUrl(row.name)}
            alt={row.name}
            className="h-10 w-10 rounded-full"
          />
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "phone",
      header: "Phone",
      render: (value: string) => <span className="text-gray-600">{value}</span>,
    },
    {
      key: "website",
      header: "Website",
      render: (value: string) => (
        <a
          href={`https://${value}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline"
        >
          {value}
        </a>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-32",
      render: (value: any, row: User) => (
        <button
          onClick={() => onViewDetail(row.id)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          title="View user detail"
        >
          <Eye className="h-4 w-4 mr-1" />
          Show
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">User List</h2>
        <span className="text-sm text-gray-500">
          Total: {users.length} users
        </span>
      </div>

      <TableOne
        columns={columns}
        data={users}
        className="shadow-lg"
        headerClassName="bg-blue-50"
      />
    </div>
  );
};

export default UserTable;
