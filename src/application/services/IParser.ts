export interface IParser {

  getAST(sql: string, dialect: string): Promise<unknown>;

  validateSyntax(sql: string, dialect: string): Promise<{ isValid: boolean; error?: string; line?: number; column?: number; }>;
}