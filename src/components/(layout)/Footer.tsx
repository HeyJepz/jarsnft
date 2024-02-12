"use client"

import { useTheme } from 'next-themes';
import Link from 'next/link';
import { FaFacebookF, FaDiscord, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'
import { Moon, Sun } from "lucide-react"
import { IconType } from 'react-icons';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function Footer() {

  const { isOpen: isPrivacyPolicyOpen, onOpen: onOpenPrivacy, onOpenChange: onOpenChangePrivacy ,onClose: onClosePrivacy } = useDisclosure();
  const { isOpen: isTermsOpen, onOpen: onOpenTerms, onOpenChange: onOpenChangeTerms, onClose: onCloseTerms } = useDisclosure();

  return (
    <footer className=''> {/* pt-32 px-20 pb-10 */}
      <section className=''> {/* max-w-screen-xl mx-auto */}
        <div className='pt-32 px-20 pb-10 grid grid-cols-3 gap-x-5 gap-y-10 mb-14'>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Resource</h1>
            <Link href='/' className='hover:underline'>News & Guides</Link>
            <Link href='/' className='hover:underline'>Getting Started</Link>
            <Link href='/' className='hover:underline'>Community standards</Link>
            <Link href='/' className='hover:underline'>Fees</Link>
          </div>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Help</h1>
            <Link href='/learn' className='hover:underline'>What is NFT?</Link>
            <Link href='/learn' className='hover:underline'>How to buy an NFT</Link>
            <Link href='/learn' className='hover:underline'>How to sell an NFT</Link>
            <Link href='/learn' className='hover:underline'>What are blockchain gas fees?</Link>
            <Link href='/learn' className='hover:underline'>What is a blockchain?</Link>
          </div>
          <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Company</h1>
            <Link href='/' className='hover:underline'>About</Link>
            <Link href='/' className='hover:underline'>Team</Link>
          </div>
          {/* <div className='flex flex-col gap-y-5'>
            <h1 className='font-semibold mb-1'>Marketplace</h1>
            <Link href='/category/art' className='hover:underline'>Art</Link>
            <Link href='/category/photography' className='hover:underline'>Photography</Link>
            <Link href='/category/pfps' className='hover:underline'>PFPs</Link>
          </div> */}
        </div>

        <div className='px-20'>
          <h1 className='text-2xl font-semibold mb-3'>Join us</h1>
          <div className="flex justify-between">
            <div className='flex gap-2'>
              <SocialLinkButton Icon={FaFacebookF} link='' />
              <SocialLinkButton Icon={FaDiscord} link='https://discord.gg/scBduTZyGd' />
              <SocialLinkButton Icon={FaTwitter} link='' />
              <SocialLinkButton Icon={FaInstagram} link='' />
              <SocialLinkButton Icon={FaGithub} link='https://github.com/BroJavaDevs' />
            </div>
            <div>
              <ModeToggle />
            </div>
          </div>
        </div>

        <div className="copyright px-20 mt-24 mb-5">
          <hr className='h-[1px] bg-slate-900 border-slate-900 dark:bg-white dark:border-white' />
          <ul className='mt-5 flex'>
            <div className="left">
              <li>© 2023 Alrae, Jeffrey, Patrick, Rigor</li>
            </div>
            <div className="right ml-auto flex gap-4">
              <li><Button onPress={onOpenPrivacy}>Privacy Policy</Button></li>
                <Modal isOpen={isPrivacyPolicyOpen} onOpenChange={onOpenChangePrivacy} 
                  classNames={{
                    body: "py-5 px-5",
                    backdrop: "bg-[#121212]/50 backdrop-opacity-40",
                    base: "border-[#ffffff] bg-[#131418] dark:bg-[#d9d9d9] text-[#ffffff] dark:text-[#131418]",
                    header: "border-b-[1px] border-[#292f46] py-5 mr-5 ",
                    footer: "border-t-[1px] border-[#292f46] mr-5 ml-5",
                    }}>
                      
                    <ModalContent>{(onClosePrivacy) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1 ml-5">Privacy Policy</ModalHeader>
                    <ModalBody>
                      <p className='font-black pb-2 mb-1'> 
                      Last Updated: February 12, 2024 
                      </p>
                      <p>
                      JARS NFT, Inc.JARS (“JARS”, “we”, “us”, or “our”) is committed to protecting your privacy. We have prepared this Privacy Policy to describe to you our practices regarding the information we collect, use, and share in connection with &nbsp; 
                      our website, mobile app, and other services we and our affiliates provide to you (collectively, the &quot;Service&quot;).
                      </p>
                      <p className='font-black pt-2 pb-2'>1. Types of Information We Collect</p>
                      <p className='font-black pt-2 pb-2'>2. Use of Your Information</p>
                      <p className='font-black pt-2 pb-2'>3. Disclosure of Your Information</p>
                      <p className='font-black pt-2 pb-2'>4. Third-Party Websites</p>
                      <p className='font-black pt-2 pb-2'>5. Third-Party Wallets</p>
                      <p className='font-black pt-2 pb-2'>6. Your Choices Regarding Information</p>
                      <p className='font-black pt-2 pb-2'>7. Data Access and Control</p>
                      <p className='font-black pt-2 pb-2'>8. Data Retention</p>
                      <p className='font-black pt-2 pb-2'>9. Security</p>
                      <p className='font-black pt-2 pb-2'>10. Minors</p>
                      <p className='font-black pt-2 pb-2'>11. Users Outside of the United States</p>
                      <p className='font-black pt-2 pb-2'>12. Changes to This Privacy Policy</p>
                      <p className='font-black pt-2 pb-2'>13. Questions; Contacting Us; Reporting Violations</p>
                    </ModalBody>
                    <ModalFooter>
                      <Button className= "mt-5" onPress={onClosePrivacy}>
                        Okay, I understand
                      </Button>
                    </ModalFooter>
                    </>
                    )}
                    </ModalContent>
                </Modal>
              <li><Button onPress={onOpenTerms}>Terms and Service</Button></li>
                <Modal isOpen={isTermsOpen} onOpenChange={onOpenChangeTerms} 
                classNames={{
                body: "py-5 px-5",
                backdrop: "bg-[#121212]/50 backdrop-opacity-40",
                base: "border-[#ffffff] bg-[#131418] dark:bg-[#d9d9d9] text-[#ffffff] dark:text-[#131418]",
                header: "border-b-[1px] border-[#292f46] py-5 mr-5 ",
                footer: "border-t-[1px] border-[#292f46] mr-5 ml-5",
                }}>
                  
                <ModalContent>{(onCloseTerms) => (
                <>
                <ModalHeader className="flex flex-col gap-1 ml-5">Terms And Conditions</ModalHeader>
                <ModalBody>
                  <p className='font-black pb-2 mb-1'> 
                  Last Updated: February 12, 2024 
                  </p>
                  <p>
                  JARS NFT, Inc.JARS (“JARS”, “we”, “us”, or “our”) is committed to protecting your privacy. We have prepared this Privacy Policy to describe to you our practices regarding the information we collect, use, and share in connection with &nbsp; 
                  our website, mobile app, and other services we and our affiliates provide to you (collectively, the &quot;Service&quot;).
                  </p>
                  <p className='font-black pt-2 pb-2'>1. Types of Information We Collect</p>
                  <p className='font-black pt-2 pb-2'>2. Use of Your Information</p>
                  <p className='font-black pt-2 pb-2'>3. Disclosure of Your Information</p>
                  <p className='font-black pt-2 pb-2'>4. Third-Party Websites</p>
                  <p className='font-black pt-2 pb-2'>5. Third-Party Wallets</p>
                  <p className='font-black pt-2 pb-2'>6. Your Choices Regarding Information</p>
                  <p className='font-black pt-2 pb-2'>7. Data Access and Control</p>
                  <p className='font-black pt-2 pb-2'>8. Data Retention</p>
                  <p className='font-black pt-2 pb-2'>9. Security</p>
                  <p className='font-black pt-2 pb-2'>10. Minors</p>
                  <p className='font-black pt-2 pb-2'>11. Users Outside of the United States</p>
                  <p className='font-black pt-2 pb-2'>12. Changes to This Privacy Policy</p>
                  <p className='font-black pt-2 pb-2'>13. Questions; Contacting Us; Reporting Violations</p>
                </ModalBody>
                <ModalFooter>
                  <Button className= "mt-5" onPress={onCloseTerms}>
                    Okay, I understand
                  </Button>
                </ModalFooter>
                </>
                )}
                </ModalContent>
                </Modal>
            </div>
          </ul>
        </div>
      </section>
    </footer>
  )
}

function SocialLinkButton({ Icon, link }: { Icon: IconType, link: string }) {
  return (
    <Link href={link}>
      <div className='w-[50px] h-[50px] bg-[#d9d9d9] dark:bg-slate-900 dark:text-gray-500 text-2xl rounded-[10px] flex items-center justify-center'>
        <Icon />
      </div>
    </Link>
  )
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='w-[50px] h-[50px] bg-[#d9d9d9] dark:text-[#444444] text-2xl rounded-[10px]  cursor-pointer'>
      {theme === "dark" ? (
        <div className='w-full h-full flex items-center justify-center' onClick={() => setTheme("light")}>
          <Moon className='h-6 w-6' />
        </div>

      ) : (
        <div className='w-full h-full flex items-center justify-center' onClick={() => setTheme("dark")}>
          <Sun className='h-6 w-6' />
        </div>
      )}
    </div>
  )
}