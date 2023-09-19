import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
  const [boards, setBoards] = useState({
    board1: { title: "TO DO", tasks: [] },
    board2: { title: "DONE", tasks: [] },
    board3: { title: "BOB", tasks: [] },
    // Add more boards as needed
  });

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        const initialTasks = json.map((task) => ({
          id: task.id.toString(),
          content: task.title,
        }));

        setBoards({
          ...boards,
          board1: { ...boards.board1, tasks: initialTasks },
        });
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    // Check if the destination exists in boards
    if (!destination || !boards[destination.droppableId]) {
      return; // Destination board is missing or undefined, do nothing
    }
    if (source.droppableId === destination.droppableId) return;

    const sourceBoard = boards[source.droppableId];
    const destinationBoard = boards[destination.droppableId];

    const taskToMove = sourceBoard.tasks.find((task) => task.id === draggableId);
    const updatedSourceTasks = sourceBoard.tasks.filter((task) => task.id !== draggableId);
    const updatedDestinationTasks = [...destinationBoard.tasks, taskToMove];

    setBoards({
      ...boards,
      [source.droppableId]: { ...sourceBoard, tasks: updatedSourceTasks },
      [destination.droppableId]: { ...destinationBoard, tasks: updatedDestinationTasks },
    });
  };

  // Function to create a new board
  const addNewBoard = () => {
    const newBoardId = `board${Object.keys(boards).length + 1}`;
    const newBoardTitle = `Board ${Object.keys(boards).length + 1}`;
    setBoards({
      ...boards,
      [newBoardId]: { title: newBoardTitle, tasks: [] },
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>KANBAN BOARD</h2>
      <div>
        <button onClick={addNewBoard}>Add New Board</button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Object.entries(boards).map(([boardId, board]) => (
          <Column key={boardId} title={board.title} tasks={board.tasks} id={boardId} />
        ))}
      </div>
    </DragDropContext>
  );
}
