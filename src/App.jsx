import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  const saveToLocalStorage = (updatedTodos) => {
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleShowFinished = () => setShowFinished(!showFinished);

  const handleEdit = (id) => {
    const selectedTodo = todos.find((t) => t.id === id);
    setTodo(selectedTodo.todo);
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((t) => t.id !== id);
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  const handleAdd = () => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    setTodo('');
    saveToLocalStorage(updatedTodos);
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleToggleComplete = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    saveToLocalStorage(updatedTodos);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-blue-100">
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-extrabold text-center text-indigo-800 mb-8">
          TaskFlow - Organize Efficiently
        </h1>

        <section className="bg-white shadow-xl rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-xl font-semibold text-gray-700">
              New Task
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={todo}
                onChange={handleChange}
                placeholder="What's on your mind?"
                className="flex-grow p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                Add
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="showFinished"
              checked={showFinished}
              onChange={toggleShowFinished}
              className="accent-indigo-600"
            />
            <label htmlFor="showFinished" className="text-gray-700">
              Show Completed Tasks
            </label>
          </div>

          <div className="divide-y divide-gray-200">
            {todos.length === 0 ? (
              <p className="text-center text-gray-500 py-4">No tasks added yet.</p>
            ) : (
              todos.map((task) =>
                showFinished || !task.isCompleted ? (
                  <div
                    key={task.id}
                    className="flex justify-between items-center py-3"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={task.isCompleted}
                        onChange={() => handleToggleComplete(task.id)}
                        className="accent-indigo-600"
                      />
                      <span
                        className={`text-lg ${
                          task.isCompleted ? 'line-through text-gray-500' : ''
                        }`}
                      >
                        {task.todo}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(task.id)}
                        className="p-2 rounded-full bg-yellow-400 text-white hover:bg-yellow-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </div>
                ) : null
              )
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
