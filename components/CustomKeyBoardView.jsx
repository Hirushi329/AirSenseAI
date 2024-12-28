import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React from "react";

const android = Platform.OS === "android";

export default function CustomKeyBoardView({ children, inChat }) {
  let keyConfig = {};
  let scrollViewConfig = {};
  if (inChat) {
    keyConfig = {keyboardVerticalOffset: 90};
    scrollViewConfig = {contentContainerStyle: {flex: 1}};
  }
  return (
    <KeyboardAvoidingView
      behavior={android ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      // {...keyConfig}
    >
      <ScrollView
        style={{ flex: 1 }}
        {...scrollViewConfig}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
