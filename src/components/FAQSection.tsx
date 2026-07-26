import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { GlassCard, GlassBadge, GlassInput, GlassTabs } from './ui';

export const FAQSection: React.FC = () => {
  const { faqs } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'General', label: 'General' },
    { id: 'Services', label: 'Services' },
    { id: 'Pricing', label: 'Pricing' },
    { id: 'Technical', label: 'Technical' },
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="faq" className="py-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <GlassBadge variant="violet" pulse className="px-4 py-1.5 text-xs font-bold uppercase tracking-wider">
          Frequently Asked Questions
        </GlassBadge>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight leading-tight">
          Everything You Need to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Know</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-body">
          Got questions about our 3D WebGL builds, pricing models, or admin CMS? We have answers.
        </p>
      </div>

      {/* Filter Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <GlassTabs tabs={categories} activeTab={activeCategory} onChange={(id) => setActiveCategory(id)} />

        <div className="w-full sm:w-64">
          <GlassInput
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="w-4 h-4" />}
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <GlassCard variant="subtle" className="p-8 text-center text-slate-400">
            No matching questions found for your query.
          </GlassCard>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <GlassCard key={faq.id} variant="obsidian" className="overflow-hidden">
                <button
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:ring-2 focus-visible:ring-purple-500"
                >
                  <span className="text-base font-bold text-white font-heading">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-purple-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="px-6 pb-6 text-sm text-slate-300 font-body leading-relaxed border-t border-white/05 pt-4"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassCard>
            );
          })
        )}
      </div>

    </section>
  );
};
