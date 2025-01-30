import { useEffect, useState } from "react";
import CreateShortURL from "../components/CreateShortURL";
import { OverallStats } from "../components/OverallStats";
import UrlAnalytics from "../components/UrlAnalytics";
import { UrlCard, UrlType } from "../components/UrlCard";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { apiClient } from "../lib/utils";

export default function Dashboard() {
  const [urls, setUrls] = useState<UrlType[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const topics = [
    "all",
    ...new Set(urls.map((url) => url.topic).filter(Boolean)),
  ];

  const filteredUrls = urls.filter((url) => {
    const matchesTopic = selectedTopic === "all" || url.topic === selectedTopic;
    const matchesSearch =
      url.longUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (url.customAlias &&
        url.customAlias.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesTopic && matchesSearch;
  });

  const fetchUrls = async () => {
    const result = await apiClient.get("/api/shorten/list");
    setUrls(result.data);
  };

  useEffect(() => {
    fetchUrls();
  }, []);
  return (
    <div className="flex h-screen flex-col p-5">
      <div className="flex items-center justify-between pb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your shortened URLs and track their performance
          </p>
        </div>
        <CreateShortURL refetch={fetchUrls} />
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

        <ScrollArea className="flex-1">
          <div className="space-y-4 pb-4">
            {filteredUrls.map((url) => (
              <UrlAnalytics key={url.id} urlData={url}>
                <UrlCard {...url} />
              </UrlAnalytics>
            ))}
          </div>
          {filteredUrls.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              No Data
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
