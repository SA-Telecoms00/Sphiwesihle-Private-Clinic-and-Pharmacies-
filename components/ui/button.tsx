import Link from "next/link";
import { cn } from "@/lib/cn";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "whatsapp"
  | "inverse"
  | "danger";
export type ButtonSize = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-pill transition-colors transition-shadow duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-600 text-white shadow-soft hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "bg-brand-50 text-brand-700 hover:bg-brand-100 border border-brand-100",
  outline:
    "border border-border bg-bg text-ink hover:bg-surface hover:border-brand-200",
  ghost: "text-ink hover:bg-surface",
  whatsapp: "bg-whatsapp text-white shadow-soft hover:bg-whatsapp-dark",
  inverse: "bg-white text-brand-800 shadow-soft hover:bg-brand-50",
  danger: "bg-danger text-white shadow-soft hover:bg-red-700",
};

const sizes: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-5 py-2.5 sm:text-base",
  lg: "text-base px-6 py-3.5",
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } =
      props as AsLink;
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...rest}>
          {children}
        </Link>
      );
    }
    return (
      <a className={classes} {...rest} href={href}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } =
    props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
