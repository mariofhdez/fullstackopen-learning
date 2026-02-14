import { useSelector, useDispatch } from "react-redux";
import { createNote, toggleImportanceOf } from "./reducers/noteReducer";

// store.dispatch(createNote('the app state is in redux store'))
// store.dispatch(createNote('state changes are made with actions'))
export const App = () => {

  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  const addNote = (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    dispatch(createNote(content));
  };

  const toggleImportance = (id) => {
    dispatch(toggleImportanceOf(id));
  };

  return (
    <div>
      <form onSubmit={addNote}>
        <input type="text" name="note" />
        <button type="submit">add</button>
      </form>
      <ul>
        {notes.getState().map(note => (
          <li
            key={note.id}
            onClick={() => toggleImportance(note.id)}
          >
            {note.content} <strong>{note.important ? 'important' : ''}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};
