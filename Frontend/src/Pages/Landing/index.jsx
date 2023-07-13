import {
  SectionPromote,
  SectionTrusted,
  SectionTopRated,
  SectionServices,
  SectionBenefits,
  SectionLogoMaker,
  SectionHelp,
  SectionCategory,
  SectionFeedback,
  SectionFindTalent,
} from './Sections.js'

export default function landingPage() {
  return (
    <div className="bg-bgd">
      <SectionPromote />
      <SectionTrusted />
      <SectionTopRated />
      <SectionServices />
      <SectionBenefits />
      <SectionLogoMaker />
      <SectionHelp />
      <SectionCategory />
      <SectionFeedback />
      <SectionFindTalent />
    </div>
  )
}
