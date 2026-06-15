import express from 'express';

import { createNotes, deleteNote, updateNote, getNote, getAllNotes } from '../controller/note.controller.js';
import {auth} from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/create/note',auth, createNotes);
router.post('/delete/note/:id',auth, deleteNote);
router.put('/update/note/:id',auth, updateNote);
router.get('/get/notes',auth, getAllNotes);
router.get('/get/note/:id',auth, getNote);

export default router;