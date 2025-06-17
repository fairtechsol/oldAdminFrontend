import { Box } from "@mui/material";
import { formatToINR } from "../../../helper";
import SingleBox from "./SingleBox";

interface RowComponentProps {
  header: boolean;
  data: any;
}

const RowComponent = ({ header, data }: RowComponentProps) => {
  const getTime = (date: any) => {
    const now = new Date(date);
    const timeString = now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.betType === "BACK" || data?.betType === "YES") {
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType === "NO") {
      return "#F2CBCB";
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: "1px",
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            boxWidth="100%"
            data={data?.bettingName ?? data?.marketType}
            first={true}
            header={header}
            isCommissionActive={data?.isCommissionActive}
          />
          <SingleBox
            color={getColor()}
            data={data?.username || data?.userName || data?.user?.userName}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data}
            up={true}
            header={header}
            time={getTime(data.createdAt)}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data?.bet_type || data?.betType}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={formatToINR(data?.amount)}
            header={header}
            boxWidth="40%"
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[1]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[2]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[3]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[4]}
            header={header}
            boxWidth="50%"
          />
          <SingleBox
            color={getColor()}
            data={data[5]}
            header={header}
            boxWidth="40%"
          />
        </>
      )}
    </Box>
  );
};

export default RowComponent;
