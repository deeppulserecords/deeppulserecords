import Image from "next/image";

type LogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  priority?: boolean;
};

const sizes = {
  sm: "h-10 w-10",
  md: "h-16 w-16",
  lg: "h-32 w-32 md:h-40 md:w-40"
};

export function Logo({ size = "md", className, priority = false }: LogoProps) {
  return (
    <div className={["overflow-hidden rounded-[1.25rem] bg-ink shadow-soft", sizes[size], className].filter(Boolean).join(" ")}>
      <Image src="/brand/deeppulse-logo.svg" alt="DEEPPULSE RECORDS" width={320} height={320} priority={priority} className="h-full w-full object-cover" />
    </div>
  );
}
