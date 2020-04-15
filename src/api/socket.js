// import store from '@/store';
import { MessageBox, Message } from "element-ui";
import router from "../router/index.js";
import util from "../utils/util.js";

var websock = null;
var global_callback = null;
var serverPort = "8282"; // webSocket连接端口
var timestamp = null;
function initWebSocket() {
  // 初始化weosocket
  // ws地址
  // var wsuri = "ws:192.168.101.200:" + serverPort;
  var wsuri = "ws:coopez.cn:" + serverPort;
  // var wsuri = 'ws://www.stqcm.com:' + serverPort;
  // var wsuri = 'ws://121.199.63.114:' + serverPort;
  websock = new WebSocket(wsuri);
  websock.onmessage = function(e) {
    websocketonmessage(e);
  };
  websock.onclose = function(e) {
    websocketclose(e);
  };
  websock.onopen = function() {
    websocketOpen();
  };

  // 连接发生错误的回调方法
  websock.onerror = function() {
    console.log("WebSocket连接发生错误");
  };
}

// 实际调用的方法
function sendSock(agentData, callback) {
  global_callback = callback;
  if (websock.readyState === websock.OPEN) {
    // 若是ws开启状态
    websocketsend(agentData);
  } else if (websock.readyState === websock.CONNECTING) {
    // 若是 正在开启状态，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  } else {
    // 若未开启 ，则等待1s后重新调用
    setTimeout(function() {
      sendSock(agentData, callback);
    }, 1000);
  }
}

// 数据接收
function websocketonmessage(e) {
  console.log(e)
  if (!util.isEmpty(e.data)) {
    const res = JSON.parse(e.data);
    if (res.code !== 0) {
      Message.error(res.message);
    }
  }

  if (global_callback === null) {
    console.log("回调函数不存在");
  } else {
    global_callback(e.data);
  }
}

// 数据发送
function websocketsend(agentData) {
  websock.send(agentData);
  // websock.send(JSON.stringify(agentData))
}

// 关闭
function websocketclose(e) {
  const now = new Date().getTime();
  console.log(now);
  console.log(timestamp);
  console.log("websocket关闭");
  if (e) {
    console.log("connection closed (" + e.code + ")");
  }
  MessageBox.alert(
    "由于网络原因或其他原因导致链接断开,点击确定重新登陆",
    "连接异常",
    {
      confirmButtonText: "确定",
      callback: action => {
        console.log("action", action);
        // store.dispatch("LogOut").then();
      }
    }
  );
}

// function websocketOpen(e) {
//   console.log("连接成功");
// }

function websocketOpen() {
  console.log("连接成功");
  const token = JSON.parse(localStorage.getItem("token"));
  if(!util.isEmpty(token)) {
    const path = {
      api: "api_home_index_reconnect",
      data: {
        token
      }
    };
    sendSock(JSON.stringify(path), res => {
      const resj = JSON.parse(res);
      if (resj.code !== 0) {
        console.log(858785)
        localStorage.clear();
        router.push("/");
      }
    });
  }
  
}

// 监听页面操作的时间戳
function noOps() {
  timestamp = new Date().getTime();
}

document.onkeydown = function() {
  noOps();
  // console.log('关闭websocket')
  // websock.close()
  // websocketclose()
};

document.onmousedown = function() {
  noOps();
};

document.onmousewheel = function() {
  noOps();
};

// 监听浏览器关闭刷新事件
window.onbeforeunload = function() {
  console.log("浏览器刷新");
  // getMap()
  // alert ('123')
  // return false
  // store.dispatch("LogOut").then();
};

initWebSocket();

export { sendSock };
