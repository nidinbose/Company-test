import React ,{useState,useEffect}from 'react';
import axios from "axios"
import { Star, StarHalf, StarOff } from 'lucide-react';

const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center space-x-1 text-yellow-400">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="w-5 h-5" />
      ))}
      <span className="ml-2 text-sm text-white">({rating})</span>
    </div>
  );
};


const CreditCardOffer = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchCards = async () => {
        try {
          const res = await axios.get('http://localhost:3003/api/getcard');
               setCards(res.data.data || res.data);
          console.log('API Response:', res.data);
        } catch (err) {
          console.error('Error fetching cards:', err);
          setError('Failed to load cards');
        } finally {
          setLoading(false);
        }
      };
      fetchCards();
    }, []);


    return (
    <div className="min-h-screen bg-gray-100  container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12  mx-auto ">
              <div className="bg-white rounded-2xl shadow p-4 space-y-4 col-span-1 h-full">
          <h2 className="text-lg font-semibold border-b pb-2 text-red-600">Provider’s Name</h2>
          <div className="space-y-2 text-sm">
            {[
              "Yes Bank", "ICICI Bank", "Bank Of Baroda", "IDFC Bank",
              "HDFC Bank", "Axis Bank", "HSBC Bank", "Kotak Mahindra Bank"
            ].map((name, index) => (
              <label key={index} className="flex items-center gap-2">
                <input type="checkbox" className="accent-blue-600" />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </div>


        {/* Credit Card Info */}

         

   {cards.map((item,indexs)=>(
    
         <div className="bg-white rounded-2xl shadow col-span-1 lg:col-span-3 p-6 space-y-6" key={item.id}> 
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3  md:col-span-2 ">
<div className="flex justify-center md:justify-start ">
<img
src="https://www.cardexpert.in/wp-content/uploads/2020/10/axis-bank-ace-credit-card-1.jpg"
alt="Card"
className="w-80 lg:w-68 lg:h-45 h-auto xl:h-auto rounded-xl"
/>
</div>
<div className="flex flex-col justify-between space-y-2">
<div>
<h2 className="text-md md:text-xl lg:text-lg xl:text-[18px] font-bold text-indigo-900 mt-4 md:mt-1">
{item.cardName}
</h2>
<p className="text-md md:text-lg text-indigo-900 mt-1">{item.cardSlug}</p>
<p className="text-indigo-900 mt-2 text-[10px] xl:text-[11px] font-medium">
Elevate your travel experience with the Axis Bank Club Vistara Credit Card, offering exclusive Vistara airline privileges and accelerated rewards on every journey. Seamlessly blend luxury and convenience with a card designed for the
discerning traveler.
</p>
</div>
<div className="mt-2 flex flex-wrap gap-2">
<button className="bg-indigo-900 text-white px-4 py-2 rounded-md text-sm">Apply Now</button>
<button className="border border-indigo-900 text-indigo-900 px-4 py-2 rounded-md text-sm">Check Eligibility</button>
</div>
</div>

<div className='hidden md:block xl:hidden'>

</div>
<div className="flex flex-col  items-end max-w-sm p-2 md:p-7">
<div>
<p className="font-bold text-indigo-900 text-sm md:text-lg">MoneyBIP Rating</p>
<div className="text-yellow-400 text-xl md:text-2xl"> <StarRating rating={item.moneybipRating || 0} /></div>
</div>
<label className="flex items-center gap-2 text-sm lg:text-lg text-indigo-900 font-bold text-start md:mr-3 lg:mr-0">
<input type="checkbox" className="accent-indigo-600 text-start" />
Add to Compare
</label>
</div>
</div>
</div>
<hr />
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 p-4">
<div className="md:col-span-2 max-w-full">
<h1 className="text-xl font-bold text-gray-800 mb-3">Features</h1>
<ul className="list-disc font-semibold text-[12px] lg:text-[14px] text-gray-700 ml-2 ">
<li>Vistara Privileges: Enjoy complimentary Club Vistara Silver membership, airport lounge access, and additional baggage allowance for an enhanced travel experience.</li>
<li>Accelerated Rewards: Earn Club Vistara Points on every spend, and enjoy accelerated earning on Vistara and partner spends, bringing you closer to exciting rewards.</li>
<li>Welcome Benefits: Experience a warm welcome with complimentary Club Vistara Base Points, making your card membership even more rewarding from the start.</li>
<li>Travel and Lifestyle Benefits: Access exclusive travel and lifestyle privileges, including discounts on dining, hotel bookings, and more, amplifying your everyday experiences.</li>
<li>Milestone Rewards: Earn bonus Club Vistara Points on achieving annual spending milestones, adding extra value to your card membership over time.</li>
</ul>
</div>
<div className="border-l-2 pl-6 text-sm text-gray-700 w-full md:w-fit">
<div>
<p className="text-gray-600 font-bold">Annual Fees</p>
<p className="text-xl font-bold text-black mt-1">₹ {item.annualFee}</p>
</div>
<div className="pt-4">
<hr />
<p className="text-gray-600 font-bold mt-2">joining fees</p>
<p className="text-xl font-bold text-black mt-1">{item.joiningFee}</p>
</div>
<div className="pt-4">
<hr />
<p className="text-gray-600 font-bold mt-2">Recommended Credit Score</p>
<p className="text-xl font-bold text-black mt-1">{item.creditScoreMin}-{item.creditScoreMax}</p>
<a href="#" className="text-blue-500 text-sm hover:underline mt-3 block">Check your credit score here</a>
</div>
</div>
</div>
<hr />
<div>
<h3 className="font-bold text-black text-lg mb-5">Welcome Offers</h3>
   <p className='font-semibold text-[12px] md:text-[14px]'>While specific welcome offers may change over time, typical welcome benefits for credit cards like the Axis Bank Club Vistara Credit Card might include:</p>
   <ul className="list-disc text-[12px] md:text-[14px] text-gray-700 mt-2 ml-4 md:ml-10 font-semibold">
  <li>Bonus Club Vistara Points: Receive a welcome bonus of Club Vistara Points upon card activation, giving you an instant boost toward exciting travel rewards.</li>
<li>Joining Fee Waiver: Enjoy the privilege of having the joining fee waived as part of the welcome offer, providing a cost-effective introduction to the card.</li>
    <li>Complimentary Lounge Access: Access airport lounges for free during the initial months, adding a touch of luxury to your travels right from the start.</li>
     <li>Additional Rewards on Initial Spends: Earn extra rewards or points for meeting specific spending thresholds in the first few months after card issuance.</li>
</ul>
 </div>
</div>
   ))}





        
      </div>
    </div>
  );
};

export default CreditCardOffer;
