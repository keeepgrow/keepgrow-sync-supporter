export const getArrayFromEnum = (enums) => {
  return Object.values(enums).filter((v) => typeof v === "number");
};
