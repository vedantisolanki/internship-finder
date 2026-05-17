import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  Target, 
  Users, 
  Zap, 
  ChevronRight, 
  ArrowRight,
  CheckCircle2,
  Star,
  Globe,
  Award
} from 'lucide-react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    viewport={{ once: true }}
    className="card group hover:bg-primary-600 transition-all duration-500"
  >
    <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors duration-500">
      <Icon className="w-7 h-7" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-500 group-hover:text-primary-100 transition-colors leading-relaxed">
      {description}
    </p>
  </motion.div>
);

const Home = () => {
  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary-100/50 rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-bold animate-pulse-slow">
              <Zap className="w-4 h-4" />
              <span>Matching 10k+ students daily</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1]">
              Launch Your Career with <span className="gradient-text">Smart Matching.</span>
            </h1>
            
            <p className="text-xl text-gray-500 leading-relaxed max-w-xl">
              Connect with top companies through our AI-driven internship platform. We match your skills with the perfect opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/internships" className="btn-primary py-4 px-10 text-lg flex items-center justify-center space-x-2 group">
                <span>Browse Internships</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/signup" className="btn-secondary py-4 px-10 text-lg flex items-center justify-center space-x-2">
                <span>Post an Opportunity</span>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
                    <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div>
                <div className="flex text-orange-400">
                  {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-sm font-bold text-gray-900 mt-1">4.9/5 from 2,000+ users</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, type: 'spring' }}
            className="relative"
          >
            <div className="relative z-10 animate-float">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Students Working" 
                className="rounded-[40px] shadow-2xl border-8 border-white"
              />
              {/* Floating Stat Card */}
              <div className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-xl border-primary-100 animate-pulse-slow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified Hiring</p>
                    <p className="text-xl font-black text-gray-900">98% Placement</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-primary-600/10 rounded-full scale-125 blur-3xl -z-10" />
          </motion.div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-[0.2em] mb-12">Trusted by global leaders</p>
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
          <Building2 className="w-32 h-12" />
          <Building2 className="w-32 h-12" />
          <Building2 className="w-32 h-12" />
          <Building2 className="w-32 h-12" />
          <Building2 className="w-32 h-12" />
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="section-title">Built for the <span className="gradient-text">Next Generation</span> of Talent.</h2>
          <p className="text-gray-500 text-lg">We've reimagined the internship search process to be faster, smarter, and more rewarding.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={Target} 
            title="Skill Matching" 
            description="Our algorithm matches your specific skills with the requirements of top companies."
            delay={0.1}
          />
          <FeatureCard 
            icon={Users} 
            title="Direct Access" 
            description="Connect directly with hiring managers without the usual corporate gatekeeping."
            delay={0.2}
          />
          <FeatureCard 
            icon={Globe} 
            title="Remote First" 
            description="Access thousands of remote-friendly opportunities from companies worldwide."
            delay={0.3}
          />
          <FeatureCard 
            icon={Briefcase} 
            title="Career Roadmap" 
            description="Get personalized recommendations to help you build a competitive professional profile."
            delay={0.4}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="gradient-bg py-24 rounded-[60px] max-w-7xl mx-auto px-4 md:px-6 shadow-xl border border-white">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-primary-600 tracking-tight">50k+</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Active Students</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-primary-600 tracking-tight">2.5k</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Partner Companies</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-primary-600 tracking-tight">120+</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Global Cities</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-5xl font-black text-primary-600 tracking-tight">95%</h4>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Match Accuracy</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="bg-gray-900 rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center space-y-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-600/20 rounded-full blur-[100px]" />
          
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
            Ready to Find Your <br /> <span className="text-primary-400">Dream Internship?</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Join thousands of students who have already launched their careers through SmartIntern. Sign up today and get matched instantly.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
            <Link to="/signup" className="btn-primary py-5 px-12 text-xl shadow-2xl shadow-primary-500/20">
              Get Started Now
            </Link>
            <Link to="/login" className="btn-secondary bg-transparent text-white border-white/20 hover:bg-white/10 py-5 px-12 text-xl">
              Existing User Login
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper for logo placeholder
const Building2 = ({ className }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <div className="w-8 h-8 bg-gray-300 rounded-lg" />
    <div className="h-4 w-24 bg-gray-300 rounded" />
  </div>
);

export default Home;

