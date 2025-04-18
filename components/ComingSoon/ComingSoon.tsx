'use client'

import React, { useState, useEffect } from 'react';
import FlipCountdown from '@rumess/react-flip-countdown';
import Image from 'next/image';

const ComingSoonPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const targetDate = '2026-01-01';

    useEffect(() => {
        // Small delay to ensure smooth transition
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Successfully subscribed!');
                setEmail('');
            } else {
                setMessage(data.error || 'Something went wrong');
            }
        } catch (error) {
            setMessage(`Failed to subscribe. Please try again.${error}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[url('/images/bg-coming-soon.jpeg')] bg-cover bg-center flex flex-col items-center justify-center p-4 text-white">
            <div className="text-center mb-12">
                <Image src="/tm-logo.png" alt="Logo" width={100} height={100} className="w-40" />
            </div>

            {/* Flip Countdown with fixed height */}
            <div className="mb-16 w-full max-w-2xl h-[120px] flex items-center justify-center">
                {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center">
                        <div className="animate-pulse text-gray-300">Loading...</div>
                    </div>
                ) : (
                    <FlipCountdown
                        size="small"
                        hideYear
                        hideMonth
                        dayTitle="Days"
                        hourTitle="Hours"
                        minuteTitle="Minutes"
                        secondTitle="Seconds"
                        endAt={targetDate}
                        titlePosition="bottom"
                        theme="dark"
                        className="custom-flip-numbers"
                    />
                )}
            </div>

            <div className="flex flex-col items-center justify-center max-w-[500px]">
                <h1 className="text-4xl md:text-4xl font-semibold mb-4 animate-pulse text-center">
                    SOMETHING EXCITING IS COMING!
                </h1>
                <p className="text-sm  text-center text-gray-300 mb-8 max-w-[400px]">
                    Are you ready to get something new from us? Then subscribe the newsletter to get latest updates.
                </p>
            </div>

            {/* Newsletter Signup */}
            <div className="w-full max-w-md">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 pl-4 pr-32 rounded-[18px] bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                            disabled={isSubmitting}
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#c62c03] hover:bg-red-700 text-white px-4 py-1 rounded-[16px] font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Subscribing...' : 'Notify Me'}
                        </button>
                    </div>
                    {message && (
                        <p className={`bg-gray-900/80 rounded-l-md p-3 border border-white/30 shadow-[0_4px_6px_rgba(0,0,0,0.1)] text-center text-sm ${message.includes('Successfully') ? 'text-white' : 'text-[#c62c03]'}`}>
                            {message}
                        </p>
                    )}
                </form>
            </div>

            {/* Social Links */}
            <div className="text-white mt-2 fixed -right-1 top-1/2 -translate-y-1/2 flex flex-col space-y-3 bg-white/10 backdrop-blur-[8px] -webkit-backdrop-blur-[8px] rounded-l-md p-3 border border-white/30 shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
                <a href="tel:+919633779922" className=" hover:text-white transition duration-200">
                    <span className="sr-only">Call</span>
                    <svg className="h-5 w-5 bg-[#c62c03] rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 15.5c-1.2 0-2.4-.2-3.6-.6-.3-.1-.7 0-1 .2l-2.2 2.2c-2.8-1.4-5.1-3.8-6.6-6.6l2.2-2.2c.3-.3.4-.7.2-1-.3-1.1-.5-2.3-.5-3.5 0-.6-.4-1-1-1H4c-.6 0-1 .4-1 1 0 9.4 7.6 17 17 17 .6 0 1-.4 1-1v-3.5c0-.6-.4-1-1-1zM21 6h-3V3h-2v3h-3v2h3v3h2V8h3z" />
                    </svg>
                </a>
                <a href="mailto:connect@trekkingmiles.com" className=" hover:text-white transition duration-200">
                    <span className="sr-only">Email</span>
                    <svg className="h-5 w-5 bg-[#c62c03] rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                </a>
                <a href="https://www.facebook.com/trekkingmiles/" className=" hover:text-white transition duration-200">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-5 w-5 bg-[#c62c03] rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                </a>
                <a href="https://www.instagram.com/trekking_miles/" className=" hover:text-white transition duration-200">
                    <span className="sr-only">Instagram</span>
                    <svg className="h-5 w-5 bg-[#c62c03] rounded-full p-1" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                </a>
            </div>
        </div>
    );
};

export default ComingSoonPage;