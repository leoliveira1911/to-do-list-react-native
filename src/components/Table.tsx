import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacityBase,
  View,
} from "react-native";
import Task from "./Task";

interface PropsTable {
  body: any[];
  concluded: (e: number, id: string) => void;
  delete: (e: string) => void;
  edit: (e: string, task: string) => void;
}

const Table = (props: PropsTable) => {
  const RenderBody = () => {
    return props.body.map((task, index) => {
      let line;
      task.concluded == true ? (line = "line-through") : (line = "");
      return (
        <View key={index}>
          <Task
            task={task}
            index={index}
            concluded={props.concluded}
            delete={props.delete}
            edit={props.edit}
          />
        </View>
      );
    });
  };

  return (
    <View style={styles.container}>
      <View>{RenderBody()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "lightblue",
    width: "90%",
    alignSelf: "center",
  },
  text: {
    margin: 6,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
  },
  checkBox: {
    height: 20,
    width: 20,
    borderRadius: 20,
    margin: 3,
  },
});

export default Table;
