import client from "./client";
import format from "date-fns/format";

const getStatisticsMain = async (date) => {
  try {
    const response = await client.get(
      `/statistics/${format(date, "yyyy/M/d")}`
    );
    return response;
  } catch (error) {
    console.log("통계 에러", error);
    return error.response;
  }
};

const getStatisticsView = async (date) => {
  try {
    const response = await client.get(
      `/statistics/total/${format(date, "yyyy/M")}`
    );
    return response;
  } catch (error) {
    console.log("통계 에러2", error);
    return error.response;
  }
};

const getStatisticsWays = async (way, date) => {
  try {
    const response = await client.get(
      `/statistics/${way}/${format(date, "yyyy/M")}`
    );
    return response;
  } catch (error) {
    console.log("통계 에러2", error);
    return error.response;
  }
};
export { getStatisticsMain, getStatisticsView, getStatisticsWays };
