export const clientSlicer = (clients) => {

  const clientList = [];
  const m = clients.length;
  if (m < 10) {
    clientList.push(clients)
    return clientList;
  } else{

    const group = Math.round(m / 11); // clients number 40, group 4
    for (let i = 0; i < group; i++) {
      // i= 0,1,2,3
      clientList.push(clients.slice(i * 10, i * 10 + 10));
    }
    if (group * 10 < m) {
      clientList.push(clients.slice(group * 10-1, m - 1));
    }
    return clientList;
  }
  
};

import React, { useState } from "react";
const Pagination = ({
  dummyclients,
  setCurrentPage,
  setClientsEachPage,
  currentPage,
  clientPage,
}) => {
    const [value, setValue]=useState(0)
  return (
    <div className="d-flex justify-content-end align-items-center">
      <ul className="pagination m-0">
        <li className="p-2">
          <span
            aria-hidden="true"
            onClick={(e) => {
              e.preventDefault();
              
              if (currentPage >= 1) {
                setCurrentPage(currentPage - 1);
                setClientsEachPage(dummyclients[currentPage - 1]);
              }
            }}
          ><button hidden={`${currentPage===1?true:""}`} onClick={()=>setValue(-2)} style={{background:"none",border:"none",color:value===-2?"red":"black"}}>
            &laquo;</button>
          </span>
        </li>
        {clientPage.map((page, index) => (
          <li
            key={index}
            className="p-2 "
            onClick={(e) => {
              e.preventDefault();
              
              setCurrentPage(page);
              setClientsEachPage(dummyclients[page - 1]);
            }}
          ><button onClick={()=>setValue(index)} style={{background:"none",border:"none",color:value===index?"red":"black"}}>{page}</button>
            
          </li>
        ))}
        <li className="p-2">
          {" "}
          <span
            aria-hidden="true"
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < clientPage.length ) {
                setCurrentPage(currentPage + 1);
                setClientsEachPage(dummyclients[currentPage]);
              }
            }}
          ><button hidden={`${currentPage===clientPage.length || clientPage.length === 1?"true":""}`} onClick={()=>setValue(-3)}  style={{background:"none",border:"none",color:value===-3?"red":"black"}}>
            &raquo;</button>
          </span>
        </li>
      </ul>
    </div>
  );
};
export default Pagination;
