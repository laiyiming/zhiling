import { parse } from "date-fns";
import _debounce from "lodash/debounce";
import _trim from "lodash/trim";
import _isEqual from "lodash/isEqual";
import _isEqualWith from "lodash/isEqualWith";

import { saveAs } from "file-saver";

// eslint-disable-next-line
const isEmpty = (val) => {
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (!Object.keys(val).length) return true;
  } else {
    if (
      val === "null" ||
      val === null ||
      val === "undefined" ||
      val === undefined ||
      val === ""
    )
      return true;
    return false;
  }
  return false;
};

/**
 * 去除前后空格符
 */
const trim = (value, chars = "") => {
  let data = value;

  if (Array.isArray(chars)) {
    chars.forEach(item => {
      data = _trim(data, item);
    });
    return data;
  }
  return _trim(data, chars);
};

/**
 * 判断两个字段是否相等
 */
const isEqual = (value, other, customizer = null) => {
  if (customizer) {
    return _isEqualWith(value, other, customizer);
  }
  return _isEqual(value, other);
};

/**
 * 生成每个最深层级项目的id路径数组，以便传递给 cascader 组件
 * @param {Array} data 后台数据
 * @param {Boolean} role 是否为角色数据
 */
const generateMapPaths = (data, field, handler) => {
  const result = [];

  const loop = (items, path) => {
    items.forEach(item => {
      const updatedPath = [
        ...path,
        handler ? handler(item, field) : item[field]
      ];
      if (item.children) {
        loop(item.children, updatedPath);
      } else {
        result.push(updatedPath);
      }
    });
  };

  loop(data, []);

  return result || [];
};

/**
 * 根据 id 获得该 id 所对应的路径数组
 * @param {Number} id 要寻找的 id
 * @param {Array} paths 所有的路径数组
 * @param {Boolean} strict 是否严格查找，严格查找时，所查找 id 必须是 path 数组的最后一项
 */
const getMapPath = (id, paths, strict = false) => {
  if (strict) {
    return paths.find(path => path[path.length - 1] === id);
  }

  const result = paths.find(path => path.includes(id));
  const index = result ? result.findIndex(pathId => pathId === id) : 0;
  return result ? result.slice(0, index + 1) : [];
};

/**
 * 错误信息处理
 * @param options {String} 自定义错误信息
 * @param options {Object} => { errors, status, message }
 * @param errors {Object}  异常错误信息
 * @param status {Object}  服务器错误信息
 * @param message {String} 自定义错误信息
 * @returns {Array}
 */
const errorHandler = options => {
  if (typeof options === "string") {
    return [options];
  }
  const { errors, message, status_code: statusCode = 480 } = options;
  if (errors) {
    return Object.values(errors).reduce(
      (result, item) => result.concat(item),
      []
    );
  }

  if (
    message &&
    (statusCode === 401 ||
      statusCode === 422 ||
      statusCode === 480 ||
      process.env.NODE_ENV !== "production")
  ) {
    return [message];
  }

  return ["提交失败，请联系管理员或稍后重试"];
};

/**
 * number 型的序号转化为中文序号
 * @param {Number} number 序号数值
 */
const numberChinese = number => {
  const units = "个十百千万@#%亿^&~";
  const chars = "零一二三四五六七八九";
  const a = `${number}`.split("");
  const s = [];
  let j = 0;
  if (a.length > 12) {
    throw new Error("too big");
  } else {
    j = a.length - 1;
    for (let i = 0; i <= j; i += 1) {
      if (j === 1 || j === 5 || j === 9) {
        // 两位数 处理特殊的 1*
        if (i === 0) {
          if (a[i] !== "1") s.push(chars.charAt(a[i]));
        } else {
          s.push(chars.charAt(a[i]));
        }
      } else {
        s.push(chars.charAt(a[i]));
      }
      if (i !== j) {
        s.push(units.charAt(j - i));
      }
    }
  }
  return s
    .join("")
    .replace(/零([十百千万亿@#%^&~])/g, (m, d, b) => {
      // 优先处理 零百 零千 等
      // eslint-disable-next-line
    b = units.indexOf(d);
      if (b !== -1) {
        if (d === "亿") return d;
        if (d === "万") return d;
        if (a[j - b] === "0") return "零";
      }
      return "";
    })
    .replace(/零+/g, "零")
    .replace(/零([万亿])/g, (m, b) => b)
    .replace(/亿[万千百]/g, "亿")
    .replace(/[零]$/, "")
    .replace(
      /[@#%^&~]/g,
      m =>
        ({
          "@": "十",
          "#": "百",
          "%": "千",
          "^": "十",
          "&": "百",
          "~": "千"
        }[m])
    )
    .replace(/([亿万])([一-九])/g, (m, d, b, c) => {
      // eslint-disable-next-line
      c = units.indexOf(d);
      if (c !== -1) {
        if (a[j - c] === "0") return `${d}零${b}`;
      }
      return m;
    });
};

/**
 * 判断字符串是否为JSON格式
 * @param {string} str
 */
export const stringIsJson = str => {
  if (typeof str === "string") {
    try {
      const obj = JSON.parse(str);
      if (typeof obj === "object" && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
};

// 日期字符串转 Date 对象
const dateParse = (stringDate = "") => {
  if (typeof stringDate === "string") {
    if (stringDate.includes("-")) {
      return parse(stringDate.replace(/-/g, "/"));
    }
    return parse(stringDate);
  }
  if (typeof stringDate === "number") {
    return parse(stringDate);
  }
  return stringDate;
};

/**
 * 下载文件方法
 * @param {String} url
 * @param {String} fileName
 */
const downloadFile = (url, fileName) => {
  saveAs(url, fileName);
};

/**
 * 下载远程文件
 * @param {Object} blob
 * @param {String} fileName
 */
const downloadBlobFile = (blob, fileName) => {
  const a = document.createElement("a");
  const url = window.URL.createObjectURL(blob);
  const filename = fileName;
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
};

/**
 * 数字处理有小数保留两位，否则显示整数
 * @param {Number}
 */
const getNumberDecimal = num => {
  const arr = num.toString().split(".");

  if (arr.length > 1 && +arr[1] > 0) {
    const decimal = `0.${arr[1]}`;

    if (+decimal > 0) {
      return +arr[0] + +decimal;
    }
    return +arr[0];
  }
  return +arr[0];
};

/**
 * 分钟转小时
 * @param {Number} min
 */
const getMinToHour = min => {
  const time = typeof min === "string" ? +min : min;
  let hour = 0;
  let points = 0;
  if (time >= 60) {
    hour = Math.floor(time / 60);
    points = ((time % 60) / 60).toFixed(2);
    return points > 0 ? hour + +points : hour;
  }
  hour = (time / 60).toFixed(2);
  return hour;
};

/**
 * 分钟格式化【小时，分钟】
 * @param {String} min 分钟
 */
const getMinFormatter = min => {
  const time = getMinToHour(min);
  const [hour, minutes] = time.toString().split(".");
  const m = +`0.${minutes}`;

  return [+hour, m ? (m * 60).toFixed(0) : 0];
};

/**
 * 获取示地区中文
 */
// const getDivisionTxt = (val, division = 100086) => {
//   // eslint-disable
//   const province =
//     (
//       (chinaJson.find(item => item.division_id === division) || {}).children ||
//       []
//     ).find(item => item.division_id === val.province_id) || {};
//   const city =
//     (province.children || []).find(item => item.division_id === val.city_id) ||
//     {};
//   const district =
//     (city.children || []).find(item => item.division_id === val.district_id) ||
//     {};

//   return [
//     `${province.division_name || null}`,
//     `${city.division_name || null}`,
//     `${district.division_name || ""}`
//   ].filter(item => !isEmpty(item));
// };

export default {
  isEmpty,
  trim,
  isEqual,
  generateMapPaths,
  errorHandler,
  getMapPath,
  stringIsJson,
  numberChinese,
  dateParse,
  downloadFile,
  downloadBlobFile,
  getNumberDecimal,
  getMinToHour,
  getMinFormatter
};
