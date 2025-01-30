import { apiClient } from "@/lib/utils";
import { Link, MousePointerClick, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { NumberTicker } from "./ui/number-ticker";
type data = {
  totalClicks: number;
  totalUrls: number;
  uniqueUsers: number;
};
export function OverallStats() {
  const [analytics, setAnalytics] = useState<null | data>(null);
  const getOverallAnalytics = async () => {
    const result = await apiClient.get(`/api/analytics/overall`);
    const test = await apiClient.get(`/api/analytics/topic/linkedIn`);
    console.log(test.data);
    setAnalytics(result.data);
  };
  useEffect(() => {
    getOverallAnalytics();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total URLs</CardTitle>
          <Link className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker value={analytics?.totalUrls ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+20% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
          <MousePointerClick className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker value={analytics?.totalClicks ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+15% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <NumberTicker value={analytics?.uniqueUsers ?? 0} />
          </div>
          <p className="text-xs text-muted-foreground">+12% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
}
