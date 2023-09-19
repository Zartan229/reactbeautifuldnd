import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

export default function KanbanBoard() {
  // État initial des tableaux (boards) avec leurs titres et tâches vides
  const [boards, setBoards] = useState({
    board1: { title: "À FAIRE", tasks: [] }, // Tableau "À FAIRE"
    board2: { title: "TERMINÉ", tasks: [] }, // Tableau "TERMINÉ"
    board3: { title: "BOB", tasks: [] },      // Tableau "BOB"
    // Ajoutez davantage de tableaux au besoin
  });

  // Utilisation de useEffect pour récupérer des données initiales depuis une API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => {
        // Transformation des données en tâches initiales avec des ID et du contenu
        const initialTasks = json.map((task) => ({
          id: task.id.toString(),
          content: task.title,
        }));

        // Mise à jour de l'état initial des tâches dans le tableau "À FAIRE"
        setBoards({
          ...boards,
          board1: { ...boards.board1, tasks: initialTasks },
        });
      });
  }, []);

  // Fonction pour gérer la fin du glisser-déposer des tâches
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Vérifie si la destination existe dans les tableaux (boards)
    if (!destination || !boards[destination.droppableId]) {
      return; // Le tableau de destination est manquant ou indéfini, ne rien faire
    }

    if (source.droppableId === destination.droppableId) return;

    const sourceBoard = boards[source.droppableId];
    const destinationBoard = boards[destination.droppableId];

    // Trouver la tâche à déplacer dans le tableau source
    const taskToMove = sourceBoard.tasks.find((task) => task.id === draggableId);

    // Mettre à jour les tâches du tableau source et du tableau de destination
    const updatedSourceTasks = sourceBoard.tasks.filter((task) => task.id !== draggableId);
    const updatedDestinationTasks = [...destinationBoard.tasks, taskToMove];

    // Mettre à jour les tableaux (boards) avec les nouvelles tâches
    setBoards({
      ...boards,
      [source.droppableId]: { ...sourceBoard, tasks: updatedSourceTasks },
      [destination.droppableId]: { ...destinationBoard, tasks: updatedDestinationTasks },
    });
  };

  // Fonction pour créer un nouveau tableau (board)
  const addNewBoard = () => {
    const newBoardId = `board${Object.keys(boards).length + 1}`;
    const newBoardTitle = `Tableau ${Object.keys(boards).length + 1}`;

    // Ajouter un nouveau tableau avec un titre vide et aucune tâche
    setBoards({
      ...boards,
      [newBoardId]: { title: newBoardTitle, tasks: [] },
    });
  };

  // Rendu de l'application avec les tableaux et le bouton pour ajouter un nouveau tableau
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: "center" }}>TABLEAU KANBAN</h2>
      <div>
        <button onClick={addNewBoard}>Ajouter un Nouveau Tableau</button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {Object.entries(boards).map(([boardId, board]) => (
          <Column key={boardId} title={board.title} tasks={board.tasks} id={boardId} />
        ))}
      </div>
    </DragDropContext>
  );
}
