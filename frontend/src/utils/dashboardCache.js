const DASHBOARD_CACHE_KEY = "dashboard_data_v1";

export const getDashboardCache = () => {
  const cached = localStorage.getItem(DASHBOARD_CACHE_KEY);
  return cached ? JSON.parse(cached) : null;
};

export const setDashboardCache = (data) => {
  localStorage.setItem(DASHBOARD_CACHE_KEY, JSON.stringify(data));
};

export const clearDashboardCache = () => {
  localStorage.removeItem(DASHBOARD_CACHE_KEY);
};
