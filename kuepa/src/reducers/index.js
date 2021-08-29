const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_REQUEST":
      state = {
        ...state,
        user: payload,
      };
      break;

    case "LOGOUT_REQUEST":
      state = { ...state, user: {} };
    default:
      return state;
  }
};

export default reducer;
