import { ResourceType } from "./ResourceType";

export interface SearchRequest {
    query: string;
    type_filter: ResourceType[];
    take: number;
    skip: number;
}