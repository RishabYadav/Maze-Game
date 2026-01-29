import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { CELL_TYPES } from "../utils/mazeUtils";

const { width } = Dimensions.get("window");

const Cell = ({ type, size }) => {
  const getCellStyle = () => {
    switch (type) {
      case CELL_TYPES.WALL:
        return styles.wall;
      case CELL_TYPES.START:
        return styles.start;
      case CELL_TYPES.END:
        return styles.end;
      case CELL_TYPES.PATH:
        return styles.path;
      case CELL_TYPES.EXPLORED:
        return styles.explored;
      case CELL_TYPES.EMPTY:
      default:
        return styles.empty;
    }
  };

  return (
    <View
      style={[styles.cell, { width: size, height: size }, getCellStyle()]}
    />
  );
};

const MazeGrid = ({ maze, cellSize }) => {
  if (!maze || maze.length === 0) return null;

  return (
    <View style={styles.container}>
      {maze.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((cell, colIndex) => (
            <Cell key={`${rowIndex}-${colIndex}`} type={cell} size={cellSize} />
          ))}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "#000",
    alignSelf: "center",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    borderWidth: 0.5,
    borderColor: "#e0e0e0",
  },
  empty: {
    backgroundColor: "#ffffff",
  },
  wall: {
    backgroundColor: "#1a1a1a",
  },
  start: {
    backgroundColor: "#4CAF50",
  },
  end: {
    backgroundColor: "#f44336",
  },
  path: {
    backgroundColor: "#2196F3",
  },
  explored: {
    backgroundColor: "#FFE082",
  },
});

export default MazeGrid;
