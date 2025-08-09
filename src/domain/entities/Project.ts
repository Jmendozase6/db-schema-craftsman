export type Project = {
  id: string;
  sqlScript: string;
  dialect: 'mysql' | 'postgresql' | 'sqlite' | 'sqlserver';
  checklistState: Record<string, 'passed' | 'failed' | 'unchecked'>;
}