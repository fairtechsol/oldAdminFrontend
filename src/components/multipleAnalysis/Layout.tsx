import { Box, Button, Typography } from "@mui/material";
import { formatToINR } from "../../helper";
import { sessionBettingType } from "../../utils/Constants";
import FullAllBets from "../matchDetail/Common/FullAllBets";
import CricketCasinoMarket from "../matchDetail/CricketCasinoMarket";
import SessionMarket from "../matchDetail/SessionMarket";
import RunsBox from "../matchDetail/SessionMarket/RunsBox";
import TournamentOdds from "../matchDetail/TournamentOdds";

const Layout = ({
  item,
  handleClicked,
  QuicksessionData,
  sessionProLoss,
  currentOdd,
  placedBets,
  setSelectedBetData,
  selectedBetData,
  showBets,
}: any) => {
  console.log(sessionProLoss);
  return (
    <>
      <Typography
        sx={{
          width: "100%",
          fontSize: "16px",
          color: "white",
          fontWeight: "700",
          paddingTop: "0.7%",
          alignSelf: "start",
        }}
      >
        {item?.title}
        <Button
          onClick={() =>
            handleClicked({
              matchId: item?.id,
              teamA: item?.teamA,
              teamB: item?.teamB,
              teamC: item?.teamC,
            })
          }
          sx={{
            backgroundColor: "#F8C851",
            fontSize: "10px",
            color: "black",
            fontWeight: "700",
            float: "right",
            border: " 1px solid white",
            marginBottom: "2px",
            alignSelf: "start",
            "&:hover": { backgroundColor: "#F8C851" },
          }}
        >
          User Profit Loss
        </Button>
      </Typography>
      {item?.tournament &&
        item?.tournament?.map((market: any, index: any) => {
          return (
            <TournamentOdds
              key={index}
              currentMatch={item}
              minBet={Math.floor(market?.minBet) || 0}
              maxBet={Math.floor(market?.maxBet) || 0}
              title={market?.name}
              liveData={market}
            />
          );
        })}
      {item?.manualSessionActive && (
        <SessionMarket
          title={"Quick Session Market"}
          allBetsData={
            item?.profitLossDataSession
              ? Array.from(
                  item?.profitLossDataSession?.reduce(
                    (acc: any, obj: any) =>
                      acc.has(obj.betId) ? acc : acc.add(obj.betId) && acc,
                    new Set()
                  ),
                  (id) =>
                    item?.profitLossDataSession?.find(
                      (obj: any) => obj.betId === id
                    )
                )
              : []
          }
          currentMatch={item}
          sessionData={QuicksessionData}
          max={item?.betFairSessionMaxBet}
          min={item?.betFairSessionMinBet}
          type="session"
        />
      )}
      {item?.apiSessionActive &&
        Object.entries(item?.apiSession || {})
          ?.filter(
            ([key, value]: any) =>
              value?.section?.length > 0 &&
              key != sessionBettingType.cricketCasino
          )
          ?.map(([key, value]: any) => {
            return (
              <SessionMarket
                key={key}
                title={value?.mname || key}
                allBetsData={
                  item?.profitLossDataSession
                    ? Array.from(
                        item?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.betId)
                              ? acc
                              : acc.add(obj.betId) && acc,
                          new Set()
                        ),
                        (id) =>
                          item?.profitLossDataSession?.find(
                            (obj: any) => obj.betId === id
                          )
                      )
                    : []
                }
                currentMatch={item}
                sessionData={value?.section}
                min={formatToINR(item?.betFairSessionMinBet) || 0}
                max={formatToINR(item?.betFairSessionMaxBet) || 0}
                type={key || value?.gtype}
              />
            );
          })}
      {item?.apiSessionActive &&
        (item?.apiSession?.cricketCasino?.section || [])
          ?.filter(
            (item: any) =>
              !(
                item?.activeStatus === "unSave" ||
                item?.activeStatus === "result"
              )
          )
          ?.map((item: any) => {
            return (
              <CricketCasinoMarket
                key={item?.selectionId}
                title={item?.RunnerName}
                allBetsData={
                  item?.profitLossDataSession
                    ? Array.from(
                        item?.profitLossDataSession?.reduce(
                          (acc: any, obj: any) =>
                            acc.has(obj.betId)
                              ? acc
                              : acc.add(obj.betId) && acc,
                          new Set()
                        ),
                        (id) =>
                          item?.profitLossDataSession?.find(
                            (obj: any) => obj.betId === id
                          )
                      )
                    : []
                }
                currentMatch={item}
                sessionData={item}
                min={formatToINR(item?.betFairSessionMinBet) || 0}
                max={formatToINR(item?.betFairSessionMaxBet) || 0}
                type={sessionBettingType.cricketCasino}
              />
            );
          })}
      {sessionProLoss?.length > 0 &&
        sessionProLoss.filter(
          (runAmount: any) => runAmount?.matchId === item?.id
        ).length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: "1px",
              rowGap: "5px",
              height: "440px",
              overflow: "scroll",
              marginTop: "1.25vw",
            }}
          >
            {sessionProLoss
              .filter((run: any) => run?.matchId === item?.id)
              .map((v: any) => {
                return (
                  <RunsBox
                    key={v?.id}
                    item={v}
                    currentOdd={currentOdd?.betId === v?.id ? currentOdd : null}
                  />
                );
              })}
          </Box>
        )}
      {showBets && (
        <FullAllBets
          tag={true}
          IObets={Array.from(
            placedBets.reduce(
              (acc: any, obj: any) =>
                acc.has(obj.id) ? acc : acc.add(obj.id) && acc,
              new Set()
            ),
            (id) => placedBets.find((obj: any) => obj.id === id)
          ).filter((bet: any) => bet?.matchId === item?.id)}
          setSelectedBetData={setSelectedBetData}
          selectedBetData={selectedBetData}
        />
      )}
    </>
  );
};

export default Layout;
