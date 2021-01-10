import api from "../api";
import { useQuery } from "react-query";

const useRoomHook = (id) => {
  return useQuery("fetchUsers", async () => {
    const { data } = await api.get(`/api/room/${id}`);
    return data.data;
  });
};

export default useRoomHook;
