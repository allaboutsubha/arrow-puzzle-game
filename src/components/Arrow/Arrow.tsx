import { useMemo } from "react";
import type { ArrowState } from "../../levels/levelTypes";
import { isHorizontal } from "../../game/engine/collision";
import { DIRECTION_COLORS } from "../../utils/constants";
import styles from "./Arrow.module.css";

interface Props {
  arrow: ArrowState;
  exitOffset: { dx: number; dy: number } | null;
  hinted: boolean;
  shaking: boolean;
  onTap: (id: string) => void;
  onShakeEnd: () => void;
}

export function Arrow({
  arrow,
  exitOffset,
  hinted,
  shaking,
  onTap,
  onShakeEnd
}: Props) {
  const horizontal = isHorizontal(arrow.direction);
  const w = horizontal ? arrow.length : 1;
  const h = horizontal ? 1 : arrow.length;
  const pad = 0.09;
  const colors = DIRECTION_COLORS[arrow.direction];

  const bodyX = arrow.x + pad;
  const bodyY = arrow.y + pad;
  const bodyW = w - pad * 2;
  const bodyH = h - pad * 2;

  const headPoints = useMemo(() => {
    const cx = arrow.x + w / 2;
    const cy = arrow.y + h / 2;
    const hs = 0.16;
    switch (arrow.direction) {
      case "right": {
        const tipX = arrow.x + w - pad * 0.9;
        return `${tipX - hs * 1.3},${cy - hs} ${tipX - hs * 1.3},${cy + hs} ${tipX},${cy}`;
      }
      case "left": {
        const tipX = arrow.x + pad * 0.9;
        return `${tipX + hs * 1.3},${cy - hs} ${tipX + hs * 1.3},${cy + hs} ${tipX},${cy}`;
      }
      case "down": {
        const tipY = arrow.y + h - pad * 0.9;
        return `${cx - hs},${tipY - hs * 1.3} ${cx + hs},${tipY - hs * 1.3} ${cx},${tipY}`;
      }
      case "up": {
        const tipY = arrow.y + pad * 0.9;
        return `${cx - hs},${tipY + hs * 1.3} ${cx + hs},${tipY + hs * 1.3} ${cx},${tipY}`;
      }
    }
  }, [arrow.direction, arrow.x, arrow.y, w, h, pad]);

  const style = exitOffset
    ? { transform: `translate(${exitOffset.dx}px, ${exitOffset.dy}px)` }
    : undefined;

  const classes = [
    styles.piece,
    arrow.exited ? styles.exited : "",
    hinted ? styles.hinted : "",
    shaking ? styles.shaking : ""
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <g
      className={classes}
      style={style}
      tabIndex={0}
      role="button"
      aria-label={`${arrow.direction} arrow, length ${arrow.length}`}
      onPointerUp={(e) => {
        e.preventDefault();
        onTap(arrow.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onTap(arrow.id);
      }}
      onAnimationEnd={() => {
        if (shaking) onShakeEnd();
      }}
    >
      <rect
        className={styles.body}
        x={bodyX}
        y={bodyY}
        width={bodyW}
        height={bodyH}
        rx={0.16}
        fill={colors.body}
        stroke={colors.dark}
        strokeWidth={0.045}
      />
      <polygon points={headPoints} fill="#fff" opacity={0.92} />
    </g>
  );
}
