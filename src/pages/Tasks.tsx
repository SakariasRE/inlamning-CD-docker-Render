import { useState } from 'react';

function Tasks() {
    const [taskInput, setTaskInput] = useState('');
    const [tasks, setTasks] = useState<string[]>([]);
    return (
        <div>
            <h1>Dina Uppgifter</h1>
            <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Lägg till en uppgift"
            />
            <button
            onClick={() => {
                if (taskInput.trim() !== '') {
                    setTasks([...tasks, taskInput]);
                    setTaskInput('');
                }
            }}>
            Lägg till uppgift
            </button>
            <p>Se dina uppgifter här.</p>
        </div>
    );
}

export default Tasks;
