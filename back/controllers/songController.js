const Song = require('../models/Song');

async function getSongs(req, res) {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);

    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las canciones', error });
    }
}

async function addSong(req, res) {
    try {
        const { title, lyrics } = req.body;
        if (!title || !lyrics) {
            return res.status(400).json({ message: 'Título y contenido son requeridos' });
        }
        const newSong = new Song({ title, lyrics });
        await newSong.save();
        res.status(201).json(newSong);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error al agregar la canción', error });
    }
}

async function removeSong(req, res) {
    try {
        const { _id } = req.body;
        if (!_id) {
            return res.status(400).json({ message: 'id es requerido' });
        }
        const deletedSong = await Song.findOneAndDelete({ _id });
        if (!deletedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.status(200).json({ message: 'Canción eliminada', song: deletedSong });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la canción', error });
    }
}

async function editSong(req, res) {
    try {
        const { _id, title, lyrics } = req.body;
        if (!_id || !title || !lyrics) {
            return res.status(400).json({ message: 'id, título y contenido son requeridos' });
        }
        const updatedSong = await Song.findByIdAndUpdate(
            _id,
            { title, lyrics },
            { new: true }
        );
        if (!updatedSong) {
            return res.status(404).json({ message: 'Canción no encontrada' });
        }
        res.status(200).json({ message: 'Canción actualizada', song: updatedSong });
    } catch (error) {
        res.status(500).json({ message: 'Error al editar la canción', error });
    }
}

module.exports = {
    getSongs,
    addSong,
    removeSong,
    editSong
};