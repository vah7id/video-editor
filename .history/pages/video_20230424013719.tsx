import Head from "next/head";
import Router from "next/router";
import {
  useContext,
  useEffect,
  useMemo,
  useState,
  HTMLAttributes,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../components/button";
import { AddFileIcon, BoltIcon, DownloadIcon, Spinner } from "../components/icons";
import { ProgressBar } from "../components/progress";
import {
  AudioFormatSelect,
  VideoFormatSelect,
} from "../components/video_format_selects";
import { gtag, install } from 'ga-gtag';

import { VideoTimeline } from "../components/video_timeline";
import { ensureFreshFfmpegInstance } from "../src/ffmpeg";
import { t } from "../src/intl";
import { trackEvent } from "../src/tracker";
import {
  BrokenVideo,
  convertVideo,
  KnownVideo,
  NewVideo,
  getAudioFormats,
  getVideoFormats,
  ProgressEvent,
  convertVideoWithEffect,
} from "../src/video";
import { VideoContext } from "./_app";
import { useObjectURL } from "../src/use_object_url";
import { VideoDetails } from "../components/video_details";
import { useThumbnails } from "../src/use_thumbnails";
import {
  calculateDuration,
  ConvertInstructions,
  mergeContainers,
} from "../src/video_convert_format";
import Image from "next/image";
import logo1 from '../public/logo1.png';
import Link from "next/link";

export default function VideoPage() {
  const [video] = useContext(VideoContext);
  const [progress, setProgress] = useState<ProgressEvent>();
  const [lastFormat, setLastFormat] = useState<ConvertInstructions>();
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<File>();

  // reset result when video changes
  useEffect(() => {
    setProgress(undefined);
    setLastFormat(undefined);
    install('G-9S7PGDK85T');
    setResult(undefined);
    if (!video) {
      Router.push("/").catch(console.error);
    }
  }, [video]);

  const addEffect = async (format: ConvertInstructions, effectName: 'string') => {
    if (video?.status !== "known") {
      throw new Error("Video is not known");
    }
    console.log(effectName)

    const startTime = Date.now();
    const presetStr = [
      format.video.original ? "original" : format.video.preset,
      format.audio?.original ? "original" : format.audio?.preset,
      `${2 ** Math.round(Math.log2(calculateDuration(format)))}s`,
    ].join(":");
    const formatStr = [
      video.metadata.video.codec,
      video.metadata.audio?.codec,
      `${2 ** Math.round(Math.log2(video.metadata.container.duration))}s`,
    ].join(":");
    try {
      console.log("convert using format", format);
      trackEvent("convert-start", presetStr, formatStr);
      setProgress({ percent: 0 });
      setLastFormat(format);
      const convertedVideo = await convertVideoWithEffect(video, format, setProgress, effectName);
      trackEvent(
        "convert-effect-finish",
        presetStr,
        formatStr,
        (Date.now() - startTime) / 1000
      );
      console.log("converted effect video", convertedVideo);
      setResult(convertedVideo.file);
      setProgress(undefined);
    } catch (e) {
      trackEvent(
        "effect-error",
        presetStr,
        String(e),
        (Date.now() - startTime) / 1000
      );
      setError(String(e));
      throw e;
    }

  }

  const start = async (format: ConvertInstructions) => {
    if (video?.status !== "known") {
      throw new Error("Video is not known");
    }

    const startTime = Date.now();
    const presetStr = [
      format.video.original ? "original" : format.video.preset,
      format.audio?.original ? "original" : format.audio?.preset,
      `${2 ** Math.round(Math.log2(calculateDuration(format)))}s`,
    ].join(":");
    const formatStr = [
      video.metadata.video.codec,
      video.metadata.audio?.codec,
      `${2 ** Math.round(Math.log2(video.metadata.container.duration))}s`,
    ].join(":");
    try {
      console.log("convert using format", format);
      trackEvent("convert-start", presetStr, formatStr);
      setProgress({ percent: 0 });
      setLastFormat(format);
      const convertedVideo = await convertVideo(video, format, setProgress);
      trackEvent(
        "convert-finish",
        presetStr,
        formatStr,
        (Date.now() - startTime) / 1000
      );
      console.log("converted video", convertedVideo);
      setResult(convertedVideo.file);
      setProgress(undefined);
    } catch (e) {
      trackEvent(
        "convert-error",
        presetStr,
        String(e),
        (Date.now() - startTime) / 1000
      );
      setError(String(e));
      throw e;
    }
  };

  const stop = () => {
    ensureFreshFfmpegInstance();
    setProgress(undefined);
    setResult(undefined);
    setError(undefined);
  };

  if (result && video?.status === "known") {
    return <DownloadPage video={video} file={result} reset={stop} />;
  }

  if (error && video?.status === "known") {
    return <ErrorConvert video={video} error={error} reset={stop} />;
  }

  if (progress && video?.status === "known") {
    return (
      <ProgressPage
        video={video}
        progress={progress}
        cancel={stop}
        format={lastFormat}
      />
    );
  }

  if (video?.status === "new") {
    return <AnalyseVideo video={video} />;
  }

  if (video?.status === "broken") {
    return <ErrorVideo video={video} />;
  }

  if (video?.status === "known") {
    return (
      <ConvertPage video={video} start={start} defaultValues={lastFormat} />
    );
  }

  return (
    <Head>
      <title>Just a sec...</title>
      <meta name="robots" content="noindex" />
    </Head>
  );
}

function AnalyseVideo({ video }: { video: NewVideo }) {
  return (
    <>
      <Head>
        <title>{t("analyse.title", { name: video.file.name })}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-lg mx-auto motion-safe:animate-fly-1">
        <h1 className="text-2xl text-center my-4">
          <Spinner className="mr-2 align-middle" />
          {t("analyse.title", { name: video.file.name })}
        </h1>
      </div>
    </>
  );
}

function ErrorVideo({ video }: { video: BrokenVideo }) {
  return (
    <>
      <Head>
        <title>{t("broken.title", { name: video.file.name })}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl text-center my-4 animate-fly-1">
          {t("broken.title", { name: video.file.name })}
        </h1>
        <div className="motion-safe:animate-fly-2">
          {video.message && (
            <p className="my-4 text-red-800">{video.message}</p>
          )}
        </div>
        <div className="text-center animate-fly-3">
          <Button
            href="/"
            className="px-4 py-2  bg-slate-500 hover:bg-slate-400 text-white"
          >
            {t("conversion.button.change")}
          </Button>
        </div>
      </div>
    </>
  );
}

function ErrorConvert({
  video,
  error,
  reset,
}: {
  video: KnownVideo;
  error: string;
  reset: () => void;
}) {
  return (
    <>
      <Head>
        <title>{t("broken.title", { name: video.file.name })}</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl text-center my-4 animate-fly-1">
          {t("broken.title", { name: video.file.name })}
        </h1>
        <div className="motion-safe:animate-fly-2">
          {error && <p className="my-4 text-red-800">{error}</p>}
        </div>
        <div className="text-center animate-fly-3 flex flex-row gap-2 flex-wrap">
          <Button
            className="px-4 py-2  bg-slate-500 hover:bg-slate-400 text-white"
            onClick={reset}
          >
            {t("conversion.button.change_parameters")}
          </Button>
         {/*<Button
            className="px-4 py-2  bg-slate-500 hover:bg-slate-400 text-white"
            href={`https://github.com/Nemo64/clip/issues/new?${new URLSearchParams(
              {
                title: "Error converting video",
                body: [
                  "I got the error:",
                  "```\n" + error + "\n```",
                  "While converting a video with these stats:",
                  "```json\n" +
                    JSON.stringify(video.metadata, null, 2) +
                    "\n```",
                ].join("\n\n"),
              }
            )}`}
          >
            {t("conversion.button.report_issue")}
            </Button>*/}
        </div>
      </div>
    </>
  );
}

function ConvertPage({
  video: source,
  start,
  defaultValues = {
    containers: [
      {
        start: source.metadata.container.start,
        duration: Math.min(source.metadata.container.duration, 60),
      },
    ],
    video: undefined,
    audio: undefined,
  },
}: {
  video: KnownVideo;
  start: (format: ConvertInstructions) => Promise<void>;
  defaultValues?: Partial<ConvertInstructions>;
}) {
  const videoUrl = useObjectURL(source.file);
  const picInt = Math.max(source.metadata.container.duration / 30, 0.5);
  const pics = useThumbnails(source, picInt);

  const { control, handleSubmit, watch, getValues, setValue } =
    useForm<ConvertInstructions>({ defaultValues });

  const containers = watch("containers");
  const container = mergeContainers(containers);
  const audioFormats = useMemo(() => {
    const formats = getAudioFormats(source.metadata);
    const preset = getValues("audio.preset") ?? "bitrate_high";
    setValue("audio", formats.find((f) => f.preset === preset) ?? formats[0]);
    return formats;
  }, [source.metadata, getValues, setValue]);

  const audio = watch("audio");
  const videoFormats = useMemo(() => {
    const formats = getVideoFormats({
      ...source.metadata,
      container: { start: 0, duration: container.duration }, // choose formats based on video duration
      audio, // pass audio format to adjust the video format based on the leftover space
    });
    const preset =
      getValues("video.preset") ??
      localStorage?.getItem("video.preset") ??
      "size_8mb";
    setValue("video", formats.find((f) => f.preset === preset) ?? formats[0]);
    return formats;
  }, [source.metadata, container.duration, audio, getValues, setValue]);

  const video = watch("video");
  const instructions: ConvertInstructions = { containers, video, audio };

  const formatRules = {
    required: true,
    validate(format?: { implausible?: boolean }) {
      return !format?.implausible;
    },
  };

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
          <link rel="canonical" href="https://viddeo.app"></link>
     
      </Head>
      <div className="widescreen:min-h-screen container mx-auto flex flex-col justify-center">
        
        <Link href={'/'}><Image src={logo1} style={{cursor: 'pointer',maxWidth: '250px',display: 'block',position: 'relative',float: 'left',minWidth: '200px', margin: '0 auto 0px auto !important'}} alt="video trimmer compressor tool logo" /></Link>

        <form
          style={{borderBottom: '1px solid #ddd',
            paddingBottom: '100px'}}
          className="flex flex-wrap justify-center"
          onSubmit={handleSubmit(start)}
        >

          <div className="flex-grow px-4 motion-safe:animate-fly-5">

            <Controller
              control={control}
              name="containers"
              rules={{ minLength: 1 }}
              render={({ field: { ref, ...field } }) => (
                <VideoTimeline
                  className="max-h-[80vh] lg:max-h-screen py-2 lg:py-8 sticky top-0"
                  frame={source.metadata.container}
                  width={source.metadata.video.width}
                  height={source.metadata.video.height}
                  fps={source.metadata.video.fps}
                  videoSrc={videoUrl}
                  pics={pics}
                  picInt={picInt}
                  muted={audio?.preset === "none"}
                  {...field}
                />
              )}
            />
          </div>
          <div className="flex-auto p-2 lg:py-16 max-w-full lg:max-w-lg">
            <h1 style={{maxWidth: '220px', textTransform: 'uppercase'}} className="text-2xl mb-4 motion-safe:animate-fly-1">
              {t("conversion.title", { name: source.file.name })}
            </h1>

            <div className="mb-2 motion-safe:animate-fly-2">
              <label style={{ height: '36px', float: 'left', marginTop: '12px', width: '100%'}} htmlFor="video_format">
                 Video {t("conversion.video_quality.label")}:
              </label>
              <Controller
                control={control}
                name="video"
                
                rules={formatRules}
                render={({ field: { ref, onChange, ...field } }) => (
                  <VideoFormatSelect
                    formats={videoFormats}
                    id="video_format"
                    onChange={(newValue) => {
                      onChange(newValue);
                      if (newValue && "preset" in newValue && newValue.preset) {
                        localStorage.setItem("video.preset", newValue.preset);
                      }
                    }}
                    {...field}
                  />
                )}
              />
            </div>

            {!watch("video")?.codec.startsWith("gif") && (
              <div className="my-2 mt-2 motion-safe:animate-fly-3">
                <label  style={{ height: '36px', marginTop: '24px', float: 'left', width: '100%'}} htmlFor="audio_format">
                   {t("conversion.audio_quality.label")} Quality:
                </label>
                <Controller
                  control={control}
                  name="audio"
                  rules={formatRules}
                  render={({ field: { ref, ...field } }) => (
                    <AudioFormatSelect
                      formats={audioFormats}
                      id="audio_format"
                      {...field}
                    />
                  )}
                />
              </div>
            )}

            <div style={{flexWrap: 'wrap'}} className="flex gap-2 mt-8 motion-safe:animate-fly-4">
              <Button
                style={{width: '100%'}}
                type="submit"
                className="px-4 py-2 text-white"
              >
                <DownloadIcon className="align-bottom mr-2 -ml-1" />
                {t("conversion.button.start")} Video
              </Button>

              <Button
                href="/"
                style={{width: '100%', textAlign: 'center'}}
                className="px-4 py-2  bg-slate-500 hover:bg-slate-400 text-white"
              >
                <AddFileIcon className="align-bottom mr-2 -ml-1" />
                {t("conversion.button.change")}
              </Button>
            </div>

          
          </div>
        </form>
      </div>
    </>
  );
}

function ProgressPage({
  video,
  progress,
  format,
  cancel,
}: {
  video: KnownVideo;
  progress: ProgressEvent;
  format?: ConvertInstructions;
  cancel: () => void;
}) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>
          {"".padEnd(Math.round(progress.percent / 10), "▇").padEnd(10, "▁")}{" "}
          {t("progress.value", progress)}
        </title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="max-w-lg mx-auto p-2">
        <h1 className="text-2xl my-4 motion-safe:animate-fly-1">
          {t("progress.headline", { name: video.file.name })}
        </h1>
        <ProgressBar
          progress={progress.percent}
          className="my-4 motion-safe:animate-fly-2"
        >
          {t("progress.value", progress)}
        </ProgressBar>
        <p className="my-4 min-h-3l text-slate-500 text-xs font-mono">
          {progress?.message?.replace(/\s(?=\s*\d)/g, "\u00A0")}
        </p>
        <div className="flex flex-row gap-2">
          <Button
            onClick={cancel}
            className="px-4 py-2  bg-slate-500 hover:bg-slate-400 text-white"
          >
            {t("progress.button.cancel")}
          </Button>
        </div>
        {format !== undefined && (
          <VideoDetails video={video} instructions={format} className="mt-4" />
        )}
      </div>
    </>
  );
}

function DownloadPage({
  file,
  video,
  reset,
}: {
  file: File;
  video: KnownVideo;
  reset: () => void;
}) {
  const src = useObjectURL(file);
  const aspectRatio = `${video.metadata.video.width} / ${video.metadata.video.height}`;
  const maxWidth = `${
    (80 * video.metadata.video.width) / video.metadata.video.height
  }vh`;

  return (
    <>
      <Head>
        <title>{t("download.title", { name: file.name })}</title>
      </Head>
      <div
        className="block w-full max-h-[80vh] min-w-full "
        style={{ aspectRatio }}
      >
        <Result
          className="mx-auto h-full object-contain motion-safe:animate-fly-1"
          file={file}
          src={src!}
        />
      </div>
      <div
        className="mx-auto p-2 flex flex-row items-baseline justify-between flex-wrap gap-2 box-content"
        style={{ maxWidth }}
      >
        <h1 style={{textTransform: 'uppercase'}} className="mt-1 flex text-2xl motion-safe:animate-fly-2">
          {t("download.title", { name: file.name })}
        </h1>

        <div className="flex flex-row items-baseline gap-2 motion-safe:animate-fly-3" style={{flexWrap: 'wrap'}}>
          <Button
            href={src}
            style={{textTransform: 'uppercase'}}
            download={file.name}
            className="table px-4 py-2  bg-green-700 hover:bg-green-500 text-white"
          >
            <DownloadIcon className="align-bottom mr-2 -ml-1" />
            {file.type.startsWith("image/")
              ? t("download.image_button", {
                  size: Math.ceil(file.size / 1000),
                })
              : t("download.video_button", {
                  size: Math.ceil(file.size / 1000),
                })}
          </Button>

          <Button
            href="/"
            className="table relative px-4 py-2 bg-slate-500 hover:bg-slate-400 text-white"
          >
            {t("conversion.button.change")}
          </Button>

        
        </div>
      </div>
    </>
  );
}

interface ResultProps extends HTMLAttributes<HTMLElement> {
  file: File;
  src: string;
}

function Result({ file, src, ...props }: ResultProps) {
  if (!src) {
    return <>{t("download.loading")}</>;
  }

  if (file.type.startsWith("video/")) {
    return <video controls autoPlay={true} src={src} {...props} />;
  }

  return <img src={src} alt="" {...props} />;
}
