import ListItems from "../../components/report/ListItems";
import { checkUserType } from "../../helper";

const Reports = () => {
  const menutItems1 = [
    { title: "Profit/Loss", link: `/${checkUserType()}/reports/profit_loss` },
    { title: "Account Statement", link: `/${checkUserType()}/reports/account_statement` },
    { title: "Current Bet", link: `/${checkUserType()}/reports/current_bet` },
    { title: "General Report", link: `/${checkUserType()}/reports/general_report` },
  ];

  return <ListItems title={"Report"} menutItems1={menutItems1} />;
};

export default Reports;
