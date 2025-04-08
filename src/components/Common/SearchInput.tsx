import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { debounce } from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "../../assets";
import {
  getAccountStatement,
  getCurrentBets,
} from "../../store/actions/reports";
import { getUserList } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import StyledImage from "./StyledImages";
interface SearchInputProps {
  placeholder: string;
  inputContainerStyle?: object;
  show: boolean;
  width?: string | number;
  onChange?: (value: string) => void;
  endpoint?: string;
  searchFor?: string;
  pageLimit?: number;
  fromDate?: any;
  toDate?: any;
  userId?: string;
  roleName?: string;
  setCurrentPage?: (page: number) => void;
  getUserListModal?: (params: any) => void;
}

const SearchInput = ({
  placeholder,
  inputContainerStyle,
  show,
  width,
  onChange,
  endpoint,
  searchFor,
  pageLimit,
  fromDate,
  toDate,
  userId,
  roleName,
  setCurrentPage,
  getUserListModal,
}: SearchInputProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const dispatch: AppDispatch = useDispatch();

  const handleInputChange = debounce(async (event: any) => {
    const value = event.target.value;
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      let filter = "";
      if (fromDate && toDate) {
        filter += `&createdAt=between${moment(fromDate)?.format(
          "YYYY-MM-DD"
        )}|${moment(toDate.add(1, "days"))?.format("YYYY-MM-DD")}`;
      } else if (fromDate) {
        filter += `&createdAt=gte${moment(fromDate)?.format("YYYY-MM-DD")}`;
      } else if (toDate) {
        filter += `&createdAt=lte${moment(toDate)?.format("YYYY-MM-DD")}`;
      }
      setCurrentPage?.(1);
      if (searchFor === "accountStatement") {
        dispatch(
          getAccountStatement({
            id: profileDetail?.id,
            page: 1,
            pageLimit: pageLimit,
            keyword: value,
            searchBy: "description,user.userName,actionByUser.userName",
            filter,
          })
        );
      } else if (searchFor === "userList") {
        dispatch(
          getUserList({
            userName: value,
            currentPage: 1,
            url: { endpoint: endpoint },
            searchBy:
              endpoint === "/expert/list"
                ? value
                  ? "userName"
                  : ""
                : "user.userName",
          })
        );
      } else if (searchFor === "userModalList") {
        getUserListModal?.({
          userName: value,
          currentPage: 1,
          url: endpoint,
          userId: userId,
          roleName: roleName,
          searchBy:
            endpoint === "/expert/list"
              ? value
                ? "userName"
                : ""
              : "user.userName",
        });
      } else if (searchFor === "currentBets") {
        dispatch(
          getCurrentBets({
            searchBy: "user.userName",
            keyword: value,
            page: 1,
            limit: pageLimit,
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  }, 500);

  return (
    <Box
      sx={[
        {
          backgroundColor: {
            xs: show ? "white" : "transparent",
            lg: "white",
          },
          minWidth: {
            lg: "17vw",
            xs: "10vw",
          },
          width: {
            xs: width ? width : "60%",
            lg: "17vw",
            md: "17vw",
          },
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          boxShadow: "0px 3px 10px #B7B7B726",
          height: { lg: "35px", xs: "35px" },
          overflow: "hidden",
          paddingX: "5px",
          borderRadius: "35px",
        },
        inputContainerStyle ?? {},
      ]}
    >
      {(!matchesMobile || show) && (
        <TextField
          variant="standard"
          name={`search_${Math.random().toString(36).substring(7)}`}
          placeholder={placeholder}
          onChange={handleInputChange}
          InputProps={{
            disableUnderline: true,
            autoComplete: "new-password",
            style: {
              fontSize: "12px",
              fontWeight: "600",
              fontStyle: "italic",
              color: "black",
            },
          }}
          sx={{
            borderColor: "white",
            display: "flex",
            flex: 1,
            marginLeft: "5px",
            fontSize: { lg: "10px", xs: "8px" },
          }}
        />
      )}
      <Box
        sx={{
          height: "30px",
          width: "30px",
          borderRadius: "20px",
          border: "1px solid white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.main",
          marginRight: -0.3,
          cursor: "pointer",
        }}
      >
        <StyledImage src={Search} sx={{ height: "40%", width: "auto" }} />
      </Box>
    </Box>
  );
};

export default SearchInput;
