import React from 'react';
import TableOne, { TableColumn } from '../Table/TableOne';

interface Album {
  id: number;
  title: string;
  artist: string;
  year: number;
}

interface AlbumTableProps {
  albums: Album[];
}

const AlbumTable: React.FC<AlbumTableProps> = ({ albums }) => {
  const columns: TableColumn[] = [
    {
      key: 'id',
      header: 'ID',
      className: 'w-16'
    },
    {
      key: 'title',
      header: 'Tên Album',
      render: (value: string) => (
        <span className="font-medium text-gray-900">{value}</span>
      )
    },
    {
      key: 'artist',
      header: 'Nghệ sĩ',
      render: (value: string) => (
        <span className="text-gray-600">{value}</span>
      )
    },
    {
      key: 'year',
      header: 'Năm phát hành',
      className: 'w-32',
      render: (value: number) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Danh sách Album</h2>
        <span className="text-sm text-gray-500">
          Tổng cộng: {albums.length} album
        </span>
      </div>
      
      <TableOne
        columns={columns}
        data={albums}
        className="shadow-lg"
        headerClassName="bg-blue-50"
      />
    </div>
  );
};

export default AlbumTable;
