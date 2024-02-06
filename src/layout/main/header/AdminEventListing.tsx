import { Box } from "@mui/system";
import {
  ADDACCOUNT,
  CHECKLIST,
  MYACCOUNT,
  Play,
  TEAM,
  TREND,
  WALLET,
} from "../../../assets";
import AdminEventComponent from "./AdminEventComponent";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { checkUserType } from "../../../helper";

const data = [
  { id: 1, title: "INPLAY", image: Play, url: "live_market" },
  { id: 2, title: "Add Account", image: ADDACCOUNT, url: "add_account" },
  { id: 3, title: "Client list", image: TEAM, url: "list_of_clients" },

  { id: 4, title: "Analysis", image: TREND, url: "market_analysis" },
  {
    id: 5,
    title: "Reports",
    image: CHECKLIST,
    url: "reports",
  },
  { id: 6, title: "My Account", image: MYACCOUNT, url: "my-account" },
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
            to={`/${checkUserType()}/${i.url}`}
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
