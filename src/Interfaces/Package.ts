import { ResourceType } from "./ResourceType";

export interface Package {
  id: string;
  metadata: {
    Created: number;
    FullIdent: string;
    Summary: string;
    Tags: string[];
    Thumb: string;
    Title: string;
    Type: ResourceType;
    Updated: number;
  };
}