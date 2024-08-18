import React, { createContext, useReducer, useContext } from 'react';

const LinkStateContext = createContext();
const LinkDispatchContext = createContext();

const linkReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LINKS':
      return {
        ...state,
        linkItems: action.payload || [], // Ensure linkItems is an array
        loading: false,
      };
    case 'ADD_LINK':
      return {
        ...state,
        linkItems: [...state.linkItems, action.payload],
      };
    case 'EDIT_LINK':
      return {
        ...state,
        linkItems: state.linkItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_LINK':
      return {
        ...state,
        linkItems: state.linkItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const LinkProvider = ({ children }) => {
  const [state, dispatch] = useReducer(linkReducer, { linkItems: [], loading: true });

  return (
    <LinkStateContext.Provider value={state}>
      <LinkDispatchContext.Provider value={dispatch}>
        {children}
      </LinkDispatchContext.Provider>
    </LinkStateContext.Provider>
  );
};

export const useLinkState = () => useContext(LinkStateContext);
export const useLinkDispatch = () => useContext(LinkDispatchContext);
