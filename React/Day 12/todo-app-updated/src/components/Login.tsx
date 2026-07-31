import '../index.css';
import { useNavigate } from "@tanstack/react-router";
import {useState} from "react";
function Login(){
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const navigate=useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };


     const isAuthorized = userName === 'Farhan' && password == "123456";
     if (isSubmitted) {
        return isAuthorized ? navigate({ to: "/todo" }): <h1 className="text-center text-red-600 text-3xl mt-10">UnAuthorized user</h1>;
    }

    return(
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-[400px]">      
                <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Login Page</h1>
        <form onSubmit={handleSubmit}>
            <table className="w-full">
                <tr>
                    <td className="py-3 font-semibold">
                        <label htmlFor="userName">Enter name: </label>
                    </td>
                    <td className="py-3">
                        <input  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} ></input>
                    </td>
                </tr>
                <tr>
                    <td className="py-3 font-semibold">
                        <label htmlFor="password">Password: </label>
                    </td>
                    <td className="py-3">
                              <input className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-400" type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td className="pt-6">
                        <button className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg" type="reset">Cancel</button>
                    </td>
                    <td className="pt-6 text-right">
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg" type="submit">Login</button>
                    </td>
                </tr>
            </table>
        </form>
        </div>
        </div>

    )

}

export default Login;