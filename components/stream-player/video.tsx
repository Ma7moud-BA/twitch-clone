"use client";

import { ConnectionState, Track } from "livekit-client";
import {
	useConnectionState,
	useRemoteParticipant,
	useTracks,
} from "@livekit/components-react";
import OfflineVideo from "./offlice-video";
import LoadingVideo from "./loading-video";
import LiveVideo from "./live-video";
type VideoProps = {
	hostName: string;
	hostIdentity: string;
};
const Video = ({ hostIdentity, hostName }: VideoProps) => {
	const connectionState = useConnectionState();
	const participants = useRemoteParticipant(hostIdentity);
	const tracks = useTracks([
		Track.Source.Camera,
		Track.Source.Microphone,
	]).filter((track) => {
		track.participant.identity === hostIdentity;
	});

	let content;
	console.log({
		participants,
		connectionState,
		CSC: ConnectionState.Connected,
		tl: tracks.length,
	});
	if (!participants && connectionState === ConnectionState.Connected) {
		content = <OfflineVideo username={hostName} />;
	} else if (!participants) {
		content = <LoadingVideo label={connectionState} />;
	} else {
		content = <LiveVideo participant={participants} />;
	}
	return <div className="aspect-video border-b group relative">{content}</div>;
};

export default Video;
