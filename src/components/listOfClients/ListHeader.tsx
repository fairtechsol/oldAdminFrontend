import { useDispatch } from "react-redux";
import { Excel, Pdf } from "../../assets";
import SearchInput from "../Common/SearchInput";
import StyledImage from "../Common/StyledImages";
import { Box, Typography } from "@mui/material";
import { AppDispatch } from "../../store/store";
import { handleExport } from "../../store/actions/user/userAction";

const ListHeader = ({ endpoint, searchFor, downloadPdfExcel,title }: any) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box
      display={"flex"}
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "3px",
        gap: 2,
        background: "#F8C851",
      }}
    >
      <Box display={"flex"} alignItems="center">
        <Typography  sx={{
            fontSize: { xs: "14px", lg: "18px", md: "18px" },
            fontWeight: "500",
            color: "#000",
            textTransform: "capitalize",
            marginRight: { xs: "10px", lg: "20px", md: "20px" },
          }}>{title}</Typography>
        {downloadPdfExcel && (
          <>
            <Box
              sx={{
                background: "white",
                height: "32px",
                borderRadius: "5px",
                width: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledImage
                src={Excel}
                sx={{ height: "25px" }}
                onClick={() =>
                  dispatch(handleExport({ endPoint: endpoint, type: "excel" }))
                }
              />
            </Box>
            <Box
              sx={{
                background: "white",
                marginLeft: "10px",
                height: "32px",
                borderRadius: "5px",
                width: "32px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <StyledImage
                src={Pdf}
                sx={{ height: "25px" }}
                onClick={() =>
                  dispatch(handleExport({ endPoint: endpoint, type: "pdf" }))
                }
              />
            </Box>
          </>
        )}
      </Box>
      
      
    </Box>
  );
};

export default ListHeader;
