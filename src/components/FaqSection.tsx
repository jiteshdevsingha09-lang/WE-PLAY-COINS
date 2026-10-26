import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Why does the recharge take up to 24 hours?',
      a: 'To guarantee maximum safety and avoid any third-party payment flags on your WePlay account, orders are reviewed and processed directly through authorized distributor batch pipelines. Most requests complete in 2 to 6 hours, but please wait up to 24 hours.',
    },
    {
      q: 'Why is only my phone number asked when requesting an order?',
      a: 'We never require your WePlay game password or Google account password. Your phone number is strictly used for order SMS verification, updates, and customer support follow-up if needed.',
    },
    {
      q: 'Where do I find my WePlay ID?',
      a: 'Open the WePlay app on your mobile device, tap the Profile tab at the bottom right, and copy the numeric ID shown beneath your picture.',
    },
    {
      q: 'What should I do if 24 hours pass and coins are not credited?',
      a: 'You can check your order ID in the "My Orders" tab and reach out with your Order Reference ID. Our support team guarantees resolution or a full refund.',
    },
  ];

  return (
    <section id="faq-section" className="py-12 border-t border-slate-900">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Everything you need to know about coin delivery and 24-hour request queues.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-slate-900/60 border border-slate-800/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-200">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-purple-400 transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
