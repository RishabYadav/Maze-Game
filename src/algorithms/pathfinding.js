import { CELL_TYPES, getNeighbors } from "../utils/mazeUtils";

/**
 * Breadth-First Search (BFS) - Finds shortest path
 */
export const solveBFS = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const visited = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  const parent = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  const queue = [[start.row, start.col]];
  visited[start.row][start.col] = true;

  const steps = [];

  while (queue.length > 0) {
    const [row, col] = queue.shift();

    // Check if we reached the end
    if (row === end.row && col === end.col) {
      // Reconstruct path
      const path = [];
      let current = end;

      while (
        current &&
        !(current.row === start.row && current.col === start.col)
      ) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }

      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: "path" });
      }

      // Execute animation
      for (const step of steps) {
        await updateCallback(step);
      }

      return { found: true, steps: steps.length };
    }

    // Explore neighbors
    const neighbors = getNeighbors(maze, row, col);
    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        parent[neighbor.row][neighbor.col] = { row, col };
        queue.push([neighbor.row, neighbor.col]);
      }
    }
  }

  // No path found
  return { found: false, steps: steps.length };
};

/**
 * Depth-First Search (DFS)
 */
export const solveDFS = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const visited = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  const parent = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));

  const stack = [[start.row, start.col]];
  visited[start.row][start.col] = true;

  const steps = [];
  let found = false;

  while (stack.length > 0) {
    const [row, col] = stack.pop();

    // Check if we reached the end
    if (row === end.row && col === end.col) {
      found = true;
      // Reconstruct path
      const path = [];
      let current = end;

      while (
        current &&
        !(current.row === start.row && current.col === start.col)
      ) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }

      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: "path" });
      }

      // Execute animation
      for (const step of steps) {
        await updateCallback(step);
      }

      return { found: true, steps: steps.length };
    }

    // Explore neighbors
    const neighbors = getNeighbors(maze, row, col);
    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        parent[neighbor.row][neighbor.col] = { row, col };
        stack.push([neighbor.row, neighbor.col]);
      }
    }
  }

  // No path found
  return { found: false, steps: steps.length };
};

/**
 * A* Search - Uses heuristic to find optimal path
 */
export const solveAStar = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;

  const visited = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(false));
  const parent = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));
  const gScore = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(Infinity));
  const fScore = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(Infinity));

  // Heuristic: Manhattan distance
  const heuristic = (row, col) => {
    return Math.abs(row - end.row) + Math.abs(col - end.col);
  };

  const openSet = [[start.row, start.col, 0]]; // [row, col, fScore]
  gScore[start.row][start.col] = 0;
  fScore[start.row][start.col] = heuristic(start.row, start.col);

  const steps = [];

  while (openSet.length > 0) {
    // Find node with lowest fScore
    openSet.sort((a, b) => a[2] - b[2]);
    const [row, col] = openSet.shift();

    if (visited[row][col]) continue;
    visited[row][col] = true;

    // Check if we reached the end
    if (row === end.row && col === end.col) {
      // Reconstruct path
      const path = [];
      let current = end;

      while (
        current &&
        !(current.row === start.row && current.col === start.col)
      ) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }

      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: "path" });
      }

      // Execute animation
      for (const step of steps) {
        await updateCallback(step);
      }

      return { found: true, steps: steps.length };
    }

    // Explore neighbors
    const neighbors = getNeighbors(maze, row, col);
    for (const neighbor of neighbors) {
      const tentativeGScore = gScore[row][col] + 1;

      if (tentativeGScore < gScore[neighbor.row][neighbor.col]) {
        parent[neighbor.row][neighbor.col] = { row, col };
        gScore[neighbor.row][neighbor.col] = tentativeGScore;
        fScore[neighbor.row][neighbor.col] =
          tentativeGScore + heuristic(neighbor.row, neighbor.col);

        if (!visited[neighbor.row][neighbor.col]) {
          openSet.push([
            neighbor.row,
            neighbor.col,
            fScore[neighbor.row][neighbor.col],
          ]);
        }
      }
    }
  }

  // No path found
  return { found: false, steps: steps.length };
};
