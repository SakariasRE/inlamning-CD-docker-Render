import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import './App.css'

function App() {
    return (
        <BrowserRouter>
            <div className="app">
                <aside className="sidebar">
                    <div className="logo">
                        <span className="logoIcon">✓</span>
                        <span>Uppgifter</span>
                    </div>

                    <p className="menuTitle">MENY</p>

                    <nav className="menu">
                        <NavLink
                            to="/"
                            end
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            ◫ Översikt
                        </NavLink>

                        <NavLink
                            to="/tasks"
                            className={({ isActive }) =>
                                isActive ? 'active' : ''
                            }
                        >
                            ☑ Mina uppgifter
                        </NavLink>
                    </nav>

                    <div className="sidebarBottom">
                        <span className="dot" />
                        Systemet fungerar
                    </div>
                </aside>

                <main className="main">
                    <header className="topbar">
                        <span>Uppgifter</span>
                        <span>Mina uppgifter</span>
                    </header>

                    <div className="content">
                        <Routes>
                            <Route path="/" element={<Dashboard />} />
                            <Route path="/tasks" element={<Tasks />} />
                        </Routes>
                    </div>
                </main>
            </div>
        </BrowserRouter>
    )
}

export default App
