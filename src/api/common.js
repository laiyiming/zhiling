import { get } from "@/utils/http";

export default {
  /**
   * 示范接口
   */
  getDictionary: () => get("/dictionary")
};
