export type DemoDataType = {
  overall_match_percentage: number;

  summary: {
    fit_level: string;
    reason: string;
  };

  skills_matching: {
    frontend: string[];
    backend_related: string[];
    database: string[];
    tools: string[];
    concepts: string[];
    practical_experience: string[];
  };

  required_skills_lacking_or_not_clearly_mentioned: string[];

  preferred_skills_missing: string[];

  experience_gap: {
    required_experience: string;
    current_experience: string;
    gap: string;
  };

  strengths_for_this_role: string[];

  what_you_should_learn_to_increase_match: {
    high_priority: string[];
    medium_priority: string[];
    good_to_have: string[];
  };

  estimated_match_after_learning_recommended_skills: {
    if_redux_and_nextjs_learned: string;
    if_typescript_and_testing_added: string;
  };
};