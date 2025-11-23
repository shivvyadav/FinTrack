import moment from "moment";

export const prepareExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item?.category,
    amount: item?.amount,
  }));
  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!data || data.length === 0) return null;
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));
  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );
  const chartData = sortedData.map((item) => ({
    date: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));
  return chartData;
};
