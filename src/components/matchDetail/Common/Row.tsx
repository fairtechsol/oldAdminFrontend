import { Box } from "@mui/material";
import { Fragment, memo } from "react";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

interface RowProps {
  values: any;
  index: number;
}

const Row = ({ values, index }: RowProps) => {
  return (
    <Box key={index} sx={{ width: "100%", display: "flex" }}>
      {values.map((item: any, k: number) => {
        return (
          <Fragment key={k}>
            {!item?.small ? (
              <LargeBox k={k} item={item} />
            ) : (
              <SmallBox k={k} item={item} />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};
export default memo(Row);
