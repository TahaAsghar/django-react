import {useState,useEffect} from "react";
import api from "../api.js";
import Note from "../components/Note.jsx";
import "../styles/Home.css"

function Home(){

    const [notes, setNotes] = useState([])
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(
        () => {
            getNote();
        }, []
    )

    const getNote = () => {
        api.get("/api/notes/").then((res) => res.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((error) => alert(error))
    };

    const deleteNote = (id) => {
        api.delete(`api/notes/delete/${id}/`)
            .then((res) => {
                if(res.status===204) alert("Note deleted")
                else alert("Failed to delete")
                getNote()
            }).catch((error) => alert(error))
        getNote()
    };

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {content,title})
            .then((res) => {
                if(res.status===201) alert("note create")
                else alert("Failed to create Note")
                getNote()
            }).catch((error) => alert(error))
    }

    return <div>
        <div>
        <h2>Notes</h2>
            {notes.map((note) => (
                <Note note={note} onDelete={deleteNote} key = {note.id}/>
                ))}
            </div>
        <h2>Create a Note</h2>

        <form onSubmit={createNote}>
            <label htmlFor="title">Title: </label>
            <br/>
            <input type="text" id="title" name="title"
                   required onChange={(e) => setTitle(e.target.value)}
                    value={title}
            />

            <label htmlFor="content">Content: </label>
            <br/>
            <textarea
            id="content"
            name="content"
            value={content}
            required onChange={(e) => setContent(e.target.value)}
            >
            </textarea>
            <br/>
            <input type="submit" value="Submit"/>
        </form>

    </div>
}

export default Home