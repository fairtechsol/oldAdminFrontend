import { Presence, Socket } from "phoenix";
import { useEffect, useRef, useState } from "react";

interface UsePhoenixChannelProps {
  role: string;
  matchId: string | string[];
  userId: string;
}

interface UsePhoenixChannelReturn {
  data: any | null;
  presences: Record<string, any>;
}

export const usePhoenixChannel = ({
  role,
  matchId,
  userId,
}: UsePhoenixChannelProps): UsePhoenixChannelReturn => {
  const [data, setData] = useState<any | null>(null);
  const [presences, setPresences] = useState<Record<string, any>>({});
  const socketRef = useRef<Socket | null>(null);
  const channelRef = useRef<any>(null);

  const setupSocketAndChannel = () => {
    const socket = new Socket("wss://serviceexl.fairgame7.com/socket", {
      params: {
        roleName: role,
        matchIdArray: matchId,
        userId: userId,
      },
    });

    socket.connect();
    socketRef.current = socket;

    const channel = socket.channel("matches:lobby", {});
    channelRef.current = channel;

    const handleMatchData: any = (payload: any) => setData(payload);
    const handlePresenceState: any = (state: any) =>
      setPresences((prev) => Presence.syncState(prev, state));
    const handlePresenceDiff: any = (diff: any) =>
      setPresences((prev) => Presence.syncDiff(prev, diff));

    channel.on("match_data", handleMatchData);
    channel.on("presence_state", handlePresenceState);
    channel.on("presence_diff", handlePresenceDiff);

    channel
      .join()
      .receive("ok", () => console.log("✅ Joined matches:lobby"))
      .receive("error", (err: any) => console.error("❌ Failed to join:", err));

    return () => {
      channel.off("match_data", handleMatchData);
      channel.off("presence_state", handlePresenceState);
      channel.off("presence_diff", handlePresenceDiff);
      channel.leave().receive("ok", () => {
        socket.disconnect();
        console.log("🔌 Disconnected due to visibility change");
      });
    };
  };

  useEffect(() => {
    let cleanupFn = setupSocketAndChannel();

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cleanupFn?.(); // Disconnect when hidden
      } else if (document.visibilityState === "visible") {
        cleanupFn = setupSocketAndChannel(); // Reconnect when visible
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cleanupFn?.();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [role, matchId, userId]);

  return { data, presences };
};
