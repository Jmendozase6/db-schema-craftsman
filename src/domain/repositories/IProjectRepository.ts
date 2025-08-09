import type { Project } from "../entities/Project";

export interface IProjectRepository {
  get(): Promise<Project | null>;
  save(project: Project): Promise<void>;
}