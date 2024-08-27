const noteArea = document.getElementById('note');
        const newNoteBtn = document.getElementById('new-note');
        const deleteNoteBtn = document.getElementById('delete-note');
        const noteSelect = document.getElementById('note-select');

        // Função para gerar um ID único
        function generateNoteId() {
            return `note-${Date.now()}`;
        }

        // Carregar lista de notas
        function loadNoteList() {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            noteSelect.innerHTML = '';
            notes.forEach(note => {
                const option = document.createElement('option');
                option.value = note.id;
                option.textContent = note.title || 'Nota sem título';
                noteSelect.appendChild(option);
            });
        }

        // Carregar uma nota específica
        function loadNote(noteId) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const note = notes.find(note => note.id === noteId);
            if (note) {
                noteArea.value = note.content;
                noteSelect.value = note.id;
            } else {
                noteArea.value = '';
            }
        }

        // Salvar ou atualizar a nota atual
        function saveNote() {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            const noteId = noteSelect.value || generateNoteId();
            const existingNoteIndex = notes.findIndex(note => note.id === noteId);

            if (existingNoteIndex >= 0) {
                // Atualizar nota existente
                notes[existingNoteIndex].content = noteArea.value;
            } else {
                // Criar nova nota
                const newNote = {
                    id: noteId,
                    title: `Nota ${notes.length + 1}`,
                    content: noteArea.value
                };
                notes.push(newNote);
                noteSelect.value = newNote.id;
            }

            localStorage.setItem('notes', JSON.stringify(notes));
            loadNoteList();
        }

        // Criar nova nota
        newNoteBtn.addEventListener('click', () => {
            saveNote(); // Salva a nota atual antes de criar uma nova
            noteArea.value = '';
            noteSelect.value = '';
        });

        // Remover a nota atual
        deleteNoteBtn.addEventListener('click', () => {
            const noteId = noteSelect.value;
            if (!noteId) return;

            const confirmDelete = confirm("Tem a certeza que deseja remover a nota atual?");
            if (confirmDelete) {
                let notes = JSON.parse(localStorage.getItem('notes')) || [];
                notes = notes.filter(note => note.id !== noteId);
                localStorage.setItem('notes', JSON.stringify(notes));
                noteArea.value = '';
                loadNoteList();
            }
        });

        // Carregar a nota selecionada
        noteSelect.addEventListener('change', () => {
            const noteId = noteSelect.value;
            if (noteId) {
                loadNote(noteId);
            } else {
                noteArea.value = '';
            }
        });

        // Carregar as notas ao iniciar
        loadNoteList();
