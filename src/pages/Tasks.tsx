import { useEffect, useState } from 'react'

type Task = {
    id: number
    text: string
    completed: boolean
}

function Tasks() {
    const [taskInput, setTaskInput] = useState('')

    const [tasks, setTasks] = useState<Task[]>(() => {
        try {
            const saved = localStorage.getItem('tasks')
            return saved ? JSON.parse(saved) : []
        } catch {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks))
    }, [tasks])

    function addTask() {
        if (!taskInput.trim()) return

        const newTask: Task = {
            id: Date.now(),
            text: taskInput.trim(),
            completed: false
        }

        setTasks((prev) => [...prev, newTask])
        setTaskInput('')
    }

    function toggleTask(id: number) {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        )
    }

    function deleteTask(id: number) {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    const completed = tasks.filter((task) => task.completed).length

    return (
        <div>
            <div className="heading">
                <div>
                    <h1>Mina uppgifter</h1>
                    <p>Håll koll på vad du behöver göra.</p>
                </div>

                <span className="counter">
                    {completed} av {tasks.length} färdiga
                </span>
            </div>

            <div className="panel">
                <h2>Skapa en uppgift</h2>
                <p>Vad behöver du göra?</p>

                <form
                    className="taskForm"
                    onSubmit={(e) => {
                        e.preventDefault()
                        addTask()
                    }}
                >
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        placeholder="Skriv en ny uppgift..."
                        maxLength={150}
                    />

                    <button className="btn" type="submit">
                        + Lägg till
                    </button>
                </form>
            </div>

            <div className="panel">
                <div className="panelTop">
                    <div>
                        <h2>Dina uppgifter</h2>
                        <p>Hantera dina uppgifter här.</p>
                    </div>

                    <span className="counter">{tasks.length} st</span>
                </div>

                {tasks.length === 0 ? (
                    <div className="empty">
                        <span>☑</span>
                        <h3>Inga uppgifter ännu</h3>
                        <p>Lägg till din första uppgift för att börja.</p>
                    </div>
                ) : (
                    <ul className="taskList">
                        {tasks.map((task) => (
                            <li
                                key={task.id}
                                className={`task ${task.completed ? 'done' : ''}`}
                            >
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => toggleTask(task.id)}
                                    />
                                    <span>{task.text}</span>
                                </label>

                                <button
                                    className="deleteBtn"
                                    onClick={() => deleteTask(task.id)}
                                    aria-label={`Ta bort ${task.text}`}
                                >
                                    Ta bort
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Tasks
