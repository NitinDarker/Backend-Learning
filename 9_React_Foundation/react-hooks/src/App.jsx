import { useEffect, useState } from "react";
// import './App.css'

function App() {
    const [person, addPerson] = useState([]);

    function updatePerson() {
        console.log("hi")
    }

    useEffect(() => {
        fetch("https://fakerapi.it/api/v1/persons")
            .then (async function (res) {
                const json = await res.json();
                addPerson(json.data)
            })
    }, [])

    return (
        <>
        <button onClick={updatePerson}>Add person</button>
        <div>
            {person.map((p) => <PersonCont key={p.id} firstname={p.firstname} email={p.email}></PersonCont>)}
        </div>
        </>
    )
    
    function PersonCont({firstname, email}) {
        return (<>
            <div>{firstname}</div>
            <div>{email}</div>
        </>
        );
    }
}


export default App;