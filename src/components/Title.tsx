import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TitleProps {
  title: string;
}

const Title = (props: TitleProps) => {
  return (
    <View style={styles.titleBox}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleBox: {
    backgroundColor: "blue",
    height: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    borderRadius: 13,
    marginTop: 4,
  },
  titleText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "600",
  },
});

export default Title;
