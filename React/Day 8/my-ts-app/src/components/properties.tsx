function Student(props: any){
    return (
        <h1>Hello ,{props.name}</h1>
    );
} 

function Details(props: any){
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.city}</p>
        </div>
    );
}
function Properties(props:any){
    return (
        <div>
            <Student name={props.name}/>
            <Details name={props.name} city={props.city}/>

        </div>
    );

}
export default Properties;