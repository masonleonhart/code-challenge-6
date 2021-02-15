import React, { Component } from 'react';
import { useDispatch } from 'react-redux';

// DO NOT MODIFY THIS FILE FOR BASE MODE!
function AnimalListItem({ classData }) {
  // Renders the list of animals
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch({ type: 'DELETE_ANIMAL', payload: classData.id });
  };

  return (
    <tr>
      <td>{classData.species_name}</td>
      <td>{classData.class_name}</td>
      <td><button onClick={handleClick}>Transfer Animal</button></td>
    </tr>
  );
}

export default AnimalListItem;
