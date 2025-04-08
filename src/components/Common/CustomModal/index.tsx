import { Box, Button, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordReset } from "../../../store/actions/user/userAction";

interface CustomModalProps {
  transactionMessage?: string;
  modalTitle?: string;
  buttonMessage?: string;
  setShowModal: (show: boolean) => void;
  functionDispatch: () => void;
  navigateTo: string;
}

const CustomModal = ({
  transactionMessage,
  modalTitle,
  buttonMessage,
  setShowModal,
  functionDispatch,
  navigateTo,
}: CustomModalProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.focus();
    }
  }, []);

  const handleEnterPress = (e: any) => {
    if (e?.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    dispatch(changePasswordReset());
    setShowModal(false);
    functionDispatch();
    navigate(navigateTo);
  };

  return (
    <form onSubmit={handleSubmit}>
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
                {transactionMessage
                  ? `Your Transaction Password is : ${transactionMessage}`
                  : modalTitle}
              </Typography>
              <Button
                type="submit"
                onKeyDown={handleEnterPress}
                ref={buttonRef}
                sx={{
                  backgroundColor: "#004a25",
                  color: "#fff",
                  ":hover": { backgroundColor: "#43ff5f" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {buttonMessage}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default CustomModal;
