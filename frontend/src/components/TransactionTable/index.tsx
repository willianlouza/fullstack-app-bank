import React from "react";

type TableProps = {
  children: React.ReactNode;
}

export default function TransactionTable(props: TableProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="py-2 inline-block w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-black">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                    Data
                  </th>
                  <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                    Valor
                  </th>
                </tr>
              </thead>
              <tbody>
                {props.children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}