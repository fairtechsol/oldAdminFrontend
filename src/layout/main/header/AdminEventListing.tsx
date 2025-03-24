import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ADDACCOUNT,
  CHECKLIST,
  Cricket,
  Football,
  MYACCOUNT,
  Play,
  TEAM,
  Tennis,
  TREND,
  WALLET
} from "../../../assets";
import { RootState } from "../../../store/store";
import { Constants } from "../../../utils/Constants";
import AdminEventComponent from "./AdminEventComponent";

const data = [
  { id: 1, title: "INPLAY", image: Play, url: "live_market" },
  { id: 2, title: "CRICKET", image: Cricket, url: "matchList/cricket" },
  { id: 3, title: "FOOTBALL", image: Football, url: "matchList/football" },
  { id: 4, title: "TENNIS", image: Tennis, url: "matchList/tennis" },
  { id: 5, title: "Add Account", image: ADDACCOUNT, url: "add_account" },
  { id: 6, title: "Client list", image: TEAM, url: "list_of_clients" },

  { id: 7, title: "Analysis", image: TREND, url: "market_analysis" },
  {
    id: 8,
    title: "Reports",
    image: CHECKLIST,
    url: "reports",
  },
  { id: 9, title: "My Account", image: MYACCOUNT, url: "my-account" },
];

const AdminEventListing = () => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [newData, setNewData] = useState<any>(data);

  useEffect(() => {
    if (profileDetail?.roleName === "fairGameWallet") {
      setNewData((prev: any) => {
        const newData = [...prev];
        const body = {
          id: 7,
          title: "wallet",
          image: WALLET,
          url: "walletsettings",
        };
        const objectExists = prev.some((item: any) => item?.id === body?.id);
        if (!objectExists) {
          const secondLastIndex = prev.length - 1;
          newData.splice(secondLastIndex, 0, body);
        }
        return newData;
      });
    }
  }, [profileDetail]);

  return (
    <Box
      sx={[
        {
          width: { xs: "98%", lg: "100%" },
          msOverflowStyle: "none",
          overflowY: "hidden",
          minHeight: { xs: 95, lg: 80 },
          marginLeft: { xs: "0", lg: ".5vw" },
          overflowX: "auto",
          alignSelf: { xs: "center", lg: "flex-start" },
          display: "flex",
        },
      ]}
    >
      {newData?.map((i: any, idx: any) => {
        return (
          <NavLink
            key={idx}
            to={`${Constants.oldAdmin}${i.url}`}
            className={({ isActive }) =>
              [isActive ? "activeEventTab" : ""].join(" ")
            }
            style={{ textDecoration: "none" }}
          >
            <AdminEventComponent data={i} />
          </NavLink>
        );
      })}
    </Box>
  );
};

export default AdminEventListing;
