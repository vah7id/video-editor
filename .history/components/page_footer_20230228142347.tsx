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
    <div className="mt-2  pb-8 bg-slate-50print:min-h-0" style={{maxWidth:'768px', display: 'block'}}>
      <footer>asdasdas</footer>
    </div>
  );
}
