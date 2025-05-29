export const getArrayFromEnum = (enums) => {
  return Object.values(enums).filter((v) => typeof v === "number");
};

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
