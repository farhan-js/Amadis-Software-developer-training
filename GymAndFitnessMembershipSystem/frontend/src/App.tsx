import { Outlet } from "@tanstack/react-router";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Navigation */}
            <Navbar />

            {/* Page Content */}
            <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                <Outlet />
            </main>

        </div>
    );
}

export default App;