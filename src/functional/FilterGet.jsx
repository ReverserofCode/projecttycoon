import axios from "axios";

export const FilterCall = async (recruits, place) => {
  if (place === "" && recruits !== "") {
    let data = await axios
      .get(`/api/membersByRole?memberRole=${recruits}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return await data;
  }
  if (place !== "" && recruits === "") {
    let data = await axios
      .get(`/api/membersByAcademy/?memberAcademy=${place}`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return await data;
  }
  if (place !== "" && recruits !== "") {
    let data = await axios
      .get(
        `/api/membersByAcademyAndRole?memberAcademy=${place}&memberRole=${recruits}`
      )
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return await data;
  }
  if (place === "" && recruits === "") {
    window.location.reload();
  }
};
