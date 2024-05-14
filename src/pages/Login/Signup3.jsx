import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Header
import Header from "components/Tab/Header";
// Images
const backIcon = require("assets/icons/home/back.png");

const checkExistingData = async (nickname, email) => {
  const existingNickname = "rlawlgud";
  const existingEmail = "wlgud@naver.com";

  if (nickname === existingNickname) {
    return "이미 존재하는 닉네임입니다.";
  }
  if (email === existingEmail) {
    return "이미 존재하는 이메일입니다.";
  }

  return null;
};

const Signup3 = ({ navigation }) => {
  const login = () => {
    navigation.navigate("Login");
  };
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentFocus, setCurrentFocus] = useState("");

  useEffect(() => {
    const checkAvailability = async () => {
      if (!nickname.trim()) {
        setNicknameError("닉네임을 입력하세요.");
        return;
      }
      // Check if nickname is available
      const existingDataMsg = await checkExistingData(nickname, email);
      if (!existingDataMsg) {
        setNicknameError("사용 가능한 닉네임입니다.");
      } else {
        setNicknameError(existingDataMsg);
      }
    };

    checkAvailability();
  }, [nickname, email]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!email.trim()) {
        setEmailError("이메일을 입력하세요.");
        return;
      }

      // Check if email is available
      const existingDataMsg = await checkExistingData(nickname, email);
      if (!existingDataMsg) {
        setEmailError("사용 가능한 이메일입니다.");
      } else {
        setEmailError(existingDataMsg);
      }
    };

    checkAvailability();
  }, [nickname, email]);

  const handleNicknameChange = (value) => {
    setNickname(value);
    setNicknameError("");
    setCurrentFocus("nickname");
    if (value.trim() === "") {
      setNicknameError("닉네임을 입력하세요.");
    } else {
      setNicknameError("");
    }
  };

  const handleEmailChange = (value) => {
    setEmail(value);
    setEmailError("");
    setCurrentFocus("email");
    if (value.trim() === "") {
      setEmailError("이메일을 입력하세요.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError("");
    setCurrentFocus("");
    if (value.trim() === "") {
      setPasswordError("비밀번호를 입력하세요.");
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setConfirmPasswordError("");
    setCurrentFocus("");
    if (value.trim() === "") {
      setConfirmPasswordError("비밀번호를 확인해주세요.");
    } else if (value !== password) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSignup = async () => {
    let isValid = true;
    if (!nickname.trim()) {
      setNicknameError("닉네임을 입력하세요.");
      isValid = false;
    }
    if (!email.trim()) {
      setEmailError("이메일을 입력하세요.");
      isValid = false;
    }
    if (!password.trim()) {
      setPasswordError("비밀번호를 입력하세요.");
      isValid = false;
    }
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("비밀번호를 확인해주세요.");
      isValid = false;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("비밀번호가 일치하지 않습니다.");
      isValid = false;
    }
    if (!isValid) return;

    const existingDataMsg = await checkExistingData(nickname, email);
    if (existingDataMsg) {
      Alert.alert(existingDataMsg);
      return;
    }
    login();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
      <Header
        left={backIcon}
        leftClick={() => navigation.navigate("Signup2")}
      />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>스터디버디</Text>
            <Text style={[styles.title, { color: "#ff7474" }]}>회원가입</Text>
            <View style={{ marginTop: 60 }}>
              <View>
                <Text
                  style={{
                    fontSize: 16,
                    color: "#ff7474",
                    fontWeight: "bold",
                    marginBottom: 20,
                  }}
                >
                  계정
                </Text>
              </View>
              <TextInput
                style={styles.input}
                placeholder="닉네임 입력"
                onChangeText={handleNicknameChange}
                value={nickname}
                onFocus={() => setCurrentFocus("nickname")}
              />
              {nicknameError &&
              (currentFocus === "nickname" || !email.trim()) ? (
                <Text
                  style={[
                    styles.errorText,
                    nicknameError === "사용 가능한 닉네임입니다."
                      ? styles.successText
                      : null,
                  ]}
                >
                  {nicknameError}
                </Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="이메일 입력"
                onChangeText={handleEmailChange}
                value={email}
                onFocus={() => setCurrentFocus("email")}
              />
              {emailError && (currentFocus === "email" || !nickname.trim()) ? (
                <Text
                  style={[
                    styles.errorText,
                    emailError === "사용 가능한 이메일입니다."
                      ? styles.successText
                      : null,
                  ]}
                >
                  {emailError}
                </Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="비밀번호 입력"
                secureTextEntry={true}
                onChangeText={handlePasswordChange}
                value={password}
              />
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <TextInput
                style={styles.input}
                placeholder="비밀번호 확인"
                secureTextEntry={true}
                onChangeText={handleConfirmPasswordChange}
                value={confirmPassword}
              />
              {confirmPasswordError ? (
                <Text style={styles.errorText}>{confirmPasswordError}</Text>
              ) : null}
            </View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSignup}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#777777",
    marginLeft: 10,
  },
  input: {
    width: 337,
    height: 45,
    borderColor: "#777777",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF7474",
    alignItems: "center",
    justifyContent: "center",
    width: 374,
    height: 60,
    borderRadius: 8,
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  errorText: {
    fontSize: 12,
    color: "red",
    marginBottom: 8,
  },
  successText: {
    fontSize: 12,
    color: "green",
    marginBottom: 8,
  },
});

export default Signup3;