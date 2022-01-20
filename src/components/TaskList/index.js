import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskList({ data, deletar }) {
  return (
    <TouchableOpacity onPress={() => deletar(data)}>
      <View style={styles.container}>
        <Ionicons name="md-checkmark-circle" size={30} color="#121212" />
        <View>
          <Text style={styles.task}>{data.task}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 7,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    padding: 7,
    elevation: 1.5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
  },
  task: {
    color: "#121212",
    fontSize: 20,
    paddingLeft: 10,
    paddingRight: 20,
  },
});
