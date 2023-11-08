import base64 from "base-64";
import Util from "./util";

const getItem = (key: string) => {
  const data: string =
    typeof window !== "undefined" && localStorage.getItem(key)
      ? localStorage.getItem(key) ?? ""
      : ""
  try {
    return base64.decode(data)
  } catch (err) {
    return ""
  }
}

const setItem = (key: string, value: string) => {
  const stringify =
    typeof value !== "string"
      ? Util.toBinaryStr(JSON.stringify(base64.encode(value)))
      : base64.encode(Util.toBinaryStr(value))
  return localStorage.setItem(key, stringify)
}

const removeItem = (key: string) => {
  localStorage.removeItem(key)
}

export { getItem, setItem, removeItem }