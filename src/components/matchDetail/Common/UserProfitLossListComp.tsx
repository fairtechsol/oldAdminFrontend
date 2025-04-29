import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface UserProfitLossListCompProps {
  element: any;
  markets: any;
}

const UserProfitLossListComp = ({
  element,
  markets,
}: UserProfitLossListCompProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        background: "white",
        height: "auto",
        width: "99.7%",
        position: "relative",
        borderBottom: "1px solid rgba(211,211,211)",
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
          position: "sticky",
          left: 0,
          border: "1px solid #2626264D",
          zIndex: 2,
        }}
      >
        <Typography
          sx={{
            color: "black",
            fontSize: { lg: "11px", md: "10px", xs: "8px" },
            marginLeft: "7px",
            fontWeight: "600",
            minWidth: "100px",
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
          alignItems: "center",
          height: "100%",
        }}
      >
        {markets?.map((item: any) => (
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
              )?.map((itemVal: any, index: number) => (
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
                      pl: 0.5,
                    }}
                    className="wrapContent"
                  >
                    {itemVal?.name}
                  </Box>
                  <Box
                    sx={{
                      border: "1px solid #2626264D",
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
                          color: "black",
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
                          color: "black",
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
              ))
            ) : (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                  minWidth: "100px",
                }}
              />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default memo(UserProfitLossListComp);
