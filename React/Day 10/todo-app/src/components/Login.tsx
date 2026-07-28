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
        return isAuthorized ? navigate({ to: "/todo" }): <h1>UnAuthorized user</h1>;
    }

    return(
        <div className="center">        
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
            <table>
                <tr>
                    <td>
                        <label htmlFor="userName">Enter name: </label>
                    </td>
                    <td>
                        <input type="text" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} ></input>
                    </td>
                </tr>
                <tr>
                    <td>
                        <label htmlFor="password">Password: </label>
                    </td>
                    <td>
                              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="reset">Cancel</button>
                    </td>
                    <td>
                        <button type="submit">Login</button>
                    </td>
                </tr>
            </table>
        </form>
        </div>

    )

}

export default Login;