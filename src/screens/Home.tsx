import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { auth, store } from "../../firebase";
import EditTask from "../components/EditTask";
import Table from "../components/Table";
import TaskInput from "../components/TaskInput";
import Title from "../components/Title";

const Home = () => {
  useEffect(() => {
    getTasks();
  }, []);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [tasksList, setTasksList] = useState<any[]>([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [editingTask, setEditingTask] = useState("");

  const getTasks = () => {
    setTasksList([]);
    store
      .collection("user")
      .doc(`${auth.currentUser?.uid}`)
      .collection("toDo")
      .orderBy("time")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          setTasksList((tasksList) => [
            ...tasksList,
            { ...doc.data(), id: doc.id },
          ]);
          console.log(doc.id, " => ", doc.data());
        });
      });
  };

  const addTask = (e: string) => {
    store
      .collection("user")
      .doc(`${auth.currentUser?.uid}`)
      .collection("toDo")
      .add({
        task: e,
        concluded: false,
        time: new Date(),
      });
    getTasks();
  };

  const deleteTask = (id: string) => {
    console.log("funçaõ delete");
    store
      .collection("user")
      .doc(`${auth.currentUser?.uid}`)
      .collection("toDo")
      .doc(`${id}`)
      .delete();
    getTasks();
  };

  function concluded(e: number, id: string) {
    let concluded;
    tasksList[e].concluded === true ? (concluded = false) : (concluded = true);

    store
      .collection("user")
      .doc(`${auth.currentUser?.uid}`)
      .collection("toDo")
      .doc(`${id}`)
      .update({
        concluded: concluded,
      });

    getTasks();
  }

  const selectTaskToEdit = (id: string, task: string) => {
    console.log(id);
    setEditingId(id);
    setEditingTask(task);
    setShowUpdate(true);
  };

  const editTask = (task: string) => {
    setShowUpdate(false);
    store
      .collection("user")
      .doc(`${auth.currentUser?.uid}`)
      .collection("toDo")
      .doc(`${editingId}`)
      .update({
        task: task,
      });

    getTasks();
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" backgroundColor="lightblue" />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            height: windowHeight,
            width: windowWidth,
            marginTop: 31,
            backgroundColor: "lightblue",
          }}
        >
          <Title title="TO DO LIST" />

          {showUpdate === false ? (
            <>
              <TaskInput add={addTask} />
              <Table
                delete={deleteTask}
                body={tasksList}
                concluded={concluded}
                edit={selectTaskToEdit}
              />
            </>
          ) : (
            <EditTask edit={editTask} task={editingTask} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
  },
  sectionDescription: {
    margin: 8,
    fontSize: 18,
    fontWeight: "400",
    display: "flex",
    flexDirection: "column",
  },
  highlight: {
    fontWeight: "700",
  },
});

export default Home;
