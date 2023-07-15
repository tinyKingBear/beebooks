import React, { use, useState } from "react";
import styles from "@/styles/login.module.css";
import api from "@/api/api";
import { useRouter } from "next/router";
import { useMessage } from "@/components/Message";
import Cookies from "js-cookie";

type LoginForm = {
  name?: string;
  email: string;
  password: string;
};

enum LoginType {
  Login = 1,
  Register,
}
export default function login() {
  const [loginType, setLoginType] = useState<LoginType>(LoginType.Login);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("tiny@test.com");
  const [password, setPassword] = useState("123456");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { showMessage } = useMessage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 进行校验
    let newErrors = {
      username: "",
      email: "",
      password: "",
    };

    if (!username && loginType === LoginType.Register) {
      newErrors.username = "请输入用户名";
    }

    if (!validateEmail(email)) {
      newErrors.email = "请输入有效的邮箱";
    }

    if (!password) {
      newErrors.password = "请输入密码";
    }

    // if (!validatePassword(password)) {
    //   newErrors.password =
    //     "密码必须包含至少一个数字和一个大写字母，且长度为8位";
    // }

    setErrors(newErrors);
    if (newErrors.username || newErrors.email || newErrors.password) {
      return;
    }

    // 校验通过，进行提交操作
    const loginData: LoginForm = { email, password };
    if (loginType === LoginType.Register) {
      loginData.name = username;
    }
    loginRequest(loginData);
  };

  const validateEmail = (email: string) => {
    // 使用正则表达式进行邮箱校验
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // 使用正则表达式进行密码校验
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password);
  };

  const loginRequest = (formData: LoginForm) => {
    const apiName = loginType === LoginType.Login ? "/login" : "/register";
    api
      .post(apiName, formData)
      .then((response: any) => {
        // 处理响应数据
        showMessage({
          type: "success",
          content: `登录成功！`,
        });
        Cookies.set("token", response.token);
        router.push("/");
      })
      .catch((error: any) => {
        // 处理请求错误;
        showMessage({
          type: "error",
          content: `${error.response.data.error}`,
        });
      });
  };

  const switchMode = () => {
    setLoginType(
      loginType === LoginType.Login ? LoginType.Register : LoginType.Login
    );
    reset();
  };

  const reset = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formContent} onSubmit={handleSubmit}>
        {loginType === LoginType.Register && (
          <div>
            <div>用户名</div>
            <div className={styles.inputContent}>
              <input
                className={styles.inputStyle}
                type="text"
                id="username"
                value={username}
                placeholder="请输入用户名"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {errors.username && (
              <div className={styles.errorContent}>{errors.username}</div>
            )}
          </div>
        )}
        <div>
          <div>邮箱</div>
          <div className={styles.inputContent}>
            <input
              className={styles.inputStyle}
              type="email"
              id="email"
              value={email}
              placeholder="请输入邮箱"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && (
            <div className={styles.errorContent}>{errors.email}</div>
          )}
        </div>
        <div>
          <div>密码</div>
          <div className={styles.inputContent}>
            <input
              className={styles.inputStyle}
              type="password"
              id="password"
              value={password}
              placeholder="请输入密码"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errors.password && (
            <div className={styles.errorContent}>{errors.password}</div>
          )}
        </div>
        <button className={styles.submitBtn} type="submit">
          {loginType === LoginType.Login ? "登 录" : "注 册"}
        </button>
        <div className={styles.footTips}>
          {loginType === LoginType.Login ? "还没有账户？" : "已有账户?"}
          <div className={styles.typeSwitch} onClick={switchMode}>
            {loginType === LoginType.Login ? "注 册" : "登 录"}
          </div>
        </div>
      </form>
    </div>
  );
}
