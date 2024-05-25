const fs = require("fs");

const addNote = (title, body) => {
  const notes = laodNotes();

  const duplicateNote = notes.filter((n) => n.title === title);

  if(duplicateNote.length==0){
    notes.push({
        title: title,
        body: body,
      });
    
      saveNotes(notes);
  } else {
    console.log("Note Title already exists!")
  }
  
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const getNote = title => {
    const notes = laodNotes()
    console.log(notes.find(n=>n.title==title))
}

const listNotes = () => {
    console.log('Your Notes:')
    const notes = laodNotes();

    notes.forEach(n=>{
        console.log(n.title+"--"+n.body)
    })

};

const laodNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const removeNote = (title)=>{
    const notes = laodNotes();
    const note = notes.findIndex((n) => n.title === title);

    if(note!=-1){
        notes.splice(note, 1)
        saveNotes(notes);
    } else {
        console.log("Note does not exist!")
    }

}

module.exports = {
  listNotes: listNotes,
  addNote: addNote,
  removeNode: removeNote,
  getNote: getNote
};
