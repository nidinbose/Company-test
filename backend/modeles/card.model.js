import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
  cardName: String,
  cardSlug: String,
  cardType: String,
  categoryName: String,
  providerName: String,
  service: String,
  payout: String,
  commission: String,
  cardLink: String,
  cardStatus: String,
  moneybipRating: Number,
  ratingReviewHeading: String,
  ratingReviewDescription: String,
  cardImage: String,
  annualFee: Number,
  joiningFee: Number,
  foreignTransaction: Number,
  apr: Number,
  creditScoreMin: Number,
  creditScoreMax: Number,
  ageMin: Number,
  ageMax: Number,
  incomeMin: Number,
  incomeMax: Number,
  loungeService: String,
  fraudLiability: String,
  seoTitle: String,
  seoKeywords: String,
  seoDescription: String,
  ogImage: String,
  features: String,
  welcomeOffers: String,
  publishedBy: String,
  publishedAt: Date,
  payoutDescription: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

CardSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.model.Cards || mongoose.model("Cards", CardSchema);
