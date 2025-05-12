import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownGIcon, DownIcon, LockIcon, UnLockIcon } from "../../assets";
import { formatToINR } from "../../helper";
import { AccountListRowInterface } from "../../interface/listOfClients";
import { ApiConstants, Constants } from "../../utils/Constants";
import StyledImage from "../Common/StyledImages";
import CommissionReportTable from "../commisionReport/CommissionReportTable";
import AccountListModal from "./AccountListModal";
import RowModalComponents from "./RowModalComponents";
import EventWiseExposureModal from "./eventWiseExposureModal";
import EventWiseMatchListModal from "./eventWiseMatchListModal";

const AccountListRow = ({
  containerStyle,
  fContainerStyle,
  fTextStyle,
  profit,
  element,
  currentPage,
}: AccountListRowInterface) => {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSubUsers, setSubSusers] = useState({
    value: false,
    id: "",
    title: "",
  });
  const [showUserWiseExposureModal, setShowUserWiseExposureModal] =
    useState(false);
  const [showUserWiseMatchListModal, setShowUserWiseMatchListModal] = useState({
    status: false,
    value: {},
    matchType: "",
  });
  const [selected, setSelected] = useState(null);

  const [values, setValues] = useState({
    depositeValue: 0,
    withdrawValue: 0,
    creditValue: 0,
    exposureValue: 0,
  });

  const [lockValue, setLockValue] = useState<any>(null);
  const [typeOfAmount, setTypeOfAmount] = useState<string>("");
  const [showCommissionReport, setShowCommissionReport] = useState({
    value: false,
    id: "",
  });
  const handleAmountChange = (amount: any, id: string, type: string) => {
    if (id === element?.id) {
      setTypeOfAmount(type);
      if (type === "deposite") {
        setValues((prev) => ({
          ...prev,
          depositeValue: Number(amount),
        }));
      } else if (type === "withdraw") {
        setValues((prev) => ({
          ...prev,
          withdrawValue: Number(amount),
        }));
      } else if (type === "credit") {
        setValues((prev) => ({
          ...prev,
          creditValue: Number(amount),
        }));
      } else if (type === "exposure") {
        setValues((prev) => ({
          ...prev,
          exposureValue: Number(amount),
        }));
      } else if (type === "lock") {
        setLockValue(amount);
      }
    }
  };

  const calculateValue = (): number => {
    const baseValue = +element?.userBal?.profitLoss || 0;

    if (Number(baseValue) >= 0) {
      return Number(
        typeOfAmount === "deposite"
          ? baseValue + values.depositeValue
          : typeOfAmount === "withdraw"
          ? baseValue - values.withdrawValue
          : typeOfAmount === "credit" && values.creditValue
          ? baseValue + element?.creditRefrence - values.creditValue
          : baseValue
      );
    } else {
      return Number(
        typeOfAmount === "deposite"
          ? baseValue + values.depositeValue
          : typeOfAmount === "withdraw"
          ? baseValue - values.withdrawValue
          : typeOfAmount === "credit" && values.creditValue
          ? baseValue + element?.creditRefrence - values.creditValue
          : baseValue
      );
    }
  };

  const formattedClientPLValue = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(calculateValue());

  const calculateProfitLoss = (): number => {
    const baseProfitLoss = +element?.percentProfitLoss || 0;

    if (typeof baseProfitLoss === "number" && baseProfitLoss >= 0) {
      return Number(
        typeOfAmount === "deposite"
          ? (Number(+element?.userBal?.profitLoss + values.depositeValue) *
              element?.upLinePartnership) /
              100
          : typeOfAmount === "credit" && values.creditValue
          ? (Number(
              +element?.userBal?.profitLoss +
                element?.creditRefrence -
                values.creditValue
            ) *
              element?.upLinePartnership) /
            100
          : typeOfAmount === "withdraw"
          ? (Number(+element?.userBal?.profitLoss - values.withdrawValue) *
              element?.upLinePartnership) /
            100
          : +element?.percentProfitLoss || 0
      );
    } else {
      return Number(
        typeOfAmount === "deposite"
          ? (Number(+element?.userBal?.profitLoss + values.depositeValue) *
              element?.upLinePartnership) /
              100
          : typeOfAmount === "credit" && values.creditValue
          ? (Number(
              +element?.userBal?.profitLoss +
                element?.creditRefrence -
                values.creditValue
            ) *
              element?.upLinePartnership) /
            100
          : typeOfAmount === "withdraw"
          ? (Number(+element?.userBal?.profitLoss - values.withdrawValue) *
              element?.upLinePartnership) /
            100
          : +element?.percentProfitLoss || 0
      );
    }
  };

  function formatAmount(amount: string) {
    const [numericPart, percentagePart] = amount?.split("(");
    const formattedNumericPart = formatToINR(Number(numericPart));
    return `${formattedNumericPart}(${percentagePart}`;
  }

  const formattedPLValue = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  }).format(calculateProfitLoss());

  const handleClearValue = () => {
    setValues({
      depositeValue: 0,
      withdrawValue: 0,
      creditValue: 0,
      exposureValue: 0,
    });
    setLockValue(null);
  };
  const formattedCRValue =
    typeOfAmount === "credit" && values.creditValue > 0
      ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
          Number(+values.creditValue)
        )
      : new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
          +element?.creditRefrence || 0
        );

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
            onClick={(e: any) => {
              e.stopPropagation();
              if (!["user"].includes(element?.roleName)) {
                setSubSusers({
                  value: true,
                  id: element?.id,
                  title: element?.userName,
                });
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
          <EditOutlinedIcon
            fontSize="medium"
            onClick={() => {
              navigate(`${Constants.oldAdmin}add_account/${element?.id}`);
            }}
            sx={{
              color:
                fContainerStyle.background == "#F8C851" ? "#0B4F26" : "#FFFFFF",
              cursor: "pointer",
            }}
          />
          <StyledImage
            onClick={() => {
              setShowUserModal((prev) => !prev);
              setSelected(null);
              handleClearValue();
            }}
            src={fContainerStyle.background == "#F8C851" ? DownGIcon : DownIcon}
            alt="arrow"
            style={{ cursor: "pointer", width: "16px", height: "12px" }}
          />
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
          <Typography variant="h5">{formattedCRValue}</Typography>
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
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  typeOfAmount === "withdraw"
                    ? Number(+element?.balance - values.withdrawValue)
                    : Number(+element?.balance || 0)
                )}
              </>
            ) : (
              new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                typeOfAmount === "withdraw"
                  ? Number(+element?.balance - values.withdrawValue)
                  : Number(+element?.balance || 0)
              )
            )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "11.5vw", md: "11.5vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            justifyContent: "space-between",
            background: calculateValue() >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {formattedClientPLValue}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            alt="arrow updown"
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
            background: calculateProfitLoss() >= 0 ? "#27AC1E" : "#E32A2A",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography variant="h5" sx={{ color: "white" }}>
            {formattedPLValue}
          </Typography>
          <StyledImage
            src={
              profit
                ? "https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                : "https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
            }
            alt="arrow updown"
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
          <Typography variant="h5">
            {formatAmount(element?.commission || "0")}
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
            cursor: "pointer",
          }}
          onClick={() => {
            setShowUserWiseExposureModal(true);
          }}
        >
          <Typography variant="h5">
            {formatToINR(+element?.userBal?.exposure) || 0}
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
                {new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  typeOfAmount === "deposite"
                    ? +element?.availableBalance + values.depositeValue
                    : typeOfAmount === "withdraw"
                    ? +element?.availableBalance - values.withdrawValue
                    : +element?.availableBalance || 0
                )}
              </>
            ) : (
              new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                typeOfAmount === "deposite"
                  ? +element?.availableBalance + values.depositeValue
                  : typeOfAmount === "withdraw"
                  ? +element?.availableBalance - values.withdrawValue
                  : +element?.availableBalance || 0
              )
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
            src={
              lockValue
                ? !lockValue?.all_blocked
                  ? UnLockIcon
                  : LockIcon
                : !element?.userBlock
                ? UnLockIcon
                : LockIcon
            }
            alt="lock unlock"
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
            src={
              lockValue
                ? !lockValue?.bet_blocked
                  ? UnLockIcon
                  : LockIcon
                : !element?.betBlock
                ? UnLockIcon
                : LockIcon
            }
            alt="lock unlock"
            sx={{ height: "20px", width: "20px", fill: "#27AC1E" }}
          />
        </Box>

        <Box
          sx={{
            width: { lg: "8vw", md: "8vw", xs: "26.5vw" },
            display: "flex",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
            paddingX: "10px",
          }}
        >
          <Typography variant="h5">
            {typeOfAmount === "exposure" && values.exposureValue > 0
              ? new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  Number(values.exposureValue)
                )
              : new Intl.NumberFormat("en-IN", { currency: "INR" }).format(
                  +element?.exposureLimit ? element?.exposureLimit : 0
                )}
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "10vw", md: "10vw", xs: "26.5vw" },
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
          }}
        >
          <Typography variant="h5">{element.roleName}</Typography>
        </Box>
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
                    <Typography
                      variant="h5"
                      sx={[
                        {
                          color: "white",
                          textAlign: { lg: "left", xs: "left" },
                          width: { lg: "100%", xs: "100px" },
                        },
                        fTextStyle,
                      ]}
                    >
                      {element?.matchComissionType} Com {":"}
                      {element?.matchCommission ? element?.matchCommission : 0}
                    </Typography>
                  ) : (
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
                      Match Com : 0
                    </Typography>
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
                          width: { lg: "100%", xs: "100px" },
                        },
                        fTextStyle,
                      ]}
                    >
                      Session Com {": "}
                      {element?.sessionCommission
                        ? element?.sessionCommission
                        : 0}
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
                    />
                  </Box>
                </Box>
              </Box>
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
                    setShowCommissionReport({
                      value: true,
                      id: element?.id,
                    });
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
                  alt="arrow up down"
                  sx={{
                    height: { lg: "10px", xs: "14px" },
                    cursor: "pointer",
                    width: { lg: "15px", xs: "23px" },
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <RowModalComponents
              selected={selected}
              element={element}
              setSelected={setSelected}
              setShowUserModal={setShowUserModal}
              backgroundColor={containerStyle?.background}
              onValueChange={handleAmountChange}
              currentPage={currentPage}
            />
          </Box>
        </Box>
      )}

      <ModalMUI
        open={showCommissionReport?.value}
        onClose={() => {
          setShowCommissionReport({ value: false, id: "" });
        }}
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
        >
          <CommissionReportTable
            title={element?.userName}
            id={showCommissionReport?.id}
            setShow={setShowCommissionReport}
          />
        </Box>
      </ModalMUI>
      <ModalMUI
        open={showUserWiseExposureModal}
        onClose={() => {
          setShowUserWiseExposureModal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EventWiseExposureModal
            setShowUserWiseExposureModal={setShowUserWiseExposureModal}
            userName={element?.userName}
            userId={element?.id}
            setShowUserWiseMatchListModal={setShowUserWiseMatchListModal}
          />
        </Box>
      </ModalMUI>
      <ModalMUI
        open={showUserWiseMatchListModal?.status}
        onClose={() => {
          setShowUserWiseMatchListModal({
            status: false,
            value: {},
            matchType: "",
          });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <EventWiseMatchListModal
            setShowUserWiseMatchListModal={setShowUserWiseMatchListModal}
            userName={element?.userName}
            data={showUserWiseMatchListModal?.value}
            userId={element?.id}
            roleName={element?.roleName}
            matchType={showUserWiseMatchListModal?.matchType}
          />
        </Box>
      </ModalMUI>
      <ModalMUI
        open={showSubUsers?.value}
        onClose={() => {
          setSubSusers({ value: false, id: "", title: "" });
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AccountListModal
            endpoint={ApiConstants.USER.LIST}
            id={showSubUsers?.id}
            setShow={setSubSusers}
            title={showSubUsers?.title}
            element={element}
          />
        </Box>
      </ModalMUI>
    </>
  );
};

export default memo(AccountListRow);
