import ListItems from "../../components/report/ListItems";
import { Constants } from "../../utils/Constants";

const Reports = () => {
  const menutItems1 = [
    { title: "Profit/Loss", link: `${Constants.oldAdmin}reports/profit_loss` },
    {
      title: "Profit/Loss Cards",
      link: `${Constants.oldAdmin}reports/profit_loss_cards`,
    },
    {
      title: "Account Statement",
      link: `${Constants.oldAdmin}reports/account_statement`,
    },
    { title: "Current Bet", link: `${Constants.oldAdmin}reports/current_bet` },
    // { title: "General Report", link: `${Constants.oldAdmin}reports/general_report` },
  ];

  return <ListItems title={"Report"} menutItems1={menutItems1} />;
};

export default Reports;
