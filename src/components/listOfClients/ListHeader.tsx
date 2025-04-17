import { Box, Typography } from "@mui/material";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { Excel, Pdf } from "../../assets";
import { handleExport } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import StyledImage from "../Common/StyledImages";

interface ListHeaderProps {
  id: string;
  endpoint: string;
  downloadPdfExcel: boolean;
  title: string;
}

const ListHeader = ({
  id,
  endpoint,
  downloadPdfExcel,
  title,
}: ListHeaderProps) => {
  const dispatch: AppDispatch = useDispatch();
  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "3px",
        gap: 2,
        background: "#F8C851",
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
                  dispatch(
                    handleExport({
                      endPoint: endpoint,
                      type: "excel",
                      userId: id,
                      name: title,
                    })
                  )
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
                  dispatch(
                    handleExport({
                      endPoint: endpoint,
                      type: "pdf",
                      userId: id,
                      name: title,
                    })
                  )
                }
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(ListHeader);
