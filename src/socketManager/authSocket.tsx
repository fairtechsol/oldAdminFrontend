import { socket } from ".";
import { Constants } from "../utils/Constants";

export const authSocketService = {
  logout: () => {
    socket.on("logoutUserForce", () => {
      sessionStorage.clear();
      window.location.replace(`${Constants.oldAdmin}login`);
    });
  },
};
