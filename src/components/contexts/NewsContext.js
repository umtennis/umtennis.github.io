import React, { createContext, useReducer, useContext, useEffect } from 'react';

const NewsStateContext = createContext();
const NewsDispatchContext = createContext();

const googleSheetURL = process.env.REACT_APP_API_KEY_ANNOUNCEMENT;
// const googleSheetURL = "https://script.google.com/macros/s/AKfycbxIn9vncR3YJuShlZttjV3R4i5KqxrxZOWG0ixLnuIhYR9hiAvvy2akQVQ9EofpKel7zA/exec";

const newsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NEWS':
      return {
        ...state,
        newsItems: action.payload,
        loading: false,
      };
    case 'ADD_NEWS':
      return {
        ...state,
        newsItems: [...state.newsItems, action.payload],
      };
    case 'EDIT_NEWS':
      return {
        ...state,
        newsItems: state.newsItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    case 'DELETE_NEWS':
      return {
        ...state,
        newsItems: state.newsItems.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export const NewsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(newsReducer, { newsItems: [], loading: true });

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(googleSheetURL);
        const data = await response.json();

        const sortedData = data.sort((a, b) => b.id - a.id); // Sort by id descending
        dispatch({ type: 'SET_NEWS', payload: sortedData });
      } catch (error) {
        console.error('Failed to fetch news', error);
      }
    };

    fetchNews(); 
  }, []);

  return (
    <NewsStateContext.Provider value={state}>
      <NewsDispatchContext.Provider value={dispatch}>
        {children}
      </NewsDispatchContext.Provider>
    </NewsStateContext.Provider>
  );
};

export const useNewsState = () => useContext(NewsStateContext);
export const useNewsDispatch = () => useContext(NewsDispatchContext);
