import { ReactNode, useEffect, useState } from "react";
import { apiClient } from "../lib/utils";
import { Card } from "./ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Analytics, UrlType } from "./UrlCard";
const UrlAnalytics = ({
  children,
  urlData,
}: {
  children: ReactNode;
  urlData: UrlType;
}) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [open, setOpen] = useState(false);
  const getAnalytics = async () => {
    const result = await apiClient.get(
      `/api/analytics/${urlData.shortKey ?? urlData.customAlias}`,
    );
    setAnalytics(result.data);
  };
  useEffect(() => {
    if (open) {
      getAnalytics();
    }
  }, [open]);
  return (
    <Dialog modal={true} open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent>
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-lg font-semibold">
            Short URL Analytics
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto max-w-xl space-y-4 bg-background text-foreground">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-2 text-center">
              <span className="font-semibold">Total Clicks</span> -{" "}
              {analytics?.totalClicks}
            </Card>
            <Card className="p-2 text-center">
              <span className="font-semibold"> Unique Users</span> -{" "}
              {analytics?.uniqueUsers}
            </Card>
          </div>
          <div className="space-y-2">
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>OS Name</TableHead>
                    <TableHead>Unique Users</TableHead>
                    <TableHead>Unique Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.osType.map((eachOs) => (
                    <TableRow>
                      <TableCell>{eachOs.osName}</TableCell>
                      <TableCell className="text-center">
                        {eachOs.uniqueUsers}
                      </TableCell>
                      <TableCell className="text-center">
                        {eachOs.uniqueClicks}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Device Type</TableHead>
                    <TableHead>Unique Users</TableHead>
                    <TableHead>Unique Clicks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics?.deviceType.map((eachDevice) => (
                    <TableRow>
                      <TableCell>{eachDevice.deviceName}</TableCell>
                      <TableCell className="text-center">
                        {eachDevice.uniqueUsers}
                      </TableCell>
                      <TableCell className="text-center">
                        {eachDevice.uniqueClicks}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UrlAnalytics;
