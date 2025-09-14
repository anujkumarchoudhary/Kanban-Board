"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Heading from "./components/Heading";
import TaskFrom from "./components/TaskFrom";
import { useDispatch } from "react-redux";
import { getAllTask, updateTask } from "./redux/slice/tasksSlice";
import { toast } from "react-toastify";

export default function TodoBoard() {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [columns, setColumns] = useState([]);
  const [open, setOpen] = useState(false);
  const updateTaskAPI = async (taskId, newStatus) => {
    const body = {
      status: newStatus,
    };
    try {
      const res = await dispatch(updateTask({ id: taskId, body }));
      if (res?.payload?.status === 200) {
        toast.success(res?.payload?.message);
        refresh();
      } else {
        toast.error(res?.payload?.message);
      }
    } catch (error) {
      console.error("API update failed:", error);
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // moving tasks
    const sourceCol = Array.from(columns[source.droppableId]);
    const [movedTask] = sourceCol.splice(source.index, 1);

    const destCol = Array.from(columns[destination.droppableId]);
    destCol.splice(destination.index, 0, movedTask);

    const newColumns = {
      ...columns,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    };

    setColumns(newColumns);

    // 🚀 Call API with new status
    updateTaskAPI(movedTask.id, destination.droppableId);
  };

  const getAllTasks = async () => {
    try {
      const res = await dispatch(getAllTask());
      if (res?.payload?.data) {
        setColumns(res?.payload?.data);
      }
    } catch (err) {
      console.log("error", "err");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [refresh]);

  return (
    <div className="p-10">
      <Heading handleClick={() => setOpen(!open)} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="block md:flex gap-4 my-4">
          {Object.entries(columns).map(([colId, tasks]) => (
            <Droppable key={colId} droppableId={colId}>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className={`flex-1 p-4 rounded-lg min-h-[300px] my-4 ${
                    snapshot.isDraggingOver ? "bg-blue-100" : "bg-gray-100"
                  }`}
                >
                  <h2 className="font-bold mb-2 capitalize">{colId}</h2>
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-2 mb-2 rounded shadow cursor-pointer ${
                            snapshot.isDragging ? "bg-blue-300" : "bg-white"
                          }`}
                        >
                          {task.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {open && (
        <TaskFrom
          refresh={() => setRefresh(!refresh)}
          handleClose={() => setOpen(false)}
        />
      )}
    </div>
  );
}
