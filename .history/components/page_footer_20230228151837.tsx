import classNames from "classnames";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { t } from "../src/intl";
import { TranslateIcon } from "./icons";
import { Link } from "./link";
import NextLink from "next/link";
import { ForwardedRef, forwardRef } from "react";
import Image from "next/image";
import nlf  from '../public/nl.png';
const FLink = forwardRef(function FooterLink(
  props: Omit<Parameters<typeof Link>[0], "className">,
  ref: ForwardedRef<HTMLAnchorElement>
) {
  return (
    <Link
      {...props}
      className="hover:text-neutral-800 dark:hover:text-neutral-200"
      ref={ref}
    />
  );
});

export function Page_footer() {
  const { locale: currentLocale, locales, asPath } = useRouter();
  const [matomoEnabled, setMatomoEnabled] = useLocalStorage("matomo", true);

  return (
    <div className="mt-2  pb-8 bg-slate-50print:min-h-0" style={{maxWidth:'768px', display: 'block',  textAlign: 'center', margin: '0 auto'}}>
      <footer>
        <ul style={{textTransform: 'uppercase', textAlign: 'center', color: '#cacaca'}}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/'}>How it works?</Link>
          </li>
          <li>
            <Link href={'/'}>Terms & Conditions</Link>
          </li>
          <li>
            <Link href={'/'}>Video Trimmer</Link>
          </li>
          <li>
            <Link href={'/'}>Video Compressor</Link>
          </li>
          <li>
            <Link href={'/'}>Send Feedback</Link>
          </li>
        </ul>
        <Image style={{ display: 'block',  textAlign: 'center', margin: '20px auto'}} src={nlf} width={24} alt={'nl flag'} />
        <p style={{display: 'block', textDecoration: 'underline', width: '100%', fontSize: '11px', color: '#ccc'}}>
          MADE W LOVE IN AMS XXX<br />
          CPYWRT @2023 ALL RIGHTS RESERVED ( Ver1.1.42 )
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
video trimmer online free /
video cutter online converter /
youtube video cutter online /
trim large video online free /
video trimmer download /
youtube video trimmer /
video trimmer free /
online video editor /
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
        Online Video Cutter: This web app comes in handy when you need to cut a small video file. It does not require installation, and it works in your browser.
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
        Crop video: Cropping allows you to frame the video to the desired area or change frame proportions.
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
        Easy video trimming: After uploading your file, you can choose the quality and format of the output file. There are no complicated controls — every feature is just one or two clicks away.
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
        Video editing online: The app can cut video files right in your browser window. Files of up to 4 GB are supported, and we are about to raise this limit.
        </p>
        <p style={{width: '100%', fontSize: '10px !important', color: '#fff'}}>
        Any format you can think of: The app supports almost every video format out there. If your file fails to open, then it is probably damaged or it is too big.
        <br />
        Format-specific tools
GIF Cutter
Cut MKV
MOV Cutter
Trim WEBM
WMV Cutter
Trim MPEG
ASF Cutter

        </p>
      </footer>
    </div>
  );
}
