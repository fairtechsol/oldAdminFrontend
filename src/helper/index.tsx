export const formatNumber = (value?: any, isRound?: any) => {
  if (value >= 1000) {
    // return (value / 1000).toFixed(1) + "k";
    return isRound
      ? Math.round(value / 1000) + "k"
      : (value / 1000).toFixed(1) + "k";
  } else {
    return isRound ? Math.round(value) : value;
    // return value
  }
};

export const customSort = (a: any, b: any) => {
  const order: any = { live: 1, save: 2, result: 3 };
  return order[a?.activeStatus] - order[b?.activeStatus];
};

export const formatToINR = (amount: any) => {
  const formatter = new Intl.NumberFormat("en-IN", {
    currency: "INR",
  });
  return formatter.format(parseFloat(amount || 0));
};

export const numberInputOnWheelPreventChange = (e: any) => {
  e.target.blur();
  e.stopPropagation();
  setTimeout(() => {
    e.target.focus();
  }, 0);
};

export const handleNumber = (num: any, color: any) => {
  let amount = parseFloat(num)?.toFixed(2);
  let value;

  if (amount && amount?.includes(".")) {
    value = amount?.split(".");
  } else {
    value = amount;
  }
  return value?.length > 0 ? (
    <>
      <span style={{ color: color }}>{formatToINR(value[0])}.</span>
      <span style={{ fontSize: "0.8em", color: color }}>{value[1]}</span>
    </>
  ) : null;
};

export const convertData = (items: any) => {
  try {
    const result: any = {};

    items?.forEach((item: any) => {
      if (!result[item?.type]) {
        result[item?.type] = {
          mname: item?.type,
          rem: "",
          gtype: item?.gtype,
          status: item?.status,
          section: [],
        };
      }
      const sectionItem = {
        ...item,
      };
      result[item?.type]?.section?.push(sectionItem);
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateSessionBettingsItem = (
  matchDetailBettings: any,
  apiResponseBettings: any
) => {
  try {
    if (!apiResponseBettings || Object.keys(apiResponseBettings).length === 0) {
      for (const key in matchDetailBettings) {
        if (matchDetailBettings.hasOwnProperty(key)) {
          const matchDetailSections = matchDetailBettings[key]?.section;
          matchDetailSections?.forEach((section: any) => {
            section.isComplete = true;
          });
        }
      }
      return matchDetailBettings;
    } else
      for (const key in matchDetailBettings) {
        if (apiResponseBettings.hasOwnProperty(key)) {
          const apiSections = apiResponseBettings[key].section;
          const matchDetailSections = matchDetailBettings[key]?.section;
          for (const apiSection of apiSections) {
            const matchDetailSectionIndex = matchDetailSections?.findIndex(
              (section: any) => section?.id === apiSection?.id
            );
            if (matchDetailSectionIndex !== -1) {
              matchDetailBettings[key].section[matchDetailSectionIndex] = {
                ...matchDetailBettings[key].section[matchDetailSectionIndex],
                ...apiSection,
                isComplete: apiSection?.ex
                  ? apiSection?.ex?.availableToBack?.length > 0 &&
                    apiSection?.ex?.availableToLay?.length > 0
                    ? ([""].includes(apiSection?.GameStatus) &&
                        !apiSection?.ex?.availableToBack[0]?.price &&
                        !apiSection?.ex?.availableToBack[0]?.size &&
                        !apiSection?.ex?.availableToLay?.price &&
                        !apiSection?.ex?.availableToLay?.size) ||
                      apiSection?.activeStatus !== "live"
                      ? true
                      : false
                    : true
                  : true,
              };
            } else {
            }
          }
        }
      }
    return matchDetailBettings;
  } catch (error) {
    console.log(error);
  }
};
