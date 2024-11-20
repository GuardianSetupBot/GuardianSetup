import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { CountrySelector } from './components/CountrySelector';
import { countries } from './data/countries';
import type { Country } from './types';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [keepSignedIn, setKeepSignedIn] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countries.find(c => c.code === 'US') || countries[0]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        <div className="flex flex-col items-center mb-12">
          <div className="w-24 h-24 bg-[#8774e1] rounded-full flex items-center justify-center mb-8">
            <Send size={36} className="text-white transform -rotate-45 translate-x-1" />
          </div>
          <h1 className="text-3xl font-bold mb-3">Sign in to Telegram</h1>
          <p className="text-[#7d8e98] text-center text-sm">
            Please confirm your country code<br />and enter your phone number.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-[#7d8e98] text-xs uppercase tracking-wider pl-0.5">Country</label>
            <CountrySelector
              selectedCountry={selectedCountry}
              onSelect={setSelectedCountry}
            />
          </div>

          <div className="space-y-1">
            <label className="block text-[#7d8e98] text-xs uppercase tracking-wider pl-0.5">Phone Number</label>
            <div className="bg-[#1C1C1C] border border-[#1C1C1C] focus-within:border-[#8774e1] rounded-[10px] transition-colors">
              <div className="flex items-center px-4 py-3">
                <span className="text-white mr-2">+{selectedCountry.dialCode}</span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="flex-1 bg-transparent text-white outline-none placeholder-[#556474]"
                  placeholder="___ ___ ____"
                />
              </div>
            </div>
          </div>

          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
                className="custom-checkbox"
              />
            </div>
            <span className="text-[#7d8e98] text-sm">Keep me signed in</span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#8774e1] hover:bg-[#9785e5] transition-colors text-white py-3.5 rounded-[10px] font-medium mt-6"
          >
            NEXT
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="#" className="text-[#8774e1] hover:text-[#9785e5] transition-colors text-sm uppercase tracking-wider">
            Log in by QR Code
          </a>
        </div>
      </div>
    </div>
  );
}