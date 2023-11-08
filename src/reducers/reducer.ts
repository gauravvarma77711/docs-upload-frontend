const initialState = {
    files: [],
  };
  
  const rootReducer: any = (state = initialState, action: any) => {
    switch (action.type) {
      case 'ADDFILES':
        return { ...state, files: [...state.files, ...action.data]};
      default:
        return state;
    }
  };
  
  export default rootReducer;