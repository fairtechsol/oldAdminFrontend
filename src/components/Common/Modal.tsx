import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { Button, Typography } from "@mui/material";




  export function Modal({
    children,
    navigateTo,
    setShowSuccessModal,
    showSuccessModal,
    userPG,
    activeTab,
    title
  }: any) {
    const navigate = useNavigate();

    return (
      <>
        <>
        <Box
         sx={[
            {
                // width: "100%",
              width: { xs: "96%", lg: "100%", md: "96%" },
              // marginX: "0.5%",
              minHeight:"140px",
              display: "flex",
              flexDirection: "column",
              // justifyContent: "space-between",
              borderRadius: "10px",
              borderBottomRightRadius: "0px",
              borderBottomLeftRadius: "0px",
              overflow: "hidden",
              border: "2px solid white",
       
            },
       
          ]}
    >
          <Box
            p={2}
            sx={{
                zIndex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "#00000069",
            //   borderRadius: "15px",
              height: "100vh",
              width: "100vw",
            }}
          >
            
              <Box
                sx={[{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  maxWidth: { xs: "90%",  lg: "100%", md: "96%"},
                  width: "85%",
                  border: "2px solid white",
                  borderRadius: "10px 10px 0 0",
                    paddingBottom: "20px"
     
                },
                (theme: any) => ({
                    backgroundImage: `${theme.palette.primary.headerGradient}`,
                  }),
            ]}
              >
            
                <Box
                  sx={{
                    maxHeight: "300px",
               
                    // width: "250px",
                    // height: "100px",
                    minHeight: "100px",
                    minwidth: "150px",
                    width: "100%",
                    // background: "#F8C851",
                    borderRadius: "15px",
                    // padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                 

                    {/* header */}
                    <Box sx={{ marginX: "0", background: "#F8C851", height: "50px" , borderRadius: "5px 5px 0 0",
            
                                }}>
              
                        <Box
                            display={"flex"}
                            sx={{
                            justifyContent: "space-between",
                            alignItems: "center",
                            // width: "100%",
                            px: "10px",
                            height: "100%",
                            }}
                        >
                            
                        <Box display={"flex"} alignItems="center">
                        <Typography
                            sx={{
                            fontSize: { xs: "14px", lg: "18px", md: "18px" },
                            fontWeight: "500",
                            color: "#000",
                            textTransform: "capitalize",
                            marginRight: { xs: "10px", lg: "20px", md: "20px" },
                            }}
                        >
                            {title}
                        </Typography>
                        </Box>
    
                            <Button
                            sx={{ color: "", fontSize: "30px" }}
                            onClick={() => {
                                setShowSuccessModal(false);
                            }}
                            >
                            &times;
                            </Button>
                        </Box>
                    </Box>
                    {children}
                    



                  <Button
                    sx={{
                      backgroundColor: "#fff",
                      ":hover": { backgroundColor: "#43ff5f" },
                      display: "flex",
                      justifyContent: "center",
                    }}
                    onClick={() => {
                      setShowSuccessModal(!showSuccessModal);
                      navigateTo &&
                        navigate(
                          `/${window.location.pathname.split("/")[1]
                          }/${navigateTo}`,
                          { state: { activeTab: activeTab } }
                        );
                      userPG && navigate(`/${navigateTo}`);
                    }}
                  >
                    {/* {buttonMessage} */}
                  </Button>
                </Box>
              </Box>
            </Box>
</Box>
        </>
      </>
    );
  }


