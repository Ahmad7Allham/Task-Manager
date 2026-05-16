import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
function App() {
  // Todos state
  const [todos, setTodos] = useState([]);

  // Input state
  const [input, setInput] = useState("");

  // Dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Load saved todos and theme on first render
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    const savedTheme = localStorage.getItem("theme");

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }

    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Save todos whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // Add new task
  const handleAddTodo = () => {
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    toast.success("Task Added");

    setInput("");
  };

  // Toggle completed task
  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );

    setTodos(updatedTodos);
  };

  // Delete task
  const handleDeleteTodo = (id) => {
    const confirmDelete = window.confirm("Delete this task?");

    if (!confirmDelete) return;

    const updatedTodos = todos.filter((todo) => todo.id !== id);

    setTodos(updatedTodos);

    toast.success("Task Deleted 🗑️");
  };

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      p-4
      bg-gradient-to-br
      from-slate-100
      to-slate-200
      dark:from-slate-900
      dark:to-slate-800
      transition
    "
    >
      <Toaster />

      <div
        className="
        w-full
        max-w-md
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-xl
        p-6
        transition
      "
      >
        {/* Dark mode button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              px-4
              py-2
              rounded-xl
              bg-slate-700
              hover:bg-slate-800
              dark:bg-yellow-400
              dark:hover:bg-yellow-300
              dark:text-black
              transition
            "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        {/* Title */}
        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-slate-700
          dark:text-white
          mb-2
        "
        >
          To Do List
        </h1>

        {/* Tasks count */}
        <p
          className="
          text-center
          text-slate-500
          dark:text-slate-300
          mb-6
        "
        >
          You have {todos.length} tasks
        </p>

        {/* Input section */}
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={input}
            placeholder="Add a new task..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
            className="
              flex-1
              p-3
              rounded-xl
              border
              outline-none
              bg-white
              dark:bg-slate-700
              dark:text-white
              dark:border-slate-600
              focus:ring-2
              focus:ring-blue-400
              transition
            "
          />

          <button
            onClick={handleAddTodo}
            className="
              px-5
              rounded-xl
              bg-slate-700
              hover:bg-slate-800
              hover:dark:bg-slate-600
              text-white
              transition
              shadow
              hover:scale-105
              cursor-pointer
            "
          >
            Add
          </button>
        </div>

        {/* Todo list */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p
              className="
              text-center
              text-slate-500
              dark:text-slate-300
            "
            >
              Start adding your first task 🚀
            </p>
          ) : (
            todos.map((todo) => (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.25 }}
                key={todo.id}
                className="
                  flex
                  items-center
                  justify-between
                  p-4
                  rounded-xl
                  bg-white
                  dark:bg-slate-700
                  border
                  border-slate-200
                  dark:border-slate-600
                  shadow-sm
                  hover:bg-slate-50
                  dark:hover:bg-slate-600
                  transition
                "
              >
                <p
                  onClick={() => handleToggleTodo(todo.id)}
                  className={`
                    flex-1
                    cursor-pointer
                    transition
                    ${todo.completed
                      ? "line-through text-slate-400"
                      : "text-slate-700 dark:text-white"
                    }
                  `}
                >
                  {todo.text}
                </p>

                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="
                    ml-3
                    text-xl
                    hover:scale-110
                    transition
                  "
                >
                  ❌
                </button>
              </motion.div>
            ))
          )}
        </div>
        <p
          className="
text-center
text-xs
text-slate-400
dark:text-slate-500
mt-6
"
        >
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;