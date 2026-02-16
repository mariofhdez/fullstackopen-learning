import NoteForm from "./components/noteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

const App = () => {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App