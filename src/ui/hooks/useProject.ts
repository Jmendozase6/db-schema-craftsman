import { useCallback, useEffect, useState } from "react";
import { LocalStorageProjectRepository } from "../../infrastructure/repositories/LocalStorageProjectRepository";
import type { Project } from "../../domain/entities/Project";
import { SqlParserService } from "../../infrastructure/services/SqlParserService";

export type SyntaxError = {
  message: string;
  line?: number;
  column?: number;
}

const projectRepository = new LocalStorageProjectRepository();
const sqlParserService = new SqlParserService();

export const useProject = () => {
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [syntaxError, setSyntaxError] = useState<SyntaxError | null>(null);

  // Cargar el proyecto al inicializar el hook
  useEffect(() => {
    const loadProject = async () => {
      setisLoading(true);
      const loadedProject = await projectRepository.get();
      setProject(loadedProject);
      setisLoading(false);
    };
    loadProject();
  }, []);

  useEffect(() => {
    if (!project) return;

    // Establecemos un temporizador para esperar 500ms después de la última edición
    const debounceTimer = setTimeout(async () => {
      const validationResult = await sqlParserService.validateSyntax(project.sqlScript, project.dialect);
      if (validationResult.isValid) {
        setSyntaxError(null);
      } else {
        setSyntaxError({
          message: validationResult.error || 'Error de sintaxis desconocido',
          line: validationResult.line,
          column: validationResult.column,
        });
      }
    }, 500); // 500ms de espera

    // Limpiamos el temporizador si el usuario sigue escribiendo
    return () => clearTimeout(debounceTimer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project?.sqlScript, project?.dialect]);

  // Función para actualizar y guardar el proyecto
  const updateProject = useCallback((updatedProject: Project) => {
    setProject(updatedProject);
    projectRepository.save(updatedProject);
  }, []);

  // Función para crear un nuevo proyecto
  const createNewProject = useCallback(async () => {
    localStorage.removeItem('db_schema_craftsman_project');
    const welcomeProject = await projectRepository.get();
    setProject(welcomeProject);
  }, []);

  return { project, isLoading, syntaxError, updateProject, createNewProject };
}