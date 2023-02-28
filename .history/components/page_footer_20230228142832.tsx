import classNames from "classnames";
import { useRouter } from "next/router";
import useLocalStorage from "use-local-storage";
import { t } from "../src/intl";
import { TranslateIcon } from "./icons";
import { Link } from "./link";
import NextLink from "next/link";
import { ForwardedRef, forwardRef } from "react";

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
    <div className="mt-2  pb-8 bg-slate-50print:min-h-0" style={{maxWidth:'768px', display: 'block', margin: '0 auto'}}>
      <footer>
        <ul style={{textTransform: 'uppercase', color: '#ccc', fontSize: '13px',  float: 'left'}}>
          <li>
            <Link href={'/'}>Home</Link>
          </li>
          <li>
            <Link href={'/'}>How it works?</Link>
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
          <li>
            <Link href={'/'}>Donate</Link>
          </li>
        </ul>
        <p>

        </p>
      </footer>
    </div>
  );
}
