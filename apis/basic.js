import axios from "axios";
import { baseURL } from "../constants/config";
import { getAllParameters } from "./commonParameter";

export async function axiosPost(path, parameters) {
  const allParameters = await getAllParameters(path, parameters);
  return axios
    .post(`${baseURL}/api/app${path}`, { ...parameters })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}

// get 方式
export async function axiosGet(path, parameters) {
  try {
    // const allParameters = await getAllParameters(path, parameters);
    const response = await axios.get(`${baseURL}/api/app${path}`, {
      params: { ...parameters },
    });
    return response;
  } catch (error) {
    console.log("error---", error);
    return error;
  }
}

export async function axiosPostFile(path, parameters) {
  // 构建请求体数据
  const formData = new FormData();
  // 使用Object.entries方法遍历dataObject对象的属性和值，并添加到formData
  Object.entries(parameters).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return axios
    .post(`${baseURL}/api/app${path}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error", error);
      return error;
    });
}
