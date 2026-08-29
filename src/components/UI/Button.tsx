import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  badge?: ReactNode;
  children?: ReactNode;
}

export function Button({
  variant = "primary",
  badge,
  className,
  children,
  ...rest
}: Props) {
  const cls =
    variant === "primary"
      ? "btn btn-primary"
      : variant === "secondary"
      ? "btn btn-secondary"
      : "btn btn-icon";

  if (badge) {
    return (
      <div className={styles.iconWrap}>
        <button className={`${cls} ${className ?? ""}`} {...rest}>
          {children}
        </button>
        <span className={styles.badge}>{badge}</span>
      </div>
    );
  }

  return (
    <button className={`${cls} ${className ?? ""}`} {...rest}>
      {children}
    </button>
  );
}
