import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../assets";
import { AccountListRowInterface } from "../../interface/listOfClients";
import StyledImage from "../Common/StyledImages";
import RowModalComponents from "./RowModalComponents";
import { Modal } from "../Common/Modal";
import CommissionReportTable from "../commisionReport/CommissionReportTable";
import { checkUserType } from "../../helper";

const AccountListRow = (props: AccountListRowInterface) => {
  const {
    containerStyle,
    fContainerStyle,
    fTextStyle,
    profit,
    element,
    getListOfUser,
    showOptions,
    showCReport,
    showUserDetails,
    show,
  } = props;

  const navigate = useNavigate();

  const [userModal] = useState({});
  const [showUserModal, setShowUserModal] = useState(false);
  const [showModalMessage, setShowModalMessage] = useState("No data found");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selected, setSelected] = useState(null);

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
            onClick={() => {
              if (!["user", "expert"].includes(element?.roleName)) {
                // setSubSusers({
                //   value: true,
                //   id: element?.id,
                //   title: element?.userName,
                // });
              } else {
                return false;
              }
            }}
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
          {showOptions && element?.roleName !== "expert" && (
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
            width: { lg: "10.5vw", md: "10.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{+element?.creditRefrence || 0}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {Number(+element?.balance || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(+element?.balance || 0)}
              </>
            ) : (
              Number(+element?.balance || 0)
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background:
              Number(+element?.userBal?.profitLoss || 0) >= 0
                ? "#27AC1E"
                : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {Number(+element?.userBal?.profitLoss || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {+element?.userBal?.profitLoss || 0}
              </>
            ) : (
              +element?.userBal?.profitLoss || 0
            )}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background:
              Number(+element?.percentProfitLoss || 0) >= 0
                ? "#27AC1E"
                : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {Number(+element?.percentProfitLoss || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {+element?.percentProfitLoss || 0}
              </>
            ) : (
              +element?.percentProfitLoss || 0
            )}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            sx={{
              height: "15px",
              marginLeft: "5px",
              filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
              width: "15px",
            }}
          />
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            justifyContent: "space-between",
            paddingX: "10px",
            alignItems: "center",

            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element?.commission || 0}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {+element?.userBal?.exposure || 0}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "9.5vw", md: "9.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">
            {Number(+element?.availableBalance || 0) >= 0 ? (
              <>
                <span style={{ visibility: "hidden" }}>-</span>
                {Number(+element?.availableBalance || 0)}
              </>
            ) : (
              Number(+element?.availableBalance || 0)
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "5vw", md: "5vw", xs: "14vw" },
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
            width: { lg: "5vw", md: "5vw", xs: "14vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <StyledImage
            src={!element?.betBlock ? UnLockIcon : LockIcon}
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>

        <Box
          sx={{
            width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <Typography variant="h5">{element?.exposureLimit}</Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5">{element.roleName}</Typography>{" "}
        </Box>
      </Box>

      {showUserModal && element?.roleName !== "expert" && (
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
            sx={[
              {
                width: {
                  lg: "11vw",
                  md: "25vw",
                  xs: "96vw",
                },
                alignSelf: "stretch",
                justifyContent: "space-between",
                borderRight: "2px solid white",
              },
              fContainerStyle,
            ]}
          >
            <Box
              sx={{
                width: "100% ",
                height: "100%",
                padding: "10px",
                display: { lg: "block", xs: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
                overflow: "hidden",
                borderBottom: "2px solid white",
              }}
            >
              <Box sx={{ width: { lg: "100%", xs: "50%" } }}>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: {
                      lg: "flex-start",
                      xs: "flex-start",
                    },
                  }}
                >
                  {element?.matchComissionType ? (
                    <>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: { lg: "left", xs: "left" },
                            width: { lg: "100px", xs: "100px" },
                          },
                          fTextStyle,
                        ]}
                      >
                        {element?.matchComissionType} Com
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: "center",
                            marginRight: "1px",
                          },
                          fTextStyle,
                        ]}
                      >
                        {":"}{" "}
                        {element?.matchCommission
                          ? element?.matchCommission
                          : 0}
                      </Typography>
                    </>
                  ) : (
                    <>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: { lg: "left", xs: "left" },
                            width: { lg: "100px", xs: "100px" },
                          },
                          fTextStyle,
                        ]}
                      >
                        Match Com
                      </Typography>
                      <Typography
                        variant="h5"
                        sx={[
                          {
                            color: "white",
                            textAlign: "left",
                          },
                          fTextStyle,
                        ]}
                      >
                        : 0
                      </Typography>
                    </>
                  )}
                </Box>

                <Box sx={{ display: "flex" }}>
                  <Box sx={{ display: "flex" }}>
                    <Typography
                      variant="h5"
                      sx={[
                        {
                          color: "white",
                          textAlign: { lg: "left", xs: "left" },
                          width: { lg: "100px", xs: "100px" },
                        },
                        fTextStyle,
                      ]}
                    >
                      Session Com
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={[
                        {
                          color: "white",
                          textAlign: "center",
                          marginRight: "1px",
                        },
                        fTextStyle,
                      ]}
                    >
                      {": "}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h5"
                    sx={[
                      {
                        color: "white",
                        textAlign: "left",
                        marginLeft: "3px",
                      },
                      fTextStyle,
                    ]}
                  >
                    {element?.sessionCommission
                      ? element?.sessionCommission
                      : 0}
                  </Typography>
                </Box>
              </Box>
              {showCReport && (
                <Box
                  sx={{
                    display: "flex",
                    marginTop: { lg: "10px", xs: "0" },
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    marginRight: { lg: "0", xs: "5px" },
                    width: { lg: "100%", xs: "33%" },
                  }}
                  onClick={() => {
                    if (element?.totalComission !== null) {
                      setShowSuccessModal(true);
                    } else {
                      return false;
                    }
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={[
                      {
                        color: "white",
                        textAlign: "center",
                        alignItems: "center",
                        marginRight: { lg: "0", xs: "3px" },
                      },
                      fTextStyle,
                    ]}
                  >
                    Commission Details
                  </Typography>
                  <StyledImage
                    src={
                      fContainerStyle.background == "#F8C851"
                        ? DownGIcon
                        : DownIcon
                    }
                    sx={{
                      height: { lg: "10px", xs: "14px" },
                      cursor: "pointer",
                      width: { lg: "15px", xs: "23px" },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>

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
              getListOfUser={getListOfUser}
              setShowUserModal={setShowUserModal}
              backgroundColor={containerStyle?.background}
              userModal={userModal}
              setShowSuccessModal={setShowSuccessModal}
              setShowModalMessage={setShowModalMessage}
            />
          </Box>
        </Box>
      )}

      <ModalMUI
        open={false}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        ></Box>
      </ModalMUI>

      {showSuccessModal && (
        <Modal
          message={showModalMessage}
          setShowSuccessModal={setShowSuccessModal}
          showSuccessModal={showSuccessModal}
          buttonMessage={"OK"}
          navigateTo={"list_of_clients"}
          title={`${element?.userName} - (Commission Report)`}
        >
          <CommissionReportTable />
        </Modal>
      )}
    </>
  );
};

export default AccountListRow;
