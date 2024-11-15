import { useEffect, useRef, useState } from "react";
import todoDataSource from "./orm/datasources/todoDataSource";
import { Todo } from "./orm/entities/todo";

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const ref = useRef<HTMLInputElement | null>(null);

  const connection = todoDataSource.dataSource;

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const todos = await connection.manager
      .createQueryBuilder(Todo, "note")
      .getMany();
    setTodos(todos);
  };

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(Todo)
        .values([{ completed: false, title: newTodo }])
        .execute();

      setNewTodo("");
      fetchTodos();
    }
  };

  const updateTodo = async ({ id, completed, title }: Todo) => {
    await connection
      .createQueryBuilder()
      .update(Todo)
      .set({
        title,
        completed,
      })
      .where("id = :id", { id })
      .execute();
    fetchTodos();
  };

  const removeTodo = async (id: number) => {
    try {
      const deleted = await connection.getRepository(Todo).delete(id);
      if (deleted.affected === 0) {
        throw new Error(`Failed to delete the Note bearing id ${id}`);
      }
      fetchTodos();
    } catch (error: any) {
      alert(error.message || "Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center font-sans flex-1 overflow-y-auto p-4">
      <div className="bg-white rounded shadow w-full max-w-lg max-sm:h-full flex flex-col p-4">
        {/* title */}
        <div className="mb-4 h-16">
          <h1 className="flex flex-row justify-center items-center text-teal-900 text-center text-xl font-semibold">
            <span className="sr-only">Buddy</span>
            <svg
              width={24}
              height={24}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
              className="fill-current mr-1"
            >
              <path d="M 36.26 3.193 L 48.254 6.4 C 50.913 7.107 52.766 9.512 52.769 12.263 L 52.769 33.341 C 52.766 39.405 49.753 45.073 44.727 48.466 L 31.9 57.103 C 30.883 57.791 29.55 57.799 28.523 57.122 L 15.408 48.454 C 10.3 45.082 7.229 39.368 7.231 33.247 L 7.231 12.263 C 7.236 9.512 9.087 7.109 11.743 6.4 L 23.737 3.193 C 25.779 2.652 27.885 2.376 29.999 2.376 C 32.112 2.376 34.218 2.65 36.26 3.193 Z M 25.891 8.54 C 24.016 8.54 21.047 6.835 20.265 8.54 C 18.655 12.052 20.473 16.266 20.577 20.128 C 20.737 26.089 20.871 32.061 20.577 38.017 C 20.473 40.117 18.968 42.662 20.265 44.317 C 21.418 45.787 23.988 44.634 25.853 44.745 C 32.063 45.114 39.779 44.58 43.054 38.218 C 44.538 35.336 44.451 31.25 42.38 28.606 C 41.137 27.019 37.719 27.264 37.325 25.288 C 36.999 23.658 40.215 23.414 41.058 21.982 C 42.404 19.696 42.782 15.942 41.576 13.433 C 38.801 7.66 27.767 8.54 25.891 8.54 Z M 35.821 30.214 C 38.043 32.029 37.894 36.303 35.847 38.172 C 34.593 39.318 33.185 39.444 31.569 39.547 C 31.12 39.575 27.003 39.363 26.954 39.287 C 26.192 38.101 26.834 36.47 26.773 35.062 C 26.712 33.653 26.634 32.245 26.592 30.836 C 26.572 30.196 26.06 29.18 26.643 28.917 C 27.654 28.461 34.292 28.964 35.821 30.214 Z M 34.123 14.93 C 36.319 16.63 35.97 20.68 34.213 22.462 C 33.013 23.68 31.79 23.744 30.169 23.888 C 29.61 23.937 29.046 23.888 28.484 23.888 C 27.922 23.888 26.961 24.425 26.799 23.888 C 26.31 22.274 26.902 20.517 26.954 18.832 C 27.006 17.147 26.652 15.399 27.11 13.777 C 27.225 13.369 27.957 13.777 28.38 13.777 C 28.804 13.777 29.236 13.693 29.651 13.777 C 31.16 14.08 32.905 13.988 34.123 14.93 Z"></path>
            </svg>{" "}
            Todo1
          </h1>
          <hr className="my-2 mx-[10%]" />
        </div>

        {/* List */}
        <div className="grow overflow-y-auto h-max scrollbar-thumb-teal-400 scrollbar-track-gray-50 scrollbar-thin pr-2">
          {todos.map((todo) => (
            <div className="flex mb-4 items-center text-base" key={todo.id}>
              <p className="w-full text-gray-900">
                {todo.completed ? (
                  <>👍</>
                ) : (
                  <span className="w-4 inline-block" />
                )}{" "}
                {todo.title}
              </p>
              <button
                title={todo.completed ? "Undone" : "Done"}
                className={`flex-no-shrink min-w-10 px-3 py-1 ml-4 mr-2 border  border-b-4 rounded-md ${
                  todo.completed
                    ? "bg-red-100 border-red-200 hover:bg-red-200 border-b-red-500 "
                    : "bg-green-100 border-green-200 hover:bg-green-200 border-b-green-500 "
                }`}
                onClick={() =>
                  updateTodo({ ...todo, completed: !todo.completed })
                }
              >
                {!todo.completed ? <>✔</> : <>✘</>}
              </button>
              <button
                className="flex-no-shrink align-middle px-3 py-1 border border-b-4 border-b-red-500 rounded-md bg-red-50 border-red-100 hover:bg-red-100"
                onClick={() => removeTodo(todo.id)}
              >
                🗑
              </button>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex mt-8">
          <input
            className="shadow appearance-none border rounded-md w-full py-2 px-3 mr-4 text-gray-600"
            placeholder="Add Todo"
            value={newTodo}
            ref={ref}
            onChange={() => ref.current?.value && setNewTodo(ref.current.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleAddTodo();
              }
            }}
          />
          <button
            title="add todo"
            className="grow px-3 py-1 border border-b-4 border-b-teal-700 rounded-md border-teal-100 bg-teal-50 hover:bg-teal-100"
            onClick={handleAddTodo}
          >
            ➕
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;