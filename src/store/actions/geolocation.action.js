import api from "../../api";

const getCurrentPosition = (payload) => async (dispatch) => {
  const { userId, geolocation } = payload;
  console.log(payload);
  await api.post(`/api/user/${userId}/geolocation`, payload).then((res) => {
    console.log(res);
  });
};

export const geolocationActions = {
  getCurrentPosition,
};
