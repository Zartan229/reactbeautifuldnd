import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// Définition d'un composant Container avec des styles CSS
const Container = styled.div`
  border-radius: 10px; // Coins arrondis
  box-shadow: 5px 5px 5px 2px grey; // Ombre
  padding: 8px; // Espacement intérieur
  color: #000; // Couleur du texte
  margin-bottom: 8px; // Marge en bas
  min-height: 90px; // Hauteur minimale
  margin-left: 10px; // Marge à gauche
  margin-right: 10px; // Marge à droite
  background-color: ${(props) => bgcolorChange(props)}; // Couleur de fond déterminée dynamiquement
  cursor: pointer; // Curseur de type pointeur
  display: flex; // Affichage en tant que boîte flexible
  justify-content: space-between; // Espace entre les éléments internes
  flex-direction: column; // Disposition en colonne
`;

// Composant TextContent pour le contenu textuel
const TextContent = styled.div``;

// Composant Icons pour les icônes (non implémenté dans le code actuel)
const Icons = styled.div`
  display: flex;
  justify-content: end;
  padding: 2px;
`;

// Fonction pour déterminer la couleur de fond en fonction de l'état du glisser-déposer
function bgcolorChange(props) {
  return props.isDragging // Si l'élément est en cours de glisser-déposer
    ? "lightgreen" // Couleur de fond en vert clair
    : props.isDraggable // Si l'élément est déplaçable
    ? props.isBacklog // Si l'élément appartient à la file d'attente
      ? "#F2D7D5" // Couleur de fond pour la file d'attente
      : "#DCDCDC" // Couleur de fond par défaut
    : props.isBacklog // Si l'élément appartient à la file d'attente (non déplaçable)
    ? "#F2D7D5" // Couleur de fond pour la file d'attente
    : "#EAF4FC"; // Couleur de fond par défaut
}

// Composant Task représentant une tâche dans la colonne
export default function Task({ task, index }) {
  return (
    // Utilisation du composant Draggable pour permettre le glisser-déposer
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        // Conteneur de la tâche avec des attributs et des styles
        <Container
          {...provided.draggableProps} // Propriétés pour le glisser-déposer
          {...provided.dragHandleProps} // Propriétés pour la poignée de glisser-déposer
          ref={provided.innerRef} // Référence au conteneur interne
          isDragging={snapshot.isDragging} // Indicateur si l'élément est en cours de glisser-déposer
        >
          <div style={{ display: "flex", justifyContent: "start", padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {"  "}
              </small>
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "center", padding: 2 }}>
            <TextContent>{task.title}</TextContent> {/* Contenu textuel de la tâche */}
          </div>
          <Icons> {/* Section pour les icônes (non implémentée dans ce code) */}
          </Icons>
          {provided.placeholder} {/* Espace réservé pour les tâches en cours de déplacement */}
        </Container>
      )}
    </Draggable>
  );
}
