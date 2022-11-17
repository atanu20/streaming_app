import Cookies from 'js-cookie';
import React, { createContext, useState, useEffect } from 'react';

const DataContext = createContext();

// const getLocalItmes = () => {
//     let list;
//     if(typeof window !== 'undefined' )
//      {
//         list = localStorage.getItem('nextcart');
//      }

//     if (list) {
//         return JSON.parse(localStorage.getItem('nextcart'));
//     } else {
//         return {};
//     }
// }

// const getLocalAddress=()=>{
//     let list;
//     if(typeof window !== 'undefined' )
//      {
//         list = localStorage.getItem('_next_user_address');
//      }

//     if (list) {
//         return JSON.parse(localStorage.getItem('_next_user_address'));
//     } else {
//         return {};
//     }
// }

const ConTextProvider = ({ children }) => {
  return (
    <>
      <DataContext.Provider value={{}}>{children}</DataContext.Provider>
    </>
  );
};

export { DataContext, ConTextProvider };
