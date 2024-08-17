// noteService.js

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Function to get all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(`${API_URL}/notes`);
    return response.data;
  } catch (error) {
    console.error('Error getting notes:', error);
    throw error;
  }
};

// Function to create a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(`${API_URL}/notes`, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Function to update a note
export const updateNote = async (noteId, updatedNote) => {
  try {
    const response = await axios.put(`${API_URL}/notes/${noteId}`, updatedNote);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Function to delete a note
export const deleteNote = async (noteId) => {
  try {
    const response = await axios.delete(`${API_URL}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};