import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Legend = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Legend:</Text>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.start]} />
          <Text style={styles.text}>Start (S)</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.end]} />
          <Text style={styles.text}>End (E)</Text>
        </View>
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.wall]} />
          <Text style={styles.text}>Wall</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.empty]} />
          <Text style={styles.text}>Empty</Text>
        </View>
      </View>
      <View style={styles.legendRow}>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.explored]} />
          <Text style={styles.text}>Explored</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.box, styles.path]} />
          <Text style={styles.text}>Path</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  box: {
    width: 20,
    height: 20,
    marginRight: 6,
    borderWidth: 1,
    borderColor: "#999",
  },
  text: {
    fontSize: 12,
    color: "#555",
  },
  start: {
    backgroundColor: "#4CAF50",
  },
  end: {
    backgroundColor: "#f44336",
  },
  wall: {
    backgroundColor: "#1a1a1a",
  },
  empty: {
    backgroundColor: "#ffffff",
  },
  explored: {
    backgroundColor: "#FFE082",
  },
  path: {
    backgroundColor: "#2196F3",
  },
});

export default Legend;
