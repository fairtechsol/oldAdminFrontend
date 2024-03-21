import { Box, Button, TextField, Typography } from "@mui/material";
import StyledImage from "../../Common/StyledImages";
import { EyeIcon, EyeSlash } from "../../../assets";
import BoxButton from "./BoxButton";

const MobileViewUserDetails = (props: any) => {
  const {
    value,
    onChange,
    profit_loss,
    setShowPass,
    showPass,
    onCancel,
    initialBalance,
    backgroundColor,
    loading,
    title,
    userName,
    element,
    elementToUDM,
    titleBackgroundColor,
    type,
  } = props;
  const formatIndianCurrency = (amount: number) => {
    const formatter = new Intl.NumberFormat("en-IN", {
      currency: "INR",
    });
    return formatter.format(amount);
  };

  const numberWithCommas = (numString: any) => {
    // console.log('numString',numString)
        let stringWithoutCommas = numString?.replace(/,/g, '');
    // console.log('stringWithoutCommas', stringWithoutCommas)
    if (!stringWithoutCommas?.includes('.')) {
      if (stringWithoutCommas?.length > 3) {
        let mainArray = stringWithoutCommas.slice(0, -3);
        let lastThreeDigitsArray = stringWithoutCommas.slice(-3);
        let reversedStr = mainArray.split('').reverse().join('');
        let result = '';

        for (let i = 0; i < reversedStr.length; i += 2) {
          result += reversedStr.substr(i, 2) + ',';
        }
        result = result.slice(0, -1); // Remove the last comma
        let reversedStr1 = result.split('').reverse().join('');
        // console.log(reversedStr1,' jnknk ',reversedStr);
        return reversedStr1+','+lastThreeDigitsArray;
      }else{
        let data = stringWithoutCommas?.replace(/,/g, '');
        return data;
      }
    }else{
      let parts = stringWithoutCommas.split('.');
      if(parts[0]?.length > 3){
      let mainArray = parts[0].slice(0, -3);
        let lastThreeDigitsArray = parts[0].slice(-3);
        let reversedStr = mainArray.split('').reverse().join('');
        let result = '';
        for (let i = 0; i < reversedStr.length; i += 2) {
            result += reversedStr.substr(i, 2) + ',';
          }
          result = result.slice(0, -1); // Remove the last comma
          let reversedStr1 = result.split('').reverse().join('');
        // console.log(reversedStr1,' jnknk ',reversedStr);
        return reversedStr1+','+lastThreeDigitsArray+'.'+parts[1];
    }else{
      let data = stringWithoutCommas?.replace(/,/g, '');
      return data;
    }
    }
  };

  return (
    <Box
      sx={[
        {
          marginX: "0.5%",
          width: " 98%",
          minHeight: "200px",
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          background: titleBackgroundColor ? titleBackgroundColor : "#ff0000",
        }}
      >
        <Box
          display={"flex"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            px: "10px",
            py: "6px",
          }}
        >
          <Box
            display={"flex"}
            alignItems="center"
            sx={{ alignItems: "center" }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "16px",
                  lg: "18px",
                  md: "18px",
                },
                color: "#FFF",
                marginRight: {
                  xs: "10px",
                  lg: "20px",
                  md: "20px",
                },
              }}
            >
              {title}
            </Typography>
          </Box>
        </Box>
        <Button sx={{ fontSize: "30px", color: "#fff" }} onClick={onCancel}>
          &times;
        </Button>
      </Box>

      <Box
        sx={{
          borderBottom: "2px solid white",
          borderTop: "2px solid white",
          padding: "1%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          background: "#F8C851",
        }}
      >
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              width: "100%",

              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                flexDirection: "row",

                justifyContent: "space-between",
                position: "relative",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "3.2vw",
                  width: "100%",
                  fontWeight: "600",
                  color: "white",
                  marginRight: 0,
                  textTransform: "capitalize",
                  marginLeft: "5px",
                }}
              >
                {elementToUDM?.userName}
              </Typography>
            </Box>
            <Box
              sx={{
                background: Number(elementToUDM?.userBal?.profitLoss) >= 0 ? "#27AC1E" : "#E32A2A",
                width: "30%",
                height: "45px",
                borderRadius: "5px",
                paddingX: "10px",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {formatIndianCurrency(parseFloat(elementToUDM?.balance))}
              </Typography>
            </Box>

            <Box
              sx={{
                width: "30%",
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "10px",
              }}
            >
              <TextField
                value={formatIndianCurrency(parseFloat(initialBalance)) || 0}
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  disabled: true,
                  placeholder: "",
                  disableUnderline: true,
                  type: "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",

                    fontWeight: "600",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>{" "}
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 1,
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                width: "40%",
                flexDirection: "row",

                justifyContent: "space-between",
                position: "relative",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "3.2vw",
                  width: "100%",
                  fontWeight: "600",
                  marginRight: 0,
                  color: "#000",
                  textTransform: "capitalize",
                  marginLeft: "5px",
                }}
              >
                {userName}
              </Typography>
            </Box>
            <Box
              sx={{
                background: Number(elementToUDM?.userBal?.profitLoss) >= 0 ? "#27AC1E" : "#E32A2A",
                width: "30%",
                height: "45px",
                borderRadius: "5px",
                paddingX: "10px",
                marginTop: "0",
              }}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {elementToUDM?.availableBalance
                  ? formatIndianCurrency(parseFloat(elementToUDM?.availableBalance.toFixed(2)))
                  : "00"}
              </Typography>
            </Box>
            <Box
              sx={{
                width: "30%",
                height: "45px",
                background: "white",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                border: "2px solid #26262633",
                paddingX: "10px",
              }}
            >
              <TextField
                value={
                  elementToUDM?.availableBalance
                    ? formatIndianCurrency(type === 'deposite' ? parseFloat(elementToUDM?.availableBalance.toFixed(2)) + parseFloat(value.amount ? value.amount : 0) :  parseFloat(elementToUDM?.availableBalance.toFixed(2)) - parseFloat(value.amount ? value.amount : 0))
                    : "00"
                }
                sx={{ width: "100%", height: "45px" }}
                variant="standard"
                InputProps={{
                  disabled: true,
                  placeholder: "",
                  disableUnderline: true,
                  type: "text",
                  style: {
                    fontSize: "13px",
                    height: "45px",
                    fontWeight: "600",
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Client Profit/Loss
            </Typography>
          </Box>
          <Box
            sx={{
              background: Number(elementToUDM?.userBal?.profitLoss) >= 0 ? "#27AC1E" : "#E32A2A",
              width: "30%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "10px",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "15px",
                height: "45px",
                fontWeight: "600",
                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              {" "}
              {formatIndianCurrency(parseFloat(elementToUDM?.userBal?.profitLoss))}
            </Typography>
          </Box>
          <Box
            sx={{
              width: "30%",
              height: "45px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
              paddingX: "10px",
            }}
          >
            <TextField
              value={formatIndianCurrency(type === 'deposite' ? parseFloat(elementToUDM?.userBal?.profitLoss) + parseFloat(value.amount ? value.amount : 0) : parseFloat(elementToUDM?.userBal?.profitLoss) - parseFloat(value.amount ? value.amount : 0)) || 0}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                disabled: true,
                placeholder: "",
                disableUnderline: true,
                type: "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box
            sx={{
              background: "#004A25",
              width: "60%",
              height: "45px",
              borderRadius: "5px",
              paddingX: "10px",
              marginTop: "0",
            }}
          >
            <TextField
              required={true}
              id="amount"
              name="amount"
              value={numberWithCommas(value.amount?.toString())}
             onChange={(e: any) => onChange(e,'amount')}
              variant="standard"
              InputProps={{
                placeholder: "Type Amount...",
                autoComplete: "new-password",
                inputProps: { min: "0", step: "1" },
                disableUnderline: true,
                style: {
                  fontSize: "15px",
                  height: "45px",
                  fontWeight: "600",
                  color: "white",
                },
              }}
              // type={"Number"}
            />
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3.2vw",

                width: "100%",
                fontWeight: "600",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Remarks
            </Typography>
          </Box>

          <Box
            sx={{
              borderRadius: "5px",
              background: backgroundColor == "#ECECEC" ? "white" : "#FFECBC",
              display: "flex",
              border: "2px solid #26262633",
              minHeight: "80px",
              maxHeight: "115px",
              marginTop: "10px",
              width: "60%",
              paddingX: "2px",
            }}
          >
            <TextField
              id="remark"
              name="remark"
              value={value.remark}
              onChange={(e: any) => onChange(e,'remark')}
              rows={4}
              sx={{ width: "100%", minHeight: "40px" }}
              multiline={true}
              variant="standard"
              InputProps={{
                placeholder: "Remark (Optional)",
                disableUnderline: true,
                style: {
                  fontSize: "13px",
                  minHeight: "45px",

                  fontWeight: "600",
                },
              }}
            />
          </Box>
        </Box>
        <Box
          sx={{
            overflow: "hidden",
            width: "100%",
            gap: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "40%",
              flexDirection: "row",

              justifyContent: "space-between",
              position: "relative",
              marginTop: "0",
            }}
          >
            <Typography
              sx={{
                fontSize: "3vw",

                width: "100%",
                fontWeight: "600",
                marginRight: 0,
                color: "#000",
                textTransform: "capitalize",
                marginLeft: "5px",
              }}
            >
              Transaction
            </Typography>
          </Box>

          <Box
            sx={{
              width: "60%",
              height: "45px",
              paddingLeft: "10px",
              paddingRight: "10px",
              background: "white",
              display: "flex",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid #26262633",
            }}
          >
            <TextField
              required={true}
              id="transactionPassword"
              name="transactionPassword"
              value={value.transactionPassword}
              onChange={(e: any) => onChange(e,'pass')}
              sx={{ width: "100%", height: "45px" }}
              variant="standard"
              InputProps={{
                placeholder: "",
                disableUnderline: true,
                autoComplete: "new-password",
                type: !showPass ? "password" : "text",
                style: {
                  fontSize: "13px",
                  height: "45px",
                  fontWeight: "600",
                },
              }}
            />
            <Box
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              <StyledImage
                src={showPass ? EyeIcon : EyeSlash}
                sx={{ height: "14px", width: "20px" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "4% 1%",
          width: "100%",
          justifyContent: "space-around",
          gap: 1,
          background: "#fff",
        }}
      >
        <BoxButton
          color={"#E32A2A"}
          containerStyle={{
            width: "150px",
            background: "#E32A2A",
            border: "0px",
            height: "45px",
          }}
          isSelected={true}
          onClick={onCancel}
          title={"Cancel"}
        />
        <BoxButton
          color={"#0B4F26"}
          loading={loading}
          containerStyle={{ width: "150px", height: "45px" }}
          isSelected={true}
          type="submit"
          title={"Submit"}
        />
      </Box>
    </Box>
  );
};

export default MobileViewUserDetails;
