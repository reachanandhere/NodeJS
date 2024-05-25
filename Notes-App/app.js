const yargs = require('yargs')
const notes = require('./notes.js')

// add, remove, read, list all

// Create add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.addNote(argv.title, argv.body)
    }
})


// Create Remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
        notes.removeNode(argv.title)
    }
})

// Listing all notes
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler: ()=>{
        notes.listNotes()
    }
})

// Reading a note
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv)=>{
       notes.getNote(argv.title)
    }
})
 yargs.parse()
