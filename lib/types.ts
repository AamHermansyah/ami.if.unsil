export type BulkResultItem = {
  id: string;
  status: "success" | "skipped" | "failed";
  reason?: string;
};

export type BulkResult = {
  success: number;
  skipped: number;
  failed: number;
  details: BulkResultItem[];
};