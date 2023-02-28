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

export default function Start() {
  const [video, setVideo] = useContext(VideoContext);
  const [audio, setAudio] = useContext(AudioContext);

  const [error, setError] = useState<string | undefined>();
  const { pathname } = useRouter();

  useEffect(() => {
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
        <meta
          name="og:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/og.png`}
        />
        <meta
          name="og:url"
          content={`${process.env.NEXT_PUBLIC_HOST}${pathname}`}
        />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    
        <link rel="shortcut icon" href="https:/viddeo.app/favicon.ico" />
        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1" />
        <meta name="description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, MKV etc." />
          <meta property="og:site_name" content="Video Candy" />
          <meta property="og:image" content={`${process.env.NEXT_PUBLIC_HOST}/logo1.png`} />
          <meta property="og:title" content="Video Trimmer – Trim and Cut Video Online" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://viddeo.app" />
          <meta property="og:description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, etc."><meta name="twitter:card" content="summary_large_image"><meta name="twitter:site" content="@videocandytools"><meta name="twitter:creator" content="@videocandytools"><meta name="twitter:title" content="Video Trimmer – Trim and Cut Video Online"><meta name="twitter:description" content="Video trimmer enables you to trim (extract part of a video) and cut video (remove part of a video somewhere in the middle). Supported formats: MP4, MOV, WEBM, etc." />
          <meta name="twitter:image:src" content={`${process.env.NEXT_PUBLIC_HOST}/logo1.png`} />
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
          <meta name="language" content="en"><link rel="canonical" href="https://viddeo.app"></link>
        <JsonLd<SoftwareApplication>
          item={{
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "Clip",
            url: `${process.env.NEXT_PUBLIC_HOST}/`,
            image: `${process.env.NEXT_PUBLIC_HOST}/logo1.png`,
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
              <Markdown >{t("upload.description")}</Markdown>
              <input
                type="file"
                id="file"
                accept="video/*"
                disabled={!!error}
                className="sr-only peer mt-4"
                onChange={({ currentTarget }) => {
                  handleUpload(currentTarget)
                }}
              />
             
              <label
                htmlFor="file"
                style={{padding: '24px 60px', background: '#f8d231', textTransform: 'uppercase'}}
                className={classNames(
                  "inline-block mt-8 relative px-5 py-3 text-2xl bg-black text-black text-xl cursor-pointer",
                  { "opacity-50 cursor-not-allowed": !!error }
                )}
              >
                <div className="relative">
                  <AddFileIcon className="align-text-bottom mr-2 -ml-1" />
                  {t("upload.button")}
                </div>
              </label>
              <p style={{fontSize: '12px', textTransform: 'uppercase', color: '#aaa', margin: '20px 0'}}>
                Or Drag & Drop you video file here to start!
              </p>

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
