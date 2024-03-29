import classNames from "classnames";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SoftwareApplication } from "schema-dts";
import { AddFileIcon, BoltIcon, ChevronDownIcon, DownloadIcon, TranslateIcon } from "../components/icons";
import { Markdown } from "../components/markdown";
import { ensureFreshFfmpegInstance } from "../src/ffmpeg";
import { t } from "../src/intl";
import { AudioContext, VideoContext } from "./_app";
import { JsonLd } from "react-schemaorg";
import { Button } from "../components/button";
import { DemoTimeline } from "../components/demo";
import { Link } from "../components/link";
import Image from "next/image";
import logo1 from '../public/logo1.png';
const install = require('ga-gtag');

export default function Start() {
  const [video, setVideo] = useContext(VideoContext);
  const [audio, setAudio] = useContext(AudioContext);

  const [error, setError] = useState<string | undefined>();
  const { pathname } = useRouter();

  useEffect(() => {
    install('G-9S7PGDK85T');
    ensureFreshFfmpegInstance((e) => setError(String(e)));
    Router.prefetch("/video").catch(console.error);
  }, []);

  const handleUpload = (currentTarget: any) => {
    //if(currentTarget.files?.[0].type.indexOf('audio') > -1) {
    //  setAudio(currentTarget.files?.[0], "selected")
    //} else {
      setVideo(currentTarget.files?.[0], "selected")
    //}
  }

  return (
    <>
      <Head>
        <title>Video Trimmer online Tool – Trim Cut and compress Video file</title>
        <meta charSet={"utf-8"} />
        <meta name="description" content={t("upload.description")} />
        <meta name="og:title" content={t("upload.title")} />
        <meta name="og:description" content={t("upload.description")} />
       
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    
        <link rel="shortcut icon" href="https:/viddeo.app/favicon.ico" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <meta name="description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, MKV etc." />
          <meta property="og:site_name" content="Video Candy" />
          <meta property="og:image" content={`https:/viddeo.app/logo1.png`} />
          <meta property="og:title" content="Video Trimmer – Trim and Cut Video Online" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://viddeo.app" />
          <meta property="og:description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, etc." />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@scfetch" />
          <meta name="twitter:creator" content="@scfetch" />
          <meta name="twitter:title" content="Video Trimmer – Trim and Cut Video Online" />
          <meta name="twitter:description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, etc." />
          <meta name="twitter:image:src" content={`https:/viddeo.app/logo1.png`} />
          <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="language" content="en" />
        <JsonLd<SoftwareApplication>
          item={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Viddeo",
            url: `${process.env.NEXT_PUBLIC_HOST}/`,
            image: `https://viddeo.app/logo1.png`,
            description: t("upload.description"),
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
            },
          }}
        />
      </Head>

      <div className="text-black break-inside-avoid">
        <div className="container mx-auto md:py-16 flex flex-row-reverse flex-wrap items-center justify-center relative">
          <div className="md:w-7/12 p-2">
          <Link href={'/'}><Image src={logo1} style={{minWidth: '200px', margin: '0 auto'}} alt="video trimmer compressor tool logo" /></Link>
            <h1 className="text-5xl font-semibold whitespace-pre-wrap text-center my-8 motion-safe:animate-fly-1">
              {t("upload.title")}
            </h1>
            <div style={{color: "#aaa"}} className="text-center motion-safe:animate-fly-2">
              <Markdown>{t("upload.description")}</Markdown>
             <>
             <br /><br />  <h4>Privacy policy</h4><br /><br /><p>
The company respects the privacy of its Service users. Please refer to the Companys Privacy Policy which explains how we collect, use, and disclose information that pertains to your privacy. When you access or use the Service, you signify your agreement to this Privacy Policy.

Registration; Rules for user conduct and use of the service
You need to be at least 13 years old to register for and use the Service.

If you are a user who signs up for the Service, will create a personalized account, which includes a unique account to access the Service and to receive messages from the Company. You agree to notify us immediately of any unauthorized use of your account. The Company will not be responsible for any liabilities, losses, or damages arising out of the unauthorized use of your member name and/or account.

Any premium plan you order from this Service is for personal use only and cannot be shared with other people.
</p><br /><br />
<h4>Use restrictions</h4><br /><br /><p>
Your permission to use the Site is conditioned upon the following Use Restrictions and Conduct Restrictions: You agree that you will not under any circumstances:

post any information that is abusive, threatening, obscene, defamatory, libelous, or racially, sexually, religiously, or otherwise objectionable and offensive;
use the service for any unlawful purpose or for the promotion of illegal activities;
attempt to, or harass, abuse or harm another person or group;
use another users account without permission;
provide false or inaccurate information when registering an account;
interfere or attempt to interfere with the proper functioning of the Service;
make any automated use of the system, or take any action that we deem to impose or to potentially impose an unreasonable or disproportionately large load on our servers or network infrastructure;
bypass any robot exclusion headers or other measures we take to restrict access to the Service or use any software, technology, or device to scrape, spider, or crawl the Service or harvest or manipulate data; or
publish or link to malicious content intended to damage or disrupt another users browser or computer.
Posting and conduct restrictions
When you create your own personalized account, you may be able to provide (User Content). You are solely responsible for the User Content that you post, upload, link to or otherwise make available via the Service. You agree that we are only acting as a passive conduit for your online distribution and publication of your User Content. The Company, however, reserves the right to remove any User Content from the Service at its discretion.
</p><p><br /><br />
<br /><br />The following rules pertain to User Content. By transmitting and submitting any User Content while using the Service, you agree as follows:

You are solely responsible for your account and the activity that occurs while signed in to or while using your account;
You will not post information that is malicious, false or inaccurate;
You will not submit content that is copyrighted or subject to third party proprietary rights, including privacy, publicity, trade secret, etc., unless you are the owner of such rights or have the appropriate permission from their rightful owner to specifically submit such content; and
You hereby affirm we have the right to determine whether any of your User Content submissions are appropriate and comply with these Terms of Service, remove any and/or all of your submissions, and terminate your account with or without prior notice.
You understand and agree that any liability, loss or damage that occurs as a result of the use of any User Content that you make available or access through your use of the Service is solely your responsibility. The Company is not responsible for any public display or misuse of your User Content. The Company does not, and cannot, pre-screen or monitor all User Content. However, at our discretion, we, or the technology we employ, may monitor and/or record your interactions with the Service.
</p><br /><br />
<h4>Online content disclaimer</h4><br /><br /><p>
Opinions, advice, statements, offers, or other information or content made available through the Service, but not directly by the Company, are those of their respective authors, and should not necessarily be relied upon. Such authors are solely responsible for such content. The Company does not guarantee the accuracy, completeness, or usefulness of any information on the Service and neither does the Company adopt nor endorse, nor is the Company responsible for the accuracy or reliability of any opinion, advice, or statement made by parties other than the Company. The Company takes no responsibility and assumes no liability for any User Content that you or any other user or third party posts or sends over the Service. Under no circumstances will the Company be responsible for any loss or damage resulting from anyones reliance on information or other content posted on the Service, or transmitted to users.

Though the Company strives to enforce these Terms of Use, you may be exposed to User Content that is inaccurate or objectionable. The Company reserves the right, but has no obligation, to monitor the materials posted in the public areas of the service or to limit or deny a users access to the Service or take other appropriate action if a user violates these Terms of Use or engages in any activity that violates the rights of any person or entity or which we deem unlawful, offensive, abusive, harmful or malicious. The Company shall have the right to remove any such material that in its sole opinion violates, or is alleged to violate, the law or this agreement or which might be offensive, or that might violate the rights, harm, or threaten the safety of users or others. Unauthorized use may result in criminal and/or civil prosecution under the law. If you become aware of misuse of our Service, please contact us at https://Viddeo.app.

Links to other sites and/or materials
As part of the Service, the Company may provide you with convenient links to third party web site(s) (Third Party Sites) as well as content or items belonging to or originating from third parties (theThird Party Applications, Software or Content). These links are provided as a courtesy to Service subscribers. The Company has no control over Third Party Sites and Third Party Applications, Software or Content or the promotions, materials, information, goods or services available on these Third Party Sites or Third Party Applications, Software or Content. Such Third Party Sites and Third Party Applications, Software or Content are not investigated, monitored or checked for accuracy, appropriateness, or completeness by the Company, and the Company is not responsible for any Third Party Sites accessed through the Site or any Third Party Applications, Software or Content posted on, available through or installed from the Site, including the content, accuracy, offensiveness, opinions, reliability, privacy practices or other policies of or contained in the Third Party Sites or the Third Party Applications, Software or Content. Inclusion of, linking to or permitting the use or installation of any Third Party Site or any Third Party Applications, Software or Content does not imply approval or endorsement thereof by the Company. If you decide to leave the Site and access the Third Party Sites or to use or install any Third Party Applications, Software or Content, you do so at your own risk and you should be aware that our terms and policies no longer govern. You should review the applicable terms and policies, including privacy and data gathering practices, of any site to which you navigate from the Site or relating to any applications you use or install from the site.

Copyright complaints and copyright agent
(a) Termination of Repeat Infringe Accounts. The Company respects the intellectual property rights of others and requests that the users do the same. The Company has adopted and implemented a policy that provides for the termination in appropriate circumstances of users of the Service who are repeat infringers The Company may terminate access for participants or users who are found repeatedly to provide or post protected third party content without necessary rights and permissions.

(b) Take-Down Notices. If you are a copyright owner or an agent thereof and believe, in good faith, that any materials provided on the Service infringe upon your copyrights, you may submit a notification pursuant by sending the following information in writing to the Companys designated copyright agent at Viddeo.app:
<br /><br /></p><p>
The date of your notification;
A Physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed;
A description of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are recovered by a single notification, a representative list of such works at that site;
A description of the material that is claimed to be infringing or to be the subject of infringing activity and information sufficient to enable us to locate such work;
Information reasonably sufficient to permit the service provider to contact you, such as an address, telephone number, and/or email address;
A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law; and
A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
(c) Counter-Notices. If you believe that your User Content that has been removed from the Site is not infringing, or that you have the authorization from the copyright owner, the copyright owners agent, or pursuant to the law, to post and use the content in your User Content, you may send a counter-notice containing the following information to our copyright agent using the contact information set forth above:
</p><br /><br />
Your physical or electronic signature;<br /><br />
A description of the content that has been removed and the location at which the content appeared before it was removed;
A statement that you have a good faith belief that the content was removed as a result of mistake or a misidentification of the content; and
Your name, address, telephone number, and email address, a statement that you consent to the laws of Cyprus and a statement that you will accept service of process from the person who provided notification of the alleged infringement.
If a counter-notice is received by the Company copyright agent, the Company may send a copy of the counter-notice to the original complaining party informing such person that it may reinstate the removed content in 10 business days. Unless the copyright owner files an action seeking a court order against the content provider, member or user, the removed content may (in the Companys discretion) be reinstated on the Site in 10 to 14 business days or more after receipt of the counter-notice.
<br /><br />
License grant<br /><br />
By posting any User Content via the Service, you expressly grant, and you represent and warrant that you have a right to grant, to the Company a royalty-free, sub licensable, transferable, perpetual, irrevocable, non-exclusive, worldwide license to use, reproduce, modify, publish, list information regarding, edit, translate, distribute, publicly perform, publicly display, and make derivative works of all such User Content and your name, voice, and/or likeness as contained in your User Content, if applicable, in whole or impart, and in any form, media or technology, whether now known or hereafter developed, for use in connection with the Service.

Intellectual property<br /><br />
You acknowledge and agree that we and our licensors retain ownership of all intellectual property rights of any kind related to the Service, including applicable copyrights, trademarks and other proprietary rights. Other product and business names that are mentioned on the Service may be trademarks of their respective owners. We reserve all rights that are not expressly granted to you under this Agreement.

Email may not be used to provide notice
Communications made through the Services e-mail and messaging system, will not constitute legal notice to the Company or any of its officers, employees, agents or representatives in any situation where notice to the Company is required by contract or any law or regulation.

User consent to receive communications in electronic form
For contractual purposes, you (a) consent to receive communications from the Company in an electronic form via the email address you have submitted; and (b) agree that all Terms of Use, agreements, notices, disclosures, and other communications that the Company provides to you electronically satisfy any legal requirement that such communications would satisfy if it were in writing. The foregoing does not affect your non-waivable rights.

We may also use your email address, to send you other messages, including information about the Company and special offers. You may opt out of such email by changing your account settings or sending an email to Viddeo.app.

Opting out may prevent you from receiving messages regarding the Company or Special Offers.
<br /><br />
Warranty<br /><br />
The service, is provided as is, without warranty of any kind. Without limiting the foregoing, the company expressly disclaims all warranties, whether express, implied or statutory, regarding the service including without limitation any warranty of merchantability, fitness for a particular purpose, title, security, accuracy and non-infringement. Without limiting the foregoing, the company makes no warranty or representation that access to or operation of the service will be uninterrupted or error free. You assume full responsibility and risk of loss resulting from your downloading and/or use of files, information, content or other material obtained from the service. Some jurisdictions limit or do not permit disclaimers of warranty, so this provision may not apply to you.

Limitation of damages; Release
To the extent permitted by applicable law, in no event shall the company, its affiliates, directors, or employees, or its licensors or partners, be liable to you for any loss of profits, use, or data, or for any incidental, indirect, special, consequential or exemplary damages, however arising, that result from (A) the use, disclosure, or display of your user content; (B) your use or inability to use the service; (C) the service generally or the software or systems that make the service available; or (D) any other interactions with the company or any other user of the service, whether based on warranty, contract, tort (including negligence) or any other legal theory, and whether or not the company has been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose. Some jurisdictions limit or do not permit disclaimers of liability, so this provision may not apply to you.

If you have a dispute with one or more users or a merchant of a product or service that you review using the Service, you release us (and our officers, directors, agents, subsidiaries, joint ventures and employees) from claims, demands and damages (actual and consequential) of every kind and nature, known and unknown, arising out of or in any way connected with such disputes.

Modification of terms of use
We can amend these Terms of Use at any time and will update these Terms of Use in the event of any such amendments. It is your sole responsibility to check the Site from time to time to view any such changes in the Agreement. If you continue to use the Site, you signify your agreement to our revisions to these Terms of Use. However, we will notify you of material changes to the terms by posting a notice on our homepage and/or sending an email to the email address you provided to us upon registration. For this additional reason, you should keep your contact and profile information current. Any changes to these Terms or waiver of the Companys rights hereunder shall not be valid or effective except in a written agreement bearing the physical signature of an officer of the Company. No purported waiver or modification of this Agreement by the Company via telephonic or email communications shall be valid.

<br /><br />

General terms
If any part of this Agreement is held invalid or unenforceable, that portion of the Agreement will be construed consistent with applicable law. The remaining portions will remain in full force and effect. Any failure on the part of the Company to enforce any provision of this Agreement will not be considered a waiver of our right to enforce such provision. Our rights under this Agreement will survive any termination of this Agreement.
<br /><br />
You agree that any cause of action related to or arising out of your relationship with the Company must commence within ONE year after the cause of action accrues. Otherwise, such cause of action is permanently barred.

These Terms of Use and your use of the Site are governed by the laws of Cyprus, without regard to conflict of law provisions.

The Company may assign or delegate these Terms of Service and/or the Companys Privacy Policy, in whole or in part, to any person or entity at any time with or without your consent. You may not assign or delegate any rights or obligations under the Terms of Service or Privacy Policy without the Companys prior written consent, and any unauthorized assignment and delegation by you is void.

You acknowledge that you have read these terms of use, understand the terms of use, and will be bound by these terms and conditions. You further acknowledge that these terms of use together with the privacy policy at https://Viddeo.app. Represent the complete and exclusive statement of the agreement between us and that it supersedes any proposal or prior agreement oral or written, and any other communications between us relating to the subject matter of this agreement.
</>
              
            </div>
          </div>
          
        </div>
       
      </div>
    </>
  );
}
