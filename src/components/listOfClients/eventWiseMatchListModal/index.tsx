import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { formatToINR } from "../../../helper";
import { Constants } from "../../../utils/Constants";

interface EventWiseMatchListModalProps {
  setShowUserWiseMatchListModal: (show: any) => void;
  userName: string;
  data: any;
  userId: string;
  matchType: string;
  roleName: string;
}

const EventWiseMatchListModal = ({
  setShowUserWiseMatchListModal,
  userName,
  data,
  userId,
  matchType,
  roleName,
}: EventWiseMatchListModalProps) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={[
        {
          width: "90%",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
          borderBottomRightRadius: "0px",
          borderBottomLeftRadius: "0px",
          overflow: "hidden",
          border: "2px solid white",
        },
        (theme: any) => ({
          backgroundImage: `${theme.palette.primary.headerGradient}`,
        }),
      ]}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: "10px",
            py: "6px",
            backgroundColor: "#F8C851",
          }}
        >
          <Box display="flex" alignItems="center" sx={{ alignItems: "center" }}>
            <Typography
              sx={{
                fontSize: {
                  xs: "14px",
                  lg: "18px",
                  md: "18px",
                },
                color: "#000",
                marginRight: {
                  xs: "10px",
                  lg: "20px",
                  md: "20px",
                },
              }}
            >
              {userName} Match Wise Exposure
            </Typography>
          </Box>
          <Typography
            sx={{
              color: "#000",
              fontSize: "30px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.stopPropagation();
              setShowUserWiseMatchListModal({
                status: false,
                value: {},
              });
            }}
          >
            &times;
          </Typography>
        </Box>
      </Box>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table
          sx={{
            minWidth: 300,
            border: "1px solid #ddd",
            backgroundColor: "#0B4F26",
          }}
          aria-label="Profit/Loss Table"
        >
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  borderRight: "1px solid #fff",
                  fontSize: "1rem",
                }}
              >
                Match Name
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  borderRight: "1px solid #fff",
                  fontSize: "1rem",
                }}
              >
                Exposure
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(data || {}).map(([key, value]: any) => (
              <TableRow
                sx={{
                  cursor: "pointer",
                }}
                key={key}
                onClick={() => {
                  if (matchType !== "card" && matchType !== "virtual") {
                    navigate(`${Constants.oldAdmin}live_market/matches`, {
                      state: {
                        submit: true,
                        matchId: key,
                        userId: userId,
                        matchType: matchType,
                        roleName: roleName,
                      },
                    });
                  }
                }}
              >
                <TableCell
                  sx={{
                    color: "#fff",
                    borderRight: "1px solid #fff",
                  }}
                >
                  {value?.name}
                </TableCell>
                <TableCell
                  sx={{
                    color: "#fff",
                    borderRight: "1px solid #fff",
                  }}
                >
                  {formatToINR(value?.exposure || 0)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default memo(EventWiseMatchListModal);
