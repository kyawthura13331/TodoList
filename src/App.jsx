import { useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [progress, setProgress] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [text, setText] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Add or Update Todo
  const handleAdd = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const now = new Date().toLocaleTimeString(); // hh:mm:ss format

    if (isEdit && editId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editId ? { ...todo, text } : todo
        )
      );
      clear();
    } else {
      setTodos((prev) => [
        ...prev,
        { id: Date.now().toString(), text, status: "todo", time: now },
      ]);
      clear();
    }
  };

  const clear = () => {
    setText("");
    setEditId(null);
    setIsEdit(false);
  };

  // Delete functions
  const deleteTodo = (id) => setTodos((prev) => prev.filter((t) => t.id !== id));
  const deleteProgress = (id) => setProgress((prev) => prev.filter((t) => t.id !== id));
  const deleteCompleted = (id) => setCompleted((prev) => prev.filter((t) => t.id !== id));

  // Move Todo → Progress
  const moveToProgress = (id) => {
    const item = todos.find((t) => t.id === id);
    if (item) {
      const now = new Date().toLocaleTimeString();
      setProgress([...progress, { ...item, status: "inprogress", time: now }]);
      deleteTodo(id);
    }
  };

  // Move Todo → Completed
  const moveToCompleted = (id, from) => {
    const source = from === "todo" ? todos : progress;
    const item = source.find((t) => t.id === id);
    if (item) {
      const now = new Date().toLocaleTimeString();
      setCompleted([...completed, { ...item, status: "completed", time: now }]);
      from === "todo" ? deleteTodo(id) : deleteProgress(id);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        🖤 Smart Dark Todo
      </h1>

      {/* Input Form */}
      <form
        onSubmit={handleAdd}
        className="flex justify-center gap-4 mb-8"
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
          placeholder="Enter your task..."
          className="w-[50%] p-3 rounded-xl border border-gray-700 bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-gray-500"
        />
        <button
          type="submit"
          className={`px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition ${
            isEdit
              ? "bg-yellow-600 hover:bg-yellow-700"
              : "bg-gray-700 hover:bg-gray-800"
          }`}
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </form>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To Do */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-white text-xl font-semibold mb-4">📝 To Do</h2>
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="flex flex-col bg-gray-700 p-3 rounded-lg mb-3 shadow-md hover:bg-gray-600 transition"
            >
              <span className="text-white font-medium">{todo.text}</span>
              <span className="text-gray-300 text-sm">{todo.time}</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => {
                    setIsEdit(true);
                    setEditId(todo.id);
                    setText(todo.text);
                  }}
                  className="px-2 py-1 bg-blue-700 hover:bg-blue-800 rounded text-white"
                >
                  Edit
                </button>
                <button
                  onClick={() => moveToProgress(todo.id)}
                  className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-white"
                >
                  ➡️
                </button>
                <button
                  onClick={() => moveToCompleted(todo.id, "todo")}
                  className="px-2 py-1 bg-green-700 hover:bg-green-800 rounded text-white"
                >
                  ✅
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="px-2 py-1 bg-red-700 hover:bg-red-800 rounded text-white"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* In Progress */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-white text-xl font-semibold mb-4">⚡ In Progress</h2>
          {progress.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-gray-700 p-3 rounded-lg mb-3 shadow-md hover:bg-gray-600 transition"
            >
              <span className="text-white font-medium">{item.text}</span>
              <span className="text-gray-300 text-sm">{item.time}</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => moveToCompleted(item.id, "progress")}
                  className="px-2 py-1 bg-green-700 hover:bg-green-800 rounded text-white"
                >
                  ✅
                </button>
                <button
                  onClick={() => deleteProgress(item.id)}
                  className="px-2 py-1 bg-red-700 hover:bg-red-800 rounded text-white"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Completed */}
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg">
          <h2 className="text-white text-xl font-semibold mb-4">🎉 Completed</h2>
          {completed.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-gray-700 p-3 rounded-lg mb-3 shadow-md hover:bg-gray-600 transition"
            >
              <span className="text-gray-300 font-medium line-through">{item.text}</span>
              <span className="text-gray-400 text-sm">{item.time}</span>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => deleteCompleted(item.id)}
                  className="px-2 py-1 bg-red-700 hover:bg-red-800 rounded text-white"
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
