import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WalletModal = ({
  message,
  buttonMessage,
  navigateTo,
  setShowSuccessModal,
  showSuccessModal,
  userPG,
  activeTab,
}: any) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        p={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          backgroundColor: "#00000069",
          borderRadius: "15px",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Box
          p={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid #707070",
            backgroundColor: "#000",
            borderRadius: "15px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              maxWidth: { xs: "150px", lg: "300px", md: "300px" },
              minWidth: { lg: "250px", md: "200px", xs: "0px" },
            }}
          >
            <Box
              sx={{
                maxHeight: "300px",
                maxWidth: "500px",
                // width: "250px",
                // height: "100px",
                minHeight: "100px",
                minwidth: "150px",
                background: "#F8C851",
                borderRadius: "5px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography mb={2} color={"#000"}>
                {message}
              </Typography>
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
                      `/${
                        window.location.pathname.split("/")[1]
                      }/${navigateTo}`,
                      { state: { activeTab: activeTab } }
                    );
                  userPG && navigate(`/${navigateTo}`);
                }}
              >
                {buttonMessage}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default WalletModal;
