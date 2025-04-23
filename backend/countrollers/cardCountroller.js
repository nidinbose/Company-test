import Card from '../modeles/card.model.js';

import fs from 'fs/promises';
import path from 'path';

export const addCard = async (req, res) => {
  try {
    const {
      cardName, cardSlug, cardType, categoryName, providerName,
      service, payout, commission, cardLink, cardStatus, moneybipRating,
      ratingReviewHeading, ratingReviewDescription,
      annualFee, joiningFee, foreignTransaction, apr,
      creditScoreMin, creditScoreMax, ageMin, ageMax,
      incomeMin, incomeMax, loungeService, fraudLiability,
      seoTitle, seoKeywords, seoDescription,
      features, welcomeOffers, publishedBy, publishedAt, payoutDescription,cardImageBase64,
    } = req.body;

    if (!cardName || !cardSlug || !cardType || !cardStatus ) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }
    
    let ogImageBase64 = '';

    if (req.files?.ogImage?.[0]) {
      const filePath = path.join('uploads', req.files.ogImage[0].filename);
      const fileBuffer = await fs.readFile(filePath);
      ogImageBase64 = fileBuffer.toString('base64');
    }

    const newCard = await Card.create({
      cardName, cardSlug, cardType, categoryName, providerName,
      service, payout, commission, cardLink, cardStatus, moneybipRating,
      ratingReviewHeading, ratingReviewDescription, cardImage: cardImageBase64,
      annualFee, joiningFee, foreignTransaction, apr,
      creditScoreMin, creditScoreMax, ageMin, ageMax,
      incomeMin, incomeMax, loungeService, fraudLiability,
      seoTitle, seoKeywords, seoDescription, ogImage: ogImageBase64,
      features, welcomeOffers, publishedBy, publishedAt, payoutDescription,cardImageBase64
    });

    return res.status(201).json({ message: 'Card created successfully', data: newCard });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};




const getImageBase64 = async (filename) => {
  if (!filename) return '';

  try {
    const filePath = path.join('uploads', filename);
 
    try {
      await fs.access(filePath);
    } catch (err) {
      console.error(`File not found: ${filename}`);
      return '';
    }

    const fileBuffer = await fs.readFile(filePath);
    return fileBuffer.toString('base64');
  } catch (err) {
    console.error(`Error reading file ${filename}:`, err);
    return '';
  }
};


export const getCards = async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });

    const cardsWithImages = await Promise.all(
      cards.map(async (card) => {
        const [ ogImage] = await Promise.all([
     
          getImageBase64(card.ogImage),
        ]);

        return {
          ...card.toObject(),
        
          ogImage,
        };
      })
    );

    res.status(200).json({ 
      message: 'Cards fetched successfully', 
      data: cardsWithImages 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




export const getCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findById(id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

        res.status(200).json({
      message: 'Card fetched successfully',
      data: card,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCardById = async (req, res) => {
  try {
    const { id } = req.params;
    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCardById = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedCard = await Card.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true, 
    });

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({
      message: 'Card updated successfully',
      data: updatedCard,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
