const reducer = (state, { type, payload }) => {
  switch (type) {
    case "LOGIN_REQUEST":
      return {
        ...state,
        user: payload,
        error: null,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: payload.message,
      };

    case "LOGOUT_REQUEST":
      return { ...state, user: {}, error: null };

    case "SET_MESSAGES":
      let messages = [];
      Object.values(payload).forEach((item) => {
        messages.push(item);
      });
      return { ...state, messages, error: null };

    default:
      return state;
  }
};

export default reducer;
