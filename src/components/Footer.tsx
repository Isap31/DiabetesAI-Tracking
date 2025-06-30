import React from 'react';
import { Heart, Shield, Info, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-purple-600" />
              <span className="text-lg font-bold text-gray-900">AuroraFlow</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">AI-Powered Diabetes Management</p>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Contact Us</a>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-start space-x-3 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <div className="flex-shrink-0 mt-0.5">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-blue-900">Medical Disclaimer</h4>
              <p className="text-xs text-blue-800 mt-1">
                The content provided by AuroraFlow is for informational purposes only and is not intended as medical advice, diagnosis, or treatment. 
                Always consult with a qualified healthcare provider before making any changes to your diabetes management routine, medication, 
                diet, or exercise regimen. Never disregard professional medical advice or delay seeking it because of something you have read on this application.
              </p>
              <p className="text-xs text-blue-800 mt-2">
                While we strive to provide accurate information and predictions, AuroraFlow's AI features are designed to supplement, not replace, 
                professional medical care. Individual results may vary, and all health decisions should be made in consultation with your healthcare team.
              </p>
              <div className="mt-2 flex items-center">
                <a href="#" className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                  Learn more about our data and predictions
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} AuroraFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;