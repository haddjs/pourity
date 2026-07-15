import type { CvData } from '../../types'
import { PersonalSection } from './sections/PersonalSection'
import { SummarySection } from './sections/SummarySection'
import { ExperienceSection } from './sections/ExperienceSection'
import { EducationSection } from './sections/EducationSection'
import { SkillsSection } from './sections/SkillsSection'

interface Props {
  cv: CvData
  onChange: (next: CvData) => void
}

/** The full editing form — one slice per CV section. */
export function CvForm({ cv, onChange }: Props) {
  const patch = (partial: Partial<CvData>) => onChange({ ...cv, ...partial })

  return (
    <div className="divide-y divide-stone">
      <PersonalSection
        value={cv.personal}
        onChange={(personal) => patch({ personal })}
      />
      <SummarySection
        value={cv.summary}
        onChange={(summary) => patch({ summary })}
      />
      <ExperienceSection
        value={cv.experience}
        onChange={(experience) => patch({ experience })}
      />
      <EducationSection
        value={cv.education}
        onChange={(education) => patch({ education })}
      />
      <SkillsSection value={cv.skills} onChange={(skills) => patch({ skills })} />
    </div>
  )
}
