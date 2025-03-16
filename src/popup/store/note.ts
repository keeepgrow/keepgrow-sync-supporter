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

export const Note = {
  get: getNote,
  set: setNote,
  delete: deleteNote
};
