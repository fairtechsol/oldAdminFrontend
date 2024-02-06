import { Box, Typography } from "@mui/material";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../../assets";
import { AccountListRowInterface } from "../../../interface/listOfClients";
import StyledImage from "../../Common/StyledImages";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { memo, useState } from "react";
import RowModalComponents from "./RowModalCompExpert";
import { checkUserType } from "../../../helper";

const AccountListExpertRow = (props: AccountListRowInterface) => {
  const {
    containerStyle,
    fContainerStyle,
    fTextStyle,
    element,
    showOptions,
    show,
    showUserDetails,
  } = props;

  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <>
      <Box
        sx={[
          {
            width: "100%",
            display: "flex",
            height: "45px",
            background: "#0B4F26",
            alignItems: "center",
            overflow: "hidden",
            borderBottom: "2px solid white",
          },
          containerStyle,
        ]}
      >
        <Box
          sx={[
            {
              width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
              display: "flex",
              paddingX: "10px",
              justifyContent: "space-between",
              alignItems: "center",
              height: "45px",
              borderRight: "2px solid white",
            },
            fContainerStyle,
          ]}
        >
          <Typography
            variant="h5"
            sx={[
              {
                cursor: "pointer",
                textTransform: "capitalize",
                wordBreak: "break-all",
              },
              fTextStyle,
            ]}
          >
            {element?.userName}
          </Typography>
          {showOptions && !show && (
            <EditOutlinedIcon
              fontSize="medium"
              onClick={() => {
                navigate(`/${checkUserType()}/edit_account`, {
                  state: {
                    id: element?.id,
                    expertMatchDetail: element,
                  },
                });
              }}
              sx={{
                color:
                  fContainerStyle.background == "#F8C851"
                    ? "#0B4F26"
                    : "#FFFFFF",
                cursor: "pointer",
              }}
            />
          )}
          {showOptions && (
            <StyledImage
              onClick={() => {
                setShowUserModal((prev) => !prev);
                setSelected(null);
              }}
              src={
                fContainerStyle.background == "#F8C851" ? DownGIcon : DownIcon
              }
              style={{ cursor: "pointer", width: "16px", height: "12px" }}
            />
          )}
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element?.allPrivilege ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <StyledImage
            src={element?.addMatchPrivilege ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box>
          <Typography variant="h5" sx={{ color: "white" }}>
            {element?.betFairMatchPrivilege}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element?.betFairMatchPrivilege ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element?.bookmakerMatchPrivilege ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={element?.sessionMatchPrivilege ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <StyledImage
            src={!element?.userBlock ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element?.city}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element?.phoneNumber}</Typography>
        </Box>
        {/* <Box
          sx={{
            width: { lg: "15vw", md: "20.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element?.roleName}</Typography>
        </Box> */}
      </Box>
      {showUserModal && (
        <Box
          sx={[
            {
              width: "100%",
              display: "flex",
              height: "100%",
              background: "#0B4F26",
              alignItems: "center",
              overflow: "hidden",
              flexDirection: { xs: "column", lg: "row" },
            },
            containerStyle,
          ]}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              visibility: showUserDetails ? "visible" : "hidden",
              alignItems: "center",
              height: "100%",
            }}
          >
            <RowModalComponents
              selected={selected}
              element={element}
              setSelected={setSelected}
              // getListOfUser={getListOfUser}
              // setShowUserModal={setShowUserModal}
              backgroundColor={containerStyle?.background}
              // userModal={userModal}
              // setShowSuccessModal={setShowSuccessModal}
              // setShowModalMessage={setShowModalMessage}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default memo(AccountListExpertRow);
