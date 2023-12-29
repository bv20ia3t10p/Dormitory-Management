const engToVieDict = {
  Jan: "Tháng một",
  Feb: "Tháng hai",
  Mar: "Tháng ba",
  Apr: "Tháng tư",
  May: "Tháng năm",
  Jun: "Tháng sáu",
  Jul: "Tháng bảy",
  Aug: "Tháng tám",
  Sep: "Tháng chín",
  Oct: "Tháng mười",
  Nov: "Tháng mười một",
  Dec: "Tháng mười hai",
  Mon: "Thứ hai",
  Tue: "Thứ ba",
  Wed: "Thứ tư",
  Thu: "Thứ năm",
  Fri: "Thứ sáu",
  Sat: "Thứ bảy",
  Sun: "Chủ nhật",
};

export const formatDateStringToVie = (input) => {
  Object.keys(engToVieDict).forEach((engText) => {
    input = input.replace(engText, engToVieDict[engText]);
  });
  return input;
};
