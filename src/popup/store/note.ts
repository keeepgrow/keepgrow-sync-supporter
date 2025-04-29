import { Storage } from "../utils/ChromeApi";

const NOTE_KEY = "kgNote";

const getNote = async () => {
  try {
    const data = await Storage.GET(NOTE_KEY);
    return data;
  } catch (e) {
    return "";
  }
};
const setNote = (value: string) => Storage.SET(NOTE_KEY, value);

const deleteNote = () => Storage.DELETE(NOTE_KEY);

const addNote = async (value: string) => {
  const note = await Note.get();
  if (note) {
    setNote(note + "\n" + value);
  } else {
    setNote(value);
  }
};

export const Note = {
  get: getNote,
  set: setNote,
  delete: deleteNote,
  add: addNote
};
