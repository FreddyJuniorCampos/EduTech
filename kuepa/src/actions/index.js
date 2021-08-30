import axios from "axios";

export const loginRequest = (payload) => ({
  type: "LOGIN_REQUEST",
  payload,
});

export const logoutRequest = (payload) => ({
  type: "LOGOUT_REQUEST",
  payload,
});

export const registerRequest = (payload) => ({
  type: "REGISTER_REQUEST",
  payload,
});

export const setMessages = (payload) => ({
  type: "SET_MESSAGES",
  payload,
});

export const setError = (payload) => ({
  type: "SET_ERROR",
  payload,
});

export const registerUser = (payload, redirectUrl) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3001/register`, payload)
      .then(({ data }) => dispatch(registerRequest(data)))
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((error) => dispatch(setError(error)));
  };
};

export const loginUser = ({ username, password }, redirectUrl) => {
  return (dispatch) => {
    axios({
      url: `http://localhost:3001/auth/login`,
      method: "post",
      auth: {
        username: username,
        password,
      },
    })
      .then(({ data }) => {
        document.cookie = `email=${data.user.email}`;
        document.cookie = `username=${data.user.username}`;
        document.cookie = `id=${data.user.id}`;
        document.cookie = `token=${data.token}`;
        dispatch(loginRequest(data.user));
      })
      .then(() => {
        window.location.href = redirectUrl;
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const loadMessages = (token) => {
  return (dispatch) => {
    axios({
      url: `http://localhost:3001/api/messages`,
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(({ data }) => {
        dispatch(setMessages(data.data));
      })
      .catch((err) => dispatch(setError(err)));
  };
};

export const sendMessage = (token, user, message) => {
  return (dispatch) => {
    axios({
      url: `http://localhost:3001/api/messages`,
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        message,
      },
    })
      .then(() => {
        dispatch(loadMessages(token));
      })
      .catch((err) => dispatch(setError(err)));
  };
};
