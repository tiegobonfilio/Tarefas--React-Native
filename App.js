import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import TaskList from "./src/components/TaskList";

const App = () => {
  const [task, setTask] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  //busca todas tarefas ao iniciar app
  useEffect(() => {
    async function loadtasks() {
      try {
        const taskstorage = await AsyncStorage.getItem("@task");
        if (taskstorage) {
          setTask(JSON.parse(taskstorage));
        }
      } catch (e) {
        console.error("Failed to load .");
      }
    }

    loadtasks();
  }, []);

  //salvar dados apos alteracao
  useEffect(() => {
    async function saveTasks() {
      try {
        await AsyncStorage.setItem("@task", JSON.stringify(task));
      } catch (e) {
        console.error("Failed to save.");
      }
    }

    saveTasks();
  }, [task]);

  //adiciona dados
  function add() {
    if (input === "") return;

    const data = {
      key: input,
      task: input,
    };

    setTask((task) => [...task, data]);
    setOpen(false);
    setInput("");
  }
  //deletar task
  const deletar = useCallback((data) => {
    const find = task.filter((r) => r.key !== data.key);
    setTask(find);
    Alert.alert("Deletado com sucesso");
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#171d31" />
      <View style={styles.content}>
        <Text style={styles.title}>Tarefas</Text>

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={task}
          renderItem={({ item }) => <TaskList data={item} deletar={deletar} />}
          keyExtractor={(item) => String(item.key)}
        />

        <Modal transparent={false} visible={open}>
          <SafeAreaView style={styles.modal}>
            <View style={styles.modalheader}>
              <TouchableOpacity onPress={() => setOpen(false)}>
                <Ionicons
                  style={{ marginLeft: 5, marginTop: 5 }}
                  name="md-arrow-back"
                  size={35}
                  color="#fff"
                />
              </TouchableOpacity>

              <Text style={styles.modaltitle}>Adicionar</Text>
            </View>
            <View>
              <TextInput
                multiline={true}
                autoCorrect={false}
                placeholder="digite a tarefa"
                style={styles.input}
                onChangeText={(texto) => setInput(texto)}
                value={input}
              />
              <TouchableOpacity style={styles.modaladd} onPress={add}>
                <Text>Cadastrar</Text>
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Modal>
      </View>

      <TouchableOpacity style={styles.fab} onPress={() => setOpen(true)}>
        <Ionicons name="md-add" size={35} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  content: {
    flex: 1,
  },
  title: {
    marginTop: 15,
    paddingBottom: 20,
    fontSize: 35,
    textAlign: "center",
    color: "#fff",
  },

  fab: {
    position: "absolute",
    width: 60,
    height: 60,
    backgroundColor: "#0094ff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    elevation: 2,
    right: 25,
    bottom: 25,
    zIndex: 3,
    shadowColor: "#002",
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  FlatList: {
    backgroundColor: "#fff",
  },
  modal: {
    flex: 1,
    backgroundColor: "#171d31",
  },
  modalheader: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  modaltitle: {
    marginLeft: 10,
    fontSize: 25,
    color: "#fff",
  },
  input: {
    marginTop: 20,
    fontSize: 15,
    backgroundColor: "#fff",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    height: 100,
    textAlignVertical: "top",
    color: "#000",
    borderRadius: 5,
  },
  modaladd: {
    backgroundColor: "#fff",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    marginLeft: 10,
    height: 40,
  },
});

export default App;
