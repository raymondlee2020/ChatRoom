# ChatRoom
> ChatRoom 是一個於實現網頁聊天室的專案，包含以 [Express](https://expressjs.com/) 實作的 Server 端 與 [Vue](https://vuejs.org/) 實作的 Client 端，兩者透過 Socket.IO 進行資料傳輸以同步多個使用者的聊天室

## 執行方式

### Server
```
cd chatroom
npm install
npm run serve
```
or
```
cd chatroom
yarn install
yarn run serve
```

### Client
```
cd weetalk
npm install
npm run serve
```
or
```
cd weetalk
yarn install
yarn run serve
```

## 專案特色

### 已實現
- 以自訂用戶名連線
- 在線人數統計
- 即時聊天室同步
- 公眾聊天頻道

### 未實現
- 私人聊天機制(發送邀請、接受邀請)
