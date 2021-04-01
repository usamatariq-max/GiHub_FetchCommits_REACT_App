export const initialState = {
  isLoggedIn: false,
  user: {login: ''},
  token: ''
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      localStorage.setItem("isLoggedIn", JSON.stringify(action.payload.isLoggedIn))
      localStorage.setItem("user", JSON.stringify(action.payload.user))
      return {
        ...state,
        isLoggedIn: action.payload.isLoggedIn,
        user: action.payload.user,
        token: action.payload.token
      };
    }
    case "LOGOUT": {
      localStorage.clear()
      return {
        ...state,
        isLoggedIn: false,
        user: {login: ''}
      };
    }
    default:
      return state;
  }
};
