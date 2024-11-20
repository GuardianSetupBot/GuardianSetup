import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { countries } from '../data/countries';
import type { Country } from '../types';

interface CountrySelectorProps {
  selectedCountry: Country;
  onSelect: (country: Country) => void;
}

export function CountrySelector({ selectedCountry, onSelect }: CountrySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-[#1C1C1C] border border-[#1C1C1C] hover:border-[#8774e1] transition-colors rounded-[10px] px-4 py-3 flex items-center justify-between"
      >
        <div className="flex items-center">
          <span className="mr-3 text-lg">{selectedCountry.flag}</span>
          <span className="text-white">{selectedCountry.name}</span>
        </div>
        <ChevronDown size={20} className="text-[#7d8e98]" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-[#1C1C1C] rounded-[10px] shadow-lg max-h-[300px] overflow-y-auto border border-[#1C1C1C]">
          {countries.map((country) => (
            <button
              key={country.code}
              onClick={() => {
                onSelect(country);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#2b2b2b] transition-colors text-left"
            >
              <div className="flex items-center">
                <span className="mr-3 text-lg">{country.flag}</span>
                <span className="text-white">{country.name}</span>
              </div>
              <span className="text-[#7d8e98]">+{country.dialCode}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}