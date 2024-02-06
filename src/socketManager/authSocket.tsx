import { socket } from ".";
import { checkUserType } from "../helper";

export const authSocketService = {
  logout: () => {
    socket.on("logoutUserForce", () => {
      sessionStorage.clear();
      window.location.replace(`/${checkUserType()}/login`);
    });
  },
};
