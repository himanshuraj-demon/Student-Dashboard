import api from "./api";

export const getUsers = async () => {
  const res = await api.get("/user/admin");
  return res.data;
};

export const updateRole = async (
  id: string,
  role: string
) => {
  const res = await api.patch(
    `/user/admin/${id}/role`,
    { role }
  );

  return res.data;
};