
const data=async ()=>{
    let url="http://localhost:3000/"
    const response = await fetch(url);
    const json = await response.json();
    return (
        <div>
        {json.name}
        </div>
        );
        
}

 export default data