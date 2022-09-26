import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface TaskInputProps {
  add: (task: string) => void;
}

const TaskInput = (props: TaskInputProps) => {
  const [text, setText] = useState("");
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Digite sua próxima tarefa aqui!"
        onChangeText={(newText: React.SetStateAction<string>) =>
          setText(newText)
        }
        clearButtonMode="always"
        value={text}
      />

      <Pressable
        style={styles.bttn}
        onPress={() => {
          props.add(text);
          setText("");
        }}
      >
        <MaterialIcons name="add-task" size={20} color="blue" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    marginTop: 10,
  },
  textInput: {
    height: 40,
    width: "90%",
    fontSize: 20,
  },
  bttn: {
    width: "10%",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  bttnText: {
    color: "white",
  },
});

export default TaskInput;
