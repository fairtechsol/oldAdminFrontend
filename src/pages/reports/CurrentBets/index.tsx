import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BetsList from "../../../components/report/CurrentBets/BetsList";
import HeaderCurrentBets from "../../../components/report/CurrentBets/HeaderCurrentBets";
import { getCurrentBets } from "../../../store/actions/reports";
import { AppDispatch, RootState } from "../../../store/store";

const CurrentBets = () => {
  const dispatch: AppDispatch = useDispatch();

  const { currentBetsList } = useSelector(
    (state: RootState) => state.user.reportList
  );

  useEffect(() => {
    dispatch(getCurrentBets({}));
  }, []);

  return (
    <>
      <HeaderCurrentBets />
      <BetsList betHistory={currentBetsList ? currentBetsList?.rows : []} />
    </>
  );
};

export default CurrentBets;
