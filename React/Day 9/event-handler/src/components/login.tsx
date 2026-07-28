import {useState} from 'react';
import Welcome from "./welcome";
import UnAuthorized from "./unauthorizedUser";
import EventExample from "./onClickExample";
function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');


  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };


  const isAuthorized = userName === 'Farhan' && password == "123456";


  if (isSubmitted) {
    return isAuthorized ? <Welcome name={userName} /> : <UnAuthorized />;
  }

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="userName">Enter name: </label>
      <input
        type="text"
        id="userName"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      
      <button type="submit">Login</button>
    </form>
    <EventExample/>
    </div>
  );
}

export default Login;