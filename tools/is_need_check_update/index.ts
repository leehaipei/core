import moment from "moment";

function isNeedCheckUpdate(key: string): boolean {
  const checkKey: string = `check_${key}`;
  const checkInfo: string | null = localStorage.getItem(checkKey);

  if (checkInfo) {
    const now = moment();
    const lastCheckTime = moment(Number(checkInfo));

    if (now.diff(lastCheckTime, "day") > 1) {
      localStorage.setItem(checkKey, `${now.valueOf()}`);
      return true;
    } else {
      return false;
    }
  } else {
    localStorage.setItem(checkKey, `${moment().valueOf()}`);
    return true;
  }
}

export default isNeedCheckUpdate;
