import { companyLinks, socialIcons, supportLinks } from '@/constants/constant'
import React from 'react'
import { FaFacebook, FaFacebookF } from 'react-icons/fa'
import { FaDribbble, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { SocialIcon } from '../Helper/SocialIcon'
import { FooterLink } from '../Helper/FooterLink'

const Footer = () => {
  return (
    <div className='pt-16 pb-16 bg-gray-950'>
      <div className='w-[80%] mx-auto items-start grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10'>
        {/* 1st part */}
        <div>
          <div className='text-white font-bold text-3xl'>
            LOGO
          </div>
          <p className='mt-5 font-semibold text-gray-300 text-sm'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quia! Doloremque, voluptatibus
          </p>
          {/* social links */}
          <div className='flex items-center text-white space-x-4 mt-6'>
            {socialIcons.map((social, index) => (
              <SocialIcon 
                key={index} 
                Icon={social.Icon} 
                bgColor={social.bgColor} 
              />
            ))}
          </div>
        </div>

        {/* 2nd part */}
        <div className='space-y-5'>
          <h1 className='text-lg text-white font-bold'>Company</h1>
          {companyLinks.map((link, index) => (
            <FooterLink key={index} text={link} />
          ))}
        </div>

        {/* 3rd part */}
        <div className='space-y-5'>
          <h1 className='text-lg text-white font-bold'>Support</h1>
          {supportLinks.map((link, index) => (
            <FooterLink key={index} text={link} />
          ))}
        </div>

        {/* 4th part */}
        <div>
          <h1 className='text-lg text-white font-bold'>Get In Touch</h1>
          <div className='mt-6'>
            <h1 className='text-sm text-white'>Our Mobile Number</h1>
            <h1 className='textt-base font-bold text-white mt-1'>+91-1234567890</h1>
          </div>
          <div className='mt-6'>
            <h1 className='text-sm text-white'>Our Address</h1>
            <h1 className='textt-base font-bold text-white mt-1'>1234 Elm Street, Springfield, USA</h1>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className='mt-8 w-[80%] mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm'>
        <p className='text-center md:text-left'>
          CopyRight © 2025 Product Landing Page. All rights reserved.
        </p>
        <div className='flex items-center space-x-4 mt-4 md:mt-0'>
          <span>Socials: </span>
          {socialIcons.map((social, index) => (
            <span key={index} className="text-gray-500 hover:text-gray-800">
              <social.Icon />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Footer