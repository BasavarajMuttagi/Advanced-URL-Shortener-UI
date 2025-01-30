import { formatDistanceToNow } from "date-fns";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

export interface UrlType {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  topic: string | null;
  longUrl: string;
  shortKey: string;
  customAlias: string | null;
}

export function UrlCard({
  longUrl,
  createdAt,
  topic,
  customAlias,
  shortKey,
}: UrlType) {
  const shortUrl = customAlias
    ? `${import.meta.env.VITE_FE_URL}/${customAlias}`
    : `${import.meta.env.VITE_FE_URL}/${shortKey}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    // You might want to add a toast notification here
  };

  const handleVisit = () => {
    window.open(shortUrl, "_blank");
  };

  return (
    <Card className="cursor-pointer transition-colors hover:bg-accent/50">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex flex-col space-y-1.5">
          <span className="font-semibold">{shortUrl}</span>
          <span className="max-w-[300px] truncate text-sm text-muted-foreground">
            {longUrl}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" onClick={handleVisit}>
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">
            Created {formatDistanceToNow(createdAt, { addSuffix: true })}
          </span>
          {topic && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {topic}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export type Analytics = {
  totalClicks: number;
  uniqueUsers: number;
  clicksByDate: {
    date: Date;
    count: number;
  }[];
  osType: {
    osName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
  deviceType: {
    deviceName: string;
    uniqueClicks: number;
    uniqueUsers: number;
  }[];
};
