import { useState } from 'react';
// import CardComponent from './Component/CardComponent';
// import ContentCarousel from './Component/ContentCarousel';
// import SocialMediaCard from './Component/SocialMediaCard';

export default function MarketingContentGenerator() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    industry: '',
    companySize: '',
    targetAudience: '',
    contentGoals: '',
    budget: '',
    urgency: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);
    setGeneratedContent('');

    try {
      // Prepare the prompt for Ollama
      const prompt = `Generate marketing content based on the following information:
      - Company: ${formData.company} (${formData.industry} industry, ${formData.companySize} employees)
      - Target Audience: ${formData.targetAudience}
      - Content Goals: ${formData.contentGoals}
      - Budget: ${formData.budget}      
      - Timeline: ${formData.urgency}
      
      Create a comprehensive marketing content strategy including:
      1. Key messaging
      2. Generate a set of 20 viral video hooks for Instagram Reels or TikTok to promote their business. 
      3. Content types recommended
      4. Sample social media posts
      5. Email campaign outline`;

      // Call Ollama backend
      const response = await fetch('http://localhost:3001/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           // or whatever model you're using
          prompt: prompt,
          model: 'phi4-mini', // Ensure this matches your model name
          stream: false
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      setGeneratedContent(data.response);
      setSuccess(true);

      // In a real app, you might want to save the form data and generated content to your database
      // await saveToDatabase(formData, data.response);

    } catch (err) {
      console.error('Error:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-600 to-purple-700 font-sans text-gray-900">
      <div className="relative overflow-hidden">
        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/5 left-1/10 w-20 h-20 rounded-full bg-white/10 animate-float-random"></div>
          <div className="absolute top-3/5 right-1/10 w-32 h-32 rounded-full bg-white/10 animate-float-random animation-delay-2000"></div>
          <div className="absolute top-4/5 left-1/5 w-16 h-16 rounded-full bg-white/10 animate-float-random animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-5 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* Hero text */}
            <div className="text-white lg:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-gradient-to-br from-white to-indigo-100 bg-clip-text text-transparent">
                Generate Powerful Marketing Content
              </h1>
              <p className="text-xl opacity-90 mb-8">
                Transform your customer insights into compelling marketing content that converts. Our AI-powered platform creates personalized campaigns based on your Ideal Customer Profile.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-2 text-indigo-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span>AI-Powered Content</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span>ICP-Based Targeting</span>
                </div>
                <div className="flex items-center gap-2 text-indigo-100">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xs">✓</div>
                  <span>Multi-Channel Output</span>
                </div>
              </div>
            </div>

            {/* Form container */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-8 md:p-12 shadow-2xl border border-white/20 animate-float">
                {!success ? (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Get Started Today</h2>
                      <p className="text-gray-600">Tell us about your business and ideal customers</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label htmlFor="firstName" className="block font-semibold text-gray-700">First Name *</label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="block font-semibold text-gray-700">Last Name *</label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <label htmlFor="email" className="block font-semibold text-gray-700">Email Address *</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                        />
                      </div>

                      <div className="space-y-2 mb-6">
                        <label htmlFor="company" className="block font-semibold text-gray-700">Company Name *</label>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label htmlFor="industry" className="block font-semibold text-gray-700">Industry *</label>
                          <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          >
                            <option value="">Select Industry</option>
                            <option value="technology">Technology</option>
                            <option value="healthcare">Healthcare</option>
                            <option value="finance">Finance</option>
                            <option value="retail">Retail</option>
                            <option value="manufacturing">Manufacturing</option>
                            <option value="education">Education</option>
                            <option value="real-estate">Real Estate</option>
                            <option value="consulting">Consulting</option>
                            <option value="consulting">Fashion</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="companySize" className="block font-semibold text-gray-700">Company Size</label>
                          <select
                            id="companySize"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          >
                            <option value="">Select Size</option>
                            <option value="1-10">1-10 employees</option>
                            <option value="11-50">11-50 employees</option>
                            <option value="51-200">51-200 employees</option>
                            <option value="201-1000">201-1000 employees</option>
                            <option value="1000+">1000+ employees</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <label htmlFor="targetAudience" className="block font-semibold text-gray-700">Target Audience Description *</label>
                        <textarea
                          id="targetAudience"
                          name="targetAudience"
                          value={formData.targetAudience}
                          onChange={handleChange}
                          placeholder="Describe your ideal customer: demographics, pain points, behavior, etc."
                          required
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white min-h-[120px]"
                        ></textarea>
                      </div>

                      <div className="space-y-2 mb-6">
                        <label htmlFor="contentGoals" className="block font-semibold text-gray-700">Content Marketing Goals</label>
                        <textarea
                          id="contentGoals"
                          name="contentGoals"
                          value={formData.contentGoals}
                          onChange={handleChange}
                          placeholder="What do you want to achieve with your marketing content? (lead generation, brand awareness, conversions, etc.)"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white min-h-[120px]"
                        ></textarea>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="space-y-2">
                          <label htmlFor="budget" className="block font-semibold text-gray-700">Marketing Budget Range</label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          >
                            <option value="">Select Budget</option>
                            <option value="under-1k">Under $1,000/month</option>
                            <option value="1k-5k">$1,000 - $5,000/month</option>
                            <option value="5k-10k">$5,000 - $10,000/month</option>
                            <option value="10k-25k">$10,000 - $25,000/month</option>
                            <option value="25k+">$25,000+/month</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="urgency" className="block font-semibold text-gray-700">When do you need content?</label>
                          <select
                            id="urgency"
                            name="urgency"
                            value={formData.urgency}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-100 transition-all bg-white"
                          >
                            <option value="">Select Timeline</option>
                            <option value="immediately">Immediately</option>
                            <option value="1-week">Within 1 week</option>
                            <option value="1-month">Within 1 month</option>
                            <option value="3-months">Within 3 months</option>
                            <option value="exploring">Just exploring</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-5 px-8 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all relative overflow-hidden mt-4 disabled:opacity-80"
                      >
                        <span className={`transition-opacity ${loading ? 'opacity-0' : 'opacity-100'}`}>
                          Generate My Marketing Content
                        </span>
                        {loading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          </div>
                        )}
                      </button>

                      {error && (
                        <div className="mt-4 bg-red-500 text-white p-4 rounded-xl text-center">
                          ❌ Something went wrong. Please try again or contact support.
                        </div>
                      )}
                    </form>
                  </>
                ) : (
                  <div className="text-gray-800">
                    <div className="text-center mb-6">
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Marketing Content</h2>
                      <p className="text-gray-600">Here's your AI-generated marketing strategy</p>
                    </div>
                    
                    <div className="bg-gray-50 p-6 rounded-xl mb-6">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: generatedContent.replace(/\n/g, '<br />') }} />
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(generatedContent);
                        }}
                        className="flex-1 bg-indigo-100 text-indigo-700 py-3 px-6 rounded-xl font-semibold hover:bg-indigo-200 transition-colors"
                      >
                        Copy to Clipboard
                      </button>
                      <button
                        onClick={() => {
                          setSuccess(false);
                          setGeneratedContent('');
                        }}
                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold shadow hover:shadow-md transition-all"
                      >
                        Generate New Content
                      </button>
                    </div>
                    
                    <div className="mt-6 text-sm text-gray-500">
                      <p>This content was generated by AI and may require refinement. We've also sent a copy to your email at {formData.email}.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float-random {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(90deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
          75% { transform: translateY(-30px) rotate(270deg); }
        }
        .animate-float-random {
          animation: float-random 8s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>

      
    </div>

  );
}