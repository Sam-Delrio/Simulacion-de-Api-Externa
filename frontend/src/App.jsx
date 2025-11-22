import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { TasksProvider } from "./context/TasksContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import EditTask from "./components/EditTask";

export default function App() {
  return (
    <TasksProvider>
      <Router>
        <div className="app-container">
          
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <h1>Lista de Tareas</h1>
                  <TaskForm />
                  <TaskList />
                </>
              }
            />
            <Route path="/edit/:id" element={<EditTask />} />
          </Routes>
          <footer
            style={{
              marginTop: "40px",
              textAlign: "center",
              padding: "20px 0",
              borderTop: "1px solid #ddd",
              color: "#555",
              fontSize: "14px",
            }}
          ><strong>Samuel Andrés Del Río Omez</strong> — Uniminuto{" "}
            {new Date().getFullYear()}
          </footer>
        </div>
      </Router>
    </TasksProvider>
  );
}
