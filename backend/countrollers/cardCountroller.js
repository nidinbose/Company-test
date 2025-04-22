import Card from '../modeles/card.model.js';

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
      features, welcomeOffers, publishedBy, publishedAt, payoutDescription
    } = req.body;

    if (!cardName || !cardSlug || !cardType || !cardStatus) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

       const cardImage = req.files?.cardImage?.[0]?.filename || '';
    const ogImage = req.files?.ogImage?.[0]?.filename || '';

    const newCard = await Card.create({
      cardName, cardSlug, cardType, categoryName, providerName,
      service, payout, commission, cardLink, cardStatus, moneybipRating,
      ratingReviewHeading, ratingReviewDescription, cardImage,
      annualFee, joiningFee, foreignTransaction, apr,
      creditScoreMin, creditScoreMax, ageMin, ageMax,
      incomeMin, incomeMax, loungeService, fraudLiability,
      seoTitle, seoKeywords, seoDescription, ogImage,
      features, welcomeOffers, publishedBy, publishedAt, payoutDescription
    });

    return res.status(201).json({ message: 'Card created successfully', data: newCard });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
