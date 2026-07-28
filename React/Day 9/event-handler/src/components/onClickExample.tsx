function EventExample(){
    function welcome(){
        alert(`Welcome`);
    }
    return(
        <div>
        <button onClick={welcome()}>HTML rendering</button>
        <button onClick={welcome}>React rendering</button>
        </div>
    );
}
export default EventExample;