import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import { useState } from "react";
import moment from "moment";
import StyledImage from "./StyledImage";
import ArrowDown from "../../assets/images/arrowDown.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const CommissionReportTable = ({ id }: any) => {
  const [currentPage] = useState(1);
  const [showCommisionReport, setShowCommisionReport] = useState(false);
  const [selectedId, setSelectedId] = useState({
    match_id: "",
    user_id: "",
  });
  const MatchList = ({
    element,
    index,
    showCommisionReport,
    setShowCommisionReport,
    selectedId,
    setSelectedId,
    getCommisionReport,
    id,
  }: any) => {
    return (
      <Box sx={{ width: "100%" }}>
  
        <Box
          onClick={() => {
            if (
              selectedId?.match_id == element?.match_id &&
              selectedId?.user_id == id
            ) {
            } else {
              setSelectedId({
                match_id: element?.match_id,
                user_id: id,
              });
              setShowCommisionReport(true);
              getCommisionReport(element?.match_id);
            }
          }}
          sx={{
            width: "100%",
            height: "50px",
            background: "white",
            display: "flex",
            padding: 0.1,
          }}
        >
          <Box
            sx={{
              width: { xs: "10%", lg: "5%" },
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              background: "black",
            }}
          >
            <Typography
              sx={{ fontSize: "14px", color: "white", fontWeight: "600" }}
            >
              {1 + index}
            </Typography>
          </Box>
          <Box
            sx={{
              width: { xs: "90%", lg: "100%" },
              position: "relative",
              height: "100%",
              paddingY: "4px",
              alignItems: { lg: "center", xs: "center" },
              display: "flex",
              paddingX: "10px",
              background: "#0B4F26",
              marginLeft: 0.1,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                flexDirection: "row",
                display: "flex",
                alignItems: "center",
                marginTop: { xs: "5px", lg: "0" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: "10px", lg: "15px" },
                  color: "white",
                  fontWeight: "600",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  lineClamp: 2,
                }}
              >
                {element?.match_title}
              </Typography>
              <Typography
                sx={{
                  fontSize: { lg: "10px", xs: "0" },
                  color: "white",
                  marginLeft: "5px",
                  fontWeight: "500",
                }}
              >
                ({moment(element?.match_createAt).format("DD-MM-YYYY")})
              </Typography>
            </Box>
            <StyledImage
              src={ArrowDown}
              sx={{
                width: { lg: "20px", xs: "10px" },
                height: { lg: "10px", xs: "6px" },
                transform:
                  showCommisionReport &&
                  selectedId?.match_id == element?.match_id
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
              }}
            />
          </Box>
        </Box>
        {showCommisionReport && selectedId?.match_id == element?.match_id && (
          <>
            <Box
              sx={{
                width: { xs: "100%", lg: "96%" },
                marginTop: { xs: ".25vh" },
                marginLeft: { lg: "4%" },
                display: "flex",
                // flexDirection: { lg: "row", xs: "column" },
                flexDirection: { lg: "column", xs: "column" },
              }}
            ></Box>
          </>
        )}
      </Box>
    );
  };

  const ListHeaderT = () => {
    return (
      <Box
        sx={{
          width: { xs: "218%", lg: "100%", md: "100%" },
          display: "flex",
          height: "35px",
          background: "#262626",
          alignItems: "center",
          borderTop: "2px solid white",
          borderBottom: "2px solid white",
        }}
      >
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: {
                xs: "10px",
                lg: "12px",
                md: "12px",
                lineHeight: 1,
              },
            }}
          >
            User Name
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: {
                xs: "10px",
                lg: "12px",
                md: "12px",
                lineHeight: 1,
              },
            }}
          >
            Commission Type
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Name
          </Typography>
        </Box>

        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Date/Time
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Team
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Odds
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Bet Type
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "15%", md: "15%", xs: "15%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { xs: "10px", lg: "12px", md: "12px" },
            }}
          >
            Stack
          </Typography>
        </Box>

        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: {
                xs: "10px",
                lg: "12px",
                md: "12px",
                lineHeight: 1,
              },
            }}
          >
            Commission Amount
          </Typography>
        </Box>
        <Box
          sx={{
            width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
            display: "flex",
            paddingLeft: "10px",
            alignItems: "center",
            height: "35px",
            borderRight: "2px solid white",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: {
                xs: "10px",
                lg: "12px",
                md: "12px",
                lineHeight: 1,
              },
            }}
          >
            My Commission
          </Typography>
        </Box>
      </Box>
    );
  };

  const Footer = ({ currentPage, pages, callPage }: any) => {
    return (
      <Box
        sx={{
          height: "50px",
          display: "flex",
          width: "100%",
          alignItems: "center",
          px: { xs: "5px", lg: "10px" },
          justifyContent: "space-between",
          background: "#FAFAFA",
          paddingX: "10%",
        }}
      >
        <Typography
          sx={{ fontSize: { xs: "12px", lg: "14px" }, fontWeight: "600" }}
        >
          Showing 1 to {pages}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "10px",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              height: "35px",
              width: { xs: "80px", lg: "100px" },
              background: "#0B4F26",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                paddingLeft: "18px",
                fontSize: { lg: "14px", xs: "12px" },
              }}
            >
              Previous
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              marginX: { lg: "10px", xs: "5px" },
              width: "40px",
              background: "#262626",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: "14px", xs: "12px" },
              }}
            >
              {currentPage}
            </Typography>
          </Box>
          <Box
            sx={{
              height: "35px",
              width: { xs: "80px", lg: "100px" },
              background: "#0B4F26",
              display: "flex",
              borderRadius: "5px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
            }}
            onClick={() => {
              callPage(
                parseInt(currentPage) === pages
                  ? pages
                  : parseInt(currentPage) + 1
              );
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: { lg: "14px", xs: "12px" },
              }}
            >
              Next
            </Typography>
          </Box>
        </Box>
      </Box>
    );
  };

  // const AccountListRow = ({
  //   containerStyle,
  //   fContainerStyle,
  //   fTextStyle,
  //   element,
  // }: any) => {
  //   const prevElement = {
  //     title:
  //       element?.ComissionType === "session"
  //         ? element?.bet_id?.bet_condition
  //         : element?.match_id?.title,
  //     commissionAmount: element.ComissionAmount,
  //     commissionType: element.ComissionType,
  //     betType: element?.bet_type,
  //     stack:
  //       element?.ComissionType === "match total"
  //         ? (element?.ComissionAmount * 100) / element?.userData?.matchComission
  //         : element?.amount,
  //     odds: element?.odds,
  //     isActive: element?.isActive,
  //     teamBet: element?.team_bet,
  //     createAt: element?.updateAt,
  //     myCommission: element?.myCommission,
  //     userName: element?.userData?.userName,
  //   };
  //   const [elementToUDM, setElementToUDM] = useState(prevElement);

  //   // function checkIfElementUpdated(val) {
  //   //   setElementToUDM(val);
  //   // }
  //   // useEffect(() => {
  //   //   checkIfElementUpdated(prevElement);
  //   // }, [element?.ComissionType]);
  //   return (
  //     <>
  //       {!elementToUDM?.isActive && (
  //         <Box
  //           sx={{
  //             background: "rgba(0,0,0,0.5)",
  //             //   width: { xs: "218%", lg: "100%", md: "100%" },
  //             height: "45px",
  //             position: "absolute",
  //             display: "flex",
  //           }}
  //         />
  //       )}

  //       <Box
  //         sx={[
  //           {
  //             width: { xs: "218%", lg: "100%", md: "100%" },
  //             display: "flex",
  //             height: "45px",
  //             background: "#0B4F26",
  //             alignItems: "center",
  //             overflow: "hidden",
  //             borderBottom: "2px solid white",
  //           },
  //           containerStyle,
  //         ]}
  //       >
  //         <Box
  //           sx={[
  //             {
  //               width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //               display: "flex",
  //               paddingX: "10px",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               height: "45px",
  //               borderRight: "2px solid white",
  //             },
  //             fContainerStyle,
  //           ]}
  //         >
  //           <Typography
  //             sx={[
  //               {
  //                 fontSize: { xs: "10px", lg: "12px", md: "10px" },
  //                 fontWeight: "600",
  //                 cursor: "pointer",
  //                 textTransform: "capitalize",
  //                 color:
  //                   ["#319E5B", "#303030"].includes(
  //                     fContainerStyle.background
  //                   ) && "white",
  //               },
  //               fTextStyle,
  //             ]}
  //           >
  //             {elementToUDM?.userName}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={[
  //             {
  //               width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //               display: "flex",
  //               paddingX: "10px",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               height: "45px",
  //               borderRight: "2px solid white",
  //             },
  //             fContainerStyle,
  //           ]}
  //         >
  //           <Typography
  //             sx={[
  //               {
  //                 fontSize: { xs: "10px", lg: "12px", md: "10px" },
  //                 fontWeight: "600",
  //                 cursor: "pointer",
  //                 textTransform: "capitalize",
  //                 color:
  //                   ["#319E5B", "#303030"].includes(
  //                     fContainerStyle.background
  //                   ) && "white",
  //               },
  //               fTextStyle,
  //             ]}
  //           >
  //             {elementToUDM.commissionType}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={[
  //             {
  //               width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //               display: "flex",
  //               paddingX: "10px",
  //               justifyContent: "space-between",
  //               alignItems: "center",
  //               height: "45px",
  //               borderRight: "2px solid white",
  //             },
  //             fContainerStyle,
  //           ]}
  //         >
  //           <Typography
  //             sx={[
  //               {
  //                 fontSize: { xs: "10px", lg: "12px", md: "10px" },
  //                 fontWeight: "600",
  //                 cursor: "pointer",
  //                 display: " -webkit-box",
  //                 WebkitLineClamp: 2,
  //                 WebkitBoxOrient: "vertical",
  //                 overflow: "hidden",
  //               },
  //             ]}
  //           >
  //             {elementToUDM?.title}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {/* {elementToUDM.teamBet} */}
  //             {elementToUDM?.createAt
  //               ? `${moment(elementToUDM?.createAt).format("L")}  ${moment(
  //                   elementToUDM?.createAt
  //                 ).format("LT")}`
  //               : ""}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.teamBet}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.odds}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "15%", md: "15%", xs: "15%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //             textTransform: "capitalize",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.betType}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "15%", md: "15%", xs: "15%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.stack}
  //           </Typography>
  //         </Box>

  //         <Box
  //           sx={{
  //             width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.commissionAmount}
  //           </Typography>
  //         </Box>
  //         <Box
  //           sx={{
  //             width: { lg: "12.5%", md: "12.5%", xs: "12.5%" },
  //             display: "flex",
  //             paddingLeft: "10px",
  //             alignItems: "center",
  //             height: "45px",
  //             borderRight: "2px solid white",
  //           }}
  //         >
  //           <Typography
  //             sx={[{ fontSize: "12px", fontWeight: "600" }, fTextStyle]}
  //           >
  //             {elementToUDM?.myCommission}
  //           </Typography>
  //         </Box>
  //       </Box>
  //     </>
  //   );
  // };
  const numberOfAccordions = 3;
  return (
    <>

      {Array.from({ length: numberOfAccordions }, (_, index) => (
        <Accordion
          key={index}
          sx={{
            border: "1px solid white",
            borderBottom: "0",
            minHeight: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 2,
              backgroundColor: "#000",
              color: "#fff",
              margin: 0.01,
            }}
          >
            {/* <Typography variant="h6" sx={{ height: "25px", mx: 2 }}> */}
            <Box sx={{ width: "50px", textAlign: "center" }}>
              <Typography
                sx={{
                  height: "25px",
                  mx: 2,
                  fontSize: "14px",
                  fontWeight: "600",
                  margin: 0,
                }}
              >
                {index + 1}
              </Typography>
            </Box>

            <AccordionSummary
              className="commissionReport-AccordianSummery"
              expandIcon={
                <ExpandMoreIcon sx={{ color: "#fff", fontSize: "38px" }} />
              }
              aria-controls={`match-report-content-${index}`}
              id={`match-report-header-${index}`}
              sx={{
                width: { mb: "90%", lg: "100%" },
                position: "relative",
                // height: "60%",
                alignItems: { lg: "center", sm: "center" },
                display: "flex",
                // paddingX: "10px",
                background: "#0B4F26",
                marginLeft: 0.1,
                justifyContent: "space-between",
                color: "#fff",
                "&.Mui-expanded": {
                  minHeight: "50px",
                  margin: "0",
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  color: "white",
                  fontWeight: "600",
                  margin: 0,
                  padding: 0,
                  "&.Mui-expanded": {
                    margin: "0 !important",
                    padding: 0,
                  },
                }}
              >
                Match Report {index + 1}
              </Typography>
            </AccordionSummary>
          </Box>
          <AccordionDetails>
            <Box
              sx={{
                overflowX: "auto",
                width: { xs: "100%", lg: "100%", md: "100%" },
                background: "#000",
              }}
            >
              <ListHeaderT />
              {[]?.map((element, mapIndex) => (
                <MatchList
                  // key={element?.match_id}
                  element={element}
                  index={mapIndex}
                  selectedId={selectedId}
                  setSelectedId={setSelectedId}
                  showCommisionReport={showCommisionReport}
                  setShowCommisionReport={setShowCommisionReport}
                  id={id}
                />
              ))}
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}

      <Footer currentPage={currentPage} pages={1} />
    </>
  );
};


export default CommissionReportTable;
