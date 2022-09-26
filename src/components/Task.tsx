import React from "react";
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TaskProps {
  task: any;
  concluded: (index: number, id: string) => void;
  delete: (index: string) => void;
  index: number;
  edit: (id: string, task: string) => void;
}

const Task = (props: TaskProps) => {
  let textLine;
  props.task.concluded === false
    ? (textLine = "none")
    : (textLine = "line-through");
  return (
    <View style={styles.taskContainer}>
      <Text style={[styles.taskText, { textDecorationLine: textLine }]}>
        {props.task.task}
      </Text>

      <Pressable
        style={styles.bttn}
        onPress={() => props.concluded(props.index, props.task.id)}
      >
        <MaterialIcons name="check" size={20} color="white" />
      </Pressable>
      <Pressable
        style={styles.bttn}
        onPress={() => props.delete(props.task.id)}
      >
        <MaterialIcons name="delete" size={20} color="white" />
      </Pressable>
      <Pressable
        style={styles.bttn}
        onPress={() => {
          props.edit(props.task.id, props.task.task);
        }}
      >
        <MaterialIcons name="edit" size={20} color="white" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    marginVertical: 4,
    height: 30,
    alignItems: "center",
    borderRadius: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 3,
    color: "white",
  },
  bttn: {
    marginHorizontal: 2,
  },
});
export default Task;
