import {
  // get,
  post
  // put,
  // patch,
  // deletes,
  // deletest,
  // postfile
} from "@/utils/http"; // 导入http中创建的axios实例

// login
export default {
  login: params => post("/jnc-account-api/v1/passwd/login", params)
};
