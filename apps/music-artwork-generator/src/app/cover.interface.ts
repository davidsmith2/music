export interface CoverInfo {
  format: string;
  height: number;
  width: number;
  size: number;
}

export interface ReleaseInfo {
  title: string;
  artist: string;
  date: string;
  tracks: number;
  barcode: string;
  url: string;
}

export interface Cover {
  action: string;
  type: string;
  smallCoverUrl: string;
  bigCoverUrl: string;
  releaseInfo: ReleaseInfo;
  source: string;
  cache: boolean;
  coverInfo: CoverInfo
}