const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: payload,
      };

    case "LOGOUT_REQUEST":
      return { ...state, user: {} };

    case "SET_MESSAGES":
      let messages = [];
      Object.values(payload).forEach((item) => {
        messages.push(item);
      });
      return { ...state, messages };

    default:
      return state;
  }
};

export default reducer;
