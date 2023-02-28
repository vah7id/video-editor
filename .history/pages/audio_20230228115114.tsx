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
import { BoltIcon, DownloadIcon, Spinner } from "../components/icons";
import { ProgressBar } from "../components/progress";
import {
  AudioFormatSelect,
  VideoFormatSelect,
} from "../components/video_format_selects";
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

export default function VideoPage() {
  const [video] = useContext(VideoContext);
  const [progress, setProgress] = useState<ProgressEvent>();
  const [lastFormat, setLastFormat] = useState<ConvertInstructions>();
  const [error, setError] = useState<string>();
  const [result, setResult] = useState<File>();
    console.log(video)
  // reset result when video changes
  useEffect(() => {
    setProgress(undefined);
    setLastFormat(undefined);
    setResult(undefined);
    if (!video) {
      Router.push("/").catch(console.error);
    }
  }, [video]);

  const start = async (format: ConvertInstructions) => {
    /*if (video?.status !== "known") {
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
    }*/
  };

  const stop = () => {
    ensureFreshFfmpegInstance();
    setProgress(undefined);
    setResult(undefined);
    setError(undefined);
  };

 
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


  if (video?.status === "known") {
    return (
      <>test</>
    );
  }

  return (
    <Head>
      <title>Just a sec...</title>
      <meta name="robots" content="noindex" />
    </Head>
  );
}
