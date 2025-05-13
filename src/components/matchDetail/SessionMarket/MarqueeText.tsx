import { Box, Typography } from "@mui/material";
import React, { memo } from "react";

const MarqueeText = ({ children, index }: any) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [shouldMarquee, setShouldMarquee] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) return;

    const checkOverflow = () => {
      const container = containerRef.current;
      if (!container) return;

      const textEl = container.querySelector(".marquee-text");
      if (!textEl) return;

      setShouldMarquee(textEl.scrollWidth > container.clientWidth);
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, [children]);

  return (
    <Box
      ref={containerRef}
      sx={{
        background: index % 2 === 0 ? "#FFE094" : "#ECECEC",
        height: "10px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        position: "relative",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Typography
        className="marquee-text"
        sx={{
          color: "black",
          fontSize: "9px",
          fontWeight: "500",
          display: "inline-block",
          paddingLeft: shouldMarquee ? "100%" : "0",
          textAlign: shouldMarquee ? "left" : "right",
          paddingRight: "2px",
          width: "100%",
          animation: shouldMarquee ? "marquee 50s linear infinite" : "none",
          "@keyframes marquee": {
            "0%": { transform: "translateX(0)" },
            "100%": { transform: "translateX(-100%)" },
          },
          "&:hover": {
            animationPlayState: shouldMarquee ? "paused" : "running",
          },
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default memo(MarqueeText);
