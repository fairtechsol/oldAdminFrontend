import { Box } from "@mui/material";
import moment from "moment";
import { formatToINR } from "../../../helper";
import SingleBox from "./SingleBox";

interface RowComponentProps {
  header: boolean;
  data: any;
}

const RowComponent = ({ header, data }: RowComponentProps) => {
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
            color={getColor()}
            boxWidth="100%"
            data={data?.gameName ?? data?.marketType}
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
            time={moment(data.createdAt).format("DD-MM-YYYY HH:mm:ss")}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data?.roundId}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data?.bet_type || data?.betType}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data?.providerName}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={formatToINR(Math.abs(data?.totalLoss))}
            header={header}
            boxWidth="100%"
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor()}
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
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[4]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[5]}
            header={header}
            boxWidth="100%"
          />
          <SingleBox
            color={getColor()}
            data={data[6]}
            header={header}
            boxWidth="100%"
          />
        </>
      )}
    </Box>
  );
};

export default RowComponent;
