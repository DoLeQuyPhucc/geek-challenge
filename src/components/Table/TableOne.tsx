import React from "react";

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

export interface TableOneProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  headerClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
}

const TableOne = <T extends Record<string, unknown> = Record<string, unknown>>({
  columns,
  data,
  className = "",
  headerClassName = "",
  rowClassName = "",
  cellClassName = "",
}: TableOneProps<T>) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
        <thead className={`bg-gray-50 ${headerClassName}`}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 ${
                  column.className || ""
                }`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, index) => (
            <tr
              key={index}
              className={`hover:bg-gray-50 transition-colors duration-200 ${rowClassName}`}
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${cellClassName}`}
                >
                  {column.render
                    ? column.render(row[column.key as keyof T], row)
                    : String(row[column.key as keyof T] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-8 text-gray-500">No data to display</div>
      )}
    </div>
  );
};

export default TableOne;
