import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_ASPECT = 1024 / 886;

const SIZES = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 44,
} as const;

type AsapLogoProps = {
  size?: keyof typeof SIZES;
  href?: string;
  className?: string;
  priority?: boolean;
};

export function AsapLogo({
  size = "md",
  href,
  className,
  priority = false,
}: AsapLogoProps) {
  const height = SIZES[size];
  const width = Math.round(height * LOGO_ASPECT);

  const image = (
    <Image
      src="/logo.png"
      alt="ASAP"
      width={width}
      height={height}
      priority={priority}
      className={cn("object-contain object-left", className)}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex shrink-0" aria-label="ASAP home">
        {image}
      </Link>
    );
  }

  return <span className="inline-flex shrink-0">{image}</span>;
}
