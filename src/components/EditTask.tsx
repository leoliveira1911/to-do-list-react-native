import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

interface EditTaskProps {
  task: string;
  edit: (task: string) => void;
}

const EditTask = (props: EditTaskProps) => {
  const [text, setText] = useState(props.task);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(newText: React.SetStateAction<string>) =>
          setText(newText)
        }
        clearButtonMode="always"
        value={text}
      />

      <Pressable
        style={styles.bttn}
        onPress={() => {
          props.edit(text);
          setText("");
        }}
      >
        <MaterialIcons name="add-task" size={20} color="blue" />
      </Pressable>
    </View>
  );
};

export default EditTask;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    width: "90%",

    alignSelf: "center",
  },
  textInput: {
    backgroundColor: "white",
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  bttn: {
    marginTop: 10,
  },
});
