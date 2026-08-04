export type SkillSearchResult = {
  skill: string;
  matchingJobs: Array<{
    company: string;
    position: string;
    highlights: string[];
  }>;
  matchingProjects: any[];
};

export function searchBySkill(resume: any, skill: string): SkillSearchResult {
  const needle = skill.toLowerCase();

  const matchingJobs = (resume.work ?? [])
    .map((job: any) => {
      const hits = (job.highlights ?? []).filter((h: string) =>
        h.toLowerCase().includes(needle)
      );
      return hits.length
        ? { company: job.name, position: job.position, highlights: hits }
        : null;
    })
    .filter(Boolean);

  const matchingProjects = (resume.projects ?? []).filter((p: any) => {
    const inKeywords = (p.keywords ?? []).some((k: string) =>
      k.toLowerCase().includes(needle)
    );
    const inDesc = (p.description ?? "").toLowerCase().includes(needle);
    return inKeywords || inDesc;
  });

  return { skill, matchingJobs, matchingProjects };
}
