import { useDispatch } from "react-redux";
import { Excel, Pdf } from "../../assets";
import SearchInput from "../Common/SearchInput";
import StyledImage from "../Common/StyledImages";
import { Box } from "@mui/material";
import { AppDispatch } from "../../store/store";
import { handleExport } from "../../store/actions/user/userAction";

const HeaderRow = ({ endpoint, searchFor, downloadPdfExcel }: any) => {
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
      <SearchInput
        placeholder={"Search User..."}
        show={true}
        searchFor={searchFor}
        endpoint={endpoint}
      />
    </Box>
  );
};

export default HeaderRow;
