import { Router } from "express";
import * as Card from '../countrollers/cardCountroller.js'
import upload from '../Middleware/Multer.js';
import { addCard } from '../countrollers/cardCountroller.js';
const router=Router()


router.post('/addcard', upload.fields([
    { name: 'cardImage', maxCount: 1 },
    { name: 'ogImage', maxCount: 1 }
  ]), addCard);

  router.route('/getcard').get(Card.getCards)
  router.route('/getbyid/:id').get(Card.getCardById)
  router.route('/delete/:id').delete(Card.deleteCardById)
  router.route('/update/:id').put(Card.updateCardById)
export default router