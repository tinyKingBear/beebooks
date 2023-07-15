次项目是优思面试使用的模拟项目

# 开始

首先克隆此项目

```bash
git clone https://github.com/<您的github用户名>/beebooks.git

cd beebooks

git remote set-url origin <你的remote repo url>

# 项目完成后告诉我您的remote repo 的url即可
```

此项目是一个 nextjs 请参考 [NEXT 文档](https://www.nextjs.cn/docs/getting-started)

网站前端流程请阅览 [UI 线框图](https://www.figma.com/proto/AVd2eMcr1BtCr3UaQpNsFb/%E7%BD%91%E9%A1%B5%E9%A1%B5%E9%9D%A2?page-id=0%3A1&type=design&node-id=11-327&viewport=342%2C367%2C0.53&t=HaFn47fZtPJo65wq-1&scaling=scale-down&starting-point-node-id=1%3A2&mode=design)。

流程请按照线框图制作，但是 UI 可以自己设计。请尽量不要使用任何 UI 库。

# 后端

## 基础 URL

我会私底下告诉你基础 URL。

## 端点

### /graphql

graphql 的节点，关于 graphql 的使用请参考一下信息。 所有的返回数据必须在前端 typesafe，graphql 可以使用 codegen 自动生成 type。Restful 可以写 generics。

- [Apollo Graphql](https://www.apollographql.com/docs/react)
- [Codegen](https://the-guild.dev/graphql/codegen)

### /register

新用户注册

- 方法：POST
- 请求格式：
  - 请求体（如果适用）：
    ```json
    {
      "name": "value",
      "email": "value",
      "password": "value"
    }
    ```
- 响应格式：
  - 成功响应：
    - 状态码：200
    - 响应体：
    ```json
    {
      "token": "value"
    }
    ```
  - 错误响应：
    - 状态码：400=你的错误，500 请联系我
    - 响应体：
    ```json
    {
      "error": "错误信息"
    }
    ```

### /login

用户登录

- 方法：POST
- 请求格式：
  - 请求体（如果适用）：
    ```json
    {
      "email": "value",
      "password": "value"
    }
    ```
- 响应格式：
  - 成功响应：
    - 状态码：200
    - 响应体：
    ```json
    {
      "token": "value"
    }
    ```
  - 错误响应：
    - 状态码：400=你的错误，500 请联系我
    - 响应体：
    ```json
    {
      "error": "错误信息"
    }
    ```

### /reset

清除数据库所有信息

- 方法：GET
- 响应格式：
  - 成功响应：
    - 状态码：200
    - 响应体：
    ```json
    {
      "message": "success"
    }
    ```
  - 错误响应：
    - 状态码：400=你的错误，500 请联系我
    - 响应体：
    ```json
    {
      "error": "错误信息"
    }
    ```
