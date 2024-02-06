import { useEffect } from "react";
import BetsList from "../../../components/report/CurrentBets/BetsList";
import HeaderCurrentBets from "../../../components/report/CurrentBets/HeaderCurrentBets";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { getCurrentBets } from "../../../store/actions/reports";
import { useSelector } from "react-redux";

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
      <BetsList betHistory={currentBetsList ? currentBetsList : []} />
    </>
  );
};

export default CurrentBets;
