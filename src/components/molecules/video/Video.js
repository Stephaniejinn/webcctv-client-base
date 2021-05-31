/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from "react";
import Hls from "hls.js";
import { isMobile } from "react-device-detect";

import "./style.less";

const Video = (props) => {
	const { source, showControls = false, setVideoSource } = props;
	const videoRef = useRef();
	const handleClick = (e) => {
		e.preventDefault();
		e.target.requestFullscreen();
	};

	useEffect(() => {
		if (!videoRef) return;

		const hls = new Hls({
			xhrSetup: (xhr, url) => {
				xhr.setRequestHeader(
					"authorization",
					`Bearer ${localStorage.getItem("token")}`
				);
			},
		});

		if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
			videoRef.current.src = source;
			videoRef.addEventListener("loadedmetadata", () => {
				videoRef.current.play();
			});
		} else if (Hls.isSupported()) {
			hls.attachMedia(videoRef.current);
			hls.on(Hls.Events.MEDIA_ATTACHED, () => {
				hls.loadSource(source);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					setVideoSource(true);
					videoRef.current.play();
				});
				hls.on(Hls.Events.ERROR, (_, data) => {
					if (data.response) {
						if (data.response.code === 404) {
							if (setVideoSource) {
								setVideoSource(false);
							}
						} else if (data.response.code === 401) {
							// jwt가 invalid 할 때
							if (setVideoSource) {
								setVideoSource(false);
							}
						}
					}
				});
			});
		} else {
			alert("실시간 영상이 지원되지 않는 브라우저입니다");
		}

		return () => {
			hls.destroy();
		};
	}, [source]);

	return (
		<video
			ref={videoRef}
			src={source}
			onClick={handleClick}
			muted
			autoPlay
			controls={isMobile || showControls}
			preload="auto"
		/>
	);
};

export default Video;
