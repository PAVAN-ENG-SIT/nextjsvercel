"use client";
import React, { useState,useEffect } from 'react';
import { Search, MapPin, Star, Filter, User, DollarSign, Award, Building, ArrowRight, Phone, Mail, Home } from 'lucide-react';

/*

const Page = () => {
  useEffect(() => {
    document.title = 'TELANGANA ROADS'; // ← sets the title
  }, []);

  return (
    <div>
      <h1>Welcome to this page</h1>
    </div>
  );
};
*/

// Sample data for roads in Telangana
const roadsData = [
  {
    id: 1,
    name: "Hyderabad-Warangal Highway",
    location: "Hyderabad to Warangal",
    district: "Hyderabad, Warangal",
    length: "148 km",
    contractor: "L&T Construction",
    officer: "Dr. Rajesh Kumar, IAS",
    cost: "₹2,450 crores",

    costValue: 2450,
    minister: "Shri K.T. Rama Rao",
    trust: "Telangana Infrastructure Development Trust",
    rating: 4.2,
    totalRatings: 1250,
    reviews: [
      { user: "Ramesh P.", rating: 5, comment: "Excellent road quality and smooth travel experience." },
      { user: "Priya S.", rating: 4, comment: "Good connectivity, but needs better lighting in some areas." }
    ]
  },
  {
    id: 2,
    name: "Outer Ring Road (ORR)",
    location: "Hyderabad Metropolitan",
    district: "Hyderabad",
    length: "158 km",
    contractor: "GMR Infrastructure",
    officer: "Ms. Swathi Lakra, IAS",
    cost: "₹3,200 crores",
    costValue: 3200,
    minister: "Shri Harish Rao",
    trust: "Hyderabad Metropolitan Development Authority",
    rating: 4.5,
    totalRatings: 2100,
    reviews: [
      { user: "Vikram M.", rating: 5, comment: "Outstanding infrastructure development for the city." },
      { user: "Lakshmi K.", rating: 4, comment: "Greatly reduced travel time across the city." }
    ]
  },
  {
    id: 3,
    name: "Nizamabad-Karimnagar Road",
    location: "Nizamabad to Karimnagar",
    district: "Nizamabad, Karimnagar",
    length: "95 km",
    contractor: "Hindustan Construction Company",
    officer: "Mr. Sandeep Kumar Sultania, IAS",
    cost: "₹1,800 crores",
    costValue: 1800,
    minister: "Shri Jagadish Reddy",
    trust: "Rural Road Development Society",
    rating: 3.8,
    totalRatings: 840,
    reviews: [
      { user: "Srikanth R.", rating: 4, comment: "Good road condition, connects rural areas effectively." },
      { user: "Madhavi T.", rating: 3, comment: "Decent road but maintenance could be better." }
    ]
  },
  {
    id: 4,
    name: "Khammam-Bhadrachalam Highway",
    location: "Khammam to Bhadrachalam",
    district: "Khammam",
    length: "115 km",
    contractor: "Megha Engineering",
    officer: "Dr. Amrapali Kata, IAS",
    cost: "₹2,100 crores",
    costValue: 2100,
    minister: "Shri Puvvada Ajay Kumar",
    trust: "Tribal Area Development Trust",
    rating: 4.0,
    totalRatings: 670,
    reviews: [
      { user: "Ravi Kumar", rating: 4, comment: "Excellent connectivity to tribal areas." },
      { user: "Suma D.", rating: 4, comment: "Well-constructed road with good drainage." }
    ]
  }
];

const TelanganaRoadsWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  type Road = typeof roadsData[number];
  const [selectedRoad, setSelectedRoad] = useState<Road | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [roads, setRoads] = useState(roadsData);
  const [hoveredStar, setHoveredStar] = useState(0);

  // Filter and sort roads
  const filteredRoads = roads.filter(road => {
    const matchesSearch = road.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         road.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         road.contractor.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterBy === 'all') return matchesSearch;
    if (filterBy === 'high-rating') return matchesSearch && road.rating >= 4;
    if (filterBy === 'low-rating') return matchesSearch && road.rating < 4;
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'cost') return b.costValue - a.costValue;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  // Submit rating function
  const submitRating = () => {
    if (newRating > 0 && selectedRoad) {
      const updatedRoads = roads.map(road => {
        if (road.id === selectedRoad.id) {
          const newTotalRatings = road.totalRatings + 1;
          const newAverageRating = ((road.rating * road.totalRatings) + newRating) / newTotalRatings;
          const newReview = {
            user: "Anonymous User",
            rating: newRating,
            comment: newComment || "No comment provided"
          };
          
          return {
            ...road,
            rating: Math.round(newAverageRating * 10) / 10,
            totalRatings: newTotalRatings,
            reviews: [...road.reviews, newReview]
          };
        }
        return road;
      });
      
      setRoads(updatedRoads);
      setNewRating(0);
      setNewComment('');
      alert('Rating submitted successfully!');
    }
  };

  // Star rating component
  const StarRating = ({
    rating,
    interactive = false,
    onRate = null,
    size = 5
  }: {
    rating: number;
    interactive?: boolean;
    onRate?: ((star: number) => void) | null;
    size?: number;
  }) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size === 5 ? 20 : 16}
            className={`${
              star <= (interactive ? hoveredStar || rating : rating)
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            } ${interactive ? 'cursor-pointer hover:scale-110' : ''} transition-all duration-200`}
            onClick={() => interactive && onRate && onRate(star)}
            onMouseEnter={() => interactive && setHoveredStar(star)}
            onMouseLeave={() => interactive && setHoveredStar(0)}
          />
        ))}
      </div>
    );
  };

  // Homepage component
  const Homepage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Home className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Telangana Roads</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Phone className="w-5 h-5 text-gray-600" />
              <span className="text-sm text-gray-600">1800-123-4567</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-950 mb-6 ">
            Discover Telangana's
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Road Infrastructure</span>
          </h2>
          <p className="text-xl text-gray-950 mb-8 max-w-3xl mx-auto">
            Comprehensive information about road projects, contractors, costs, and public ratings across Telangana state.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-950" />
              <input
                type="text"
                placeholder="Search roads by name, district, or contractor..." 
                className="w-full pl-12 pr-4 py-4 text-lg border text-black border-blue-600  rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                spellCheck="false"
                maxLength={600}
                autoFocus
              />
            </div>
          </div>

          {/* Filter and Sort Controls */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-12">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-black" />
              <select
                className="px-4 py-2 rounded-lg border text-blue-600 to-black focus:ring-blue-500"
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
              >

                <option value="all">All Roads</option>
                <option value="high-rating">High Rating (4+)</option>
                <option value="low-rating">Low Rating (&lt;4)</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className=" text-black">Sort by:</span>
              <select
                className="px-4 py-2 border rounded-lg  text-blue-600 to-black focus:ring-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating</option>
                <option value="cost">Cost</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Roads Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRoads.map((road) => (
              <div
                key={road.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group cursor-pointer"
                onClick={() => {
                  setSelectedRoad(road);
                  setCurrentPage('road-details');
                }}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {road.name}
                    </h3>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-800">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span className="text-sm text-blue-600">{road.location}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <Building className="w-4 h-4 mr-2" />
                      <span className="text-sm text-blue-600">{road.contractor}</span>
                    </div>
                    <div className="flex items-center text-gray-800">
                      <DollarSign className="w-4 h-4 mr-2" />
                      <span className="text-sm font-medium text-blue-600">{road.cost}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-900">
                      <StarRating rating={Math.round(road.rating)} />
                      <span className="text-sm text-gray-600">
                        {road.rating} ({road.totalRatings} reviews)
                      </span>
                    </div>
                    <span className="text-sm text-blue-600 font-medium">
                      {road.length}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Telangana Roads Information Portal</h3>
            <p className="text-shadow-gray-700 mb-6">
              Your trusted source for comprehensive road infrastructure information in Telangana state.
            </p>
            <div className="flex justify-center items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-shadow-gray-700" />
                <span className="text-gray-600">1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-shadow-gray-700" />
                <span className="text-gray-600">info@telanganaroads.gov.in</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  // Road details page component
  const RoadDetailsPage = () => (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              <span className="font-medium">Back to Roads</span>
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Telangana Roads</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Road Details Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Road Header */}
        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 ">{selectedRoad?.name}</h1>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-gray-900">{selectedRoad?.location}</span>
            </div>
            <div className="flex items-center space-x-2">
              <StarRating rating={Math.round(selectedRoad?.rating || 0)} />
              <span className="text-gray-900">
                {selectedRoad?.rating} ({selectedRoad?.totalRatings} reviews)
              </span>
            </div>
          </div>
        </div>

        {/* Road Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Basic Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-900">Length:</span>
                <span className="font-medium text-gray-700 ">{selectedRoad?.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-900">District:</span>
                <span className="font-medium  text-gray-700">{selectedRoad?.district}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-900">Construction Cost:</span>
                <span className="font-medium text-green-600">{selectedRoad?.cost}</span>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <span className="text-gray-900 block">Contractor:</span>
                <span className="font-medium  text-gray-700">{selectedRoad?.contractor}</span>
              </div>
              <div>
                <span className="text-gray-900 block">Approving Officer:</span>
                <span className="font-medium  text-gray-700">{selectedRoad?.officer}</span>
              </div>
              <div>
                <span className="text-gray-900 block">Minister:</span>
                <span className="font-medium  text-gray-700">{selectedRoad?.minister}</span>
              </div>
            </div>
          </div>

          {/* Organization Information */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 md:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Supporting Organization</h3>
            <div className="flex items-center space-x-3">
              <Award className="w-6 h-6 text-blue-600" />
              <span className="text-lg font-medium text-blue-600">{selectedRoad?.trust}</span>
            </div>
          </div>
        </div>

        {/* Rating Section */}
        <div className="bg-white rounded-xl
                        shadow-lg p-6 border
                        border-gray-100 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Rate This Road</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <span className=" font-medium  text-gray-700">Your Rating:</span>
              <StarRating 
                rating={newRating} 
                interactive={true} 
                onRate={setNewRating}
              
              />

            </div>
            <div>
              <label className="block text-gray-900 ">Comments (Optional):</label>
              <textarea
                className="w-full p-3 border  text-black border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Share your experience with this road..."
                value={newComment}
                autoComplete="off"
                spellCheck="false"
                onChange={(e) => setNewComment(e.target.value)}
                maxLength={600}
                autoFocus
              />





            </div>
            <button
              onClick={submitRating}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-200 font-medium "
            >
              Submit Rating
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Reviews</h3>
          <div className="space-y-6">
            {selectedRoad?.reviews?.map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-medium text-gray-900">{review.user}</span>
                  </div>
                  <StarRating rating={review.rating} size={4} />
                </div>
                <p className="text-gray-700 ml-11">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="font-sans  text-shadow-gray-700 bg-gray-50 min-h-screen  ">
      {currentPage === 'home' && <Homepage />}
      {currentPage === 'road-details' && <RoadDetailsPage />}
    </div>
  );
};

export default TelanganaRoadsWebsite; 