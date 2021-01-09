import api from "../api";
import { useQuery } from "react-query";

const useFetchUserList = ({ limit }) => {
  return useQuery("fetchUsers", async () => {
    const res = await api.get(`/api/users?limit=${limit}`);
    return res.data;
  });
};

export default useFetchUserList;
