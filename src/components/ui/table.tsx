import type { ReactNode } from "react";

interface Column<T> {
  key: string;
  header: string;
  numeric?: boolean;
  render?: (row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  className = "",
}: DataTableProps<T>) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full">
        <thead>
          <tr className="bg-surface-1 border-b border-border-med">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`
                  px-4 py-3 text-[11px] font-medium uppercase tracking-[0.3px] text-text-tertiary
                  ${col.numeric ? "text-right" : "text-left"}
                `}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="h-11 border-b border-border-soft hover:bg-surface-1 transition-colors duration-100"
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`
                    px-4 text-sm
                    ${col.numeric ? "text-right font-mono" : ""}
                  `}
                >
                  {col.render
                    ? col.render(row)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
