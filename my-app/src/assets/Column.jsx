import React from "react";
import styled from "styled-components";
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

// Définition d'un composant Container avec des styles CSS
const Container = styled.div`
  background-color: #f4f5f7;
  border-radius: 2.5px;
  width: 300px; 
  height: 475px;
  overflow-y: scroll;
  -ms-overflow-style: none; 
  scrollbar-width: none; 
  border: 1px solid gray; 
`;

// Définition d'un composant Title avec des styles CSS
const Title = styled.h3`
  padding: 8px;
  background-color: pink;
  text-align: center;
`;

// Définition d'un composant TaskList avec des styles CSS
const TaskList = styled.div`
  padding: 3px;
  transition: background-color 0.2s ease; 
  background-color: #f4f5f7; 
  flex-grow: 1;
  min-height: 100px;
`;

// Composant Column qui affiche une colonne de tâches
export default function Column({ title, tasks, id }) {
  return (
    <Container className="column">
      {/* Composant Title pour le titre de la colonne */}
      <Title
        style={{
          backgroundColor: "lightblue", 
          position: "sticky", 
        }}
      >
        {title}
      </Title>
      {/* Composant Droppable pour permettre le glisser-déposer de tâches */}
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {/* Mapping des tâches pour les afficher dans la colonne */}
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder} {/* Espace réservé pour les tâches en cours de déplacement */}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}
