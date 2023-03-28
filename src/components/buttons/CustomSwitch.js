import React, { useState } from "react";
import { Text, View, TouchableOpacity } from "react-native";

//토글 스위치
const CustomSwitch = ({ selectionMode, onSelectSwitch }) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);

  const updatedSwitchData = (val) => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };
  const setBackgroundColor = (index) =>
    getSelectionMode === index ? "#424956" : "transparent";

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View style={backgroundStyle}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(1)}
          style={{
            ...defaultStyle,
            backgroundColor: setBackgroundColor(1),
          }}
        >
          <Text
            style={{
              color: "#ffffff",
            }}
          >
            수입
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(2)}
          style={{
            ...defaultStyle,
            backgroundColor: setBackgroundColor(2),
          }}
        >
          <Text
            style={{
              color: "#ffffff",
            }}
          >
            지출
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomSwitch;

const defaultStyle = {
  flex: 1,
  borderRadius: 25,
  justifyContent: "center",
  alignItems: "center",
};
const backgroundStyle = {
  width: 177,
  height: 42,
  backgroundColor: "#282D36",
  borderRadius: 42,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  padding: 2,
  marginBottom: 36,
};
