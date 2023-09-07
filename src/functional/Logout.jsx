import axios from "axios";

export const Logout = async () => {
  let data = await axios
    .post("/api/logoutProcess")
    .then(() => {})
    .catch((err) => {
      alert(err);
    });
};
