import type { Project } from "../../domain/entities/Project";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";

const LOCAL_STORAGE_KEY = 'db_schema_craftsman_project';

const getWelcomeState = (): Project => ({
  id: 'default-project',
  dialect: 'mysql',
  sqlScript: `CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  title VARCHAR(255) NOT NULL,
  body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Intenta añadir una FK para ver cómo reacciona el checklist.
-- ALTER TABLE posts ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id);
`,
  checklistState: {},
});

export class LocalStorageProjectRepository implements IProjectRepository {

  async get(): Promise<Project> {
    try {
      const storedData = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) {
        return JSON.parse(storedData) as Project;
      }
    } catch (error) {
      console.error("Error retrieving project from localStorage:", error);
      window.localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
    return getWelcomeState();
  }

  async save(project: Project): Promise<void> {
    try {
      const dataToStore = JSON.stringify(project);
      window.localStorage.setItem(LOCAL_STORAGE_KEY, dataToStore);
    } catch (error) {
      console.error("Error saving project to localStorage:", error);
    }
  }
}