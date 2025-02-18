import { Box, Typography } from "@mui/material";

const UserProfitLossListComp = (props: any) => {
  const { element, markets, color } = props;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          background: "white",
          height: "auto",
          width: "99.7%",
          position: "relative",
          borderBottom:"1px solid rgba(211,211,211)"
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: "white",
            height: "auto",
            width: "10%",
            alignItems: "center",
            minWidth: "100px",
            position:"sticky",
            left:0,
            border: "1px solid #2626264D",

            zIndex:2
          }}
        >
          <Typography
            sx={{
              color: "black",
              fontSize: { lg: "11px", md: "10px", xs: "8px" },
              marginLeft: "7px",
              fontWeight: "600",
              minWidth: "100px"
            }}
          >
            {element?.userName}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            width: { lg: "90%", xs: "90%" },
            // justifyContent: { lg: "flex-end", xs: "flex-end" },
            alignItems: "center",
            height: "100%",
          }}
        >
          {markets?.map((item: any) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { lg: "30%", xs: "30.06%" },
                  height: "100%",
                }}
                key={item?.betId}
              >
                {element?.profitLoss?.[item?.betId]?.teams ? (
                  Object.values(
                    element?.profitLoss?.[item?.betId]?.teams || {}
                  )?.map((itemVal: any,index:number) => {
                    return (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          width: "100%",
                          height: "100%",
                          minWidth: "100px",
                        }}
                        key={index}
                      >
                        <Box
                          sx={{
                            border: "1px solid #2626264D",
                            width: "100%",
                            height: "32px",
                            fontWeight: "500",
                            fontSize: "0.65em",
                            alignItems: "center",
                            // display: "flex",
                            pl: 0.5,
                          }}
                          className="wrapContent"
                        >
                          {itemVal?.name}
                        </Box>
                        <Box
                          sx={{
                            background: color,
                            border:
                              color != "white"
                                ? "1px solid #2626264D"
                                : "0px solid white",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%",
                            height: "32px",
                          }}
                        >
                          <Box
                            sx={{
                              alignItems: "center",
                              justifyContent: "space-around",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "13px",
                                color: color == "white" ? "white" : "black",
                                fontWeight: "700",
                                textAlign: "center",
                                lineHeight: "13px",
                              }}
                            >
                              {itemVal?.pl?.rate}
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: { lg: "10px", xs: "9px" },
                                marginTop: -0.4,
                                color: color == "white" ? "white" : "black",
                                textAlign: "center",
                                fontWeight: "600",
                                lineHeight: "13px",
                              }}
                            >
                              {itemVal?.pl?.percent}
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      width: "100%",
                      height: "100%",
                      minWidth: "100px",
                    }}
                  ></Box>
                )}
              </Box>
            );
          })}
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            position: "relative",
            background: "white",
            height: "38px",
            width: { lg: "60%", xs: "80%" },
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <>
            <SeperateBox
              value2={handleNumber(parseFloat(element?.teamRateA || 0), color) ?? "N/A"}
              value={handleNumber(parseFloat(element?.percentTeamRateA || 0), color) ?? "N/A"}
              color={"#ffffff"}
              width={10}
            />
            <Box
              sx={{ width: "3px", display: "flex", background: "#ffffff" }}
            ></Box>
            <SeperateBox
               value2={handleNumber(parseFloat(element?.teamRateB || 0),color) ?? "N/A"}
               value={handleNumber(parseFloat(element?.percentTeamRateB || 0),color) ?? "N/A"}
              color={"#ffffff"}
              width={10}
            />
            
          </>
          <Box
            sx={{ width: ".45%", display: "flex", background: "pink" }}
          ></Box>
        </Box> */}
      </Box>
    </>
  );
};

export default UserProfitLossListComp;
