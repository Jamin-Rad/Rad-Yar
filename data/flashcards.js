import { qualityCards, qualityTopics } from './assessmentQuality'
import { ABDOMEN_EXISTING_CARDS, ABDOMEN_EXISTING_CARD_TOPICS } from './abdomenExistingPractice'
import { ABDOMEN_LEGACY_CARDS, ABDOMEN_LEGACY_CARD_TOPICS } from './abdomenLegacyCardAccess'
import { LIRADS_CARDS, LIRADS_CARD_TOPIC } from './abdomenHccPlanning'
import { FLC_CARDS, FLC_CARD_TOPIC } from './abdomenFlcLesson'
import { ABDOMEN_GI_CARDS, ABDOMEN_GI_CARD_TOPICS } from './abdomenGiCompletion'
import { CIRRHOSIS_CARDS, CIRRHOSIS_CARD_TOPIC } from './abdomenCirrhosisLesson'
import { SPINE_METABOLIC_CARDS, SPINE_METABOLIC_CARD_TOPICS } from './spineMetabolicCompletion'
import { SPINE_INFECTIOUS_CARDS, SPINE_INFECTIOUS_CARD_TOPICS } from './spineInfectiousCompletion'
import { SPINE_DEGENERATIVE_COMPLETION_CARDS, SPINE_DEGENERATIVE_COMPLETION_CARD_TOPICS } from './spineDegenerativeCompletion'
import { SPINE_COMPLETION_CARDS, SPINE_COMPLETION_CARD_TOPICS } from './spineCompletionPractice'
import { SPINE_PATTERN_CARDS, SPINE_PATTERN_CARD_TOPICS } from './spinePatternPractice'
import { THORAX_PNEUMONIA_FLASHCARDS, THORAX_PNEUMONIA_TOPICS } from './thoraxPneumoniaPractice'
import { BRONCHIOLITIS_CARDS, BRONCHIOLITIS_CARD_TOPIC } from './thoraxBronchiolitisLesson'
import { HP_CARDS, HP_CARD_TOPIC } from './thoraxHypersensitivityLesson'
import { CF_CARDS, CF_CARD_TOPIC } from './thoraxCfLesson'
import { LCH_CARDS, LCH_CARD_TOPIC } from './thoraxLchLesson'
import { CYST_CARDS, CYST_CARD_TOPIC } from './thoraxCystsLesson'
import { PECTUS_FLASHCARDS, PECTUS_FLASHCARD_TOPIC } from './thoraxPectusLesson'
import { THORAX_EXISTING_CARDS, THORAX_EXISTING_CARD_TOPICS } from './thoraxExistingPractice'
import { ATELECTASIS_CARDS, ATELECTASIS_CARD_TOPIC } from './thoraxAtelectasisAssessment'
import { REMAINING_BLOCK_FLASHCARDS, REMAINING_BLOCK_FLASHCARD_TOPICS } from './technikRemainingBlocks'
import { ACCESS_FLASHCARDS, ACCESS_FLASHCARD_TOPICS } from './technikTopicAccessAssessment'
import { MR_MYEL_CARDS, MR_MYEL_CARD_TOPIC } from './technikMrMyelographyLesson'
import { STERNUM_RIB_FLASHCARDS, STERNUM_RIB_FLASHCARD_TOPIC } from './sternumRibLesson'
import { GLENOHUMERAL_OA_FLASHCARDS, GLENOHUMERAL_OA_LESSON, GLENOHUMERAL_OA_TOPIC_ID } from './mskGlenohumeralOaLesson'
import { UPPER_ARTERY_CARDS, UPPER_ARTERY_CARD_TOPIC } from './upperLimbArteriesLesson'
import { DIFFUSE_GLIOMA_FLASHCARDS, DIFFUSE_GLIOMA_FLASHCARD_TOPICS } from './diffuseGliomaLesson'
import { MENING_FLASHCARDS, MENING_FLASHCARD_TOPIC } from './gehirnMeningeomLesson'
import { MEDULLO_FLASHCARDS, MEDULLO_FLASHCARD_TOPIC } from './medulloblastomLesson'
import { ATRT_FLASHCARDS, ATRT_FLASHCARD_TOPIC } from './atrtLesson'
import { RECIST_FLASHCARDS, RECIST_FLASHCARD_TOPIC } from './recist11Lesson'
import { FLEISCHNER_FLASHCARDS, FLEISCHNER_FLASHCARD_TOPIC } from './fleischnerLearning'
import { BONE_INFARCT_FLASHCARDS, BONE_INFARCT_FLASHCARD_TOPIC } from './knocheninfarktLesson'
import { EOSINOPHILIC_GRANULOMA_FLASHCARDS, EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC } from './eosinophilesGranulomLesson'
import { FACET_FLASHCARDS, FACET_FLASHCARD_TOPIC, FACET_SYNOVIAL_CYST_FLASHCARD_TOPIC } from './spondylarthroseLesson'
import { PCNSL_FLASHCARDS, PCNSL_FLASHCARD_TOPIC } from './pcnslLesson'
import { BRAIN_METASTASES_FLASHCARDS, BRAIN_METASTASES_FLASHCARD_TOPIC } from './gehirnHirnmetastasenLesson'
import { HEMANGIOMA_FLASHCARDS } from './haemangiomaTraining'
import { HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS, HEPATIC_ANGIOMYOLIPOMA_FLASHCARD_TOPIC } from './hepaticAngiomyolipomaLearning'
import { PSC_MRCP_FLASHCARDS, PSC_MRCP_FLASHCARD_TOPIC } from './pscMrcpLearning'
import { TECHNIK_ENTRANCE_KERMA_FLASHCARDS, TECHNIK_ENTRANCE_KERMA_FLASHCARD_TOPIC } from './technikEntranceKermaAssessment'
// Auto-generated RadYar flashcard data.

import { CONTRAST_FLASHCARDS, CONTRAST_FLASHCARD_TOPICS } from './contrastMedia'
import { STROKE_FLASHCARDS, STROKE_FLASHCARD_TOPIC } from './stroke'
import { ICB_FLASHCARDS, ICB_FLASHCARD_TOPIC } from './icb'
import { HIE_FLASHCARDS } from './hie'
import { SAB_FLASHCARDS, SAB_FLASHCARD_TOPIC } from './sab'
import { EDH_FLASHCARDS } from './edh'
import { SDH_FLASHCARDS, SDH_FLASHCARD_TOPIC } from './sdh'
import { DISSECTION_FLASHCARDS, DISSECTION_FLASHCARD_TOPIC } from './dissection'
import { MOYAMOYA_FLASHCARDS, MOYAMOYA_FLASHCARD_TOPIC } from './moyamoya'
import { HMA_FLASHCARDS, HMA_FLASHCARD_TOPIC } from './hypertensive-mikroangiopathie'
import { CAA_FLASHCARDS, CAA_FLASHCARD_TOPIC } from './caa'
import { MIGRAINE_FLASHCARDS, MIGRAINE_FLASHCARD_TOPIC } from './migraine'
import { CADASIL_FLASHCARDS, CADASIL_FLASHCARD_TOPIC } from './cadasil'
import { DVA_FLASHCARDS, DVA_FLASHCARD_TOPIC } from './dva'
import { KAVERNOM_FLASHCARDS, KAVERNOM_FLASHCARD_TOPIC } from './kavernom'
import { NPH_FLASHCARDS, NPH_FLASHCARD_TOPIC } from './normaldruckhydrozephalus'
import { TELEANGIEKTASIE_FLASHCARDS, TELEANGIEKTASIE_FLASHCARD_TOPIC } from './kapillaere-teleangiektasie'
import { SVT_FLASHCARDS, SVT_FLASHCARD_TOPIC } from './sinusvenenthrombose'
import { DAVF_FLASHCARDS, DAVF_FLASHCARD_TOPIC } from './davf'
import { AVM_FLASHCARDS, AVM_FLASHCARD_TOPIC } from './avm'
import { FRAKTUR_FLASHCARDS, FRAKTUR_FLASHCARD_TOPIC, FRAKTUR_STRESS_FLASHCARDS, FRAKTUR_STRESS_FLASHCARD_TOPIC } from './frakturbeschreibung'
import { FRAKTUR_KINDER_FLASHCARDS, FRAKTUR_KINDER_FLASHCARD_TOPIC } from './frakturen-kindesalter'
import { AK_LUXATION_FLASHCARDS, AK_LUXATION_FLASHCARD_TOPIC } from './ak-luxation'
import { RADIUSKOPF_FLASHCARDS, RADIUSKOPF_FLASHCARD_TOPIC } from './radiuskopf'
import { UNTERARM_FLASHCARDS, UNTERARM_FLASHCARD_TOPIC } from './unterarmschaftfrakturen'
import { DISTALE_RADIUS_FLASHCARDS, DISTALE_RADIUS_FLASHCARD_TOPIC } from './distale-radiusfraktur'
import { SCAPHOID_FLASHCARDS, SCAPHOID_FLASHCARD_TOPIC } from './scaphoidAssessments'
import { THUMB_UCL_FLASHCARDS, THUMB_UCL_FLASHCARD_TOPIC } from './thumbUclAssessments'
import { PELVIC_RING_FLASHCARDS, PELVIC_RING_FLASHCARD_TOPIC } from './pelvicRingAssessments'
import { VANCOUVER_FLASHCARDS, VANCOUVER_FLASHCARD_TOPIC } from './vancouverAssessments'
import { PROXIMAL_FEMUR_FLASHCARDS, PROXIMAL_FEMUR_FLASHCARD_TOPIC } from './proximalFemurAssessments'
import { DISTAL_FEMUR_FLASHCARDS, DISTAL_FEMUR_FLASHCARD_TOPIC } from './distalFemurAssessments'
import { FEMORAL_SHAFT_FLASHCARDS, FEMORAL_SHAFT_FLASHCARD_TOPIC } from './femoralShaftAssessments'
import { FMD_FLASHCARDS, FMD_FLASHCARD_TOPIC } from './fmdAssessments'
import { TIBIAL_PLATEAU_FLASHCARDS, TIBIAL_PLATEAU_FLASHCARD_TOPIC } from './tibialPlateauAssessments'
import { ANKLE_TRAUMA_FLASHCARDS, ANKLE_TRAUMA_FLASHCARD_TOPIC } from './ankleTraumaAssessments'
import { SHOULDER_IMPINGEMENT_FLASHCARDS, SHOULDER_IMPINGEMENT_FLASHCARD_TOPIC } from './shoulderImpingementAssessments'
import { PATELLA_STRECKAPPARAT_FLASHCARDS, PATELLA_STRECKAPPARAT_FLASHCARD_TOPIC, PATELLAFRAKTUR_FLASHCARD_TOPIC } from './patellaStreckapparatAssessments'
import { HRCT_FLASHCARDS, HRCT_FLASHCARD_TOPICS } from './hrct-muster'
import { SPINE_TRAUMA_FLASHCARDS, SPINE_TRAUMA_FLASHCARD_TOPICS } from './spineTrauma'
import { KNIE_LIGAMENTE_FLASHCARDS, KNIE_LIGAMENTE_FLASHCARD_TOPIC } from './knieligamente'
import { MAMMA_MRT_FLASHCARDS, MAMMA_MRT_FLASHCARD_TOPIC } from './mammaMrtBasics'
import { MAMMA_MRT_LESION_FLASHCARDS, MAMMA_MRT_LESION_FLASHCARD_TOPIC } from './mammaMrtLesions'
import { MAMMA_KAISER_FLASHCARDS, MAMMA_KAISER_FLASHCARD_TOPIC } from './mammaKaiserScore'
import { MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARDS, MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARD_TOPIC } from './mammaMrtSpecialCarcinomas'
import { MAMMOGRAPHY_BASICS_FLASHCARDS, MAMMOGRAPHY_BASICS_FLASHCARD_TOPIC } from './mammaMammographyBasics'
import { MAMMOGRAPHY_CALCIFICATIONS_FLASHCARDS, MAMMOGRAPHY_CALCIFICATIONS_FLASHCARD_TOPIC } from './mammaMammographyCalcifications'
import { CARDIOMYOPATHY_FLASHCARDS, CARDIOMYOPATHY_FLASHCARD_TOPIC } from './cardiomyopathy'
import { ARVC_FLASHCARDS, ARVC_FLASHCARD_TOPIC } from './arvcTraining'
import { MYOCARDIAL_INJURY_FLASHCARDS, MYOCARDIAL_INJURY_FLASHCARD_TOPIC } from './myocardialInjury'
import { MSK_SPINE_REGISTERED_FLASHCARDS, MSK_SPINE_REGISTERED_FLASHCARD_TOPICS } from './mskSpineRegisteredFlashcards'
import { MSK_BONE_AGGRESSIVENESS_FLASHCARDS, MSK_BONE_AGGRESSIVENESS_FLASHCARD_TOPIC } from './mskBoneAggressivenessAssessments'
import { ILEUS_FLASHCARDS, ILEUS_FLASHCARD_TOPIC, INTUSSUSCEPTION_FLASHCARDS, INTUSSUSCEPTION_FLASHCARD_TOPIC } from './abdomenIleusFlashcards'
import { CYSTIC_LIVER_FLASHCARDS, CYSTIC_LIVER_FLASHCARD_TOPIC } from './cysticLiverLesionLearning'
import { GIST_FLASHCARDS, GIST_FLASHCARD_TOPIC } from './gistLearning'
import { LIVER_MRI_FLASHCARDS, LIVER_MRI_FLASHCARD_TOPIC } from './technikLiverMRI'
import { KOLLOID_FLASHCARDS, KOLLOID_FLASHCARD_TOPIC } from './gehirnKolloidzysteLesson'
import { UIP_IPF_FLASHCARDS, UIP_IPF_FLASHCARD_TOPIC } from './thoraxUipIpfLesson'
import { BRONCHIECTASIS_FLASHCARDS, BRONCHIECTASIS_FLASHCARD_TOPIC } from './bronchiectasisLesson'
import { COPD_FLASHCARDS, COPD_FLASHCARD_TOPIC } from './copdImagingLesson'
import { NEUROFORAMENSTENOSE_FLASHCARDS, NEUROFORAMENSTENOSE_FLASHCARD_TOPIC } from './neuroforamenstenoseLesson'
import { PULMONARY_EDEMA_FLASHCARDS, PULMONARY_EDEMA_FLASHCARD_TOPIC } from './pulmonaryEdema'
import { PULMONARY_HYPERTENSION_FLASHCARDS, PULMONARY_HYPERTENSION_FLASHCARD_TOPIC } from './pulmonaryHypertensionAssessments'
import { LIVER_VESSELS_FLASHCARDS, LIVER_VESSELS_FLASHCARD_TOPIC } from './abdomenLiverVesselsAssessments'
import { DUAL_ENERGY_CT_FLASHCARDS, DUAL_ENERGY_CT_FLASHCARD_TOPIC } from './technikDualEnergyLesson'
import { MR_PERFUSION_FLASHCARDS, MR_PERFUSION_FLASHCARD_TOPIC } from './technikMrtPerfusionLesson'
import { MRI_ARTIFACT_FLASHCARDS, MRI_ARTIFACT_FLASHCARD_TOPIC } from './technikMriArtifacts'
import { MRI_SAFETY_FLASHCARDS, MRI_SAFETY_FLASHCARD_TOPIC } from './technikMriSafetyLesson'
import { MRI_SPIN_ECHO_FLASHCARDS, MRI_SPIN_ECHO_FLASHCARD_TOPIC } from './technikMriSpinEchoLesson'
import { MRI_GRADIENT_ECHO_FLASHCARDS, MRI_GRADIENT_ECHO_FLASHCARD_TOPIC } from './technikMriGradientEchoLesson'
import { MRI_INVERSION_RECOVERY_FLASHCARDS, MRI_INVERSION_RECOVERY_FLASHCARD_TOPIC } from './technikMriInversionRecoveryLesson'
import { MRI_FAT_SUPPRESSION_FLASHCARDS, MRI_FAT_SUPPRESSION_FLASHCARD_TOPIC } from './technikMriFatSuppressionLesson'
import { CT_QUALITY_FLASHCARDS, CT_QUALITY_FLASHCARD_TOPIC } from './technikCTQuality'
import { CT_PERFUSION_FLASHCARDS, CT_PERFUSION_FLASHCARD_TOPIC } from './technikCTPerfusionLesson'
import { CT_RECONSTRUCTION_FLASHCARDS, CT_RECONSTRUCTION_FLASHCARD_TOPIC } from './technikCTReconstructionLesson'
import { HRCT_TECHNIK_FLASHCARDS, HRCT_TECHNIK_FLASHCARD_TOPIC } from './technikHRCTLesson'
import { CT_PROTOCOL_FLASHCARDS, CT_PROTOCOL_FLASHCARD_TOPIC } from './technikCTProtocolLesson'
import { CT_BASICS_FLASHCARDS, CT_BASICS_FLASHCARD_TOPICS } from './technikCTBasicsLesson'
import { STEATOSIS_FLASHCARDS, STEATOSIS_FLASHCARD_TOPIC } from './steatosisLearning'
import { MR_ANGIOGRAPHY_FLASHCARDS, MR_ANGIOGRAPHY_FLASHCARD_TOPIC } from './technikMraLesson'
import { MRI_FUNDAMENTALS_FLASHCARDS, MRI_FUNDAMENTALS_FLASHCARD_TOPIC, MRI_QUALITY_FLASHCARDS } from './technikMRIFundamentalsLesson'
import { DWI_ADC_FLASHCARDS, DWI_ADC_FLASHCARD_TOPIC } from './technikDwiAdcLesson'
import { TECHNIK_ROENTGEN_FLASHCARDS, TECHNIK_ROENTGEN_FLASHCARD_TOPIC } from './technikRoentgenFlashcards'
import { RENAL_ANATOMY_FLASHCARDS, RENAL_ANATOMY_FLASHCARD_TOPIC } from './renalAnatomyFlashcards'
import { SOLID_RENAL_MASS_FLASHCARDS, SOLID_RENAL_MASS_FLASHCARD_TOPIC } from './solidRenalMassesFlashcards'
import { LOWER_GI_BLEEDING_FLASHCARDS, LOWER_GI_BLEEDING_FLASHCARD_TOPIC } from './lowerGIBleedingFlashcards'
import { COLORECTAL_CANCER_FLASHCARDS, COLORECTAL_CANCER_FLASHCARD_TOPIC } from './colorectalCancerFlashcards'
import { WILMS_FLASHCARDS, WILMS_FLASHCARD_TOPIC } from './wilmsTumorFlashcards'
import { TECHNIK_BOLD_FLASHCARDS, TECHNIK_BOLD_TOPIC } from './technikBoldFlashcards'
import { TECHNIK_CINE_FLASHCARDS, TECHNIK_CINE_FLASHCARD_TOPIC } from './technikCineFlashcards'
import { TECHNIK_FLUORO_ZOOM_FLASHCARDS, TECHNIK_FLUORO_ZOOM_FLASHCARD_TOPIC } from './technikFluoroZoomFlashcards'
import { VOLVULUS_FLASHCARDS, VOLVULUS_FLASHCARD_TOPIC } from './volvulusLearning'
import { WIRBELMETASTASEN_FLASHCARDS, WIRBELMETASTASEN_FLASHCARD_TOPIC } from './wirbelmetastasenAssessment'
import { SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARDS, SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARD_TOPICS, SPINAL_EXTRAMEDULLARY_FLASHCARDS, SPINAL_EXTRAMEDULLARY_FLASHCARD_TOPICS } from './spinalIntramedullaryTumorAssessments'
import { CHEST_XRAY_HEART_SIZE_FLASHCARDS, CHEST_XRAY_HEART_SIZE_FLASHCARD_TOPIC } from './chestXrayHeartSizeFlashcards'
import { APPENDIZITIS_FLASHCARDS, APPENDIZITIS_FLASHCARD_TOPIC } from './appendizitisFlashcards'
import { WRIST_EXTENSOR_FLASHCARDS, WRIST_EXTENSOR_FLASHCARD_TOPIC, DE_QUERVAIN_FLASHCARDS, DE_QUERVAIN_FLASHCARD_TOPIC } from './wristExtensorAssessments'
import { GEHIRN_PRES_FLASHCARDS, GEHIRN_PRES_FLASHCARD_TOPIC } from './gehirnPresTraining'
import { ADRENAL_FLASHCARDS, ADRENAL_FLASHCARD_TOPIC } from './abdomenAdrenalLessonMaterials'
import { PROXIMAL_HUMERUS_FLASHCARDS, PROXIMAL_HUMERUS_FLASHCARD_TOPIC } from './proximalHumerusLesson'
import { PNET_FLASHCARDS, PNET_FLASHCARD_TOPIC } from './pnetLearning'
import { PDAC_FLASHCARDS, PDAC_FLASHCARD_TOPIC } from './pdacFlashcards'
import { INGUINAL_FEMORAL_HERNIA_FLASHCARDS, INGUINAL_FEMORAL_HERNIA_FLASHCARD_TOPIC } from './inguinalFemoralHerniaFlashcards'
import { SPINE_MODIC_FLASHCARDS, SPINE_MODIC_FLASHCARD_TOPIC } from './spineModicAssessment'
import { FOREIGN_BODY_ASPIRATION_FLASHCARDS, FOREIGN_BODY_ASPIRATION_FLASHCARD_TOPIC } from './foreignBodyAspirationLearning'
import { TUBERCULOSIS_FLASHCARDS, TUBERCULOSIS_FLASHCARD_TOPIC } from './tuberculosisPatternsLearning'
import { OSTEOCHONDROSIS_DISSECANS_FLASHCARDS, OSTEOCHONDROSIS_DISSECANS_FLASHCARD_TOPIC } from './osteochondrosisDissecansAssessments'
import { PANCREATIC_CYST_FLASHCARDS, PANCREATIC_CYST_FLASHCARD_TOPIC } from './abdomenPancreaticCystFlashcards'
import { MESENTERIC_ISCHAEMIA_FLASHCARDS, MESENTERIC_ISCHAEMIA_FLASHCARD_TOPIC } from './mesentericIschaemiaFlashcards'
import { THORAX_LUNG_ABSCESS_FLASHCARDS, THORAX_LUNG_ABSCESS_FLASHCARD_TOPIC } from './thoraxLungAbscessFlashcards'
import { RENAL_CYST_FLASHCARDS, RENAL_CYST_FLASHCARD_TOPIC } from './renalCystAssessments'
import { LUNG_ANATOMY_FLASHCARDS, LUNG_ANATOMY_FLASHCARD_TOPIC } from './lungAnatomyAssessments'
import { EPIPLOICA_FLASHCARDS, EPIPLOICA_FLASHCARD_TOPIC } from './epiploicaLesson'
import { RENAL_TRAUMA_FLASHCARDS, RENAL_TRAUMA_FLASHCARD_TOPIC } from './renalTraumaLesson'
import { ADPKD_FLASHCARDS, ADPKD_FLASHCARD_TOPIC } from './adpkdImagingAssessments'
import { SHOULDER_INSTABILITY_FLASHCARDS, SHOULDER_INSTABILITY_FLASHCARD_TOPIC } from './shoulderInstabilityAssessments'
import { LUNG_CARCINOMA_FLASHCARDS, LUNG_CARCINOMA_FLASHCARD_TOPIC } from './lungCarcinomaImagingLesson'

export const FLASHCARD_TOPICS = [
  STERNUM_RIB_FLASHCARD_TOPIC,
  UPPER_ARTERY_CARD_TOPIC,
  { id: GLENOHUMERAL_OA_TOPIC_ID, href: `/flashcards/${GLENOHUMERAL_OA_TOPIC_ID}`, title: GLENOHUMERAL_OA_LESSON.title, description: GLENOHUMERAL_OA_LESSON.title, icon: '◉', color: '#537f89' },
  NEUROFORAMENSTENOSE_FLASHCARD_TOPIC,
  ADPKD_FLASHCARD_TOPIC,
  SHOULDER_INSTABILITY_FLASHCARD_TOPIC,
  LUNG_CARCINOMA_FLASHCARD_TOPIC,
  MSK_BONE_AGGRESSIVENESS_FLASHCARD_TOPIC,
  CHEST_XRAY_HEART_SIZE_FLASHCARD_TOPIC,
  SPINE_MODIC_FLASHCARD_TOPIC,
  FOREIGN_BODY_ASPIRATION_FLASHCARD_TOPIC,
  TUBERCULOSIS_FLASHCARD_TOPIC,
  OSTEOCHONDROSIS_DISSECANS_FLASHCARD_TOPIC,
  PANCREATIC_CYST_FLASHCARD_TOPIC,
  MESENTERIC_ISCHAEMIA_FLASHCARD_TOPIC,
  THORAX_LUNG_ABSCESS_FLASHCARD_TOPIC,
  RENAL_CYST_FLASHCARD_TOPIC,
  LUNG_ANATOMY_FLASHCARD_TOPIC,
  INGUINAL_FEMORAL_HERNIA_FLASHCARD_TOPIC,
  PELVIC_RING_FLASHCARD_TOPIC,
  VANCOUVER_FLASHCARD_TOPIC,
  PROXIMAL_FEMUR_FLASHCARD_TOPIC,
  DISTAL_FEMUR_FLASHCARD_TOPIC,
  TIBIAL_PLATEAU_FLASHCARD_TOPIC,
  ANKLE_TRAUMA_FLASHCARD_TOPIC,
  SHOULDER_IMPINGEMENT_FLASHCARD_TOPIC,
  PATELLA_STRECKAPPARAT_FLASHCARD_TOPIC,
  PATELLAFRAKTUR_FLASHCARD_TOPIC,
  PDAC_FLASHCARD_TOPIC,
  HEPATIC_ANGIOMYOLIPOMA_FLASHCARD_TOPIC,
  PSC_MRCP_FLASHCARD_TOPIC,
  PNET_FLASHCARD_TOPIC,
  GEHIRN_PRES_FLASHCARD_TOPIC,
  ADRENAL_FLASHCARD_TOPIC,
  VOLVULUS_FLASHCARD_TOPIC,
  WIRBELMETASTASEN_FLASHCARD_TOPIC,
  ...SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARD_TOPICS,
  ...SPINAL_EXTRAMEDULLARY_FLASHCARD_TOPICS,
  APPENDIZITIS_FLASHCARD_TOPIC,
  WRIST_EXTENSOR_FLASHCARD_TOPIC,
  DE_QUERVAIN_FLASHCARD_TOPIC,
  PROXIMAL_HUMERUS_FLASHCARD_TOPIC,
  RENAL_ANATOMY_FLASHCARD_TOPIC,
  SOLID_RENAL_MASS_FLASHCARD_TOPIC,
  LOWER_GI_BLEEDING_FLASHCARD_TOPIC,
  COLORECTAL_CANCER_FLASHCARD_TOPIC,
  WILMS_FLASHCARD_TOPIC,
  EPIPLOICA_FLASHCARD_TOPIC,
  RENAL_TRAUMA_FLASHCARD_TOPIC,
  TECHNIK_BOLD_TOPIC,
  TECHNIK_CINE_FLASHCARD_TOPIC,
  TECHNIK_FLUORO_ZOOM_FLASHCARD_TOPIC,
  TECHNIK_ROENTGEN_FLASHCARD_TOPIC,
  { id: 'lebermetastasen', area: 'Abdomen', chapter: 'Leberläsionen', icon: 'CT', iconImage: '/fach/abdomen.png', color: '#10b981', href: '/flashcards/lebermetastasen', title: { de: 'Lebermetastasen', en: 'Liver metastases', fa: 'متاستازهای کبدی' }, subtitle: { de: 'Phasenmuster · Vaskularität · Befundung', en: 'Phase pattern · vascularity · reporting', fa: 'الگوی فازی · عروق‌رسانی · گزارش' } },
  STEATOSIS_FLASHCARD_TOPIC,
  ...CT_BASICS_FLASHCARD_TOPICS,
  MR_MYEL_CARD_TOPIC,
  ATELECTASIS_CARD_TOPIC,
  LCH_CARD_TOPIC,
  CF_CARD_TOPIC,
  BRONCHIOLITIS_CARD_TOPIC,
  HP_CARD_TOPIC,
  ...THORAX_PNEUMONIA_TOPICS,
  CYST_CARD_TOPIC,
  PECTUS_FLASHCARD_TOPIC,
  ...SPINE_DEGENERATIVE_COMPLETION_CARD_TOPICS,
  ...SPINE_INFECTIOUS_CARD_TOPICS,
  ...SPINE_METABOLIC_CARD_TOPICS,
  CIRRHOSIS_CARD_TOPIC,
  ...ABDOMEN_EXISTING_CARD_TOPICS,
  ...ABDOMEN_LEGACY_CARD_TOPICS,
  LIRADS_CARD_TOPIC,
  FLC_CARD_TOPIC,
  ...ABDOMEN_GI_CARD_TOPICS,
  ...SPINE_COMPLETION_CARD_TOPICS,
  ...SPINE_PATTERN_CARD_TOPICS,
  ...THORAX_EXISTING_CARD_TOPICS,
  ...REMAINING_BLOCK_FLASHCARD_TOPICS,
  ...ACCESS_FLASHCARD_TOPICS,
  CT_PERFUSION_FLASHCARD_TOPIC,
  CT_RECONSTRUCTION_FLASHCARD_TOPIC,
  HRCT_TECHNIK_FLASHCARD_TOPIC,
  CT_PROTOCOL_FLASHCARD_TOPIC,
  CT_QUALITY_FLASHCARD_TOPIC,
  MRI_ARTIFACT_FLASHCARD_TOPIC,
  MRI_SAFETY_FLASHCARD_TOPIC,
  MRI_SPIN_ECHO_FLASHCARD_TOPIC,
  MRI_GRADIENT_ECHO_FLASHCARD_TOPIC,
  MRI_INVERSION_RECOVERY_FLASHCARD_TOPIC,
  MRI_FAT_SUPPRESSION_FLASHCARD_TOPIC,
  MRI_FUNDAMENTALS_FLASHCARD_TOPIC,
  MR_ANGIOGRAPHY_FLASHCARD_TOPIC,
  MR_PERFUSION_FLASHCARD_TOPIC,
  DWI_ADC_FLASHCARD_TOPIC,
  DUAL_ENERGY_CT_FLASHCARD_TOPIC,
  BRAIN_METASTASES_FLASHCARD_TOPIC,
  PCNSL_FLASHCARD_TOPIC,
  MEDULLO_FLASHCARD_TOPIC,
  ATRT_FLASHCARD_TOPIC,
  ...DIFFUSE_GLIOMA_FLASHCARD_TOPICS,
  MENING_FLASHCARD_TOPIC,
  RECIST_FLASHCARD_TOPIC,
  FACET_FLASHCARD_TOPIC,
  FACET_SYNOVIAL_CYST_FLASHCARD_TOPIC,
  { id: 'bandscheibenpathologien', area: 'Wirbelsäule', chapter: 'Degenerative Erkrankungen', icon: 'MRI', color: '#0e7490', href: '/flashcards/bandscheibenpathologien', title: { de: 'Bandscheibenpathologien', en: 'Intervertebral disc pathologies', fa: 'بیماری‌های دیسک بین‌مهره‌ای' }, subtitle: { de: 'Protrusion · Extrusion · Sequester · axiale Lage', en: 'Protrusion · extrusion · sequestration · axial location', fa: 'پروتروژن · اکستروژن · سکوستراسیون · محل آکسیال' } },
  BONE_INFARCT_FLASHCARD_TOPIC,
  EOSINOPHILIC_GRANULOMA_FLASHCARD_TOPIC,
  FEMORAL_SHAFT_FLASHCARD_TOPIC,
  FMD_FLASHCARD_TOPIC,
  FLEISCHNER_FLASHCARD_TOPIC,
  MAMMA_MRT_FLASHCARD_TOPIC,
  MAMMA_MRT_LESION_FLASHCARD_TOPIC,
  MAMMA_KAISER_FLASHCARD_TOPIC,
  MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARD_TOPIC,
  MAMMOGRAPHY_BASICS_FLASHCARD_TOPIC,
  MAMMOGRAPHY_CALCIFICATIONS_FLASHCARD_TOPIC,
  CARDIOMYOPATHY_FLASHCARD_TOPIC,
  ARVC_FLASHCARD_TOPIC,
  MYOCARDIAL_INJURY_FLASHCARD_TOPIC,
  ...CONTRAST_FLASHCARD_TOPICS,
  STROKE_FLASHCARD_TOPIC,
  ICB_FLASHCARD_TOPIC,
  SAB_FLASHCARD_TOPIC,
  {
    id: 'epidurale-blutung',
    area: 'Kopf',
    chapter: 'Trauma',
    icon: '🩸',
    iconImage: '/fach/gehirn.png',
    color: '#be185d',
    href: '/flashcards/epidurale-blutung',
    title: {
      de: 'Epiduralhämatom',
      en: 'Epidural haematoma',
      fa: 'هماتوم اپیدورال',
    },
    subtitle: {
      de: 'CT-Muster · Fraktur · Swirl sign · Masseneffekt · Management',
      en: 'CT pattern · fracture · swirl sign · mass effect · management',
      fa: 'الگوی CT · شکستگی · Swirl sign · اثر فشاری · مدیریت',
    },
  },
  {
    id: 'hypoxisch-ischaemische-hirnschaedigung',
    area: 'Kopf',
    chapter: 'Vaskuläre Erkrankungen',
    icon: '🧠',
    iconImage: '/fach/gehirn.png',
    color: '#7c3aed',
    href: '/flashcards/hypoxisch-ischaemische-hirnschaedigung',
    title: {
      de: 'Hypoxisch-ischämische Hirnschädigung',
      en: 'Hypoxic-ischaemic brain injury',
      fa: 'آسیب مغزی هیپوکسیک-ایسکمیک',
    },
    subtitle: {
      de: 'Muster · CT · DWI/ADC · Zeitverlauf · Prognose',
      en: 'Patterns · CT · DWI/ADC · timeline · prognosis',
      fa: 'الگوها · CT · DWI/ADC · سیر زمانی · پیش‌آگهی',
    },
  },
  {
    id: 'liquorraeume-ventrikelsystem',
    area: 'Kopf',
    chapter: 'Anatomie & Normalvarianten',
    icon: '🧠',
    iconImage: '/fach/gehirn.png',
    color: '#7c3aed',
    href: '/flashcards/liquorraeume-ventrikelsystem',
    title: {
      de: 'Liquorräume / Ventrikelsystem',
      en: 'CSF spaces / ventricular system',
      fa: 'فضاهای مایع مغزی‌نخاعی / سیستم بطنی',
    },
    subtitle: {
      de: 'Ventrikelanatomie · Liquorfluss · Hydrozephalus · Normvarianten',
      en: 'Ventricular anatomy · CSF flow · hydrocephalus · normal variants',
      fa: 'آناتومی بطن‌ها · جریان CSF · هیدروسفالی · واریانت‌های طبیعی',
    },
  },
  SDH_FLASHCARD_TOPIC,
  DISSECTION_FLASHCARD_TOPIC,
  MOYAMOYA_FLASHCARD_TOPIC,
  HMA_FLASHCARD_TOPIC,
  CAA_FLASHCARD_TOPIC,
  LIVER_MRI_FLASHCARD_TOPIC,
  KOLLOID_FLASHCARD_TOPIC,
  UIP_IPF_FLASHCARD_TOPIC,
  BRONCHIECTASIS_FLASHCARD_TOPIC,
  COPD_FLASHCARD_TOPIC,
  PULMONARY_EDEMA_FLASHCARD_TOPIC,
  PULMONARY_HYPERTENSION_FLASHCARD_TOPIC,
  LIVER_VESSELS_FLASHCARD_TOPIC,
  MIGRAINE_FLASHCARD_TOPIC,
  CADASIL_FLASHCARD_TOPIC,
  DVA_FLASHCARD_TOPIC,
  KAVERNOM_FLASHCARD_TOPIC,
  NPH_FLASHCARD_TOPIC,
  TELEANGIEKTASIE_FLASHCARD_TOPIC,
  SVT_FLASHCARD_TOPIC,
  DAVF_FLASHCARD_TOPIC,
  AVM_FLASHCARD_TOPIC,
  FRAKTUR_FLASHCARD_TOPIC,
  FRAKTUR_STRESS_FLASHCARD_TOPIC,
  FRAKTUR_KINDER_FLASHCARD_TOPIC,
  AK_LUXATION_FLASHCARD_TOPIC,
  RADIUSKOPF_FLASHCARD_TOPIC,
  UNTERARM_FLASHCARD_TOPIC,
  DISTALE_RADIUS_FLASHCARD_TOPIC,
  SCAPHOID_FLASHCARD_TOPIC,
  THUMB_UCL_FLASHCARD_TOPIC,
  ...SPINE_TRAUMA_FLASHCARD_TOPICS,
  ...MSK_SPINE_REGISTERED_FLASHCARD_TOPICS,
  ILEUS_FLASHCARD_TOPIC,
  INTUSSUSCEPTION_FLASHCARD_TOPIC,
  CYSTIC_LIVER_FLASHCARD_TOPIC,
  GIST_FLASHCARD_TOPIC,
  ...HRCT_FLASHCARD_TOPICS,
  {
    id: 'divertikulitis',
    area: 'Abdomen',
    chapter: 'Gastrointestinaltrakt',
    icon: 'CT',
    iconImage: '/fach/abdomen.png',
    color: '#f97316',
    href: '/flashcards/divertikulitis',
    title: {
      de: 'Divertikulose & Divertikulitis',
      en: 'Diverticulosis & diverticulitis',
      fa: 'دیورتیکولوز و دیورتیکولیت',
    },
    subtitle: {
      de: 'CT-Zeichen · CDD · Abszess · Perforation · Fistel · Befundung',
      en: 'CT signs · CDD · abscess · perforation · fistula · reporting',
      fa: 'علائم CT · CDD · آبسه · پرفوراسیون · فیستول · گزارش',
    },
  },
  {
    id: 'pankreatitis',
    area: 'Abdomen',
    chapter: 'Pankreas',
    icon: 'CT',
    iconImage: '/fach/abdomen.png',
    color: '#10b981',
    href: '/flashcards/pankreatitis',
    title: {
      de: 'Pankreatitis',
      en: 'Pancreatitis',
      fa: 'پانکراتیت',
    },
    subtitle: {
      de: 'Atlanta · CTSI · Nekrose · Kollektionen · Komplikationen · DD Karzinom',
      en: 'Atlanta · CTSI · necrosis · collections · complications · carcinoma DD',
      fa: 'آتلانتا · CTSI · نکروز · تجمعات · عوارض · افتراق کارسینوم',
    },
  },
  {
    "id": "meniskus",
    "area": "MSK",
    "chapter": "Knie",
    "icon": "🦵",
    "iconImage": "/fach/msk.png",
    "color": "#f97316",
    "href": "/flashcards/meniskus",
    "title": {
      "de": "Meniskus",
      "en": "Meniscus",
      "fa": "منیسک"
    },
    "subtitle": {
      "de": "Anatomie · MRT-Grading · Rissdiagnostik · Therapie",
      "en": "Anatomy · MRI grading · tear diagnosis · therapy",
      "fa": "آناتومی · گریدینگ MRI · تشخیص پارگی · درمان"
    }
  },
  KNIE_LIGAMENTE_FLASHCARD_TOPIC,
  TECHNIK_ENTRANCE_KERMA_FLASHCARD_TOPIC,
  {
    "id": "haemangiom",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🟢",
    "iconImage": "/fach/abdomen.png",
    "color": "#10b981",
    "href": "/flashcards/haemangiom",
    "title": {
      "de": "Leberhämangiome",
      "en": "Liver haemangiomas",
      "fa": "همانژیوم‌های کبدی"
    },
    "subtitle": {
      "de": "Sono · CT · MRT · atypische Formen · DD Metastasen",
      "en": "Ultrasound · CT · MRI · atypical forms · DD metastases",
      "fa": "سونوگرافی · CT · MRI · فرم آتیپیک · افتراق از متاستاز"
    }
  },
  {
    "id": "fnh",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🟡",
    "iconImage": "/fach/abdomen.png",
    "color": "#10b981",
    "href": "/flashcards/fnh",
    "title": {
      "de": "FNH",
      "en": "FNH",
      "fa": "FNH"
    },
    "subtitle": {
      "de": "Sono · CT · MRT · zentrale Narbe · atypische FNH · DD HCC",
      "en": "Ultrasound · CT · MRI · central scar · atypical FNH · DD HCC",
      "fa": "سونوگرافی · CT · MRI · اسکار مرکزی · FNH آتیپیک · افتراق از HCC"
    }
  },
  {
    "id": "leberadenom",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🟡",
    "iconImage": "/fach/abdomen.png",
    "color": "#10b981",
    "href": "/flashcards/leberadenom",
    "title": { "de": "Leberadenom", "en": "Hepatocellular adenoma", "fa": "آدنوم هپاتوسلولار" },
    "subtitle": { "de": "CT · MRT · HBP · Differenzialdiagnose FNH", "en": "CT · MRI · HBP · FNH differential", "fa": "CT · MRI · HBP · افتراق از FNH" }
  },
  {
    "id": "avm",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🩸",
    "iconImage": "/fach/abdomen.png",
    "color": "#10b981",
    "href": "/flashcards/avm",
    "title": {
      "de": "AVM der Leber",
      "en": "Hepatic AVM",
      "fa": "AVM کبد"
    },
    "subtitle": {
      "de": "Shunt-Typen · Doppler · Early venous filling · THAD/THID · HHT",
      "en": "Shunt types · Doppler · early venous filling · THAD/THID · HHT",
      "fa": "انواع شانت · داپلر · پرشدگی زودرس وریدی · THAD/THID · HHT"
    }
  },
  {
    "id": "hcc",
    "area": "Abdomen",
    "chapter": "Leber",
    "icon": "🔴",
    "iconImage": "/fach/abdomen.png",
    "color": "#dc2626",
    "href": "/flashcards/hcc",
    "title": {
      "de": "Hepatozelluläres Karzinom",
      "en": "Hepatocellular carcinoma",
      "fa": "کارسینوم هپاتوسلولار"
    },
    "subtitle": {
      "de": "Risikokontext · APHE · Wash-out · LI-RADS · Gefäßinvasion",
      "en": "Risk context · APHE · wash-out · LI-RADS · vascular invasion",
      "fa": "زمینه خطر · APHE · واش‌اوت · LI-RADS · تهاجم عروقی"
    }
  },
  {
    "id": "sarkoidose",
    "area": "Thorax",
    "chapter": "Lunge",
    "icon": "🫁",
    "iconImage": "/fach/thorax.png",
    "color": "#0284c7",
    "href": "/flashcards/sarkoidose",
    "title": {
      "de": "Sarkoidose",
      "en": "Sarcoidosis",
      "fa": "سارکوئیدوز"
    },
    "subtitle": {
      "de": "Scadding · HRCT · Lymphknoten · DD",
      "en": "Scadding · HRCT · lymph nodes · DD",
      "fa": "Scadding · HRCT · لنف‌نود · تشخیص افتراقی"
    }
  },
  {
    "id": "rotatorenmanschette",
    "area": "MSK",
    "chapter": "Schulter",
    "icon": "💪",
    "iconImage": "/fach/msk.png",
    "color": "#f97316",
    "href": "/flashcards/rotatorenmanschette",
    "title": {
      "de": "Rotatorenmanschette",
      "en": "Rotator Cuff",
      "fa": "روتاتور کاف"
    },
    "subtitle": {
      "de": "Anatomie · MRT-Protokoll · Partial-/Komplettrupturen · Patte · Goutallier",
      "en": "Anatomy · MRI protocol · partial/full-thickness tears · Patte · Goutallier",
      "fa": "آناتومی · پروتکل MRI · پارگی جزئی/کامل · Patte · Goutallier"
    }
  }
]

const DIVERTICULITIS_FLASHCARD_CONTENT = [
  {
  "id": "definition",
  "category": {
    "de": "Grundlagen",
    "en": "Basics",
    "fa": "مبانی"
  },
  "front": {
    "de": "Was unterscheidet Divertikulose von Divertikulitis?",
    "en": "What distinguishes diverticulosis from diverticulitis?",
    "fa": "تفاوت دیورتیکولوز و دیورتیکولیت چیست؟"
  },
  "answer": {
    "de": "Divertikulose: Divertikel ohne akute Entzündung. Divertikulitis: entzündete Divertikel; Wand- und Umgebungsreaktion nach Ausmaß beschreiben.",
    "en": "Diverticulosis: diverticula without acute inflammation. Diverticulitis: inflamed diverticula; describe the extent of mural and surrounding reaction.",
    "fa": "دیورتیکولوز: دیورتیکول بدون التهاب حاد. دیورتیکولیت: دیورتیکول ملتهب؛ میزان واکنش دیواره و اطراف را توصیف کنید."
  },
  "explanation": {
    "de": "Divertikel allein beweisen keine akute Divertikulitis. Divertikelzentrierte Wandbefunde und Umgebungsreaktion gemeinsam beurteilen; eine ausgeprägte phlegmonöse Reaktion ist nicht für jede Form erforderlich (CDD 1a versus 1b).",
    "en": "Diverticula alone do not establish acute diverticulitis. Assess diverticulum-centred wall findings with surrounding reaction; marked phlegmonous inflammation is not required in every form (CDD 1a versus 1b).",
    "fa": "وجود دیورتیکول به‌تنهایی دیورتیکولیت حاد را ثابت نمی‌کند. یافته‌های دیواره با مرکزیت دیورتیکول و واکنش اطراف را با هم بررسی کنید؛ التهاب فلگمونی واضح در همهٔ شکل‌ها لازم نیست (CDD 1a در برابر 1b)."
  },
  "diagram": {
    "de": "Divertikel ohne Entzündung → Divertikulose\nDivertikel + Entzündung → Divertikulitis",
    "en": "Diverticulum without inflammation → diverticulosis\nDiverticulum + inflammation → diverticulitis",
    "fa": "دیورتیکول بدون التهاب → دیورتیکولوز\nدیورتیکول + التهاب → دیورتیکولیت"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
    id: 'ct-triad',
    category: { de: 'CT-Leitbefunde', en: 'Core CT findings', fa: 'یافته‌های اصلی CT' },
    front: { de: 'Wie lautet die typische CT-Trias der akuten Divertikulitis?', en: 'What is the typical CT triad of acute diverticulitis?', fa: 'تریاد تیپیک CT در دیورتیکولیت حاد چیست؟' },
    answer: { de: 'Divertikel + segmentale Darmwandverdickung + perikolisches Fettgewebsstranding.', en: 'Diverticula + segmental bowel wall thickening + pericolic fat stranding.', fa: 'دیورتیکول + ضخیم‌شدگی سگمنتال دیواره روده + التهاب چربی پریکولیک.' },
    explanation: { de: 'Ein sichtbares entzündetes Divertikel hilft, das Entzündungszentrum sicher zu lokalisieren.', en: 'Identifying an inflamed diverticulum helps localise the epicentre of inflammation.', fa: 'مشاهده دیورتیکول ملتهب به تعیین مرکز التهاب کمک می‌کند.' },
    diagram: { de: 'Divertikel → Wandverdickung → perikolisches Stranding', en: 'Diverticulum → wall thickening → pericolic stranding', fa: 'دیورتیکول → ضخیم‌شدگی دیواره → التهاب پریکولیک' },
  },
  {
  "id": "protocol",
  "category": {
    "de": "CT-Technik",
    "en": "CT technique",
    "fa": "تکنیک CT"
  },
  "front": {
    "de": "Welches CT-Protokoll reicht bei akuter Divertikulitis meist aus?",
    "en": "Which CT protocol is usually sufficient for acute diverticulitis?",
    "fa": "کدام پروتکل CT معمولاً برای دیورتیکولیت حاد کافی است؟"
  },
  "answer": {
    "de": "Kontrastverstärkte CT in portalvenöser Phase.",
    "en": "Portal venous phase contrast-enhanced CT.",
    "fa": "CT با کنتراست در فاز پورتال‌ونوس."
  },
  "explanation": {
    "de": "Damit lassen sich Darmwand, Fettgewebsreaktion, Abszesse und freie Flüssigkeit beurteilen. Enterales Kontrastmittel ist routinemäßig meist nicht nötig.",
    "en": "This assesses the bowel wall, inflammatory fat change, abscesses and free fluid. Routine enteric contrast is usually unnecessary.",
    "fa": "این روش دیواره روده، التهاب چربی، آبسه و مایع آزاد را ارزیابی می‌کند. کنتراست گوارشی روتین معمولاً لازم نیست."
  },
  "diagram": {
    "de": "CT C+ portalvenös → Diagnose + Ausdehnung + Komplikationen",
    "en": "Portal venous C+ CT → diagnosis + extent + complications",
    "fa": "CT پورتال‌ونوس با کنتراست → تشخیص + وسعت + عوارض"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1; https://acsearch.acr.org/docs/69356/Narrative/"
},
  {
  "id": "cdd-1",
  "category": {
    "de": "CDD",
    "en": "CDD",
    "fa": "CDD"
  },
  "front": {
    "de": "Was unterscheidet CDD Typ 1a und 1b?",
    "en": "What distinguishes CDD type 1a from 1b?",
    "fa": "تفاوت CDD نوع 1a و 1b چیست؟"
  },
  "answer": {
    "de": "1a: Wandverdickung ohne relevante Umgebungsreaktion. 1b: phlegmonöse perikolische Reaktion ohne Abszess.",
    "en": "1a: wall thickening without relevant surrounding inflammation. 1b: phlegmonous pericolic inflammation without abscess.",
    "fa": "1a: ضخیم‌شدگی دیواره بدون التهاب قابل توجه اطراف. 1b: التهاب فلگمونوس پریکولیک بدون آبسه."
  },
  "explanation": {
    "de": "Typ 1a und 1b gehören zur unkomplizierten Kategorie. Bei 1b können Flüssigkeitsstraßen ohne Luft vorkommen; ein Abszess ist davon abzugrenzen. Freie Perforation oder Fistel sind Komplikationen.",
    "en": "Types 1a and 1b belong to the uncomplicated category. Type 1b may include fluid tracks without gas; distinguish these from an abscess. Free perforation or fistula are complications.",
    "fa": "انواع 1a و 1b در دستهٔ بدون عارضه‌اند. در نوع 1b ممکن است مسیرهای مایع بدون گاز دیده شود؛ آن‌ها را از آبسه جدا کنید. پرفوراسیون آزاد یا فیستول، عارضه هستند."
  },
  "diagram": {
    "de": "CDD 1a → Wand\nCDD 1b → Wand + Phlegmone\nkein Abszess",
    "en": "CDD 1a → wall\nCDD 1b → wall + phlegmon\nno abscess",
    "fa": "CDD 1a → دیواره\nCDD 1b → دیواره + فلگمون\nبدون آبسه"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
  "id": "cdd-2",
  "category": {
    "de": "CDD",
    "en": "CDD",
    "fa": "CDD"
  },
  "front": {
    "de": "Wie werden CDD Typ 2a, 2b und 2c nach S3/DGVS 2021 unterschieden?",
    "en": "How are CDD types 2a, 2b and 2c distinguished according to S3/DGVS 2021?",
    "fa": "بر اساس S3/DGVS 2021، انواع CDD 2a، 2b و 2c چگونه از هم جدا می‌شوند؟"
  },
  "answer": {
    "de": "2a: Mikroabszess bis 3 cm. 2b: Makroabszess >3 cm. 2c: freie Perforation.",
    "en": "2a: microabscess up to 3 cm. 2b: macroabscess >3 cm. 2c: free perforation.",
    "fa": "2a: میکروآبسه تا ۳ سانتی‌متر. 2b: ماکروآبسه بیش از ۳ سانتی‌متر. 2c: پرفوراسیون آزاد."
  },
  "explanation": {
    "de": "CDD Typ 2 bezeichnet eine akut komplizierte Divertikulitis. Die genaue Einordnung beeinflusst das weitere Management.",
    "en": "CDD type 2 is acute complicated diverticulitis. Subclassification affects subsequent management.",
    "fa": "CDD نوع ۲ دیورتیکولیت حاد پیچیده است و زیرگروه آن بر درمان اثر دارد."
  },
  "diagram": {
    "de": "≤3 cm → 2a\n>3 cm → 2b\nfreie Perforation → 2c",
    "en": "≤3 cm → 2a\n>3 cm → 2b\nfree perforation → 2c",
    "fa": "≤۳ سانتی‌متر → 2a\n>۳ سانتی‌متر → 2b\nپرفوراسیون آزاد → 2c"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
  "id": "cdd-3",
  "category": {
    "de": "CDD",
    "en": "CDD",
    "fa": "CDD"
  },
  "front": {
    "de": "Wie unterscheiden sich CDD 3a, 3b und 3c?",
    "en": "How do CDD types 3a, 3b and 3c differ?",
    "fa": "تفاوت CDD نوع 3a، 3b و 3c چیست؟"
  },
  "answer": {
    "de": "3a: symptomatische unkomplizierte Divertikelkrankheit (SUDD). 3b: rezidivierende Divertikulitis ohne Komplikation. 3c: rezidivierende Divertikulitis mit Komplikation.",
    "en": "3a: symptomatic uncomplicated diverticular disease (SUDD). 3b: recurrent diverticulitis without complications. 3c: recurrent diverticulitis with complications.",
    "fa": "3a: بیماری دیورتیکولی علامت‌دار بدون عارضه (SUDD). 3b: دیورتیکولیت عودکننده بدون عارضه. 3c: دیورتیکولیت عودکننده همراه عارضه."
  },
  "explanation": {
    "de": "Typ 3c umfasst rezidivierende Divertikulitis mit Komplikationen wie Stenose oder Fistel. Ein akuter Abszess oder eine freie Perforation wird als akute Komplikation im Typ 2-System beschrieben.",
    "en": "Type 3c includes recurrent diverticulitis with complications such as stenosis or fistula. An acute abscess or free perforation is described as an acute complication in the type 2 system.",
    "fa": "نوع 3c دیورتیکولیت عودکننده همراه با عوارضی مانند تنگی یا فیستول را شامل می‌شود. آبسهٔ حاد یا پرفوراسیون آزاد به‌عنوان عارضهٔ حاد در نظام نوع 2 توصیف می‌شود."
  },
  "diagram": {
    "de": "3a → SUDD\n3b → Rezidive ohne Komplikation\n3c → Rezidive mit Komplikation",
    "en": "3a → SUDD\n3b → recurrence without complications\n3c → recurrence with complications",
    "fa": "3a → SUDD\n3b → عود بدون عارضه\n3c → عود همراه عارضه"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
    id: 'abscess',
    category: { de: 'Komplikationen', en: 'Complications', fa: 'عوارض' },
    front: { de: 'Wie sieht ein divertikulitischer Abszess in der CT aus?', en: 'How does a diverticular abscess appear on CT?', fa: 'آبسه ناشی از دیورتیکولیت در CT چگونه دیده می‌شود؟' },
    answer: { de: 'Flüssigkeitsdichte Kollektion mit randständigem Enhancement, häufig mit Gaseinschlüssen.', en: 'A fluid-attenuation collection with rim enhancement, often containing gas.', fa: 'تجمع با دانسیته مایع و تقویت حاشیه‌ای که اغلب حاوی گاز است.' },
    explanation: { de: 'Größe in drei Dimensionen, Lokalisation und mögliche Zugänglichkeit für eine Drainage sollten angegeben werden.', en: 'Report size in three dimensions, location and potential accessibility for drainage.', fa: 'اندازه در سه بعد، محل و امکان دسترسی برای درناژ باید گزارش شود.' },
    diagram: { de: 'Flüssigkeit + Randenhancement ± Gas → Abszess', en: 'Fluid + rim enhancement ± gas → abscess', fa: 'مایع + تقویت حاشیه‌ای ± گاز → آبسه' },
  },
  {
  "id": "perforation",
  "category": {
    "de": "Komplikationen",
    "en": "Complications",
    "fa": "عوارض"
  },
  "front": {
    "de": "Welche Verteilung kann gedeckte von freier Perforation unterscheiden?",
    "en": "Which distribution can help distinguish contained from free perforation?",
    "fa": "کدام توزیع می‌تواند به افتراق پرفوراسیون محدودشده از آزاد کمک کند؟"
  },
  "answer": {
    "de": "Gedeckt: lokalisierte perikolische Gasbläschen. Frei: freie intraperitoneale Luft und Flüssigkeit im passenden Gesamtbild; Peritonitis klinisch beurteilen.",
    "en": "Contained: localised pericolic gas bubbles. Free: free intraperitoneal gas and fluid in a compatible overall pattern; assess peritonitis clinically.",
    "fa": "محدودشده: حباب‌های موضعی گاز اطراف کولون. آزاد: گاز و مایع آزاد داخل صفاق در الگوی کلی سازگار؛ پریتونیت را بالینی ارزیابی کنید."
  },
  "explanation": {
    "de": "Freie Perforation entspricht CDD 2c und ist eine wesentliche Notfallinformation. Bildverteilung und klinischen Befund zusammenführen; die CT allein ersetzt die klinische Peritonitisbeurteilung nicht.",
    "en": "Free perforation corresponds to CDD 2c and is critical emergency information. Integrate imaging distribution and clinical findings; CT alone does not replace clinical assessment for peritonitis.",
    "fa": "پرفوراسیون آزاد با CDD 2c مطابقت دارد و اطلاعات مهم اورژانسی است. توزیع تصویری و بالین را جمع‌بندی کنید؛ CT به‌تنهایی جای ارزیابی بالینی پریتونیت را نمی‌گیرد."
  },
  "diagram": {
    "de": "lokales Gas → gedeckt\nfreies Gas + Flüssigkeit → frei",
    "en": "local gas → contained\nfree gas + fluid → free",
    "fa": "گاز موضعی → مهارشده\nگاز آزاد + مایع → آزاد"
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1; https://acsearch.acr.org/docs/69356/Narrative/"
},
  {
    id: 'fistula',
    category: { de: 'Komplikationen', en: 'Complications', fa: 'عوارض' },
    front: { de: 'Welches CT-Zeichen ist typisch für eine kolovesikale Fistel?', en: 'Which CT sign is typical of a colovesical fistula?', fa: 'کدام علامت CT برای فیستول کولووزیکال تیپیک است؟' },
    answer: { de: 'Intravesikales Gas ohne Instrumentierung bei entzündlichem Kontakt zwischen Sigma und Blase.', en: 'Intravesical gas without instrumentation with inflammatory contact between sigmoid colon and bladder.', fa: 'گاز داخل مثانه بدون ابزارگذاری همراه تماس التهابی سیگموئید و مثانه.' },
    explanation: { de: 'Zusätzlich können eine fokale Blasenwandverdickung und ein direkt sichtbarer Fisteltrakt vorliegen.', en: 'Focal bladder wall thickening and a directly visible fistulous tract may also be present.', fa: 'ضخیم‌شدگی موضعی دیواره مثانه و مسیر مستقیم فیستول نیز ممکن است دیده شود.' },
    diagram: { de: 'Sigmaentzündung → Kontakt/Fistel → Gas in Blase', en: 'Sigmoid inflammation → contact/fistula → bladder gas', fa: 'التهاب سیگموئید → تماس/فیستول → گاز مثانه' },
  },
  {
    id: 'stenosis',
    category: { de: 'Komplikationen', en: 'Complications', fa: 'عوارض' },
    front: { de: 'Welche Punkte gehören bei entzündlicher Kolonstenose in den Befund?', en: 'What should be reported for an inflammatory colonic stenosis?', fa: 'در تنگی التهابی کولون چه مواردی باید گزارش شود؟' },
    answer: { de: 'Länge und Grad der Einengung, prästenotische Dilatation und Tumorverdacht.', en: 'Length and degree of narrowing, upstream dilatation and concern for tumour.', fa: 'طول و شدت تنگی، اتساع قبل از تنگی و شک به تومور.' },
    explanation: { de: 'Chronische Divertikelkrankheit kann eine Stenose verursachen. Eine kurze irreguläre oder asymmetrische Stenose bleibt malignitätsverdächtig.', en: 'Chronic diverticular disease may cause stenosis. A short irregular or asymmetric stenosis remains suspicious for malignancy.', fa: 'بیماری مزمن دیورتیکولی می‌تواند تنگی ایجاد کند. تنگی کوتاه نامنظم یا نامتقارن مشکوک به بدخیمی است.' },
    diagram: { de: 'Stenose → prästenotische Dilatation\nkurz + asymmetrisch → Tumor-DD', en: 'Stenosis → upstream dilatation\nshort + asymmetric → tumour differential', fa: 'تنگی → اتساع قبل از تنگی\nکوتاه + نامتقارن → افتراق تومور' },
  },
  {
    id: 'cancer',
    category: { de: 'Differenzialdiagnose', en: 'Differential diagnosis', fa: 'تشخیص افتراقی' },
    front: { de: 'Welche CT-Zeichen sprechen eher für Kolonkarzinom als für unkomplizierte Divertikulitis?', en: 'Which CT features favour colon cancer over uncomplicated diverticulitis?', fa: 'کدام یافته‌های CT بیشتر به نفع سرطان کولون نسبت به دیورتیکولیت بدون عارضه‌اند؟' },
    answer: { de: 'Kurze asymmetrische irreguläre Wandverdickung, suspekte Lymphknoten und fehlendes entzündetes Divertikel.', en: 'Short asymmetric irregular wall thickening, suspicious lymph nodes and no inflamed diverticulum.', fa: 'ضخیم‌شدگی کوتاه نامتقارن و نامنظم دیواره، لنف‌نودهای مشکوک و نبود دیورتیکول ملتهب.' },
    explanation: { de: 'Bei atypischem Muster darf der Befund nicht vorschnell als Divertikulitis abgeschlossen werden.', en: 'An atypical pattern should not be prematurely dismissed as diverticulitis.', fa: 'در الگوی آتیپیک نباید یافته به‌سرعت دیورتیکولیت تلقی شود.' },
    diagram: { de: 'langes Segment + Stranding → eher Entzündung\nkurz + irregulär + LK → Tumor-DD', en: 'long segment + stranding → inflammation\nshort + irregular + nodes → tumour differential', fa: 'سگمنت طولانی + التهاب چربی → التهاب\nکوتاه + نامنظم + لنف‌نود → افتراق تومور' },
  },
  {
    id: 'report',
    category: { de: 'Befundung', en: 'Reporting', fa: 'گزارش' },
    front: { de: 'Welche fünf Punkte sollte ein strukturierter CT-Befund zur Divertikulitis beantworten?', en: 'Which five points should a structured CT report for diverticulitis answer?', fa: 'گزارش ساختاریافته CT دیورتیکولیت باید به کدام پنج مورد پاسخ دهد؟' },
    answer: { de: 'Lokalisation, Leitbefunde, Komplikationen, Einordnung und Differenzialdiagnose.', en: 'Location, core findings, complications, classification and differential diagnosis.', fa: 'محل، یافته‌های اصلی، عوارض، طبقه‌بندی و تشخیص افتراقی.' },
    explanation: { de: 'Bei einem Abszess zusätzlich drei Dimensionen und Zugänglichkeit nennen; bei atypischem Befund Tumorverdacht formulieren.', en: 'For an abscess, add three-dimensional size and accessibility; state concern for tumour when the pattern is atypical.', fa: 'برای آبسه اندازه سه‌بعدی و دسترسی را ذکر کنید؛ در الگوی آتیپیک شک به تومور را بیان کنید.' },
    diagram: { de: 'Wo? → Was? → Komplikation? → CDD? → DD?', en: 'Where? → What? → Complication? → CDD? → Differential?', fa: 'کجا؟ → چه چیزی؟ → عارضه؟ → CDD؟ → افتراق؟' },
  },
  {
    id: 'summary',
    category: { de: 'Take home', en: 'Take home', fa: 'نکات کلیدی' },
    front: { de: 'Was ist nach Erkennen einer Divertikulitis die wichtigste nächste radiologische Aufgabe?', en: 'After recognising diverticulitis, what is the most important next radiological task?', fa: 'پس از تشخیص دیورتیکولیت، مهم‌ترین وظیفه بعدی رادیولوژی چیست؟' },
    answer: { de: 'Aktiv nach Abszess, Perforation, Fistel und Stenose suchen.', en: 'Actively search for abscess, perforation, fistula and stenosis.', fa: 'جست‌وجوی فعال برای آبسه، پرفوراسیون، فیستول و تنگی.' },
    explanation: { de: 'Die Trennung unkompliziert versus kompliziert ist für das weitere Management wichtiger als die reine Benennung der Entzündung.', en: 'Distinguishing uncomplicated from complicated disease is more important for management than merely naming the inflammation.', fa: 'تفکیک بیماری بدون عارضه از پیچیده برای درمان مهم‌تر از صرفاً نام‌گذاری التهاب است.' },
    diagram: { de: 'Divertikulitis erkannt → Komplikationen suchen → CDD einordnen', en: 'Diverticulitis recognised → search complications → assign CDD', fa: 'تشخیص دیورتیکولیت → جست‌وجوی عوارض → تعیین CDD' },
  },
]

const DIVERTICULITIS_FLASHCARDS = DIVERTICULITIS_FLASHCARD_CONTENT.map(item => ({
  id: `divertikulitis-${item.id}`,
  topicId: 'divertikulitis',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  diagram: item.diagram,
  ...(item.source ? { source: item.source } : {}),
}))

const PANCREATITIS_FLASHCARD_CONTENT = [
  {
  "id": "causes",
  "category": {
    "de": "Ätiologie",
    "en": "Aetiology",
    "fa": "اتیولوژی"
  },
  "front": {
    "de": "Was sind die häufigsten Ursachen der akuten Pankreatitis?",
    "en": "What are the most common causes of acute pancreatitis?",
    "fa": "شایع‌ترین علل پانکراتیت حاد چیست؟"
  },
  "answer": {
    "de": "Gallensteine/Mikrolithiasis und Alkohol gehören zu den häufigsten Ursachen. Je nach Kontext auch metabolische, medikamentöse, autoimmune oder iatrogene Ursachen prüfen.",
    "en": "Gallstones/microlithiasis and alcohol are among the most common causes. Assess metabolic, drug-related, autoimmune or iatrogenic causes according to context.",
    "fa": "سنگ صفراوی یا میکرولیتیازیس و الکل از شایع‌ترین علل‌اند. بسته به زمینه، علل متابولیک، دارویی، خودایمنی یا یاتروژنیک نیز بررسی شوند."
  },
  "explanation": {
    "de": "Häufigkeiten variieren zwischen Populationen; keine feste Prozentverteilung auf alle Patienten übertragen. ACG empfiehlt Sonographie zur biliären Ursachensuche und bei ungeklärter Ursache eine weiterführende Abklärung, etwa erneute Sonographie, MRT oder EUS.",
    "en": "Frequencies vary between populations; do not apply a fixed percentage distribution to every patient. ACG recommends ultrasound to investigate a biliary cause and further assessment of unexplained disease, such as repeat ultrasound, MRI or EUS.",
    "fa": "فراوانی‌ها بین جمعیت‌ها متفاوت‌اند؛ یک تقسیم‌بندی درصدی ثابت به همهٔ بیماران تعمیم داده نشود. ACG سونوگرافی را برای بررسی علت صفراوی و در علت نامشخص، ارزیابی بیشتر مانند تکرار سونوگرافی، MRI یا EUS توصیه می‌کند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002645"
},
  {
  "id": "biliary-mechanism",
  "category": {
    "de": "Pathophysiologie",
    "en": "Pathophysiology",
    "fa": "پاتوفیزیولوژی"
  },
  "front": {
    "de": "Welche anatomische Abflussstörung ist für eine biliäre Pankreatitis relevant?",
    "en": "Which anatomical outflow obstruction is relevant to biliary pancreatitis?",
    "fa": "کدام اختلال آناتومیک خروجی در پانکراتیت صفراوی اهمیت دارد؟"
  },
  "answer": {
    "de": "Ein Stein an der Papillen-/Ampullenregion kann den distalen pankreatischen Abfluss beeinträchtigen.",
    "en": "A stone at the papillary/ampullary region can impair distal pancreatic drainage.",
    "fa": "سنگ ناحیهٔ پاپیلا/آمپولا می‌تواند تخلیهٔ دیستال پانکراس را مختل کند."
  },
  "explanation": {
    "de": "Choledocholithiasis und Gallenwegsobstruktion gezielt suchen. Bei unklarem Steinstatus können MRCP oder EUS helfen; eine biliäre Ursache allein ohne Cholangitis bedeutet keine automatische dringliche ERCP.",
    "en": "Look for choledocholithiasis and biliary obstruction. MRCP or EUS can help when stone status is uncertain; a biliary cause alone without cholangitis does not automatically require urgent ERCP.",
    "fa": "کلدوکولیتیاز و انسداد صفراوی هدفمند بررسی شوند. در نامشخص‌بودن وجود سنگ، MRCP یا EUS کمک می‌کند؛ علت صفراوی به‌تنهایی بدون کلانژیت خودبه‌خود ERCP فوری را لازم نمی‌کند."
  },
  "source": "https://doi.org/10.1016/j.pan.2025.04.020"
},
  {
  "id": "necrosis-timing",
  "category": {
    "de": "CT-Zeitpunkt",
    "en": "CT timing",
    "fa": "زمان CT"
  },
  "front": {
    "de": "Warum ist die Nekrosebeurteilung in der Frühphase schwierig?",
    "en": "Why is necrosis assessment difficult early on?",
    "fa": "چرا ارزیابی نکروز در فاز خیلی زود دشوار است؟"
  },
  "answer": {
    "de": "Frühe CT kann das Ausmaß der Nekrose unterschätzen; es gibt keinen Zeitpunkt mit garantierter Nachweisbarkeit.",
    "en": "Early CT can underestimate the extent of necrosis; no time point guarantees detection.",
    "fa": "CT زودهنگام ممکن است وسعت نکروز را کمتر نشان دهد؛ هیچ زمان ثابتی تشخیص را تضمین نمی‌کند."
  },
  "explanation": {
    "de": "WSES2019 nennt bei schwerer Pankreatitis für die erste CT idealerweise 72–96 h ab Symptombeginn; diagnostische Unsicherheit oder dringliche Komplikationen können frühere Bildgebung erfordern. Kein pauschaler CT-Termin für jede leichte Pankreatitis.",
    "en": "WSES2019 ideally places first CT in severe pancreatitis at 72–96 hours after symptom onset; diagnostic uncertainty or urgent complications can require earlier imaging. This is not a blanket CT schedule for every mild pancreatitis.",
    "fa": "WSES۲۰۱۹ برای نخستین CT در پانکراتیت شدید بازهٔ ایده‌آل ۷۲ تا ۹۶ ساعت پس از شروع علائم را ذکر می‌کند؛ تردید تشخیصی یا عوارض فوری می‌توانند بررسی زودتر را لازم کنند. این زمان‌بندی همگانی CT برای هر پانکراتیت خفیف نیست."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6567462/"
},
  {
  "id": "atlanta-morphology",
  "category": {
    "de": "Atlanta",
    "en": "Atlanta",
    "fa": "آتلانتا"
  },
  "front": {
    "de": "Wie unterscheidet Atlanta ödematöse und nekrotisierende Pankreatitis?",
    "en": "How does Atlanta distinguish oedematous from necrotising pancreatitis?",
    "fa": "آتلانتا چگونه پانکراتیت ادماتوی را از نکروزان جدا می‌کند؟"
  },
  "answer": {
    "de": "Interstitiell-ödematös: erhaltenes Parenchym-Enhancement ohne erkennbare Gewebenekrose. Nekrotisierend: pankreatische Nekrose und/oder peripankreatische Nekrose; bei isolierter peripankreatischer Nekrose kann das Pankreas selbst normal kontrastieren.",
    "en": "Interstitial oedematous: preserved parenchymal enhancement without recognisable tissue necrosis. Necrotising: pancreatic and/or peripancreatic necrosis; pancreatic enhancement may remain normal with isolated peripancreatic necrosis.",
    "fa": "ادماتوی بینابینی: جذب حفظ‌شدهٔ مادهٔ حاجب در پارانشیم، بدون نکروز بافتی قابل‌شناسایی. نکروزان: نکروز پانکراس و/یا اطراف پانکراس؛ در نکروز منفرد اطراف پانکراس، جذب خود پانکراس می‌تواند طبیعی بماند."
  },
  "explanation": {
    "de": "Fehlendes Parenchym-Enhancement stützt pankreatische Nekrose. Peripankreatische Nekrose anhand der Kollektion und nichtflüssiger nekrotischer Anteile beurteilen, nicht als fehlendes Fett-Enhancement definieren. Frühe CT kann die Ausdehnung unterschätzen; Inhalt und Verlauf sind wichtig.",
    "en": "Absent parenchymal enhancement supports pancreatic necrosis. Assess peripancreatic necrosis through collection morphology and nonliquid necrotic components, rather than defining it as absent fat enhancement. Early CT can underestimate extent; contents and evolution matter.",
    "fa": "فقدان جذب مادهٔ حاجب در پارانشیم از نکروز پانکراس حمایت می‌کند. نکروز اطراف پانکراس با مورفولوژی تجمع و اجزای نکروتیک غیرمایع بررسی شود، نه با تعریف «فقدان جذب در چربی». CT زودهنگام می‌تواند وسعت را کمتر نشان دهد؛ محتوا و سیر اهمیت دارند."
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "collections",
  "category": {
    "de": "Kollektionen",
    "en": "Collections",
    "fa": "تجمعات"
  },
  "front": {
    "de": "Wie verbinden Sie Zeit, Inhalt und Wand mit den vier Atlanta-Kollektionen?",
    "en": "How do time, contents and wall relate to the four Atlanta collection terms?",
    "fa": "زمان، محتوا و دیواره چگونه با چهار اصطلاح تجمعات آتلانتا مرتبط‌اند؟"
  },
  "answer": {
    "de": "Interstitiell: frühe wandlose reine Flüssigkeit = APFC, reife abgekapselte reine Flüssigkeit = Pseudozyste. Nekrotisierend: frühe nekrotische Kollektion = ANC, reife abgekapselte Nekrose = WON.",
    "en": "Interstitial: early wall-less pure fluid = APFC; mature encapsulated pure fluid = pseudocyst. Necrotising: early necrotic collection = ANC; mature encapsulated necrosis = WON.",
    "fa": "بینابینی: مایع خالص زودرس بدون دیواره = APFC؛ مایع خالص بالغ و کپسول‌دار = پسودوسیست. نکروزان: تجمع نکروتیک زودرس = ANC؛ نکروز بالغ و محصورشده = WON."
  },
  "explanation": {
    "de": "Die Reifung erfolgt gewöhnlich über etwa vier Wochen, ist aber kein reines Kalenderkriterium. Nekrotischer Inhalt trennt ANC/WON von APFC/Pseudozyste. Nicht jede frühe Kollektion entwickelt eine persistierende reife Kollektion.",
    "en": "Maturation usually takes about four weeks, but this is not a calendar criterion alone. Necrotic contents distinguish ANC/WON from APFC/pseudocyst. Not every early collection evolves into a persistent mature collection.",
    "fa": "بلوغ معمولاً حدود چهار هفته طول می‌کشد، اما این صرفاً معیار تقویمی نیست. محتوای نکروتیک ANC/WON را از APFC/پسودوسیست جدا می‌کند. هر تجمع زودرس به تجمع بالغ پایدار تبدیل نمی‌شود."
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "ctsi",
  "category": {
    "de": "CTSI",
    "en": "CTSI",
    "fa": "CTSI"
  },
  "front": {
    "de": "Woraus besteht der CT-Schweregrad-Index nach Balthazar?",
    "en": "What makes up the Balthazar CT severity index?",
    "fa": "شاخص شدت CT بر اساس Balthazar از چه چیزهایی تشکیل می‌شود؟"
  },
  "answer": {
    "de": "Balthazar-Grad A–E plus Nekrose-Score; maximal 10 Punkte.",
    "en": "Balthazar grade A–E plus necrosis score; maximum 10 points.",
    "fa": "گرید Balthazar از A تا E به‌علاوه امتیاز نکروز؛ حداکثر ۱۰ امتیاز."
  },
  "explanation": {
    "de": "Der Original-CTSI addiert Balthazar-Grad und Nekroseausmaß. Er beschreibt morphologische CT-Befunde; die klinische Atlanta-Schwereklassifikation benötigt zusätzlich Organfunktion und Verlauf. Ein hoher CTSI allein belegt weder persistierendes Organversagen noch Infektion.",
    "en": "The original CTSI adds Balthazar grade and necrosis extent. It describes CT morphology; clinical Atlanta severity additionally requires organ function and time course. A high CTSI alone establishes neither persistent organ failure nor infection.",
    "fa": "CTSI اصلی، گرید بالتازار و وسعت نکروز را جمع می‌کند. مورفولوژی CT را توصیف می‌کند؛ شدت بالینی آتلانتا علاوه بر آن به عملکرد اندام‌ها و سیر زمانی نیاز دارد. CTSI بالا به‌تنهایی نه نارسایی پایدار اندام و نه عفونت را قطعی نمی‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2296641/"
},
  {
  "id": "pseudoaneurysm",
  "category": {
    "de": "Komplikationen",
    "en": "Complications",
    "fa": "عوارض"
  },
  "front": {
    "de": "Wie erkennt man ein Pseudoaneurysma bei Pankreatitis?",
    "en": "How is a pseudoaneurysm recognised in pancreatitis?",
    "fa": "پسودوآنوریسم در پانکراتیت چگونه تشخیص داده می‌شود؟"
  },
  "answer": {
    "de": "Umschriebene arterielle Kontrastierung in/nahe einer Kollektion mit Anschluss an eine Arterie.",
    "en": "Focal arterial enhancement within/near a collection with continuity to an artery.",
    "fa": "جذب کانونی شریانی مادهٔ حاجب داخل/کنار تجمع همراه اتصال به شریان."
  },
  "explanation": {
    "de": "Ein Pseudoaneurysma kann eine Blutungsquelle sein. Eine rein flüssige Kollektion oder nicht perfundierte Nekrose zeigt diese arterielle Anreicherung nicht. Zeitnahe fachübergreifende Gefäßabklärung ist erforderlich.",
    "en": "A pseudoaneurysm may be a bleeding source. A pure fluid collection or nonperfused necrosis does not show this arterial enhancement. Timely multidisciplinary vascular evaluation is needed.",
    "fa": "پسودوآنوریسم می‌تواند منبع خونریزی باشد. تجمع مایع خالص یا نکروز بدون پرفیوژن این جذب شریانی را نشان نمی‌دهد. بررسی عروقی به‌موقع و چندتخصصی لازم است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3291674/"
},
  {
  "id": "infected-necrosis",
  "category": {
    "de": "Komplikationen",
    "en": "Complications",
    "fa": "عوارض"
  },
  "front": {
    "de": "Welches Zeichen spricht im CT für infizierte Nekrose?",
    "en": "Which CT sign indicates infected necrosis?",
    "fa": "کدام علامت CT به نفع نکروز عفونی است؟"
  },
  "answer": {
    "de": "Gas im Nekroseareal ohne vorausgegangene Intervention oder enterische Fistel ist ein starker Hinweis.",
    "en": "Gas in necrosis without prior intervention or an enteric fistula is a strong clue.",
    "fa": "گاز در ناحیهٔ نکروز بدون مداخلهٔ قبلی یا فیستول روده‌ای سرنخ قوی است."
  },
  "explanation": {
    "de": "Gas ist nicht bei jeder infizierten Nekrose vorhanden; fehlendes Gas schließt Infektion nicht aus. Eingriffe, Fisteln, Klinik und Verlauf gemeinsam bewerten.",
    "en": "Gas is absent in many infected necroses; no gas does not exclude infection. Assess interventions, fistulas, clinical findings and evolution together.",
    "fa": "گاز در بسیاری از نکروزهای عفونی وجود ندارد؛ نبود گاز عفونت را رد نمی‌کند. مداخلات، فیستول، یافته‌های بالینی و سیر با هم ارزیابی شوند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6567462/"
},
  {
  "id": "duct-disruption",
  "category": {
    "de": "Komplikationen",
    "en": "Complications",
    "fa": "عوارض"
  },
  "front": {
    "de": "Welcher MRCP-Befund spricht für eine Pankreasgangruptur mit möglichem Disconnected-Duct-Syndrom?",
    "en": "Which MRCP finding suggests pancreatic duct disruption with possible disconnected duct syndrome?",
    "fa": "کدام یافته در MRCP به نفع پارگی مجرای پانکراس با احتمال سندرم مجرای جداشده است؟"
  },
  "answer": {
    "de": "Fehlende Gangkontinuität; bei Disconnection bleibt ein vitaler vorgeschalteter Pankreasanteil vom ableitenden Gang getrennt.",
    "en": "Loss of duct continuity; in disconnection, viable upstream pancreas is separated from the draining duct.",
    "fa": "قطع پیوستگی مجرا؛ در قطع ارتباط کامل، بخش زندهٔ بالادست پانکراس از مجرای تخلیه‌کننده جدا می‌شود."
  },
  "explanation": {
    "de": "Standard-MRCP stellt Flüssigkeit T2-gewichtet dar. Sekretin-MRCP kann neu auftretende oder zunehmende Flüssigkeit außerhalb des Gangs zeigen; nicht als Kontrastmittelleck der Standard-MRCP bezeichnen.",
    "en": "Standard MRCP depicts fluid with T2 weighting. Secretin-enhanced MRCP can show new or increasing fluid outside the duct; do not call this a contrast leak on standard MRCP.",
    "fa": "MRCP معمول مایع را با وزن T2 نشان می‌دهد. MRCP با سکرتین ممکن است مایع تازه یا رو به افزایش خارج مجرا را نشان دهد؛ این یافته نشت مادهٔ حاجب در MRCP معمول نیست."
  },
  "source": "https://www.cghjournal.org/article/S1542-3565(25)00586-5/fulltext"
},
  {
  "id": "chronic-triad",
  "category": {
    "de": "Chronisch",
    "en": "Chronic",
    "fa": "مزمن"
  },
  "front": {
    "de": "Welche typische Kombination von Bildbefunden unterstützt chronische Pankreatitis?",
    "en": "Which typical combination of imaging findings supports chronic pancreatitis?",
    "fa": "کدام ترکیب تیپیک یافته‌های تصویربرداری از پانکراتیت مزمن حمایت می‌کند؟"
  },
  "answer": {
    "de": "Pankreasverkalkungen, Parenchymatrophie und dilatierter unregelmäßiger Ductus pancreaticus.",
    "en": "Pancreatic calcifications, parenchymal atrophy and a dilated irregular pancreatic duct.",
    "fa": "کلسیفیکاسیون پانکراس، آتروفی پارانشیم و اتساع نامنظم مجرای پانکراس."
  },
  "explanation": {
    "de": "Gangkaliberwechsel, Strikturen, Dilatationen und intraduktale Füllungsdefekte im Gesamtmuster beurteilen. Eine normale MRT/MRCP schließt milde chronische Pankreatitis nicht aus; keine einheitliche 3-mm-Grenze ersetzt die morphologische Beurteilung.",
    "en": "Assess duct calibre changes, strictures, dilatations and intraductal filling defects in the overall pattern. Normal MRI/MRCP does not exclude mild chronic pancreatitis; one universal 3-mm threshold does not replace morphological assessment.",
    "fa": "تغییر قطر مجرا، تنگی‌ها، اتساع‌ها و نقایص پُرشدگی داخل مجرا در الگوی کلی بررسی شوند. MRI یا MRCP طبیعی، پانکراتیت مزمن خفیف را رد نمی‌کند؛ مرز همگانی ۳ میلی‌متری جای ارزیابی مورفولوژیک را نمی‌گیرد."
  },
  "source": "https://doi.org/10.1177/2050640616684695"
},
  {
  "id": "carcinoma-dd",
  "category": {
    "de": "Differenzialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Was spricht eher für Pankreaskarzinom als für chronische Pankreatitis?",
    "en": "What favours pancreatic carcinoma over chronic pancreatitis?",
    "fa": "چه چیزی بیشتر به نفع کارسینوم پانکراس نسبت به پانکراتیت مزمن است؟"
  },
  "answer": {
    "de": "Abrupter fokaler Gangabbruch mit vorgeschalteter Atrophie und verdächtigem Gefäßkontakt erhöht den Karzinomverdacht.",
    "en": "Abrupt focal duct cut-off with upstream atrophy and suspicious vascular contact raises concern for carcinoma.",
    "fa": "قطع ناگهانی کانونی مجرا با آتروفی بالادست و تماس عروقی مشکوک، شک به سرطان را افزایش می‌دهد."
  },
  "explanation": {
    "de": "Ein glatt verengter, durch eine Raumforderung weiter verfolgbarer Hauptgang (Duct-penetrating-sign) unterstützt eine entzündliche Masse, ist aber kein absoluter Karzinomausschluss. Gangverlauf mit Parenchym, Gefäßen und klinischem Kontext kombinieren. Ein zusätzliches Karzinom bleibt auch bei verkalkter chronischer Pankreatitis möglich.",
    "en": "A smoothly narrowed main duct that can be followed through a mass (duct-penetrating sign) supports an inflammatory mass but does not absolutely exclude carcinoma. Combine duct course with parenchymal, vascular and clinical findings. A coexisting carcinoma remains possible in calcific chronic pancreatitis.",
    "fa": "مجرای اصلی با تنگی صاف که بتوان آن را درون توده دنبال کرد (علامت duct-penetrating)، از تودهٔ التهابی حمایت می‌کند، اما کارسینوم را به‌طور قطعی رد نمی‌کند. مسیر مجرا با یافته‌های پارانشیم، عروق و زمینهٔ بالینی ترکیب شود. سرطان هم‌زمان حتی در پانکراتیت مزمن کلسیفیه نیز ممکن است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/11568327/"
},
  {
  "id": "autoimmune",
  "category": {
    "de": "Differenzialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Welche Zeichen sprechen für Autoimmunpankreatitis Typ 1?",
    "en": "Which signs suggest type 1 autoimmune pancreatitis?",
    "fa": "کدام علائم به نفع پانکراتیت خودایمنی نوع ۱ است؟"
  },
  "answer": {
    "de": "Diffuse wurstförmige Vergrößerung mit Verlust der Lobulierung, kapselartiger Saum und charakteristische verzögerte Anreicherung können unterstützen; fokale Formen kommen vor.",
    "en": "Diffuse sausage-shaped enlargement with loss of lobulation, a capsule-like rim and characteristic delayed enhancement may support the diagnosis; focal forms also occur.",
    "fa": "بزرگ‌شدن منتشر سوسیسی با از بین رفتن لوبولاسیون، حاشیهٔ کپسول‌مانند و جذب تأخیری مشخص می‌توانند حمایت‌کننده باشند؛ نوع کانونی نیز وجود دارد."
  },
  "explanation": {
    "de": "Bildgebung mit Serologie, weiterer Organbeteiligung und gegebenenfalls Histologie kombinieren. Eine diagnostische Steroidprobe ist kein unkritischer Ersttest: nur spezialärztlich nach negativer Malignomabklärung erwägen, damit ein Pankreaskarzinom nicht verzögert wird.",
    "en": "Combine imaging with serology, other-organ involvement and histology where appropriate. A diagnostic steroid trial is not an uncritical first test: consider only under specialist care after negative malignancy workup to avoid delaying pancreatic-cancer diagnosis.",
    "fa": "تصویربرداری با سرولوژی، درگیری سایر اندام‌ها و در صورت لزوم هیستولوژی ترکیب شود. آزمون تشخیصی استروئید، آزمایش اولیهٔ بی‌قید نیست: فقط زیر نظر متخصص و پس از بررسی منفی بدخیمی در نظر گرفته شود تا تشخیص سرطان پانکراس به تأخیر نیفتد."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC8938398/"
},
]

const PANCREATITIS_FLASHCARDS = PANCREATITIS_FLASHCARD_CONTENT.map(item => ({
  id: `pankreatitis-${item.id}`,
  topicId: 'pankreatitis',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  ...(item.diagram ? { diagram: item.diagram } : {}),
  ...(item.source ? { source: item.source } : {}),
}))

const MIDLINE_CAVA_FLASHCARD_CONTENT = [
  {
    id: 'csp-location',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: { de: 'Wo liegt das Cavum septi pellucidi?', en: 'Where is the cavum septi pellucidi located?', fa: 'کاووم سپتی پلوسیدی کجا قرار دارد؟' },
    answer: { de: 'Zwischen den Septumblättern, vor der Monro-Ebene und zwischen den Vorderhörnern.', en: 'Between the septal leaflets, anterior to the Monro plane and between the frontal horns.', fa: 'بین لایه‌های سپتوم، جلوی سطح مونرو و بین شاخ‌های فرونتال.' },
    explanation: { de: 'Corpus callosum liegt kranial, der Fornix kaudal. Diese Landmarken grenzen das CSP von anderen Mittellinienzysten ab.', en: 'The corpus callosum lies superiorly and the fornix inferiorly. These landmarks distinguish the CSP from other midline cystic spaces.', fa: 'جسم پینه‌ای در بالا و فورنیکس در پایین قرار دارند. این لندمارک‌ها CSP را از سایر فضاهای کیست‌مانند خط وسط جدا می‌کنند.' },
    diagram: { de: 'Vorderhörner → CSP → vor Monro', en: 'Frontal horns → CSP → anterior to Monro', fa: 'شاخ‌های فرونتال → CSP → جلوی مونرو' },
  },
  {
    id: 'vergae-definition',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: { de: 'Was definiert das Cavum vergae?', en: 'What defines the cavum vergae?', fa: 'تعریف کاووم ورگه چیست؟' },
    answer: { de: 'Die posteriore Fortsetzung des CSP hinter die Ebene der Foramina Monroi.', en: 'The posterior continuation of the CSP beyond the foramina of Monro.', fa: 'ادامه خلفی CSP در پشت سطح سوراخ‌های مونرو.' },
    explanation: { de: 'CSP und Cavum vergae sind keine getrennten Gewebskompartimente, sondern topografisch benannte Abschnitte desselben persistierenden septalen Raums.', en: 'The CSP and cavum vergae are topographically named portions of the same persistent septal space rather than separate tissue compartments.', fa: 'CSP و کاووم ورگه دو محفظه بافتی جدا نیستند؛ بلکه بخش‌های توپوگرافیک یک فضای سپتال پایدارند.' },
    diagram: { de: 'vor Monro = CSP → hinter Monro = Cavum vergae', en: 'anterior to Monro = CSP → posterior = cavum vergae', fa: 'جلوی مونرو = CSP → پشت مونرو = کاووم ورگه' },
  },
  {
    id: 'vergae-isolated',
    category: { de: 'Prüfungswissen', en: 'Exam pearl', fa: 'نکته امتحانی' },
    front: { de: 'Tritt ein Cavum vergae typischerweise isoliert auf?', en: 'Does a cavum vergae typically occur in isolation?', fa: 'آیا کاووم ورگه معمولاً به‌صورت منفرد دیده می‌شود؟' },
    answer: { de: 'Nein, meist gemeinsam mit einem CSP.', en: 'No. It usually occurs together with a CSP.', fa: 'خیر؛ معمولاً همراه CSP دیده می‌شود.' },
    explanation: { de: 'Ein scheinbar isoliertes Cavum vergae sollte zur erneuten Prüfung der Ebenenführung und möglicher Differenzialdiagnosen führen.', en: 'An apparently isolated cavum vergae should prompt review of imaging planes and possible differentials.', fa: 'در کاووم ورگه ظاهراً منفرد باید نماهای تصویربرداری و تشخیص‌های افتراقی دوباره بررسی شوند.' },
    diagram: { de: 'CSP + posteriore Fortsetzung → CSP et vergae', en: 'CSP + posterior continuation → CSP et vergae', fa: 'CSP + ادامه خلفی → CSP et vergae' },
  },
  {
    id: 'cvi-location',
    category: { de: 'Anatomie', en: 'Anatomy', fa: 'آناتومی' },
    front: { de: 'Wo liegt das Cavum veli interpositi?', en: 'Where is the cavum veli interpositi located?', fa: 'کاووم ولی اینترپوزیتی کجا قرار دارد؟' },
    answer: { de: 'Unter den Fornices und über dem 3. Ventrikel in der Tela choroidea.', en: 'Below the fornices and above the third ventricle within the tela choroidea.', fa: 'زیر فورنیکس‌ها و بالای بطن سوم، در تلا کوروئیدئا.' },
    explanation: { de: 'Im Gegensatz zu CSP und Cavum vergae liegt das CVI nicht zwischen den Blättern des Septum pellucidum.', en: 'Unlike the CSP and cavum vergae, the CVI is not located between the leaflets of the septum pellucidum.', fa: 'برخلاف CSP و کاووم ورگه، CVI بین لایه‌های سپتوم پلوسیدوم قرار ندارد.' },
    diagram: { de: 'Fornix\n↓\nCVI\n↓\n3. Ventrikel', en: 'Fornix\n↓\nCVI\n↓\nThird ventricle', fa: 'فورنیکس\n↓\nCVI\n↓\nبطن سوم' },
  },
  {
    id: 'cvi-shape',
    category: { de: 'Bildgebung', en: 'Imaging', fa: 'تصویربرداری' },
    front: { de: 'Welche Form ist für ein CVI in axialer Schichtung typisch?', en: 'What shape is typical of a CVI on axial imaging?', fa: 'شکل تیپیک CVI در نمای اکسیال چیست؟' },
    answer: { de: 'Dreieckig, meist mit nach anterior gerichteter Spitze.', en: 'Triangular, usually with the apex pointing anteriorly.', fa: 'مثلثی، معمولاً با رأس رو به قدام.' },
    explanation: { de: 'Die Form und die Lage unterhalb der Fornices helfen, das CVI von einem septalen Cavum oder einer Pinealiszyste abzugrenzen.', en: 'Its shape and position below the fornices help distinguish it from a septal cavum or pineal cyst.', fa: 'شکل و محل زیر فورنیکس‌ها به افتراق CVI از فضاهای سپتال یا کیست پینه‌آل کمک می‌کند.' },
    diagram: { de: 'axial: △ → CVI', en: 'axial: △ → CVI', fa: 'اکسیال: △ → CVI' },
  },
  {
    id: 'signal',
    category: { de: 'Bildgebung', en: 'Imaging', fa: 'تصویربرداری' },
    front: { de: 'Welches Signalverhalten zeigen typische Mittellinien-Cava?', en: 'What signal characteristics do typical midline cava show?', fa: 'فضاهای تیپیک خط وسط چه الگوی سیگنالی دارند؟' },
    answer: { de: 'Liquoräquivalent, ohne soliden Anteil und ohne Enhancement.', en: 'They follow CSF, without a solid component or enhancement.', fa: 'مشابه CSF، بدون جزء جامد و بدون تقویت پس از تزریق.' },
    explanation: { de: 'Signalabweichung, Wandverdickung, noduläre Anteile oder Enhancement sind atypisch und verlangen eine andere Differenzialdiagnose.', en: 'Signal mismatch, wall thickening, nodules or enhancement are atypical and require another differential diagnosis.', fa: 'اختلاف با سیگنال CSF، ضخیم‌شدن دیواره، ندول یا تقویت پس از تزریق آتیپیک است و تشخیص دیگری را مطرح می‌کند.' },
    diagram: { de: 'CSF-Signal + glatte Wand + kein Enhancement → typisches Cavum', en: 'CSF signal + smooth wall + no enhancement → typical cavum', fa: 'سیگنال CSF + دیواره صاف + بدون تقویت پس از تزریق → کاووم تیپیک' },
  },
  {
    id: 'clinical-relevance',
    category: { de: 'Klinische Relevanz', en: 'Clinical relevance', fa: 'اهمیت بالینی' },
    front: { de: 'Wann ist ein Cavum nicht mehr nur ein belangloser Zufallsbefund?', en: 'When is a cavum no longer merely an incidental finding?', fa: 'چه زمانی یک کاووم دیگر فقط یک یافته اتفاقی بی‌اهمیت نیست؟' },
    answer: { de: 'Bei Masseneffekt, Foramen-Monroi-Kompression oder Hydrozephalus.', en: 'When there is mass effect, compression of the foramen of Monro or hydrocephalus.', fa: 'در صورت اثر فشاری، فشار بر سوراخ مونرو یا هیدروسفالی.' },
    explanation: { de: 'Eine große CSP- oder CVI-Zyste kann die Liquorzirkulation behindern. Größe, Ventrikelweite und neurochirurgische Relevanz müssen dann ausdrücklich beurteilt werden.', en: 'A large CSP or CVI cyst can obstruct CSF pathways. Size, ventricular calibre and neurosurgical relevance must then be assessed explicitly.', fa: 'کیست بزرگ CSP یا CVI می‌تواند مسیر CSF را مسدود کند. در این حالت اندازه، اتساع بطن‌ها و اهمیت جراحی باید صریحاً ارزیابی شوند.' },
    diagram: { de: 'Cavum-Zyste → Monro-Kompression → Hydrozephalus', en: 'Cavum cyst → Monro compression → hydrocephalus', fa: 'کیست کاووم → فشار بر مونرو → هیدروسفالی' },
  },
  {
    id: 'colloid-dd',
    category: { de: 'Differenzialdiagnose', en: 'Differential diagnosis', fa: 'تشخیص افتراقی' },
    front: { de: 'Wie unterscheidet sich eine Kolloidzyste typischerweise von einem CSP?', en: 'How does a colloid cyst typically differ from a CSP?', fa: 'کیست کلوئید معمولاً چگونه از CSP افتراق داده می‌شود؟' },
    answer: { de: 'Sie sitzt fokal am Foramen Monroi und ist häufig nicht liquoräquivalent.', en: 'It is a focal lesion at the foramen of Monro and often does not follow CSF.', fa: 'ضایعه‌ای فوکال در سوراخ مونرو است و اغلب سیگنالی متفاوت از CSF دارد.' },
    explanation: { de: 'Die Kolloidzyste kann trotz kleiner Größe einen akuten obstruktiven Hydrozephalus verursachen; die genaue Lage ist daher managementrelevant.', en: 'Even a small colloid cyst may cause acute obstructive hydrocephalus, making precise localisation management-relevant.', fa: 'کیست کلوئید حتی در اندازه کوچک می‌تواند هیدروسفالی انسدادی حاد ایجاد کند؛ بنابراین محل دقیق آن اهمیت درمانی دارد.' },
    diagram: { de: 'fokal an Monro + variables Signal → Kolloidzyste', en: 'focal at Monro + variable signal → colloid cyst', fa: 'فوکال در مونرو + سیگنال متغیر → کیست کلوئید' },
  },
  {
    id: 'reporting',
    category: { de: 'Befundung', en: 'Reporting', fa: 'گزارش' },
    front: { de: 'Welche drei Fragen sollte der Befund zu einem Mittellinien-Cavum beantworten?', en: 'Which three questions should a report on a midline cavum answer?', fa: 'گزارش یک کاووم خط وسط باید به کدام سه پرسش پاسخ دهد؟' },
    answer: { de: 'Welches Cavum? Typische Liquoreigenschaften? Masseneffekt oder Hydrozephalus?', en: 'Which cavum? Typical CSF characteristics? Any mass effect or hydrocephalus?', fa: 'کدام کاووم؟ آیا ویژگی‌های تیپیک CSF دارد؟ آیا اثر فشاری یا هیدروسفالی وجود دارد؟' },
    explanation: { de: 'Bei typischer schmaler Normvariante reicht eine knappe Benennung. Atypische Größe, Wand oder Signalgebung muss dagegen genauer charakterisiert werden.', en: 'A brief label is sufficient for a typical narrow variant. Atypical size, wall or signal requires fuller characterisation.', fa: 'برای واریانت باریک و تیپیک، نام‌گذاری کوتاه کافی است؛ اما اندازه، دیواره یا سیگنال آتیپیک باید دقیق‌تر توصیف شود.' },
    diagram: { de: 'Name → Charakter → Relevanz', en: 'Name → character → relevance', fa: 'نام → ویژگی → اهمیت' },
  },
]

const MIDLINE_CAVA_FLASHCARDS = MIDLINE_CAVA_FLASHCARD_CONTENT.map(item => ({
  id: `liquorraeume-ventrikelsystem-${item.id}`,
  topicId: 'liquorraeume-ventrikelsystem',
  category: item.category,
  front: item.front,
  answer: item.answer,
  explanation: item.explanation,
  diagram: item.diagram,
}))

const CSF_SYSTEM_FLASHCARDS = [
  {
    id: 'liquor-flow',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Liquorfluss', en: 'CSF flow', fa: 'جریان CSF' },
    front: { de: 'Wie verläuft der Liquorfluss vom Seitenventrikel bis zum Subarachnoidalraum?', en: 'How does CSF flow from the lateral ventricle to the subarachnoid space?', fa: 'مسیر CSF از بطن جانبی تا فضای ساب‌آراکنوئید چگونه است؟' },
    answer: { de: 'Monro → 3. Ventrikel → Aquädukt → 4. Ventrikel → Magendie/Luschka.', en: 'Monro → third ventricle → aqueduct → fourth ventricle → Magendie/Luschka.', fa: 'مونرو ← بطن سوم ← مجرای مغزی ← بطن چهارم ← ماژندی/لوشکا.' },
    explanation: { de: 'Das Dilatationsmuster proximal einer Blockade erlaubt die Lokalisation der Abflussstörung.', en: 'The pattern of upstream ventricular dilatation helps localise an obstruction.', fa: 'الگوی اتساع بطن‌ها در بخش پروگزیمال به تعیین محل انسداد کمک می‌کند.' },
    diagram: { de: 'SV → Monro → III → Aquädukt → IV → SAS', en: 'LV → Monro → III → aqueduct → IV → SAS', fa: 'LV → مونرو → III → مجرا → IV → SAS' },
  },
  {
    id: 'production',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Physiologie', en: 'Physiology', fa: 'فیزیولوژی' },
    front: { de: 'Wo wird der Liquor überwiegend produziert?', en: 'Where is most CSF produced?', fa: 'بیشتر CSF در کجا تولید می‌شود؟' },
    answer: { de: 'Im Plexus choroideus der Ventrikel.', en: 'In the choroid plexus of the ventricles.', fa: 'در شبکه کوروئید بطن‌ها.' },
    explanation: { de: 'Pro Tag werden ungefähr 500 ml gebildet, bei einem gleichzeitig vorhandenen Gesamtvolumen von etwa 150 ml.', en: 'Approximately 500 ml is produced daily despite a total circulating volume of about 150 ml.', fa: 'روزانه حدود ۵۰۰ میلی‌لیتر تولید می‌شود، درحالی‌که حجم کلی در گردش حدود ۱۵۰ میلی‌لیتر است.' },
    diagram: { de: 'Plexus choroideus → ≈500 ml/Tag', en: 'Choroid plexus → ≈500 ml/day', fa: 'شبکه کوروئید → حدود ۵۰۰ ml/روز' },
  },
  {
    id: 'aqueduct-pattern',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Hydrozephalus', en: 'Hydrocephalus', fa: 'هیدروسفالی' },
    front: { de: 'Welches Ventrikelmuster ist typisch für eine Aquäduktstenose?', en: 'What ventricular pattern is typical of aqueduct stenosis?', fa: 'الگوی تیپیک بطن‌ها در تنگی مجرای مغزی چیست؟' },
    answer: { de: 'Seitenventrikel und 3. Ventrikel weit, 4. Ventrikel normal.', en: 'Enlarged lateral and third ventricles with a normal fourth ventricle.', fa: 'اتساع بطن‌های جانبی و سوم با بطن چهارم طبیعی.' },
    explanation: { de: 'Der 4. Ventrikel liegt distal der Obstruktion und wird deshalb nicht erweitert.', en: 'The fourth ventricle lies downstream from the obstruction and therefore remains normal.', fa: 'بطن چهارم در دیستال انسداد قرار دارد و به همین دلیل متسع نمی‌شود.' },
    diagram: { de: 'SV↑ + III↑ | Aquädukt ✕ | IV normal', en: 'LV↑ + III↑ | aqueduct ✕ | IV normal', fa: 'LV↑ + III↑ | مجرا ✕ | IV طبیعی' },
  },
  {
    id: 'monro-pattern',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Hydrozephalus', en: 'Hydrocephalus', fa: 'هیدروسفالی' },
    front: { de: 'Was bewirkt eine einseitige Obstruktion des Foramen Monroi?', en: 'What does unilateral obstruction of the foramen of Monro cause?', fa: 'انسداد یک‌طرفه سوراخ مونرو چه الگویی ایجاد می‌کند؟' },
    answer: { de: 'Eine einseitige Seitenventrikelerweiterung.', en: 'Unilateral enlargement of a lateral ventricle.', fa: 'اتساع یک‌طرفه بطن جانبی.' },
    explanation: { de: 'Kolloidzyste, Tumor oder eine Membran können den Abfluss aus einem Seitenventrikel blockieren.', en: 'A colloid cyst, tumour or membrane may block outflow from one lateral ventricle.', fa: 'کیست کلوئید، تومور یا غشا می‌تواند خروج CSF از یک بطن جانبی را مسدود کند.' },
    diagram: { de: 'ein Monro blockiert → ipsilateraler SV↑', en: 'one Monro blocked → ipsilateral LV↑', fa: 'انسداد یک مونرو → LV همان‌طرف ↑' },
  },
  {
    id: 'transependymal',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Druckzeichen', en: 'Pressure signs', fa: 'نشانه‌های فشار' },
    front: { de: 'Wie zeigt sich transependymaler Liquorübertritt?', en: 'How does transependymal CSF flow appear?', fa: 'جریان ترانس‌اپاندیمال CSF چگونه دیده می‌شود؟' },
    answer: { de: 'Periventrikulär hypodens in CT und T2/FLAIR-hyperintens in MRT.', en: 'Periventricular low attenuation on CT and T2/FLAIR hyperintensity on MRI.', fa: 'هیپودنسیتی اطراف بطن در CT و هایپراینتنسیتی T2/FLAIR در MRI.' },
    explanation: { de: 'Es spricht bei passender Morphologie für erhöhten intraventrikulären Druck, muss aber von mikroangiopathischen Läsionen abgegrenzt werden.', en: 'In the correct morphological context it indicates raised intraventricular pressure but must be distinguished from small-vessel disease.', fa: 'در زمینه مورفولوژیک مناسب نشانه افزایش فشار داخل بطنی است، ولی باید از بیماری عروق کوچک افتراق داده شود.' },
    diagram: { de: 'Ventrikeldruck↑ → Liquor durch Ependym → periventrikuläres Ödem', en: 'Ventricular pressure↑ → CSF across ependyma → periventricular oedema', fa: 'فشار بطنی↑ → عبور CSF از اپاندیم → ادم اطراف بطن' },
  },
  {
    id: 'hydro-vs-atrophy',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Differenzialdiagnose', en: 'Differential diagnosis', fa: 'تشخیص افتراقی' },
    front: { de: 'Wie unterscheidet man Hydrozephalus von Ex-vacuo-Ventrikelerweiterung?', en: 'How is hydrocephalus distinguished from ex-vacuo ventricular enlargement?', fa: 'هیدروسفالی چگونه از اتساع ex vacuo بطن‌ها افتراق داده می‌شود؟' },
    answer: { de: 'Hydrozephalus: disproportionale Ventrikelweite und Druckzeichen; Atrophie: Ventrikel und Sulci proportional weit.', en: 'Hydrocephalus: disproportionate ventriculomegaly and pressure signs; atrophy: proportional enlargement of ventricles and sulci.', fa: 'هیدروسفالی: اتساع نامتناسب بطن‌ها و نشانه‌های فشار؛ آتروفی: اتساع متناسب بطن‌ها و شیارها.' },
    explanation: { de: 'Temporalhörner, transependymaler Fluss, Sulcuseffacement und Verlauf sind hilfreicher als ein Einzelmesswert.', en: 'Temporal horns, transependymal flow, sulcal effacement and interval change are more useful than a single measurement.', fa: 'شاخ‌های تمپورال، جریان ترانس‌اپاندیمال، محو شدن شیارها و روند زمانی از یک اندازه‌گیری منفرد مهم‌ترند.' },
    diagram: { de: 'Hydro: Ventrikel↑ / Sulci eng\nAtrophie: Ventrikel↑ + Sulci↑', en: 'Hydro: ventricles↑ / sulci tight\nAtrophy: ventricles↑ + sulci↑', fa: 'هیدرو: بطن↑ / شیار تنگ\nآتروفی: بطن↑ + شیار↑' },
  },
  {
    id: 'evans-index',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Messwerte', en: 'Measurements', fa: 'اندازه‌گیری' },
    front: { de: 'Was ist der Evans-Index und welche Grenze wird häufig verwendet?', en: 'What is the Evans index and what threshold is commonly used?', fa: 'شاخص Evans چیست و چه آستانه‌ای معمولاً استفاده می‌شود؟' },
    answer: { de: 'Frontalhornweite / innerer Schädeldurchmesser; > 0,30 unterstützt Ventrikulomegalie.', en: 'Frontal-horn width / inner skull diameter; > 0.30 supports ventriculomegaly.', fa: 'عرض شاخ‌های فرونتال تقسیم بر قطر داخلی جمجمه؛ بیش از ۰٫۳۰ از ونتریکولومگالی حمایت می‌کند.' },
    explanation: { de: 'Der Index ist unspezifisch und beweist weder einen aktiven Hydrozephalus noch einen Normaldruckhydrozephalus.', en: 'The index is non-specific and does not prove active hydrocephalus or normal-pressure hydrocephalus.', fa: 'این شاخص اختصاصی نیست و هیدروسفالی فعال یا هیدروسفالی فشار طبیعی را به‌تنهایی ثابت نمی‌کند.' },
    diagram: { de: 'max. Frontalhörner / max. Innenschädel >0,30', en: 'max frontal horns / max inner skull >0.30', fa: 'حداکثر شاخ فرونتال / حداکثر قطر داخلی جمجمه >۰٫۳۰' },
  },
  {
    id: 'flair',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'MRT', en: 'MRI', fa: 'MRI' },
    front: { de: 'Wie verhält sich normaler Liquor in FLAIR?', en: 'How does normal CSF appear on FLAIR?', fa: 'CSF طبیعی در FLAIR چگونه دیده می‌شود؟' },
    answer: { de: 'Er wird weitgehend supprimiert und erscheint dunkel.', en: 'It is largely suppressed and appears dark.', fa: 'تا حد زیادی سرکوب و تیره دیده می‌شود.' },
    explanation: { de: 'Fehlende Suppression kann bei Blut, Protein, Entzündung, Sauerstoffgabe oder Artefakten auftreten.', en: 'Failed suppression may occur with blood, protein, inflammation, supplemental oxygen or artefact.', fa: 'عدم سرکوب می‌تواند در خون، پروتئین، التهاب، اکسیژن‌درمانی یا آرتیفکت دیده شود.' },
    diagram: { de: 'normaler Liquor → FLAIR dunkel', en: 'normal CSF → dark on FLAIR', fa: 'CSF طبیعی → در FLAIR تیره' },
  },
  {
    id: 'ciss',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'MRT', en: 'MRI', fa: 'MRI' },
    front: { de: 'Wofür sind 3D-CISS/FIESTA-Sequenzen besonders hilfreich?', en: 'What are 3D-CISS/FIESTA sequences particularly useful for?', fa: 'سکانس‌های 3D-CISS/FIESTA برای چه مواردی مفیدند؟' },
    answer: { de: 'Für feine Membranen, Aquädukt, Zisternen und kleine intraliquorale Strukturen.', en: 'For thin membranes, the aqueduct, cisterns and small structures within CSF spaces.', fa: 'برای نمایش غشاهای ظریف، مجرای مغزی، سیسترن‌ها و ساختارهای کوچک در فضاهای CSF.' },
    explanation: { de: 'Der starke Liquor-Gewebe-Kontrast ergänzt Standard-T2-Sequenzen bei subtilen Obstruktionen.', en: 'High CSF-tissue contrast complements standard T2 imaging when subtle obstruction is suspected.', fa: 'کنتراست زیاد بین CSF و بافت در انسدادهای ظریف مکمل سکانس‌های T2 استاندارد است.' },
    diagram: { de: 'CISS/FIESTA → dünne Membran sichtbar', en: 'CISS/FIESTA → thin membrane visible', fa: 'CISS/FIESTA → نمایش غشای ظریف' },
  },
  {
    id: 'report',
    topicId: 'liquorraeume-ventrikelsystem',
    category: { de: 'Befundung', en: 'Reporting', fa: 'گزارش' },
    front: { de: 'Welche Kernpunkte gehören in einen Hydrozephalus-Befund?', en: 'What core elements belong in a hydrocephalus report?', fa: 'چه نکات اصلی باید در گزارش هیدروسفالی ذکر شوند؟' },
    answer: { de: 'Ausmaß, Dilatationsmuster, Druckzeichen, Obstruktionshöhe, Ursache und Einordnung.', en: 'Extent, dilatation pattern, pressure signs, obstruction level, cause and conclusion.', fa: 'شدت، الگوی اتساع، نشانه‌های فشار، محل انسداد، علت و جمع‌بندی.' },
    explanation: { de: 'Die Formulierung soll eine klinische beziehungsweise neurochirurgische Handlung ermöglichen und nicht bei „weite Ventrikel“ enden.', en: 'The report should guide clinical or neurosurgical action rather than stop at “dilated ventricles”.', fa: "گزارش باید تصمیم‌گیری بالینی یا جراحی مغز و اعصاب را هدایت کند و به عبارت «بطن‌های گشاد» محدود نشود." },
    diagram: { de: 'Wie weit? → welches Muster? → Druck? → wo blockiert? → warum?', en: 'How large? → what pattern? → pressure? → where blocked? → why?', fa: 'چقدر؟ → چه الگو؟ → فشار؟ → محل انسداد؟ → علت؟' },
  },
]

const LEGACY_FLASHCARDS = [
  ...VOLVULUS_FLASHCARDS,
  ...WIRBELMETASTASEN_FLASHCARDS,
  ...APPENDIZITIS_FLASHCARDS,
  ...WRIST_EXTENSOR_FLASHCARDS,
  ...DE_QUERVAIN_FLASHCARDS,
  ...PROXIMAL_HUMERUS_FLASHCARDS,
  ...FLEISCHNER_FLASHCARDS,
  ...MAMMA_MRT_FLASHCARDS,
  ...MAMMA_MRT_LESION_FLASHCARDS,
  ...MAMMA_KAISER_FLASHCARDS,
  ...MAMMA_MRT_SPECIAL_CARCINOMA_FLASHCARDS,
  ...MAMMOGRAPHY_BASICS_FLASHCARDS,
  ...MAMMOGRAPHY_CALCIFICATIONS_FLASHCARDS,
  ...CARDIOMYOPATHY_FLASHCARDS,
  ...ARVC_FLASHCARDS,
  ...MYOCARDIAL_INJURY_FLASHCARDS,
  ...CONTRAST_FLASHCARDS,
  ...DIVERTICULITIS_FLASHCARDS,
  ...PANCREATITIS_FLASHCARDS,
  ...STROKE_FLASHCARDS,
  ...ICB_FLASHCARDS,
  ...SAB_FLASHCARDS,
  ...EDH_FLASHCARDS,
  ...HIE_FLASHCARDS,
  ...CSF_SYSTEM_FLASHCARDS,
  ...MIDLINE_CAVA_FLASHCARDS,
  ...SDH_FLASHCARDS,
  ...DISSECTION_FLASHCARDS,
  ...MOYAMOYA_FLASHCARDS,
  ...HMA_FLASHCARDS,
  ...CAA_FLASHCARDS,
  ...MIGRAINE_FLASHCARDS,
  ...CADASIL_FLASHCARDS,
  ...DVA_FLASHCARDS,
  ...KAVERNOM_FLASHCARDS,
  ...NPH_FLASHCARDS,
  ...TELEANGIEKTASIE_FLASHCARDS,
  ...SVT_FLASHCARDS,
  ...DAVF_FLASHCARDS,
  ...AVM_FLASHCARDS,
  ...FRAKTUR_FLASHCARDS,
  ...FRAKTUR_STRESS_FLASHCARDS,
  ...FRAKTUR_KINDER_FLASHCARDS,
  ...AK_LUXATION_FLASHCARDS,
  ...RADIUSKOPF_FLASHCARDS,
  ...UNTERARM_FLASHCARDS,
  ...DISTALE_RADIUS_FLASHCARDS,
  ...SCAPHOID_FLASHCARDS,
  ...THUMB_UCL_FLASHCARDS,
  ...KNIE_LIGAMENTE_FLASHCARDS,
  ...SPINE_TRAUMA_FLASHCARDS,
  ...HRCT_FLASHCARDS,
  {
  "id": "meniskus-01",
  "topicId": "meniskus",
  "category": {
    "de": "Anatomie/MRT-Normalbefund",
    "en": "Anatomy/MRI normal",
    "fa": "آناتومی/نمای طبیعی MRI"
  },
  "front": {
    "de": "Warum ist der Innenmeniskus weniger mobil als der Außenmeniskus?",
    "en": "Why is the medial meniscus less mobile than the lateral meniscus?",
    "fa": "چرا منیسک داخلی از منیسک خارجی کم‌تحرک‌تر است؟"
  },
  "answer": {
    "de": "Festere Verbindung mit Kapsel und tiefem MCL.",
    "en": "Stronger attachment to the capsule and deep MCL.",
    "fa": "اتصال محکم‌تر به کپسول و MCL عمقی."
  },
  "explanation": {
    "de": "Diese Fixierung begrenzt das Ausweichen bei Scherkräften. Die Verletzungsverteilung ist mechanismusabhängig; bei akuter ACL-Ruptur sind Außenmeniskusrisse häufig.",
    "en": "This attachment limits movement under shear forces. Injury distribution depends on mechanism; lateral tears are common with acute ACL rupture.",
    "fa": "این اتصال حرکت در برابر نیروهای برشی را محدود می‌کند؛ توزیع آسیب به مکانیسم وابسته است و در پارگی حاد ACL آسیب منیسک خارجی شایع است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-02",
  "topicId": "meniskus",
  "category": {
    "de": "Anatomie/MRT-Normalbefund",
    "en": "Anatomy/MRI normal",
    "fa": "آناتومی/نمای طبیعی MRI"
  },
  "front": {
    "de": "Welches Innenmeniskussegment verdient bei der MRT-Risssuche besondere Aufmerksamkeit?",
    "en": "Which medial meniscal segment deserves particular attention when searching for tears?",
    "fa": "در جست‌وجوی پارگی MRI، کدام سگمان منیسک داخلی نیازمند توجه ویژه است؟"
  },
  "answer": {
    "de": "Hinterhorn einschließlich Wurzelregion.",
    "en": "Posterior horn including the root region.",
    "fa": "شاخ خلفی، همراه ناحیهٔ ریشه."
  },
  "explanation": {
    "de": "Das Hinterhorn ist häufig betroffen. Trotzdem müssen Vorderhorn, Körper und beide Wurzelansätze systematisch untersucht werden; keine Lokalisation wird allein durch Häufigkeit ausgeschlossen.",
    "en": "The posterior horn is often affected. Still assess the anterior horn, body and both root attachments systematically; frequency alone does not exclude any location.",
    "fa": "شاخ خلفی اغلب درگیر است؛ بااین‌حال شاخ قدامی، تنه و هر دو اتصال ریشه باید منظم بررسی شوند و فراوانی، محل دیگر را رد نمی‌کند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-03",
  "topicId": "meniskus",
  "category": {
    "de": "MRT-Rissdiagnostik",
    "en": "MRI tear diagnosis",
    "fa": "تشخیص پارگی در MRI"
  },
  "front": {
    "de": "Welche MRT-Befunde stützen einen Riss statt bloßer intrameniskaler Degeneration?",
    "en": "Which MRI findings support a tear rather than intrasubstance degeneration?",
    "fa": "کدام یافته‌های MRI از پارگی در برابر دژنراسیون صرف داخل منیسک حمایت می‌کنند؟"
  },
  "answer": {
    "de": "Sicherer Oberflächenkontakt oder ein eindeutiger Form-/Gewebedefekt.",
    "en": "Definite surface contact or a clear morphological/tissue defect.",
    "fa": "تماس سطحی قطعی یا نقص واضح شکل/بافت."
  },
  "explanation": {
    "de": "Ein reproduzierbarer Kontakt zu einer Gelenkfläche erhöht die Sicherheit. Abnorme Morphologie oder ein disloziertes Fragment können ebenfalls einen Riss belegen. Signal ohne Kontakt allein ist kein sicherer Riss.",
    "en": "Reproducible articular-surface contact increases confidence. Abnormal morphology or a displaced fragment can also establish a tear. Signal without contact alone is not a definite tear.",
    "fa": "تماس تکرارپذیر با سطح مفصلی اطمینان را افزایش می‌دهد؛ مورفولوژی غیرطبیعی یا قطعهٔ جابه‌جا‌شده نیز می‌تواند پارگی را ثابت کند. سیگنال بدون تماس به‌تنهایی پارگی قطعی نیست."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16985134/"
},
  {
  "id": "meniskus-04",
  "topicId": "meniskus",
  "category": {
    "de": "Lotysch-Klassifikation",
    "en": "Lotysch classification",
    "fa": "طبقه‌بندی لوتوش"
  },
  "front": {
    "de": "Was kennzeichnet Grad III in der signalbasierten Lotysch-Einteilung?",
    "en": "What defines grade III in signal-based Lotysch grading?",
    "fa": "در تقسیم‌بندی لوتوش بر پایهٔ سیگنال، گرید III با چه مشخص می‌شود؟"
  },
  "answer": {
    "de": "Pathologisches Signal erreicht sicher mindestens eine Gelenkfläche.",
    "en": "Abnormal signal definitely reaches at least one articular surface.",
    "fa": "سیگنال پاتولوژیک قطعاً به حداقل یک سطح مفصلی می‌رسد."
  },
  "explanation": {
    "de": "Kontakt zur superioren oder inferioren Fläche genügt. Wiederholung auf mindestens zwei Bildern erhöht die diagnostische Sicherheit; das ist eine zusätzliche Diagnoseregel, nicht die gesamte Definition des Grades.",
    "en": "Contact with the superior or inferior surface is sufficient. Repetition on at least two images increases confidence; this is an additional diagnostic rule, not the whole grade definition.",
    "fa": "تماس با سطح فوقانی یا تحتانی کافی است؛ تکرار در حداقل دو تصویر اطمینان را بالا می‌برد. این قاعدهٔ تشخیصی اضافه است، نه تمام تعریف گرید."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16985134/"
},
  {
  "id": "meniskus-05",
  "topicId": "meniskus",
  "category": {
    "de": "MRT-Rissdiagnostik",
    "en": "MRI tear diagnosis",
    "fa": "تشخیص پارگی در MRI"
  },
  "front": {
    "de": "Was leistet die Two-slice-touch-Regel?",
    "en": "What does the two-slice-touch rule provide?",
    "fa": "قاعدهٔ Two-slice-touch چه کمکی می‌کند؟"
  },
  "answer": {
    "de": "Mehr Sicherheit durch wiederholten Gelenkflächenkontakt auf mindestens zwei Bildern.",
    "en": "Greater confidence from repeated articular-surface contact on at least two images.",
    "fa": "اطمینان بیشتر با تکرار تماس سطح مفصلی در حداقل دو تصویر."
  },
  "explanation": {
    "de": "Sie reduziert falsch-positive Einzelschichtinterpretationen. Im Routinefall wird der Kontakt auf benachbarten Schichten geprüft. Ein eindeutiger Gewebedefekt darf aber nicht allein wegen fehlender Zweischichtdarstellung übersehen werden.",
    "en": "It reduces false-positive single-image interpretations. In routine assessment, check contact on adjacent slices. A clear tissue defect must not be dismissed just because it is not shown on two slices.",
    "fa": "این قاعده تفسیر مثبت کاذب تک‌تصویری را کم می‌کند؛ در ارزیابی روتین تماس در برش‌های مجاور بررسی می‌شود. نقص واضح بافت را نباید فقط به علت دیده‌نشدن در دو برش نادیده گرفت."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16985134/"
},
  {
  "id": "meniskus-06",
  "topicId": "meniskus",
  "category": {
    "de": "Lotysch-Klassifikation",
    "en": "Lotysch classification",
    "fa": "طبقه‌بندی لوتوش"
  },
  "front": {
    "de": "Was bedeutet Grad 2b in der erweiterten Grad-2-Einteilung?",
    "en": "What does grade 2b mean in the extended grade-2 scheme?",
    "fa": "در تقسیم‌بندی توسعه‌یافتهٔ گرید ۲، گرید ۲b چیست؟"
  },
  "answer": {
    "de": "Lineares Signal mit Oberflächenkontakt nur auf einem Bild; inkonklusiv.",
    "en": "Linear signal with surface contact on only one image; inconclusive.",
    "fa": "سیگنال خطی با تماس سطحی فقط در یک تصویر؛ نامطمئن."
  },
  "explanation": {
    "de": "Ein echter Riss bleibt möglich. Nachbarschichten, andere Ebenen und Morphologie prüfen. Grad 2b ist nicht gleichbedeutend mit sicherem Riss, aber auch kein sicherer Ausschluss.",
    "en": "A real tear remains possible. Review adjacent slices, other planes and morphology. Grade 2b neither proves nor definitely excludes a tear.",
    "fa": "پارگی واقعی همچنان ممکن است؛ برش‌های مجاور، صفحات دیگر و مورفولوژی بررسی شوند. گرید ۲b نه پارگی را قطعی می‌کند و نه قطعی رد می‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16985134/"
},
  {
  "id": "meniskus-07",
  "topicId": "meniskus",
  "category": {
    "de": "Anatomie/MRT-Normalbefund",
    "en": "Anatomy/MRI normal",
    "fa": "آناتومی/نمای طبیعی MRI"
  },
  "front": {
    "de": "Wie unterscheiden sich normale Meniskushörner und Meniskuskörper sagittal?",
    "en": "How do normal meniscal horns and body differ sagittally?",
    "fa": "شاخ‌ها و تنهٔ طبیعی منیسک در ساژیتال چه تفاوتی دارند؟"
  },
  "answer": {
    "de": "Hörner dreieckig; Körper als Bow-tie-Konfiguration.",
    "en": "Triangular horns; bow-tie configuration of the body.",
    "fa": "شاخ‌ها مثلثی؛ تنه به شکل Bow-tie."
  },
  "explanation": {
    "de": "Normaler Faserknorpel ist überwiegend signalarm. Form, Lage und Kontinuität werden über die Serie verfolgt; nicht jede sagittale Schicht muss ein Dreieck zeigen.",
    "en": "Normal fibrocartilage is predominantly low signal. Follow shape, position and continuity through the series; not every sagittal slice must show a triangle.",
    "fa": "فیبروغضروف طبیعی عمدتاً کم‌سیگنال است؛ شکل، محل و پیوستگی در کل سری دنبال می‌شوند و لازم نیست تمام برش‌های ساژیتال مثلث نشان دهند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-09",
  "topicId": "meniskus",
  "category": {
    "de": "MRT-Rissdiagnostik",
    "en": "MRI tear diagnosis",
    "fa": "تشخیص پارگی در MRI"
  },
  "front": {
    "de": "Welche MRT-Bilder helfen bei der Meniskusbeurteilung?",
    "en": "Which MRI images help assess the meniscus?",
    "fa": "کدام تصاویر MRI به ارزیابی منیسک کمک می‌کنند؟"
  },
  "answer": {
    "de": "Dünnschichtige PD-/intermediär gewichtete und flüssigkeitssensitive Bilder, multiplanar.",
    "en": "Thin-section PD/intermediate-weighted and fluid-sensitive images in multiple planes.",
    "fa": "تصاویر نازک PD/وزن‌دهی میانی و حساس به مایع در چند صفحه."
  },
  "explanation": {
    "de": "PD mit oder ohne Fettsättigung stellt Meniskusstruktur gut dar; T2-fs zeigt Flüssigkeit und Ödem. Kein einzelner Sequenzname ersetzt den Abgleich von sagittalen, koronalen und axialen Bildern.",
    "en": "PD with or without fat suppression depicts meniscal structure well; T2-fs shows fluid and oedema. No single sequence replaces sagittal, coronal and axial correlation.",
    "fa": "PD با یا بدون سرکوب چربی ساختار منیسک را خوب نشان می‌دهد و T2-fs مایع و ادم را؛ هیچ سکانس منفرد جای تطبیق ساژیتال، کرونال و اکسیال را نمی‌گیرد."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11399221/"
},
  {
  "id": "meniskus-10",
  "topicId": "meniskus",
  "category": {
    "de": "MRT-Rissdiagnostik",
    "en": "MRI tear diagnosis",
    "fa": "تشخیص پارگی در MRI"
  },
  "front": {
    "de": "Warum sind dünne MRT-Schichten für Menisken hilfreich?",
    "en": "Why are thin MRI slices useful for menisci?",
    "fa": "چرا برش نازک MRI برای منیسک مفید است؟"
  },
  "answer": {
    "de": "Weniger Partialvolumen, bessere Darstellung kleiner Defekte.",
    "en": "Less partial volume and better depiction of small defects.",
    "fa": "حجم‌جزئی کمتر و نمایش بهتر نقص‌های کوچک."
  },
  "explanation": {
    "de": "Laut ESSR sind 4 mm akzeptabel, ≤3 mm vorzuziehen; 3 mm sind kein universeller Standard. Die Zahl sichtbarer Schichten stets relativ zu Dicke und Protokoll interpretieren.",
    "en": "ESSR considers 4 mm acceptable and ≤3 mm preferable; 3 mm is not a universal standard. Interpret visible slice count relative to slice thickness and protocol.",
    "fa": "طبق توصیه ESSR، ضخامت ۴ میلی‌متر قابل‌قبول و ≤۳ میلی‌متر ترجیح‌داده‌شده است؛ ۳ میلی‌متر استاندارد همگانی نیست. تعداد برش‌های قابل مشاهده را با توجه به ضخامت و پروتکل تفسیر کنید."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC11399221/"
},
  {
  "id": "meniskus-11",
  "topicId": "meniskus",
  "category": {
    "de": "Meniskus",
    "en": "Meniscus",
    "fa": "منیسک"
  },
  "front": {
    "de": "Welche Zone hat das höchste biologische Heilungspotenzial?",
    "en": "Which zone has the highest biological healing potential?",
    "fa": "کدام ناحیه بیشترین ظرفیت زیستی ترمیم را دارد؟"
  },
  "answer": {
    "de": "Die kapselnahe rote Zone.",
    "en": "The peripheral red zone next to the capsule.",
    "fa": "ناحیهٔ قرمز کنار کپسول."
  },
  "explanation": {
    "de": "Sie ist am besten durchblutet. Die rot-weiße Zone ist eine Übergangszone, die weiße Zone avaskulär. Gefäßzone allein entscheidet nicht über Reparabilität oder Therapie.",
    "en": "It has the best blood supply. The red-white zone is transitional and the white zone avascular. Vascular zone alone does not determine repairability or management.",
    "fa": "این ناحیه بهترین خون‌رسانی را دارد؛ قرمز-سفید انتقالی و سفید بدون عروق است. ناحیهٔ عروقی به‌تنهایی قابلیت ترمیم یا درمان را تعیین نمی‌کند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-12",
  "topicId": "meniskus",
  "category": {
    "de": "Therapie/Vaskularisation",
    "en": "Therapy/Vascularity",
    "fa": "درمان/خون‌رسانی"
  },
  "front": {
    "de": "Warum ist das Heilungspotenzial zentraler Meniskusrisse geringer?",
    "en": "Why do central meniscal tears have lower healing potential?",
    "fa": "چرا ظرفیت ترمیم پارگی مرکزی منیسک کمتر است؟"
  },
  "answer": {
    "de": "Geringe bzw. fehlende Gefäßversorgung der weißen Zone.",
    "en": "Low or absent vascular supply in the white zone.",
    "fa": "خون‌رسانی کم یا غایب ناحیهٔ سفید."
  },
  "explanation": {
    "de": "Die weiße Zone wird überwiegend über Synovialflüssigkeit ernährt. Geringere biologische Heilung ist nicht mit absoluter Unreparierbarkeit gleichzusetzen; Rissform und Gewebequalität bleiben wichtig.",
    "en": "The white zone is nourished mainly through synovial fluid. Lower biological healing does not mean absolute non-repairability; pattern and tissue quality still matter.",
    "fa": "ناحیهٔ سفید عمدتاً از مایع سینوویال تغذیه می‌شود؛ ظرفیت کمتر ترمیم به معنای غیرقابل‌ترمیم‌بودن مطلق نیست و شکل پارگی و کیفیت بافت مهم‌اند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-13",
  "topicId": "meniskus",
  "category": {
    "de": "Therapie/Vaskularisation",
    "en": "Therapy/Vascularity",
    "fa": "درمان/خون‌رسانی"
  },
  "front": {
    "de": "Welche Befunde begünstigen die Reparabilität eines Meniskusrisses?",
    "en": "Which findings favour repairability of a meniscal tear?",
    "fa": "کدام یافته‌ها به نفع قابلیت ترمیم پارگی منیسک هستند؟"
  },
  "answer": {
    "de": "Periphere Lage, reparable Rissform und gutes, stabil rekonstruierbares Gewebe.",
    "en": "Peripheral location, repairable pattern and good tissue that permits stable reconstruction.",
    "fa": "محل محیطی، شکل قابل‌ترمیم و بافت خوب با امکان بازسازی پایدار."
  },
  "explanation": {
    "de": "Periphere Lage kann das biologische Heilungspotenzial begünstigen. Gewebequalität, Rissgeometrie, Kniezustand und klinischer Kontext bleiben entscheidend; MRT allein legt Reparabilität nicht fest.",
    "en": "Peripheral location may favour biological healing potential. Tissue quality, tear geometry, knee status and clinical context remain important; MRI alone does not establish repairability.",
    "fa": "محل محیطی ممکن است زمینهٔ زیستی ترمیم را بهتر کند. کیفیت بافت، هندسهٔ پارگی، وضعیت زانو و زمینهٔ بالینی مهم‌اند؛ MRI به‌تنهایی قابلیت ترمیم را تعیین نمی‌کند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-14",
  "topicId": "meniskus",
  "category": {
    "de": "Therapie/Vaskularisation",
    "en": "Therapy/Vascularity",
    "fa": "درمان/خون‌رسانی"
  },
  "front": {
    "de": "Was bedeutet Save the Meniscus praktisch?",
    "en": "What does Save the Meniscus mean in practice?",
    "fa": "Save the Meniscus در عمل یعنی چه؟"
  },
  "answer": {
    "de": "Bei indizierter Operation möglichst viel funktionsfähiges Gewebe erhalten.",
    "en": "When surgery is indicated, preserve as much functional tissue as possible.",
    "fa": "وقتی جراحی اندیکاسیون دارد، بیشترین بافت عملکردی حفظ شود."
  },
  "explanation": {
    "de": "Menisken verteilen Last und schützen den Knorpel. Unnötige Resektion vermeiden und Reparabilität prüfen. Ein degenerativer MRT-Riss ohne echte Blockade ist allein keine OP-Indikation; konservative Therapie ist meist der erste Ansatz.",
    "en": "Menisci distribute load and protect cartilage. Avoid unnecessary resection and assess repairability. A degenerative MRI tear without true locking alone is not a surgical indication; non-operative care is usually first-line.",
    "fa": "منیسک بار را توزیع و غضروف را محافظت می‌کند؛ برداشت غیرضروری اجتناب و قابلیت ترمیم بررسی شود. پارگی دژنراتیو MRI بدون قفل‌شدن واقعی به‌تنهایی اندیکاسیون جراحی نیست و درمان غیرجراحی معمولاً مقدم است."
  },
  "source": "https://www.aaos.org/quality/quality-programs/acute-isolated-meniscal-pathology/",
  "sources": [
    "https://www.aaos.org/quality/quality-programs/acute-isolated-meniscal-pathology/",
    "https://www.bmj.com/content/354/bmj.i3740"
  ]
},
  {
  "id": "meniskus-15",
  "topicId": "meniskus",
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "front": {
    "de": "Was ist das Double-PCL-Zeichen?",
    "en": "What is the double-PCL sign?",
    "fa": "علامت Double-PCL چیست؟"
  },
  "answer": {
    "de": "Disloziertes Meniskusfragment parallel und anteroinferior zum PCL.",
    "en": "A displaced meniscal fragment parallel and anteroinferior to the PCL.",
    "fa": "قطعهٔ منیسک جابه‌جا‌شده موازی و قدامی‌تحتانی PCL."
  },
  "explanation": {
    "de": "Es stützt einen Korbhenkelriss, meist des Innenmeniskus. Den Ursprungsdefekt und das Interkondylarfragment in mehreren Ebenen bestätigen; anatomische Bänder können dunkle Strukturen imitieren.",
    "en": "It supports a bucket-handle tear, usually medial. Confirm the donor defect and notch fragment in multiple planes; normal ligaments may mimic dark structures.",
    "fa": "این علامت مؤید دسته‌سطلی، معمولاً داخلی، است؛ نقص مبدأ و قطعهٔ ناچ در چند صفحه تأیید شوند، چون رباط طبیعی ممکن است ساختار تیره را تقلید کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/19234702/"
},
  {
  "id": "meniskus-16",
  "topicId": "meniskus",
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "front": {
    "de": "Wie wird ein fehlendes Bow-tie-Zeichen interpretiert?",
    "en": "How should an absent bow-tie sign be interpreted?",
    "fa": "فقدان Bow-tie چگونه تفسیر می‌شود؟"
  },
  "answer": {
    "de": "Hinweis auf Gewebeverlust oder Fragmentverlagerung, nicht allein beweisend.",
    "en": "A clue to tissue loss or displacement, not diagnostic alone.",
    "fa": "نشانهٔ فقدان بافت یا جابه‌جایی قطعه، نه اثبات‌کننده به‌تنهایی."
  },
  "explanation": {
    "de": "Nach einem dislozierten Fragment und Ursprungsdefekt suchen. Auch Radiärriss, vorangegangene Resektion, kleine Meniskusform und Schichtführung können die Darstellung verändern.",
    "en": "Search for a displaced fragment and donor defect. Radial tears, prior resection, a small meniscus and slice positioning can also alter its appearance.",
    "fa": "قطعهٔ جابه‌جا‌شده و نقص مبدأ جست‌وجو شوند؛ پارگی شعاعی، برداشت قبلی، منیسک کوچک و جهت برش هم ظاهر را تغییر می‌دهند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-18",
  "topicId": "meniskus",
  "category": {
    "de": "Discoider Meniskus",
    "en": "Discoid meniscus",
    "fa": "منیسک دیسکویید"
  },
  "front": {
    "de": "Was ist ein discoider Meniskus und welcher Meniskus ist meist betroffen?",
    "en": "What is a discoid meniscus and which meniscus is usually affected?",
    "fa": "منیسک دیسکویید چیست و معمولاً کدام منیسک درگیر است؟"
  },
  "answer": {
    "de": "Angeborener, verbreiterter scheibenförmiger Meniskus, fast immer lateral.",
    "en": "A congenital broad disc-shaped meniscus, almost always lateral.",
    "fa": "منیسک مادرزادی پهن و دیسکی‌شکل، تقریباً همیشه خارجی."
  },
  "explanation": {
    "de": "Die Formvariante kann asymptomatisch sein oder mit Instabilität und Rissen einhergehen. Discoid allein bedeutet weder Riss noch automatische Therapiebedürftigkeit.",
    "en": "The variant may be asymptomatic or associated with instability and tears. Discoid shape alone means neither a tear nor an automatic need for treatment.",
    "fa": "این گونه می‌تواند بی‌علامت یا همراه ناپایداری و پارگی باشد؛ شکل دیسکویید به‌تنهایی نه پارگی است و نه الزام به درمان."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-19",
  "topicId": "meniskus",
  "category": {
    "de": "Discoider Meniskus",
    "en": "Discoid meniscus",
    "fa": "منیسک دیسکویید"
  },
  "front": {
    "de": "Welche kindlichen Symptome lassen an einen discoiden Außenmeniskus denken?",
    "en": "Which childhood symptoms suggest a discoid lateral meniscus?",
    "fa": "کدام علائم در کودک منیسک خارجی دیسکویید را مطرح می‌کنند؟"
  },
  "answer": {
    "de": "Schnappen/Klicken, Schmerzen oder mechanische Beschwerden.",
    "en": "Snapping/clicking, pain or mechanical symptoms.",
    "fa": "تق‌تق/کلیک، درد یا علائم مکانیکی."
  },
  "explanation": {
    "de": "Diese Symptome sind nicht spezifisch. Im MRT Form, Breite, Riss und Instabilitätszeichen prüfen; ein asymptomatischer discoider Meniskus benötigt nicht automatisch einen Eingriff.",
    "en": "These symptoms are not specific. Assess MRI shape, width, tears and instability signs; an asymptomatic discoid meniscus does not automatically require intervention.",
    "fa": "این علائم اختصاصی نیستند؛ در MRI شکل، پهنا، پارگی و نشانه‌های ناپایداری بررسی شوند و دیسکویید بی‌علامت الزاماً مداخله نمی‌خواهد."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-20",
  "topicId": "meniskus",
  "category": {
    "de": "Discoider Meniskus",
    "en": "Discoid meniscus",
    "fa": "منیسک دیسکویید"
  },
  "front": {
    "de": "Warum reicht das Drei-Schichten-Zeichen bei dünnen MRT-Schichten nicht allein für discoid?",
    "en": "Why is the three-slice sign alone insufficient with thin MRI slices for discoid meniscus?",
    "fa": "چرا علامت سه برش در MRI نازک به‌تنهایی برای دیسکویید کافی نیست؟"
  },
  "answer": {
    "de": "Die sichtbare Schichtzahl hängt von der Schnittdicke ab.",
    "en": "The visible slice count depends on slice thickness.",
    "fa": "تعداد برش‌های قابل‌مشاهده به ضخامت وابسته است."
  },
  "explanation": {
    "de": "Bei modernen dünnen Schichten soll die Drei-Bow-tie-Regel nicht diagnostisch verwendet werden. Mittlere koronale Corpusbreite und Gesamtform prüfen. Samoto beschrieb zusätzlich ein sagittales Verhältnis aus der Summe der Vorder-/Hinterhornbreiten zum maximalen Meniskusdurchmesser von ≥75 %.",
    "en": "With modern thin sections, the three-bowtie rule should not be used diagnostically. Assess mid-coronal body width and overall shape. Samoto additionally described a sagittal ratio of summed anterior/posterior horn widths to maximum meniscal diameter ≥75%.",
    "fa": "در برش‌های نازک امروزی قاعدهٔ سه bow-tie نباید برای تشخیص به‌کار رود. عرض تنه در کرونال میانی و شکل کلی بررسی شوند. Samoto نسبت ساژیتال مجموع عرض شاخ‌های قدامی/خلفی به بیشترین قطر منیسک ≥۷۵٪ را نیز توصیف کرده است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-21",
  "topicId": "meniskus",
  "category": {
    "de": "Discoider Meniskus",
    "en": "Discoid meniscus",
    "fa": "منیسک دیسکویید"
  },
  "front": {
    "de": "Welche koronalen Breitenkriterien unterstützen einen discoiden Außenmeniskus?",
    "en": "Which coronal width criteria support a discoid lateral meniscus?",
    "fa": "کدام معیارهای پهنای کرونال از منیسک خارجی دیسکویید حمایت می‌کنند؟"
  },
  "answer": {
    "de": "Körperbreite ≥15 mm oder minimale Meniskusbreite / maximale Tibiabreite ≥20 %.",
    "en": "Body width ≥15 mm or minimum meniscal / maximum tibial width ≥20%.",
    "fa": "پهنای تنه ≥۱۵ میلی‌متر یا حداقل پهنای منیسک / حداکثر پهنای تیبیا ≥۲۰٪."
  },
  "explanation": {
    "de": "Die Messungen stützen die Diagnose und werden mit Gesamtform und sagittaler Ausdehnung kombiniert. Extrusion ist ein anderer Parameter und kein Ersatz für die Körperbreite.",
    "en": "These measurements support diagnosis and are combined with overall shape and sagittal extent. Extrusion is a different parameter, not a substitute for body width.",
    "fa": "اندازه‌گیری‌ها مؤید تشخیص‌اند و با شکل کلی و امتداد ساژیتال ترکیب می‌شوند؛ اکستروژن پارامتر دیگری است و جای پهنای تنه را نمی‌گیرد."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/11973030/"
},
  {
  "id": "meniskus-22",
  "topicId": "meniskus",
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "front": {
    "de": "Wie unterscheiden sich Horizontal- und Radiärriss?",
    "en": "How do horizontal and radial tears differ?",
    "fa": "پارگی افقی و شعاعی چه تفاوتی دارند؟"
  },
  "answer": {
    "de": "Horizontal: parallel zur Tibiaebene. Radial: vom freien Rand quer zu Ringfasern.",
    "en": "Horizontal: parallel to the tibial plane. Radial: from the free edge across circumferential fibres.",
    "fa": "افقی: موازی صفحهٔ تیبیا. شعاعی: از لبهٔ آزاد در عرض الیاف حلقوی."
  },
  "explanation": {
    "de": "Der Horizontalriss spaltet obere und untere Lamelle. Der Radiärriss läuft Richtung Peripherie; seine biomechanische Bedeutung hängt besonders von Tiefe und Vollständigkeit ab.",
    "en": "A horizontal tear splits upper and lower leaflets. A radial tear runs towards the periphery; its biomechanical impact depends particularly on depth and completeness.",
    "fa": "پارگی افقی لایهٔ بالا و پایین را جدا می‌کند؛ شعاعی به سمت محیط می‌رود و اهمیت مکانیکی آن به‌ویژه به عمق و کامل‌بودن وابسته است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-23",
  "topicId": "meniskus",
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "front": {
    "de": "Welche Rissform ist häufig mit einer parameniskalen Zyste assoziiert?",
    "en": "Which tear pattern is often associated with a parameniscal cyst?",
    "fa": "کدام شکل پارگی اغلب با کیست پارامنیسکال همراه است؟"
  },
  "answer": {
    "de": "Horizontalriss.",
    "en": "Horizontal tear.",
    "fa": "پارگی افقی."
  },
  "explanation": {
    "de": "Flüssigkeit kann über einen Riss nach außen gelangen. Zyste und mögliche Kommunikation zum Meniskus beschreiben; die Assoziation ist typisch, aber nicht auf Horizontalrisse beschränkt.",
    "en": "Fluid can pass outward through a tear. Describe the cyst and possible meniscal communication; the association is typical but not exclusive to horizontal tears.",
    "fa": "مایع می‌تواند از مسیر پارگی خارج شود؛ کیست و ارتباط احتمالی با منیسک توصیف شوند. همراهی تیپیک است اما فقط به پارگی افقی محدود نیست."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-24",
  "topicId": "meniskus",
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "front": {
    "de": "Warum ist ein vollständiger Radiärriss biomechanisch besonders relevant?",
    "en": "Why is a complete radial tear particularly important biomechanically?",
    "fa": "چرا پارگی شعاعی کامل از نظر مکانیکی اهمیت ویژه دارد؟"
  },
  "answer": {
    "de": "Vollständige Unterbrechung der zirkumferenziellen Fasern und Ringspannung.",
    "en": "Complete interruption of circumferential fibres and hoop-stress transmission.",
    "fa": "قطع کامل الیاف حلقوی و انتقال تنش حلقوی."
  },
  "explanation": {
    "de": "Ein Defekt über die gesamte Breite stört die Lastverteilung stark. Wurzelbezug, Extrusion und Knorpelstatus mitbeurteilen; ein kleiner partieller Radiärriss hat nicht automatisch die gleiche Wirkung.",
    "en": "A full-width defect markedly disrupts load distribution. Assess root relationship, extrusion and cartilage; a small partial radial tear does not automatically have the same effect.",
    "fa": "نقص تمام‌عرض توزیع بار را شدیداً مختل می‌کند؛ ارتباط ریشه، اکستروژن و غضروف ارزیابی شوند. شعاعی کوچک و جزئی الزاماً همین اثر را ندارد."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-27",
  "topicId": "meniskus",
  "front": {
    "de": "Was beschreibt Grad 2a im historischen Signalgrading?",
    "en": "What does grade 2a describe in historical signal grading?",
    "fa": "گرید ۲a در درجه‌بندی تاریخی سیگنال چه چیزی را توصیف می‌کند؟"
  },
  "answer": {
    "de": "Lineares intrameniskales Signal ohne Oberflächenkontakt.",
    "en": "Linear intrasubstance signal without surface contact.",
    "fa": "سیگنال خطی داخل منیسک بدون تماس سطحی."
  },
  "explanation": {
    "de": "Das ist eine Signalbeschreibung, keine gesicherte Histologie oder Operationsindikation. Oberflächenkontakt, Kontur und Kontinuität in der vollständigen Serie prüfen; im klinischen Befund sind diese Angaben hilfreicher als der Grad allein.",
    "en": "This is a signal description, not established histology or a surgical indication. Assess surface contact, contour and continuity throughout the complete series; these details are more useful in a clinical report than grade alone.",
    "fa": "این توصیف سیگنال است، نه بافت‌شناسی قطعی یا اندیکاسیون جراحی. تماس سطحی، حاشیه و پیوستگی در کل سری بررسی شوند؛ در گزارش بالینی این جزئیات از گرید تنها مفیدترند."
  },
  "category": {
    "de": "Lotysch-Klassifikation",
    "en": "Lotysch classification",
    "fa": "طبقه‌بندی لوتوش"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-28",
  "topicId": "meniskus",
  "front": {
    "de": "Was ist Grad 2c?",
    "en": "What is grade 2c?",
    "fa": "گرید ۲c چیست؟"
  },
  "answer": {
    "de": "Ausgedehntes keilförmiges/globuläres Signal ohne sicheren Oberflächenkontakt.",
    "en": "Extensive wedge-shaped/globular signal without definite surface contact.",
    "fa": "سیگنال وسیع گوه‌ای/گلوبولار بدون تماس سطحی قطعی."
  },
  "explanation": {
    "de": "Ein okkulter Riss ist möglich; allein ist dieser Befund kein sicherer Rissnachweis. 2a, 2b und 2c sind Untertypen von Grad 2, keine zusätzlichen Hauptgrade.",
    "en": "An occult tear is possible; the finding alone does not prove a tear. 2a, 2b and 2c are subtypes of grade 2, not additional main grades.",
    "fa": "پارگی مخفی ممکن است، اما این یافته به‌تنهایی آن را ثابت نمی‌کند. ۲a، ۲b و ۲c زیرگروه گرید ۲ هستند، نه گریدهای اصلی جدا."
  },
  "category": {
    "de": "Lotysch-Klassifikation",
    "en": "Lotysch classification",
    "fa": "طبقه‌بندی لوتوش"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/12185036/"
},
  {
  "id": "meniskus-29",
  "topicId": "meniskus",
  "front": {
    "de": "Wie verläuft ein Longitudinalriss und wann wird er zum Korbhenkelriss?",
    "en": "What is the orientation of a longitudinal tear and when is it called bucket-handle?",
    "fa": "مسیر پارگی طولی چیست و چه زمانی دسته‌سطلی نامیده می‌شود؟"
  },
  "answer": {
    "de": "Vertikal entlang der Peripherie; Korbhenkel bei zentraler Verlagerung des inneren Fragments.",
    "en": "Vertical along the periphery; bucket-handle when the inner fragment is displaced centrally.",
    "fa": "عمودی در امتداد محیط؛ با جابه‌جایی قطعهٔ داخلی به مرکز، دسته‌سطلی."
  },
  "explanation": {
    "de": "Ein nicht dislozierter Longitudinalriss ist kein Korbhenkelriss. Periphere Risse können reparabel sein; Dislokation und mechanische Blockade sind klinisch wichtig.",
    "en": "An undisplaced longitudinal tear is not bucket-handle. Peripheral tears may be repairable; displacement and mechanical locking matter clinically.",
    "fa": "پارگی طولی بدون جابه‌جایی دسته‌سطلی نیست؛ پارگی محیطی ممکن است قابل‌ترمیم باشد و جابه‌جایی و قفل‌شدن مکانیکی مهم‌اند."
  },
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-30",
  "topicId": "meniskus",
  "front": {
    "de": "Was kennzeichnet den Parrot-beak-tear?",
    "en": "What characterizes a parrot-beak tear?",
    "fa": "پارگی نوک‌طوطی با چه مشخص می‌شود؟"
  },
  "answer": {
    "de": "Schräger Radiärriss mit spitzem, teilweise angeheftetem Lappen.",
    "en": "Oblique radial tear with a pointed, partly attached flap.",
    "fa": "پارگی شعاعی مایل با لَپ نوک‌تیز و اتصال باقی‌مانده."
  },
  "explanation": {
    "de": "Nach Ursprungsdefekt und disloziertem Lappen suchen, auch in Gelenkrecessus. Ein instabiler Lappen kann mechanische Beschwerden verursachen.",
    "en": "Search for the donor defect and displaced flap, including joint recesses. An unstable flap can cause mechanical symptoms.",
    "fa": "نقص مبدأ و لَپ جابه‌جا‌شده، از جمله در رِسِس مفصل، جست‌وجو شوند؛ لَپ ناپایدار می‌تواند علائم مکانیکی بدهد."
  },
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-31",
  "topicId": "meniskus",
  "front": {
    "de": "Was bezeichnet Flipped Meniscus und welches Zeichen kann entstehen?",
    "en": "What does flipped meniscus describe and which sign may result?",
    "fa": "Flipped Meniscus چه چیزی را توصیف می‌کند و چه علامتی ممکن است ایجاد شود؟"
  },
  "answer": {
    "de": "Umgeschlagenes Fragment; nach vorne kann ein Double-Anterior-Horn-Zeichen entstehen.",
    "en": "A flipped fragment; anterior displacement may produce a double-anterior-horn sign.",
    "fa": "قطعهٔ برگشته؛ جابه‌جایی به جلو ممکن است Double anterior horn ایجاد کند."
  },
  "explanation": {
    "de": "Ein nach vorne verlagertes Hinterhornfragment liegt neben dem Vorderhorn; das Ursprungshorn ist vermindert. Flipped ist eine Verlagerungsform, häufig bei Korbhenkelrissen, kein eigener Rissverlauf.",
    "en": "An anteriorly displaced posterior-horn fragment lies beside the anterior horn; the donor horn is reduced. Flipped is a displacement pattern, often with bucket-handle tears, not a separate tear orientation.",
    "fa": "قطعهٔ شاخ خلفی کنار شاخ قدامی قرار می‌گیرد و شاخ مبدأ کوچک می‌شود؛ Flipped شکل جابه‌جایی، اغلب در دسته‌سطلی، است نه مسیر مستقل پارگی."
  },
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8316871/"
},
  {
  "id": "meniskus-32",
  "topicId": "meniskus",
  "front": {
    "de": "Was muss bei einem wurzelnahen Meniskusdefekt dokumentiert werden?",
    "en": "What must be documented for a root-adjacent meniscal defect?",
    "fa": "در نقص منیسک نزدیک ریشه چه باید ثبت شود؟"
  },
  "answer": {
    "de": "Genauer Ansatzbezug, Kontinuität der Wurzel, Extrusion und Knorpelstatus.",
    "en": "Precise attachment relationship, root continuity, extrusion and cartilage status.",
    "fa": "ارتباط دقیق با اتصال، پیوستگی ریشه، اکستروژن و وضعیت غضروف."
  },
  "explanation": {
    "de": "Eine Avulsion oder ein vollständiger wurzelnaher Radiärriss kann die Verankerung funktionell ausschalten. Nicht jeden Radiärriss als Wurzelriss bezeichnen; den Defekt anatomisch lokalisieren.",
    "en": "An avulsion or complete root-adjacent radial tear can functionally disrupt anchorage. Do not call every radial tear a root tear; localize the defect anatomically.",
    "fa": "کندگی یا شعاعی کامل نزدیک ریشه می‌تواند اتصال را از نظر عملکردی مختل کند؛ هر شعاعی را پارگی ریشه ننامید و محل نقص را آناتومیک تعیین کنید."
  },
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-33",
  "topicId": "meniskus",
  "front": {
    "de": "Was bedeutet das Ghost-Meniscus-Zeichen?",
    "en": "What does the ghost-meniscus sign mean?",
    "fa": "علامت Ghost meniscus چه معنایی دارد؟"
  },
  "answer": {
    "de": "Ein erwarteter Meniskusanteil ist sagittal nicht oder kaum sichtbar.",
    "en": "An expected meniscal segment is absent or barely visible sagittally.",
    "fa": "بخش مورد انتظار منیسک در ساژیتال غایب یا به‌سختی دیده می‌شود."
  },
  "explanation": {
    "de": "Es kann bei vollständigen Radiär- oder Wurzelrissen auftreten, ist aber allein nicht spezifisch. Den Defekt koronal/axial bestätigen und Fragmentverlagerung oder Voroperation berücksichtigen.",
    "en": "It may occur with complete radial or root tears but is not specific alone. Confirm the defect coronally/axially and consider displaced fragments or prior surgery.",
    "fa": "در شعاعی کامل یا پارگی ریشه ممکن است رخ دهد، اما به‌تنهایی اختصاصی نیست؛ نقص کرونال/اکسیال تأیید و جابه‌جایی قطعه یا عمل قبلی لحاظ شود."
  },
  "category": {
    "de": "Risstypen und Dislokation",
    "en": "Tear types and displacement",
    "fa": "انواع پارگی و جابه‌جایی"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-34",
  "topicId": "meniskus",
  "front": {
    "de": "Welche Angaben gehören in einen klinisch nützlichen Meniskusbefund?",
    "en": "What belongs in a clinically useful meniscal report?",
    "fa": "گزارش منیسکِ مفید برای بالین شامل چه مواردی است؟"
  },
  "answer": {
    "de": "Meniskus, Segment, Verlauf/Ausmaß, Dislokation, Wurzelbezug, Extrusion und Begleitbefunde.",
    "en": "Meniscus, segment, orientation/extent, displacement, root relationship, extrusion and associated findings.",
    "fa": "منیسک، سگمان، مسیر/وسعت، جابه‌جایی، ارتباط ریشه، اکستروژن و یافته‌های همراه."
  },
  "explanation": {
    "de": "Ein Signalgrad allein genügt nicht. Bei echter Blockade oder instabilem Fragment die klinische Relevanz klar benennen; die Therapieentscheidung nicht allein aus der Signalhelligkeit ableiten.",
    "en": "A signal grade alone is insufficient. Clearly indicate the significance of true locking or an unstable fragment; do not derive treatment solely from signal brightness.",
    "fa": "گرید سیگنال به‌تنهایی کافی نیست؛ اهمیت قفل‌شدن واقعی یا قطعهٔ ناپایدار روشن بیان شود و درمان صرفاً از روشنی سیگنال نتیجه‌گیری نشود."
  },
  "category": {
    "de": "MRT-Rissdiagnostik",
    "en": "MRI tear diagnosis",
    "fa": "تشخیص پارگی در MRI"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-35",
  "topicId": "meniskus",
  "front": {
    "de": "Was unterscheidet Grad 0 von Grad I?",
    "en": "What distinguishes grade 0 from grade I?",
    "fa": "گرید ۰ و I چه تفاوتی دارند؟"
  },
  "answer": {
    "de": "Grad 0: homogen signalarm. Grad I: fokale Signalanhebung ohne Oberflächenkontakt.",
    "en": "Grade 0: homogeneous low signal. Grade I: focal increased signal without surface contact.",
    "fa": "گرید ۰: کم‌سیگنال همگن. گرید I: افزایش سیگنال کانونی بدون تماس سطحی."
  },
  "explanation": {
    "de": "Fokales nicht surfacierendes Signal ist allein kein Rissnachweis und beweist keine bestimmte Histologie. Form und Kontinuität zusätzlich prüfen; normales Signal allein schließt nicht jeden morphologischen Defekt aus.",
    "en": "Focal nonsurfacing signal alone neither establishes a tear nor proves a specific histology. Also assess shape and continuity; normal signal alone does not exclude every morphological defect.",
    "fa": "سیگنال کانونی بدون تماس سطحی به‌تنهایی نه پارگی را اثبات می‌کند و نه بافت‌شناسی مشخصی را. شکل و پیوستگی هم بررسی شوند؛ سیگنال طبیعی تمام نقص‌های مورفولوژیک را رد نمی‌کند."
  },
  "category": {
    "de": "Lotysch-Klassifikation",
    "en": "Lotysch classification",
    "fa": "طبقه‌بندی لوتوش"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
  "id": "meniskus-36",
  "topicId": "meniskus",
  "front": {
    "de": "Welche zwei sagittalen Zeichen stützen einen Flipped-Meniskus?",
    "en": "Which two sagittal signs support a flipped meniscus?",
    "fa": "کدام دو علامت ساژیتال به نفع منیسک وارونه‌شده‌اند؟"
  },
  "answer": {
    "de": "Double-Anterior-Horn-Zeichen und Empty-Posterior-Horn-Zeichen.",
    "en": "Double-anterior-horn sign and empty-posterior-horn sign.",
    "fa": "علامت شاخ قدامی دوگانه و علامت شاخ خلفی خالی."
  },
  "explanation": {
    "de": "Ein nach anterior verlagertes Hinterhorn kann am Vorderhorn doppelte Meniskusstruktur vortäuschen; am ursprünglichen Hinterhorn fehlt das normale signalärmere Meniskusgewebe. Eine Vorderhornvariante kann die Verdopplung imitieren.",
    "en": "An anteriorly displaced posterior horn can create duplicated meniscal tissue at the anterior horn; normal low-signal meniscal tissue is absent at the native posterior-horn position. An anterior-horn variant can mimic the duplication.",
    "fa": "شاخ خلفیِ جابه‌جاشده به قدام می‌تواند در محل شاخ قدامی ساختار منیسک دوگانه ایجاد کند؛ در محل اصلی شاخ خلفی بافت منیسک کم‌سیگنال طبیعی دیده نمی‌شود. واریانت شاخ قدامی می‌تواند این دوگانگی را تقلید کند."
  },
  "category": {
    "de": "Dislozierte Meniskusrisse",
    "en": "Displaced meniscal tears",
    "fa": "پارگی‌های جابه‌جاشدهٔ منیسک"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8316871/"
},
  {
  "id": "meniskus-37",
  "topicId": "meniskus",
  "front": {
    "de": "Wie lässt sich ein PDF-„Wrisberg-Riss“ anatomisch präziser beschreiben?",
    "en": "How can the PDF’s “Wrisberg rip” be described more precisely in anatomic terms?",
    "fa": "اصطلاح Wrisberg rip در PDF را چگونه می‌توان با توصیف آناتومیک دقیق‌تر بیان کرد؟"
  },
  "answer": {
    "de": "Longitudinal-vertikaler Riss am Hinterhorn des Außenmeniskus nahe dem posterioren meniskofemoralen Ansatz.",
    "en": "Longitudinal-vertical tear of the lateral meniscus posterior horn near the posterior meniscofemoral attachment.",
    "fa": "پارگی طولی-عمودی شاخ خلفی منیسک خارجی نزدیک اتصال خلفی منیسکوفمورال."
  },
  "explanation": {
    "de": "Ein intaktes posterior-meniskofemorales Ligament kann einen Pseudoriss vortäuschen. Seine Kontinuität zum Femur über Nachbarschichten verfolgen. Der Rissbegriff allein belegt keine VKB-Ruptur.",
    "en": "An intact posterior meniscofemoral ligament can mimic a tear. Trace its continuity to the femur across adjacent slices. The tear pattern alone does not establish an ACL rupture.",
    "fa": "رباط منیسکوفمورال خلفی سالم می‌تواند پارگی را تقلید کند؛ پیوستگی آن را در برش‌های مجاور تا فمور دنبال کنید. این الگو به‌تنهایی پارگی ACL را ثابت نمی‌کند."
  },
  "category": {
    "de": "Rissmuster und Pseudorisse",
    "en": "Tear patterns and pseudotears",
    "fa": "الگوهای پارگی و پارگی کاذب"
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC13424353/"
},
  {
    "id": "haemangiom-01-definition",
    "topicId": "haemangiom",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist ein Leberhämangiom pathologisch?",
      "en": "What is a liver haemangioma pathologically?",
      "fa": "همانژیوم کبدی از نظر پاتولوژی چیست؟"
    },
    "answer": {
      "de": "Kavernöse nicht-neoplastische Malformation.",
      "en": "Cavernous non-neoplastic malformation.",
      "fa": "مالفورماسیون کاورنوز غیرنئوپلاستیک."
    },
    "explanation": {
      "de": "Ein Hämangiom ist kein echter maligner oder prämaligner Tumor, sondern eine vaskuläre Malformation. Deshalb ist bei klassischer Bildgebung meist keine invasive Abklärung nötig.",
      "en": "A haemangioma is not a true malignant or premalignant tumour, but a vascular malformation. Therefore, classic imaging usually does not require invasive work-up.",
      "fa": "همانژیوم یک تومور بدخیم یا پیش‌بدخیم واقعی نیست، بلکه یک مالفورماسیون عروقی است. بنابراین در تصویر تیپیک معمولاً نیازی به بررسی تهاجمی نیست."
    },
    "diagram": {
      "de": "Gefäßmalformation → benigne → meist keine Biopsie",
      "en": "Vascular malformation → benign → usually no biopsy",
      "fa": "مالفورماسیون عروقی → خوش‌خیم → معمولاً بدون بیوپسی"
    }
  },
  {
    "id": "haemangiom-02-epidemiologie",
    "topicId": "haemangiom",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Welcher gutartige solide Lebertumor ist am häufigsten?",
      "en": "Which benign solid liver tumour is most common?",
      "fa": "شایع‌ترین تومور جامد خوش‌خیم کبد چیست؟"
    },
    "answer": {
      "de": "Leberhämangiom.",
      "en": "Liver haemangioma.",
      "fa": "همانژیوم کبدی."
    },
    "explanation": {
      "de": "Hämangiome werden häufig zufällig bei Screening- oder Staging-Untersuchungen gefunden. Sie sind bei Frauen häufiger und liegen oft peripher im Leberparenchym.",
      "en": "Haemangiomas are often found incidentally during screening or staging examinations. They are more frequent in women and are often peripheral in the liver parenchyma.",
      "fa": "همانژیوم‌ها اغلب به صورت اتفاقی در بررسی‌های screening یا staging دیده می‌شوند. در زنان شایع‌ترند و معمولاً در قسمت محیطی پارانشیم کبد قرار دارند."
    },
    "diagram": {
      "de": "Häufigster benigner solider Lebertumor → oft Zufallsbefund",
      "en": "Most common benign solid liver tumour → often incidental",
      "fa": "شایع‌ترین تومور جامد خوش‌خیم کبد → اغلب اتفاقی"
    }
  },
  {
    "id": "haemangiom-03-sono-klassisch",
    "topicId": "haemangiom",
    "category": {
      "de": "Sonographie",
      "en": "Ultrasound",
      "fa": "سونوگرافی"
    },
    "front": {
      "de": "Wann reicht die Sonographie bei einem Leberhämangiom oft aus?",
      "en": "When is ultrasound often sufficient for a liver haemangioma?",
      "fa": "چه زمانی سونوگرافی برای همانژیوم کبدی کافی است؟"
    },
    "answer": {
      "de": "Bei klassischer Sonomorphologie.",
      "en": "When morphology is classic.",
      "fa": "وقتی ظاهر سونوگرافی کاملاً تیپیک باشد."
    },
    "explanation": {
      "de": "Ein typisches Hämangiom ist meist scharf begrenzt und echoreich. Bei kleiner, klassischer Läsion in unauffälliger Leber ist häufig keine zusätzliche CT oder MRT nötig.",
      "en": "A typical haemangioma is usually sharply marginated and hyperechoic. If the lesion is small and classic in an otherwise unremarkable liver, additional CT or MRI is often unnecessary.",
      "fa": "همانژیوم تیپیک معمولاً خوش‌حد و اکوژن است. اگر ضایعه کوچک و تیپیک باشد و کبد زمینه‌ای مشکل خاصی نداشته باشد، اغلب CT یا MRI اضافی لازم نیست."
    },
    "diagram": {
      "de": "Sono typisch: echoreich + scharf begrenzt → keine weitere Diagnostik",
      "en": "Typical US: hyperechoic + sharp margins → no further work-up",
      "fa": "سونو تیپیک: اکوژن + خوش‌حد → بدون بررسی اضافه"
    }
  },
  {
    "id": "haemangiom-04-ct-muster",
    "topicId": "haemangiom",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Welches CT-Enhancement ist typisch für ein Leberhämangiom?",
      "en": "Which CT enhancement pattern is typical for liver haemangioma?",
      "fa": "کدام الگوی تقویت پس از تزریق در CT برای همانژیوم کبدی تیپیک است؟"
    },
    "answer": {
      "de": "Peripher nodulär mit zentripetaler Auffüllung.",
      "en": "Peripheral nodular enhancement with centripetal fill-in.",
      "fa": "تقویت پس از تزریق ندولار محیطی با پرشدگی مرکزگرا."
    },
    "explanation": {
      "de": "Früharteriell beginnt die Kontrastmittelaufnahme diskontinuierlich am Rand. In portalvenösen und späteren Phasen füllt sich die Läsion langsam von außen nach innen auf.",
      "en": "Early arterial enhancement starts discontinuously at the rim. In portal venous and delayed phases, the lesion slowly fills in from the outside toward the centre.",
      "fa": "در فاز شریانی زودرس، جذب ماده حاجب به صورت ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری، ضایعه آهسته از بیرون به مرکز پر می‌شود."
    },
    "diagram": {
      "de": "Arteriell: Randnoduli → Portal/spät: Zentrum füllt sich",
      "en": "Arterial: rim nodules → portal/delayed: centre fills in",
      "fa": "شریانی: ندول‌های محیطی → پورتال/تأخیری: پر شدن مرکز"
    }
  },
  {
    "id": "haemangiom-05-iris",
    "topicId": "haemangiom",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Was bedeutet das Irisblendenphänomen beim Leberhämangiom?",
      "en": "What does the iris diaphragm phenomenon mean in liver haemangioma?",
      "fa": "پدیده پدیده دیافراگم عنبیه در همانژیوم کبدی یعنی چه؟"
    },
    "answer": {
      "de": "Zentripetale KM-Auffüllung.",
      "en": "Centripetal contrast fill-in.",
      "fa": "پرشدگی مرکزگرا با ماده حاجب."
    },
    "explanation": {
      "de": "Die Läsion füllt sich dynamisch von der Peripherie zum Zentrum. Dieses Verhalten ist viel typischer für Hämangiom als für malignes Ringenhancement.",
      "en": "The lesion fills dynamically from the periphery to the centre. This behaviour is far more typical of haemangioma than malignant rim enhancement.",
      "fa": "ضایعه به صورت دینامیک از محیط به سمت مرکز پر می‌شود. این رفتار برای همانژیوم بسیار تیپیک‌تر از تقویت حلقوی بدخیم است."
    },
    "diagram": {
      "de": "Peripherie → Zentrum\nIrisblende schließt von außen nach innen",
      "en": "Periphery → centre\nIris closes from outside inward",
      "fa": "محیط → مرکز\nمثل بسته شدن دیافراگم از بیرون به داخل"
    }
  },
  {
    "id": "haemangiom-06-t2",
    "topicId": "haemangiom",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Welches T2-Zeichen spricht stark für ein typisches Leberhämangiom?",
      "en": "Which T2 sign strongly supports a typical liver haemangioma?",
      "fa": "کدام علامت T2 به شدت به نفع همانژیوم تیپیک کبدی است؟"
    },
    "answer": {
      "de": "Light-bulb sign.",
      "en": "Light-bulb sign.",
      "fa": "علامت علامت لامپ روشن."
    },
    "explanation": {
      "de": "Typische Hämangiome sind in T2 sehr hell, teils sogar heller als Galle. Größere Hämangiome können durch Fibrose, Verkalkungen oder Thromben inhomogener wirken.",
      "en": "Typical haemangiomas are very bright on T2, sometimes even brighter than bile. Larger haemangiomas may appear heterogeneous because of fibrosis, calcifications or thrombi.",
      "fa": "همانژیوم تیپیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. ضایعات بزرگ‌تر ممکن است به علت فیبروز، کلسیفیکاسیون یا ترومبوز ناهمگون باشند."
    },
    "diagram": {
      "de": "T2 sehr hell → Light-bulb sign → Hämangiom typisch",
      "en": "Very bright T2 → light-bulb sign → typical haemangioma",
      "fa": "T2 بسیار روشن → علامت علامت لامپ روشن → همانژیوم تیپیک"
    }
  },
  {
    "id": "haemangiom-07-dwi-adc",
    "topicId": "haemangiom",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Warum ist ein helles DWI-Signal beim Hämangiom nicht automatisch verdächtig?",
      "en": "Why is bright DWI signal in haemangioma not automatically suspicious?",
      "fa": "چرا روشن بودن DWI در همانژیوم خودبه‌خود مشکوک نیست؟"
    },
    "answer": {
      "de": "Wegen T2-shine-through.",
      "en": "Because of T2 shine-through.",
      "fa": "به علت اثر عبور سیگنال T2 (shine-through)."
    },
    "explanation": {
      "de": "Hämangiome können auf hohen b-Werten hell sein. Entscheidend ist die ADC-Karte: hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion und helfen in der DD zu Metastasen.",
      "en": "Haemangiomas can be bright on high b-values. The ADC map is decisive: high ADC values argue against true diffusion restriction and help distinguish them from metastases.",
      "fa": "همانژیوم‌ها ممکن است در b-value بالا روشن باشند. ADC تعیین‌کننده است: ADC بالا علیه محدودیت انتشار واقعی است و در افتراق از متاستاز کمک می‌کند."
    },
    "diagram": {
      "de": "DWI hell + ADC hoch = T2-shine-through\nDWI hell + ADC niedrig = echte Restriktion",
      "en": "Bright DWI + high ADC = T2 shine-through\nBright DWI + low ADC = true restriction",
      "fa": "DWI روشن + ADC بالا = اثر عبور سیگنال T2 (shine-through)\nDWI روشن + ADC پایین = محدودیت واقعی انتشار"
    }
  },
  {
    "id": "haemangiom-08-t1c-dynamik",
    "topicId": "haemangiom",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Wie verhält sich ein typisches Hämangiom in der dynamischen T1-KM-MRT?",
      "en": "How does a typical haemangioma behave on dynamic contrast-enhanced T1 MRI?",
      "fa": "همانژیوم تیپیک در T1 داینامیک بعد از کنتراست چگونه رفتار می‌کند؟"
    },
    "answer": {
      "de": "Randnoduli, dann zentripetale Auffüllung.",
      "en": "Rim nodules, then centripetal fill-in.",
      "fa": "ندول‌های محیطی، سپس پرشدگی مرکزگرا."
    },
    "explanation": {
      "de": "Arteriell beginnt die Aufnahme fleckig und diskontinuierlich am Rand. Portalvenös und spät zieht sie langsam in die Mitte, bis die Läsion zunehmend homogen kontrastiert.",
      "en": "Arterially, enhancement begins patchy and discontinuously at the rim. In portal venous and delayed phases it slowly moves to the centre until the lesion enhances more homogeneously.",
      "fa": "در فاز شریانی، تقویت پس از تزریق به صورت لکه‌ای و ناپیوسته از حاشیه شروع می‌شود. در فاز پورتال و تأخیری آهسته به مرکز می‌رود تا ضایعه به‌تدریج هموژن‌تر تقویت پس از تزریق پیدا کند."
    },
    "diagram": {
      "de": "Randnoduli → zentripetal → homogenere Kontrastierung",
      "en": "Rim nodules → centripetal → more homogeneous enhancement",
      "fa": "ندول محیطی → مرکزگرا → تقویت همگن‌تر"
    }
  },
  {
    "id": "haemangiom-09-gross",
    "topicId": "haemangiom",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Warum können große Hämangiome in T2 inhomogen sein?",
      "en": "Why can large haemangiomas be heterogeneous on T2?",
      "fa": "چرا همانژیوم‌های بزرگ در T2 می‌توانند ناهمگون باشند؟"
    },
    "answer": {
      "de": "Durch Fibrose, Verkalkungen oder Thromben.",
      "en": "Due to fibrosis, calcifications or thrombi.",
      "fa": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز."
    },
    "explanation": {
      "de": "Kleine Hämangiome sind oft homogen hell. Größere Läsionen können intern degenerieren oder sklerosieren und dadurch weniger klassisch aussehen.",
      "en": "Small haemangiomas are often homogeneously bright. Larger lesions can undergo internal degeneration or sclerosis and therefore look less classic.",
      "fa": "همانژیوم‌های کوچک اغلب هموژن و روشن هستند. ضایعات بزرگ‌تر ممکن است دچار تغییرات داخلی یا اسکلروز شوند و ظاهر کمتر تیپیک پیدا کنند."
    },
    "diagram": {
      "de": "großes Hämangiom → Fibrose/Thromben/Kalk → T2 inhomogen",
      "en": "large haemangioma → fibrosis/thrombi/calcification → heterogeneous T2",
      "fa": "همانژیوم بزرگ → فیبروز/ترومبوز/کلسیم → T2 ناهمگون"
    }
  },
  {
    "id": "haemangiom-10-atypisch-definition",
    "topicId": "haemangiom",
    "category": {
      "de": "Atypisch",
      "en": "Atypical",
      "fa": "آتیپیک"
    },
    "front": {
      "de": "Was macht ein Leberhämangiom radiologisch atypisch?",
      "en": "What makes a liver haemangioma radiologically atypical?",
      "fa": "چه چیزی همانژیوم کبدی را از نظر رادیولوژی آتیپیک می‌کند؟"
    },
    "answer": {
      "de": "Fehlendes klassisches Muster.",
      "en": "Absence of the classic pattern.",
      "fa": "نبود الگوی کلاسیک."
    },
    "explanation": {
      "de": "Atypisch sind z. B. ungewöhnliche Morphologie, fehlende zentripetale Auffüllung, Sklerosierung, Kalzifikationen oder parenchymale Begleitveränderungen. Dann wird die DD zu malignen Läsionen wichtiger.",
      "en": "Atypical features include unusual morphology, absent centripetal fill-in, sclerosis, calcifications or associated parenchymal changes. Then differentiation from malignant lesions becomes more important.",
      "fa": "ویژگی‌های آتیپیک شامل مورفولوژی غیرمعمول، نبود پرشدگی مرکزگرا، اسکلروز، کلسیفیکاسیون یا تغییرات همراه پارانشیم است. در این حالت افتراق از ضایعات بدخیم مهم‌تر می‌شود."
    },
    "diagram": {
      "de": "fehlende Zentripetenz + ungewöhnliche Morphologie → DD Malignität",
      "en": "absent centripetal fill-in + unusual morphology → DD malignancy",
      "fa": "نبود پرشدگی مرکزگرا + مورفولوژی غیرمعمول → افتراق بدخیمی"
    }
  },
  {
    "id": "haemangiom-11-atypisch-t2",
    "topicId": "haemangiom",
    "category": {
      "de": "Atypisch",
      "en": "Atypical",
      "fa": "آتیپیک"
    },
    "front": {
      "de": "Typisches vs. atypisches Hämangiom: Wie unterscheidet sich T2?",
      "en": "Typical vs atypical haemangioma: how does T2 differ?",
      "fa": "همانژیوم تیپیک و آتیپیک در T2 چه تفاوتی دارند؟"
    },
    "answer": {
      "de": "Typisch sehr hell, atypisch weniger/inhomogen hell.",
      "en": "Typical very bright, atypical less/heterogeneously bright.",
      "fa": "تیپیک بسیار روشن، آتیپیک کمتر یا ناهمگون روشن."
    },
    "explanation": {
      "de": "Das klassische Light-bulb-Zeichen kann beim atypischen oder sklerosierten Hämangiom abgeschwächt sein. Zentrale hypointense Areale können fibrotischen Anteilen entsprechen.",
      "en": "The classic light-bulb sign may be reduced in atypical or sclerosed haemangioma. Central hypointense areas can correspond to fibrotic components.",
      "fa": "علامت کلاسیک علامت لامپ روشن در همانژیوم آتیپیک یا اسکلروزه ممکن است ضعیف‌تر باشد. نواحی مرکزی هیپواینتنس می‌توانند مربوط به بخش‌های فیبروتیک باشند."
    },
    "diagram": {
      "de": "typisch: T2 strahlend hell\natypisch: T2 weniger hell/inhomogen",
      "en": "typical: very bright T2\natypical: less bright/heterogeneous T2",
      "fa": "تیپیک: T2 بسیار روشن\nآتیپیک: T2 کمتر روشن/ناهمگون"
    }
  },
  {
    "id": "haemangiom-12-atypisch-enhancement",
    "topicId": "haemangiom",
    "category": {
      "de": "Atypisch",
      "en": "Atypical",
      "fa": "آتیپیک"
    },
    "front": {
      "de": "Welche KM-Aufnahme kann bei atypischem Hämangiom statt des klassischen Musters auftreten?",
      "en": "Which enhancement pattern can occur in atypical haemangioma instead of the classic pattern?",
      "fa": "در همانژیوم آتیپیک به جای الگوی کلاسیک چه تقویت پس از تزریق ممکن است دیده شود؟"
    },
    "answer": {
      "de": "Früharteriell homogen stark.",
      "en": "Strong homogeneous arterial enhancement.",
      "fa": "تقویت همگن و قوی شریانی."
    },
    "explanation": {
      "de": "Atypische Hämangiome zeigen nicht immer periphere noduläre Aufnahme. Sie können früharteriell homogen stark kontrastieren und in späteren Phasen hyperintens bleiben.",
      "en": "Atypical haemangiomas do not always show peripheral nodular enhancement. They may enhance strongly and homogeneously in the arterial phase and remain hyperintense later.",
      "fa": "همانژیوم‌های آتیپیک همیشه تقویت پس از تزریق ندولار محیطی ندارند. ممکن است در فاز شریانی به صورت هموژن و قوی تقویت پس از تزریق داشته باشند و در فازهای بعدی هم هایپراینتنس بمانند."
    },
    "diagram": {
      "de": "typisch: Randnoduli + Fill-in\natypisch: homogen stark arteriell",
      "en": "typical: rim nodules + fill-in\natypical: strong homogeneous arterial enhancement",
      "fa": "تیپیک: ندول محیطی + پرشدگی\nآتیپیک: تقویت شریانی هموژن قوی"
    }
  },
  {
    "id": "haemangiom-13-dd-metastase",
    "topicId": "haemangiom",
    "category": {
      "de": "Differenzialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Welcher Befund spricht gegen Metastase und eher für Hämangiom?",
      "en": "Which finding argues against metastasis and supports haemangioma?",
      "fa": "کدام یافته علیه متاستاز و به نفع همانژیوم است؟"
    },
    "answer": {
      "de": "Hoher ADC-Wert mit mehrphasigem zentripetalem Fill-in.",
      "en": "High ADC with multiphasic centripetal fill-in.",
      "fa": "ADC بالا همراه با پرشدگی چندفازی مرکزگرا."
    },
    "explanation": {
      "de": "Metastasen zeigen häufiger echte Diffusionsrestriktion mit niedrigerem ADC und kein typisches mehrphasiges zentripetales Fill-in. Das Muster über mehrere Phasen ist wichtiger als ein Einzelbild.",
      "en": "Metastases more often show true diffusion restriction with lower ADC and no typical multiphasic centripetal fill-in. The multiphasic pattern is more important than a single image.",
      "fa": "متاستازها بیشتر محدودیت انتشار واقعی با ADC پایین‌تر نشان می‌دهند و الگوی پرشدگی چندفازی مرکزگرا ندارند. الگوی چندفازی از یک تصویر منفرد مهم‌تر است."
    },
    "diagram": {
      "de": "Hämangiom: ADC hoch + zentripetales Fill-in\nMetastase: ADC niedrig + kein Fill-in",
      "en": "Haemangioma: high ADC + centripetal fill-in\nMetastasis: low ADC + no fill-in",
      "fa": "همانژیوم: ADC بالا + پرشدگی مرکزگرا\nمتاستاز: ADC پایین + بدون پرشدگی تدریجی"
    }
  },
  {
  "id": "fnh-01-definition",
  "topicId": "fnh",
  "category": {
    "de": "Grundlagen",
    "en": "Basics",
    "fa": "مبانی"
  },
  "front": {
    "de": "Was ist die FNH pathologisch?",
    "en": "What is FNH pathologically?",
    "fa": "FNH از نظر پاتولوژی چیست؟"
  },
  "answer": {
    "de": "Benigne, regenerative Raumforderung der Leber.",
    "en": "Benign, regenerative liver lesion.",
    "fa": "ضایعه خوش‌خیم و رژنراتیو کبد."
  },
  "explanation": {
    "de": "FNH gilt als lokale regenerative Reaktion auf eine veränderte arterielle Versorgung, nicht als echte Neoplasie. Die Konsequenz hängt davon ab, ob die Diagnose bildgebend sicher ist.",
    "en": "FNH is regarded as a local regenerative response to altered arterial supply rather than a true neoplasm. Management depends on whether imaging establishes the diagnosis confidently.",
    "fa": "FNH واکنش رژنراتیو موضعی به خون‌رسانی شریانی تغییریافته دانسته می‌شود، نه نئوپلازی واقعی. مدیریت به اطمینان تشخیص تصویربرداری بستگی دارد."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-02-epidemiologie",
  "topicId": "fnh",
  "category": {
    "de": "Grundlagen",
    "en": "Basics",
    "fa": "مبانی"
  },
  "front": {
    "de": "Welcher gutartige solide Lebertumor folgt in der Häufigkeit auf das Hämangiom?",
    "en": "Which benign solid liver tumour is second in frequency after haemangioma?",
    "fa": "کدام تومور جامد خوش‌خیم کبد پس از همانژیوم از نظر شیوع در رتبهٔ دوم است؟"
  },
  "answer": {
    "de": "Die FNH.",
    "en": "FNH.",
    "fa": "FNH."
  },
  "explanation": {
    "de": "FNH wird bevorzugt bei jungen bis mittelalten Frauen entdeckt. Das ist ein epidemiologischer Hinweis; Demografie allein trennt FNH nicht sicher von HCA.",
    "en": "FNH is predominantly detected in young to middle-aged women. This is an epidemiological clue; demographics alone do not distinguish FNH confidently from HCA.",
    "fa": "FNH بیشتر در زنان جوان تا میانسال کشف می‌شود. این سرنخ اپیدمیولوژیک است؛ جمعیت‌شناسی به‌تنهایی FNH را به‌طور مطمئن از HCA جدا نمی‌کند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857",
  "sources": [
    "https://doi.org/10.14309/ajg.0000000000002857"
  ]
},
  {
  "id": "fnh-03-sono",
  "topicId": "fnh",
  "category": {
    "de": "Sonographie",
    "en": "Ultrasound",
    "fa": "سونوگرافی"
  },
  "front": {
    "de": "Wie stellt sich eine FNH in der Sonographie meist dar?",
    "en": "How does FNH typically appear on ultrasound?",
    "fa": "FNH معمولاً در سونوگرافی چگونه دیده می‌شود؟"
  },
  "answer": {
    "de": "Glatt begrenzt, rund, iso- bis leicht hypoechogen.",
    "en": "Well-defined, round, iso- to mildly hypoechoic.",
    "fa": "خوش‌حد، گرد، ایزو تا کمی هیپواکوژن."
  },
  "explanation": {
    "de": "Die FNH ist sonographisch oft nur subtil von der übrigen Leber abgrenzbar, da sie ähnliches Gewebe wie das normale Leberparenchym enthält.",
    "en": "FNH is often only subtly different from the surrounding liver on ultrasound because it consists of tissue similar to normal liver parenchyma.",
    "fa": "FNH اغلب فقط به‌طور خفیف از بافت کبد در سونوگرافی قابل افتراق است، چون از بافتی شبیه پارانشیم نرمال کبد تشکیل شده است."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-04-doppler",
  "topicId": "fnh",
  "category": {
    "de": "Sonographie",
    "en": "Ultrasound",
    "fa": "سونوگرافی"
  },
  "front": {
    "de": "Welches Doppler-Muster ist typisch für eine FNH?",
    "en": "Which Doppler pattern is typical for FNH?",
    "fa": "کدام الگوی داپلر برای FNH تیپیک است؟"
  },
  "answer": {
    "de": "Spoke-wheel-Muster: ein zentrales Gefäß mit radiären Ästen.",
    "en": "Spoke-wheel pattern: central vessel with radiating branches.",
    "fa": "الگوی spoke-wheel: یک رگ مرکزی با شاخه‌های شعاعی."
  },
  "explanation": {
    "de": "Die zentrale Versorgungsarterie und radiäre Äste erzeugen dieses Muster. Es unterstützt FNH, ersetzt aber nicht die vollständige Charakterisierung einer unklaren soliden Läsion.",
    "en": "The central feeding artery and radial branches produce this pattern. It supports FNH but does not replace complete characterisation of an indeterminate solid lesion.",
    "fa": "شریان تغذیه‌کنندهٔ مرکزی و شاخه‌های شعاعی این الگو را می‌سازند. الگو از FNH حمایت می‌کند، اما جای تعیین ماهیت کامل ضایعهٔ جامد نامشخص را نمی‌گیرد."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-05-ct",
  "topicId": "fnh",
  "category": {
    "de": "CT",
    "en": "CT",
    "fa": "CT"
  },
  "front": {
    "de": "Wie verhält sich die FNH früharteriell in der CT?",
    "en": "How does FNH behave in the early arterial phase on CT?",
    "fa": "رفتار FNH در فاز شریانی زودرس CT چگونه است؟"
  },
  "answer": {
    "de": "Kräftige, homogene Kontrastmittelaufnahme.",
    "en": "Strong, homogeneous enhancement.",
    "fa": "جذب واضح و همگن مادهٔ حاجب."
  },
  "explanation": {
    "de": "Im Vergleich zum klassischen Hämangiommuster zeigt typische FNH eine rasche, homogene arterielle Anreicherung statt diskontinuierlicher peripherer Kontrastknoten mit späterer zentripetaler Auffüllung.",
    "en": "Compared with the classic haemangioma pattern, typical FNH shows rapid, homogeneous arterial enhancement rather than discontinuous peripheral nodules with later centripetal fill-in.",
    "fa": "برخلاف الگوی کلاسیک همانژیوم، FNH تیپیک جذب شریانی سریع و همگن دارد؛ نه ندول‌های محیطی ناپیوسته با پرشدگی مرکزگرای بعدی."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-06-washout",
  "topicId": "fnh",
  "category": {
    "de": "CT",
    "en": "CT",
    "fa": "CT"
  },
  "front": {
    "de": "Welches spätere Kontrastmittelverhalten passt zur typischen FNH in CT bzw. dynamischer MRT?",
    "en": "Which later contrast behaviour fits typical FNH on CT or dynamic MRI?",
    "fa": "کدام رفتار مادهٔ حاجب در فازهای بعدی CT یا MRI دینامیک با FNH تیپیک سازگار است؟"
  },
  "answer": {
    "de": "Typischerweise Angleichung an das Leberparenchym ohne typisches Wash-out.",
    "en": "Typically equalisation to liver parenchyma without typical washout.",
    "fa": "معمولاً تطابق با پارانشیم کبد بدون واش‌اوت تیپیک."
  },
  "explanation": {
    "de": "Das Muster passt zur typischen FNH, schließt ein HCC aber nicht allein aus. Risikokontext und vollständige Phasenbeurteilung bleiben wichtig.",
    "en": "The pattern fits typical FNH but does not alone exclude HCC. Risk context and full-phase assessment remain important.",
    "fa": "این الگو با FNH تیپیک سازگار است، اما به‌تنهایی HCC را رد نمی‌کند. زمینهٔ خطر و ارزیابی کامل فازها همچنان مهم‌اند."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-07-t1t2",
  "topicId": "fnh",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Wie ist das T1/T2-Signal der FNH zum Leberparenchym?",
    "en": "What is the T1/T2 signal of FNH relative to the liver parenchyma?",
    "fa": "سیگنال T1/T2 FNH نسبت به پارانشیم کبد چگونه است؟"
  },
  "answer": {
    "de": "Iso- bis leicht hypointens in T1, iso- bis leicht hyperintens in T2.",
    "en": "Iso- to mildly hypointense on T1, iso- to mildly hyperintense on T2.",
    "fa": "ایزو تا کمی هیپواینتنس در T1، ایزو تا کمی هایپراینتنس در T2."
  },
  "explanation": {
    "de": "Da die FNH aus ähnlichem Gewebe wie das umgebende Leberparenchym besteht, ist sie nativ oft nur diskret abgrenzbar.",
    "en": "Because FNH consists of tissue similar to the surrounding liver parenchyma, it is often only subtly visible on non-contrast images.",
    "fa": "چون FNH از بافتی شبیه پارانشیم اطراف تشکیل شده، اغلب در تصاویر بدون کنتراست فقط به‌طور خفیف قابل مشاهده است."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-08-narbe",
  "topicId": "fnh",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Wie verhält sich eine erkennbare zentrale FNH-Narbe in MRT mit extrazellulärem Kontrastmittel?",
    "en": "How does a visible FNH central scar behave on MRI with extracellular contrast?",
    "fa": "اسکار مرکزی قابل‌مشاهدهٔ FNH در MRI با مادهٔ حاجب خارج‌سلولی چگونه رفتار می‌کند؟"
  },
  "answer": {
    "de": "Hyperintens in T2, hypointens in T1, mit verzögerter KM-Aufnahme.",
    "en": "Hyperintense on T2, hypointense on T1, with delayed enhancement.",
    "fa": "هایپراینتنس در T2، هیپواینتنس در T1، با تقویت تأخیری."
  },
  "explanation": {
    "de": "Die Narbe ist charakteristisch, aber nicht obligat. Ihre verzögerte extrazelluläre Anreicherung ist von der hepatobiliären Aufnahme des übrigen Läsionsgewebes zu unterscheiden.",
    "en": "The scar is characteristic but not obligatory. Its delayed extracellular enhancement differs from hepatobiliary uptake of the remaining lesion tissue.",
    "fa": "اسکار مشخصهٔ ضایعه است، اما الزامی نیست. جذب تأخیری خارج‌سلولی اسکار با جذب هپاتوبیلیاری سایر بافت ضایعه متفاوت است."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-09-narbe-haeufigkeit",
  "topicId": "fnh",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Ist die zentrale Narbe bei jeder FNH vorhanden?",
    "en": "Is the central scar present in every FNH?",
    "fa": "آیا اسکار مرکزی در همه موارد FNH وجود دارد؟"
  },
  "answer": {
    "de": "Nein. Eine Narbe kann fehlen oder nicht erkennbar sein, besonders bei kleinen FNH.",
    "en": "No. A scar may be absent or not visible, particularly in small FNH.",
    "fa": "خیر. اسکار ممکن است وجود نداشته باشد یا دیده نشود، به‌ویژه در FNH کوچک."
  },
  "explanation": {
    "de": "Die Diagnose beruht auf der Kombination aus nativem Signal, Dynamik und gegebenenfalls hepatobiliärer Phase. Eine fehlende Narbe allein beweist weder HCA noch Malignität.",
    "en": "Diagnosis relies on combined native signal, dynamic behaviour and, when used, the hepatobiliary phase. An absent scar alone proves neither HCA nor malignancy.",
    "fa": "تشخیص بر ترکیب سیگنال پایه، رفتار دینامیک و در صورت استفاده، فاز هپاتوبیلیاری استوار است. نبود اسکار به‌تنهایی نه HCA و نه بدخیمی را ثابت می‌کند."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001"
  ]
},
  {
  "id": "fnh-10-atypisch",
  "topicId": "fnh",
  "category": {
    "de": "Differentialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Welche Abweichungen können die bildgebende Zuordnung einer FNH erschweren?",
    "en": "Which departures from the usual pattern can make imaging classification of FNH difficult?",
    "fa": "کدام انحراف‌ها از الگوی معمول می‌توانند تعیین ماهیت تصویری FNH را دشوار کنند؟"
  },
  "answer": {
    "de": "Fehlende zentrale Narbe, heterogenes Bild, Pseudokapsel oder intraläsionales Fett.",
    "en": "Absent central scar, heterogeneous appearance, pseudocapsule, or intralesional fat.",
    "fa": "نبود اسکار مرکزی، ظاهر هتروژن، پسودوکپسول یا چربی داخل ضایعه."
  },
  "explanation": {
    "de": "Keines dieser Merkmale beweist allein FNH oder Malignität. Bleibt die Zuordnung nach geeigneter Bildgebung unklar, sind spezialisierte MDT-Einordnung und gegebenenfalls Biopsie zu erwägen.",
    "en": "None of these findings alone proves FNH or malignancy. If appropriate imaging remains indeterminate, specialist MDT review and possible biopsy should be considered.",
    "fa": "هیچ‌یک از این یافته‌ها به‌تنهایی FNH یا بدخیمی را ثابت نمی‌کند. اگر پس از تصویربرداری مناسب تعیین ماهیت نامشخص بماند، ارزیابی در تیم تخصصی و احتمال بیوپسی مطرح است."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001",
    "https://doi.org/10.14309/ajg.0000000000002857"
  ]
},
  {
  "id": "fnh-11-dd-hcc",
  "topicId": "fnh",
  "category": {
    "de": "Differentialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Welches Signal in der hepatobiliären MRT-Phase passt eher zu FNH als zu einem hepatozellulären Adenom?",
    "en": "Which hepatobiliary-phase signal favours FNH over hepatocellular adenoma?",
    "fa": "کدام سیگنال در فاز هپاتوبیلیاری MRI بیشتر به نفع FNH نسبت به آدنوم هپاتوسلولار است؟"
  },
  "answer": {
    "de": "FNH ist meist iso- bis hyperintens; viele Adenome sind in der hepatobiliären Phase hypointens.",
    "en": "FNH is usually iso- to hyperintense; many adenomas are hypointense on the hepatobiliary phase.",
    "fa": "FNH معمولاً ایزو تا هایپرسیگنال است؛ بسیاری از آدنوم‌ها در فاز هپاتوبیلیاری هیپوسیگنال‌اند."
  },
  "explanation": {
    "de": "Auch bestimmte HCA-Subtypen, insbesondere β-Catenin-aktivierte HCA, können hepatobiliär iso-/hyperintens sein. Daher native Signale und Dynamik mitbeurteilen; ein heller HBP-Befund allein sichert FNH nicht.",
    "en": "Certain HCA subtypes, especially β-catenin-activated HCA, can also be hepatobiliary iso-/hyperintense. Integrate native signals and dynamic behaviour; HBP brightness alone does not establish FNH.",
    "fa": "برخی زیرگروه‌های HCA، به‌ویژه HCA با فعال‌شدن β-کاتنین، نیز ممکن است در فاز هپاتوبیلیاری ایزو/هایپرسیگنال باشند. سیگنال‌های پایه و رفتار دینامیک را هم بسنجید؛ روشن‌بودن HBP به‌تنهایی FNH را قطعی نمی‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/35920706/",
  "sources": [
    "https://doi.org/10.14309/ajg.0000000000002857",
    "https://pubmed.ncbi.nlm.nih.gov/22733890/",
    "https://pubmed.ncbi.nlm.nih.gov/35920706/"
  ]
},
  {
  "id": "fnh-12-reporting",
  "topicId": "fnh",
  "category": {
    "de": "Behandlung und Nachsorge",
    "en": "Management and follow-up",
    "fa": "درمان و پیگیری"
  },
  "front": {
    "de": "Welche Behandlung und Verlaufskontrolle braucht eine sicher typische asymptomatische FNH?",
    "en": "What treatment and imaging follow-up does confidently typical asymptomatic FNH need?",
    "fa": "FNH بی‌علامت و تیپیک با تشخیص مطمئن به چه درمان و پیگیری تصویربرداری نیاز دارد؟"
  },
  "answer": {
    "de": "Bei typischer, sicher diagnostizierter FNH sind Behandlung und routinemäßige Verlaufskontrolle nicht erforderlich; bei vaskulärer Lebererkrankung gelten Ausnahmen.",
    "en": "Typical, confidently diagnosed FNH needs no treatment or routine follow-up; underlying vascular liver disease is an exception.",
    "fa": "در FNH تیپیک با تشخیص مطمئن، درمان و پیگیری روتین لازم نیست؛ بیماری زمینه‌ای عروقی کبد استثناست."
  },
  "explanation": {
    "de": "Die EASL-Leitlinie empfiehlt bei typischer FNH keine Therapie und keine routinemäßige Verlaufskontrolle, außer bei zugrunde liegender vaskulärer Lebererkrankung. Bei atypischer Bildgebung oder Symptomen soll ein benign-liver-tumour-MDT die Befunde einordnen; ein pauschales Kontrollintervall lässt sich daraus nicht ableiten.",
    "en": "EASL recommends no treatment or routine follow-up for typical FNH, except with underlying vascular liver disease. Atypical imaging or symptoms should be reviewed by a benign liver tumour MDT; this does not establish a blanket follow-up interval.",
    "fa": "راهنمای EASL برای FNH تیپیک، درمان یا پیگیری روتین را توصیه نمی‌کند، مگر در بیماری زمینه‌ای عروقی کبد. در تصویربرداری آتیپیک یا وجود علائم، ارزیابی در تیم تخصصی تومورهای خوش‌خیم کبد مطرح است؛ این توصیه یک فاصلهٔ پیگیری همگانی تعیین نمی‌کند."
  },
  "source": "https://doi.org/10.1016/j.jhep.2016.04.001",
  "sources": [
    "https://doi.org/10.1016/j.jhep.2016.04.001",
    "https://doi.org/10.14309/ajg.0000000000002857"
  ]
},
  {
  "id": "leberadenom-01-definition",
  "topicId": "leberadenom",
  "category": {
    "de": "Grundlagen",
    "en": "Basics",
    "fa": "مبانی"
  },
  "front": {
    "de": "Was ist ein hepatozelluläres Adenom?",
    "en": "What is a hepatocellular adenoma?",
    "fa": "آدنوم هپاتوسلولار چیست؟"
  },
  "answer": {
    "de": "Ein seltener gutartiger epithelialer Lebertumor.",
    "en": "An uncommon benign epithelial liver tumour.",
    "fa": "تومور اپی‌تلیالی خوش‌خیم و نادر کبد."
  },
  "explanation": {
    "de": "Trotz benignen Grundcharakters sind Blutung und bei bestimmten Subtypen maligne Transformation relevante Komplikationen.",
    "en": "Despite its benign baseline classification, haemorrhage and malignant transformation in some subtypes are relevant complications.",
    "fa": "با وجود ماهیت پایه خوش‌خیم، خون‌ریزی و در برخی زیرگروه‌ها تبدیل بدخیم از عوارض مهم‌اند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857"
},
  {
  "id": "leberadenom-02-risk",
  "topicId": "leberadenom",
  "category": {
    "de": "Klinischer Kontext",
    "en": "Clinical context",
    "fa": "زمینه بالینی"
  },
  "front": {
    "de": "Welche Risikofaktoren sollten bei HCA aktiv erfragt werden?",
    "en": "Which risk factors should be actively elicited in HCA?",
    "fa": "در HCA درباره کدام عوامل خطر باید فعالانه پرس‌وجو کرد؟"
  },
  "answer": {
    "de": "Exogene Hormone und anabole Steroide sowie metabolische Faktoren und Glykogenspeicherkrankheiten.",
    "en": "Exogenous hormones and anabolic steroids, as well as metabolic factors and glycogen-storage disease.",
    "fa": "هورمون‌های خارجی و استروئیدهای آنابولیک، و نیز عوامل متابولیک و بیماری ذخیره گلیکوژن."
  },
  "explanation": {
    "de": "Die Anamnese unterstützt die klinische Einordnung, ersetzt aber keine Bildmusteranalyse.",
    "en": "History supports clinical assessment but does not replace imaging-pattern analysis.",
    "fa": "شرح حال به ارزیابی بالینی کمک می‌کند، اما جای تحلیل الگوی تصویربرداری را نمی‌گیرد."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857"
},
  {
  "id": "leberadenom-03-mri-fat",
  "topicId": "leberadenom",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Wofür spricht ein Signalabfall in T1 Out-of-phase?",
    "en": "What does signal loss on T1 out-of-phase support?",
    "fa": "افت سیگنال در T1 out-of-phase از چه چیزی حمایت می‌کند؟"
  },
  "answer": {
    "de": "Für einen möglichen intrazellulären Fettanteil.",
    "en": "A possible intracellular fat component.",
    "fa": "احتمال وجود جزء چربی داخل‌سلولی."
  },
  "explanation": {
    "de": "Das Merkmal allein beweist weder ein HCA noch einen bestimmten Subtyp.",
    "en": "This feature alone proves neither HCA nor a specific subtype.",
    "fa": "این یافته به‌تنهایی نه HCA و نه زیرگروه مشخصی را ثابت می‌کند."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857"
},
  {
  "id": "leberadenom-04-hepatobiliary",
  "topicId": "leberadenom",
  "category": {
    "de": "Differenzialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Wie verhalten sich HCA und FNH meist in der hepatobiliären Phase?",
    "en": "How do HCA and FNH usually behave on the hepatobiliary phase?",
    "fa": "HCA و FNH معمولاً در فاز هپاتوبیلیاری چه رفتاری دارند؟"
  },
  "answer": {
    "de": "HCA meist hypointens, FNH meist iso- bis hyperintens.",
    "en": "HCA is usually hypointense; FNH is usually iso- to hyperintense.",
    "fa": "HCA معمولاً کم‌سیگنال و FNH معمولاً ایزو تا پرسیگنال است."
  },
  "explanation": {
    "de": "Subtyp-Ausnahmen und atypische Muster sind möglich; das Gesamtbild bleibt entscheidend.",
    "en": "Subtype exceptions and atypical patterns occur; the overall pattern remains essential.",
    "fa": "استثناهای زیرگروهی و الگوهای آتیپیک ممکن‌اند؛ الگوی کلی همچنان تعیین‌کننده است."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857"
},
  {
  "id": "leberadenom-05-dynamic",
  "topicId": "leberadenom",
  "category": {
    "de": "CT und dynamische MRT",
    "en": "CT and dynamic MRI",
    "fa": "CT و MRI دینامیک"
  },
  "front": {
    "de": "Welches dynamische Kontrastmuster ist bei HCA häufig?",
    "en": "Which dynamic enhancement pattern is common in HCA?",
    "fa": "کدام الگوی تقویت دینامیک در HCA شایع است؟"
  },
  "answer": {
    "de": "Arterielle Hyperanreicherung mit späterer Angleichung an das Leberparenchym.",
    "en": "Arterial hyperenhancement with later equalisation to the liver parenchyma.",
    "fa": "تقویت شریانی واضح با هم‌سطح‌شدن بعدی با پارانشیم کبد."
  },
  "explanation": {
    "de": "Das Muster ist nicht spezifisch und darf nicht als Einzelbeweis verwendet werden.",
    "en": "The pattern is not specific and should not be used as stand-alone proof.",
    "fa": "این الگو اختصاصی نیست و نباید به‌تنهایی مبنای اثبات قرار گیرد."
  },
  "source": "https://doi.org/10.14309/ajg.0000000000002857"
},
  {
    "id": "avm-01-definition",
    "topicId": "avm",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist eine arteriovenöse Malformation (AVM) der Leber?",
      "en": "What is a hepatic arteriovenous malformation (AVM)?",
      "fa": "مالفورماسیون شریانی-وریدی (AVM) کبد چیست؟"
    },
    "answer": {
      "de": "Eine abnorme direkte Verbindung zwischen Arterie und venösem Gefäß ohne zwischengeschaltetes Kapillarbett.",
      "en": "An abnormal direct connection between an artery and a venous vessel without an intervening capillary bed.",
      "fa": "ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط."
    },
    "explanation": {
      "de": "Dadurch entsteht ein Hochfluss-Shunt mit niedrigem Widerstand, der direkt arterielles Blut in das venöse System ableitet.",
      "en": "This creates a high-flow, low-resistance shunt that diverts arterial blood directly into the venous system.",
      "fa": "این ارتباط یک شانت با جریان بالا و مقاومت پایین ایجاد می‌کند که خون را مستقیماً از شریان به سیستم وریدی می‌رساند."
    },
    "diagram": {
      "de": "Arterie → (kein Kapillarbett) → Vene = AVM",
      "en": "Artery → (no capillary bed) → Vein = AVM",
      "fa": "جریان مستقیم از شریان به ورید، بدون بستر مویرگی = AVM"
    }
  },
  {
    "id": "avm-02-shunttypen",
    "topicId": "avm",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Welche drei intrahepatischen Shunt-Verbindungen werden in der Lektion unterschieden?",
      "en": "Which three intrahepatic shunt pathways are distinguished in this lesson?",
      "fa": "در این درس سه مسیر شانت داخل‌کبدی کدام‌اند؟"
    },
    "answer": {
      "de": "Arterioportal und arteriovenös sind arterielle Shunts. Portosystemisch verbindet die Pfortader mit einer Lebervene und ist keine AV-Fistel.",
      "en": "Arterioportal and arteriovenous are arterial shunts. A portosystemic shunt connects the portal vein to a hepatic vein and is not an AV fistula.",
      "fa": "شانت آرتریوپورتال و شریانی‌وریدی منشأ شریانی دارند. شانت پورتوسیستمیک ورید پورت را به ورید کبدی وصل می‌کند و فیستول شریانی‌وریدی نیست."
    },
    "explanation": {
      "de": "Arterioportale Shunts verbinden die A. hepatica mit einem Pfortaderast, arteriovenöse Shunts die A. hepatica mit einer Lebervene und portosystemische Shunts die Pfortader mit einer Lebervene. Die konkrete Verbindung ist anhand der Gefäßdarstellung zu bestimmen.",
      "en": "Arterioportal shunts connect the hepatic artery to a portal vein branch, arteriovenous shunts connect the hepatic artery to a hepatic vein, and portosystemic shunts connect the portal vein to a hepatic vein. Identify the specific connection from the depicted vessels.",
      "fa": "شانت‌های آرتریوپورتال شریان کبدی را به شاخه ورید پورت، شانت‌های آرتریوونوس شریان کبدی را به ورید کبدی و شانت‌های پورتوسیستمیک ورید پورت را به ورید کبدی متصل می‌کنند. ارتباط مشخص باید از روی عروق نشان‌داده‌شده تعیین شود."
    },
    "diagram": {
      "de": "Arterioportal | arteriovenös | portosystemisch",
      "en": "Arterioportal | arteriovenous | portosystemic",
      "fa": "آرتریوپورتال | آرتریوونوس | پورتوسیستمیک"
    }
  },
  {
    "id": "avm-03-aetiologie",
    "topicId": "avm",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Welche Ursachen kommen für eine hepatische AVM in Frage?",
      "en": "What causes can lead to a hepatic AVM?",
      "fa": "علل ایجاد AVM کبدی کدامند؟"
    },
    "answer": {
      "de": "Kongenital (v. a. HHT/Morbus Osler-Weber-Rendu) oder erworben (iatrogen, traumatisch, tumor- oder zirrhoseassoziiert).",
      "en": "Congenital (especially HHT/Osler-Weber-Rendu disease) or acquired (iatrogenic, traumatic, or tumour- or cirrhosis-associated).",
      "fa": "کنژنیتال (به‌ویژه HHT/بیماری Osler-Weber-Rendu) یا اکتسابی (ایاتروژنیک، تروماتیک یا مرتبط با تومور/سیروز)."
    },
    "explanation": {
      "de": "Erworbene AVMs entstehen häufig nach Leberbiopsie, TIPS-Anlage, Trauma oder Operation. Die wichtigste kongenitale Ursache multipler Shunts ist die HHT.",
      "en": "Acquired AVMs often arise after liver biopsy, TIPS placement, trauma, or surgery. HHT is the most important congenital cause of multiple shunts.",
      "fa": "AVM‌های اکتسابی اغلب پس از بیوپسی کبد، TIPS، تروما یا جراحی ایجاد می‌شوند. HHT مهم‌ترین علت کنژنیتال شانت‌های متعدد است."
    },
    "diagram": {
      "de": "kongenital (HHT) | erworben (Biopsie, TIPS, Trauma)",
      "en": "congenital (HHT) | acquired (biopsy, TIPS, trauma)",
      "fa": "کنژنیتال (HHT) | اکتسابی (بیوپسی، TIPS، تروما)"
    }
  },
  {
    "id": "avm-04-doppler-ri",
    "topicId": "avm",
    "category": {
      "de": "Sonographie",
      "en": "Ultrasound",
      "fa": "سونوگرافی"
    },
    "front": {
      "de": "Wie verändert sich der Widerstandsindex (RI) der zuführenden Arterie bei einem AV-Shunt?",
      "en": "How does the resistive index (RI) of the feeding artery change in an AV shunt?",
      "fa": "اندکس مقاومتی (RI) شریان تغذیه‌کننده در یک شانت شریانی-وریدی چگونه تغییر می‌کند؟"
    },
    "answer": {
      "de": "Der RI ist deutlich erniedrigt, mit hoher diastolischer Flussgeschwindigkeit.",
      "en": "The RI is markedly decreased, with high diastolic flow velocity.",
      "fa": "RI به‌طور قابل توجهی کاهش می‌یابد، همراه با سرعت دیاستولیک بالا."
    },
    "explanation": {
      "de": "Durch den niedrigen Widerstand des Shunts fließt auch in der Diastole viel Blut, was den RI deutlich senkt.",
      "en": "The low resistance of the shunt allows substantial flow even during diastole, markedly lowering the RI.",
      "fa": "مقاومت پایین شانت باعث می‌شود حتی در دیاستول جریان قابل توجهی برقرار باشد که RI را به‌شدت کاهش می‌دهد."
    },
    "diagram": {
      "de": "niedriger Widerstand im Shunt → ↓RI, ↑diastolischer Fluss",
      "en": "low shunt resistance → ↓RI, ↑diastolic flow",
      "fa": "مقاومت پایین شانت ← ↓RI، ↑جریان دیاستولیک"
    }
  },
  {
    "id": "avm-05-doppler-venenfluss",
    "topicId": "avm",
    "category": {
      "de": "Sonographie",
      "en": "Ultrasound",
      "fa": "سونوگرافی"
    },
    "front": {
      "de": "Wie unterscheiden sich die normalen Doppler-Wellenformen von Pfortader und Lebervene?",
      "en": "How do normal Doppler waveforms differ between the portal and hepatic veins?",
      "fa": "شکل موج طبیعی داپلر در ورید پورت و ورید کبدی چه تفاوتی دارد؟"
    },
    "answer": {
      "de": "Pfortader: hepatopetal und relativ kontinuierlich. Lebervene: kardial phasisch, normalerweise triphasisch.",
      "en": "Portal vein: hepatopetal and relatively continuous. Hepatic vein: cardiac-phasic, normally triphasic.",
      "fa": "ورید پورت: جریان به‌سوی کبد و نسبتاً پیوسته. ورید کبدی: وابسته به چرخهٔ قلب و معمولاً سه‌فازی."
    },
    "explanation": {
      "de": "Die Wellenformen nicht gleichsetzen: Portalvenenfluss ist meist hepatopetal und relativ kontinuierlich; Lebervenenfluss bildet den Herzzyklus ab. Arterialisierung kann je nach Gefäß auf einen bestimmten Shunttyp hinweisen, ist aber im Kontext zu beurteilen.",
      "en": "Do not treat the waveforms as interchangeable: portal flow is usually hepatopetal and relatively continuous, whereas hepatic venous flow reflects the cardiac cycle. Arterialisation may point to a particular shunt type depending on the vessel, but must be interpreted in context.",
      "fa": "این شکل‌موج‌ها را یکسان ندانید: جریان ورید پورت معمولاً به‌سوی کبد و نسبتاً پیوسته است، درحالی‌که جریان ورید کبدی چرخهٔ قلب را بازتاب می‌دهد. آرتریالیزه‌شدن، بسته به نوع رگ، می‌تواند به یک نوع شانت اشاره کند اما باید در زمینهٔ بالینی تفسیر شود."
    },
    "diagram": {
      "de": "Pfortader: relativ kontinuierlich | Lebervene: kardial phasisch / triphasisch",
      "en": "Portal vein: relatively continuous | hepatic vein: cardiac-phasic / triphasic",
      "fa": "ورید پورت: نسبتاً پیوسته | ورید کبدی: وابسته به قلب / سه‌فازی"
    },
    "source": "Polish Ultrasound Society Standards: portal system and hepatic vessels (2015), https://pmc.ncbi.nlm.nih.gov/articles/PMC4579749/; EASL Clinical Practice Guidelines: Vascular diseases of the liver (2025), doi:10.1016/j.jhep.2025.08.001."
  },
  {
    "id": "avm-06-early-venous-filling",
    "topicId": "avm",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Was ist das Early venous filling sign?",
      "en": "What is the early venous filling sign?",
      "fa": "علامت پرشدگی زودرس وریدی چیست؟"
    },
    "answer": {
      "de": "Die vorzeitige Kontrastierung der drainierenden Vene bereits in der frühen arteriellen Phase.",
      "en": "Premature opacification of the draining vein already during the early arterial phase.",
      "fa": "اپاسیفیکاسیون زودرس ورید تخلیه‌کننده در فاز شریانی زودرس."
    },
    "explanation": {
      "de": "Es ist das wichtigste CT-/MRT-Leitzeichen einer hepatischen AVM, da das Shunt-Blut die Vene noch in der arteriellen Phase erreicht.",
      "en": "It is the most important CT/MRI sign of a hepatic AVM, because shunted blood reaches the vein already during the arterial phase.",
      "fa": "این مهم‌ترین نشانه CT/MRI برای AVM کبدی است، چون خون شانت‌شده در فاز شریانی به ورید می‌رسد."
    },
    "diagram": {
      "de": "arterielle Phase: Vene bereits kontrastiert → AVM",
      "en": "arterial phase: vein already opacified → AVM",
      "fa": "فاز شریانی: ورید از قبل اپاسیفه شده ← AVM"
    }
  },
  {
    "id": "avm-07-thad-thid",
    "topicId": "avm",
    "category": {
      "de": "CT",
      "en": "CT",
      "fa": "CT"
    },
    "front": {
      "de": "Was bedeutet THAD/THID im Kontext einer AVM?",
      "en": "What does THAD/THID mean in the context of an AVM?",
      "fa": "THAD/THID در زمینه AVM به چه معناست؟"
    },
    "answer": {
      "de": "Transient hepatic attenuation/intensity difference – eine vorübergehende, meist keilförmige Hyperperfusion um den Shunt.",
      "en": "Transient hepatic attenuation/intensity difference – a transient, usually wedge-shaped hyperperfusion around the shunt.",
      "fa": "اختلاف گذرای تراکم/سیگنال کبدی - هیپرپرفیوژن گذرا و معمولاً گوه‌ای‌شکل اطراف شانت."
    },
    "explanation": {
      "de": "Diese fokale, früharterielle Hyperperfusion kann eine hypervaskuläre Läsion wie FNH oder HCC imitieren und sollte nicht mit einem Tumor verwechselt werden.",
      "en": "This focal, early arterial hyperperfusion can mimic a hypervascular lesion such as FNH or HCC and should not be mistaken for a tumour.",
      "fa": "این هیپرپرفیوژن فوکال و زودرس شریانی می‌تواند یک ضایعه هیپرواسکولار مانند FNH یا HCC را تقلید کند و نباید با تومور اشتباه گرفته شود."
    },
    "diagram": {
      "de": "AVM → periläsionale keilförmige Hyperperfusion (THAD/THID)",
      "en": "AVM → perilesional wedge-shaped hyperperfusion (THAD/THID)",
      "fa": "AVM ← هیپرپرفیوژن گوه‌ای‌شکل اطراف ضایعه (THAD/THID)"
    }
  },
  {
    "id": "avm-08-flow-voids",
    "topicId": "avm",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Wie erscheinen die Gefäße einer AVM typischerweise in T1- und T2-gewichteten MRT-Sequenzen?",
      "en": "How do the vessels of an AVM typically appear on T1- and T2-weighted MRI sequences?",
      "fa": "عروق یک AVM معمولاً در سکانس‌های T1 و T2 وزن‌دار MRI چگونه دیده می‌شوند؟"
    },
    "answer": {
      "de": "Als serpiginöse, signalfreie Strukturen (Flow voids).",
      "en": "As serpiginous, signal-void structures (flow voids).",
      "fa": "به‌صورت ساختارهای سرپیژینوس بدون سیگنال (فقدان سیگنال جریان (flow void))."
    },
    "explanation": {
      "de": "Schnell fließendes Blut erzeugt in beiden Sequenzen eine Signalauslöschung – ein direkter Hinweis auf dilatierte, hochflussige Gefäße.",
      "en": "Rapidly flowing blood causes signal loss on both sequences – a direct sign of dilated, high-flow vessels.",
      "fa": "جریان سریع خون در هر دو سکانس باعث از بین رفتن سیگنال می‌شود - نشانه مستقیم عروق متسع با جریان بالا."
    },
    "diagram": {
      "de": "schneller Fluss → Signalauslöschung → Flow void",
      "en": "rapid flow → signal loss → flow void",
      "fa": "جریان سریع ← از بین رفتن سیگنال ← فقدان سیگنال جریان (flow void)"
    }
  },
  {
    "id": "avm-09-mrt-muster",
    "topicId": "avm",
    "category": {
      "de": "MRT",
      "en": "MRI",
      "fa": "MRI"
    },
    "front": {
      "de": "Welche Befundkombination ist im MRT typisch für eine hepatische AVM?",
      "en": "What combination of findings on MRI is typical of a hepatic AVM?",
      "fa": "کدام ترکیب یافته‌ها در MRI برای AVM کبدی تیپیک است؟"
    },
    "answer": {
      "de": "Flow voids + Early venous filling sign + ggf. THAD/THID.",
      "en": "Flow voids + early venous filling sign + possible THAD/THID.",
      "fa": "فقدان سیگنال جریان (flow void) + علامت پرشدگی زودرس وریدی + احتمال THAD/THID."
    },
    "explanation": {
      "de": "Diese Kombination ergibt zusammen das typische MRT-Muster und erlaubt die Abgrenzung von hypervaskulären Tumoren.",
      "en": "Together, this combination represents the typical MRI pattern and allows differentiation from hypervascular tumours.",
      "fa": "این ترکیب الگوی تیپیک MRI را تشکیل می‌دهد و امکان افتراق از تومورهای هیپرواسکولار را فراهم می‌کند."
    },
    "diagram": {
      "de": "Flow voids + Early venous filling (+ THAD/THID) = AVM-Muster",
      "en": "flow voids + early venous filling (+ THAD/THID) = AVM pattern",
      "fa": "فقدان سیگنال جریان (flow void) + پرشدگی زودرس وریدی (+ THAD/THID) = الگوی AVM"
    }
  },
  {
    "id": "avm-10-hht",
    "topicId": "avm",
    "category": {
      "de": "HHT",
      "en": "HHT",
      "fa": "HHT"
    },
    "front": {
      "de": "Welche Erkrankung ist die wichtigste kongenitale Ursache multipler hepatischer AV-Shunts?",
      "en": "Which condition is the most important congenital cause of multiple hepatic AV shunts?",
      "fa": "کدام بیماری مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد کبدی است؟"
    },
    "answer": {
      "de": "Die hereditäre hämorrhagische Teleangiektasie (HHT, Morbus Osler-Weber-Rendu).",
      "en": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease).",
      "fa": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu)."
    },
    "explanation": {
      "de": "Bei HHT finden sich typischerweise multiple, diffus verteilte Shunts sowie eine deutlich dilatierte und geschlängelte A. hepatica.",
      "en": "HHT typically shows multiple, diffusely distributed shunts together with a markedly dilated and tortuous hepatic artery.",
      "fa": "در HHT معمولاً شانت‌های متعدد و منتشر همراه با شریان کبدی به‌شدت متسع و پیچ‌خورده دیده می‌شود."
    },
    "diagram": {
      "de": "HHT → multiple diffuse Shunts + dilatierte A. hepatica",
      "en": "HHT → multiple diffuse shunts + dilated hepatic artery",
      "fa": "HHT ← شانت‌های متعدد منتشر + شریان کبدی متسع"
    }
  },
  {
    "id": "avm-11-hht-klinik",
    "topicId": "avm",
    "category": {
      "de": "HHT",
      "en": "HHT",
      "fa": "HHT"
    },
    "front": {
      "de": "Welche klinischen Folgen kann eine ausgeprägte HHT-Leberbeteiligung haben?",
      "en": "What clinical consequences can extensive HHT liver involvement have?",
      "fa": "درگیری شدید کبدی HHT چه عوارض بالینی می‌تواند داشته باشد؟"
    },
    "answer": {
      "de": "High-Output-Herzinsuffizienz und portale Hypertension.",
      "en": "High-output heart failure and portal hypertension.",
      "fa": "نارسایی قلبی با برون‌ده بالا و هیپرتانسیون پورت."
    },
    "explanation": {
      "de": "Multiple AV-Shunts erhöhen das Herzzeitvolumen (→ High-Output-Herzinsuffizienz), arterioportale Shunts können zusätzlich eine portale Hypertension verursachen.",
      "en": "Multiple AV shunts increase cardiac output (→ high-output heart failure), and arterioportal shunts can additionally cause portal hypertension.",
      "fa": "شانت‌های متعدد شریانی-وریدی برون‌ده قلبی را افزایش می‌دهند (← نارسایی قلبی با برون‌ده بالا) و شانت‌های آرتریوپورتال می‌توانند هیپرتانسیون پورت ایجاد کنند."
    },
    "diagram": {
      "de": "multiple Shunts → ↑Herzzeitvolumen + portale Hypertension",
      "en": "multiple shunts → ↑cardiac output + portal hypertension",
      "fa": "شانت‌های متعدد ← ↑برون‌ده قلبی + هیپرتانسیون پورت"
    }
  },
  {
    "id": "avm-12-reporting",
    "topicId": "avm",
    "category": {
      "de": "Befundung",
      "en": "Reporting",
      "fa": "گزارش‌نویسی"
    },
    "front": {
      "de": "Was sollte im Befund stehen, wenn eine AVM mit Early venous filling sign nachgewiesen wird?",
      "en": "What should be reported when an AVM with an early venous filling sign is found?",
      "fa": "هنگام یافتن AVM با علامت پرشدگی زودرس وریدی، چه چیزی باید در گزارش ذکر شود؟"
    },
    "answer": {
      "de": "Beschreibung des Shunt-Typs, des Early venous filling signs, ggf. THAD/THID, und ein Hinweis auf eine mögliche HHT bei multiplen/diffusen Shunts.",
      "en": "Description of the shunt type, the early venous filling sign, possible THAD/THID, and a note about possible HHT if shunts are multiple/diffuse.",
      "fa": "توصیف نوع شانت، علامت پرشدگی زودرس وریدی، احتمال THAD/THID و در صورت شانت‌های متعدد/منتشر، اشاره به احتمال HHT."
    },
    "explanation": {
      "de": "Bei multiplen, diffus verteilten Shunts mit dilatierter A. hepatica sollte eine HHT erwogen und ggf. interdisziplinär (Kardiologie/Hepatologie) abgeklärt werden.",
      "en": "With multiple, diffusely distributed shunts and a dilated hepatic artery, HHT should be considered and worked up interdisciplinarily (cardiology/hepatology) if needed.",
      "fa": "در صورت وجود شانت‌های متعدد و منتشر همراه با شریان کبدی متسع، باید HHT مدنظر قرار گرفته و در صورت نیاز بررسی بین‌رشته‌ای (قلب/هپاتولوژی) انجام شود."
    },
    "diagram": {
      "de": "Shunt-Typ + Early venous filling (+ THAD/THID) + ggf. HHT-Hinweis",
      "en": "shunt type + early venous filling (+ THAD/THID) + possible HHT note",
      "fa": "نوع شانت + پرشدگی زودرس وریدی (+ THAD/THID) + احتمال HHT"
    }
  },
  {
  "id": "hcc-01-risk",
  "topicId": "hcc",
  "category": {
    "de": "Grundlagen",
    "en": "Basics",
    "fa": "مبانی"
  },
  "front": {
    "de": "In welchem Kontext ist das typische HCC-Muster besonders diagnostisch?",
    "en": "In which context is the typical HCC pattern most diagnostic?",
    "fa": "الگوی تیپیک HCC در چه زمینه‌ای بیشترین ارزش تشخیصی دارد؟"
  },
  "answer": {
    "de": "In der definierten erwachsenen Risikopopulation: Zirrhose, chronische Hepatitis B oder aktuelles/früheres HCC; bestimmte vaskuläre Zirrhosen sind ausgenommen.",
    "en": "In the defined adult risk population: cirrhosis, chronic hepatitis B or current/prior HCC; certain vascular causes of cirrhosis are excluded.",
    "fa": "در جمعیت پرخطر بزرگسال تعریف‌شده: سیروز، هپاتیت B مزمن یا HCC فعلی/قبلی؛ برخی علل عروقی سیروز مستثنا هستند."
  },
  "explanation": {
    "de": "Technisch geeignete Mehrphasenbildgebung ist zusätzlich nötig. Bei kongenitaler hepatischer Fibrose oder Zirrhose durch bestimmte vaskuläre Erkrankungen, etwa kardiale Stauung, diagnostisches LI-RADS nicht anwenden.",
    "en": "Suitable multiphasic imaging is also required. Do not apply diagnostic LI-RADS in congenital hepatic fibrosis or cirrhosis from certain vascular disorders such as cardiac congestion.",
    "fa": "تصویربرداری چندفازی مناسب نیز لازم است. در فیبروز مادرزادی کبد یا سیروز ناشی از برخی بیماری‌های عروقی، مانند احتقان قلبی، LI-RADS تشخیصی به‌کار نرود."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-02-aphe",
  "topicId": "hcc",
  "category": {
    "de": "Dynamik",
    "en": "Dynamic imaging",
    "fa": "تصویربرداری دینامیک"
  },
  "front": {
    "de": "Was bedeutet non-rim APHE?",
    "en": "What does non-rim APHE mean?",
    "fa": "افزایش سیگنال شریانی غیرحلقوی (APHE) به چه معناست؟"
  },
  "answer": {
    "de": "Nicht-randförmiges arterielles Hyperenhancement der Läsion gegenüber der Leber.",
    "en": "Non-rim arterial phase hyperenhancement relative to the liver.",
    "fa": "تقویت شریانی غیرحلقوی (APHE) ضایعه نسبت به کبد."
  },
  "explanation": {
    "de": "Nicht-randständige Mehranreicherung relativ zur Leber in der arteriellen Phase. APHE allein ist unspezifisch; Größe und weitere Merkmale im passenden Kontext bewerten.",
    "en": "Nonrim hyperenhancement relative to liver in the arterial phase. APHE alone is nonspecific; assess size and additional features in context.",
    "fa": "جذب بیشترِ غیرحاشیه‌ای نسبت به کبد در فاز شریانی. APHE به‌تنهایی غیراختصاصی است؛ اندازه و ویژگی‌های دیگر در زمینهٔ مناسب ارزیابی شوند."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-03-washout",
  "topicId": "hcc",
  "category": {
    "de": "Dynamik",
    "en": "Dynamic imaging",
    "fa": "تصویربرداری دینامیک"
  },
  "front": {
    "de": "Was bedeutet nicht-peripheres Wash-out, und welche Phasen sind zulässig?",
    "en": "What is nonperipheral washout, and which phases are permissible?",
    "fa": "واش‌اوت غیرمحیطی چیست و کدام فازها مجازند؟"
  },
  "answer": {
    "de": "Zeitliche Abnahme der relativen Anreicherung bis zur Hypoanreicherung gegenüber der Leber: bei extrazellulärem Kontrastmittel portalvenös oder spät, bei Gadoxetat nur portalvenös.",
    "en": "Temporal reduction of relative enhancement resulting in hypoenhancement to liver: portal venous or delayed with extracellular agents, but only portal venous with gadoxetate.",
    "fa": "کاهش زمانی جذب نسبی تا جذب کمتر نسبت به کبد: با مادهٔ حاجب خارج‌سلولی در فاز پورتال یا تأخیری، ولی با گادوکسیتات فقط در فاز پورتال."
  },
  "explanation": {
    "de": "Es braucht keinen absoluten Kontrastmittelverlust. Transitional- oder hepatobiliäre Hypointensität bei Gadoxetat ist ein Ancillary Feature und ersetzt dieses Wash-out nicht.",
    "en": "Absolute contrast loss is not required. Transitional or hepatobiliary hypointensity with gadoxetate is an ancillary feature and does not replace this washout.",
    "fa": "خروج مطلق مادهٔ حاجب لازم نیست. کم‌سیگنالی انتقالی یا هپاتوبیلیاری در گادوکسیتات ویژگی کمکی است و جای این واش‌اوت را نمی‌گیرد."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-04-capsule",
  "topicId": "hcc",
  "category": {
    "de": "Dynamik",
    "en": "Dynamic imaging",
    "fa": "تصویربرداری دینامیک"
  },
  "front": {
    "de": "Was ist die Kapselappearance eines HCC?",
    "en": "What is HCC capsule appearance?",
    "fa": "نمای کپسول در HCC چیست؟"
  },
  "answer": {
    "de": "Glatter, gleichmäßiger anreichernder Randsaum in portalvenöser, später oder Transitionalphase, auffälliger als Fibrose um Hintergrundknoten.",
    "en": "A smooth uniform enhancing border in the portal venous, delayed or transitional phase, more conspicuous than fibrosis around background nodules.",
    "fa": "حاشیهٔ صاف و یکنواخت دارای جذب در فاز پورتال، تأخیری یا انتقالی که از فیبروز اطراف ندول‌های زمینه‌ای برجسته‌تر است."
  },
  "explanation": {
    "de": "Bildgebende Appearance, kein alleiniger histologischer Beweis. Ein nicht anreichernder Saum gehört nicht zum gleichnamigen Major Feature.",
    "en": "An imaging appearance, not standalone histological proof. A nonenhancing border does not meet this major feature.",
    "fa": "نمای تصویربرداری است، نه اثبات بافت‌شناختی مستقل. حاشیهٔ بدون جذب این ویژگی اصلی را برآورده نمی‌کند."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-05-hbp",
  "topicId": "hcc",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Wie erscheint ein HCC meist in der hepatobiliären Phase?",
    "en": "How does HCC usually appear in the hepatobiliary phase?",
    "fa": "HCC معمولاً در فاز هپاتوبیلیاری چگونه دیده می‌شود؟"
  },
  "answer": {
    "de": "Hypointens zum Leberparenchym.",
    "en": "Hypointense relative to liver parenchyma.",
    "fa": "هیپواینتنس نسبت به پارانشیم کبد."
  },
  "explanation": {
    "de": "Viele HCC zeigen verminderte hepatobiliäre Aufnahme, unter anderem bei verminderter Expression hepatozellulärer Aufnahmetransporter. Eine erhaltene oder erhöhte Transporterexpression kann iso-/hyperintense HCC erklären. Das Signal ist daher kein alleiniger HCC- oder Gutartigkeitsnachweis.",
    "en": "Many HCCs show reduced hepatobiliary uptake, associated in part with reduced hepatocellular uptake-transporter expression. Preserved or increased expression can explain iso-/hyperintense HCC. Signal alone therefore establishes neither HCC nor benignity.",
    "fa": "بسیاری از HCCها جذب هپاتوبیلیاری کمتری دارند که از جمله با کاهش بیان ناقل‌های جذب هپاتوسلولار مرتبط است. حفظ یا افزایش بیان ناقل می‌تواند HCC هم‌سیگنال/پُرسیگنال را توضیح دهد. بنابراین سیگنال به‌تنهایی نه HCC را ثابت می‌کند و نه خوش‌خیمی را."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/20663969/"
},
  {
  "id": "hcc-06-dwi",
  "topicId": "hcc",
  "category": {
    "de": "MRT",
    "en": "MRI",
    "fa": "MRI"
  },
  "front": {
    "de": "Welcher DWI/ADC-Befund unterstützt die HCC-Diagnose?",
    "en": "Which DWI/ADC finding supports HCC?",
    "fa": "کدام یافته DWI/ADC تشخیص HCC را تقویت می‌کند؟"
  },
  "answer": {
    "de": "Hohes DWI-Signal mit korrespondierend niedrigem ADC.",
    "en": "High DWI signal with corresponding low ADC.",
    "fa": "سیگنال بالای DWI همراه ADC پایین متناظر."
  },
  "explanation": {
    "de": "DWI-Aufhellung mit passender ADC-Erniedrigung unterstützt echte Restriktion. Dieses Ancillary Feature ist nicht HCC-spezifisch und darf eine Beobachtung nicht allein zu LR-5 hochstufen.",
    "en": "DWI brightness with corresponding low ADC supports true restriction. This ancillary feature is not HCC-specific and cannot independently upgrade an observation to LR-5.",
    "fa": "روشنایی DWI با کاهش متناظر ADC از محدودیت واقعی حمایت می‌کند. این ویژگی کمکی اختصاصی HCC نیست و به‌تنهایی نمی‌تواند ضایعه را به LR-5 ارتقا دهد."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-07-tumour-vein",
  "topicId": "hcc",
  "category": {
    "de": "Staging",
    "en": "Staging",
    "fa": "مرحله‌بندی"
  },
  "front": {
    "de": "Welcher Befund spricht für Tumor in vein?",
    "en": "Which finding suggests tumour in vein?",
    "fa": "کدام یافته به نفع تومور داخل ورید است؟"
  },
  "answer": {
    "de": "Eindeutig anreicherndes Weichteilgewebe innerhalb einer Vene.",
    "en": "Unequivocally enhancing soft tissue within a vein.",
    "fa": "بافت نرم داخل ورید با جذب قطعی مادهٔ حاجب."
  },
  "explanation": {
    "de": "Betroffene Venen und Ausdehnung berichten. Expansion, Restriktion oder Tumornachbarschaft sind Zusatzhinweise; LR-TIV ist nicht HCC-spezifisch und muss vom blanden Thrombus unterschieden werden.",
    "en": "Report involved veins and extent. Expansion, restriction and tumour adjacency are additional clues; LR-TIV is not HCC-specific and must be distinguished from bland thrombus.",
    "fa": "وریدهای درگیر و وسعت گزارش شوند. اتساع، محدودیت انتشار و مجاورت تومور سرنخ‌های تکمیلی‌اند؛ LR-TIV اختصاصی HCC نیست و باید از ترومبوز ساده افتراق داده شود."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-08-infiltrative",
  "topicId": "hcc",
  "category": {
    "de": "Atypische Form",
    "en": "Atypical form",
    "fa": "فرم آتیپیک"
  },
  "front": {
    "de": "Wie wächst ein infiltratives HCC?",
    "en": "How does infiltrative HCC grow?",
    "fa": "HCC انفیلتراتیو چگونه رشد می‌کند؟"
  },
  "answer": {
    "de": "Unscharf und permeativ über mehrere Segmente oder einen ganzen Leberlappen.",
    "en": "Ill-defined and permeative across multiple segments or an entire lobe.",
    "fa": "نامشخص و نفوذی در چند سگمان یا یک لوب کامل."
  },
  "explanation": {
    "de": "Das klassische APHE/Wash-out-Muster kann nur fokal vorhanden sein. Satellitenherde und Gefäßinvasion sind wichtige Hinweise.",
    "en": "The classic APHE/wash-out pattern may be only focal. Satellite lesions and vascular invasion are important clues.",
    "fa": "الگوی کلاسیک APHE/واش‌اوت ممکن است فقط فوکال باشد؛ ضایعات ماهواره‌ای و تهاجم عروقی سرنخ‌های مهم هستند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3538368/"
},
  {
  "id": "hcc-09-dd-fnh",
  "topicId": "hcc",
  "category": {
    "de": "Differenzialdiagnose",
    "en": "Differential diagnosis",
    "fa": "تشخیص افتراقی"
  },
  "front": {
    "de": "Welche Dynamik bei extrazellulärem Kontrastmittel gewichtet HCC stärker als typische FNH?",
    "en": "Which dynamic pattern with an extracellular agent favours HCC over typical FNH?",
    "fa": "کدام دینامیک با مادهٔ حاجب خارج‌سلولی، HCC را نسبت به FNH تیپیک بیشتر مطرح می‌کند؟"
  },
  "answer": {
    "de": "Nicht-peripheres portalvenöses oder spätes Wash-out; eine anreichernde Kapsel kann zusätzlich unterstützen.",
    "en": "Nonperipheral portal venous or delayed washout; an enhancing capsule may additionally support it.",
    "fa": "واش‌اوت غیرمحیطی پورتال یا تأخیری؛ کپسول دارای جذب می‌تواند بیشتر حمایت کند."
  },
  "explanation": {
    "de": "Typische FNH zeigt starke arterielle Anreicherung mit späterer Angleichung und gegebenenfalls zentraler Narbe. Kein Einzelmerkmal ersetzt Zielgruppe, Größe und vollständige Kategorienbewertung.",
    "en": "Typical FNH shows strong arterial enhancement with later equilibration and sometimes a central scar. No single feature replaces eligibility, size and full category assessment.",
    "fa": "FNH تیپیک جذب شریانی شدید با همسان‌شدن بعدی و گاهی اسکار مرکزی دارد. هیچ ویژگی منفردی جای گروه هدف، اندازه و ارزیابی کامل رده را نمی‌گیرد."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
  {
  "id": "hcc-10-reporting",
  "topicId": "hcc",
  "category": {
    "de": "Befundung",
    "en": "Reporting",
    "fa": "گزارش‌نویسی"
  },
  "front": {
    "de": "Welche Angaben gehören zwingend in einen HCC-Befund?",
    "en": "Which details are essential in an HCC report?",
    "fa": "چه اطلاعاتی باید حتماً در گزارش HCC ذکر شوند؟"
  },
  "answer": {
    "de": "Zahl, Größe, Segment, Enhancement, Satelliten, Gefäßinvasion und extrahepatische Ausbreitung.",
    "en": "Number, size, segment, enhancement, satellites, vascular invasion and extrahepatic spread.",
    "fa": "تعداد، اندازه، سگمان، تقویت پس از تزریق، ضایعات ماهواره‌ای، تهاجم عروقی و گسترش خارج کبدی."
  },
  "explanation": {
    "de": "Die Bildgebung erfasst den anatomischen Anteil. BCLC-Staging und Therapieplanung integrieren zusätzlich Leberfunktion, Dekompensation und ECOG-Performance-Status im multidisziplinären Kontext.",
    "en": "Imaging captures the anatomical contribution. BCLC staging and treatment planning additionally integrate liver function, decompensation and ECOG performance status in a multidisciplinary context.",
    "fa": "تصویربرداری سهم آناتومیک را ثبت می‌کند. مرحله‌بندی BCLC و برنامه‌ریزی درمان علاوه بر آن عملکرد کبد، دکمپنسیشن و وضعیت عملکردی ECOG را در زمینهٔ چندتخصصی لحاظ می‌کنند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
},
  {
    "id": "sarkoidose-01-definition",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Was ist die Sarkoidose histologisch?",
      "en": "What is sarcoidosis histologically?",
      "fa": "سارکوئیدوز از نظر هیستولوژی چیست؟"
    },
    "answer": {
      "de": "Nicht-verkäsende Granulome.",
      "en": "Non-caseating granulomas.",
      "fa": "گرانولوم‌های غیرپنیری."
    },
    "explanation": {
      "de": "Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ursache. Das Wort „nicht-verkäsende“ hilft besonders bei der Abgrenzung zur Tuberkulose.",
      "en": "Sarcoidosis is a systemic granulomatous disease of unknown cause. “Non-caseating” is especially useful for distinguishing it from tuberculosis.",
      "fa": "سارکوئیدوز یک بیماری سیستمیک گرانولوماتوز با علت ناشناخته است. عبارت غیرپنیری به افتراق از سل کمک می‌کند."
    },
    "diagram": {
      "de": "Sarkoidose → nicht-verkäsend\nTuberkulose → oft verkäsend",
      "en": "Sarcoidosis → non-caseating\nTuberculosis → often caseating",
      "fa": "سارکوئیدوز → غیرپنیری\nسل → اغلب پنیری"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-02-thorax",
    "category": {
      "de": "Grundlagen",
      "en": "Basics",
      "fa": "مبانی"
    },
    "front": {
      "de": "Welcher Organbereich ist bei Sarkoidose am häufigsten betroffen?",
      "en": "Which organ region is most often involved in sarcoidosis?",
      "fa": "در سارکوئیدوز کدام ناحیه بیشتر درگیر می‌شود؟"
    },
    "answer": {
      "de": "Thorax.",
      "en": "Thorax.",
      "fa": "توراکس."
    },
    "explanation": {
      "de": "In über 90 % der Fälle sind Lunge oder intrathorakales Lymphsystem betroffen. Deshalb sind Röntgen-Thorax und HRCT zentrale Untersuchungen.",
      "en": "In more than 90% of cases, the lung or intrathoracic lymphatic system is involved. Chest radiography and HRCT are therefore central.",
      "fa": "در بیش از ۹۰٪ موارد ریه یا سیستم لنفاوی داخل قفسه سینه درگیر است. بنابراین رادیوگرافی قفسه سینه و HRCT اهمیت زیادی دارند."
    },
    "diagram": {
      "de": "Sarkoidose → >90 % Thorax\nThorax → Lunge + intrathorakale LAP",
      "en": "Sarcoidosis → >90% thorax\nThorax → lung + intrathoracic nodes",
      "fa": "سارکوئیدوز → >۹۰٪ توراکس\nتوراکس → ریه + لنف‌نود داخل قفسه سینه"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-03-verteilung",
    "category": {
      "de": "HRCT",
      "en": "HRCT",
      "fa": "HRCT"
    },
    "front": {
      "de": "Welches Verteilungsmuster der Noduli ist typisch für Sarkoidose?",
      "en": "Which nodule distribution is typical for sarcoidosis?",
      "fa": "کدام توزیع ندول‌ها برای سارکوئیدوز تیپیک است؟"
    },
    "answer": {
      "de": "Perilymphatisch.",
      "en": "Perilymphatic.",
      "fa": "پری‌لنفاتیک."
    },
    "explanation": {
      "de": "Die Noduli liegen entlang Pleura, Fissuren, Septen und bronchovaskulären Bündeln. Das ist ein sehr wichtiger Befundungspunkt in der HRCT.",
      "en": "Nodules are located along pleura, fissures, septa and bronchovascular bundles. This is a key HRCT reporting point.",
      "fa": "ندول‌ها در امتداد پلور، فیشورها، سپتا و دسته‌های برونکوواسکولار قرار می‌گیرند. این نکته در HRCT بسیار مهم است."
    },
    "diagram": {
      "de": "Pleura/Fissuren/Septen/BV-Bündel → perilymphatisch",
      "en": "pleura/fissures/septa/BV bundles → perilymphatic",
      "fa": "پلور/فیشور/سپتا/برونکوواسکولار → پری‌لنفاتیک"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-04-scadding-i",
    "category": {
      "de": "Röntgen/Scadding",
      "en": "X-ray/Scadding",
      "fa": "رادیوگرافی/Scadding"
    },
    "front": {
      "de": "Was bedeutet Scadding Stadium I?",
      "en": "What does Scadding stage I mean?",
      "fa": "مرحله I در Scadding به چه معناست؟"
    },
    "answer": {
      "de": "Nur bihiläre LAP.",
      "en": "Bilateral hilar lymphadenopathy only.",
      "fa": "فقط لنفادنوپاتی بی‌هیلار."
    },
    "explanation": {
      "de": "Das Lungenparenchym ist in Stadium I regelrecht. Dieses Stadium ist klassisch für frühe thorakale Sarkoidose.",
      "en": "The lung parenchyma is normal in stage I. This is classic for early thoracic sarcoidosis.",
      "fa": "در مرحله I پارانشیم ریه طبیعی است. این حالت برای سارکوئیدوز توراسیک اولیه تیپیک است."
    },
    "diagram": {
      "de": "I → BHL\nkein Parenchymbefall",
      "en": "I → BHL\nno parenchymal disease",
      "fa": "I → BHL\nبدون درگیری پارانشیم"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-05-scadding-ii-iii",
    "category": {
      "de": "Röntgen/Scadding",
      "en": "X-ray/Scadding",
      "fa": "رادیوگرافی/Scadding"
    },
    "front": {
      "de": "Scadding II vs. III: Was ist der Unterschied?",
      "en": "Scadding II vs III: what is the difference?",
      "fa": "تفاوت مرحله II و III در Scadding چیست؟"
    },
    "answer": {
      "de": "II mit LAP, III ohne LAP.",
      "en": "II with nodes, III without nodes.",
      "fa": "II با لنف‌نود، III بدون لنف‌نود."
    },
    "explanation": {
      "de": "Beide haben Parenchymveränderungen. Stadium II kombiniert Parenchymbefall mit bihilärer Lymphadenopathie, Stadium III zeigt Parenchymbefall ohne BHL.",
      "en": "Both have parenchymal disease. Stage II combines parenchymal involvement with BHL; stage III shows parenchymal disease without BHL.",
      "fa": "هر دو درگیری پارانشیم دارند. مرحله II همراه با BHL است، مرحله III درگیری پارانشیم بدون BHL است."
    },
    "diagram": {
      "de": "II → BHL + Parenchym\nIII → Parenchym ohne BHL",
      "en": "II → BHL + parenchyma\nIII → parenchyma without BHL",
      "fa": "II → BHL + پارانشیم\nIII → پارانشیم بدون BHL"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-06-scadding-iv",
    "category": {
      "de": "Röntgen/Scadding",
      "en": "X-ray/Scadding",
      "fa": "رادیوگرافی/Scadding"
    },
    "front": {
      "de": "Was definiert Scadding Stadium IV?",
      "en": "What defines Scadding stage IV?",
      "fa": "مرحله IV در Scadding با چه چیزی تعریف می‌شود؟"
    },
    "answer": {
      "de": "Lungenfibrose.",
      "en": "Pulmonary fibrosis.",
      "fa": "فیبروز ریه."
    },
    "explanation": {
      "de": "Typisch sind irreguläre Retikulationen, Volumenverlust und Traktionsbronchiektasien. Es handelt sich um chronische strukturelle Umbauveränderungen.",
      "en": "Typical findings are irregular reticulation, volume loss and traction bronchiectasis. These are chronic structural changes.",
      "fa": "یافته‌های تیپیک شامل رتیکولاسیون نامنظم، کاهش حجم و برونشکتازی کششی است. این‌ها تغییرات مزمن ساختاری هستند."
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-07-123",
    "category": {
      "de": "Lymphknoten",
      "en": "Lymph nodes",
      "fa": "لنف‌نودها"
    },
    "front": {
      "de": "Was ist das 1-2-3-Zeichen bei Sarkoidose?",
      "en": "What is the 1-2-3 sign in sarcoidosis?",
      "fa": "علامت 1-2-3 در سارکوئیدوز چیست؟"
    },
    "answer": {
      "de": "Beide Hili + rechts paratracheal.",
      "en": "Both hila + right paratracheal.",
      "fa": "دو هیلوم + پارا تراکئال راست."
    },
    "explanation": {
      "de": "Gemeint sind rechter Hilus, linker Hilus und rechter Paratrachealraum. Diese symmetrische Verteilung ist sehr typisch.",
      "en": "It refers to the right hilum, left hilum and right paratracheal region. This symmetric distribution is very typical.",
      "fa": "منظور هیلوم راست، هیلوم چپ و ناحیه پارا تراکئال راست است. این توزیع متقارن بسیار تیپیک است."
    },
    "diagram": {
      "de": "1 rechter Hilus → 2 linker Hilus → 3 rechts paratracheal",
      "en": "1 right hilum → 2 left hilum → 3 right paratracheal",
      "fa": "۱ هیلوم راست → ۲ هیلوم چپ → ۳ پارا تراکئال راست"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-08-eggshell",
    "category": {
      "de": "Lymphknoten/DD",
      "en": "Lymph nodes/DD",
      "fa": "لنف‌نود/DD"
    },
    "front": {
      "de": "Warum ist Eggshell-Verkalkung bei Sarkoidose eine DD-Falle?",
      "en": "Why are eggshell calcifications a differential pitfall in sarcoidosis?",
      "fa": "چرا کلسیفیکاسیون Eggshell در سارکوئیدوز دام افتراقی است؟"
    },
    "answer": {
      "de": "Auch bei Silikose.",
      "en": "Also in silicosis.",
      "fa": "در سیلیکوز هم دیده می‌شود."
    },
    "explanation": {
      "de": "Schalenförmige Lymphknotenverkalkungen können bei Sarkoidose vorkommen, beweisen sie aber nicht. Berufsanamnese und Oberlappenbetonung können Richtung Silikose weisen.",
      "en": "Eggshell-like nodal calcifications can occur in sarcoidosis but do not prove it. Occupational history and upper-lobe predominance may favour silicosis.",
      "fa": "کلسیفیکاسیون شبیه پوسته تخم‌مرغ می‌تواند در سارکوئیدوز دیده شود ولی آن را اثبات نمی‌کند. شرح‌حال شغلی و درگیری لوب فوقانی می‌تواند به نفع سیلیکوز باشد."
    },
    "diagram": {
      "de": "Eggshell → Sarkoidose möglich\nEggshell + Quarzstaub → Silikose denken",
      "en": "eggshell → sarcoidosis possible\neggshell + quartz dust → think silicosis",
      "fa": "Eggshell → سارکوئیدوز ممکن\nEggshell + غبار کوارتز → سیلیکوز"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-09-galaxy",
    "category": {
      "de": "HRCT-Zeichen",
      "en": "HRCT signs",
      "fa": "علائم HRCT"
    },
    "front": {
      "de": "Was ist das Sarcoid Galaxy Sign?",
      "en": "What is the sarcoid galaxy sign?",
      "fa": "Sarcoid Galaxy Sign چیست؟"
    },
    "answer": {
      "de": "Großer Knoten mit Satellitennoduli.",
      "en": "Large nodule with satellite nodules.",
      "fa": "ندول بزرگ با ندول‌های ماهواره‌ای."
    },
    "explanation": {
      "de": "Es entsteht durch ein Granulom-Aggregat mit vielen kleinen umgebenden Noduli. Wichtig: Das Zeichen ist nicht spezifisch und kann auch bei Tuberkulose auftreten.",
      "en": "It is caused by a granuloma aggregate surrounded by many small nodules. Important: the sign is not specific and can also occur in tuberculosis.",
      "fa": "به علت تجمع گرانولوم با ندول‌های کوچک اطراف ایجاد می‌شود. نکته مهم: اختصاصی نیست و در سل هم ممکن است دیده شود."
    },
    "diagram": {
      "de": "großer Knoten + Satelliten → Galaxy\nGalaxy ≠ spezifisch",
      "en": "large nodule + satellites → galaxy\ngalaxy ≠ specific",
      "fa": "ندول بزرگ + ماهواره‌ها → Galaxy\nGalaxy ≠ اختصاصی"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-10-cluster",
    "category": {
      "de": "HRCT-Zeichen",
      "en": "HRCT signs",
      "fa": "علائم HRCT"
    },
    "front": {
      "de": "Was bedeutet Cluster Sign bei Sarkoidose?",
      "en": "What does the cluster sign mean in sarcoidosis?",
      "fa": "Cluster Sign در سارکوئیدوز یعنی چه؟"
    },
    "answer": {
      "de": "Viele eng gruppierte kleine Noduli.",
      "en": "Many tightly grouped small nodules.",
      "fa": "ندول‌های کوچک و بسیار نزدیک به هم."
    },
    "explanation": {
      "de": "Die Noduli liegen so dicht zusammen, dass sie fast wie ein einzelner Herd wirken. Das ist ein deskriptives Muster und für sich allein nicht diagnostisch.",
      "en": "The nodules are so closely packed that they almost mimic a single lesion. This is a descriptive pattern and is not diagnostic on its own.",
      "fa": "ندول‌ها آن‌قدر نزدیک هستند که تقریباً شبیه یک ضایعه واحد دیده می‌شوند. این یک الگوی توصیفی است و به‌تنهایی تشخیصی نیست."
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-11-lymphangiosis",
    "category": {
      "de": "Differentialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Sarkoidose vs. Lymphangiosis carcinomatosa: Was spricht eher für Lymphangiosis?",
      "en": "Sarcoidosis vs lymphangitic carcinomatosis: what favours lymphangitic spread?",
      "fa": "سارکوئیدوز در برابر لنفانژیوز کارسینوماتوز: چه چیزی بیشتر به نفع لنفانژیوز است؟"
    },
    "answer": {
      "de": "Asymmetrische knotige Septenverdickung.",
      "en": "Asymmetric nodular septal thickening.",
      "fa": "ضخیم‌شدن سپتای ندولار نامتقارن."
    },
    "explanation": {
      "de": "Lymphangiosis carcinomatosa ist oft einseitig oder asymmetrisch und klinisch aggressiver. Sarkoidose zeigt typischer eher symmetrische LAP und perilymphatische Mikronoduli.",
      "en": "Lymphangitic carcinomatosis is often unilateral or asymmetric and clinically more aggressive. Sarcoidosis more typically shows symmetric nodes and perilymphatic micronodules.",
      "fa": "لنفانژیوز کارسینوماتوز اغلب یک‌طرفه یا نامتقارن و از نظر بالینی تهاجمی‌تر است. سارکوئیدوز بیشتر لنف‌نودهای متقارن و میکروندول‌های پری‌لنفاتیک دارد."
    },
    "diagram": {
      "de": "Sarkoidose → symmetrisch/perilymphatisch\nLymphangiosis → asymmetrisch/septal knotig",
      "en": "sarcoidosis → symmetric/perilymphatic\nlymphangitic spread → asymmetric/nodular septa",
      "fa": "سارکوئیدوز → متقارن/پری‌لنفاتیک\nلنفانژیوز → نامتقارن/سپتای ندولار"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-12-tb",
    "category": {
      "de": "Differentialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Warum kann das Galaxy Sign nicht allein Sarkoidose beweisen?",
      "en": "Why can the galaxy sign not prove sarcoidosis by itself?",
      "fa": "چرا Galaxy Sign به تنهایی سارکوئیدوز را اثبات نمی‌کند؟"
    },
    "answer": {
      "de": "Es kommt auch bei Tuberkulose vor.",
      "en": "It can also occur in tuberculosis.",
      "fa": "در سل هم ممکن است دیده شود."
    },
    "explanation": {
      "de": "Tuberkulose kann ein ähnliches noduläres Erscheinungsbild zeigen. Asymmetrie, Kavernen, klinischer Kontext und mikrobiologische Befunde helfen bei der Differenzierung.",
      "en": "Tuberculosis can show a similar nodular appearance. Asymmetry, cavitation, clinical context and microbiology help differentiate.",
      "fa": "سل می‌تواند ظاهر ندولار مشابه ایجاد کند. عدم تقارن، کاویته، زمینه بالینی و میکروبیولوژی در افتراق کمک می‌کنند."
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-13-heerdordt",
    "category": {
      "de": "Extrapulmonal",
      "en": "Extrapulmonary",
      "fa": "خارج ریوی"
    },
    "front": {
      "de": "Welche Trias gehört zum Heerfordt-Syndrom?",
      "en": "Which triad belongs to Heerfordt syndrome?",
      "fa": "کدام سه‌گانه مربوط به سندرم Heerfordt است؟"
    },
    "answer": {
      "de": "Uveitis, Parotitis, Fazialisparese.",
      "en": "Uveitis, parotitis, facial palsy.",
      "fa": "یووئیت، پاروتیت، فلج فاسیال."
    },
    "explanation": {
      "de": "Das Heerfordt-Syndrom ist eine extrapulmonale Manifestation der Sarkoidose und verbindet Augen-, Speicheldrüsen- und Nervenbeteiligung.",
      "en": "Heerfordt syndrome is an extrapulmonary sarcoidosis manifestation combining eye, salivary gland and nerve involvement.",
      "fa": "سندرم Heerfordt یک تظاهر خارج ریوی سارکوئیدوز است و درگیری چشم، غده بزاقی و عصب را ترکیب می‌کند."
    },
    "diagram": {
      "de": "Uveitis + Parotitis + Fazialisparese → Heerfordt",
      "en": "uveitis + parotitis + facial palsy → Heerfordt",
      "fa": "یووئیت + پاروتیت + فلج فاسیال → Heerfordt"
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-14-kardial",
    "category": {
      "de": "Extrapulmonal",
      "en": "Extrapulmonary",
      "fa": "خارج ریوی"
    },
    "front": {
      "de": "Welche Bildgebung ist wichtig bei Verdacht auf kardiale Sarkoidose?",
      "en": "Which imaging is important when cardiac sarcoidosis is suspected?",
      "fa": "در شک به سارکوئیدوز قلبی کدام تصویربرداری مهم است؟"
    },
    "answer": {
      "de": "MRT mit LGE.",
      "en": "MRI with LGE.",
      "fa": "MRI با LGE."
    },
    "explanation": {
      "de": "Late Gadolinium Enhancement kann kardiale Beteiligung zeigen. Klinisch ist das wichtig, weil kardiale Sarkoidose mit Rhythmusstörungen assoziiert ist.",
      "en": "Late gadolinium enhancement can show cardiac involvement. This is clinically important because cardiac sarcoidosis is associated with arrhythmias.",
      "fa": "تقویت دیررس گادولینیوم (LGE) می‌تواند درگیری قلب را نشان دهد. از نظر بالینی مهم است چون سارکوئیدوز قلبی با آریتمی همراه است."
    },
    "topicId": "sarkoidose"
  },
  {
    "id": "sarkoidose-15-asbest-silikose",
    "category": {
      "de": "Differentialdiagnose",
      "en": "Differential diagnosis",
      "fa": "تشخیص افتراقی"
    },
    "front": {
      "de": "Asbestose vs. Sarkoidose: Welche Verteilung spricht eher für Asbestose?",
      "en": "Asbestosis vs sarcoidosis: which distribution favours asbestosis?",
      "fa": "آزبستوز در برابر سارکوئیدوز: کدام توزیع بیشتر به نفع آزبستوز است؟"
    },
    "answer": {
      "de": "Basal und subpleural.",
      "en": "Basal and subpleural.",
      "fa": "بازال و ساب‌پلورال."
    },
    "explanation": {
      "de": "Asbestose zeigt eher basale subpleurale Fibrose und Pleuraplaques. Sarkoidose betrifft typischer Ober- und Mittelfelder mit perilymphatischen Noduli.",
      "en": "Asbestosis more often shows basal subpleural fibrosis and pleural plaques. Sarcoidosis typically affects upper/middle zones with perilymphatic nodules.",
      "fa": "آزبستوز بیشتر فیبروز بازال ساب‌پلورال و پلاک پلور دارد. سارکوئیدوز معمولاً نواحی فوقانی/میانی و ندول‌های پری‌لنفاتیک دارد."
    },
    "diagram": {
      "de": "Asbestose → basal/subpleural + Pleuraplaques\nSarkoidose → ober-/mittelfeld + perilymphatisch",
      "en": "asbestosis → basal/subpleural + pleural plaques\nsarcoidosis → upper/middle zones + perilymphatic",
      "fa": "آزبستوز → بازال/ساب‌پلورال + پلاک پلور\nسارکوئیدوز → فوقانی/میانی + پری‌لنفاتیک"
    },
    "topicId": "sarkoidose"
  },
  {
  "id": "rotatorenmanschette-01",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Anatomie",
    "en": "Anatomy",
    "fa": "آناتومی"
  },
  "front": {
    "de": "Welche vier Muskeln bilden die Rotatorenmanschette (Merkwort)?",
    "en": "Which four muscles form the rotator cuff (mnemonic)?",
    "fa": "روتاتور کاف از کدام چهار عضله تشکیل شده است؟ (مخفف)"
  },
  "answer": {
    "de": "SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
    "en": "SITS: Supraspinatus, Infraspinatus, Teres minor, Subscapularis.",
    "fa": "SITS: سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور، ساب‌اسکاپولاریس."
  },
  "explanation": {
    "de": "Die vier Muskeln entspringen an der Skapula und setzen am Tuberculum majus (SIT) bzw. minus (Subscapularis) an. Sie stabilisieren den Humeruskopf in der Gelenkpfanne.",
    "en": "All four muscles originate at the scapula and insert on the greater (SIT) or lesser (subscapularis) tuberosity. They stabilise the humeral head within the glenoid.",
    "fa": "هر چهار عضله از اسکاپولا منشأ می‌گیرند و به توبروزیتی بزرگ (SIT) یا کوچک (ساب‌اسکاپولاریس) متصل می‌شوند و سر هومروس را در گلنوئید تثبیت می‌کنند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/1624486/; https://pubmed.ncbi.nlm.nih.gov/12647876/"
},
  {
  "id": "rotatorenmanschette-02",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Anatomie",
    "en": "Anatomy",
    "fa": "آناتومی"
  },
  "front": {
    "de": "Was ist die 'Critical Zone' des Supraspinatus?",
    "en": "What is the 'critical zone' of the supraspinatus tendon?",
    "fa": "'Critical Zone' تاندون سوپراسپیناتوس چیست؟"
  },
  "answer": {
    "de": "Ansatznaher Abschnitt der Supraspinatussehne, historisch als relativ minderdurchblutet beschrieben.",
    "en": "An insertional region of supraspinatus historically described as relatively poorly vascularised.",
    "fa": "بخشی نزدیک محل اتصال تاندون سوپراسپیناتوس که در توصیف‌های تاریخی خون‌رسانی نسبتاً کمتری داشته است."
  },
  "explanation": {
    "de": "Die Gefäßversorgung ist regional und belastungsabhängig. Die klassische Bezeichnung beweist weder eine stets avaskuläre Zone noch, dass Minderdurchblutung die alleinige Ursache einer Ruptur ist.",
    "en": "Vascularity varies by region and loading. The classical term proves neither an invariably avascular zone nor that reduced perfusion is the sole cause of a tear.",
    "fa": "خون‌رسانی با ناحیه و بارگذاری تغییر می‌کند. اصطلاح کلاسیک نه ناحیه‌ای همواره بدون عروق را ثابت می‌کند و نه اینکه کاهش پرفیوژن علت منفرد پارگی باشد."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323147/; https://pubmed.ncbi.nlm.nih.gov/18647848/; https://pubmed.ncbi.nlm.nih.gov/26412209/"
},
  {
  "id": "rotatorenmanschette-03",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Anatomie",
    "en": "Anatomy",
    "fa": "آناتومی"
  },
  "front": {
    "de": "Welche Bewegung führt der M. subscapularis aus?",
    "en": "What movement does the subscapularis perform?",
    "fa": "عضله ساب‌اسکاپولاریس چه حرکتی انجام می‌دهد؟"
  },
  "answer": {
    "de": "Innenrotation des Arms.",
    "en": "Internal rotation of the arm.",
    "fa": "چرخش داخلی بازو."
  },
  "explanation": {
    "de": "Der Subscapularis setzt am Tuberculum minus an und unterstützt Innenrotation sowie glenohumerale Stabilität. Sein Beitrag hängt von Armstellung und Muskelabschnitt ab. Eine mediale Instabilität der langen Bizepssehne ist ein Anlass, besonders oberen Subscapularis und Pulley gezielt zu prüfen.",
    "en": "Subscapularis inserts on the lesser tuberosity and contributes to internal rotation and glenohumeral stability. Its contribution depends on arm position and muscle segment. Medial long-head biceps instability warrants targeted assessment of the upper subscapularis and pulley.",
    "fa": "ساب‌اسکاپولاریس به توبرکل کوچک متصل می‌شود و در چرخش داخلی و پایداری گلنوهومرال نقش دارد. سهم آن به وضعیت بازو و بخش عضله وابسته است. ناپایداری مدیال سر بلند بایسپس دلیلی برای بررسی هدفمند بخش فوقانی ساب‌اسکاپولاریس و پولی است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/10888162/; https://pubmed.ncbi.nlm.nih.gov/28867549/; https://pubmed.ncbi.nlm.nih.gov/1624486/; https://pmc.ncbi.nlm.nih.gov/articles/PMC6151251/"
},
  {
  "id": "rotatorenmanschette-04",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "MRT-Technik",
    "en": "MRI technique",
    "fa": "تکنیک MRI"
  },
  "front": {
    "de": "Welche Sequenzbausteine gehören zur nativen Schulter-MRT für die Rotatorenmanschette?",
    "en": "Which sequence components belong in unenhanced, non-arthrographic shoulder MRI for the rotator cuff?",
    "fa": "کدام اجزای سکانسی برای MRI شانه بدون تزریق مادهٔ حاجب و بدون آرتروگرافی جهت بررسی روتاتور کاف لازم‌اند؟"
  },
  "answer": {
    "de": "Flüssigkeitssensitive Sequenzen in mehreren Ebenen, meist mit Fettunterdrückung, ergänzt durch T1-Aufnahmen für Anatomie und Muskelqualität.",
    "en": "Multiplanar fluid-sensitive sequences, usually with fat suppression, supplemented by T1 images for anatomy and muscle quality.",
    "fa": "سکانس‌های حساس به مایع در چند نما، معمولاً با فت‌ساپرشن، همراه با T1 برای آناتومی و کیفیت عضله."
  },
  "explanation": {
    "de": "Übliche Ebenen sind axial, koronar-schräg und sagittal-schräg. Das Protokoll wird an Fragestellung und Gerät angepasst. Auch ein geeignetes Protokoll garantiert keine fehlerfreie Detektion jeder Partialruptur; Morphologie und alle Sequenzen gemeinsam beurteilen.",
    "en": "Usual planes are axial, coronal oblique and sagittal oblique. Tailor the protocol to the clinical question and equipment. Even an appropriate protocol does not guarantee detection of every partial tear; interpret morphology and all sequences together.",
    "fa": "نماهای معمول آگزیال، کرونال مایل و ساژیتال مایل‌اند. پروتکل را متناسب با سؤال بالینی و دستگاه تنظیم کنید. حتی پروتکل مناسب نیز تشخیص بی‌خطای همهٔ پارگی‌های جزئی را تضمین نمی‌کند؛ مورفولوژی و تمام سکانس‌ها را با هم بررسی کنید."
  },
  "source": "https://www.essr.org/content-essr/uploads/2016/10/ESSR-MRI-Protocols-Shoulder.pdf; https://gravitas.acr.org/PPTS/DownloadPreviewDocument?DocId=45&ReleaseId=2; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/"
},
  {
  "id": "rotatorenmanschette-05",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "MRT-Technik",
    "en": "MRI technique",
    "fa": "تکنیک MRI"
  },
  "front": {
    "de": "Was ist das 'Magic-Angle'-Phänomen?",
    "en": "What is the 'magic angle' phenomenon?",
    "fa": "پدیده 'Magic Angle' چیست؟"
  },
  "answer": {
    "de": "Orientierungsabhängige Signalanhebung einer Sehne nahe55° zu B0, vor allem auf kurzen TE-Aufnahmen. Bei längerem TE nimmt der Effekt ab.",
    "en": "Orientation-dependent tendon signal increase near 55° to B0, most apparent at short TE; the effect decreases at longer TE.",
    "fa": "افزایش سیگنال وابسته به جهت تاندون نزدیک زاویهٔ ۵۵ درجه نسبت به B0، به‌ویژه در TE کوتاه؛ اثر در TE طولانی‌تر کاهش می‌یابد."
  },
  "explanation": {
    "de": "TE und Sehnenorientierung sind entscheidend, nicht die Sequenzbezeichnung allein. Erhaltene Fasern und abnehmendes Signal bei längerem TE stützen den Effekt; ein helles kurzes-TE-Bild allein beweist weder Tendinopathie noch Ruptur.",
    "en": "TE and tendon orientation matter, rather than the sequence label alone. Intact fibres and decreasing signal at longer TE support the effect; brightness on a short-TE image alone proves neither tendinopathy nor a tear.",
    "fa": "TE و جهت تاندون اهمیت دارند، نه صرفاً نام سکانس. حفظ رشته‌ها و کاهش سیگنال در TE طولانی‌تر از این اثر حمایت می‌کنند؛ روشن‌بودن تصویر با TE کوتاه به‌تنهایی نه تاندینوپاتی و نه پارگی را ثابت می‌کند."
  },
  "source": "https://pubs.rsna.org/doi/10.1148/radiology.181.2.1924777; https://pubmed.ncbi.nlm.nih.gov/16709684/"
},
  {
  "id": "rotatorenmanschette-06",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Partialruptur",
    "en": "Partial tear",
    "fa": "پارگی جزئی"
  },
  "front": {
    "de": "Wie zeigt sich eine bursaseitige Partialruptur des Supraspinatus im MRT?",
    "en": "How does a bursal-sided partial tear of the supraspinatus appear on MRI?",
    "fa": "پارگی جزئی سمت بورسال سوپراسپیناتوس در MRI چگونه دیده می‌شود؟"
  },
  "answer": {
    "de": "Flüssigkeitsäquivalenter Defekt der oberflächlichen Sehnenfasern mit Kontakt zur Bursaseite; artikuläre Fasern bleiben erhalten",
    "en": "Fluid-equivalent defect in the superficial tendon fibres reaching the bursal surface, with preserved articular fibres",
    "fa": "نقص با سیگنال هم‌ارز مایع در فیبرهای سطحی تاندون که به سطح بورسال می‌رسد؛ فیبرهای مفصلی حفظ شده‌اند"
  },
  "explanation": {
    "de": "Eine bursaseitige Partialruptur zeigt einen Defekt der oberflächlichen Sehnenfasern oder intratendinöses Flüssigkeitssignal mit Kontakt zur Bursaseite. Die Sehne ist nicht auf voller Dicke unterbrochen. Flüssigkeit in der Bursa bei intakter Sehnenoberfläche allein beweist keine Ruptur.",
    "en": "A bursal-sided partial tear shows a superficial tendon-fibre defect or intratendinous fluid signal reaching the bursal surface. The tendon is not disrupted through its full thickness. Bursal fluid with an intact tendon surface alone does not establish a tear.",
    "fa": "پارگی جزئی سمت بورسال، نقص فیبرهای سطحی تاندون یا سیگنال مایع داخل تاندون با تماس با سطح بورسال دارد. تاندون در تمام ضخامت قطع نشده است. وجود مایع در بورس با سطح سالم تاندون، به‌تنهایی پارگی را ثابت نمی‌کند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/"
},
  {
  "id": "rotatorenmanschette-07",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Partialruptur",
    "en": "Partial tear",
    "fa": "پارگی جزئی"
  },
  "front": {
    "de": "Wofür steht PASTA-Läsion?",
    "en": "What does a PASTA lesion stand for?",
    "fa": "ضایعه PASTA به چه معناست؟"
  },
  "answer": {
    "de": "Partial Articular Surface Tendon Avulsion: eine gelenkseitige Partialablösung am Footprint.",
    "en": "Partial Articular Surface Tendon Avulsion: an articular-sided partial avulsion at the footprint.",
    "fa": "Partial Articular Surface Tendon Avulsion: جداشدگی جزئی سمت مفصلی در محل اتصال تاندون."
  },
  "explanation": {
    "de": "Der Defekt betrifft die gelenkseitigen Fasern des Sehnenansatzes; die Sehne ist nicht auf voller Dicke durchtrennt. Bei Überkopfsportlern kann ein posterosuperiores internes Impingement-Muster hinzukommen. Der Begriff allein beweist weder diesen Mechanismus noch die Schmerzursache.",
    "en": "The defect involves the articular-side fibres at the insertion without full-thickness disruption. An internal posterosuperior impingement pattern may coexist in overhead athletes. The term alone proves neither that mechanism nor the cause of pain.",
    "fa": "نقص، رشته‌های سمت مفصلیِ محل اتصال را درگیر می‌کند و تمام ضخامت تاندون قطع نشده است. در ورزشکاران بالای سر، الگوی ایمپینجمنت داخلی خلفی‌فوقانی ممکن است همراه باشد. اصطلاح به‌تنهایی نه این مکانیسم و نه علت درد را ثابت می‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16762713/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/; https://pubmed.ncbi.nlm.nih.gov/22959196/"
},
  {
  "id": "rotatorenmanschette-08",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Partialruptur",
    "en": "Partial tear",
    "fa": "پارگی جزئی"
  },
  "front": {
    "de": "Wie unterscheidet man eine intratendinöse Partialruptur von reiner Tendinopathie im MRT?",
    "en": "How do you distinguish an intratendinous partial tear from pure tendinopathy on MRI?",
    "fa": "چگونه پارگی جزئی داخل تاندونی را از تاندینوپاتی خالص در MRI افتراق می‌دهیم؟"
  },
  "answer": {
    "de": "Ein flüssigkeitsäquivalenter Spalt mit Faserdefekt innerhalb der Sehne und ohne Kontakt zu ihren Oberflächen stützt einen intratendinösen Riss. Signaländerung allein genügt nicht.",
    "en": "A fluid-equivalent cleft with an internal fibre defect and no surface communication supports an intratendinous tear. Signal change alone is insufficient.",
    "fa": "شکاف با سیگنال هم‌ارز مایع همراه نقص رشته‌ها داخل تاندون، بدون ارتباط با سطوح، از پارگی داخل تاندونی حمایت می‌کند. تغییر سیگنال به‌تنهایی کافی نیست."
  },
  "explanation": {
    "de": "Tendinopathie kann auch auf flüssigkeitssensitiven Bildern signalreich sein, ohne einen Riss zu bilden. Flüssigkeitsäquivalenz, Faserkontinuität, Oberfläche und Ausdehnung gemeinsam beurteilen; aus unspezifischer T2-Hyperintensität keine binäre Rissdiagnose ableiten.",
    "en": "Tendinopathy may also be bright on fluid-sensitive images without a tear. Assess fluid equivalence, fibre continuity, surface communication and extent together; nonspecific T2 hyperintensity is not a binary tear test.",
    "fa": "تاندینوپاتی می‌تواند در تصاویر حساس به مایع نیز پُرسیگنال باشد، بدون اینکه پارگی وجود داشته باشد. هم‌ارزی با مایع، پیوستگی رشته‌ها، ارتباط سطحی و وسعت را با هم بسنجید؛ هیپراینتنسیتهٔ غیراختصاصی T2 آزمون دوحالتی پارگی نیست."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/20578021/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2465433/"
},
  {
  "id": "rotatorenmanschette-09",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Partialruptur",
    "en": "Partial tear",
    "fa": "پارگی جزئی"
  },
  "front": {
    "de": "PASTA: Was bezeichnet die 50-%-Grenze, und warum entscheidet sie nicht allein über eine Operation?",
    "en": "PASTA: what does the 50% threshold measure, and why does it not decide surgery alone?",
    "fa": "PASTA: آستانهٔ ۵۰٪ چه چیزی را اندازه می‌گیرد و چرا به‌تنهایی جراحی را تعیین نمی‌کند؟"
  },
  "answer": {
    "de": "Anteil der Defekttiefe an der Sehnendicke; Symptome, Funktion und Ansprechen auf nichtoperative Behandlung mitbeurteilen.",
    "en": "Tear depth as a proportion of tendon thickness; also assess symptoms, function and response to nonoperative care.",
    "fa": "سهم عمق نقص از ضخامت تاندون؛ علائم، عملکرد و پاسخ به درمان غیرجراحی نیز ارزیابی شوند."
  },
  "explanation": {
    "de": "Die Prozentangabe betrifft Defekttiefe relativ zur Sehnendicke, nicht die anteroposteriore Breite oder die Fläche. Arthroskopisch kann freiliegender medial-lateraler Footprint die Tiefe abschätzen. Wegen anatomischer Unterschiede lässt sich eine feste Millimetergrenze nicht bei jedem Menschen mit 50% Sehnendicke gleichsetzen. Symptome, Funktion und bisherige Behandlung bleiben entscheidend.",
    "en": "The percentage concerns tear depth relative to tendon thickness, not anteroposterior width or area. Exposed mediolateral footprint can estimate depth arthroscopically. Because anatomy varies, a fixed millimetre threshold does not equal 50% tendon thickness in every individual. Symptoms, function and previous treatment remain important.",
    "fa": "درصد به عمق نقص نسبت به ضخامت تاندون اشاره دارد، نه عرض قدامی‌خلفی یا مساحت. محل اتصال نمایان در جهت داخلی‌خارجی می‌تواند در آرتروسکوپی عمق را تخمین بزند. به‌دلیل تفاوت‌های آناتومیک، مقدار ثابت برحسب میلی‌متر را نمی‌توان در همهٔ افراد معادل ۵۰٪ ضخامت تاندون دانست. علائم، عملکرد و درمان قبلی همچنان اهمیت دارند."
  },
  "diagram": {
    "de": "Defekttiefe / Sehnendicke → Ausmaß\nAusmaß + klinischer Verlauf → individuelle Planung",
    "en": "Tear depth / tendon thickness → extent\nExtent + clinical course → individual planning",
    "fa": "عمق نقص / ضخامت تاندون ← میزان درگیری\nمیزان درگیری + سیر بالینی ← برنامه‌ریزی فردی"
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/15007313/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3600138/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/"
},
  {
  "id": "rotatorenmanschette-10",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Komplettruptur",
    "en": "Full-thickness tear",
    "fa": "پارگی کامل"
  },
  "front": {
    "de": "Was bedeutet Vollschichtruptur der Rotatorenmanschette, und was sagt sie nicht über die Breite?",
    "en": "What does a full-thickness cuff tear mean, and what does it not establish about width?",
    "fa": "پارگی تمام‌ضخامت روتاتور کاف چه معنایی دارد و چه چیزی را دربارهٔ عرض ثابت نمی‌کند؟"
  },
  "answer": {
    "de": "Der Defekt durchsetzt die gesamte Dicke von Gelenk- bis Bursaseite. Er muss nicht die gesamte anteroposteriore Sehnenbreite betreffen.",
    "en": "The defect traverses the entire thickness from articular to bursal surface; it need not involve the entire anteroposterior tendon width.",
    "fa": "نقص تمام ضخامت را از سمت مفصلی تا بورسال قطع می‌کند؛ الزاماً تمام عرض قدامی‌خلفی تاندون را درگیر نمی‌کند."
  },
  "explanation": {
    "de": "Ein durchgehender flüssigkeitsgefüllter Defekt ist ein typisches direktes MRT-Zeichen. Sehnenbreite, Stumpfretraktion und Muskelqualität zusätzlich getrennt beschreiben. Bursaflüssigkeit ohne nachweisbaren durchgehenden Faserdefekt ist nicht dasselbe.",
    "en": "A continuous fluid-filled gap is a typical direct MRI sign. Also report width, stump retraction and muscle quality separately. Bursal fluid without a demonstrated through-thickness fibre defect is not equivalent.",
    "fa": "شکاف پیوستهٔ حاوی مایع نشانهٔ مستقیم تیپیک MRI است. عرض، رتراکشن انتهای تاندون و کیفیت عضله را نیز جداگانه گزارش کنید. مایع بورس بدون نقص رشته‌ایِ اثبات‌شده در تمام ضخامت، معادل آن نیست."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5483776/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/"
},
  {
  "id": "rotatorenmanschette-11",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Komplettruptur",
    "en": "Full-thickness tear",
    "fa": "پارگی کامل"
  },
  "front": {
    "de": "Welche unterschiedlichen Befundparameter beschreiben Patte-Retraktionsgrad und Tangentenzeichen?",
    "en": "Which different reporting parameters are described by the Patte retraction grade and tangent sign?",
    "fa": "درجهٔ رتراکشن Patte و علامت تانژانت کدام دو پارامتر متفاوت گزارش را توصیف می‌کنند؟"
  },
  "answer": {
    "de": "Patte-Retraktionsgrad: Lage des Sehnenstumpfes. Positives Tangentenzeichen: Supraspinatus-Muskelbauch bleibt unter der Korakoid–Spina-scapulae-Linie; Hinweis auf Atrophie.",
    "en": "Patte retraction grade: tendon-stump position. Positive tangent sign: the supraspinatus belly fails to cross the coracoid–scapular-spine line, supporting atrophy.",
    "fa": "درجهٔ رتراکشن Patte: موقعیت انتهای تاندون. تانژانت مثبت: شکم سوپراسپیناتوس از خط کوراکوئید–خار اسکاپولا بالاتر نمی‌رود؛ به نفع آتروفی."
  },
  "explanation": {
    "de": "Für das Tangentenzeichen die oberen Ränder von Korakoid und Spina scapulae auf der sagittal-schrägen Y-Aufnahme verbinden. Retraktion, Muskelvolumen und Fettinfiltration getrennt beurteilen. Die ursprüngliche Patte-Klassifikation umfasste mehrere Merkmale; hier ist ausdrücklich die Retraktionskomponente gemeint. Beim Retraktionsgrad liegt Patte 1 nahe am Footprint, Patte 3 auf Glenoidniveau.",
    "en": "For the tangent sign, connect the superior coracoid and scapular-spine margins on the sagittal-oblique Y view. Assess retraction, muscle bulk and fatty infiltration separately. The original Patte classification included several characteristics; this card specifically refers to its retraction component. For retraction grading, Patte 1 is near the footprint and Patte 3 at glenoid level.",
    "fa": "برای علامت تانژانت، لبه‌های فوقانی کوراکوئید و خار اسکاپولا را در نمای Y ساژیتال مایل به هم وصل کنید. رتراکشن، حجم عضله و نفوذ چربی را جداگانه بسنجید. طبقه‌بندی اصلی Patte چند ویژگی را شامل می‌شد؛ این کارت مشخصاً به مؤلفهٔ رتراکشن اشاره دارد. در درجه‌بندی رتراکشن، Patte ۱ نزدیک محل اتصال و Patte ۳ در سطح گلنوئید است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323151/; https://pubmed.ncbi.nlm.nih.gov/9525755/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2837810/"
},
  {
  "id": "rotatorenmanschette-12",
  "topicId": "rotatorenmanschette",
  "category": {
    "de": "Begleitbefunde",
    "en": "Associated findings",
    "fa": "یافته‌های همراه"
  },
  "front": {
    "de": "Was beschreibt die Goutallier-Klassifikation und wie ist ein hoher Grad einzuordnen?",
    "en": "What does the Goutallier classification describe, and how should a high grade be interpreted?",
    "fa": "طبقه‌بندی Goutallier چه چیزی را توصیف می‌کند و درجهٔ بالا چگونه تفسیر می‌شود؟"
  },
  "answer": {
    "de": "Fettinfiltration der Muskulatur, Grad 0–4. Ein hoher Grad ist ein ungünstiger Prognosefaktor, beweist allein aber keine Unmöglichkeit der Rekonstruktion.",
    "en": "Fatty infiltration of muscle, grades 0–4. A high grade is an adverse prognostic factor but does not alone establish that repair is impossible.",
    "fa": "نفوذ چربی در عضله، از درجهٔ ۰ تا ۴. درجهٔ بالا عامل پیش‌آگهی نامطلوب است، اما به‌تنهایی ناممکن‌بودن ترمیم را ثابت نمی‌کند."
  },
  "explanation": {
    "de": "Die Skala reicht von Grad 0 ohne Fettinfiltration bis Grad 4 mit mehr Fett als Muskel. Ein hoher Grad ist ein ungünstiger Heilungsfaktor; er legt aber weder die technische Rekonstruierbarkeit noch den individuellen funktionellen Nutzen allein fest. Sehnenbefund, Retraktion, Muskelvolumen und Klinik ergänzen.",
    "en": "The scale runs from grade 0 without fatty infiltration to grade 4 with more fat than muscle. A high grade is an adverse healing factor, but alone establishes neither technical repairability nor individual functional benefit. Integrate tendon findings, retraction, muscle bulk and clinical assessment.",
    "fa": "مقیاس از درجهٔ ۰ بدون نفوذ چربی تا درجهٔ ۴ با چربی بیشتر از عضله است. درجهٔ بالا عامل نامطلوب ترمیم است، اما به‌تنهایی نه قابلیت فنی بازسازی و نه منفعت عملکردی فرد را تعیین می‌کند. یافته‌های تاندون، رتراکشن، حجم عضله و بالین را نیز لحاظ کنید."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8020238/; https://pubmed.ncbi.nlm.nih.gov/17418325/"
}
]

export const FLASHCARDS = [
  ...STERNUM_RIB_FLASHCARDS,
  ...GLENOHUMERAL_OA_FLASHCARDS,
  ...UPPER_ARTERY_CARDS,
  ...LUNG_CARCINOMA_FLASHCARDS,
  ...NEUROFORAMENSTENOSE_FLASHCARDS,
  ...ADPKD_FLASHCARDS,
  ...SHOULDER_INSTABILITY_FLASHCARDS,
  ...SPINAL_INTRAMEDULLARY_TUMOR_FLASHCARDS,
  ...SPINAL_EXTRAMEDULLARY_FLASHCARDS,
  ...MSK_BONE_AGGRESSIVENESS_FLASHCARDS,
  ...TUBERCULOSIS_FLASHCARDS,
  ...OSTEOCHONDROSIS_DISSECANS_FLASHCARDS,
  ...PANCREATIC_CYST_FLASHCARDS,
  ...MESENTERIC_ISCHAEMIA_FLASHCARDS,
  ...THORAX_LUNG_ABSCESS_FLASHCARDS,
  ...RENAL_CYST_FLASHCARDS,
  ...LUNG_ANATOMY_FLASHCARDS,
  ...FOREIGN_BODY_ASPIRATION_FLASHCARDS,
  ...CHEST_XRAY_HEART_SIZE_FLASHCARDS,
  ...SPINE_MODIC_FLASHCARDS,
  ...TIBIAL_PLATEAU_FLASHCARDS,
  ...ANKLE_TRAUMA_FLASHCARDS,
  ...SHOULDER_IMPINGEMENT_FLASHCARDS,
  ...PATELLA_STRECKAPPARAT_FLASHCARDS,
  ...DISTAL_FEMUR_FLASHCARDS,
  ...FEMORAL_SHAFT_FLASHCARDS,
  ...FMD_FLASHCARDS,
  ...PROXIMAL_FEMUR_FLASHCARDS,
  ...VANCOUVER_FLASHCARDS,
  ...PELVIC_RING_FLASHCARDS,
  ...INGUINAL_FEMORAL_HERNIA_FLASHCARDS,
  ...PDAC_FLASHCARDS,
  ...HEPATIC_ANGIOMYOLIPOMA_FLASHCARDS,
  ...PSC_MRCP_FLASHCARDS,
  ...PNET_FLASHCARDS,
  ...GEHIRN_PRES_FLASHCARDS,
  ...ADRENAL_FLASHCARDS,
  ...RENAL_ANATOMY_FLASHCARDS,
  ...SOLID_RENAL_MASS_FLASHCARDS,
  ...LOWER_GI_BLEEDING_FLASHCARDS,
  ...COLORECTAL_CANCER_FLASHCARDS,
  ...WILMS_FLASHCARDS,
  ...EPIPLOICA_FLASHCARDS,
  ...RENAL_TRAUMA_FLASHCARDS,
  ...TECHNIK_BOLD_FLASHCARDS,
  ...TECHNIK_CINE_FLASHCARDS,
  ...TECHNIK_FLUORO_ZOOM_FLASHCARDS,
  ...TECHNIK_ENTRANCE_KERMA_FLASHCARDS,
  ...TECHNIK_ROENTGEN_FLASHCARDS,
  { id: 'lebermetastasen-01-phasenvergleich', topicId: 'lebermetastasen', category: 'Abdomen', front: { de: 'Welche Phasen helfen, die Vaskularität einer Leberläsion einzuordnen?', en: 'Which phases help classify the vascularity of a liver lesion?', fa: 'کدام فازها برای طبقه‌بندی عروق‌رسانی ضایعهٔ کبدی کمک می‌کنند؟' }, answer: { de: 'Vor allem die arterielle und portalvenöse Phase vergleichen; eine Spätphase nur berücksichtigen, wenn sie akquiriert wurde.', en: 'Compare the arterial and portal venous phases; consider a delayed phase only when it was acquired.', fa: 'فاز شریانی و پورت را مقایسه کنید؛ فاز تأخیری را فقط در صورت انجام‌شدن بررسی کنید.' }, explanation: { de: 'Das PDF zeigt unterschiedliche hypo- und hypervaskuläre Muster über mehrere Kontrastphasen. Einzelbilder reichen nicht für die Einordnung.', en: 'The PDF shows different hypo- and hypervascular patterns across contrast phases. A single image is insufficient for classification.', fa: 'PDF الگوهای کم‌عروق و پرعروق را در چند فاز تزریق نشان می‌دهد. یک تصویر منفرد برای طبقه‌بندی کافی نیست.' }, diagram: { de: 'arteriell → portalvenös → ggf. spät', en: 'arterial → portal venous → delayed if acquired', fa: 'شریانی ← پورت ← در صورت انجام، تأخیری' } },
  ...STEATOSIS_FLASHCARDS,
  ...BRAIN_METASTASES_FLASHCARDS,
  ...PCNSL_FLASHCARDS,
  ...MEDULLO_FLASHCARDS,
  ...ATRT_FLASHCARDS,
  ...DIFFUSE_GLIOMA_FLASHCARDS,
  ...MENING_FLASHCARDS,
  ...RECIST_FLASHCARDS,
  ...FACET_FLASHCARDS,
  { id: 'bandscheibenpathologien-protrusion', topicId: 'bandscheibenpathologien', category: { de: 'Morphologie', en: 'Morphology', fa: 'مورفولوژی' }, front: { de: 'Woran erkennst du morphologisch eine Protrusion?', en: 'How is a protrusion defined morphologically?', fa: 'پروتروژن از نظر مورفولوژی چگونه تعریف می‌شود؟' }, answer: { de: 'In derselben Ebene ist die Basis des vorgewölbten Materials breiter als die über den Diskusraum hinausreichende Komponente.', en: 'In the same plane, the base of the displaced material is wider than the component extending beyond the disc space.', fa: 'در همان صفحه، قاعدهٔ مادهٔ جابه‌جاشده از بخشی که به بیرون فضای دیسک گسترش یافته پهن‌تر است.' }, explanation: { de: 'Basis und vorgewölbter Anteil werden in derselben Ebene verglichen. Die Unterscheidung beruht auf Form und Geometrie, nicht auf vermuteter Ursache oder Symptomstärke.', en: 'The base and displaced component are compared in the same plane. This is a shape-based distinction, not a presumed cause or symptom-severity judgment.', fa: 'قاعده و بخش جابه‌جاشده در همان صفحه مقایسه می‌شوند. افتراق بر اساس شکل است، نه علت فرضی یا شدت علائم.' }, source: 'Wirbelsäule.pdf PDF S. 6 / printed p. 5; Fardon et al., Spine J. 2014;14:2525–2545' },
  { id: 'bandscheibenpathologien-extrusion-sequester', topicId: 'bandscheibenpathologien', category: { de: 'Morphologie', en: 'Morphology', fa: 'مورفولوژی' }, front: { de: 'Wie unterscheiden sich Extrusion und Sequestration?', en: 'How do extrusion and sequestration differ?', fa: 'اکستروژن و سکوستراسیون چه تفاوتی دارند؟' }, answer: { de: 'Bei einer Extrusion übertrifft der verlagerte Anteil seine Basis in mindestens einer Ebene; Basis und Anteil werden dabei in derselben Ebene verglichen. Als Sequester wird das Fragment bei vollständig fehlender Kontinuität zum Ursprungsdiskus bezeichnet.', en: 'In extrusion, the displaced component exceeds its base in at least one plane; the base and component are compared in that same plane. Sequestration specifies a fragment with no continuity to the parent disc.', fa: 'در اکستروژن، بخش جابه‌جاشده در دست‌کم یک صفحه از قاعده بزرگ‌تر است؛ قاعده و بخش جابه‌جاشده در همان صفحه مقایسه می‌شوند. سکوستراسیون به قطعه‌ای گفته می‌شود که هیچ پیوستگی با دیسک مادر ندارد.' }, explanation: { de: 'Ein abgetrennter Sequester ist somit ein vollständig diskonnektierter Sonderfall einer Extrusion.', en: 'A detached sequestrum is therefore a fully disconnected subtype of extrusion.', fa: 'بنابراین سکوستر جداشده نوعی اکستروژن با قطع کامل اتصال است.' }, source: 'Wirbelsäule.pdf PDF S. 6 / printed p. 5; Fardon et al., Spine J. 2014;14:2525–2545' },
  { id: 'bandscheibenpathologien-axial-zones', topicId: 'bandscheibenpathologien', category: { de: 'Axiale Lage', en: 'Axial location', fa: 'محل آکسیال' }, front: { de: 'Welche vier axialen Zonen unterscheidet die Lektion?', en: 'Which four axial zones does the lesson distinguish?', fa: 'درس کدام چهار ناحیهٔ آکسیال را از هم جدا می‌کند؟' }, answer: { de: 'Zentral/median, subartikulär/paramedian, foraminal und extraforaminal.', en: 'Central/median, subarticular/paramedian, foraminal and extraforaminal.', fa: 'مرکزی/مدیان، ساب‌آرتیکولار/پارامدیان، فورامینال و خارج‌فورامینال.' }, explanation: { de: 'Foraminal liegt innerhalb des Neuroforamens; extraforaminal liegt lateral außerhalb davon. Die axiale Zone ersetzt nicht die Angabe von Etage und tatsächlich betroffener Struktur.', en: 'Foraminal means within the neural foramen; extraforaminal lies lateral and outside it. The zone does not replace stating the level and structure actually affected.', fa: 'فورامینال درون فورامن عصبی و خارج‌فورامینال در سمت خارجی و بیرون آن است. ذکر ناحیه جای بیان سطح و ساختار واقعاً درگیر را نمی‌گیرد.' }, source: 'Wirbelsäule.pdf PDF S. 6 / printed p. 5' },
  { id: 'bandscheibenpathologien-neural-structure', topicId: 'bandscheibenpathologien', category: { de: 'Befundung', en: 'Reporting', fa: 'گزارش‌دهی' }, front: { de: 'Was solltest du zusätzlich zu Morphologie und axialer Zone dokumentieren?', en: 'What should you document in addition to morphology and axial zone?', fa: 'علاوه بر مورفولوژی و ناحیهٔ آکسیال چه چیزی را باید ثبت کنید؟' }, answer: { de: 'Wirbelsäulenetage und tatsächlich bedrängte neurale Struktur; die mögliche Auswirkung hängt von der Höhe ab.', en: 'The spinal level and neural structure actually affected; the possible effect depends on level.', fa: 'سطح ستون فقرات و ساختار عصبی واقعاً تحت فشار؛ اثر احتمالی به سطح بستگی دارد.' }, explanation: { de: 'Eine zentrale Läsion bedeutet nicht auf jeder Etage Myelonkompression. Unterhalb des Conus verlaufen im lumbalen Duralsack vorwiegend Cauda-equina-Wurzeln.', en: 'A central lesion does not mean cord compression at every level. Below the conus, the lumbar thecal sac mainly contains cauda equina roots.', fa: 'ضایعهٔ مرکزی در همهٔ سطوح به معنی فشار بر نخاع نیست. در زیر کونوس، ساک دورال کمری عمدتاً حاوی ریشه‌های دم‌اسبی است.' }, source: 'Wirbelsäule.pdf PDF S. 6 / printed p. 5; level-dependent anatomy' },
  ...BONE_INFARCT_FLASHCARDS,
  ...EOSINOPHILIC_GRANULOMA_FLASHCARDS,
  ...LEGACY_FLASHCARDS.filter(card => card.topicId !== 'haemangiom'),
  ...HEMANGIOMA_FLASHCARDS,
  ...MSK_SPINE_REGISTERED_FLASHCARDS,
  ...ILEUS_FLASHCARDS,
  ...INTUSSUSCEPTION_FLASHCARDS,
  ...CYSTIC_LIVER_FLASHCARDS,
  ...GIST_FLASHCARDS,
  ...LIVER_MRI_FLASHCARDS,
  ...KOLLOID_FLASHCARDS,
  ...UIP_IPF_FLASHCARDS,
  ...BRONCHIECTASIS_FLASHCARDS,
  ...COPD_FLASHCARDS,
  ...PULMONARY_EDEMA_FLASHCARDS,
  ...PULMONARY_HYPERTENSION_FLASHCARDS,
  ...LIVER_VESSELS_FLASHCARDS,
  ...DUAL_ENERGY_CT_FLASHCARDS,
  ...MR_PERFUSION_FLASHCARDS,
  ...DWI_ADC_FLASHCARDS,
  ...MRI_ARTIFACT_FLASHCARDS,
  ...MRI_SAFETY_FLASHCARDS,
  ...MRI_SPIN_ECHO_FLASHCARDS,
  ...MRI_GRADIENT_ECHO_FLASHCARDS,
  ...MRI_INVERSION_RECOVERY_FLASHCARDS,
  ...MRI_FAT_SUPPRESSION_FLASHCARDS,
  ...MRI_FUNDAMENTALS_FLASHCARDS,
  ...MRI_QUALITY_FLASHCARDS,
  ...MR_ANGIOGRAPHY_FLASHCARDS,
  ...CT_QUALITY_FLASHCARDS,
  ...CT_PERFUSION_FLASHCARDS,
  ...CT_RECONSTRUCTION_FLASHCARDS,
  ...HRCT_TECHNIK_FLASHCARDS,
  ...CT_PROTOCOL_FLASHCARDS,
  ...CT_BASICS_FLASHCARDS,
  ...MR_MYEL_CARDS,
  ...ATELECTASIS_CARDS,
  ...LCH_CARDS,
  ...CF_CARDS,
  ...BRONCHIOLITIS_CARDS,
  ...HP_CARDS,
  ...THORAX_PNEUMONIA_FLASHCARDS,
  ...CYST_CARDS,
  ...PECTUS_FLASHCARDS,
  ...SPINE_DEGENERATIVE_COMPLETION_CARDS,
  ...SPINE_INFECTIOUS_CARDS,
  ...SPINE_METABOLIC_CARDS,
  ...CIRRHOSIS_CARDS,
  ...ABDOMEN_EXISTING_CARDS,
  ...ABDOMEN_LEGACY_CARDS,
  ...LIRADS_CARDS,
  ...FLC_CARDS,
  ...ABDOMEN_GI_CARDS,
  ...SPINE_COMPLETION_CARDS,
  ...SPINE_PATTERN_CARDS,
  ...THORAX_EXISTING_CARDS,
  ...REMAINING_BLOCK_FLASHCARDS,
  ...ACCESS_FLASHCARDS,
]

const registeredQualityCardTopics = new Set(FLASHCARD_TOPICS.map(topic => topic.id))
for (const topic of qualityTopics) {
  if (registeredQualityCardTopics.has(topic.id)) continue
  FLASHCARD_TOPICS.push(topic)
  registeredQualityCardTopics.add(topic.id)
}
FLASHCARDS.push(...qualityCards)

export function getFlashcardTopic(topicId) {
  return FLASHCARD_TOPICS.find(topic => topic.id === topicId)
}

export function getCardsByTopic(topicId) {
  return FLASHCARDS.filter(card => card.topicId === topicId)
}

export function getCardById(cardId) {
  return FLASHCARDS.find(card => card.id === cardId)
}
