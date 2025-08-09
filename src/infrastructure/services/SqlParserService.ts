import { Parser } from "node-sql-parser";
import type { IParser } from "../../application/services/IParser";

export class SqlParserService implements IParser {

  private parser = new Parser();

  async validateSyntax(sql: string, dialect: string) {
    try {
      this.parser.parse(sql, { database: dialect });
      return { isValid: true };
    } catch (error: any) {
      return {
        isValid: false,
        error: error.message,
        line: error.location?.start?.line,
        column: error.location?.start?.column
      };
    }
  }

  async getAST(sql: string, dialect: string) {
    try {
      const ast = this.parser.astify(sql, { database: dialect });
      return ast;
    } catch (error) {
      console.error("Could not generate AST due to syntax error.", error);
      return null;
    }
  }

}