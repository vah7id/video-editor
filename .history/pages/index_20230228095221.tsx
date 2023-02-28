import classNames from "classnames";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { SoftwareApplication } from "schema-dts";
import { AddFileIcon, ChevronDownIcon } from "../components/icons";
import { Markdown } from "../components/markdown";
import { ensureFreshFfmpegInstance } from "../src/ffmpeg";
import { t } from "../src/intl";
import { VideoContext } from "./_app";
import { JsonLd } from "react-schemaorg";
import { Button } from "../components/button";
import { DemoTimeline } from "../components/demo";
import { Link } from "../components/link";

export default function Start() {
  const [video, setVideo] = useContext(VideoContext);
  const [error, setError] = useState<string | undefined>();
  const { pathname } = useRouter();

  useEffect(() => {
    ensureFreshFfmpegInstance((e) => setError(String(e)));
    Router.prefetch("/video").catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>Video Trim & Compressor Tool</title>
        <meta name="description" content={t("upload.description")} />
        <meta name="og:title" content={t("upload.title")} />
        <meta name="og:description" content={t("upload.description")} />
        <meta
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/og.png`}
        />
        <meta
          name="og:url"
          content={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
        />
        <JsonLd<SoftwareApplication>
          item={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Clip",
            url: `${process.env.NEXT_PUBLIC_HOST}/`,
            image: `${process.env.NEXT_PUBLIC_HOST}/og.png`,
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

      <div className="text-black ">
        <div className="container mx-auto md:py-16 widescreen:min-h-screen flex flex-row-reverse flex-wrap items-center justify-center relative">
          <div className="md:w-7/12 p-2">
            <h1 className="text-5xl font-semibold whitespace-pre-wrap text-center my-8 motion-safe:animate-fly-1">
              {t("upload.title")}
            </h1>
            <div className="text-center motion-safe:animate-fly-2">
              <Markdown>{t("upload.description")}</Markdown>
              <input
                type="file"
                id="file"
                accept="video/*,audio/*"
                disabled={!!error}
                className="sr-only peer"
                onChange={({ currentTarget }) => {
                  setVideo(currentTarget.files?.[0], "selected");
                }}
              />
              <label
                htmlFor="file"
                className={classNames(
                  "inline-block relative px-5 py-3 text-2xl rounded-3xl bg-red-900 hover:bg-red-800 shadow-lg shadow-red-900/30 text-white text-xl cursor-pointer peer-focus:ring",
                  { "opacity-50 cursor-not-allowed": !!error }
                )}
              >
                {!error && (
                  <div className="absolute inset-0 rounded-3xl bg-red-900/20 animate-ping pointer-events-none print:hidden motion-reduce:hidden" />
                )}
                <div className="relative">
                  <AddFileIcon className="align-text-bottom mr-2 -ml-1" />
                  {t("upload.button")}
                  <span className="block text-sm text-red-200">
                    {t("upload.drop_hint")}
                  </span>
                </div>
              </label>
              <p
                className={classNames("my-4 h-min-3l whitespace-pre-wrap", {
                  "text-red-200": error !== undefined,
                })}
              >
                {error}
              </p>
            </div>
          </div>
          
        </div>
       
      </div>
    </>
  );
}
