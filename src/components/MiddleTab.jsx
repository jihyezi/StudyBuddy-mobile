import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const MiddleTab = ({ text, selected, onPress }) => {
  return (
    <View style={{ flexDirection: "column" }}>
      <TouchableOpacity
        style={{ justifyContent: "center", alignItems: "center" }}
        onPress={onPress}
      >
        <Text style={styles.MiddleTabText}>{text}</Text>
        {selected ? (
          <Image
            source={require("assets/icons/mypage/Line.png")}
            style={styles.Image}
          />
        ) : (
          <Image
            source={require("assets/icons/mypage/emptyLine.png")}
            style={styles.Image}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  MiddleTabText: {
    color: "#333",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: 22,
  },
  Image: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MiddleTab;