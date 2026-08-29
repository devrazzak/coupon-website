import { ArrowRight } from 'lucide-react';

export function SectionHeading({
    title,
    subtitle,
    action,
}: {
    title: string;
    subtitle?: string;
    action?: string;
}) {
    return (
        <div className="mb-6 flex items-end justify-between gap-4">
            <div>
                <h2 className="font-display text-[26px] font-extrabold tracking-tight text-foreground md:text-[32px]">
                    {title}
                </h2>
                {subtitle && <p className="mt-1.5 text-[14px] text-muted-foreground">{subtitle}</p>}
            </div>
            {action && (
                <a
                    href="#"
                    className="inline-flex shrink-0 items-center gap-1.5 text-[13px] font-bold text-primary transition-colors hover:text-primary-hover"
                >
                    {action}
                    <ArrowRight className="h-3.5 w-3.5" />
                </a>
            )}
        </div>
    );
}
