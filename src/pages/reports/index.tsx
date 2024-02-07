import ListItems from "../../components/report/ListItems";

const Reports = () => {
  const menutItems1 = [
    { title: "Profit/Loss", link: `/admin/reports/profit_loss` },
    { title: "Account Statement", link: `/admin/reports/account_statement` },
    { title: "Current Bet", link: `/admin/reports/current_bet` },
    { title: "General Report", link: `/admin/reports/general_report` },
  ];

  return <ListItems title={"Report"} menutItems1={menutItems1} />;
};

export default Reports;
