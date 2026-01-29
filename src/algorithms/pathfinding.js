import { CELL_TYPES, getNeighbors } from '../utils/mazeUtils';

/**
 * Breadth-First Search (BFS) - Finds shortest path
 */
export const solveBFS = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;
  
  const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
  const parent = Array(rows).fill(null).map(() => Array(cols).fill(null));
  
  const queue = [[start.row, start.col]];
  visited[start.row][start.col] = true;
  
  const steps = [];
  
  while (queue.length > 0) {
    const [row, col] = queue.shift();
    
    // Mark as explored
    if (maze[row][col] !== CELL_TYPES.START && maze[row][col] !== CELL_TYPES.END) {
      steps.push({ row, col, type: 'explore' });
    }
    
    // Check if we reached the end
    if (row === end.row && col === end.col) {
      // Reconstruct path
      const path = [];
      let current = end;
      
      while (current && !(current.row === start.row && current.col === start.col)) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }
      
      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: 'path' });
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
  
  // No path found - still animate explored cells
  for (const step of steps) {
    await updateCallback(step);
  }
  
  return { found: false, steps: steps.length };
};

/**
 * Depth-First Search (DFS) - May not find shortest path
 */
export const solveDFS = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;
  
  const visited = Array(rows).fill(null).map(() => Array(cols).fill(false));
  const parent = Array(rows).fill(null).map(() => Array(cols).fill(null));
  
  const stack = [[start.row, start.col]];
  visited[start.row][start.col] = true;
  
  const steps = [];
  let found = false;
  
  while (stack.length > 0) {
    const [row, col] = stack.pop();
    
    // Mark as explored
    if (maze[row][col] !== CELL_TYPES.START && maze[row][col] !== CELL_TYPES.END) {
      steps.push({ row, col, type: 'explore' });
    }
    
    // Check if we reached the end
    if (row === end.row && col === end.col) {
      found = true;
      
      // Reconstruct path
      const path = [];
      let current = end;
      
      while (current && !(current.row === start.row && current.col === start.col)) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }
      
      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: 'path' });
      }
      
      break;
    }
    
    // Explore neighbors (in reverse to maintain similar order)
    const neighbors = getNeighbors(maze, row, col).reverse();
    for (const neighbor of neighbors) {
      if (!visited[neighbor.row][neighbor.col]) {
        visited[neighbor.row][neighbor.col] = true;
        parent[neighbor.row][neighbor.col] = { row, col };
        stack.push([neighbor.row, neighbor.col]);
      }
    }
  }
  
  // Execute animation
  for (const step of steps) {
    await updateCallback(step);
  }
  
  return { found, steps: steps.length };
};

/**
 * A* Algorithm - Finds shortest path with heuristic
 */
export const solveAStar = async (maze, start, end, updateCallback) => {
  const rows = maze.length;
  const cols = maze[0].length;
  
  // Manhattan distance heuristic
  const heuristic = (row, col) => {
    return Math.abs(row - end.row) + Math.abs(col - end.col);
  };
  
  const gScore = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
  const fScore = Array(rows).fill(null).map(() => Array(cols).fill(Infinity));
  const parent = Array(rows).fill(null).map(() => Array(cols).fill(null));
  
  gScore[start.row][start.col] = 0;
  fScore[start.row][start.col] = heuristic(start.row, start.col);
  
  const openSet = [[start.row, start.col]];
  const closedSet = new Set();
  
  const steps = [];
  
  while (openSet.length > 0) {
    // Find node with lowest fScore
    let currentIndex = 0;
    for (let i = 1; i < openSet.length; i++) {
      const [row, col] = openSet[i];
      const [currentRow, currentCol] = openSet[currentIndex];
      if (fScore[row][col] < fScore[currentRow][currentCol]) {
        currentIndex = i;
      }
    }
    
    const [row, col] = openSet.splice(currentIndex, 1)[0];
    closedSet.add(`${row},${col}`);
    
    // Mark as explored
    if (maze[row][col] !== CELL_TYPES.START && maze[row][col] !== CELL_TYPES.END) {
      steps.push({ row, col, type: 'explore' });
    }
    
    // Check if we reached the end
    if (row === end.row && col === end.col) {
      // Reconstruct path
      const path = [];
      let current = end;
      
      while (current && !(current.row === start.row && current.col === start.col)) {
        if (maze[current.row][current.col] !== CELL_TYPES.END) {
          path.unshift(current);
        }
        current = parent[current.row][current.col];
      }
      
      // Add path steps
      for (const cell of path) {
        steps.push({ row: cell.row, col: cell.col, type: 'path' });
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
      if (closedSet.has(`${neighbor.row},${neighbor.col}`)) continue;
      
      const tentativeGScore = gScore[row][col] + 1;
      
      if (tentativeGScore < gScore[neighbor.row][neighbor.col]) {
        parent[neighbor.row][neighbor.col] = { row, col };
        gScore[neighbor.row][neighbor.col] = tentativeGScore;
        fScore[neighbor.row][neighbor.col] = tentativeGScore + heuristic(neighbor.row, neighbor.col);
        
        if (!openSet.some(([r, c]) => r === neighbor.row && c === neighbor.col)) {
          openSet.push([neighbor.row, neighbor.col]);
        }
      }
    }
  }
  
  // No path found - still animate explored cells
  for (const step of steps) {
    await updateCallback(step);
  }
  
  return { found: false, steps: steps.length };
};
