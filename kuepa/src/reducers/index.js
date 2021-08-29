const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_REQUEST":
      state = {
        ...state,
        user: payload,
      };
      break;

    default:
      return state;
  }
};

export default reducer;
