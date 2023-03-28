import client from "./client";

const postIncome = async (data) => {
  try {
    const response = await client.post("/income/new", data);
    return response;
  } catch (error) {
    console.log("수입 입력 에러", error);
    return error.response;
  }
};

const postExpenditure = async (data) => {
  try {
    const response = await client.post("/expenditure/new", data);
    return response;
  } catch (error) {
    console.log("수입 입력 에러", error);
    return error.response;
  }
};

export { postIncome, postExpenditure };
