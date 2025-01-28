import { useState } from "react";
import CreateShortURL from "../components/CreateShortURL";
import { OverallStats } from "../components/OverallStats";
import { UrlCard } from "../components/UrlCard";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
const MOCK_URLS = [
  {
    id: "abc123",
    createdAt: new Date("2025-01-26T19:00:00+05:30"),
    updatedAt: new Date("2025-01-26T19:00:00+05:30"),
    userId: "user123",
    topic: "Marketing",
    longUrl: "https://example.com/very/long/url/that/needs/shortening",
    shortKey: "xK9p2mL",
    customAlias: null,
  },
  {
    id: "def456",
    createdAt: new Date("2025-01-27T10:30:00+05:30"),
    updatedAt: new Date("2025-01-27T10:30:00+05:30"),
    userId: "user123",
    topic: "Sales",
    longUrl: "https://example.com/sales/winter/campaign/2025",
    shortKey: "bN4k8jR",
    customAlias: "winter-sale",
  },
  {
    id: "ghi789",
    createdAt: new Date("2025-01-27T14:15:00+05:30"),
    updatedAt: new Date("2025-01-27T14:15:00+05:30"),
    userId: "user123",
    topic: "Blog",
    longUrl: "https://example.com/blog/top-10-tips",
    shortKey: "hT5m3vQ",
    customAlias: "top-tips",
  },
  {
    id: "jkl012",
    createdAt: new Date("2025-01-27T16:45:00+05:30"),
    updatedAt: new Date("2025-01-27T16:45:00+05:30"),
    userId: "user123",
    topic: null,
    longUrl: "https://example.com/products/new-launch",
    shortKey: "pL7w4sY",
    customAlias: "new-product",
  },
  {
    id: "mno345",
    createdAt: new Date("2025-01-28T09:20:00+05:30"),
    updatedAt: new Date("2025-01-28T09:20:00+05:30"),
    userId: "user123",
    topic: "Marketing",
    longUrl: "https://example.com/webinar/registration",
    shortKey: "cF2h9nX",
    customAlias: "webinar",
  },
  {
    id: "pqr678",
    createdAt: new Date("2025-01-28T11:00:00+05:30"),
    updatedAt: new Date("2025-01-28T11:00:00+05:30"),
    userId: "user123",
    topic: "Support",
    longUrl: "https://example.com/help/faq",
    shortKey: "vB6g4mK",
    customAlias: "help",
  },
  {
    id: "stu901",
    createdAt: new Date("2025-01-28T13:30:00+05:30"),
    updatedAt: new Date("2025-01-28T13:30:00+05:30"),
    userId: "user123",
    topic: null,
    longUrl: "https://example.com/events/annual-meetup",
    shortKey: "qR8t5wZ",
    customAlias: "meetup",
  },
  {
    id: "vwx234",
    createdAt: new Date("2025-01-28T15:45:00+05:30"),
    updatedAt: new Date("2025-01-28T15:45:00+05:30"),
    userId: "user123",
    topic: "Social",
    longUrl: "https://example.com/social/share",
    shortKey: "kL4j7hD",
    customAlias: null,
  },
  {
    id: "yza567",
    createdAt: new Date("2025-01-26T20:15:00+05:30"),
    updatedAt: new Date("2025-01-26T20:15:00+05:30"),
    userId: "user123",
    topic: "Marketing",
    longUrl: "https://example.com/promo/special-offer",
    shortKey: "mN9p6sX",
    customAlias: "special-offer",
  },
  {
    id: "bcd890",
    createdAt: new Date("2025-01-27T12:00:00+05:30"),
    updatedAt: new Date("2025-01-27T12:00:00+05:30"),
    userId: "user123",
    topic: "Sales",
    longUrl: "https://example.com/products/clearance",
    shortKey: "tH5k8wQ",
    customAlias: "clearance",
  },
  {
    id: "efg123",
    createdAt: new Date("2025-01-27T17:30:00+05:30"),
    updatedAt: new Date("2025-01-27T17:30:00+05:30"),
    userId: "user123",
    topic: null,
    longUrl: "https://example.com/newsletter/signup",
    shortKey: "yB3m7vR",
    customAlias: "newsletter",
  },
  {
    id: "hij456",
    createdAt: new Date("2025-01-28T08:45:00+05:30"),
    updatedAt: new Date("2025-01-28T08:45:00+05:30"),
    userId: "user123",
    topic: "Blog",
    longUrl: "https://example.com/blog/latest-post",
    shortKey: "fK9n4hL",
    customAlias: "latest",
  },
  {
    id: "klm789",
    createdAt: new Date("2025-01-28T10:20:00+05:30"),
    updatedAt: new Date("2025-01-28T10:20:00+05:30"),
    userId: "user123",
    topic: "Support",
    longUrl: "https://example.com/support/contact",
    shortKey: "wP6t2sM",
    customAlias: "contact",
  },
  {
    id: "nop012",
    createdAt: new Date("2025-01-28T14:00:00+05:30"),
    updatedAt: new Date("2025-01-28T14:00:00+05:30"),
    userId: "user123",
    topic: "Social",
    longUrl: "https://example.com/social/campaign",
    shortKey: "gT8r5vN",
    customAlias: "social-campaign",
  },
  {
    id: "qrs345",
    createdAt: new Date("2025-01-26T21:30:00+05:30"),
    updatedAt: new Date("2025-01-26T21:30:00+05:30"),
    userId: "user123",
    topic: "Marketing",
    longUrl: "https://example.com/ads/promotion",
    shortKey: "jH4m9wX",
    customAlias: "promo",
  },
  {
    id: "tuv678",
    createdAt: new Date("2025-01-27T13:15:00+05:30"),
    updatedAt: new Date("2025-01-27T13:15:00+05:30"),
    userId: "user123",
    topic: "Sales",
    longUrl: "https://example.com/flash-sale",
    shortKey: "cB7k4nQ",
    customAlias: "flash",
  },
  {
    id: "wxy901",
    createdAt: new Date("2025-01-27T18:45:00+05:30"),
    updatedAt: new Date("2025-01-27T18:45:00+05:30"),
    userId: "user123",
    topic: null,
    longUrl: "https://example.com/download/app",
    shortKey: "pL5t8sR",
    customAlias: "get-app",
  },
  {
    id: "zab234",
    createdAt: new Date("2025-01-28T09:00:00+05:30"),
    updatedAt: new Date("2025-01-28T09:00:00+05:30"),
    userId: "user123",
    topic: "Blog",
    longUrl: "https://example.com/blog/featured",
    shortKey: "mK2h6vW",
    customAlias: "featured",
  },
  {
    id: "cde567",
    createdAt: new Date("2025-01-28T12:30:00+05:30"),
    updatedAt: new Date("2025-01-28T12:30:00+05:30"),
    userId: "user123",
    topic: "Support",
    longUrl: "https://example.com/help/guides",
    shortKey: "nT9r4sY",
    customAlias: "guides",
  },
  {
    id: "fgh890",
    createdAt: new Date("2025-01-28T16:15:00+05:30"),
    updatedAt: new Date("2025-01-28T16:15:00+05:30"),
    userId: "user123",
    topic: "Social",
    longUrl: "https://example.com/social/contest",
    shortKey: "bH7m3wQ",
    customAlias: "contest",
  },
];

export default function Dashboard() {
  const [urls] = useState(MOCK_URLS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  // Get unique topics
  const topics = [
    "all",
    ...new Set(MOCK_URLS.map((url) => url.topic).filter(Boolean)),
  ];

  const filteredUrls = urls.filter((url) => {
    const matchesTopic = selectedTopic === "all" || url.topic === selectedTopic;
    const matchesSearch =
      url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (url.customAlias &&
        url.customAlias.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTopic && matchesSearch;
  });

  return (
    <div className="flex h-screen flex-col p-5">
      <div className="flex items-center justify-between pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shortened URLs and track their performance
          </p>
        </div>
        <CreateShortURL />
      </div>

      <div className="mb-8">
        <OverallStats />
      </div>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Your URLs</h2>
          <div className="flex items-center gap-4">
            <Select value={selectedTopic} onValueChange={setSelectedTopic}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by topic" />
              </SelectTrigger>
              <SelectContent>
                {topics.map(
                  (topic) =>
                    topic && (
                      <SelectItem key={topic} value={topic}>
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                      </SelectItem>
                    ),
                )}
              </SelectContent>
            </Select>

            <Input
              type="search"
              placeholder="Search URLs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-[300px]"
            />
          </div>
        </div>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 pb-4">
            {filteredUrls.map((url) => (
              <UrlCard key={url.id} {...url} />
            ))}
          </div>
          {filteredUrls.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No URLs found matching your criteria
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
