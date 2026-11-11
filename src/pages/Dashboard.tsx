import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Task = {
    id: number
    text: string
    completed: boolean
}

function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        try {
            const saved = localStorage.getItem('tasks')
            setTasks(saved ? JSON.parse(saved) : [])
        } catch {
            setTasks([])
        }
    }, [])

    const total = tasks.length
    const completed = tasks.filter((task) => task.completed).length
    const remaining = total - completed
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100)

    return (
        <div>
            <div className="heading">
                <div>
                    <h1>Dashboard</h1>
                    <p>Här får du en överblick över dina uppgifter.</p>
                </div>

                <Link to="/tasks" className="btn">
                    + Ny uppgift
                </Link>
            </div>

            <div className="stats">
                <div className="card">
                    <p>Totalt antal uppgifter</p>
                    <h2>{total}</h2>
                    <span>Alla dina uppgifter</span>
                </div>

                <div className="card">
                    <p>Färdiga uppgifter</p>
                    <h2 className="green">{completed}</h2>
                    <span>Uppgifter du har slutfört</span>
                </div>

                <div className="card">
                    <p>Återstående uppgifter</p>
                    <h2 className="blue">{remaining}</h2>
                    <span>Uppgifter som återstår</span>
                </div>
            </div>

            <div className="panel">
                <div className="panelTop">
                    <div>
                        <h2>Dina framsteg</h2>
                        <p>Se hur långt du har kommit.</p>
                    </div>
                    <strong className="blue">{progress}%</strong>
                </div>

                <div className="progress">
                    <div
                        className="progressBar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="progressText">
                    {completed} av {total} uppgifter färdiga
                </p>
            </div>

            <div className="panel">
                <h2>Snabbåtkomst</h2>
                <p>Fortsätt där du slutade.</p>

                <Link to="/tasks" className="quickLink">
                    <div>
                        <strong>Hantera dina uppgifter</strong>
                        <p>Skapa, slutför och ta bort uppgifter.</p>
                    </div>
                    <span>→</span>
                </Link>
            </div>
        </div>
    )
}

export default Dashboard
