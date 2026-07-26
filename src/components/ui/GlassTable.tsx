import React from 'react';

export interface Column<T> {
  header: string;
  accessor: (row: T) => React.ReactNode;
  className?: string;
}

export interface GlassTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  emptyMessage?: string;
}

export function GlassTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  emptyMessage = 'No records found.',
}: GlassTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-3xl border border-white/12 bg-slate-950/60 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <table className="w-full text-left text-sm text-slate-200 border-collapse">
        <thead className="bg-white/05 border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={`px-6 py-4 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/05">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, rIdx) => (
              <tr key={rIdx} className="animate-pulse">
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="px-6 py-4">
                    <div className="h-4 bg-white/10 rounded-full w-3/4" />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-400 font-medium">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={keyExtractor(row)}
                className="hover:bg-white/05 transition-colors duration-150"
              >
                {columns.map((col, cIdx) => (
                  <td key={cIdx} className={`px-6 py-4 ${col.className || ''}`}>
                    {col.accessor(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
