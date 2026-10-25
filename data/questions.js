import { qualityQuestions, qualityTopics } from './assessmentQuality'
import { canonicalAssessmentId } from '../lib/assessmentIdentity'
import legacySessionBaseline from './assessmentQuality/legacySessionBaseline.json'
import { assessmentVersionRecords, selectedAssessmentVersion } from '../lib/assessmentContentVersion'
import { ABDOMEN_EXISTING_QUESTIONS, ABDOMEN_EXISTING_TOPIC_GROUPS } from './abdomenExistingPractice'
import { LIRADS_QUESTIONS, LIRADS_TOPIC_GROUP } from './abdomenHccPlanning'
import { FLC_QUESTIONS, FLC_TOPIC_GROUP } from './abdomenFlcLesson'
import { ABDOMEN_GI_QUESTIONS, ABDOMEN_GI_TOPIC_GROUPS } from './abdomenGiCompletion'
import { CIRRHOSIS_QUESTIONS, CIRRHOSIS_TOPIC_GROUP } from './abdomenCirrhosisLesson'
import { SPINE_METABOLIC_QUESTIONS, SPINE_METABOLIC_TOPIC_GROUPS } from './spineMetabolicCompletion'
import { SPINE_INFECTIOUS_QUESTIONS, SPINE_INFECTIOUS_TOPIC_GROUPS } from './spineInfectiousCompletion'
import { SPINE_DEGENERATIVE_COMPLETION_QUESTIONS, SPINE_DEGENERATIVE_COMPLETION_TOPIC_GROUPS } from './spineDegenerativeCompletion'
import { SPINE_COMPLETION_QUESTIONS, SPINE_COMPLETION_TOPIC_GROUPS } from './spineCompletionPractice'
import { SPINE_PATTERN_QUESTIONS, SPINE_PATTERN_TOPIC_GROUPS } from './spinePatternPractice'
import { THORAX_PNEUMONIA_QUESTIONS, THORAX_PNEUMONIA_TOPICS } from './thoraxPneumoniaPractice'
import { BRONCHIOLITIS_QUESTIONS, BRONCHIOLITIS_TOPIC_GROUP } from './thoraxBronchiolitisLesson'
import { HP_QUESTIONS, HP_TOPIC_GROUP } from './thoraxHypersensitivityLesson'
import { CF_QUESTIONS, CF_TOPIC_GROUP } from './thoraxCfLesson'
import { LCH_QUESTIONS, LCH_TOPIC_GROUP } from './thoraxLchLesson'
import { CYST_QUESTIONS, CYST_TOPIC_GROUP } from './thoraxCystsLesson'
import { PECTUS_LESSON, PECTUS_QUESTIONS } from './thoraxPectusLesson'
import { THORAX_EXISTING_QUESTIONS, THORAX_EXISTING_TOPIC_GROUPS } from './thoraxExistingPractice'
import { ATELECTASIS_QUESTIONS, ATELECTASIS_TOPIC_GROUP } from './thoraxAtelectasisAssessment'
import { REMAINING_BLOCK_QUESTIONS, REMAINING_BLOCK_TOPIC_GROUPS } from './technikRemainingBlocks'
import { ACCESS_QUESTIONS, ACCESS_TOPIC_GROUPS } from './technikTopicAccessAssessment'
import { MR_MYEL_QUESTIONS, MR_MYEL_TOPIC_GROUP } from './technikMrMyelographyLesson'
import { STERNUM_RIB_QUESTIONS, STERNUM_RIB_COPY, STERNUM_RIB_ID } from './sternumRibLesson'
import { GLENOHUMERAL_OA_QUESTIONS, GLENOHUMERAL_OA_LESSON, GLENOHUMERAL_OA_TOPIC_ID } from './mskGlenohumeralOaLesson'
import { UPPER_ARTERY_QUESTIONS, UPPER_ARTERY_TOPIC_GROUP } from './upperLimbArteriesLesson'
import { DIFFUSE_GLIOMA_QUESTIONS, DIFFUSE_GLIOMA_TOPIC_GROUP } from './diffuseGliomaLesson'
import { MENING_QUESTIONS } from './gehirnMeningeomLesson'
import { MEDULLO_QUESTIONS } from './medulloblastomLesson'
import { ATRT_QUESTIONS, ATRT_TOPIC_GROUP } from './atrtLesson'
import { RECIST_QUESTIONS } from './recist11Lesson'
import { MENISCUS_QUESTIONS } from './meniscusLearning'
import { BONE_INFARCT_QUESTIONS } from './knocheninfarktLesson'
import { EOSINOPHILIC_GRANULOMA_QUESTIONS } from './eosinophilesGranulomLesson'
import { FACET_QUESTIONS } from './spondylarthroseLesson'
import { PCNSL_QUESTIONS } from './pcnslLesson'
import { FLEISCHNER_QUESTIONS } from './fleischnerLearning'
import { HEMANGIOMA_QUESTIONS } from './haemangiomaTraining'
import { HEPATIC_ANGIOMYOLIPOMA_QUESTIONS } from './hepaticAngiomyolipomaLearning'
import { PSC_MRCP_QUESTIONS } from './pscMrcpLearning'
import { FOREIGN_BODY_ASPIRATION_QUESTIONS } from './foreignBodyAspirationLearning'
import { LIVER_MRI_PROTOCOL_QUESTIONS, LIVER_MRI_PROTOCOL_TOPIC_GROUP } from './technikLiverMriProtocolAssessment'
import { OSTEOCHONDROSIS_DISSECANS_QUESTIONS, OSTEOCHONDROSIS_DISSECANS_TOPIC_GROUP } from './osteochondrosisDissecansAssessments'
import { SHOULDER_INSTABILITY_QUESTIONS, SHOULDER_INSTABILITY_TOPIC_GROUP } from './shoulderInstabilityAssessments'
import { LUNG_CARCINOMA_QUESTIONS, LUNG_CARCINOMA_TOPIC_GROUP } from './lungCarcinomaImagingLesson'
import { GIST_QUESTIONS } from './gistLearning'
import { VOLVULUS_QUESTIONS } from './volvulusLearning'
import { PNET_QUESTIONS } from './pnetLearning'
import { WRIST_EXTENSOR_QUESTIONS, DE_QUERVAIN_QUESTIONS } from './wristExtensorAssessments'
import { GEHIRN_CHIARI_QUESTIONS } from './gehirnChiariLesson'
import { GEHIRN_NF1_QUESTIONS } from './gehirnNf1CnsLesson'
import { GEHIRN_PRES_QUESTIONS } from './gehirnPresTraining'
import { PROXIMAL_HUMERUS_QUESTIONS } from './proximalHumerusLesson'
import { BRAIN_METASTASES_QUESTIONS } from './gehirnHirnmetastasenLesson'
import { KOLLOID_QUESTIONS } from './gehirnKolloidzysteLesson'
import { UIP_IPF_QUESTIONS } from './thoraxUipIpfLesson'
import { BRONCHIECTASIS_QUESTIONS } from './bronchiectasisLesson'
import { COPD_QUESTIONS, COPD_TOPIC_GROUP } from './copdImagingLesson'
import { NEUROFORAMENSTENOSE_QUESTIONS, NEUROFORAMENSTENOSE_TOPIC_GROUP } from './neuroforamenstenoseLesson'
import { RENAL_TRAUMA_QUESTIONS } from './renalTraumaLesson'
import { ADPKD_QUESTIONS, ADPKD_TOPIC_GROUP } from './adpkdImagingAssessments'
import { PULMONARY_EDEMA_QUESTIONS } from './pulmonaryEdema'
import { PULMONARY_HYPERTENSION_QUESTIONS, PULMONARY_HYPERTENSION_TOPIC_GROUP } from './pulmonaryHypertensionAssessments'
import { LIVER_VESSELS_QUESTIONS, LIVER_VESSELS_TOPIC_GROUP } from './abdomenLiverVesselsAssessments'
import { DUAL_ENERGY_CT_QUESTIONS, DUAL_ENERGY_CT_TOPIC_GROUP } from './technikDualEnergyLesson'
import { MR_PERFUSION_QUESTIONS, MR_PERFUSION_TOPIC_GROUP } from './technikMrtPerfusionLesson'
import { MRI_ARTIFACT_QUESTIONS, MRI_ARTIFACT_TOPIC_GROUP } from './technikMriArtifacts'
import { MRI_SAFETY_QUESTIONS, MRI_SAFETY_PREGNANCY_QUESTIONS, MRI_SAFETY_TOPIC_GROUP } from './technikMriSafetyLesson'
import { MRI_SPIN_ECHO_QUESTIONS, MRI_SPIN_ECHO_TOPIC_GROUP } from './technikMriSpinEchoLesson'
import { MRI_GRADIENT_ECHO_QUESTIONS, MRI_GRADIENT_ECHO_TOPIC_GROUP } from './technikMriGradientEchoLesson'
import { MRI_INVERSION_RECOVERY_QUESTIONS, MRI_INVERSION_RECOVERY_TOPIC_GROUP } from './technikMriInversionRecoveryLesson'
import { MRI_FAT_SUPPRESSION_QUESTIONS, MRI_FAT_SUPPRESSION_TOPIC_GROUP } from './technikMriFatSuppressionLesson'
import { MR_ANGIOGRAPHY_QUESTIONS, MR_ANGIOGRAPHY_TOPIC_GROUP } from './technikMraLesson'
import { CT_QUALITY_QUESTIONS, CT_QUALITY_TOPIC_GROUP } from './technikCTQuality'
import { CT_PERFUSION_QUESTIONS, CT_PERFUSION_TOPIC_GROUP } from './technikCTPerfusionLesson'
import { CT_RECONSTRUCTION_QUESTIONS, CT_RECONSTRUCTION_TOPIC_GROUP } from './technikCTReconstructionLesson'
import { HRCT_TECHNIK_QUESTIONS, HRCT_TECHNIK_TOPIC_GROUP } from './technikHRCTLesson'
import { CT_PROTOCOL_QUESTIONS, CT_PROTOCOL_TOPIC_GROUP } from './technikCTProtocolLesson'
import { MRI_FUNDAMENTALS_QUESTIONS, MRI_QUALITY_QUESTIONS, MRI_FUNDAMENTALS_TOPIC_GROUP } from './technikMRIFundamentalsLesson'
import { CT_BASICS_QUESTIONS, CT_BASICS_TOPIC_GROUP } from './technikCTBasicsLesson'
import { TECHNIK_ROENTGEN_QUESTIONS, TECHNIK_ROENTGEN_TOPIC_GROUP } from './technikRoentgenQuestions'
import { TECHNIK_BOLD_QUESTIONS, TECHNIK_BOLD_TOPIC_GROUP } from './technikBoldQuestions'
import { TECHNIK_CINE_QUESTIONS, TECHNIK_CINE_TOPIC_GROUP } from './technikCineQuestions'
import { TECHNIK_FLUORO_ZOOM_QUESTIONS, TECHNIK_FLUORO_ZOOM_TOPIC_GROUP } from './technikFluoroZoom'
import { DWI_ADC_QUESTIONS } from './technikDwiAdcLesson'
import { WIRBELMETASTASEN_QUESTIONS, WIRBELMETASTASEN_TOPIC_GROUP } from './wirbelmetastasenAssessment'
import { SPINAL_INTRAMEDULLARY_TUMOR_QUESTIONS, SPINAL_INTRAMEDULLARY_TUMOR_TOPIC_GROUP, SPINAL_EXTRAMEDULLARY_QUESTIONS, SPINAL_EXTRAMEDULLARY_TOPIC_GROUP } from './spinalIntramedullaryTumorAssessments'
import { TECHNIK_ENTRANCE_KERMA_QUESTIONS, TECHNIK_ENTRANCE_KERMA_TOPIC_GROUP } from './technikEntranceKermaAssessment'
// ── RADYAR QUESTION BANK ────────────────────────────────────────────────────

import { CONTRAST_QUESTIONS, CONTRAST_TOPICS } from './contrastMedia'
import { STROKE_QUESTIONS } from './stroke'
import { ICB_QUESTIONS } from './icb'
import { HIE_QUESTIONS } from './hie'
import { SAB_QUESTIONS } from './sab'
import { EDH_QUESTIONS } from './edh'
import { DISSECTION_QUESTIONS } from './dissection'
import { SDH_QUESTIONS } from './sdh'
import { MOYAMOYA_QUESTIONS } from './moyamoya'
import { HMA_QUESTIONS } from './hypertensive-mikroangiopathie'
import { CAA_QUESTIONS } from './caa'
import { MIGRAINE_QUESTIONS } from './migraine'
import { CADASIL_QUESTIONS } from './cadasil'
import { DVA_QUESTIONS } from './dva'
import { KAVERNOM_QUESTIONS } from './kavernom'
import { NPH_QUESTIONS } from './normaldruckhydrozephalus'
import { TELEANGIEKTASIE_QUESTIONS } from './kapillaere-teleangiektasie'
import { SVT_QUESTIONS } from './sinusvenenthrombose'
import { DAVF_QUESTIONS } from './davf'
import { AVM_QUESTIONS } from './avm'
import { FRAKTUR_QUESTIONS } from './frakturbeschreibung'
import { FRAKTUR_KINDER_QUESTIONS } from './frakturen-kindesalter'
import { AK_LUXATION_QUESTIONS } from './ak-luxation'
import { RADIUSKOPF_QUESTIONS } from './radiuskopf'
import { UNTERARM_QUESTIONS } from './unterarmschaftfrakturen'
import { DISTALE_RADIUS_QUESTIONS } from './distale-radiusfraktur'
import { SCAPHOID_QUESTIONS } from './scaphoidAssessments'
import { THUMB_UCL_QUESTIONS } from './thumbUclAssessments'
import { PELVIC_RING_QUESTIONS } from './pelvicRingAssessments'
import { VANCOUVER_QUESTIONS } from './vancouverAssessments'
import { PROXIMAL_FEMUR_QUESTIONS } from './proximalFemurAssessments'
import { DISTAL_FEMUR_QUESTIONS } from './distalFemurAssessments'
import { FEMORAL_SHAFT_QUESTIONS } from './femoralShaftAssessments'
import { FMD_QUESTIONS } from './fmdAssessments'
import { TIBIAL_PLATEAU_QUESTIONS } from './tibialPlateauAssessments'
import { ANKLE_TRAUMA_QUESTIONS } from './ankleTraumaAssessments'
import { SHOULDER_IMPINGEMENT_QUESTIONS } from './shoulderImpingementAssessments'
import { PATELLA_STRECKAPPARAT_QUESTIONS } from './patellaStreckapparatAssessments'
import { METACARPAL_BASE_QUESTIONS } from './metacarpalBaseQuestions'
import { HRCT_QUESTIONS } from './hrct-muster'
import { SPINE_TRAUMA_QUESTIONS } from './spineTrauma'
import { KNIE_LIGAMENTE_QUESTIONS } from './knieligamente'
import { MAMMA_MRT_QUESTIONS } from './mammaMrtBasics'
import { MAMMA_MRT_LESION_QUESTIONS } from './mammaMrtLesions'
import { MAMMA_KAISER_QUESTIONS } from './mammaKaiserScore'
import { MAMMA_MRT_SPECIAL_CARCINOMA_QUESTIONS } from './mammaMrtSpecialCarcinomas'
import { MAMMOGRAPHY_BASICS_QUESTIONS } from './mammaMammographyBasics'
import { MAMMOGRAPHY_CALCIFICATIONS_QUESTIONS } from './mammaMammographyCalcifications'
import { CARDIOMYOPATHY_QUESTIONS } from './cardiomyopathy'
import { ARVC_QUESTIONS } from './arvcTraining'
import { MYOCARDIAL_INJURY_QUESTIONS } from './myocardialInjury'
import { ABDOMEN_THORAX_REGISTERED_QUESTIONS, ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS } from './abdomenThoraxRegisteredQuestions'
import { ORMOND_QUESTIONS } from './ormondLesson'
import { EPIPLOICA_QUESTIONS } from './epiploicaLesson'
import { PANNICULITIS_QUESTIONS } from './panniculitisLesson'
import { PERITONEAL_QUESTIONS } from './peritonealCarcinomatosisLesson'
import { MSK_SPINE_REGISTERED_QUESTIONS } from './mskSpineRegisteredQuestions'
import { MSK_BONE_AGGRESSIVENESS_QUESTIONS, MSK_BONE_AGGRESSIVENESS_TOPIC_GROUP } from './mskBoneAggressivenessAssessments'
import { SPINE_MODIC_QUESTIONS, SPINE_MODIC_TOPIC_GROUP } from './spineModicAssessment'



const DIVERTICULITIS_QUESTION_CONTENT = [
  {
  "id": "definition",
  "question": {
    "de": "Ein asymptomatischer Patient hat Kolondivertikel ohne Wandentzündung oder perikolische Reaktion. Welche Einordnung passt?",
    "en": "An asymptomatic patient has colonic diverticula without mural inflammation or pericolic reaction. Which classification fits?",
    "fa": "بیمار بدون علامت، دیورتیکول‌های کولون بدون التهاب دیواره یا واکنش اطراف کولون دارد. کدام طبقه‌بندی مناسب است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Asymptomatische Divertikulose",
        "en": "Asymptomatic diverticulosis",
        "fa": "دیورتیکولوز بدون علامت"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Akute unkomplizierte Divertikulitis",
        "en": "Acute uncomplicated diverticulitis",
        "fa": "دیورتیکولیت حاد بدون عارضه"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Akute Divertikulitis mit Mikroabszess",
        "en": "Acute diverticulitis with microabscess",
        "fa": "دیورتیکولیت حاد همراه با آبسهٔ کوچک"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Symptomatische unkomplizierte Divertikelkrankheit",
        "en": "Symptomatic uncomplicated diverticular disease",
        "fa": "بیماری دیورتیکولیِ علامت‌دار بدون عارضه"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Divertikulose bezeichnet das Vorhandensein von Divertikeln ohne deren Entzündung. Divertikulitis ist die Entzündung eines oder mehrerer Divertikel, gegebenenfalls mit Reaktion der Darmwand und des umgebenden Gewebes.",
    "en": "Diverticulosis denotes the presence of diverticula without inflammation of them. Diverticulitis is inflammation of one or more diverticula, which may be accompanied by a reaction of the bowel wall and surrounding tissue.",
    "fa": "دیورتیکولوز به وجود دیورتیکول‌ها بدون التهاب خود آن‌ها گفته می‌شود. دیورتیکولیت التهاب یک یا چند دیورتیکول است که می‌تواند با واکنش دیوارهٔ روده و بافت اطراف همراه باشد."
  },
  "wrongExplanations": {
    "B": {
      "de": "Die beschriebene Konstellation enthält keine akuten Entzündungszeichen.",
      "en": "The described findings contain no acute inflammatory signs.",
      "fa": "مجموعهٔ توصیف‌شده نشانهٔ التهاب حاد ندارد."
    },
    "C": {
      "de": "Ein Abszess oder eine entzündliche Kollektion ist nicht beschrieben.",
      "en": "No abscess or inflammatory collection is described.",
      "fa": "آبسه یا کالکشن التهابی توصیف نشده است."
    },
    "D": {
      "de": "Für eine symptomatische Kategorie fehlen hier Symptome.",
      "en": "Symptoms are absent, so a symptomatic category does not fit.",
      "fa": "علامتی وجود ندارد؛ بنابراین دستهٔ علامت‌دار مناسب نیست."
    }
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
    "id": "ct-triad",
    "question": {
      "de": "Welche CT-Befundkombination ist für eine akute Sigmadivertikulitis am typischsten?",
      "en": "Which combination of CT findings is most typical of acute sigmoid diverticulitis?",
      "fa": "کدام ترکیب یافته‌های CT برای دیورتیکولیت حاد سیگموئید تیپیک‌تر است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Divertikel, segmentale Wandverdickung und perikolisches Fettgewebsstranding",
          "en": "Diverticula, segmental wall thickening and pericolic fat stranding",
          "fa": "دیورتیکول‌ها، ضخیم‌شدن سگمنتال دیواره و التهاب چربی اطراف کولون"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Diffuse Kolonwandverdickung ohne erkennbaren peridivertikulären Entzündungsfokus",
          "en": "Diffuse colonic wall thickening without an identifiable peridiverticular inflammatory focus",
          "fa": "ضخیم‌شدن منتشر دیوارهٔ کولون بدون کانون التهابی قابل‌تشخیص اطراف دیورتیکول"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Kurze asymmetrische Wandverdickung mit suspekten Lymphknoten und wenig Umgebungsreaktion",
          "en": "Short asymmetric wall thickening with suspicious nodes and little surrounding reaction",
          "fa": "ضخیم‌شدن کوتاه و نامتقارن دیواره با غدد مشکوک و واکنش کم اطراف"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Reizlose Divertikel ohne Wandverdickung oder perikolische Entzündung",
          "en": "Uninflamed diverticula without wall thickening or pericolic inflammation",
          "fa": "دیورتیکول‌های بدون التهاب، بدون ضخیم‌شدن دیواره یا التهاب اطراف کولون"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die typische CT-Trias besteht aus Divertikeln, segmentaler Darmwandverdickung und einer perikolischen Entzündungsreaktion.",
      "en": "The typical CT triad consists of diverticula, segmental bowel wall thickening and pericolic inflammatory change.",
      "fa": "تریاد تیپیک CT شامل دیورتیکول، ضخیم‌شدگی سگمنتال دیواره و واکنش التهابی پریکولیک است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Die diffuse Verteilung ohne peridivertikulären Fokus zeigt nicht die gesuchte typische Kombination.",
        "en": "Diffuse distribution without a peridiverticular focus lacks the requested typical combination.",
        "fa": "توزیع منتشر بدون کانون اطراف دیورتیکول، ترکیب تیپیک مورد نظر را ندارد."
      },
      "C": {
        "de": "Dieses Muster erfordert insbesondere eine Tumordifferenzialdiagnose; es ist kein typischer Divertikulitis-Dreiklang.",
        "en": "This pattern particularly requires a tumour differential; it is not the typical diverticulitis triad.",
        "fa": "این الگو به‌ویژه به افتراق تومور نیاز دارد؛ سه‌گانهٔ تیپیک دیورتیکولیت نیست."
      },
      "D": {
        "de": "Ohne Entzündungszeichen sind Divertikel allein Divertikulose, kein Entzündungsnachweis.",
        "en": "Without inflammatory findings, diverticula alone represent diverticulosis rather than demonstrated inflammation.",
        "fa": "بدون نشانهٔ التهاب، وجود دیورتیکول به‌تنهایی دیورتیکولوز است، نه اثبات التهاب."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  },
  {
    "id": "protocol",
    "question": {
      "de": "Bei einer regulären kontrastverstärkten CT zur Divertikulitis- und Abszessbeurteilung: Welche Hauptserie ist am ehesten angemessen?",
      "en": "For a standard contrast-enhanced CT assessing diverticulitis and abscesses, which main acquisition is most appropriate?",
      "fa": "در CT معمول با تزریق برای ارزیابی دیورتیکولیت و آبسه، کدام برداشت اصلی مناسب‌تر است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Portalvenöse Serie",
          "en": "Portal venous acquisition",
          "fa": "برداشت پورتال"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Ausschließlich früharterielle Serie",
          "en": "Early arterial acquisition alone",
          "fa": "فقط برداشت شریانی زودرس"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Ausschließlich späte exkretorische Serie",
          "en": "Late excretory acquisition alone",
          "fa": "فقط برداشت دفعی دیررس"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Ausschließlich native Serie trotz der geplanten kontrastverstärkten Entzündungsbeurteilung",
          "en": "Unenhanced acquisition alone despite the planned enhanced inflammatory assessment",
          "fa": "فقط برداشت بدون تزریق، با وجود برنامهٔ ارزیابی التهاب با تزریق"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Die S3-Leitlinie beschreibt das reguläre Abdomen-CT in portalvenöser Phase und erlaubt eine Anpassung der Technik an die klinische Situation. Nierenfunktion, Fragestellung und Strahlenreduktion berücksichtigen; dies verlangt keine routinemäßige Mehrphasen-CT.",
      "en": "The S3 guideline describes standard abdominal CT in the portal phase while allowing technique to be adapted clinically. Account for renal function, the clinical question and radiation reduction; this does not require routine multiphase CT.",
      "fa": "راهنمای S3، ‏CT معمول شکم را در فاز پورتال توصیف می‌کند و تطبیق روش با وضعیت بالینی را مجاز می‌داند. عملکرد کلیه، پرسش بالینی و کاهش پرتو را در نظر بگیرید؛ این به معنای CT چندفازی روتین نیست."
    },
    "wrongExplanations": {
      "B": {
        "de": "Eine rein arterielle Untersuchung ersetzt die reguläre portalvenöse Entzündungs-/Abszessbeurteilung nicht.",
        "en": "An arterial-only study does not replace standard portal-phase inflammatory/abscess assessment.",
        "fa": "بررسی صرفاً شریانی جای ارزیابی معمول التهاب و آبسه در فاز پورتال را نمی‌گیرد."
      },
      "C": {
        "de": "Die exkretorische Serie ist auf eine andere Fragestellung ausgerichtet und hier keine reguläre Hauptserie.",
        "en": "An excretory acquisition targets a different clinical question and is not the standard main acquisition here.",
        "fa": "برداشت دفعی برای پرسش بالینی دیگری است و در اینجا برداشت اصلی معمول نیست."
      },
      "D": {
        "de": "Native Low-Dose-Strategien können situationsabhängig sinnvoll sein; sie sind aber nicht die im Stamm geplante kontrastverstärkte Hauptserie.",
        "en": "Unenhanced low-dose strategies may be appropriate in selected settings, but are not the enhanced main acquisition specified in the stem.",
        "fa": "روش کم‌دوز بدون تزریق ممکن است در شرایط انتخابی مناسب باشد، اما برداشت اصلی با تزریقِ مشخص‌شده در صورت سؤال نیست."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  },
  {
    "id": "cdd-1b",
    "question": {
      "de": "Welcher Befund passt am besten zu CDD Typ 1b?",
      "en": "Which finding best corresponds to CDD type 1b?",
      "fa": "کدام یافته بیشترین تطابق را با CDD نوع 1b دارد؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Phlegmonöse perikolische Reaktion ohne Abszess",
          "en": "Phlegmonous pericolic inflammation without abscess",
          "fa": "التهاب فلگمونوس پریکولیک بدون آبسه"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Makroabszess über 3 cm",
          "en": "Macroabscess larger than 3 cm",
          "fa": "ماکروآبسه بزرگ‌تر از ۳ سانتی‌متر"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Freie Perforation mit Peritonitis",
          "en": "Free perforation with peritonitis",
          "fa": "پرفوراسیون آزاد با پریتونیت"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Asymptomatische Divertikulose",
          "en": "Asymptomatic diverticulosis",
          "fa": "دیورتیکولوز بدون علامت"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "CDD 1b bezeichnet eine akute unkomplizierte Divertikulitis mit phlegmonöser Umgebungsreaktion, aber ohne Abszess.",
      "en": "CDD 1b is acute uncomplicated diverticulitis with phlegmonous surrounding inflammation but no abscess.",
      "fa": "CDD نوع 1b دیورتیکولیت حاد بدون عارضه با التهاب فلگمونوس اطراف، اما بدون آبسه است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein Abszess über 3 cm gehört im genannten CDD-System zu Typ 2b.",
        "en": "An abscess over 3 cm is type 2b in the stated CDD system.",
        "fa": "آبسهٔ بزرگ‌تر از ۳ سانتی‌متر در نظام CDD ذکرشده، نوع 2b است."
      },
      "C": {
        "de": "Freie Perforation ist eine komplizierte Form (Typ 2c), keine phlegmonöse Typ-1b-Reaktion.",
        "en": "Free perforation is complicated disease (type 2c), not a type 1b phlegmonous reaction.",
        "fa": "پرفوراسیون آزاد شکل عارضه‌دار، نوع 2c، است؛ واکنش فلگمونی نوع 1b نیست."
      },
      "D": {
        "de": "Asymptomatische Divertikulose ist Typ 0 und zeigt keine akute Phlegmone.",
        "en": "Asymptomatic diverticulosis is type0 and does not show an acute phlegmon.",
        "fa": "دیورتیکولوز بدون علامت نوع 0 است و فلگمون حاد ندارد."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  },
  {
  "id": "cdd-2a",
  "question": {
    "de": "Ein nachgewiesener perikolischer Abszess bei Sigmadivertikulitis misst 2 cm. Welcher CDD-Typ passt nach S3/DGVS 2021?",
    "en": "A confirmed pericolic abscess in sigmoid diverticulitis measures 2 cm. Which CDD type fits according to S3/DGVS 2021?",
    "fa": "اندازهٔ یک آبسهٔ تأییدشدهٔ اطراف کولون در دیورتیکولیت سیگموئید ۲ سانتی‌متر است. بر اساس S3/DGVS 2021 کدام نوع CDD مناسب است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "CDD 1a",
        "en": "CDD 1a",
        "fa": "CDD 1a"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "CDD 2a",
        "en": "CDD 2a",
        "fa": "CDD 2a"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "CDD 2c",
        "en": "CDD 2c",
        "fa": "CDD 2c"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "CDD 2b",
        "en": "CDD 2b",
        "fa": "CDD 2b"
      }
    }
  ],
  "correct": "B",
  "explanation": {
    "de": "Ein Mikroabszess beziehungsweise eine gedeckte Perforation mit einer Kollektion bis 3 cm entspricht CDD Typ 2a.",
    "en": "A microabscess or contained perforation with a collection up to 3 cm corresponds to CDD type 2a.",
    "fa": "میکروآبسه یا پرفوراسیون مهارشده با تجمع تا ۳ سانتی‌متر مطابق CDD نوع 2a است."
  },
  "wrongExplanations": {
    "A": {
      "de": "Typ 1a beschreibt keine abszedierende komplizierte Divertikulitis.",
      "en": "Type 1a does not describe complicated diverticulitis with an abscess.",
      "fa": "نوع 1a دیورتیکولیت عارضه‌دارِ همراه با آبسه را توصیف نمی‌کند."
    },
    "C": {
      "de": "Die kleine umschriebene Kollektion allein belegt keine freie Perforation vom Typ 2c.",
      "en": "A small localised collection alone does not demonstrate free perforation of type 2c.",
      "fa": "کالکشن کوچک و محدود به‌تنهایی پرفوراسیون آزاد نوع 2c را ثابت نمی‌کند."
    },
    "D": {
      "de": "2 cm liegt im genannten CDD-System unter der Makroabszessgrenze von über 3 cm.",
      "en": "In the stated CDD system, 2 cm is below the macroabscess boundary of over 3 cm.",
      "fa": "در نظام CDD ذکرشده،۲ سانتی‌متر کمتر از مرز آبسهٔ بزرگ، یعنی بیش از۳ سانتی‌متر، است."
    }
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
    "id": "cdd-3c",
    "question": {
      "de": "Bei rezidivierender Divertikulitis zeigt die CT eine entzündliche Stenose. Welcher CDD-Typ passt am besten?",
      "en": "In recurrent diverticulitis, CT shows an inflammatory stenosis. Which CDD type best fits?",
      "fa": "در دیورتیکولیت عودکننده، CT یک تنگی التهابی نشان می‌دهد. کدام نوع CDD مناسب‌تر است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "CDD 3a – symptomatische unkomplizierte Divertikelkrankheit",
          "en": "CDD 3a – symptomatic uncomplicated diverticular disease",
          "fa": "CDD 3a – بیماری دیورتیکولی علامت‌دار بدون عارضه"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "CDD 3b – rezidivierende Divertikulitis ohne Komplikationen",
          "en": "CDD 3b – recurrent diverticulitis without complications",
          "fa": "CDD 3b – دیورتیکولیت عودکننده بدون عارضه"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "CDD 3c – rezidivierende Divertikulitis mit Komplikationen",
          "en": "CDD 3c – recurrent diverticulitis with complications",
          "fa": "CDD 3c – دیورتیکولیت عودکننده همراه عارضه"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "CDD 2a – akute komplizierte Divertikulitis mit Mikroabszess",
          "en": "CDD 2a – acute complicated diverticulitis with microabscess",
          "fa": "CDD 2a – دیورتیکولیت حاد پیچیده همراه میکروآبسه"
        }
      }
    ],
    "correct": "C",
    "explanation": {
      "de": "Die PDF nennt Stenose, Fistel und entzündliches Konglomerat als Komplikationen der rezidivierenden Divertikulitis Typ 3c. Typ 2a bezeichnet dagegen eine akute komplizierte Episode mit Mikroabszess beziehungsweise gedeckter Perforation.",
      "en": "The PDF lists stenosis, fistula and inflammatory conglomerate as complications of recurrent type 3c disease. Type 2a instead denotes an acute complicated episode with microabscess or contained perforation.",
      "fa": "PDF تنگی، فیستول و توده التهابی را از عوارض نوع 3c عودکننده می‌داند. نوع 2a در مقابل به دوره حاد پیچیده همراه میکروآبسه یا پرفوراسیون مهارشده اشاره دارد."
    },
    "wrongExplanations": {
      "A": {
        "de": "Typ 3a ist die symptomatische unkomplizierte Form und bildet diese entzündliche Stenose nicht ab.",
        "en": "Type 3a is symptomatic uncomplicated disease and does not represent this inflammatory stenosis.",
        "fa": "نوع 3a شکل علامت‌دار بدون عارضه است و این تنگی التهابی را نشان نمی‌دهد."
      },
      "B": {
        "de": "Die Stenose ist eine Komplikation; daher passt die Kategorie ohne Komplikationen nicht.",
        "en": "Stenosis is a complication, so the category without complications does not fit.",
        "fa": "تنگی عارضه است؛ بنابراین دستهٔ بدون عارضه مناسب نیست."
      },
      "D": {
        "de": "Typ 2a beschreibt den akuten Mikroabszess, nicht die rezidivierende komplizierte Stenose.",
        "en": "Type 2a describes acute microabscess, not recurrent complicated stenosis.",
        "fa": "نوع 2a آبسهٔ کوچک حاد را توصیف می‌کند، نه تنگی عارضه‌دار عودکننده."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  },
  {
  "id": "macroabscess",
  "question": {
    "de": "Ab welcher Abszessgröße wird nach der CDD-Klassifikation der S3/DGVS-Leitlinie 2021 von einem Makroabszess gesprochen?",
    "en": "At what abscess size does the CDD classification in the S3/DGVS 2021 guideline define a macroabscess?",
    "fa": "در طبقه‌بندی CDD راهنمای S3/DGVS 2021، آبسه از چه اندازه‌ای ماکروآبسه محسوب می‌شود؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "> 1 cm",
        "en": "> 1 cm",
        "fa": "بیش از ۱ سانتی‌متر"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "> 2 cm",
        "en": "> 2 cm",
        "fa": "بیش از ۲ سانتی‌متر"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "> 3 cm",
        "en": "> 3 cm",
        "fa": "بیش از ۳ سانتی‌متر"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "> 4 cm",
        "en": "> 4 cm",
        "fa": "بیش از ۴ سانتی‌متر"
      }
    }
  ],
  "correct": "C",
  "explanation": {
    "de": "CDD Typ 2b bezeichnet einen Makroabszess über 3 cm. Die Abszessgröße sollte im Befund in drei Dimensionen angegeben werden.",
    "en": "CDD type 2b denotes a macroabscess larger than 3 cm. Report abscess size in three dimensions.",
    "fa": "CDD نوع 2b ماکروآبسه بزرگ‌تر از ۳ سانتی‌متر است. اندازه آبسه باید در سه بعد گزارش شود."
  },
  "wrongExplanations": {
    "A": {
      "de": "Nach S3/DGVS 2021 liegt die Grenze zwischen Mikro- und Makroabszess bei 3 cm: bis einschließlich 3 cm CDD 2a, darüber CDD 2b.",
      "en": "In S3/DGVS 2021, the boundary between microabscess and macroabscess is 3 cm: up to and including 3 cm is CDD 2a, above 3 cm is CDD 2b.",
      "fa": "در S3/DGVS 2021 مرز آبسهٔ کوچک و بزرگ ۳ سانتی‌متر است: تا و شامل ۳ سانتی‌متر CDD 2a و بیش از ۳ سانتی‌متر CDD 2b است."
    },
    "B": {
      "de": "2 cm liegt nicht über der angegebenen Grenze von 3 cm.",
      "en": "2 cm is not above the specified boundary of 3 cm.",
      "fa": "۲ سانتی‌متر از مرز تعیین‌شدهٔ ۳ سانتی‌متر بیشتر نیست."
    },
    "D": {
      "de": "Die benannte Grenze liegt bereits bei über 3 cm, nicht erst bei über 4 cm.",
      "en": "The stated boundary is already over 3 cm, not only over 4 cm.",
      "fa": "مرز ذکرشده از بیش از۳ سانتی‌متر شروع می‌شود، نه فقط بیش از۴ سانتی‌متر."
    }
  },
  "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
},
  {
    "id": "fistula",
    "question": {
      "de": "Welcher CT-Befund spricht bei Divertikulitis besonders für eine kolovesikale Fistel?",
      "en": "Which CT finding particularly suggests a colovesical fistula in diverticulitis?",
      "fa": "کدام یافته CT در دیورتیکولیت بیشتر به نفع فیستول کولووزیکال است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Gas in der Harnblase ohne vorausgegangene Instrumentierung",
          "en": "Gas in the urinary bladder without prior instrumentation",
          "fa": "گاز داخل مثانه بدون ابزارگذاری قبلی"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Intravesikales Gas unmittelbar nach Katheterisierung",
          "en": "Intravesical gas immediately after catheterisation",
          "fa": "گاز داخل مثانه بلافاصله پس از کاتتریزاسیون"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Reaktive Harnblasenwandverdickung ohne Gas oder sichtbaren Fistelgang",
          "en": "Reactive bladder-wall thickening without gas or a visible tract",
          "fa": "ضخیم‌شدن واکنشی دیواره مثانه بدون گاز یا مسیر قابل مشاهده فیستول"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Gas ausschließlich in der Harnblasenwand bei emphysematöser Zystitis",
          "en": "Gas confined to the bladder wall in emphysematous cystitis",
          "fa": "گاز محدود به دیواره مثانه در سیستیت آمفیزماتوز"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Intravesikales Gas ohne Katheterisierung zusammen mit entzündlichem Kontakt zwischen Sigma und Blase ist ein klassischer Hinweis auf eine kolovesikale Fistel.",
      "en": "Intravesical gas without catheterisation, together with inflammatory contact between sigmoid colon and bladder, is a classic clue to a colovesical fistula.",
      "fa": "گاز داخل مثانه بدون کاتتریزاسیون همراه با تماس التهابی سیگموئید و مثانه نشانه کلاسیک فیستول کولووزیکال است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Nach Katheterisierung kann intravesikales Gas durch Instrumentierung erklärt sein.",
        "en": "After catheterisation, instrumentation can explain intravesical gas.",
        "fa": "پس از کاتتریزاسیون، ابزارگذاری می‌تواند گاز داخل مثانه را توضیح دهد."
      },
      "C": {
        "de": "Wandverdickung allein ist unspezifisch und weist keinen Fistelgang nach.",
        "en": "Wall thickening alone is non-specific and does not demonstrate a fistulous tract.",
        "fa": "ضخیم‌شدن دیواره به‌تنهایی غیراختصاصی است و مسیر فیستول را نشان نمی‌دهد."
      },
      "D": {
        "de": "Gas in der Blasenwand ist eine andere Verteilung und legt die genannte infektiöse Differenzialdiagnose nahe.",
        "en": "Gas in the bladder wall is a different distribution and suggests the stated infectious differential.",
        "fa": "گاز در دیوارهٔ مثانه توزیع دیگری دارد و افتراق عفونی ذکرشده را مطرح می‌کند."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1; https://doi.org/10.2214/ajr.144.6.1229"
  },
  {
    "id": "free-perforation",
    "question": {
      "de": "Bei akuter Divertikulitis bestehen freie intraperitoneale Luft und Flüssigkeit sowie klinische Peritonitis. Welcher CDD-Haupttyp passt zur Komplikation?",
      "en": "Acute diverticulitis is accompanied by free intraperitoneal gas and fluid and clinical peritonitis. Which main CDD category fits the complication?",
      "fa": "در دیورتیکولیت حاد، هوای آزاد و مایع داخل صفاق همراه با پریتونیت بالینی وجود دارد. کدام دستهٔ اصلی CDD با عارضه سازگار است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "CDD 2c: freie Perforation",
          "en": "CDD 2c: free perforation",
          "fa": "CDD 2c: پرفوراسیون آزاد"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "CDD 2a: Mikroabszess",
          "en": "CDD 2a: microabscess",
          "fa": "CDD 2a: آبسهٔ کوچک"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "CDD 2b: Makroabszess",
          "en": "CDD 2b: macroabscess",
          "fa": "CDD 2b: آبسهٔ بزرگ"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "CDD 1b: phlegmonöse Umgebungsreaktion",
          "en": "CDD 1b: phlegmonous surrounding reaction",
          "fa": "CDD 1b: واکنش فلگمونی اطراف"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Freie Luft und Flüssigkeit mit Peritonitiszeichen entsprechen einer freien Perforation und damit CDD Typ 2c.",
      "en": "Free gas and fluid with signs of peritonitis indicate free perforation and CDD type 2c.",
      "fa": "گاز و مایع آزاد همراه علائم پریتونیت نشان‌دهنده پرفوراسیون آزاد و CDD نوع 2c است."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein lokal begrenzter Mikroabszess bildet die beschriebene freie Perforation mit Peritonitis nicht ab.",
        "en": "A localised microabscess does not represent the described free perforation with peritonitis.",
        "fa": "آبسهٔ کوچک و محدود، پرفوراسیون آزاد همراه با پریتونیتِ توصیف‌شده را نشان نمی‌دهد."
      },
      "C": {
        "de": "Ein Makroabszess ist eine umschriebene Kollektion; hier wird freie Perforation beschrieben.",
        "en": "A macroabscess is a localised collection; free perforation is described here.",
        "fa": "آبسهٔ بزرگ کالکشن محدود است؛ در اینجا پرفوراسیون آزاد توصیف شده است."
      },
      "D": {
        "de": "Eine Phlegmone ohne freie Perforation ist weniger als die im Text beschriebene Komplikation.",
        "en": "Phlegmon without free perforation does not encompass the complication described in the vignette.",
        "fa": "فلگمون بدون پرفوراسیون آزاد، عارضهٔ توصیف‌شده در سناریو را پوشش نمی‌دهد."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  },
  {
    "id": "cancer-differential",
    "question": {
      "de": "Welcher Befund sollte bei vermeintlicher Divertikulitis besonders an ein kolorektales Karzinom denken lassen?",
      "en": "Which finding should particularly raise concern for colorectal cancer in presumed diverticulitis?",
      "fa": "کدام یافته در دیورتیکولیت فرضی باید بیشتر شک به سرطان کولورکتال ایجاد کند؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Kurze asymmetrische Wandverdickung mit suspekten Lymphknoten",
          "en": "Short asymmetric wall thickening with suspicious lymph nodes",
          "fa": "ضخیم‌شدگی کوتاه و نامتقارن دیواره همراه لنف‌نودهای مشکوک"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Ausgeprägtes Stranding um ein sichtbares entzündetes Divertikel",
          "en": "Marked stranding centred on a visible inflamed diverticulum",
          "fa": "التهاب شدید اطراف یک دیورتیکول ملتهب قابل مشاهده"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Lange gleichmäßige Wandverdickung ohne fokale Masse oder suspekte Knoten",
          "en": "Long uniform wall thickening without a focal mass or suspicious nodes",
          "fa": "ضخیم‌شدن طولانی و یکنواخت دیواره بدون تودهٔ کانونی یا غدد مشکوک"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Divertikel mit umgebungsbetonter Fettgewebsreaktion und nur geringer Wandverdickung",
          "en": "Diverticula with predominantly surrounding fat reaction and only mild wall thickening",
          "fa": "دیورتیکول‌ها با واکنش غالب چربی اطراف و ضخیم‌شدن خفیف دیواره"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Eine kurze asymmetrische oder irreguläre Stenose und suspekte Lymphknoten sind für eine unkomplizierte Divertikulitis atypisch und verlangen eine onkologische Differenzialdiagnose.",
      "en": "A short asymmetric or irregular stenosis and suspicious lymph nodes are atypical for uncomplicated diverticulitis and require an oncological differential.",
      "fa": "تنگی کوتاه نامتقارن یا نامنظم و لنف‌نودهای مشکوک برای دیورتیکولیت بدون عارضه آتیپیک‌اند و نیاز به افتراق انکولوژیک دارند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Ein sichtbares entzündetes Divertikel als Entzündungszentrum stützt eher Divertikulitis, ohne einen Tumor absolut auszuschließen.",
        "en": "A visible inflamed diverticulum at the inflammatory centre favours diverticulitis without absolutely excluding tumour.",
        "fa": "دیورتیکول ملتهبِ قابل‌مشاهده در مرکز التهاب بیشتر از دیورتیکولیت حمایت می‌کند، بدون اینکه تومور را مطلقاً رد کند."
      },
      "C": {
        "de": "Das diffuse gleichmäßige Muster enthält nicht die fokale suspekte Wand-/Knotenkonstellation der richtigen Antwort; die Ursache bleibt kontextabhängig.",
        "en": "The diffuse uniform pattern lacks the focal suspicious wall/nodal findings in the correct answer; its cause remains context-dependent.",
        "fa": "الگوی منتشر و یکنواخت، مجموعهٔ مشکوک دیوارهٔ کانونی و غددِ پاسخ درست را ندارد؛ علت آن همچنان وابسته به زمینه است."
      },
      "D": {
        "de": "Eine umgebungsbetonte Entzündung bei Divertikeln unterstützt eher Divertikulitis, ohne einen Tumor sicher auszuschließen.",
        "en": "Predominantly surrounding inflammation with diverticula favours diverticulitis without reliably excluding tumour.",
        "fa": "التهاب غالب اطراف در حضور دیورتیکول بیشتر از دیورتیکولیت حمایت می‌کند، بدون رد مطمئن تومور."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1; https://doi.org/10.1148/radiology.210.2.r99fe48429"
  },
  {
    "id": "reporting",
    "question": {
      "de": "Welche Angaben sind bei einer abszedierenden Divertikulitis besonders für die weitere Planung hilfreich?",
      "en": "Which details are particularly helpful for planning in diverticulitis with an abscess?",
      "fa": "در دیورتیکولیت همراه با آبسه، کدام اطلاعات به‌ویژه برای برنامه‌ریزی بعدی مفید است؟"
    },
    "options": [
      {
        "id": "A",
        "text": {
          "de": "Abszessmaße in drei Dimensionen, Lokalisation und Beziehung zu Nachbarstrukturen",
          "en": "Abscess dimensions in three planes, location and relationship to adjacent structures",
          "fa": "اندازه‌های آبسه در سه بُعد، محل و ارتباط با ساختارهای مجاور"
        }
      },
      {
        "id": "B",
        "text": {
          "de": "Kolonlumendurchmesser, Divertikelzahl und Wandlänge",
          "en": "Colonic lumen diameter, diverticulum count and wall length",
          "fa": "قطر لومن کولون، تعداد دیورتیکول‌ها و طول دیواره"
        }
      },
      {
        "id": "C",
        "text": {
          "de": "Länge des entzündeten Kolonsegments, regionale Lymphknoten und Fistelverdacht",
          "en": "Length of inflamed colon, regional nodes and suspicion of fistula",
          "fa": "طول قطعهٔ ملتهب کولون، غدد ناحیه‌ای و شک به فیستول"
        }
      },
      {
        "id": "D",
        "text": {
          "de": "Ausmaß des Fettgewebsstrandings, Wanddicke und Länge des entzündeten Segments",
          "en": "Extent of fat stranding, wall thickness and length of the inflamed segment",
          "fa": "میزان التهاب چربی، ضخامت دیواره و طول قطعهٔ ملتهب"
        }
      }
    ],
    "correct": "A",
    "explanation": {
      "de": "Größe, Lokalisation und Zugänglichkeit einer Kollektion sind managementrelevant. Zusätzlich müssen freie Luft, Fistel, Stenose und freie Flüssigkeit beurteilt werden.",
      "en": "Collection size, location and accessibility affect management. Free gas, fistula, stenosis and free fluid must also be assessed.",
      "fa": "اندازه، محل و قابلیت دسترسی تجمع بر درمان اثر دارد. گاز آزاد، فیستول، تنگی و مایع آزاد نیز باید ارزیابی شوند."
    },
    "wrongExplanations": {
      "B": {
        "de": "Diese Maße ersetzen weder die Abszessgröße noch seine genaue Lage.",
        "en": "These measurements replace neither abscess size nor its precise location.",
        "fa": "این اندازه‌ها جای اندازهٔ آبسه یا محل دقیق آن را نمی‌گیرند."
      },
      "C": {
        "de": "Diese Zusatzangaben charakterisieren die Kollektion für die Planung nicht ausreichend.",
        "en": "These additional details do not adequately characterise the collection for planning.",
        "fa": "این اطلاعات اضافی کالکشن را برای برنامه‌ریزی به‌اندازهٔ کافی مشخص نمی‌کنند."
      },
      "D": {
        "de": "Wanddicke und Begleitbefunde beschreiben Größe und Lage des Abszesses nicht.",
        "en": "Wall thickness and associated findings do not describe abscess size and location.",
        "fa": "ضخامت دیواره و یافته‌های همراه، اندازه و محل آبسه را توصیف نمی‌کنند."
      }
    },
    "source": "https://www.dgvs.de/leitlinien/unterer-gi-trakt/divertikelkrankheit-divertikulitis/?digital=1"
  }
]

const DIVERTICULITIS_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    DIVERTICULITIS_QUESTION_CONTENT.map(item => ({
      id: `divertikulitis-${lang}-${item.id}`,
      tags: ['divertikulitis', 'kolon', 'abdomen'],
      fach: 'abdomen',
      question: item.question[lang],
      options: item.options.map(option => ({ id: option.id, text: option.text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
      wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id,text]) => [id,text[lang]])),
      source: item.source,
    })),
  ])
)

const PANCREATITIS_QUESTION_CONTENT = [
  {
  "id": "biliary-cause",
  "question": {
    "de": "Welche Steinlokalisation kann bei einer biliären akuten Pankreatitis den gemeinsamen distalen Abfluss von Gallen- und Pankreassekret unmittelbar beeinträchtigen?",
    "en": "Which stone location can directly obstruct the shared distal outflow of bile and pancreatic secretions in acute biliary pancreatitis?",
    "fa": "در پانکراتیت حاد صفراوی، سنگ در کدام محل می‌تواند مستقیماً خروجی مشترک دیستال صفرا و ترشحات پانکراس را مختل کند؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Papillen-/Ampullenregion",
        "en": "Papillary/ampullary region",
        "fa": "ناحیهٔ پاپیلا/آمپولا"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Isolierter Ductus cysticus",
        "en": "Isolated cystic duct",
        "fa": "مجرای سیستیک به‌تنهایی"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Isolierter linker Ductus hepaticus",
        "en": "Isolated left hepatic duct",
        "fa": "مجرای کبدی چپ به‌تنهایی"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Isolierter rechter intrahepatischer Segmentgang",
        "en": "An isolated right intrahepatic segmental duct",
        "fa": "مجرای سگمنتال داخل‌کبدی راست به‌تنهایی"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Ein distaler Gallengangsstein an der Papille kann den pankreatischen Abfluss beeinträchtigen. Deshalb nach Choledocholithiasis suchen; bei unklarem Steinstatus können MRCP oder EUS weiterhelfen. Eine biliäre Ursache bedeutet nicht automatisch eine dringliche ERCP ohne Cholangitis.",
    "en": "A distal bile duct stone at the papilla can impair pancreatic drainage. Investigate choledocholithiasis; MRCP or EUS can help if stone status is uncertain. A biliary cause does not automatically mean urgent ERCP without cholangitis.",
    "fa": "سنگ انتهای مجرای صفراوی در پاپیلا می‌تواند تخلیهٔ پانکراس را مختل کند. کلدوکولیتیاز بررسی شود؛ اگر وجود سنگ نامشخص باشد، MRCP یا EUS کمک می‌کند. علت صفراوی بدون کلانژیت خودبه‌خود به معنی ERCP فوری نیست."
  },
  "wrongExplanations": {
    "B": {
      "de": "Der Ductus cysticus drainiert die Gallenblase. Seine isolierte Obstruktion verlegt nicht direkt den pankreatischen Abfluss an der Papille.",
      "en": "The cystic duct drains the gallbladder. Its isolated obstruction does not directly block pancreatic drainage at the papilla.",
      "fa": "مجرای سیستیک کیسهٔ صفرا را تخلیه می‌کند؛ انسداد منفرد آن مستقیماً خروجی پانکراس در پاپیلا را نمی‌بندد."
    },
    "C": {
      "de": "Ein linker Lebergangsstein betrifft einen proximalen biliären Abschnitt, nicht den gemeinsamen distalen Auslass mit dem Pankreasgang.",
      "en": "A left hepatic duct stone affects a proximal biliary segment, not the shared distal outlet with the pancreatic duct.",
      "fa": "سنگ مجرای کبدی چپ بخش پروگزیمال صفراوی را درگیر می‌کند، نه خروجی مشترک دیستال با مجرای پانکراس."
    },
    "D": {
      "de": "Ein isolierter intrahepatischer Segmentgang liegt ebenfalls stromaufwärts im Gallensystem; der pankreatische Auslass wird dadurch nicht unmittelbar blockiert.",
      "en": "An isolated intrahepatic segmental duct is upstream in the biliary system and does not directly block the pancreatic outlet.",
      "fa": "مجرای سگمنتال منفرد داخل‌کبدی نیز در بالادست دستگاه صفراوی است و خروجی پانکراس را مستقیماً مسدود نمی‌کند."
    }
  },
  "source": "https://doi.org/10.1016/j.pan.2025.04.020"
},
  {
  "id": "alcohol",
  "question": {
    "de": "Welcher Mechanismus wird durch Azinuszell-Experimente zur alkoholassoziierten Pankreasschädigung gestützt?",
    "en": "Which mechanism is supported by acinar-cell experiments on alcohol-associated pancreatic injury?",
    "fa": "کدام مکانیسم با آزمایش‌های سلول آسینار دربارهٔ آسیب پانکراس مرتبط با الکل پشتیبانی می‌شود؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Nichtoxidative Alkoholmetaboliten können anhaltend gestörte intrazelluläre Kalziumsignale und Azinuszellschädigung auslösen.",
        "en": "Nonoxidative alcohol metabolites can produce sustained abnormal intracellular calcium signals and acinar-cell injury.",
        "fa": "متابولیت‌های غیر اکسیداتیو الکل می‌توانند اختلال پایدار پیام‌رسانی کلسیم داخل‌سلولی و آسیب سلول آسینار ایجاد کنند."
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Eine IgG4-assoziierte lymphoplasmazelluläre Entzündung mit typischer Organbeteiligung.",
        "en": "IgG4-related lymphoplasmacytic inflammation with characteristic organ involvement.",
        "fa": "التهاب لنفوپلاسموسیتی مرتبط با IgG4 با درگیری مشخصهٔ اندام‌ها."
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Mechanische Verlegung der Papillenregion durch einen Gallengangsstein.",
        "en": "Mechanical obstruction of the papillary region by a bile duct stone.",
        "fa": "انسداد مکانیکی ناحیهٔ پاپیلا به‌وسیلهٔ سنگ مجرای صفراوی."
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Ischämische Parenchymschädigung durch primäre arterielle Minderperfusion.",
        "en": "Ischaemic parenchymal injury from primary arterial hypoperfusion.",
        "fa": "آسیب ایسکمیک پارانشیم بر اثر کاهش اولیهٔ خون‌رسانی شریانی."
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Die experimentelle Arbeit zeigt Azinuszellschädigung durch bestimmte nichtoxidative Fettsäureethylester und gestörte Kalziumsignale. Das ist ein mechanistischer Modellbefund, kein alleiniger klinischer Beweis einer alkoholischen Ätiologie und keine Aussage, dass jeder Alkoholkonsum Pankreatitis verursacht.",
    "en": "The experimental work demonstrates acinar injury from certain nonoxidative fatty acid ethyl esters and disturbed calcium signalling. This is mechanistic model evidence, not standalone clinical proof of an alcoholic aetiology or a claim that every alcohol exposure causes pancreatitis.",
    "fa": "پژوهش آزمایشگاهی آسیب آسینار ناشی از برخی اتیل‌استرهای اسید چرب حاصل از مسیر غیر اکسیداتیو و اختلال پیام‌رسانی کلسیم را نشان می‌دهد. این شاهد یک مدل مکانیستی است، نه اثبات بالینی مستقلِ علت الکلی و نه ادعای ایجاد پانکراتیت با هر مصرف الکل."
  },
  "wrongExplanations": {
    "B": {
      "de": "Das beschreibt einen immunvermittelten Zusammenhang, nicht den hier untersuchten nichtoxidativen Alkoholmetabolismus in Azinuszellen.",
      "en": "This describes an immune-mediated process, not the nonoxidative alcohol metabolism studied in acinar cells here.",
      "fa": "این توصیف فرایند ایمنی‌واسطه است، نه متابولیسم غیر اکسیداتیو الکل در سلول آسینار که اینجا بررسی شده است."
    },
    "C": {
      "de": "Das ist ein biliär-obstruktiver Mechanismus. Er erklärt nicht das experimentelle Alkoholmetaboliten-Signal.",
      "en": "This is a biliary obstructive mechanism and does not explain the experimental alcohol-metabolite signal.",
      "fa": "این مکانیسم انسدادی صفراوی است و یافتهٔ آزمایشگاهی مربوط به متابولیت الکل را توضیح نمی‌دهد."
    },
    "D": {
      "de": "Eine primäre arterielle Perfusionsstörung ist ein anderer Schädigungsweg. Die Studie prüft hier metabolitenvermittelte Azinuszellschädigung.",
      "en": "Primary arterial hypoperfusion is a different injury pathway. This study examines metabolite-mediated acinar injury.",
      "fa": "کاهش اولیهٔ پرفیوژن شریانی مسیر آسیب دیگری است؛ این مطالعه آسیب آسینار با واسطهٔ متابولیت را بررسی می‌کند."
    }
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC490004/"
},
  {
  "id": "necrosis-timing",
  "question": {
    "de": "Bei schwerer akuter Pankreatitis ohne dringliche frühere Indikation: Wann empfiehlt WSES2019 die erste kontrastverstärkte CT-Beurteilung idealerweise?",
    "en": "In severe acute pancreatitis without an urgent earlier indication, when does WSES2019 ideally recommend the first contrast-enhanced CT assessment?",
    "fa": "در پانکراتیت حاد شدید، بدون اندیکاسیون فوری برای بررسی زودتر، WSES۲۰۱۹ چه زمانی را برای نخستین ارزیابی CT با مادهٔ حاجب ایده‌آل می‌داند؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Innerhalb der ersten 24 Stunden nach Symptombeginn",
        "en": "Within the first 24 hours after symptom onset",
        "fa": "در ۲۴ ساعت نخست پس از شروع علائم"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "72–96 Stunden nach Symptombeginn",
        "en": "72–96 hours after symptom onset",
        "fa": "۷۲ تا ۹۶ ساعت پس از شروع علائم"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "7–10 Tage nach Symptombeginn",
        "en": "7–10 days after symptom onset",
        "fa": "۷ تا ۱۰ روز پس از شروع علائم"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Nach Ausbildung einer Kapsel, gewöhnlich nach etwa vier Wochen",
        "en": "After encapsulation, usually after about four weeks",
        "fa": "پس از تشکیل کپسول، معمولاً حدود چهار هفته بعد"
      }
    }
  ],
  "correct": "B",
  "explanation": {
    "de": "Dieses benannte WSES-Zeitfenster gilt für die erste Beurteilung schwerer Erkrankung. Frühe CT kann Nekrose unterschätzen; diagnostische Unsicherheit oder dringliche Komplikationen können frühere Bildgebung erfordern. Es ist kein Routinetermin für jede leichte Pankreatitis.",
    "en": "This named WSES window concerns the first assessment of severe disease. Early CT may underestimate necrosis; diagnostic uncertainty or urgent complications can require earlier imaging. It is not a routine schedule for every mild pancreatitis.",
    "fa": "این بازهٔ مشخص WSES مربوط به نخستین ارزیابی بیماری شدید است. CT زودرس ممکن است نکروز را کمتر نشان دهد؛ تردید تشخیصی یا عوارض فوری می‌توانند تصویربرداری زودتر را لازم کنند. این برنامهٔ روتین برای هر پانکراتیت خفیف نیست."
  },
  "wrongExplanations": {
    "A": {
      "de": "Für die nicht dringliche Nekrosebeurteilung ist dies zu früh; die Nekrose kann noch nicht vollständig demarkiert sein.",
      "en": "This is early for nonurgent necrosis assessment; necrosis may not yet be fully demarcated.",
      "fa": "برای ارزیابی غیرفوری نکروز زود است؛ نکروز ممکن است هنوز کاملاً مشخص نشده باشد."
    },
    "C": {
      "de": "Die genannte Erstbeurteilung schwerer Pankreatitis wird nicht routinemäßig bis zu diesem späteren Zeitpunkt hinausgeschoben.",
      "en": "The specified initial assessment of severe pancreatitis is not routinely deferred to this later interval.",
      "fa": "نخستین ارزیابی مشخص‌شدهٔ پانکراتیت شدید به‌طور روتین تا این بازهٔ دیرتر عقب انداخته نمی‌شود."
    },
    "D": {
      "de": "Kapselbildung betrifft die spätere Kollektionsterminologie und ausgewählte Interventionsplanung, nicht den Zeitpunkt der ersten CT-Beurteilung schwerer Erkrankung.",
      "en": "Encapsulation concerns later collection terminology and selected intervention planning, not the first CT assessment of severe disease.",
      "fa": "تشکیل کپسول مربوط به اصطلاحات تجمعات دیررس و برنامه‌ریزی برخی مداخلات است، نه زمان نخستین ارزیابی CT بیماری شدید."
    }
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6567462/"
},
  {
  "id": "atlanta-morphology",
  "question": {
    "de": "Welche CT-Konstellation passt zur interstitiell-ödematösen und nicht zur nekrotisierenden Pankreatitis?",
    "en": "Which CT pattern fits interstitial oedematous rather than necrotising pancreatitis?",
    "fa": "کدام الگوی CT با پانکراتیت ادماتوی بینابینی و نه پانکراتیت نکروزان سازگار است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Geschwollene, homogen kontrastierte Drüse mit Fettgewebsreaktion, ohne erkennbare pankreatische oder peripankreatische Nekrose",
        "en": "An enlarged homogeneously enhancing gland with fat stranding but no visible pancreatic or peripancreatic necrosis",
        "fa": "غدهٔ متورم با جذب همگن مادهٔ حاجب و واکنش چربی، بدون نکروز قابل مشاهدهٔ پانکراس یا اطراف آن"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Fokaler Enhancement-Ausfall im Parenchym mit angrenzender Flüssigkeit",
        "en": "Focal nonenhancing parenchyma with adjacent fluid",
        "fa": "ناحیهٔ کانونی پارانشیم بدون جذب مادهٔ حاجب همراه مایع مجاور"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Kontrastierte Drüse mit heterogenem peripankreatischem nekrotischem Material",
        "en": "An enhancing gland with heterogeneous peripancreatic necrotic material",
        "fa": "غدهٔ دارای جذب مادهٔ حاجب همراه محتوای نکروتیک ناهمگن اطراف پانکراس"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Nicht kontrastiertes Parenchym zusammen mit peripankreatischem nekrotischem Material",
        "en": "Nonenhancing parenchyma together with peripancreatic necrotic material",
        "fa": "پارانشیم فاقد جذب مادهٔ حاجب همراه محتوای نکروتیک اطراف پانکراس"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Interstitielle Pankreatitis zeigt erhaltene Parenchymanreicherung ohne erkennbare Nekrose. Nekrose kann aber isoliert peripankreatisch auftreten, obwohl die Drüse kontrastiert. Frühe CT kann das spätere Ausmaß unterschätzen.",
    "en": "Interstitial pancreatitis retains parenchymal enhancement without visible necrosis. Necrosis may, however, be isolated to peripancreatic tissues despite an enhancing gland. Early CT may underestimate its eventual extent.",
    "fa": "در پانکراتیت بینابینی جذب مادهٔ حاجب در پارانشیم حفظ می‌شود و نکروز قابل مشاهده نیست. با این حال نکروز می‌تواند فقط در بافت اطراف پانکراس وجود داشته باشد، حتی اگر غده جذب داشته باشد. CT زودرس ممکن است وسعت نهایی را کمتر نشان دهد."
  },
  "wrongExplanations": {
    "B": {
      "de": "Fokaler fehlender Parenchymkontrast kann pankreatische Nekrose anzeigen; das ist nicht das gesuchte rein interstitielle Muster.",
      "en": "Focal absent parenchymal enhancement can indicate pancreatic necrosis, rather than the purely interstitial pattern sought.",
      "fa": "نبود کانونی جذب در پارانشیم می‌تواند نشان‌دهندهٔ نکروز پانکراس باشد، نه الگوی صرفاً بینابینی مورد سؤال."
    },
    "C": {
      "de": "Erhaltene Drüsenanreicherung schließt eine isolierte peripankreatische Nekrose nicht aus. Der nichtflüssige nekrotische Inhalt unterscheidet sie von reinem Stranding oder einfacher Flüssigkeit.",
      "en": "Preserved gland enhancement does not exclude isolated peripancreatic necrosis. Nonliquid necrotic contents distinguish it from simple stranding or fluid.",
      "fa": "حفظ جذب غده نکروز منفرد اطراف پانکراس را رد نمی‌کند. محتوای نکروتیک غیرمایع آن را از واکنش سادهٔ چربی یا مایع ساده متمایز می‌کند."
    },
    "D": {
      "de": "Hier sind pankreatische und peripankreatische Nekrose kombiniert beschrieben.",
      "en": "This describes combined pancreatic and peripancreatic necrosis.",
      "fa": "این گزینه نکروز هم‌زمان پانکراس و اطراف آن را توصیف می‌کند."
    }
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "collections",
  "question": {
    "de": "Textfall: Zehn Tage nach Beginn einer interstitiell-ödematösen Pankreatitis zeigt sich eine homogene peripankreatische Flüssigkeitsansammlung ohne abgrenzbare Wand und ohne Nekrose. Welche Atlanta-Bezeichnung passt?",
    "en": "Text vignette: ten days after onset of interstitial oedematous pancreatitis, a homogeneous peripancreatic fluid collection has no definable wall or necrosis. Which Atlanta term fits?",
    "fa": "سناریوی متنی: ده روز پس از شروع پانکراتیت ادماتوی بینابینی، تجمع مایع همگن اطراف پانکراس بدون دیوارهٔ مشخص و بدون نکروز دیده می‌شود. کدام اصطلاح آتلانتا مناسب است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Akute peripankreatische Flüssigkeitskollektion (APFC)",
        "en": "Acute peripancreatic fluid collection (APFC)",
        "fa": "تجمع حاد مایع اطراف پانکراس (APFC)"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Pankreas-Pseudozyste",
        "en": "Pancreatic pseudocyst",
        "fa": "پسودوسیست پانکراس"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Akute nekrotische Kollektion (ANC)",
        "en": "Acute necrotic collection (ANC)",
        "fa": "تجمع حاد نکروتیک (ANC)"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Abgekapselte Nekrose (WON)",
        "en": "Walled-off necrosis (WON)",
        "fa": "نکروز محصورشده (WON)"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "APFC bezeichnet eine frühe reine Flüssigkeitsansammlung ohne definierte Wand bei interstitiell-ödematöser Pankreatitis. Zeit allein reicht nicht: Auch Inhalt und zugrunde liegende Pankreatitisform müssen passen.",
    "en": "APFC is an early pure fluid collection without a defined wall in interstitial oedematous pancreatitis. Time alone is insufficient: contents and the underlying pancreatitis type must also fit.",
    "fa": "APFC تجمع زودرس مایع خالص بدون دیوارهٔ مشخص در پانکراتیت ادماتوی بینابینی است. زمان به‌تنهایی کافی نیست؛ محتوا و نوع پانکراتیت زمینه‌ای نیز باید مطابقت داشته باشند."
  },
  "wrongExplanations": {
    "B": {
      "de": "Eine Pseudozyste besitzt eine ausgebildete Wand und entsteht gewöhnlich nach mehr als vier Wochen; diese frühe wandlose Ansammlung erfüllt das nicht.",
      "en": "A pseudocyst has a developed wall and usually forms after more than four weeks; this early wall-less collection does not meet that description.",
      "fa": "پسودوسیست دیوارهٔ تشکیل‌شده دارد و معمولاً بعد از بیش از چهار هفته پدید می‌آید؛ این تجمع زودرس بدون دیواره با آن تطابق ندارد."
    },
    "C": {
      "de": "ANC gehört zur nekrotisierenden Pankreatitis und enthält nekrotisches Material. Im Fall ist keine Nekrose beschrieben.",
      "en": "ANC occurs in necrotising pancreatitis and contains necrotic material. No necrosis is described in this case.",
      "fa": "ANC در پانکراتیت نکروزان رخ می‌دهد و محتوای نکروتیک دارد. در این سناریو نکروزی توصیف نشده است."
    },
    "D": {
      "de": "WON ist eine reife abgekapselte nekrotische Kollektion, typischerweise nach etwa vier Wochen; weder Inhalt noch Wand dieses Falls passen.",
      "en": "WON is a mature encapsulated necrotic collection, typically after about four weeks; neither contents nor wall in this case fit.",
      "fa": "WON تجمع نکروتیک بالغ و محصورشده است، معمولاً پس از حدود چهار هفته؛ محتوا و دیوارهٔ این سناریو با آن تطابق ندارند."
    }
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "walled-off-necrosis",
  "question": {
    "de": "Textfall: Sechs Wochen nach nekrotisierender Pankreatitis zeigt eine Kollektion eine gut ausgebildete Wand und heterogene flüssige sowie nichtflüssige nekrotische Anteile. Welche Bezeichnung passt am besten?",
    "en": "Text vignette: six weeks after necrotising pancreatitis, a collection has a well-formed wall and heterogeneous fluid and nonliquid necrotic components. Which term fits best?",
    "fa": "سناریوی متنی: شش هفته پس از پانکراتیت نکروزان، تجمعی با دیوارهٔ کامل و اجزای ناهمگن مایع و نکروتیک غیرمایع وجود دارد. کدام اصطلاح مناسب‌تر است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Abgekapselte Nekrose (WON)",
        "en": "Walled-off necrosis (WON)",
        "fa": "نکروز محصورشده (WON)"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Pankreas-Pseudozyste",
        "en": "Pancreatic pseudocyst",
        "fa": "پسودوسیست پانکراس"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Akute peripankreatische Flüssigkeitskollektion (APFC)",
        "en": "Acute peripancreatic fluid collection (APFC)",
        "fa": "تجمع حاد مایع اطراف پانکراس (APFC)"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Akute nekrotische Kollektion (ANC)",
        "en": "Acute necrotic collection (ANC)",
        "fa": "تجمع حاد نکروتیک (ANC)"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Die Kombination aus reifer Kapsel und nekrotischem Inhalt nach nekrotisierender Pankreatitis entspricht WON. Die Kapsel allein trennt WON nicht von Pseudozyste; entscheidend ist auch der Inhalt.",
    "en": "A mature capsule plus necrotic contents after necrotising pancreatitis corresponds to WON. A capsule alone does not distinguish WON from a pseudocyst; contents also matter.",
    "fa": "ترکیب کپسول بالغ و محتوای نکروتیک پس از پانکراتیت نکروزان با WON مطابقت دارد. کپسول به‌تنهایی WON را از پسودوسیست جدا نمی‌کند؛ محتوا نیز تعیین‌کننده است."
  },
  "wrongExplanations": {
    "B": {
      "de": "Eine Pseudozyste enthält im Wesentlichen Flüssigkeit ohne feste nekrotische Komponenten. Die beschriebenen nichtflüssigen Nekrosen sprechen für WON.",
      "en": "A pseudocyst contains essentially fluid without solid necrotic components. The nonliquid necrosis described favours WON.",
      "fa": "پسودوسیست عمدتاً مایع و فاقد اجزای نکروتیک جامد است. نکروز غیرمایعِ توصیف‌شده به نفع WON است."
    },
    "C": {
      "de": "APFC ist eine frühe wandlose Flüssigkeitsansammlung bei interstitieller Pankreatitis, nicht diese reife nekrotische Kollektion.",
      "en": "APFC is an early wall-less fluid collection in interstitial pancreatitis, not this mature necrotic collection.",
      "fa": "APFC تجمع مایع زودرس و بدون دیواره در پانکراتیت بینابینی است، نه این تجمع نکروتیک بالغ."
    },
    "D": {
      "de": "ANC bezeichnet die frühe nekrotische Kollektion ohne ausgereifte Wand; die jetzt vollständig abgekapselte Form wird WON genannt.",
      "en": "ANC is the early necrotic collection without a mature wall; the now fully encapsulated form is called WON.",
      "fa": "ANC تجمع نکروتیک زودرس بدون دیوارهٔ بالغ است؛ شکل اکنون کاملاً محصورشده WON نام دارد."
    }
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "ctsi-severe",
  "question": {
    "de": "Textfall: CTSI 8 bei akuter Pankreatitis. Welche zusätzliche Information ist für die Einstufung als klinisch schwere Pankreatitis nach revidierter Atlanta-Klassifikation entscheidend?",
    "en": "Text vignette: acute pancreatitis has a CTSI of 8. Which additional information determines classification as clinically severe pancreatitis under revised Atlanta?",
    "fa": "سناریوی متنی: CTSI در پانکراتیت حاد ۸ است. کدام اطلاعات تکمیلی برای طبقه‌بندی پانکراتیت از نظر بالینی شدید در آتلانتای بازنگری‌شده تعیین‌کننده است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Prozentualer Anteil der Parenchymnekrose",
        "en": "Percentage of parenchymal necrosis",
        "fa": "درصد نکروز پارانشیم"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Anzahl und Ausdehnung peripankreatischer Kollektionen",
        "en": "Number and extent of peripancreatic collections",
        "fa": "تعداد و وسعت تجمعات اطراف پانکراس"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Persistierendes Organversagen über mehr als 48 Stunden",
        "en": "Persistent organ failure for more than 48 hours",
        "fa": "نارسایی پایدار عضو به مدت بیش از ۴۸ ساعت"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Höhe des CRP-Werts am dritten Krankheitstag",
        "en": "CRP concentration on the third day of illness",
        "fa": "میزان CRP در روز سوم بیماری"
      }
    }
  ],
  "correct": "C",
  "explanation": {
    "de": "Ein hoher CTSI beschreibt die CT-Morphologie. Klinisch schwere akute Pankreatitis nach revidiertem Atlanta ist durch persistierendes Organversagen >48 Stunden definiert. Morphologische Komplikationen und Entzündungsmarker sind wichtig, ersetzen diese klinische Definition aber nicht.",
    "en": "A high CTSI describes CT morphology. Revised Atlanta defines clinically severe acute pancreatitis by persistent organ failure >48 hours. Morphological complications and inflammatory markers matter but do not replace that clinical definition.",
    "fa": "CTSI بالا مورفولوژی CT را توصیف می‌کند. آتلانتای بازنگری‌شده پانکراتیت حاد از نظر بالینی شدید را با نارسایی پایدار عضو بیش از ۴۸ ساعت تعریف می‌کند. عوارض مورفولوژیک و نشانگرهای التهاب مهم‌اند، اما جای این تعریف بالینی را نمی‌گیرند."
  },
  "wrongExplanations": {
    "A": {
      "de": "Der Nekroseanteil beeinflusst den morphologischen CTSI. Er ist nicht allein die klinische Atlanta-Definition schwerer Erkrankung.",
      "en": "Necrosis extent contributes to morphological CTSI, not by itself to the clinical Atlanta definition of severe disease.",
      "fa": "وسعت نکروز در CTSI مورفولوژیک نقش دارد؛ به‌تنهایی تعریف بالینی بیماری شدید در آتلانتا نیست."
    },
    "B": {
      "de": "Kollektionen sind lokale Komplikationen. Ohne persistierendes Organversagen belegen sie keine klinisch schwere Atlanta-Pankreatitis.",
      "en": "Collections are local complications. Without persistent organ failure they do not establish clinically severe Atlanta pancreatitis.",
      "fa": "تجمعات عوارض موضعی‌اند و بدون نارسایی پایدار عضو، پانکراتیت از نظر بالینی شدید آتلانتا را اثبات نمی‌کنند."
    },
    "D": {
      "de": "CRP kann bei der Risikoeinschätzung helfen. Ein Laborwert ersetzt aber nicht die gefragte Organfunktions- und Verlaufsdefinition.",
      "en": "CRP can inform risk assessment but does not replace the organ-function and duration definition asked here.",
      "fa": "CRP می‌تواند به ارزیابی خطر کمک کند، اما جای تعریف مبتنی بر عملکرد عضو و مدت آن را نمی‌گیرد."
    }
  },
  "source": "https://doi.org/10.1136/gutjnl-2012-302779"
},
  {
  "id": "pseudoaneurysm",
  "question": {
    "de": "Textfall: Bei Pankreatitis zeigt die arterielle Kontrastphase einen rundlichen, scharf begrenzten Fokus in einer Kollektion mit deutlicher arterieller Anreicherung und erkennbarem Anschluss an einen Arterienast. Welche Komplikation ist am ehesten gemeint?",
    "en": "Text vignette: in pancreatitis, the arterial phase shows a rounded, sharply defined focus within a collection, with marked arterial enhancement and visible continuity with an arterial branch. Which complication is most likely?",
    "fa": "سناریوی متنی: در پانکراتیت، فاز شریانی کانونی گرد و واضح درون یک تجمع نشان می‌دهد که جذب شریانی واضح مادهٔ حاجب و ارتباط قابل مشاهده با شاخهٔ شریانی دارد. کدام عارضه محتمل‌تر است؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Arterielles Pseudoaneurysma",
        "en": "Arterial pseudoaneurysm",
        "fa": "پسودوآنوریسم شریانی"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Rein flüssige Pseudozyste",
        "en": "A pure fluid pseudocyst",
        "fa": "پسودوسیست حاوی مایع خالص"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Nicht perfundierte Parenchymnekrose",
        "en": "Nonperfused parenchymal necrosis",
        "fa": "نکروز پارانشیم بدون پرفیوژن"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Milzvenenthrombose",
        "en": "Splenic vein thrombosis",
        "fa": "ترومبوز ورید طحالی"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Arterielle Anreicherung innerhalb einer Kollektion mit Anschluss an einen Arterienast ist verdächtig auf ein Pseudoaneurysma. Es kann eine Blutungsquelle sein und verlangt zeitnahe fachübergreifende Gefäßabklärung.",
    "en": "Arterial enhancement within a collection with continuity to an arterial branch raises concern for a pseudoaneurysm. It may be a bleeding source and warrants timely multidisciplinary vascular evaluation.",
    "fa": "جذب شریانی مادهٔ حاجب درون تجمع همراه ارتباط با شاخهٔ شریانی به پسودوآنوریسم مشکوک است. این ضایعه می‌تواند منبع خونریزی باشد و بررسی عروقی به‌موقع و چندتخصصی می‌خواهد."
  },
  "wrongExplanations": {
    "B": {
      "de": "Reine Flüssigkeit zeigt keine kräftige innere arterielle Anreicherung mit arterieller Verbindung. Eine Zyste kann das Pseudoaneurysma aber umgeben.",
      "en": "Pure fluid does not show strong internal arterial enhancement with arterial continuity. A cyst may, however, surround a pseudoaneurysm.",
      "fa": "مایع خالص جذب شریانی شدید داخلی همراه اتصال شریانی ندارد؛ البته کیست می‌تواند پسودوآنوریسم را احاطه کند."
    },
    "C": {
      "de": "Nicht perfundierte Nekrose nimmt gerade kein Kontrastmittel wie die Arterie auf; sie erklärt den beschriebenen arteriellen Fokus nicht.",
      "en": "Nonperfused necrosis does not enhance like an artery and does not explain the arterial focus described.",
      "fa": "نکروز بدون پرفیوژن مانند شریان مادهٔ حاجب جذب نمی‌کند و کانون شریانی توصیف‌شده را توضیح نمی‌دهد."
    },
    "D": {
      "de": "Eine Venenthrombose ist ein venöser Füllungsdefekt, nicht ein kontrastgefüllter Fokus mit arterieller Verbindung.",
      "en": "Venous thrombosis is a venous filling defect, not a contrast-filled focus continuous with an artery.",
      "fa": "ترومبوز وریدی نقص پرشدگی ورید است، نه کانون پُرشده از مادهٔ حاجب با اتصال شریانی."
    }
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3291674/"
},
  {
  "id": "infected-necrosis",
  "question": {
    "de": "Welche CT-Beobachtung erhöht bei bekannter nekrotisierender Pankreatitis den Verdacht auf infizierte Nekrose am stärksten, wenn weder Intervention noch enterische Fistel vorliegen?",
    "en": "Which CT observation most strongly raises concern for infected necrosis in known necrotising pancreatitis when there has been no intervention or enteric fistula?",
    "fa": "در پانکراتیت نکروزان شناخته‌شده و در نبود مداخله یا فیستول روده‌ای، کدام مشاهدهٔ CT بیش از بقیه شک به نکروز عفونی را افزایش می‌دهد؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Gasblasen innerhalb der nekrotischen Kollektion",
        "en": "Gas bubbles within the necrotic collection",
        "fa": "حباب گاز درون تجمع نکروتیک"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Heterogener nekrotischer Inhalt ohne Gas",
        "en": "Heterogeneous necrotic contents without gas",
        "fa": "محتوای نکروتیک ناهمگن بدون گاز"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Eine kontrastmittelaufnehmende Kapsel ohne Gas",
        "en": "An enhancing capsule without gas",
        "fa": "کپسول دارای جذب مادهٔ حاجب بدون گاز"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Peripankreatisches Fett-Stranding ohne Gas",
        "en": "Peripancreatic fat stranding without gas",
        "fa": "واکنش چربی اطراف پانکراس بدون گاز"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Gas in Nekrose ist im genannten Kontext ein starker Infektionshinweis, aber nicht bei jeder infizierten Nekrose vorhanden. Fehlendes Gas schließt eine Infektion nicht aus. Klinik, Verlauf und mögliche alternative Gasursachen bleiben wichtig.",
    "en": "Gas in necrosis is a strong infection clue in this context but is absent in many infected necroses. Lack of gas does not exclude infection. Clinical status, evolution and alternative causes of gas remain important.",
    "fa": "گاز در نکروز در این زمینه سرنخ قوی عفونت است، اما در بسیاری از نکروزهای عفونی وجود ندارد. نبود گاز عفونت را رد نمی‌کند. وضعیت بالینی، سیر و علل جایگزین گاز همچنان مهم‌اند."
  },
  "wrongExplanations": {
    "B": {
      "de": "Heterogenität gehört zum nekrotischen Inhalt und beweist dessen Infektion nicht. Infektion kann dennoch auch ohne Gas bestehen.",
      "en": "Heterogeneity describes necrotic contents and does not establish infection. Infection may nevertheless occur without gas.",
      "fa": "ناهمگنی ویژگی محتوای نکروتیک است و عفونت آن را ثابت نمی‌کند؛ با این حال عفونت می‌تواند بدون گاز نیز وجود داشته باشد."
    },
    "C": {
      "de": "Eine aufnehmende Kapsel zeigt Organisation/Reifung der Kollektion. Sie ist kein alleiniger Infektionsnachweis.",
      "en": "An enhancing capsule indicates organisation/maturation of the collection, not infection by itself.",
      "fa": "کپسول دارای جذب نشانهٔ سازمان‌یافتن/بلوغ تجمع است، نه اثبات مستقل عفونت."
    },
    "D": {
      "de": "Fett-Stranding ist eine unspezifische Entzündungsreaktion und weniger spezifisch für infizierte Nekrose als das hier gefragte Gaszeichen.",
      "en": "Fat stranding is a nonspecific inflammatory reaction and less specific for infected necrosis than the gas finding asked here.",
      "fa": "واکنش چربی پاسخ التهابی غیراختصاصی است و نسبت به علامت گازِ مورد سؤال اختصاصیت کمتری برای نکروز عفونی دارد."
    }
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6567462/"
},
  {
  "id": "carcinoma-dd",
  "question": {
    "de": "Welche Befundkombination gewichtet ein Pankreaskarzinom gegenüber einer chronisch entzündlichen Raumforderung stärker?",
    "en": "Which combination favours pancreatic carcinoma over a chronic inflammatory mass?",
    "fa": "کدام ترکیب یافته‌ها احتمال سرطان پانکراس را نسبت به تودهٔ التهابی مزمن بیشتر می‌کند؟"
  },
  "options": [
    {
      "id": "A",
      "text": {
        "de": "Abrupter Gangabbruch mit konsekutiver Schwanzatrophie",
        "en": "Abrupt duct cut-off with upstream tail atrophy",
        "fa": "قطع ناگهانی مجرا همراه آتروفی دم پانکراس"
      }
    },
    {
      "id": "B",
      "text": {
        "de": "Duct-penetrating-sign",
        "en": "Duct-penetrating sign",
        "fa": "علامت duct-penetrating"
      }
    },
    {
      "id": "C",
      "text": {
        "de": "Intraduktale und parenchymale Verkalkungen",
        "en": "Intraductal and parenchymal calcifications",
        "fa": "کلسیفیکاسیون داخل مجرا و پارانشیم"
      }
    },
    {
      "id": "D",
      "text": {
        "de": "Perlschnurartig wechselnde Gangweiten",
        "en": "Chain-of-lakes ductal irregularity",
        "fa": "نامنظمی زنجیره‌ای مجرا"
      }
    }
  ],
  "correct": "A",
  "explanation": {
    "de": "Ein abrupter fokaler Gangabbruch mit vorgeschalteter Parenchymatrophie ist verdächtig auf einen obstruierenden Tumor. Ein durch die Masse verlaufender, verengter Gang gewichtet eher Entzündung; kein Einzelzeichen schließt Karzinom sicher aus. Voraufnahmen und weitere Abklärung nach Gesamtkontext.",
    "en": "Abrupt focal duct cut-off with upstream parenchymal atrophy raises concern for an obstructing tumour. A narrowed duct traversing the mass favours inflammation, but no single sign safely excludes carcinoma. Compare prior studies and investigate according to the overall context.",
    "fa": "قطع ناگهانی و کانونی مجرا با آتروفی پارانشیم بالادست به تومور انسدادی مشکوک است. مجرای تنگی که از درون توده می‌گذرد بیشتر به نفع التهاب است، اما هیچ علامت منفردی سرطان را با اطمینان رد نمی‌کند. تصاویر قبلی و بررسی تکمیلی بر پایهٔ کل زمینه ارزیابی شوند."
  },
  "wrongExplanations": {
    "B": {
      "de": "Das Duct-penetrating-Zeichen gewichtet eine entzündliche Masse: Ein Gang bleibt durch die Läsion hindurch sichtbar, oft verengt. Es ist kein absoluter Ausschlussbeweis.",
      "en": "The duct-penetrating sign favours an inflammatory mass: a duct remains visible traversing the lesion, often narrowed. It is not absolute exclusion evidence.",
      "fa": "علامت عبور مجرا بیشتر به نفع تودهٔ التهابی است؛ مجرا از درون ضایعه قابل مشاهده می‌ماند و اغلب تنگ است. این شاهد قطعی برای رد سرطان نیست."
    },
    "C": {
      "de": "Intraduktale und parenchymale Verkalkungen stützen chronische Pankreatitis. Ein zusätzliches Karzinom bei chronischer Pankreatitis bleibt möglich.",
      "en": "Intraductal and parenchymal calcifications support chronic pancreatitis. A coexisting carcinoma remains possible.",
      "fa": "کلسیفیکاسیون داخل‌مجرایی و پارانشیمی از پانکراتیت مزمن حمایت می‌کند؛ سرطان هم‌زمان همچنان ممکن است."
    },
    "D": {
      "de": "Wechselnde Gangweiten mit Strikturen passen zur chronischen Gangveränderung; gesucht ist der fokale abrupte Abbruch mit vorgeschalteter Atrophie.",
      "en": "Alternating duct calibre and strictures fit chronic ductal change; the question seeks abrupt focal cut-off with upstream atrophy.",
      "fa": "قطر متناوب مجرا و تنگی‌ها با تغییرات مزمن مجرا سازگارند؛ سؤال قطع ناگهانی کانونی همراه آتروفی بالادست را هدف گرفته است."
    }
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/11568327/"
},
]

const PANCREATITIS_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    PANCREATITIS_QUESTION_CONTENT.map(item => ({
      id: `pankreatitis-${lang}-${item.id}`,
      tags: ['pankreatitis', 'akute-pankreatitis', 'chronische-pankreatitis', 'abdomen'],
      fach: 'abdomen',
      question: item.question[lang],
      options: item.options.map(option => ({ id: option.id, text: option.text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
      ...(item.wrongExplanations ? { wrongExplanations: Object.fromEntries(Object.entries(item.wrongExplanations).map(([id, texts]) => [id, texts[lang]])), source: item.source } : {}),
    })),
  ])
)

const MIDLINE_CAVA_QUESTION_CONTENT = [
  {
    id: 'flow',
    question: {
      de: 'Welche Reihenfolge beschreibt den physiologischen Liquorfluss korrekt?',
      en: 'Which sequence correctly describes physiological CSF flow?',
      fa: 'کدام ترتیب، مسیر طبیعی جریان CSF را به‌درستی نشان می‌دهد؟',
    },
    options: [
      { id: 'A', text: { de: 'Seitenventrikel → Foramina Monroi → 3. Ventrikel → Aquädukt → 4. Ventrikel → Magendie/Luschka', en: 'Lateral ventricles → foramina of Monro → third ventricle → aqueduct → fourth ventricle → Magendie/Luschka', fa: 'بطن‌های جانبی ← سوراخ‌های مونرو ← بطن سوم ← مجرای مغزی ← بطن چهارم ← ماژندی/لوشکا' } },
      { id: 'B', text: { de: 'Seitenventrikel → Aquädukt → 3. Ventrikel → Foramen Monroi → 4. Ventrikel', en: 'Lateral ventricles → aqueduct → third ventricle → foramen of Monro → fourth ventricle', fa: 'بطن‌های جانبی ← مجرای مغزی ← بطن سوم ← سوراخ مونرو ← بطن چهارم' } },
      { id: 'C', text: { de: '3. Ventrikel → Foramina Luschkae → Seitenventrikel → Aquädukt', en: 'Third ventricle → foramina of Luschka → lateral ventricles → aqueduct', fa: 'بطن سوم ← سوراخ‌های لوشکا ← بطن‌های جانبی ← مجرای مغزی' } },
      { id: 'D', text: { de: '4. Ventrikel → Foramina Monroi → 3. Ventrikel → Arachnoidalgranulationen', en: 'Fourth ventricle → foramina of Monro → third ventricle → arachnoid granulations', fa: 'بطن چهارم ← سوراخ‌های مونرو ← بطن سوم ← گرانولاسیون‌های آراکنوئید' } },
    ],
    correct: 'A',
    explanation: {
      de: 'Liquor fließt aus den Seitenventrikeln über die Foramina Monroi in den 3. Ventrikel, durch den Aquädukt in den 4. Ventrikel und anschließend über Magendie und Luschka in den Subarachnoidalraum.',
      en: 'CSF flows from the lateral ventricles through the foramina of Monro into the third ventricle, through the aqueduct into the fourth ventricle, then through Magendie and Luschka into the subarachnoid space.',
      fa: 'CSF از بطن‌های جانبی از طریق سوراخ‌های مونرو وارد بطن سوم می‌شود، سپس از مجرای مغزی به بطن چهارم و از سوراخ‌های ماژندی و لوشکا به فضای ساب‌آراکنوئید می‌رسد.',
    },
  },
  {
    id: 'aqueduct',
    question: {
      de: 'Welche Ventrikelkonfiguration spricht am ehesten für eine Aquäduktstenose?',
      en: 'Which ventricular configuration most strongly suggests aqueduct stenosis?',
      fa: 'کدام الگوی بطنی بیش از همه به نفع تنگی مجرای مغزی است؟',
    },
    options: [
      { id: 'A', text: { de: 'Nur der rechte Seitenventrikel ist erweitert.', en: 'Only the right lateral ventricle is enlarged.', fa: 'فقط بطن جانبی راست متسع است.' } },
      { id: 'B', text: { de: 'Seitenventrikel und 3. Ventrikel sind erweitert, der 4. Ventrikel ist normal weit.', en: 'The lateral and third ventricles are enlarged while the fourth ventricle remains normal.', fa: 'بطن‌های جانبی و سوم متسع‌اند ولی بطن چهارم اندازه طبیعی دارد.' } },
      { id: 'C', text: { de: 'Nur der 4. Ventrikel ist erweitert.', en: 'Only the fourth ventricle is enlarged.', fa: 'فقط بطن چهارم متسع است.' } },
      { id: 'D', text: { de: 'Alle Ventrikel und kortikalen Sulci sind proportional erweitert.', en: 'All ventricles and cortical sulci are proportionally enlarged.', fa: 'همه بطن‌ها و شیارهای کورتیکال به‌طور متناسب گشاد شده‌اند.' } },
    ],
    correct: 'B',
    explanation: {
      de: 'Bei einer Aquäduktstenose staut sich Liquor proximal der Obstruktion: Seitenventrikel und 3. Ventrikel erweitern sich, während der distal gelegene 4. Ventrikel normal bleibt.',
      en: 'Aqueduct stenosis causes upstream CSF obstruction: the lateral and third ventricles enlarge while the downstream fourth ventricle remains normal.',
      fa: 'در تنگی مجرای مغزی، CSF در بخش پروگزیمال جمع می‌شود؛ بنابراین بطن‌های جانبی و سوم متسع می‌شوند ولی بطن چهارم که دیستال انسداد است طبیعی می‌ماند.',
    },
  },
  {
    id: 'hydrocephalus-atrophy',
    question: {
      de: 'Welche Befundkombination spricht eher für einen aktiven Hydrozephalus als für eine Ex-vacuo-Erweiterung bei Atrophie?',
      en: 'Which combination favours active hydrocephalus over ex-vacuo ventricular enlargement due to atrophy?',
      fa: 'کدام ترکیب یافته بیشتر به نفع هیدروسفالی فعال است تا اتساع ex vacuo ناشی از آتروفی؟',
    },
    options: [
      { id: 'A', text: { de: 'Proportional erweiterte Ventrikel und kortikale Sulci ohne Verlaufänderung', en: 'Proportionally enlarged ventricles and cortical sulci without interval change', fa: 'اتساع متناسب بطن‌ها و شیارهای کورتیکال بدون تغییر در پیگیری' } },
      { id: 'B', text: { de: 'Erweiterte Temporalhörner, enge Sulci und transependymaler Liquorübertritt', en: 'Enlarged temporal horns, tight sulci and transependymal CSF flow', fa: 'اتساع شاخ‌های تمپورال، تنگی شیارها و جریان ترانس‌اپاندیمال CSF' } },
      { id: 'C', text: { de: 'Breite kortikale Sulci bei ausgeprägtem globalem Volumenverlust', en: 'Wide cortical sulci with marked global volume loss', fa: 'شیارهای کورتیکال گشاد همراه کاهش واضح حجم کلی مغز' } },
      { id: 'D', text: { de: 'Isoliertes persistierendes Cavum septi pellucidi', en: 'An isolated persistent cavum septi pellucidi', fa: 'کاووم سپتی پلوسیدی پایدار و منفرد' } },
    ],
    correct: 'B',
    explanation: {
      de: 'Disproportionale Ventrikelerweiterung, frühe Temporalhorndilatation, Sulcuseffacement und transependymaler Liquorübertritt sprechen für erhöhten intraventrikulären Druck. Bei Atrophie sind Ventrikel und Sulci eher proportional erweitert.',
      en: 'Disproportionate ventricular enlargement, early temporal-horn dilatation, sulcal effacement and transependymal flow favour raised intraventricular pressure. Atrophy tends to enlarge ventricles and sulci proportionally.',
      fa: 'اتساع نامتناسب بطن‌ها، گشادشدن زودرس شاخ‌های تمپورال، محو شدن شیارها و جریان ترانس‌اپاندیمال به نفع افزایش فشار داخل بطنی است. در آتروفی، بطن‌ها و شیارها معمولاً متناسب گشاد می‌شوند.',
    },
  },
]

const MIDLINE_CAVA_QUESTIONS = Object.fromEntries(
  ['de', 'en', 'fa'].map(lang => [
    lang,
    MIDLINE_CAVA_QUESTION_CONTENT.map(item => ({
      id: `liquorraeume-ventrikelsystem-${lang}-${item.id}`,
      tags: ['liquorraeume-ventrikelsystem', 'cavum', 'gehirn'],
      fach: 'gehirn',
      question: item.question[lang],
      options: item.options.map(option => ({ id: option.id, text: option.text[lang] })),
      correct: item.correct,
      explanation: item.explanation[lang],
    })),
  ])
)

const LEGACY_QUESTION_BANK = {
  "de": [
    ...GEHIRN_CHIARI_QUESTIONS.de,
    ...GEHIRN_NF1_QUESTIONS.de,
    ...GEHIRN_PRES_QUESTIONS.de,
    ...CONTRAST_QUESTIONS.de,
    ...DIVERTICULITIS_QUESTIONS.de,
    ...PANCREATITIS_QUESTIONS.de,
    ...STROKE_QUESTIONS.de,
    ...ICB_QUESTIONS.de,
    ...HIE_QUESTIONS.de,
    ...SAB_QUESTIONS('de'),
    ...EDH_QUESTIONS.de,
    ...MIDLINE_CAVA_QUESTIONS.de,
    ...SDH_QUESTIONS.de,
    ...DISSECTION_QUESTIONS.de,
    ...MOYAMOYA_QUESTIONS.de,
    ...HMA_QUESTIONS.de,
    ...CAA_QUESTIONS.de,
    ...MIGRAINE_QUESTIONS.de,
    ...CADASIL_QUESTIONS.de,
    ...DVA_QUESTIONS.de,
    ...KAVERNOM_QUESTIONS.de,
    ...NPH_QUESTIONS.de,
    ...TELEANGIEKTASIE_QUESTIONS.de,
    ...SVT_QUESTIONS.de,
    ...FRAKTUR_QUESTIONS.de,
    ...DAVF_QUESTIONS.de,
    ...AVM_QUESTIONS.de,
    ...FRAKTUR_KINDER_QUESTIONS.de,
    ...AK_LUXATION_QUESTIONS.de,
    ...RADIUSKOPF_QUESTIONS.de,
    ...UNTERARM_QUESTIONS.de,
    ...DISTALE_RADIUS_QUESTIONS.de,
    ...SCAPHOID_QUESTIONS.de,
    ...THUMB_UCL_QUESTIONS.de,
    ...KNIE_LIGAMENTE_QUESTIONS.de,
    ...SPINE_TRAUMA_QUESTIONS.de,
    ...HRCT_QUESTIONS.de,
    ...MAMMA_MRT_QUESTIONS.de,
    ...MAMMA_MRT_LESION_QUESTIONS.de,
    ...MAMMA_KAISER_QUESTIONS.de,
    ...MAMMA_MRT_SPECIAL_CARCINOMA_QUESTIONS.de,
    ...MAMMOGRAPHY_BASICS_QUESTIONS.de,
    ...MAMMOGRAPHY_CALCIFICATIONS_QUESTIONS.de,
    ...CARDIOMYOPATHY_QUESTIONS.de,
    ...ARVC_QUESTIONS.de,
    ...MYOCARDIAL_INJURY_QUESTIONS.de,
    ...FLEISCHNER_QUESTIONS.de,
    ...MENISCUS_QUESTIONS.de,
    {
      "id": "haemangiom-de-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt ein Leberhämangiom am korrektesten?",
      "options": [
        {
          "id": "A",
          "text": "Kavernöse nicht-neoplastische Malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatische Metastase mit Nekrose"
        },
        {
          "id": "C",
          "text": "Präkanzeröse hepatozelluläre Läsion"
        },
        {
          "id": "D",
          "text": "Bakterieller Leberabszess"
        }
      ],
      "correct": "A",
      "explanation": "Ein Leberhämangiom ist eine kavernöse, nicht-neoplastische vaskuläre Malformation und der häufigste gutartige solide Lebertumor."
    },
    {
      "id": "haemangiom-de-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Sonographiebefund ist typisch für ein kleines Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Scharf begrenzte echoreiche Läsion"
        },
        {
          "id": "B",
          "text": "Unscharfe hypoechogene Läsion mit Kapselretraktion"
        },
        {
          "id": "C",
          "text": "Gasreflexe mit dorsalem Schallschatten"
        },
        {
          "id": "D",
          "text": "Diffuse Wandverdickung der Gallenblase"
        }
      ],
      "correct": "A",
      "explanation": "Typische Hämangiome sind sonographisch meistens echoreich und scharf begrenzt. Bei klassischer Sonomorphologie ist häufig keine weitere Diagnostik notwendig."
    },
    {
      "id": "haemangiom-de-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welches dynamische CT-Muster ist klassisch für ein Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Peripher-noduläre diskontinuierliche KM-Aufnahme mit zentripetaler Auffüllung"
        },
        {
          "id": "B",
          "text": "Arterielles Wash-in mit portalvenösem Wash-out und Kapsel"
        },
        {
          "id": "C",
          "text": "Dünnwandige Läsion ohne KM-Aufnahme"
        },
        {
          "id": "D",
          "text": "Diffuses infiltratives Wachstum entlang der Gallenwege"
        }
      ],
      "correct": "A",
      "explanation": "Klassisch ist eine randständige, noduläre und diskontinuierliche Kontrastmittelaufnahme, die sich in späteren Phasen zentripetal auffüllt."
    },
    {
      "id": "haemangiom-de-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Was beschreibt das Irisblendenphänomen beim Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Auffüllung der Läsion von peripher nach zentral"
        },
        {
          "id": "B",
          "text": "Zentrales Wash-out in der Spätphase"
        },
        {
          "id": "C",
          "text": "Abrupter Perfusionsstopp am Leberhilus"
        },
        {
          "id": "D",
          "text": "Ringförmige Abszesskapsel"
        }
      ],
      "correct": "A",
      "explanation": "Das Irisblendenphänomen beschreibt die zentripetale Kontrastmittelauffüllung vom Rand zur Mitte."
    },
    {
      "id": "haemangiom-de-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher MRT-Befund ist besonders typisch für ein klassisches Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Sehr hohes T2-Signal im Sinne eines Light-bulb-Zeichens"
        },
        {
          "id": "B",
          "text": "Ausgeprägtes T1-hyperintenses Fettareal mit Signalabfall in opposed phase"
        },
        {
          "id": "C",
          "text": "Niedriges T2-Signal wie fibrotisches Gewebe"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrale Diffusionsrestriktion ohne KM-Aufnahme"
        }
      ],
      "correct": "A",
      "explanation": "Das klassische Hämangiom ist in T2 sehr hell, oft sogar heller als Galle. Dieses Light-bulb-Zeichen ist ein wichtiger diagnostischer Hinweis."
    },
    {
      "id": "haemangiom-de-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie ist die DWI/ADC-Konstellation beim typischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "DWI hell, ADC hoch: T2-shine-through"
        },
        {
          "id": "B",
          "text": "DWI hell, ADC niedrig: sichere Restriktion"
        },
        {
          "id": "C",
          "text": "DWI dunkel, ADC nicht messbar"
        },
        {
          "id": "D",
          "text": "DWI und ADC immer unauffällig"
        }
      ],
      "correct": "A",
      "explanation": "Hämangiome können auf hohen b-Werten hyperintens sein. Hohe ADC-Werte zeigen aber T2-shine-through und keine echte Diffusionsrestriktion."
    },
    {
      "id": "haemangiom-de-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Wie erscheint ein typisches Hämangiom in späteren Kontrastmittelphasen?",
      "options": [
        {
          "id": "A",
          "text": "Zunehmend homogen/isodens durch zentripetale Auffüllung"
        },
        {
          "id": "B",
          "text": "Immer vollständig hypodens ohne Aufnahme"
        },
        {
          "id": "C",
          "text": "Frühes Wash-out mit Pseudokapsel"
        },
        {
          "id": "D",
          "text": "Nur randständig gasgefüllt"
        }
      ],
      "correct": "A",
      "explanation": "In der portalvenösen und späten Phase nimmt die zentripetale Auffüllung zu. Die Läsion nähert sich der Blutbahn bzw. dem Leberparenchym an."
    },
    {
      "id": "haemangiom-de-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Warum können größere Hämangiome inhomogen aussehen?",
      "options": [
        {
          "id": "A",
          "text": "Durch Fibrosierung, Verkalkungen oder Thromben"
        },
        {
          "id": "B",
          "text": "Durch obligate maligne Entartung"
        },
        {
          "id": "C",
          "text": "Durch Luft in den Gallengängen"
        },
        {
          "id": "D",
          "text": "Durch fokale Fettinfiltration der Nierenrinde"
        }
      ],
      "correct": "A",
      "explanation": "Größere Hämangiome können durch interne Fibrosierung, Verkalkungen oder Thromben inhomogen werden. Das macht sie nicht automatisch maligne."
    },
    {
      "id": "haemangiom-de-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welche Aussage passt eher zu einem atypischen Leberhämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Keine klassische periphere noduläre Aufnahme, ggf. früharteriell homogen starkes Enhancement"
        },
        {
          "id": "B",
          "text": "Immer homogenes Light-bulb-T2 und komplette klassische Zentripetenz"
        },
        {
          "id": "C",
          "text": "Nie Kontrastmittelaufnahme"
        },
        {
          "id": "D",
          "text": "Immer Gasbildung und Flüssigkeitsspiegel"
        }
      ],
      "correct": "A",
      "explanation": "Atypische Hämangiome können die klassische periphere noduläre Aufnahme und zentripetale Auffüllung verlieren und stattdessen früharteriell homogen stark kontrastieren."
    },
    {
      "id": "haemangiom-de-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Welcher Befund hilft am meisten gegen die Fehldiagnose „Metastase“ bei einem Hämangiom?",
      "options": [
        {
          "id": "A",
          "text": "Hoher ADC und mehrphasiges zentripetales Fill-in"
        },
        {
          "id": "B",
          "text": "Niedriger ADC und rasches Wash-out"
        },
        {
          "id": "C",
          "text": "Irreguläres infiltratives Wachstum"
        },
        {
          "id": "D",
          "text": "Kapselretraktion mit Gallenwegserweiterung"
        }
      ],
      "correct": "A",
      "explanation": "Hohe ADC-Werte sprechen gegen echte Diffusionsrestriktion. Zusammen mit mehrphasiger zentripetaler Auffüllung stützt dies die Diagnose Hämangiom."
    },
    {
      "id": "fnh-de-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage beschreibt die fokale noduläre Hyperplasie (FNH) am korrektesten?",
      "options": [
        { "id": "A", "text": "Benigne, regenerative Raumforderung der Leber" },
        { "id": "B", "text": "Maligner primärer Lebertumor mit Metastasierungspotenzial" },
        { "id": "C", "text": "Bakterieller Leberabszess mit zentraler Einschmelzung" },
        { "id": "D", "text": "Zystische Raumforderung mit serösem Inhalt" }
      ],
      "correct": "A",
      "explanation": "Die FNH ist eine benigne, regenerative Raumforderung der Leber, meist asymptomatisch und ohne Therapiebedarf."
    },
    {
  "id": "fnh-de-02",
  "tags": [
    "fnh",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welche Aussage zur Epidemiologie der FNH trifft zu?",
  "options": [
    {
      "id": "A",
      "text": "Sie ist die häufigste benigne Leberläsion überhaupt"
    },
    {
      "id": "B",
      "text": "Sie ist nach dem Hämangiom der zweithäufigste benigne solide Lebertumor und betrifft bevorzugt Frauen"
    },
    {
      "id": "C",
      "text": "Sie tritt überwiegend bei älteren Männern auf"
    },
    {
      "id": "D",
      "text": "Sie ist eine Präkanzerose mit hohem Malignisierungsrisiko"
    }
  ],
  "correct": "B",
  "explanation": "Nach dem Hämangiom ist die FNH der zweithäufigste gutartige solide Lebertumor, am ehesten bei jungen bis mittelalten Erwachsenen mit deutlicher Prädominanz bei Frauen."
},
    {
      "id": "fnh-de-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welcher Doppler-Befund ist typisch für eine FNH?",
      "options": [
        { "id": "A", "text": "Zentrales Gefäß mit radiären Gefäßästen (Spoke-wheel-Muster)" },
        { "id": "B", "text": "Komplette Gefäßfreiheit der Läsion" },
        { "id": "C", "text": "Ausschließlich periphere venöse Gefäße ohne zentrales Gefäß" },
        { "id": "D", "text": "Arteriovenöse Fistel mit Shuntfluss" }
      ],
      "correct": "A",
      "explanation": "Das Spoke-wheel-Muster – ein zentrales Gefäß mit radiär abgehenden Ästen – ist ein typischer, wenn auch nicht beweisender Doppler-Befund der FNH."
    },
    {
      "id": "fnh-de-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich eine typische FNH früharteriell in der CT?",
      "options": [
        { "id": "A", "text": "Periphere noduläre, diskontinuierliche Kontrastmittelaufnahme" },
        { "id": "B", "text": "Kräftige, homogene Kontrastmittelaufnahme" },
        { "id": "C", "text": "Inhomogene arterielle Aufnahme mit Wash-out und Kapsel in einer Risikoleber" },
        { "id": "D", "text": "Periphere noduläre, diskontinuierliche Aufnahme mit zentripetaler Auffüllung" }
      ],
      "correct": "B",
      "explanation": "Im Gegensatz zum Hämangiom zeigt die FNH früharteriell eine kräftige, homogene Kontrastmittelaufnahme ohne periphere noduläre Aufnahme."
    },
    {
      "id": "fnh-de-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was ist in der portalvenösen und Spätphase für die FNH charakteristisch?",
      "options": [
        { "id": "A", "text": "Deutliches Wash-out mit Hypodensität gegenüber der Leber" },
        { "id": "B", "text": "Fehlendes Wash-out mit Angleichung an das Leberparenchym" },
        { "id": "C", "text": "Periphere noduläre Kontrastknoten mit fortschreitender zentripetaler Auffüllung" },
        { "id": "D", "text": "Arterielle Aufnahme mit möglichem Wash-out bei einem hepatozellulären Adenom" }
      ],
      "correct": "B",
      "explanation": "Das fehlende Wash-out mit rascher Angleichung passt zum typischen FNH-Muster, schließt ein HCC aber nicht allein aus. Risikokontext und vollständige Phasenbeurteilung bleiben wichtig."
    },
    {
      "id": "fnh-de-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie stellt sich die FNH typischerweise in T1 und T2 zum Leberparenchym dar?",
      "options": [
        { "id": "A", "text": "Sehr stark hyperintens in T2, ähnlich einer einfachen Flüssigkeitsansammlung" },
        { "id": "B", "text": "Iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2" },
        { "id": "C", "text": "T1-Signalabfall in der Opposed-Phase bei intrazellulärem Fett" },
        { "id": "D", "text": "T1-hypointens und T2-hyperintens mit eingeschränkter Diffusion" }
      ],
      "correct": "B",
      "explanation": "Die FNH ist meist iso- bis leicht hypointens in T1 und iso- bis leicht hyperintens in T2 zum Leberparenchym, sodass sie nativ oft nur diskret abgrenzbar ist."
    },
    {
      "id": "fnh-de-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich die zentrale Narbe der FNH in der MRT?",
      "options": [
        { "id": "A", "text": "Hyperintens in T2, hypointens in T1, mit verzögerter Kontrastmittelaufnahme in der Spätphase" },
        { "id": "B", "text": "Hypointens in T1 und T2 mit geringer oder fehlender verzögerter Aufnahme" },
        { "id": "C", "text": "T2-hyperintens, aber mit kräftiger früher arterieller Aufnahme" },
        { "id": "D", "text": "T1- und T2-hyperintens, ohne verzögerte Aufnahme" }
      ],
      "correct": "A",
      "explanation": "Die zentrale Narbe ist hyperintens in T2, hypointens in T1 und nimmt in der Spätphase verzögert Kontrastmittel auf – charakteristisch in ca. 70 % der Fälle."
    },
    {
      "id": "fnh-de-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welches Signal in der hepatobiliären MRT-Phase passt eher zu FNH als zu einem hepatozellulären Adenom?",
      "options": [
        { "id": "A", "text": "FNH meist iso- bis hyperintens; Adenome häufiger hypointens" },
        { "id": "B", "text": "FNH meist hypointens; Adenome meist iso- bis hyperintens" },
        { "id": "C", "text": "Beide Läsionen sind typischerweise deutlich hyperintens" },
        { "id": "D", "text": "Die hepatobiliäre Phase trägt grundsätzlich nichts zur Abgrenzung bei" }
      ],
      "correct": "A",
      "explanation": "FNH nimmt hepatobiliär-spezifisches Kontrastmittel häufig auf und ist dann iso- bis hyperintens; viele Adenome bleiben hypointens. Das Muster unterstützt die Abgrenzung, ist wegen Subtypen und Ausnahmen aber kein Einzelbeweis. Quelle: ACG 2024."
    },
    {
      "id": "fnh-de-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Merkmale können bei einer atypischen FNH auftreten?",
      "options": [
        { "id": "A", "text": "Fehlende zentrale Narbe, heterogenes Erscheinungsbild, Pseudokapsel oder intraläsionales Fett" },
        { "id": "B", "text": "Homogene arterielle Aufnahme ohne Wash-out und mit zentraler Narbe" },
        { "id": "C", "text": "Periphere noduläre Aufnahme mit zentripetaler Auffüllung" },
        { "id": "D", "text": "Arterielle Aufnahme mit Wash-out und Kapselzeichen in einer Risikoleber" }
      ],
      "correct": "A",
      "explanation": "Atypische FNH (ca. 20 %) kann ohne zentrale Narbe auftreten oder ein heterogenes Erscheinungsbild, eine Pseudokapsel, fehlende Narbenanreicherung oder intraläsionales Fett zeigen, was die Abgrenzung zu anderen Lebertumoren erschwert."
    },
    {
      "id": "fnh-de-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Aussage passt zur typischen, sicher diagnostizierten FNH ohne Symptome?",
      "options": [
        { "id": "A", "text": "Keine Behandlung und üblicherweise keine Verlaufskontrolle; bei vaskulärer Lebererkrankung gelten Ausnahmen" },
        { "id": "B", "text": "Jährliche MRT-Kontrolle ist bei jeder typischen FNH erforderlich" },
        { "id": "C", "text": "Eine Biopsie ist auch bei kombiniert typischen Bildmerkmalen routinemäßig nötig" },
        { "id": "D", "text": "Ein einzelnes atypisches Merkmal erfordert unmittelbar eine Resektion" }
      ],
      "correct": "A",
      "explanation": "EASL empfiehlt bei typischer FNH weder Behandlung noch routinemäßige Verlaufskontrolle; eine zugrunde liegende vaskuläre Lebererkrankung ist eine Ausnahme. Atypische Bildgebung soll fachärztlich weiter eingeordnet werden, nicht automatisch zur Resektion führen."
    },
    {
      "id": "avm-de-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was charakterisiert eine arteriovenöse Malformation (AVM) der Leber pathophysiologisch?",
      "options": [
        { "id": "A", "text": "Eine abnorme direkte Verbindung zwischen Arterie und venösem Gefäß ohne zwischengeschaltetes Kapillarbett" },
        { "id": "B", "text": "Eine benigne regenerative Raumforderung aus hyperplastischem Lebergewebe" },
        { "id": "C", "text": "Eine zystische Raumforderung mit seröser Flüssigkeit" },
        { "id": "D", "text": "Eine fokale Fettansammlung im Leberparenchym" }
      ],
      "correct": "A",
      "explanation": "Eine hepatische AVM ist eine abnorme direkte Verbindung zwischen einer Arterie und einem venösen Gefäß ohne zwischengeschaltetes Kapillarbett, sodass Blut mit hoher Geschwindigkeit und niedrigem Widerstand direkt arteriell-venös fließt."
    },
    {
      "id": "avm-de-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Gefäßverbindung spricht für einen arterioportalen Shunt?",
      "options": [
        { "id": "A", "text": "Frühe Kontrastierung einer Lebervene durch die A. hepatica" },
        { "id": "B", "text": "Frühe Kontrastierung eines Pfortaderasts durch die A. hepatica" },
        { "id": "C", "text": "Verbindung zwischen Pfortaderast und Lebervene" },
        { "id": "D", "text": "Späte Kontrastierung der Pfortader nach normaler Leberpassage" }
      ],
      "correct": "B",
      "explanation": "Eine arterioportale Verbindung führt zur vorzeitigen Kontrastierung eines Pfortaderasts in der arteriellen Phase. Eine früh kontrastierte Lebervene spricht für einen arteriovenösen Shunt."
    },
    {
      "id": "avm-de-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Erkrankung ist die wichtigste kongenitale Ursache multipler hepatischer AVMs?",
      "options": [
        { "id": "A", "text": "Morbus Osler-Weber-Rendu (hereditäre hämorrhagische Teleangiektasie, HHT)" },
        { "id": "B", "text": "Morbus Wilson" },
        { "id": "C", "text": "Hämochromatose" },
        { "id": "D", "text": "Alpha-1-Antitrypsin-Mangel" }
      ],
      "correct": "A",
      "explanation": "Die hereditäre hämorrhagische Teleangiektasie (HHT, Morbus Osler-Weber-Rendu) ist die wichtigste kongenitale Ursache multipler, diffus verteilter hepatischer AV-Shunts."
    },
    {
      "id": "avm-de-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Ursache passt am besten zu einer erworbenen hepatischen AVM?",
      "options": [
        { "id": "A", "text": "Iatrogen nach Leberbiopsie oder TIPS-Anlage" },
        { "id": "B", "text": "Angeborene Leberzyste" },
        { "id": "C", "text": "Chronische Virushepatitis allein" },
        { "id": "D", "text": "Physiologische Altersveränderung" }
      ],
      "correct": "A",
      "explanation": "Erworbene hepatische AVMs entstehen vor allem traumatisch oder iatrogen, z. B. nach Leberbiopsie, TIPS-Anlage oder Operation."
    },
    {
      "id": "avm-de-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche Spektraldoppler-Wellenform ist in einer normalen Lebervene zu erwarten?",
      "options": [
        { "id": "A", "text": "Relativ kontinuierlicher, hepatopetaler Fluss wie in der Pfortader" },
        { "id": "B", "text": "Kardial phasischer, normalerweise triphasischer Fluss" },
        { "id": "C", "text": "Kontinuierlicher arterieller Hochgeschwindigkeitsfluss" },
        { "id": "D", "text": "Physiologisch kein messbarer Fluss" }
      ],
      "correct": "B",
      "explanation": "Die normale Lebervene zeigt einen kardial phasischen, meist triphasischen Fluss. Die Pfortader hat dagegen normalerweise einen hepatopetalen und relativ kontinuierlichen Fluss. Eine arterialisierte Wellenform kann je nach betroffenem Gefäß auf einen Shunt hinweisen, ist aber im Kontext zu beurteilen."
    },
    {
      "id": "avm-de-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie verhält sich der Widerstandsindex (RI) der zuführenden Arterie bei einem AV-Shunt typischerweise?",
      "options": [
        { "id": "A", "text": "Deutlich erhöht" },
        { "id": "B", "text": "Deutlich erniedrigt" },
        { "id": "C", "text": "Unverändert im Vergleich zur Gegenseite" },
        { "id": "D", "text": "Nicht messbar" }
      ],
      "correct": "B",
      "explanation": "Durch den niedrigen Widerstand im Shunt sinkt der Widerstandsindex der zuführenden Arterie deutlich ab, erkennbar an einer hohen diastolischen Flussgeschwindigkeit."
    },
    {
      "id": "avm-de-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Was ist das wichtigste CT-Leitzeichen einer hepatischen AVM?",
      "options": [
        { "id": "A", "text": "Zentripetale Kontrastmittelauffüllung in der Spätphase" },
        { "id": "B", "text": "Vorzeitige Kontrastierung der drainierenden Vene in der arteriellen Phase (\"Early venous filling sign\")" },
        { "id": "C", "text": "Homogen hypodense Läsion in allen Phasen" },
        { "id": "D", "text": "Verkalkungen im Läsionszentrum" }
      ],
      "correct": "B",
      "explanation": "Das Early venous filling sign – die vorzeitige arterielle Opazifikation der drainierenden Vene – ist der Schlüsselbefund einer hepatischen AVM in CT und MRT."
    },
    {
      "id": "avm-de-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie wird eine fokale, keilförmige Hyperperfusion um eine AVM in der frühen arteriellen Phase bezeichnet?",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "Zentrale Narbe" },
        { "id": "C", "text": "Transiente Hyperperfusionsstörung (THAD/THID)" },
        { "id": "D", "text": "Pseudokapsel" }
      ],
      "correct": "C",
      "explanation": "Eine transiente, fokale oder keilförmige Hyperperfusion um einen AV-Shunt wird als THAD/THID bezeichnet und kann eine hypervaskuläre Läsion wie FNH oder HCC imitieren."
    },
    {
      "id": "avm-de-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Wie stellen sich AV-Malformationen typischerweise in T1/T2-gewichteten MRT-Sequenzen dar?",
      "options": [
        { "id": "A", "text": "Homogen hyperintens mit langsamer, zentripetaler Kontrastmittelanreicherung wie ein Hämangiom" },
        { "id": "B", "text": "Als serpiginöse, signalfreie Strukturen (Flow voids) durch schnellen Fluss" },
        { "id": "C", "text": "Als fettäquivalente Signalintensität in allen Sequenzen" },
        { "id": "D", "text": "Als zystische, scharf begrenzte Raumforderung mit Flüssigkeitsspiegel" }
      ],
      "correct": "B",
      "explanation": "Schnell fließendes Blut in dilatierten Gefäßen erzeugt Flow voids – serpiginöse, signalfreie Strukturen in T1- und T2-gewichteten Sequenzen."
    },
    {
      "id": "avm-de-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Welche klinische Konsequenz kann eine ausgeprägte HHT-assoziierte Leberbeteiligung mit multiplen AV-Shunts haben?",
      "options": [
        { "id": "A", "text": "Akutes Nierenversagen" },
        { "id": "B", "text": "High-Output-Herzinsuffizienz und portale Hypertension" },
        { "id": "C", "text": "Akute Pankreatitis" },
        { "id": "D", "text": "Hypothyreose" }
      ],
      "correct": "B",
      "explanation": "Multiple hepatische AV-Shunts können über ein erhöhtes Herzzeitvolumen zu einer High-Output-Herzinsuffizienz führen und über arterioportale Shunts eine portale Hypertension verursachen."
    },
    {
  "id": "hcc-de-01",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Vier Erwachsene haben eine unbehandelte Leberbeobachtung; chronische Hepatitis B und früheres HCC liegen jeweils nicht vor. In welchem Kontext ist die diagnostische CT/MRT-LI-RADS-Anwendung nach v2018 zulässig?",
  "options": [
    {
      "id": "A",
      "text": "Hepatitis-C-bedingte Leberzirrhose"
    },
    {
      "id": "B",
      "text": "Metabolische Steatose ohne Zirrhose"
    },
    {
      "id": "C",
      "text": "Chronische Hepatitis C ohne Zirrhose"
    },
    {
      "id": "D",
      "text": "Zirrhose durch kardiale Stauungshepatopathie"
    }
  ],
  "correct": "A",
  "explanation": "CT/MRT-LI-RADS v2018 gilt in der definierten erwachsenen Risikopopulation mit Zirrhose, chronischer HBV-Infektion oder aktuellem/früherem HCC und geeigneter Mehrphasenuntersuchung. Bestimmte vaskulär bedingte Zirrhosen sind ausgenommen. Außerhalb der Zielgruppe ist das typische Muster kein gleichwertiger nichtinvasiver Diagnosenachweis.",
  "wrongExplanations": {
    "B": "Steatose ohne Zirrhose und ohne die weiteren genannten Risikofaktoren gehört nicht zur diagnostischen LI-RADS-Zielgruppe.",
    "C": "Hepatitis C allein ohne Zirrhose erfüllt hier die v2018-Zielgruppe nicht; chronische Hepatitis B ist eine gesonderte Einschlusskonstellation.",
    "D": "ACR schließt Zirrhose aufgrund kardialer Stauung und bestimmter anderer vaskulärer Erkrankungen aus, weil benigne hyperplastische Knoten HCC imitieren können."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-02",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welche Mehrphasen-Konstellation ist bei geeigneter HCC-Risikopopulation klassisch für HCC?",
  "options": [
    {
      "id": "A",
      "text": "Nicht-randständiges APHE und nachfolgendes nicht-peripheres Wash-out in zulässiger Phase"
    },
    {
      "id": "B",
      "text": "Periphere diskontinuierliche Kontrastknoten mit progressiver zentripetaler Füllung"
    },
    {
      "id": "C",
      "text": "Arterieller anreichernder Randsaum mit verzögerter zentraler Anreicherung"
    },
    {
      "id": "D",
      "text": "Homogene arterielle Hyperanreicherung mit späterer Angleichung an die Leber"
    }
  ],
  "correct": "A",
  "explanation": "Nicht-randständiges APHE und nicht-peripheres Wash-out bilden das klassische dynamische Muster. Eine formale Kategorie erfordert zusätzlich Größe, Zielgruppe und die übrigen Algorithmusregeln. APHE allein ist nicht spezifisch.",
  "wrongExplanations": {
    "B": "Diese vaskuläre Knoten- und Auffülldynamik ist typisch für ein Hämangiom, nicht für das gesuchte HCC-Muster.",
    "C": "Ein arterieller Rim mit progressiver zentraler Anreicherung ist ein targetoider Warnbefund für nicht HCC-spezifische Malignität; er ist von nonrim APHE zu trennen.",
    "D": "Dieses Muster kann bei benignen hypervaskulären Läsionen wie typischer FNH vorkommen. Das gesuchte nicht-periphere Wash-out fehlt."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-03",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Gadoxetat-MRT: Welche zeitliche Vergleichskonstellation kann das Major Feature „nicht-peripheres Wash-out“ belegen?",
  "options": [
    {
      "id": "A",
      "text": "Zuvor anreichernde Beobachtung zeigt portalvenös nicht-periphere relative Hypoanreicherung zur Leber"
    },
    {
      "id": "B",
      "text": "Portalvenös isointense Beobachtung wird erst in der Transitionalphase relativ hypointens"
    },
    {
      "id": "C",
      "text": "Portalvenös isointense Beobachtung wird erst hepatobiliär relativ hypointens"
    },
    {
      "id": "D",
      "text": "Bereits nativ hypointense Beobachtung bleibt ohne nachgewiesene zeitliche Kontraständerung portalvenös dunkel"
    }
  ],
  "correct": "A",
  "explanation": "Bei Gadoxetat wird Major-Feature-Wash-out nur portalvenös bewertet. Transitional- oder hepatobiliäre Hypointensität kann durch Kontrastaufnahme der Leber entstehen und ist ein Ancillary Feature, kein Ersatz für dieses Wash-out. Bei extrazellulärem Kontrastmittel ist auch die zulässige Spätphase verwendbar.",
  "wrongExplanations": {
    "B": "Eine erst transitionale Hypointensität wird bei Gadoxetat nicht als Major-Feature-Wash-out gezählt.",
    "C": "Hepatobiliäre Hypointensität ist ein unterstützendes Merkmal für Malignität, aber nicht HCC-spezifisch und kein Major-Feature-Wash-out.",
    "D": "Statische Hypointensität allein zeigt keine zeitliche Abnahme der relativen Anreicherung. Dafür muss eine geeignete frühere Kontrastphase mit der späteren Phase verglichen werden."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-04",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welcher Randbefund erfüllt am ehesten das LI-RADS-Major-Feature „enhancing capsule“?",
  "options": [
    {
      "id": "A",
      "text": "Glatter, gleichmäßiger anreichernder Randsaum in portalvenöser, später oder Transitionalphase"
    },
    {
      "id": "B",
      "text": "Dicker unregelmäßiger arterieller Randsaum um eine zentral weniger anreichernde Läsion"
    },
    {
      "id": "C",
      "text": "Einzelne diskontinuierliche periphere Kontrastknoten mit zentraler Auffüllung"
    },
    {
      "id": "D",
      "text": "Abgrenzbarer Randsaum ohne nachgewiesene Kontrastanreicherung"
    }
  ],
  "correct": "A",
  "explanation": "Enhancing capsule beschreibt einen glatten, gleichmäßigen, scharfen anreichernden Rand, auffälliger als das fibrotische Gewebe um Hintergrundknoten. Es ist eine bildgebende Appearance, kein alleiniger histologischer Beweis einer Kapsel oder eines HCC.",
  "wrongExplanations": {
    "B": "Ein arterieller Rim ist ein anderes Merkmal als eine spätere glatte Kapselappearance und kann zur LR-M-Einordnung beitragen.",
    "C": "Periphere Kontrastknoten mit Füllung gewichten ein Hämangiom; sie bilden keinen gleichmäßigen Kapselsaum.",
    "D": "Ohne nachgewiesene Anreicherung ist das Major Feature „enhancing capsule“ nicht erfüllt; eine nonenhancing capsule wird als Ancillary Feature getrennt behandelt."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-05",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Wie erscheint ein HCC im Vergleich zur Leber am häufigsten in der hepatobiliären Phase einer Gadoxetat-MRT?",
  "options": [
    {
      "id": "A",
      "text": "Hypointens"
    },
    {
      "id": "B",
      "text": "Isointens"
    },
    {
      "id": "C",
      "text": "Hyperintens"
    },
    {
      "id": "D",
      "text": "Zentral höheres Signal mit peripher hypointensem targetoidem Rand"
    }
  ],
  "correct": "A",
  "explanation": "Viele HCC zeigen verminderte hepatobiliäre Aufnahme, unter anderem bei verminderter Expression hepatozellulärer Aufnahmetransporter. Eine erhaltene oder erhöhte Transporterexpression kann iso-/hyperintense HCC erklären. Das Signal ist daher kein alleiniger HCC- oder Gutartigkeitsnachweis.",
  "wrongExplanations": {
    "B": "Isointense HCC kommen bei erhaltener Kontrastaufnahme vor, sind aber nicht das häufigste Muster. Isointensität schließt HCC nicht aus.",
    "C": "Auch hyperintense HCC sind bei entsprechender Transporterexpression möglich. Die häufigere Konstellation ist jedoch Hypointensität.",
    "D": "Ein targetoides hepatobiliäres Muster ist kein klassisches homogen hypointenses HCC-Muster und kann zu einer LR-M-Abklärung führen; es ist nicht HCC-spezifisch."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/20663969/"
},
    {
  "id": "hcc-de-06",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welche Kombination unterstützt echte Diffusionsrestriktion als Ancillary Feature bei einer HCC-verdächtigen Beobachtung?",
  "options": [
    {
      "id": "A",
      "text": "Hohes DWI-Signal mit korrespondierend niedrigem ADC"
    },
    {
      "id": "B",
      "text": "Hohes DWI-Signal mit erhaltenem oder hohem ADC bei starkem T2-Signal"
    },
    {
      "id": "C",
      "text": "Niedriges DWI-Signal mit hohem ADC"
    },
    {
      "id": "D",
      "text": "Hohes DWI-Signal bei artefaktbedingt nicht verwertbarem ADC"
    }
  ],
  "correct": "A",
  "explanation": "DWI-Aufhellung mit passender ADC-Erniedrigung unterstützt echte Restriktion. Dieses Ancillary Feature ist nicht HCC-spezifisch und darf eine Beobachtung nicht allein zu LR-5 hochstufen.",
  "wrongExplanations": {
    "B": "Diese Kombination unterstützt eher T2-shine-through als gesicherte Restriktion. Das bedeutet für sich ebenfalls keinen Gutartigkeitsbeweis.",
    "C": "Niedriges DWI-Signal und hoher ADC unterstützen nicht die gefragte eingeschränkte Diffusion.",
    "D": "Ohne verwertbaren ADC ist eine zuverlässige Bestätigung allein anhand der DWI-Aufhellung nicht möglich."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-07",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Bei einem portalvenösen Füllungsdefekt: Welcher Zusatzbefund ist für „Tumor in vein“ am stärksten beweisend?",
  "options": [
    {
      "id": "A",
      "text": "Eindeutig gegenüber nativ nachgewiesene Anreicherung von Weichteilgewebe im Venenlumen"
    },
    {
      "id": "B",
      "text": "Erweiterung der Vene ohne gesicherte intraluminale Anreicherung"
    },
    {
      "id": "C",
      "text": "Diffusionsrestriktion im Füllungsdefekt ohne gesicherte Anreicherung"
    },
    {
      "id": "D",
      "text": "Kontakt des Füllungsdefekts zu einer Lebermasse ohne gesicherte Anreicherung"
    }
  ],
  "correct": "A",
  "explanation": "Eindeutig anreicherndes Weichteilgewebe in einer Vene ist das Kernkriterium. Ausdehnung und betroffene Venen berichten. LR-TIV ist nicht gleichbedeutend mit HCC: auch andere Malignome können in Venen wachsen.",
  "wrongExplanations": {
    "B": "Venenexpansion ist ein Hinweis, kann aber für sich keinen Tumorthrombus sichern.",
    "C": "Diffusionsrestriktion ist ein zusätzlicher Hinweis, ersetzt aber nicht den eindeutigen Nachweis anreichernden Weichteilgewebes.",
    "D": "Nachbarschaft zur Masse erhöht den Verdacht, ist ohne belegte intraluminale Anreicherung aber nicht das entscheidende Kernkriterium."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-08",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welches Muster passt zu einem infiltrativen HCC und sollte eine gezielte Malignitätsabklärung auslösen?",
  "options": [
    {
      "id": "A",
      "text": "Unscharfes permeatives Wachstum über mehrere Segmente mit variablem Enhancement und verdächtiger Gefäßinvasion"
    },
    {
      "id": "B",
      "text": "Scharf begrenzter solitärer Knoten mit homogenem APHE und glatter Kapsel"
    },
    {
      "id": "C",
      "text": "Keilförmige arterielle Mehranreicherung mit unverzerrten Gefäßen ohne Raumforderung"
    },
    {
      "id": "D",
      "text": "Geographisches fibrotisches Areal mit Kapselretraktion und zunehmend verzögerter Anreicherung"
    }
  ],
  "correct": "A",
  "explanation": "Infiltratives HCC kann mit dem zirrhotischen Parenchym verschmelzen und nur heterogen oder fokal typische Kontrastmerkmale zeigen. Gefäßinvasion und die gesamte Mehrphasendynamik sind wichtige Hinweise; die Konstellation bleibt gezielt abzuklären.",
  "wrongExplanations": {
    "B": "Das beschreibt eher ein noduläres als ein permeativ-infiltratives Wachstumsmuster. Ein HCC kann nodulär sein, gefragt ist aber die infiltrative Form.",
    "C": "Ein keilförmiger Befund ohne Masseneffekt und mit unverzerrtem Gefäßverlauf gewichtet eine Perfusionsänderung. Er unterscheidet sich vom beschriebenen malignitätsverdächtigen Wachstum.",
    "D": "Diese Kombination gewichtet konfluierende Fibrose als wichtige Differenzialdiagnose. Sie darf nicht mit dem typischen Invasionshinweis der gesuchten Konstellation gleichgesetzt werden."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3538368/"
},
    {
  "id": "hcc-de-09",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Welche Mehrphasen-MRT-Dynamik mit extrazellulärem Kontrastmittel gewichtet im passenden Risikokontext HCC gegenüber typischer FNH stärker?",
  "options": [
    {
      "id": "A",
      "text": "Nicht-randständiges APHE mit nicht-peripherem portalvenösem oder verzögertem Wash-out"
    },
    {
      "id": "B",
      "text": "Homogene arterielle Hyperanreicherung mit späterer Isointensität zur Leber"
    },
    {
      "id": "C",
      "text": "Frühe Hyperanreicherung, spätere Angleichung an die Leber und verzögert anreichernde zentrale Narbe"
    },
    {
      "id": "D",
      "text": "Periphere Kontrastknoten mit zentripetaler Füllung und Blutpoolverhalten"
    }
  ],
  "correct": "A",
  "explanation": "Typische FNH zeigt kräftige arterielle Anreicherung, aber kein nicht-peripheres Wash-out. Das genannte Wash-out gewichtet HCC im passenden Kontext, ist allein aber kein vollständiger Kategorien- oder Histologienachweis.",
  "wrongExplanations": {
    "B": "Diese homogene Dynamik ohne Wash-out kann zur typischen FNH passen und ist nicht das gesuchte HCC-gewichtende Merkmal.",
    "C": "Eine verzögert anreichernde zentrale Narbe mit sonstiger Angleichung ist mit typischer FNH vereinbar. Die Narbe ist nicht mit einer peripheren Kapsel zu verwechseln.",
    "D": "Diese noduläre Füllungsdynamik gewichtet ein Hämangiom, nicht das typische HCC-Muster."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-de-10",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Textfall: Der HCC-Befund erfasst Tumorzahl/-größe, Segmente, Gefäßinvasion und Metastasen vollständig. Welche zusätzlichen klinischen Angaben gehören für die BCLC-Stadieneinordnung wesentlich dazu?",
  "options": [
    {
      "id": "A",
      "text": "Leberfunktion beziehungsweise Dekompensation und ECOG-Performance-Status"
    },
    {
      "id": "B",
      "text": "Histologischer Differenzierungsgrad und Ki-67-Index"
    },
    {
      "id": "C",
      "text": "AFP-Konzentration und Viruslast der zugrunde liegenden Hepatitis"
    },
    {
      "id": "D",
      "text": "Kalenderalter und Body-Mass-Index"
    }
  ],
  "correct": "A",
  "explanation": "BCLC verbindet Tumorlast mit Leberfunktion und Allgemeinzustand/Performance-Status. Die Bildgebung liefert den anatomischen Anteil; sie entscheidet Stadium und Therapie nicht ohne diese klinischen Informationen.",
  "wrongExplanations": {
    "B": "Grading und Proliferation können biologisch informieren, ersetzen aber die klinischen BCLC-Kernelemente Leberfunktion und Performance-Status nicht.",
    "C": "AFP und Viruslast können für Prognose, Ätiologie oder ausgewählte Therapien relevant sein; die gefragte funktionelle Stadieneinordnung erfordert trotzdem Leberfunktion und ECOG.",
    "D": "Alter und BMI beeinflussen individuelle Entscheidungen, sind aber kein Ersatz für die direkte Erfassung von Leberreserve und Performance-Status."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
},
    {
      "id": "sarkoidose-de-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches histologische Merkmal ist typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Verkäsende Granulome"
        },
        {
          "id": "B",
          "text": "Nicht-verkäsende Granulome"
        },
        {
          "id": "C",
          "text": "Eosinophile Mikroabszesse"
        },
        {
          "id": "D",
          "text": "Tumoröse Plattenepithelformationen"
        }
      ],
      "correct": "B",
      "explanation": "Sarkoidose ist eine systemische granulomatöse Erkrankung unbekannter Ätiologie. Histologisch sind nicht-verkäsende Granulome typisch."
    },
    {
      "id": "sarkoidose-de-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Verteilungsmuster der Mikronoduli ist in der HRCT typisch für Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatisch entlang Fissuren, Pleura und bronchovaskulären Bündeln"
        },
        {
          "id": "B",
          "text": "Rein zufällig hämatogen ohne Bezug zu Fissuren"
        },
        {
          "id": "C",
          "text": "Nur basal subpleural als Honeycombing"
        },
        {
          "id": "D",
          "text": "Ausschließlich zentrilobulär mit Tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Typisch sind scharf begrenzte 2–4-mm-Mikronoduli in perilymphatischer Verteilung, besonders entlang Fissuren, Pleura, Septen und bronchovaskulären Bündeln."
    },
    {
      "id": "sarkoidose-de-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was beschreibt das 1-2-3-Zeichen bei Sarkoidose?",
      "options": [
        {
          "id": "A",
          "text": "Rechter Hilus, linker Hilus und rechter Paratrachealraum"
        },
        {
          "id": "B",
          "text": "Drei Kavernen im rechten Oberlappen"
        },
        {
          "id": "C",
          "text": "Drei Zonen der Lungenfibrose"
        },
        {
          "id": "D",
          "text": "Drei Stadien der kardialen Sarkoidose"
        }
      ],
      "correct": "A",
      "explanation": "Das 1-2-3-Zeichen beschreibt die typische Lymphknotenverteilung: rechter Hilus, linker Hilus und rechter Paratrachealraum."
    },
    {
      "id": "sarkoidose-de-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welches Scadding-Stadium zeigt isoliert bihiläre Lymphadenopathie ohne Parenchymbefall?",
      "options": [
        {
          "id": "A",
          "text": "Stadium 0"
        },
        {
          "id": "B",
          "text": "Stadium I"
        },
        {
          "id": "C",
          "text": "Stadium III"
        },
        {
          "id": "D",
          "text": "Stadium IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding Stadium I entspricht isolierter bihilärer Lymphadenopathie bei regelrechtem Lungenparenchym."
    },
    {
      "id": "sarkoidose-de-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was bedeutet Scadding Stadium II?",
      "options": [
        {
          "id": "A",
          "text": "Nur Fibrose"
        },
        {
          "id": "B",
          "text": "Nur Parenchymveränderungen ohne Lymphadenopathie"
        },
        {
          "id": "C",
          "text": "Bihiläre Lymphadenopathie plus Parenchymveränderungen"
        },
        {
          "id": "D",
          "text": "Normaler Röntgen-Thorax"
        }
      ],
      "correct": "C",
      "explanation": "Stadium II bedeutet BHL plus Lungenparenchymveränderungen. Stadium III wäre Parenchymveränderung ohne BHL, Stadium IV Fibrose."
    },
    {
      "id": "sarkoidose-de-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Aussage zu Eggshell-Verkalkungen ist korrekt?",
      "options": [
        {
          "id": "A",
          "text": "Sie sind pathognomonisch für Sarkoidose"
        },
        {
          "id": "B",
          "text": "Sie können auch bei Silikose auftreten"
        },
        {
          "id": "C",
          "text": "Sie beweisen immer Lymphom"
        },
        {
          "id": "D",
          "text": "Sie treten nur bei Asbestose auf"
        }
      ],
      "correct": "B",
      "explanation": "Schalenförmige Eggshell-Verkalkungen können bei Sarkoidose vorkommen, sind aber nicht spezifisch und werden auch bei Silikose gesehen."
    },
    {
      "id": "sarkoidose-de-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Was ist das Sarcoid Galaxy Sign?",
      "options": [
        {
          "id": "A",
          "text": "Großer Knoten mit vielen kleinen Satellitennoduli"
        },
        {
          "id": "B",
          "text": "Diffuse Milchglastrübung ohne Noduli"
        },
        {
          "id": "C",
          "text": "Pleuraplaques mit Verkalkung"
        },
        {
          "id": "D",
          "text": "Zentrale Lungenembolie"
        }
      ],
      "correct": "A",
      "explanation": "Das Sarcoid Galaxy Sign besteht aus einem größeren Granulom-Aggregat, das von vielen kleinen Satellitennoduli umgeben ist. Es ist nicht spezifisch und kann auch bei Tuberkulose vorkommen."
    },
    {
      "id": "sarkoidose-de-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche DD zeigt typischerweise unregelmäßige knotige Septenverdickungen, oft einseitig oder asymmetrisch?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangiosis carcinomatosa"
        },
        {
          "id": "B",
          "text": "Kardiales Lungenödem mit glatten, beidseitigen Septenlinien"
        },
        {
          "id": "C",
          "text": "Sarkoidose mit symmetrischen perilymphatischen Noduli"
        },
        {
          "id": "D",
          "text": "UIP-Muster mit subpleuraler Retikulation und Honigwaben"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangiosis carcinomatosa macht häufig unregelmäßige, knotige Septenverdickungen und ist oft asymmetrisch bzw. einseitig. Klinisch sind die Patienten häufig schwerer krank."
    },
    {
      "id": "sarkoidose-de-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Kombination definiert das Heerfordt-Syndrom?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, Parotitis und Fazialisparese"
        },
        {
          "id": "B",
          "text": "Asthma, Sinusitis und Eosinophilie"
        },
        {
          "id": "C",
          "text": "Arthritis, Urethritis und Konjunktivitis"
        },
        {
          "id": "D",
          "text": "Hämoptyse, Glomerulonephritis und Sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Das Heerfordt-Syndrom ist eine Sarkoidose-Manifestation mit Uveitis, Parotitis und Fazialisparese."
    },
    {
      "id": "sarkoidose-de-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lunge"
      ],
      "fach": "thorax",
      "question": "Welche Modalität ist besonders geeignet, Myokardnarben bzw. Fibrose bei kardialer Sarkoidose darzustellen?",
      "options": [
        {
          "id": "A",
          "text": "MRT mit Late Gadolinium Enhancement"
        },
        {
          "id": "B",
          "text": "FDG-PET zur Darstellung aktiver Entzündung, jedoch ohne direkte Narbencharakterisierung"
        },
        {
          "id": "C",
          "text": "Echokardiographie zur Funktionsbeurteilung, jedoch mit begrenzter Gewebecharakterisierung"
        },
        {
          "id": "D",
          "text": "Koronar-CT-Angiographie zur Beurteilung der Koronararterien"
        }
      ],
      "correct": "A",
      "explanation": "Die kardiale MRT mit Late Gadolinium Enhancement zeigt nichtischämische Myokardnarben und Fibrose. FDG-PET ergänzt die MRT besonders zur Beurteilung aktiver Entzündung; beide Verfahren beantworten unterschiedliche klinische Fragen."
    },
    {
  "id": "rotatorenmanschette-de-01",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welche vier Muskeln bilden die Rotatorenmanschette?",
  "options": [
    {
      "id": "A",
      "text": "Supraspinatus, Infraspinatus, Teres minor, Subscapularis"
    },
    {
      "id": "B",
      "text": "Supraspinatus, Infraspinatus, Teres major, Subscapularis"
    },
    {
      "id": "C",
      "text": "Supraspinatus, Infraspinatus, Teres minor, Deltoideus"
    },
    {
      "id": "D",
      "text": "Supraspinatus, lange Bizepssehne, Teres minor, Subscapularis"
    }
  ],
  "correct": "A",
  "explanation": "Die vier Muskeln der Manschette sind Supraspinatus, Infraspinatus, Teres minor und Subscapularis (SITS). Ihre Sehnen bilden mit Kapsel- und Bandfasern einen zusammenhängenden Stützapparat um den Humeruskopf.",
  "wrongExplanations": {
    "B": "Teres minor gehört zur Manschette; Teres major gehört nicht zu den vier SITS-Muskeln.",
    "C": "Der Subscapularis vervollständigt die Manschette nach ventral; der Deltoideus ersetzt ihn nicht.",
    "D": "Die lange Bizepssehne hat eine enge Beziehung zum Pulley, ersetzt aber den Infraspinatus in der Manschette nicht."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/1624486/; https://pubmed.ncbi.nlm.nih.gov/12647876/"
},
    {
  "id": "rotatorenmanschette-de-02",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welcher Abschnitt wird klassisch als „Critical Zone“ der Supraspinatussehne bezeichnet?",
  "options": [
    {
      "id": "A",
      "text": "Ansatznaher Sehnenabschnitt am Tuberculum majus"
    },
    {
      "id": "B",
      "text": "Muskulotendinöser Übergang medial des Akromions"
    },
    {
      "id": "C",
      "text": "Muskelursprung in der Fossa supraspinata"
    },
    {
      "id": "D",
      "text": "Ansatz der Subscapularissehne am Tuberculum minus"
    }
  ],
  "correct": "A",
  "explanation": "Die Bezeichnung meint einen ansatznahen Bereich der Supraspinatussehne, historisch mit relativ geringer Gefäßversorgung beschrieben. Die Perfusion ist regional und belastungsabhängig; daraus folgt weder eine stets avaskuläre Zone noch eine alleinige Ursache jeder Ruptur.",
  "wrongExplanations": {
    "B": "Der muskulotendinöse Übergang liegt weiter medial und ist nicht die klassisch ansatznahe Critical Zone.",
    "C": "Gemeint ist der Sehnenabschnitt nahe der humeralen Insertion, nicht der Muskelursprung an der Skapula.",
    "D": "Diese Landmarke gehört zum Subscapularis, nicht zur Supraspinatussehne."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323147/; https://pubmed.ncbi.nlm.nih.gov/18647848/; https://pubmed.ncbi.nlm.nih.gov/26412209/"
},
    {
  "id": "rotatorenmanschette-de-03",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welche Bewegung unterstützt der M. subscapularis wesentlich?",
  "options": [
    {
      "id": "A",
      "text": "Außenrotation des Arms"
    },
    {
      "id": "B",
      "text": "Abduktion des Arms"
    },
    {
      "id": "C",
      "text": "Innenrotation des Arms"
    },
    {
      "id": "D",
      "text": "Horizontale Abduktion des Arms"
    }
  ],
  "correct": "C",
  "explanation": "Der Subscapularis unterstützt die Innenrotation und die glenohumerale Stabilisierung. Sein funktioneller Beitrag hängt unter anderem von Armstellung und Muskelabschnitt ab; die Bewegung ist keine isolierte Ein-Muskel-Funktion.",
  "wrongExplanations": {
    "A": "Infraspinatus und Teres minor sind wichtige Außenrotatoren; die gesuchte Hauptbewegung des Subscapularis ist die Innenrotation.",
    "B": "Abduktion wird wesentlich durch Deltoideus und Supraspinatus unterstützt; dies ist nicht die gesuchte Hauptbewegung.",
    "D": "Horizontale Abduktion ist eine andere Bewegungsrichtung; die gesuchte wesentliche Drehfunktion des Subscapularis ist die Innenrotation."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/10888162/; https://pubmed.ncbi.nlm.nih.gov/28867549/"
},
    {
  "id": "rotatorenmanschette-de-04",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Für eine native Schulter-MRT soll die Rotatorenmanschette in mehreren Ebenen auf Defekte beurteilt werden. Welche Sequenzgruppe unterstützt diese Aufgabe am besten?",
  "options": [
    {
      "id": "A",
      "text": "Koronar-schräge T1, axiale T1 und sagittal-schräge T1"
    },
    {
      "id": "B",
      "text": "Koronar-schräge T2 fs, axiale PD fs und sagittal-schräge T1"
    },
    {
      "id": "C",
      "text": "Koronar-schräge T1, axiale T1 und sagittal-schräge GRE"
    },
    {
      "id": "D",
      "text": "Axiale PD fs, koronar-schräge T1 und sagittal-schräge T1"
    }
  ],
  "correct": "B",
  "explanation": "Die passende Gruppe kombiniert flüssigkeitssensitive, fettunterdrückte Aufnahmen in mehr als einer Ebene mit einer T1-Aufnahme für Anatomie und Muskelqualität. Ein vollständiges Protokoll wird an Fragestellung und Gerät angepasst; die Auswahl garantiert keine fehlerfreie Erkennung jeder Partialruptur.",
  "wrongExplanations": {
    "A": "T1-Aufnahmen stellen Anatomie dar, liefern hier aber keine ergänzende fettunterdrückte Flüssigkeitsbeurteilung in mehreren Ebenen.",
    "C": "Diese Gruppe ersetzt die benötigte flüssigkeitssensitive Mehr-Ebenen-Beurteilung nicht; GRE kann je nach Fragestellung ergänzen.",
    "D": "Die Flüssigkeitsbeurteilung bleibt hier auf die axiale Ebene beschränkt; die andere Gruppe ergänzt sie koronar-schräg."
  },
  "source": "https://www.essr.org/content-essr/uploads/2016/10/ESSR-MRI-Protocols-Shoulder.pdf; https://gravitas.acr.org/PPTS/DownloadPreviewDocument?DocId=45&ReleaseId=2"
},
    {
  "id": "rotatorenmanschette-de-05",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Textfall: Eine intakte Sehne verläuft etwa 55° zu B0. Sie zeigt auf einer kurzen TE-Aufnahme erhöhtes Signal, das auf einer längeren TE-Aufnahme deutlich abnimmt. Welche Erklärung passt am besten?",
  "options": [
    {
      "id": "A",
      "text": "Intratendinöse Partialruptur"
    },
    {
      "id": "B",
      "text": "Orientierungsabhängiges Magic-Angle-Phänomen"
    },
    {
      "id": "C",
      "text": "Mukoide Tendondegeneration"
    },
    {
      "id": "D",
      "text": "Kalziumdepot in der Sehne"
    }
  ],
  "correct": "B",
  "explanation": "Normales Sehnengewebe kann nahe55° zu B0 auf kurzen TE-Aufnahmen signalreich erscheinen. Entscheidend sind TE, Orientierung und Morphologie, nicht die Bezeichnung T1/PD/T2 allein. Das Abnehmen bei längerem TE und erhaltene Fasern stützen hier ein Magic-Angle-Phänomen; aus einem Einzelbild allein keine Ruptur ableiten.",
  "wrongExplanations": {
    "A": "Ein Riss braucht eine passende Defektmorphologie; im Text sind die Fasern intakt und die Signaländerung folgt der TE.",
    "C": "Degeneration kann das Sehnensignal verändern; die gegebene Kombination aus Winkel und TE-Abhängigkeit spricht hier stärker für den Orientierungseffekt.",
    "D": "Ein Kalziumdepot erklärt diese winkelabhängige Signalanhebung auf kurzen TE-Aufnahmen nicht."
  },
  "source": "https://pubs.rsna.org/doi/10.1148/radiology.181.2.1924777; https://pubmed.ncbi.nlm.nih.gov/16709684/; https://pubmed.ncbi.nlm.nih.gov/20578021/"
},
    {
  "id": "rotatorenmanschette-de-06",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Neben Flüssigkeit in der subakromialen Bursa: Welcher zusätzliche Sehnenbefund stützt eine bursaseitige Partialruptur des Supraspinatus?",
  "options": [
    {
      "id": "A",
      "text": "Flüssigkeitsdefekt durch die gesamte Sehnendicke von Gelenk- bis Bursaseite"
    },
    {
      "id": "B",
      "text": "Flüssigkeitsäquivalenter oberflächlicher Defekt zur Bursa bei erhaltenen artikulären Fasern"
    },
    {
      "id": "C",
      "text": "Flüssigkeitsäquivalenter Defekt zur Gelenkfläche bei erhaltener Bursaseite"
    },
    {
      "id": "D",
      "text": "Umschriebener Defekt innerhalb der Sehne bei intakten beiden Oberflächen"
    }
  ],
  "correct": "B",
  "explanation": "Der direkte Defekt erreicht die Bursaseite, durchsetzt die Sehne aber nicht vollständig. Die artikulären Fasern bleiben erhalten. Bursaflüssigkeit bei intakter Sehnenoberfläche allein belegt keine Ruptur; die Defektmorphologie in mehreren Ebenen prüfen.",
  "wrongExplanations": {
    "A": "Ein durchgehender Defekt zwischen Gelenk und Bursa beschreibt eine Vollschicht- und keine rein bursaseitige Partialruptur.",
    "C": "Der beschriebene Oberflächenkontakt wäre artikulär statt bursaseitig.",
    "D": "Bei erhaltenen beiden Oberflächen liegt der Defekt intratendinös, nicht offen zur Bursa."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-de-07",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Was bezeichnet der Begriff PASTA-Läsion am Supraspinatus-Footprint?",
  "options": [
    {
      "id": "A",
      "text": "Bursaseitiger Partialdefekt am Sehnenansatz"
    },
    {
      "id": "B",
      "text": "Gelenkseitige Partialablösung am Sehnenansatz"
    },
    {
      "id": "C",
      "text": "Intratendinöser Defekt ohne Kontakt zu einer Oberfläche"
    },
    {
      "id": "D",
      "text": "Vollschichtdefekt zwischen Gelenk und Bursa"
    }
  ],
  "correct": "B",
  "explanation": "PASTA steht für Partial Articular Surface Tendon Avulsion: eine gelenkseitige Partialablösung am Footprint. Der Begriff beschreibt Lage und Ausdehnung, keinen allein bewiesenen Schmerzmechanismus. Bei Überkopfsportlern kann ein posterosuperiores Impingement-Muster im passenden klinischen Kontext vorkommen.",
  "wrongExplanations": {
    "A": "PASTA bezeichnet die artikuläre Oberfläche, nicht den bursaseitigen Teildefekt.",
    "C": "Ein rein intratendinöser Defekt hat keinen Oberflächenkontakt; PASTA erreicht die Gelenkseite am Footprint.",
    "D": "Partial bedeutet, dass nicht die gesamte Sehnendicke zwischen den Oberflächen durchtrennt ist."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/; https://pubmed.ncbi.nlm.nih.gov/22959196/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pubmed.ncbi.nlm.nih.gov/16762713/"
},
    {
  "id": "rotatorenmanschette-de-08",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Textfall: Die MRT zeigt einen flüssigkeitsäquivalenten Spalt mit Faserdefekt im Inneren der Supraspinatussehne. Beide Sehnenoberflächen bleiben intakt. Welche Einordnung passt am besten?",
  "options": [
    {
      "id": "A",
      "text": "Tendinopathie ohne strukturellen Defekt"
    },
    {
      "id": "B",
      "text": "Intratendinöse Partialruptur"
    },
    {
      "id": "C",
      "text": "Bursaseitige Partialruptur"
    },
    {
      "id": "D",
      "text": "Gelenkseitige Partialruptur"
    }
  ],
  "correct": "B",
  "explanation": "Ein intratendinöser Riss liegt innerhalb der Sehne ohne Verbindung zu Gelenk- oder Bursaseite. Hier stützen Flüssigkeitssignal und beschriebener Faserdefekt diese Einordnung. T2-Signalanhebung allein genügt nicht: Auch eine anatomisch intakte degenerierte Sehne kann auf T2 signalreicher sein.",
  "wrongExplanations": {
    "A": "Der Text beschreibt zusätzlich zur Signaländerung einen Faserdefekt; dies geht über eine reine Signal-Tendinopathie hinaus.",
    "C": "Ein bursaseitiger Riss erreicht die Bursafläche; diese bleibt im Text intakt.",
    "D": "Ein artikulärer Riss erreicht die Gelenkfläche; diese bleibt im Text intakt."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/; https://pubmed.ncbi.nlm.nih.gov/20578021/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2465433/"
},
    {
  "id": "rotatorenmanschette-de-09",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Bei anhaltenden Beschwerden trotz nichtoperativer Behandlung zeigt eine PASTA-Läsion einen Defekt von 60 % der Sehnendicke. Welche Einordnung ist korrekt?",
  "options": [
    {
      "id": "A",
      "text": "Mehr als die halbe Sehnendicke ist betroffen; eine Reparatur wird im klinischen Kontext erwogen."
    },
    {
      "id": "B",
      "text": "Mehr als die halbe anteroposteriore Footprint-Breite ist betroffen; damit ist die Defekttiefe angegeben."
    },
    {
      "id": "C",
      "text": "Eine Komplettruptur liegt vor, weil die Grenze zur vollen Sehnendicke bei 50% liegt."
    },
    {
      "id": "D",
      "text": "Mehr als die halbe Footprint-Fläche ist betroffen; damit ist die Defekttiefe angegeben."
    }
  ],
  "correct": "A",
  "explanation": "Die 50-%-Angabe bezieht sich auf die Sehnendicke beziehungsweise Defekttiefe. Freiliegender medial-lateraler Footprint kann die Tiefe arthroskopisch abschätzen; Fläche oder anteroposteriore Breite sind nicht dasselbe. Symptome, Funktion und bisherige Behandlung mitberücksichtigen; der Messwert allein ordnet keine Operation an.",
  "wrongExplanations": {
    "B": "Anteroposteriore Ausdehnung und Defekttiefe sind verschiedene Messrichtungen; die Frage nennt den Anteil an der Sehnendicke.",
    "C": "Eine Vollschichtruptur durchsetzt die gesamte Dicke. 60% bleibt ein hochgradiger Partialdefekt.",
    "D": "Eine Fläche ist keine Dicke. Aus der prozentualen Footprint-Fläche lässt sich der genannte Tiefenanteil nicht direkt ableiten."
  },
  "sources": [
    "https://pubmed.ncbi.nlm.nih.gov/15007313/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/"
  ]
},
    {
  "id": "rotatorenmanschette-de-10",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welcher direkte MRT-Befund entspricht einem Vollschichtdefekt der Rotatorenmanschette?",
  "options": [
    {
      "id": "A",
      "text": "Flüssigkeitsdefekt an der Gelenkseite bei intakten bursalen Fasern"
    },
    {
      "id": "B",
      "text": "Durchgehender Sehnendefekt mit Flüssigkeit zwischen Gelenk- und Bursaseite"
    },
    {
      "id": "C",
      "text": "Flüssigkeitsdefekt an der Bursaseite bei intakten artikulären Fasern"
    },
    {
      "id": "D",
      "text": "Flüssigkeitsdefekt im Sehneninneren bei intakten beiden Oberflächen"
    }
  ],
  "correct": "B",
  "explanation": "Vollschicht bezeichnet die Unterbrechung der gesamten Sehnendicke von der Gelenk- bis zur Bursaseite; ein flüssigkeitsgefüllter durchgehender Defekt ist ein typisches direktes Zeichen. Das bedeutet nicht automatisch, dass die gesamte anteroposteriore Sehnenbreite betroffen oder der Stumpf retrahiert ist.",
  "wrongExplanations": {
    "A": "Bei erhaltenen bursalen Fasern durchsetzt der Defekt nicht die gesamte Dicke; er ist artikulär-partiell.",
    "C": "Erhaltene artikuläre Fasern kennzeichnen hier einen bursaseitigen Partialdefekt.",
    "D": "Ein Defekt ohne Verbindung zu beiden Oberflächen ist intratendinös."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5483776/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-de-11",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welchen Befundparameter bezeichnet der häufig verwendete Retraktionsgrad nach Patte?",
  "options": [
    {
      "id": "A",
      "text": "Anteil von Fett gegenüber Muskelgewebe"
    },
    {
      "id": "B",
      "text": "Lage des retrahierten Sehnenstumpfes"
    },
    {
      "id": "C",
      "text": "Anteroposteriore Ausdehnung des Sehnendefekts"
    },
    {
      "id": "D",
      "text": "Tiefe eines Partialdefekts relativ zur Sehnendicke"
    }
  ],
  "correct": "B",
  "explanation": "Der Retraktionsgrad nach Patte beschreibt die Position des Sehnenstumpfes, zum Beispiel nahe am Footprint oder bis zum Glenoid zurückgezogen. Retraktion, Defektgröße und Muskelqualität getrennt dokumentieren; die ursprüngliche Patte-Klassifikation berücksichtigt mehrere Merkmale und ist nicht auf diesen einen Parameter beschränkt.",
  "wrongExplanations": {
    "A": "Der Fett-Muskel-Anteil gehört zur Beurteilung der fettigen Degeneration, nicht zum hier gefragten Retraktionsgrad.",
    "C": "Anteroposteriore Ausdehnung beschreibt die Breite des Defekts, nicht die mediale Lage des Stumpfes.",
    "D": "Defekttiefe und Sehnenretraktion sind getrennte Messgrößen."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323151/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4278262/"
},
    {
  "id": "rotatorenmanschette-de-12",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welche Beobachtung beschreibt ein positives Tangentenzeichen auf der sagittal-schrägen Y-Aufnahme der Schulter?",
  "options": [
    {
      "id": "A",
      "text": "Der Supraspinatus-Muskelbauch reicht nicht über die Linie zwischen oberem Korakoidrand und oberer Spina scapulae hinaus"
    },
    {
      "id": "B",
      "text": "Der Supraspinatus-Muskelbauch reicht deutlich über dieselbe Linie hinaus"
    },
    {
      "id": "C",
      "text": "Die Fettinfiltration im Supraspinatus überwiegt gegenüber dem Muskelanteil"
    },
    {
      "id": "D",
      "text": "Der Sehnenstumpf ist bis auf Glenoidniveau retrahiert"
    }
  ],
  "correct": "A",
  "explanation": "Die Referenzlinie verbindet den oberen Korakoidrand mit dem oberen Rand der Spina scapulae. Bleibt der Supraspinatus-Muskelbauch darunter, stützt dies eine Muskelatrophie. Fettinfiltration und Sehnenretraktion sind andere Befundparameter und werden getrennt beurteilt.",
  "wrongExplanations": {
    "B": "Das Überschreiten der Linie entspricht dem negativen Tangentenzeichen, nicht dem positiven.",
    "C": "Der Fett-Muskel-Anteil beschreibt fettige Degeneration; er definiert das geometrische Tangentenzeichen nicht.",
    "D": "Das beschreibt Sehnenretraktion; das Tangentenzeichen beurteilt den Muskelbauch anhand seiner Referenzlinie."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/9525755/"
},
    {
  "id": "rotatorenmanschette-de-13",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Welche Größe wird mit der Goutallier-Klassifikation beschrieben?",
  "options": [
    {
      "id": "A",
      "text": "Retraktion des Sehnenstumpfes"
    },
    {
      "id": "B",
      "text": "Fettinfiltration der Muskulatur, von Grad 0 bis 4"
    },
    {
      "id": "C",
      "text": "Tiefe eines partiellen Sehnendefekts"
    },
    {
      "id": "D",
      "text": "Anteroposteriore Breite einer Vollschichtruptur"
    }
  ],
  "correct": "B",
  "explanation": "Goutallier beschreibt die Fettinfiltration von Grad 0 (kein Fett) bis Grad 4 (mehr Fett als Muskel). Hohe Grade sind ein ungünstiger Prognosefaktor für die Heilung, bestimmen aber allein weder Reparabilität noch individuellen funktionellen Nutzen; weitere Sehnen-, Muskel- und klinische Befunde sind einzubeziehen.",
  "wrongExplanations": {
    "A": "Sehnenretraktion und Fettinfiltration sind verschiedene Parameter; die Goutallier-Einteilung richtet sich nach der Muskulatur.",
    "C": "Die Defekttiefe beschreibt die Sehne, nicht den Fett-Muskel-Anteil.",
    "D": "Die anteroposteriore Rupturbreite ist eine Ausdehnungsangabe und keine Muskelqualitätsgradierung."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8020238/; https://pubmed.ncbi.nlm.nih.gov/17418325/"
},
    {
  "id": "rotatorenmanschette-de-14",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Textfall: Ein Sporn an der Akromionunterfläche ragt in den subakromialen Raum. Welcher mechanische Zusammenhang ist anatomisch passend?",
  "options": [
    {
      "id": "A",
      "text": "Enge zwischen Korakoid und Tuberculum minus an der Subscapularissehne"
    },
    {
      "id": "B",
      "text": "Möglicher knöcherner Engefaktor am subakromialen Sehnen-Bursa-Durchtritt"
    },
    {
      "id": "C",
      "text": "Kontakt der artikulären hinteren Manschette mit dem posterosuperioren Glenoid"
    },
    {
      "id": "D",
      "text": "Instabilität der langen Bizepssehne im medialen Pulley"
    }
  ],
  "correct": "B",
  "explanation": "Die beschriebene Lage passt zu einem möglichen subakromialen Outlet-Engpass. Ein Sporn oder ein Bigliani-Formtyp allein beweist weder ein klinisches Impingement noch eine Ruptur: Morphologie, Sehnen-/Bursabefund und Klinik gemeinsam beurteilen. Sporne können mit Manschettenveränderungen assoziiert und auch sekundär entstanden sein.",
  "wrongExplanations": {
    "A": "Das wäre eine subkorakoidale Beziehung vor dem Humeruskopf, nicht die beschriebene Akromionunterfläche.",
    "C": "Das beschreibt den intraartikulären posterosuperioren Kontakt; der Sporn liegt im subakromialen Outlet.",
    "D": "Die mediale Bizepsführung ist ein anderer anatomischer Bereich als der beschriebene subakromiale Durchtritt."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16337525/; https://pubmed.ncbi.nlm.nih.gov/12934022/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3725773/; https://pubmed.ncbi.nlm.nih.gov/22959196/"
},
    {
  "id": "rotatorenmanschette-de-15",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Die lange Bizepssehne liegt im MRT medial außerhalb des Sulcus bicipitalis. Welcher Bereich muss besonders gezielt auf eine Begleitverletzung geprüft werden?",
  "options": [
    {
      "id": "A",
      "text": "Supraspinatusansatz am Tuberculum majus"
    },
    {
      "id": "B",
      "text": "Oberer Subscapularis und Bizeps-Pulley"
    },
    {
      "id": "C",
      "text": "Posteriorer Infraspinatusansatz"
    },
    {
      "id": "D",
      "text": "Posteroinferiorer Teres-minor-Ansatz"
    }
  ],
  "correct": "B",
  "explanation": "Die mediale Subluxation/Luxation der langen Bizepssehne ist ein wichtiger Hinweis auf eine Verletzung von oberem Subscapularis und Stützapparat. Die Sehne und den Pulley direkt prüfen; die indirekte Beobachtung allein bestimmt nicht jedes Rupturausmaß. Eine regelrechte Bizepslage schließt umgekehrt eine Subscapularisläsion nicht aus.",
  "wrongExplanations": {
    "A": "Der Supraspinatus ist Teil der Manschettenbeurteilung; die mediale Bizepsinstabilität lenkt hier besonders zum oberen Subscapularis/Pulley.",
    "C": "Die hintere Infraspinatusinsertion bildet nicht den hier betroffenen vorderen Bizeps-Stützapparat.",
    "D": "Der Teres minor gehört zur hinteren Manschette, nicht zur medialen Bizepsführung am oberen Subscapularis."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6151251/; https://pubmed.ncbi.nlm.nih.gov/1624486/"
}
  ],
  "en": [
    ...GEHIRN_CHIARI_QUESTIONS.en,
    ...GEHIRN_NF1_QUESTIONS.en,
    ...GEHIRN_PRES_QUESTIONS.en,
    ...MAMMA_MRT_QUESTIONS.en,
    ...MAMMA_MRT_LESION_QUESTIONS.en,
    ...MAMMA_KAISER_QUESTIONS.en,
    ...MAMMA_MRT_SPECIAL_CARCINOMA_QUESTIONS.en,
    ...MAMMOGRAPHY_BASICS_QUESTIONS.en,
    ...MAMMOGRAPHY_CALCIFICATIONS_QUESTIONS.en,
    ...CARDIOMYOPATHY_QUESTIONS.en,
    ...ARVC_QUESTIONS.en,
    ...MYOCARDIAL_INJURY_QUESTIONS.en,
    ...FLEISCHNER_QUESTIONS.en,
    ...CONTRAST_QUESTIONS.en,
    ...DIVERTICULITIS_QUESTIONS.en,
    ...PANCREATITIS_QUESTIONS.en,
    ...STROKE_QUESTIONS.en,
    ...ICB_QUESTIONS.en,
    ...HIE_QUESTIONS.en,
    ...SAB_QUESTIONS('en'),
    ...EDH_QUESTIONS.en,
    ...MIDLINE_CAVA_QUESTIONS.en,
    ...SDH_QUESTIONS.en,
    ...DISSECTION_QUESTIONS.en,
    ...MOYAMOYA_QUESTIONS.en,
    ...HMA_QUESTIONS.en,
    ...CAA_QUESTIONS.en,
    ...MIGRAINE_QUESTIONS.en,
    ...CADASIL_QUESTIONS.en,
    ...DVA_QUESTIONS.en,
    ...KAVERNOM_QUESTIONS.en,
    ...NPH_QUESTIONS.en,
    ...TELEANGIEKTASIE_QUESTIONS.en,
    ...SVT_QUESTIONS.en,
    ...FRAKTUR_QUESTIONS.en,
    ...DAVF_QUESTIONS.en,
    ...AVM_QUESTIONS.en,
    ...FRAKTUR_KINDER_QUESTIONS.en,
    ...AK_LUXATION_QUESTIONS.en,
    ...RADIUSKOPF_QUESTIONS.en,
    ...UNTERARM_QUESTIONS.en,
    ...DISTALE_RADIUS_QUESTIONS.en,
    ...SCAPHOID_QUESTIONS.en,
    ...THUMB_UCL_QUESTIONS.en,
    ...KNIE_LIGAMENTE_QUESTIONS.en,
    ...SPINE_TRAUMA_QUESTIONS.en,
    ...HRCT_QUESTIONS.en,
    ...MENISCUS_QUESTIONS.en,
    {
      "id": "haemangiom-en-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement best describes a liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Cavernous non-neoplastic malformation"
        },
        {
          "id": "B",
          "text": "Intrahepatic metastasis with necrosis"
        },
        {
          "id": "C",
          "text": "Premalignant hepatocellular lesion"
        },
        {
          "id": "D",
          "text": "Bacterial liver abscess"
        }
      ],
      "correct": "A",
      "explanation": "A liver haemangioma is a cavernous, non-neoplastic vascular malformation and the most common benign solid liver tumour."
    },
    {
      "id": "haemangiom-en-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which ultrasound finding is typical for a small liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Well-defined hyperechoic lesion"
        },
        {
          "id": "B",
          "text": "Ill-defined hypoechoic lesion with capsular retraction"
        },
        {
          "id": "C",
          "text": "Gas echoes with posterior shadowing"
        },
        {
          "id": "D",
          "text": "Diffuse gallbladder wall thickening"
        }
      ],
      "correct": "A",
      "explanation": "Typical haemangiomas are usually hyperechoic and well-defined on ultrasound. If morphology is classic, further imaging is often unnecessary."
    },
    {
      "id": "haemangiom-en-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which dynamic CT pattern is classic for liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Peripheral nodular discontinuous enhancement with centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Arterial wash-in with portal venous wash-out and capsule"
        },
        {
          "id": "C",
          "text": "Thin-walled lesion without enhancement"
        },
        {
          "id": "D",
          "text": "Diffuse infiltrative growth along the bile ducts"
        }
      ],
      "correct": "A",
      "explanation": "Classic haemangioma shows peripheral nodular discontinuous enhancement with progressive centripetal fill-in on later phases."
    },
    {
      "id": "haemangiom-en-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What does the iris diaphragm phenomenon in liver haemangioma describe?",
      "options": [
        {
          "id": "A",
          "text": "Fill-in of the lesion from periphery to centre"
        },
        {
          "id": "B",
          "text": "Central wash-out in the delayed phase"
        },
        {
          "id": "C",
          "text": "Abrupt perfusion stop at the liver hilum"
        },
        {
          "id": "D",
          "text": "Ring-shaped abscess capsule"
        }
      ],
      "correct": "A",
      "explanation": "The iris diaphragm phenomenon describes centripetal contrast fill-in from the rim toward the centre."
    },
    {
      "id": "haemangiom-en-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which MRI finding is especially typical for a classic liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Very high T2 signal, the light-bulb sign"
        },
        {
          "id": "B",
          "text": "Marked T1-hyperintense fatty area with opposed-phase signal drop"
        },
        {
          "id": "C",
          "text": "Low T2 signal like fibrotic tissue"
        },
        {
          "id": "D",
          "text": "Only central diffusion restriction without enhancement"
        }
      ],
      "correct": "A",
      "explanation": "A classic haemangioma is very bright on T2, often even brighter than bile. This light-bulb sign is an important diagnostic clue."
    },
    {
      "id": "haemangiom-en-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "What is the typical DWI/ADC constellation in liver haemangioma?",
      "options": [
        {
          "id": "A",
          "text": "Bright DWI, high ADC: T2 shine-through"
        },
        {
          "id": "B",
          "text": "Bright DWI, low ADC: definite restriction"
        },
        {
          "id": "C",
          "text": "Dark DWI, ADC not measurable"
        },
        {
          "id": "D",
          "text": "DWI and ADC always normal"
        }
      ],
      "correct": "A",
      "explanation": "Haemangiomas may be hyperintense on high b-values. High ADC values indicate T2 shine-through and not true diffusion restriction."
    },
    {
      "id": "haemangiom-en-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "How does a typical haemangioma appear on delayed contrast phases?",
      "options": [
        {
          "id": "A",
          "text": "Increasingly homogeneous/isodense due to centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Always completely hypodense without enhancement"
        },
        {
          "id": "C",
          "text": "Early wash-out with pseudocapsule"
        },
        {
          "id": "D",
          "text": "Only rim gas-filled"
        }
      ],
      "correct": "A",
      "explanation": "On portal venous and delayed phases, centripetal fill-in increases. The lesion becomes progressively more homogeneous and may approach liver signal or density."
    },
    {
      "id": "haemangiom-en-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Why can larger haemangiomas look heterogeneous?",
      "options": [
        {
          "id": "A",
          "text": "Due to fibrosis, calcifications or thrombi"
        },
        {
          "id": "B",
          "text": "Due to obligatory malignant transformation"
        },
        {
          "id": "C",
          "text": "Due to air in the bile ducts"
        },
        {
          "id": "D",
          "text": "Due to focal fat infiltration of the renal cortex"
        }
      ],
      "correct": "A",
      "explanation": "Larger haemangiomas may become heterogeneous because of internal fibrosis, calcifications or thrombi. This does not automatically make them malignant."
    },
    {
      "id": "haemangiom-en-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which statement fits an atypical liver haemangioma better?",
      "options": [
        {
          "id": "A",
          "text": "No classic peripheral nodular enhancement, sometimes strong homogeneous arterial enhancement"
        },
        {
          "id": "B",
          "text": "Always homogeneous light-bulb T2 and complete classic centripetal fill-in"
        },
        {
          "id": "C",
          "text": "Never any enhancement"
        },
        {
          "id": "D",
          "text": "Always gas formation and fluid level"
        }
      ],
      "correct": "A",
      "explanation": "Atypical haemangiomas may lack classic peripheral nodular enhancement and centripetal fill-in and instead show strong homogeneous arterial enhancement."
    },
    {
      "id": "haemangiom-en-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "Which finding best helps avoid misdiagnosing a haemangioma as metastasis?",
      "options": [
        {
          "id": "A",
          "text": "High ADC and multiphasic centripetal fill-in"
        },
        {
          "id": "B",
          "text": "Low ADC and rapid wash-out"
        },
        {
          "id": "C",
          "text": "Irregular infiltrative growth"
        },
        {
          "id": "D",
          "text": "Capsular retraction with bile duct dilatation"
        }
      ],
      "correct": "A",
      "explanation": "High ADC values argue against true diffusion restriction. Together with multiphasic centripetal fill-in, this supports haemangioma."
    },
    {
      "id": "fnh-en-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement most accurately describes focal nodular hyperplasia (FNH)?",
      "options": [
        { "id": "A", "text": "Benign, regenerative liver lesion" },
        { "id": "B", "text": "Malignant primary liver tumour with metastatic potential" },
        { "id": "C", "text": "Bacterial liver abscess with central liquefaction" },
        { "id": "D", "text": "Cystic lesion with serous content" }
      ],
      "correct": "A",
      "explanation": "FNH is a benign, regenerative liver lesion, usually asymptomatic and not requiring treatment."
    },
    {
  "id": "fnh-en-02",
  "tags": [
    "fnh",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which statement about the epidemiology of FNH is correct?",
  "options": [
    {
      "id": "A",
      "text": "It is the most common benign liver lesion overall"
    },
    {
      "id": "B",
      "text": "It is the second most common benign solid liver tumour after haemangioma and predominantly affects women"
    },
    {
      "id": "C",
      "text": "It mainly occurs in elderly men"
    },
    {
      "id": "D",
      "text": "It is a precancerous lesion with a high risk of malignant transformation"
    }
  ],
  "correct": "B",
  "explanation": "After haemangioma, FNH is the second most common benign solid liver tumour, most often in young to middle-aged adults with a clear female predominance."
},
    {
      "id": "fnh-en-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which Doppler finding is typical for FNH?",
      "options": [
        { "id": "A", "text": "Central vessel with radiating branches (spoke-wheel pattern)" },
        { "id": "B", "text": "Complete absence of vessels within the lesion" },
        { "id": "C", "text": "Only peripheral venous vessels without a central vessel" },
        { "id": "D", "text": "Arteriovenous fistula with shunt flow" }
      ],
      "correct": "A",
      "explanation": "The spoke-wheel pattern – a central vessel with radiating branches – is a typical, though not definitive, Doppler finding of FNH."
    },
    {
      "id": "fnh-en-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does a typical FNH behave on the early arterial phase of CT?",
      "options": [
        { "id": "A", "text": "Peripheral nodular, discontinuous enhancement" },
        { "id": "B", "text": "Strong, homogeneous enhancement" },
        { "id": "C", "text": "Heterogeneous arterial enhancement with wash-out and a capsule in an at-risk liver" },
        { "id": "D", "text": "Peripheral nodular, discontinuous enhancement with centripetal fill-in" }
      ],
      "correct": "B",
      "explanation": "Unlike haemangioma, FNH shows strong, homogeneous enhancement in the early arterial phase without peripheral nodular enhancement."
    },
    {
      "id": "fnh-en-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is characteristic of FNH in the portal venous and delayed phases?",
      "options": [
        { "id": "A", "text": "Marked wash-out with hypodensity relative to the liver" },
        { "id": "B", "text": "No wash-out, with rapid equalisation to the liver parenchyma" },
        { "id": "C", "text": "Peripheral nodular enhancing foci with progressive centripetal fill-in" },
        { "id": "D", "text": "Arterial enhancement with possible wash-out in a hepatocellular adenoma" }
      ],
      "correct": "B",
      "explanation": "No wash-out with rapid equalisation fits the typical FNH pattern but does not alone exclude HCC. Risk context and full-phase assessment remain important."
    },
    {
      "id": "fnh-en-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does FNH typically appear on T1 and T2 relative to the liver parenchyma?",
      "options": [
        { "id": "A", "text": "Markedly hyperintense on T2, similar to simple fluid" },
        { "id": "B", "text": "Iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2" },
        { "id": "C", "text": "Signal loss on opposed-phase T1 imaging due to intracellular fat" },
        { "id": "D", "text": "T1 hypointensity and T2 hyperintensity with restricted diffusion" }
      ],
      "correct": "B",
      "explanation": "FNH is usually iso- to mildly hypointense on T1 and iso- to mildly hyperintense on T2 relative to the liver parenchyma, so it is often only subtly visible on non-contrast images."
    },
    {
      "id": "fnh-en-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does the central scar of FNH behave on MRI?",
      "options": [
        { "id": "A", "text": "Hyperintense on T2, hypointense on T1, with delayed enhancement" },
        { "id": "B", "text": "Hypointense on T1 and T2 with little or no delayed enhancement" },
        { "id": "C", "text": "T2 hyperintense but with avid early arterial enhancement" },
        { "id": "D", "text": "Hyperintense on both T1 and T2, without delayed enhancement" }
      ],
      "correct": "A",
      "explanation": "The central scar is hyperintense on T2, hypointense on T1, and shows delayed enhancement – characteristic in about 70% of cases."
    },
    {
      "id": "fnh-en-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which hepatobiliary-phase signal favours FNH over hepatocellular adenoma?",
      "options": [
        { "id": "A", "text": "FNH is usually iso- to hyperintense; adenomas are more often hypointense" },
        { "id": "B", "text": "FNH is usually hypointense; adenomas are usually iso- to hyperintense" },
        { "id": "C", "text": "Both lesions are typically markedly hyperintense" },
        { "id": "D", "text": "The hepatobiliary phase does not help distinguish them" }
      ],
      "correct": "A",
      "explanation": "FNH often takes up hepatobiliary-specific contrast and is iso- to hyperintense; many adenomas remain hypointense. This supports differentiation but is not definitive because subtypes and exceptions exist. Source: ACG 2024."
    },
    {
      "id": "fnh-en-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which features can occur in atypical FNH?",
      "options": [
        { "id": "A", "text": "Absent central scar, heterogeneous appearance, pseudocapsule, or intralesional fat" },
        { "id": "B", "text": "Homogeneous arterial enhancement without wash-out and with a central scar" },
        { "id": "C", "text": "Peripheral nodular enhancement with centripetal fill-in" },
        { "id": "D", "text": "Arterial enhancement with wash-out and a capsule in an at-risk liver" }
      ],
      "correct": "A",
      "explanation": "Atypical FNH (~20%) may occur without a central scar or show a heterogeneous appearance, pseudocapsule, absent scar enhancement, or intralesional fat, which can make differentiation from other liver tumours difficult."
    },
    {
      "id": "fnh-en-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which statement applies to typical, confidently diagnosed FNH without symptoms?",
      "options": [
        { "id": "A", "text": "No treatment and usually no follow-up; underlying vascular liver disease is an exception" },
        { "id": "B", "text": "Annual MRI follow-up is required for every typical FNH" },
        { "id": "C", "text": "Biopsy is routinely required even when combined imaging features are typical" },
        { "id": "D", "text": "A single atypical feature requires immediate resection" }
      ],
      "correct": "A",
      "explanation": "EASL recommends neither treatment nor routine follow-up for typical FNH; underlying vascular liver disease is an exception. Atypical imaging should be assessed by an appropriate specialist team, not treated as an automatic indication for resection."
    },
    {
      "id": "avm-en-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What pathophysiologically characterises a hepatic arteriovenous malformation (AVM)?",
      "options": [
        { "id": "A", "text": "An abnormal direct connection between an artery and a venous vessel without an intervening capillary bed" },
        { "id": "B", "text": "A benign regenerative mass composed of hyperplastic liver tissue" },
        { "id": "C", "text": "A cystic mass containing serous fluid" },
        { "id": "D", "text": "A focal accumulation of fat within the liver parenchyma" }
      ],
      "correct": "A",
      "explanation": "A hepatic AVM is an abnormal direct connection between an artery and a venous vessel without an intervening capillary bed, allowing high-velocity, low-resistance blood flow directly from the arterial to the venous side."
    },
    {
      "id": "avm-en-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which vessel finding indicates an arterioportal shunt?",
      "options": [
        { "id": "A", "text": "Early opacification of a hepatic vein from the hepatic artery" },
        { "id": "B", "text": "Early opacification of a portal vein branch from the hepatic artery" },
        { "id": "C", "text": "A connection between a portal vein branch and hepatic vein" },
        { "id": "D", "text": "Late portal vein opacification after normal hepatic transit" }
      ],
      "correct": "B",
      "explanation": "An arterioportal connection causes premature opacification of a portal vein branch during the arterial phase. Early hepatic-vein opacification indicates an arteriovenous shunt."
    },
    {
      "id": "avm-en-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which condition is the most important congenital cause of multiple hepatic AVMs?",
      "options": [
        { "id": "A", "text": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease)" },
        { "id": "B", "text": "Wilson's disease" },
        { "id": "C", "text": "Haemochromatosis" },
        { "id": "D", "text": "Alpha-1 antitrypsin deficiency" }
      ],
      "correct": "A",
      "explanation": "Hereditary haemorrhagic telangiectasia (HHT, Osler-Weber-Rendu disease) is the most important congenital cause of multiple, diffusely distributed hepatic AV shunts."
    },
    {
      "id": "avm-en-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which cause best fits an acquired hepatic AVM?",
      "options": [
        { "id": "A", "text": "Iatrogenic, following liver biopsy or TIPS placement" },
        { "id": "B", "text": "A congenital liver cyst" },
        { "id": "C", "text": "Chronic viral hepatitis alone" },
        { "id": "D", "text": "A physiological age-related change" }
      ],
      "correct": "A",
      "explanation": "Acquired hepatic AVMs mainly arise from trauma or iatrogenic causes, such as liver biopsy, TIPS placement, or surgery."
    },
    {
      "id": "avm-en-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "Which spectral Doppler waveform is expected in a normal hepatic vein?",
      "options": [
        { "id": "A", "text": "Relatively continuous, hepatopetal flow as in the portal vein" },
        { "id": "B", "text": "Cardiac-phasic, normally triphasic flow" },
        { "id": "C", "text": "Continuous high-velocity arterial flow" },
        { "id": "D", "text": "Physiologically no detectable flow" }
      ],
      "correct": "B",
      "explanation": "Normal hepatic venous flow is cardiac-phasic and usually triphasic. Portal venous flow is usually hepatopetal and relatively continuous. An arterialised waveform may suggest a shunt depending on the vessel involved, but must be interpreted in context."
    },
    {
      "id": "avm-en-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How does the resistive index (RI) of the feeding artery typically behave in an AV shunt?",
      "options": [
        { "id": "A", "text": "Markedly increased" },
        { "id": "B", "text": "Markedly decreased" },
        { "id": "C", "text": "Unchanged compared with the contralateral side" },
        { "id": "D", "text": "Not measurable" }
      ],
      "correct": "B",
      "explanation": "Due to the low resistance of the shunt, the resistive index of the feeding artery drops markedly, recognisable by a high diastolic flow velocity."
    },
    {
      "id": "avm-en-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the key CT sign of a hepatic AVM?",
      "options": [
        { "id": "A", "text": "Centripetal contrast filling in the delayed phase" },
        { "id": "B", "text": "Premature opacification of the draining vein during the arterial phase (\"early venous filling sign\")" },
        { "id": "C", "text": "Homogeneously hypodense lesion in all phases" },
        { "id": "D", "text": "Calcifications within the centre of the lesion" }
      ],
      "correct": "B",
      "explanation": "The early venous filling sign - premature arterial-phase opacification of the draining vein - is the key finding of a hepatic AVM on CT and MRI."
    },
    {
      "id": "avm-en-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What is the term for focal, wedge-shaped hyperperfusion around an AVM in the early arterial phase?",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "Central scar" },
        { "id": "C", "text": "Transient hepatic attenuation/intensity difference (THAD/THID)" },
        { "id": "D", "text": "Pseudocapsule" }
      ],
      "correct": "C",
      "explanation": "Transient, focal or wedge-shaped hyperperfusion around an AV shunt is called THAD/THID and can mimic a hypervascular lesion such as FNH or HCC."
    },
    {
      "id": "avm-en-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "How do AV malformations typically appear on T1- and T2-weighted MRI sequences?",
      "options": [
        { "id": "A", "text": "Homogeneously hyperintense with slow, centripetal contrast enhancement like a haemangioma" },
        { "id": "B", "text": "As serpiginous signal-void structures (flow voids) due to rapid flow" },
        { "id": "C", "text": "As fat-equivalent signal intensity on all sequences" },
        { "id": "D", "text": "As a sharply circumscribed cystic mass with a fluid level" }
      ],
      "correct": "B",
      "explanation": "Rapidly flowing blood within dilated vessels produces flow voids - serpiginous, signal-void structures on T1- and T2-weighted sequences."
    },
    {
      "id": "avm-en-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "What clinical consequence can result from extensive HHT-associated hepatic involvement with multiple AV shunts?",
      "options": [
        { "id": "A", "text": "Acute renal failure" },
        { "id": "B", "text": "High-output heart failure and portal hypertension" },
        { "id": "C", "text": "Acute pancreatitis" },
        { "id": "D", "text": "Hypothyroidism" }
      ],
      "correct": "B",
      "explanation": "Multiple hepatic AV shunts can lead to high-output heart failure via increased cardiac output, and to portal hypertension via arterioportal shunting."
    },
    {
  "id": "hcc-en-01",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Four adults have an untreated liver observation; none has chronic hepatitis B or prior HCC. Which setting is eligible for diagnostic CT/MRI LI-RADS v2018?",
  "options": [
    {
      "id": "A",
      "text": "Hepatitis-C-related cirrhosis"
    },
    {
      "id": "B",
      "text": "Metabolic steatosis without cirrhosis"
    },
    {
      "id": "C",
      "text": "Chronic hepatitis C without cirrhosis"
    },
    {
      "id": "D",
      "text": "Cirrhosis due to cardiac congestive hepatopathy"
    }
  ],
  "correct": "A",
  "explanation": "CT/MRI LI-RADS v2018 requires the defined adult risk population with cirrhosis, chronic HBV or current/prior HCC, and suitable multiphasic imaging. Certain vascular causes of cirrhosis are excluded. Outside that population the typical pattern is not equivalent noninvasive diagnostic evidence.",
  "wrongExplanations": {
    "B": "Steatosis without cirrhosis or the other specified risk factors is outside the diagnostic LI-RADS population.",
    "C": "Hepatitis C alone without cirrhosis does not meet v2018 eligibility here; chronic hepatitis B is a separate qualifying setting.",
    "D": "ACR excludes cirrhosis from cardiac congestion and certain other vascular disorders because benign hyperplastic nodules may mimic HCC."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-02",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which multiphasic pattern is classic for HCC in an eligible at-risk population?",
  "options": [
    {
      "id": "A",
      "text": "Nonrim APHE followed by nonperipheral washout in a permissible phase"
    },
    {
      "id": "B",
      "text": "Discontinuous peripheral enhancing nodules with progressive centripetal fill-in"
    },
    {
      "id": "C",
      "text": "An arterial enhancing rim with delayed central enhancement"
    },
    {
      "id": "D",
      "text": "Homogeneous arterial hyperenhancement with later equilibration to liver"
    }
  ],
  "correct": "A",
  "explanation": "Nonrim APHE and nonperipheral washout form the classic dynamic pattern. A formal category additionally requires size, eligibility and the remaining algorithm rules. APHE alone is not specific.",
  "wrongExplanations": {
    "B": "This vascular nodular fill-in pattern is typical of haemangioma, not the HCC pattern requested.",
    "C": "An arterial rim with progressive central enhancement is a targetoid warning pattern for malignancy not specific to HCC; distinguish it from nonrim APHE.",
    "D": "This may occur in benign hypervascular lesions such as typical FNH. The nonperipheral washout requested is absent."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-03",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "On gadoxetate-enhanced MRI, which temporal comparison can establish the major feature of nonperipheral washout?",
  "options": [
    {
      "id": "A",
      "text": "A previously enhancing observation shows nonperipheral relative hypoenhancement to liver in the portal venous phase"
    },
    {
      "id": "B",
      "text": "An observation is isointense in the portal venous phase and becomes relatively hypointense only in the transitional phase"
    },
    {
      "id": "C",
      "text": "An observation is isointense in the portal venous phase and becomes relatively hypointense only in the hepatobiliary phase"
    },
    {
      "id": "D",
      "text": "An observation is already hypointense before contrast and remains dark in the portal venous phase without a demonstrated temporal enhancement change"
    }
  ],
  "correct": "A",
  "explanation": "With gadoxetate, major-feature washout is assessed only in the portal venous phase. Transitional or hepatobiliary hypointensity may reflect liver uptake and is an ancillary feature, not a substitute for this washout. With extracellular agents an appropriate delayed phase may also be used.",
  "wrongExplanations": {
    "B": "Hypointensity appearing only in the transitional phase does not count as major-feature washout with gadoxetate.",
    "C": "Hepatobiliary hypointensity supports malignancy but is not HCC-specific and is not major-feature washout.",
    "D": "Static hypointensity alone does not demonstrate temporal reduction in relative enhancement. Compare an appropriate earlier contrast phase with the later phase."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-04",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which peripheral finding best fits the LI-RADS major feature of enhancing capsule?",
  "options": [
    {
      "id": "A",
      "text": "A smooth uniform enhancing border in the portal venous, delayed or transitional phase"
    },
    {
      "id": "B",
      "text": "A thick irregular arterial enhancing rim around a less-enhancing centre"
    },
    {
      "id": "C",
      "text": "Separate discontinuous peripheral enhancing nodules with central fill-in"
    },
    {
      "id": "D",
      "text": "A definable peripheral border without demonstrated enhancement"
    }
  ],
  "correct": "A",
  "explanation": "Enhancing capsule is a smooth uniform sharp enhancing border, more conspicuous than fibrosis around background nodules. It is an imaging appearance, not standalone histological proof of a capsule or HCC.",
  "wrongExplanations": {
    "B": "An arterial rim is different from a later smooth capsule appearance and may support LR-M classification.",
    "C": "Peripheral enhancing nodules with fill-in favour haemangioma and do not form a uniform capsule border.",
    "D": "Without demonstrated enhancement the major feature is not met; a nonenhancing capsule is handled separately as an ancillary feature."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-05",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "How does HCC most often appear relative to liver in the hepatobiliary phase of gadoxetate MRI?",
  "options": [
    {
      "id": "A",
      "text": "Hypointense"
    },
    {
      "id": "B",
      "text": "Isointense"
    },
    {
      "id": "C",
      "text": "Hyperintense"
    },
    {
      "id": "D",
      "text": "Higher central signal with a peripheral hypointense targetoid rim"
    }
  ],
  "correct": "A",
  "explanation": "Many HCCs show reduced hepatobiliary uptake, associated in part with reduced hepatocellular uptake-transporter expression. Preserved or increased expression can explain iso-/hyperintense HCC. Signal alone therefore establishes neither HCC nor benignity.",
  "wrongExplanations": {
    "B": "Isointense HCC occurs with preserved uptake but is not the most common pattern. Isointensity does not exclude HCC.",
    "C": "Hyperintense HCC is possible with appropriate transporter expression, but hypointensity is more common.",
    "D": "A targetoid hepatobiliary pattern differs from the classic homogeneous hypointense pattern and may prompt LR-M assessment; it is not HCC-specific."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/20663969/"
},
    {
  "id": "hcc-en-06",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which combination supports true restricted diffusion as an ancillary feature in an observation suspicious for HCC?",
  "options": [
    {
      "id": "A",
      "text": "High DWI signal with corresponding low ADC"
    },
    {
      "id": "B",
      "text": "High DWI signal with preserved or high ADC and marked T2 signal"
    },
    {
      "id": "C",
      "text": "Low DWI signal with high ADC"
    },
    {
      "id": "D",
      "text": "High DWI signal with ADC rendered uninterpretable by artefact"
    }
  ],
  "correct": "A",
  "explanation": "DWI brightness with corresponding low ADC supports true restriction. This ancillary feature is not HCC-specific and cannot independently upgrade an observation to LR-5.",
  "wrongExplanations": {
    "B": "This instead supports T2 shine-through rather than established restriction; it is not standalone proof of benignity either.",
    "C": "Low DWI signal and high ADC do not support the restricted diffusion asked about.",
    "D": "Without interpretable ADC, DWI brightness alone cannot reliably confirm restriction."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-07",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "For a portal venous filling defect, which additional finding most strongly establishes tumour in vein?",
  "options": [
    {
      "id": "A",
      "text": "Unequivocal enhancement of intraluminal soft tissue confirmed against precontrast imaging"
    },
    {
      "id": "B",
      "text": "Venous expansion without established intraluminal enhancement"
    },
    {
      "id": "C",
      "text": "Restricted diffusion within the filling defect without established enhancement"
    },
    {
      "id": "D",
      "text": "Contact between the filling defect and a liver mass without established enhancement"
    }
  ],
  "correct": "A",
  "explanation": "Unequivocal enhancing soft tissue in a vein is the core criterion. Report extent and involved veins. LR-TIV is not synonymous with HCC; other malignancies may also invade veins.",
  "wrongExplanations": {
    "B": "Venous expansion is a clue but cannot independently establish tumour thrombus.",
    "C": "Restriction is an additional clue but does not replace unequivocal enhancing soft tissue.",
    "D": "Adjacency to a mass raises concern but, without established intraluminal enhancement, is not the defining core criterion."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-08",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which pattern fits infiltrative HCC and should prompt targeted malignancy evaluation?",
  "options": [
    {
      "id": "A",
      "text": "Ill-defined permeative growth across several segments with variable enhancement and suspicious vascular invasion"
    },
    {
      "id": "B",
      "text": "A sharply defined solitary nodule with homogeneous APHE and a smooth capsule"
    },
    {
      "id": "C",
      "text": "Wedge-shaped arterial hyperenhancement with undistorted vessels and no mass"
    },
    {
      "id": "D",
      "text": "A geographic fibrotic area with capsular retraction and progressive delayed enhancement"
    }
  ],
  "correct": "A",
  "explanation": "Infiltrative HCC can blend into cirrhotic parenchyma and show typical enhancement only heterogeneously or focally. Vascular invasion and the whole multiphasic pattern are important clues; targeted evaluation remains necessary.",
  "wrongExplanations": {
    "B": "This is a nodular rather than permeative infiltrative pattern. HCC can be nodular, but the question asks about the infiltrative form.",
    "C": "A wedge-shaped non-mass finding with undistorted vessels favours a perfusion change and differs from the suspicious growth described.",
    "D": "This favours confluent fibrosis, an important differential; it is not equivalent to the invasive pattern in the requested constellation."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3538368/"
},
    {
  "id": "hcc-en-09",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Which multiphasic MRI pattern with an extracellular agent more strongly favours HCC over typical FNH in an appropriate risk context?",
  "options": [
    {
      "id": "A",
      "text": "Nonrim APHE with nonperipheral portal venous or delayed washout"
    },
    {
      "id": "B",
      "text": "Homogeneous arterial hyperenhancement with later isointensity to liver"
    },
    {
      "id": "C",
      "text": "Early hyperenhancement, later equilibration with liver and delayed enhancement of a central scar"
    },
    {
      "id": "D",
      "text": "Peripheral enhancing nodules with centripetal fill-in and blood-pool behaviour"
    }
  ],
  "correct": "A",
  "explanation": "Typical FNH shows strong arterial enhancement without nonperipheral washout. The specified washout favours HCC in context but alone does not establish a complete category or histology.",
  "wrongExplanations": {
    "B": "This homogeneous pattern without washout can fit typical FNH rather than the HCC-favouring feature sought.",
    "C": "A delayed-enhancing central scar with otherwise liver equilibration is compatible with typical FNH. Do not confuse a central scar with a peripheral capsule.",
    "D": "This nodular fill-in pattern favours haemangioma, not the typical HCC pattern."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-en-10",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "Text vignette: the HCC imaging report fully documents tumour number/size, segments, vascular invasion and metastases. Which additional clinical information is essential for BCLC staging?",
  "options": [
    {
      "id": "A",
      "text": "Liver function/decompensation and ECOG performance status"
    },
    {
      "id": "B",
      "text": "Histological differentiation grade and Ki-67 index"
    },
    {
      "id": "C",
      "text": "AFP concentration and viral load of the underlying hepatitis"
    },
    {
      "id": "D",
      "text": "Chronological age and body mass index"
    }
  ],
  "correct": "A",
  "explanation": "BCLC integrates tumour burden with liver function and performance status. Imaging provides the anatomical contribution; it does not determine stage and treatment without this clinical information.",
  "wrongExplanations": {
    "B": "Grade and proliferation may inform tumour biology but do not replace the clinical BCLC core elements of liver function and performance status.",
    "C": "AFP and viral load may matter for prognosis, aetiology or selected treatments; functional staging still requires liver function and ECOG.",
    "D": "Age and BMI affect individual decisions but do not substitute for direct liver-reserve and performance assessment."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
},
    {
      "id": "sarkoidose-en-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which histological feature is typical of sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Caseating granulomas"
        },
        {
          "id": "B",
          "text": "Non-caseating granulomas"
        },
        {
          "id": "C",
          "text": "Eosinophilic microabscesses"
        },
        {
          "id": "D",
          "text": "Squamous tumour nests"
        }
      ],
      "correct": "B",
      "explanation": "Sarcoidosis is a systemic granulomatous disease of unknown cause. Non-caseating granulomas are typical."
    },
    {
      "id": "sarkoidose-en-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which HRCT nodule distribution is typical for sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Perilymphatic along fissures, pleura and bronchovascular bundles"
        },
        {
          "id": "B",
          "text": "Purely random haematogenous without fissural relation"
        },
        {
          "id": "C",
          "text": "Only basal subpleural honeycombing"
        },
        {
          "id": "D",
          "text": "Exclusively centrilobular tree-in-bud"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoidosis typically shows sharply defined 2–4 mm micronodules in a perilymphatic distribution along fissures, pleura, septa and bronchovascular bundles."
    },
    {
      "id": "sarkoidose-en-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does the 1-2-3 sign describe in sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "Right hilum, left hilum and right paratracheal region"
        },
        {
          "id": "B",
          "text": "Three cavities in the right upper lobe"
        },
        {
          "id": "C",
          "text": "Three zones of pulmonary fibrosis"
        },
        {
          "id": "D",
          "text": "Three stages of cardiac sarcoidosis"
        }
      ],
      "correct": "A",
      "explanation": "The 1-2-3 sign describes the typical nodal distribution: right hilum, left hilum and right paratracheal region."
    },
    {
      "id": "sarkoidose-en-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which Scadding stage shows isolated bilateral hilar lymphadenopathy without parenchymal disease?",
      "options": [
        {
          "id": "A",
          "text": "Stage 0"
        },
        {
          "id": "B",
          "text": "Stage I"
        },
        {
          "id": "C",
          "text": "Stage III"
        },
        {
          "id": "D",
          "text": "Stage IV"
        }
      ],
      "correct": "B",
      "explanation": "Scadding stage I corresponds to isolated bilateral hilar lymphadenopathy with normal lung parenchyma."
    },
    {
      "id": "sarkoidose-en-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What does Scadding stage II mean?",
      "options": [
        {
          "id": "A",
          "text": "Fibrosis only"
        },
        {
          "id": "B",
          "text": "Parenchymal disease without lymphadenopathy"
        },
        {
          "id": "C",
          "text": "Bilateral hilar lymphadenopathy plus parenchymal disease"
        },
        {
          "id": "D",
          "text": "Normal chest X-ray"
        }
      ],
      "correct": "C",
      "explanation": "Stage II means BHL plus lung parenchymal abnormalities. Stage III is parenchymal disease without BHL, and stage IV is fibrosis."
    },
    {
      "id": "sarkoidose-en-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which statement about eggshell calcifications is correct?",
      "options": [
        {
          "id": "A",
          "text": "They are pathognomonic for sarcoidosis"
        },
        {
          "id": "B",
          "text": "They can also occur in silicosis"
        },
        {
          "id": "C",
          "text": "They always prove lymphoma"
        },
        {
          "id": "D",
          "text": "They occur only in asbestosis"
        }
      ],
      "correct": "B",
      "explanation": "Eggshell-like nodal calcifications can occur in sarcoidosis but are not specific and are also seen in silicosis."
    },
    {
      "id": "sarkoidose-en-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "What is the sarcoid galaxy sign?",
      "options": [
        {
          "id": "A",
          "text": "Large nodule surrounded by many small satellite nodules"
        },
        {
          "id": "B",
          "text": "Diffuse ground-glass opacity without nodules"
        },
        {
          "id": "C",
          "text": "Calcified pleural plaques"
        },
        {
          "id": "D",
          "text": "Central pulmonary embolism"
        }
      ],
      "correct": "A",
      "explanation": "The sarcoid galaxy sign consists of a larger granuloma aggregate surrounded by many small satellite nodules. It is not specific and can also occur in tuberculosis."
    },
    {
      "id": "sarkoidose-en-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which differential typically causes irregular nodular septal thickening, often unilateral or asymmetric?",
      "options": [
        {
          "id": "A",
          "text": "Lymphangitic carcinomatosis"
        },
        {
          "id": "B",
          "text": "Cardiogenic pulmonary oedema with smooth bilateral septal lines"
        },
        {
          "id": "C",
          "text": "Sarcoidosis with symmetric perilymphatic nodules"
        },
        {
          "id": "D",
          "text": "A UIP pattern with subpleural reticulation and honeycombing"
        }
      ],
      "correct": "A",
      "explanation": "Lymphangitic carcinomatosis often causes irregular nodular septal thickening and is frequently asymmetric or unilateral. Clinically, patients are often more severely ill."
    },
    {
      "id": "sarkoidose-en-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which triad defines Heerfordt syndrome?",
      "options": [
        {
          "id": "A",
          "text": "Uveitis, parotitis and facial palsy"
        },
        {
          "id": "B",
          "text": "Asthma, sinusitis and eosinophilia"
        },
        {
          "id": "C",
          "text": "Arthritis, urethritis and conjunctivitis"
        },
        {
          "id": "D",
          "text": "Haemoptysis, glomerulonephritis and sinusitis"
        }
      ],
      "correct": "A",
      "explanation": "Heerfordt syndrome is a manifestation of sarcoidosis with uveitis, parotitis and facial palsy."
    },
    {
      "id": "sarkoidose-en-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Which modality is especially suited to demonstrating myocardial scar or fibrosis in cardiac sarcoidosis?",
      "options": [
        {
          "id": "A",
          "text": "MRI with late gadolinium enhancement"
        },
        {
          "id": "B",
          "text": "FDG-PET for active inflammation, without direct scar characterisation"
        },
        {
          "id": "C",
          "text": "Echocardiography for functional assessment, with limited tissue characterisation"
        },
        {
          "id": "D",
          "text": "Coronary CT angiography for assessment of the coronary arteries"
        }
      ],
      "correct": "A",
      "explanation": "Cardiac MRI with late gadolinium enhancement depicts non-ischaemic myocardial scar and fibrosis. FDG-PET complements MRI by assessing active inflammation; the two tests answer different clinical questions."
    },
    {
  "id": "rotatorenmanschette-en-01",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which four muscles form the rotator cuff?",
  "options": [
    {
      "id": "A",
      "text": "Supraspinatus, infraspinatus, teres minor, subscapularis"
    },
    {
      "id": "B",
      "text": "Supraspinatus, infraspinatus, teres major, subscapularis"
    },
    {
      "id": "C",
      "text": "Supraspinatus, infraspinatus, teres minor, deltoid"
    },
    {
      "id": "D",
      "text": "Supraspinatus, long head of biceps, teres minor, subscapularis"
    }
  ],
  "correct": "A",
  "explanation": "The four cuff muscles are supraspinatus, infraspinatus, teres minor and subscapularis (SITS). Their tendons interweave with capsular and ligament fibres in the supporting structures around the humeral head.",
  "wrongExplanations": {
    "B": "Teres minor belongs to the cuff; teres major is not one of the four SITS muscles.",
    "C": "Subscapularis completes the anterior cuff; the deltoid does not replace it.",
    "D": "The long head of biceps is closely related to the pulley but does not replace the infraspinatus in the cuff."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/1624486/; https://pubmed.ncbi.nlm.nih.gov/12647876/"
},
    {
  "id": "rotatorenmanschette-en-02",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which region is classically termed the supraspinatus tendon’s “critical zone”?",
  "options": [
    {
      "id": "A",
      "text": "The tendon region near its insertion on the greater tuberosity"
    },
    {
      "id": "B",
      "text": "The musculotendinous junction medial to the acromion"
    },
    {
      "id": "C",
      "text": "The muscle origin in the supraspinous fossa"
    },
    {
      "id": "D",
      "text": "The subscapularis insertion on the lesser tuberosity"
    }
  ],
  "correct": "A",
  "explanation": "The term refers to an insertional region of the supraspinatus tendon historically described as relatively poorly vascularised. Perfusion varies by region and loading; this establishes neither an invariably avascular zone nor a single cause of every tear.",
  "wrongExplanations": {
    "B": "The musculotendinous junction lies farther medially and is not the classical insertional critical zone.",
    "C": "The term refers to tendon near its humeral insertion, not the muscle origin on the scapula.",
    "D": "That landmark belongs to the subscapularis, not the supraspinatus tendon."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323147/; https://pubmed.ncbi.nlm.nih.gov/18647848/; https://pubmed.ncbi.nlm.nih.gov/26412209/"
},
    {
  "id": "rotatorenmanschette-en-03",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which movement does the subscapularis substantially contribute to?",
  "options": [
    {
      "id": "A",
      "text": "External rotation of the arm"
    },
    {
      "id": "B",
      "text": "Abduction of the arm"
    },
    {
      "id": "C",
      "text": "Internal rotation of the arm"
    },
    {
      "id": "D",
      "text": "Horizontal abduction of the arm"
    }
  ],
  "correct": "C",
  "explanation": "Subscapularis contributes to internal rotation and glenohumeral stabilisation. Its contribution depends on arm position and muscle segment; the movement is not an isolated single-muscle function.",
  "wrongExplanations": {
    "A": "Infraspinatus and teres minor are important external rotators; the requested principal subscapularis movement is internal rotation.",
    "B": "Deltoid and supraspinatus substantially contribute to abduction; it is not the principal movement requested here.",
    "D": "Horizontal abduction is a different movement direction; the substantial rotational contribution requested for subscapularis is internal rotation."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/10888162/; https://pubmed.ncbi.nlm.nih.gov/28867549/"
},
    {
  "id": "rotatorenmanschette-en-04",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Unenhanced, non-arthrographic shoulder MRI should assess cuff defects in several planes. Which sequence group best supports that task?",
  "options": [
    {
      "id": "A",
      "text": "Coronal-oblique T1, axial T1 and sagittal-oblique T1"
    },
    {
      "id": "B",
      "text": "Coronal-oblique T2 fs, axial PD fs and sagittal-oblique T1"
    },
    {
      "id": "C",
      "text": "Coronal-oblique T1, axial T1 and sagittal-oblique GRE"
    },
    {
      "id": "D",
      "text": "Axial PD fs, coronal-oblique T1 and sagittal-oblique T1"
    }
  ],
  "correct": "B",
  "explanation": "The suitable group combines fat-suppressed fluid-sensitive images in more than one plane with a T1 acquisition for anatomy and muscle quality. A full protocol is tailored to the question and equipment; the choice does not guarantee detection of every partial tear.",
  "wrongExplanations": {
    "A": "T1 images depict anatomy but do not provide the multiplanar fat-suppressed fluid-sensitive assessment requested here.",
    "C": "This group does not replace the requested multiplanar fluid-sensitive assessment; GRE may be supplemental for selected questions.",
    "D": "Fluid-sensitive assessment is confined to the axial plane here; the other group adds the coronal-oblique plane."
  },
  "source": "https://www.essr.org/content-essr/uploads/2016/10/ESSR-MRI-Protocols-Shoulder.pdf; https://gravitas.acr.org/PPTS/DownloadPreviewDocument?DocId=45&ReleaseId=2"
},
    {
  "id": "rotatorenmanschette-en-05",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Text vignette: an intact tendon lies at about 55° to B0. Signal is increased on a short-TE acquisition and markedly decreases at longer TE. Which explanation fits best?",
  "options": [
    {
      "id": "A",
      "text": "Intratendinous partial tear"
    },
    {
      "id": "B",
      "text": "Orientation-dependent magic-angle phenomenon"
    },
    {
      "id": "C",
      "text": "Mucoid tendon degeneration"
    },
    {
      "id": "D",
      "text": "Calcium deposit within the tendon"
    }
  ],
  "correct": "B",
  "explanation": "Normal tendon can become bright near 55° to B0 on short-TE images. TE, orientation and morphology matter, rather than the T1/PD/T2 label alone. The decrease at longer TE with intact fibres favours a magic-angle effect here; do not diagnose a tear from a single image alone.",
  "wrongExplanations": {
    "A": "A tear needs compatible defect morphology; the vignette describes intact fibres and a TE-dependent signal change.",
    "C": "Degeneration can change tendon signal, but the supplied angle and TE dependence more strongly favour the orientation effect here.",
    "D": "A calcium deposit does not explain this orientation-dependent short-TE signal increase."
  },
  "source": "https://pubs.rsna.org/doi/10.1148/radiology.181.2.1924777; https://pubmed.ncbi.nlm.nih.gov/16709684/; https://pubmed.ncbi.nlm.nih.gov/20578021/"
},
    {
  "id": "rotatorenmanschette-en-06",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Beyond fluid in the subacromial bursa, which additional tendon finding supports a bursal-sided partial supraspinatus tear?",
  "options": [
    {
      "id": "A",
      "text": "A fluid-filled defect through the entire tendon thickness from joint to bursal surface"
    },
    {
      "id": "B",
      "text": "A fluid-equivalent superficial defect reaching the bursa with preserved articular fibres"
    },
    {
      "id": "C",
      "text": "A fluid-equivalent defect reaching the joint surface with an intact bursal surface"
    },
    {
      "id": "D",
      "text": "A focal defect within the tendon with both surfaces intact"
    }
  ],
  "correct": "B",
  "explanation": "The direct defect reaches the bursal surface without traversing the full tendon thickness; articular fibres remain intact. Bursal fluid alone with an intact tendon surface does not establish a tear. Check defect morphology in several planes.",
  "wrongExplanations": {
    "A": "A continuous joint-to-bursa defect describes a full-thickness tear, not an isolated bursal partial tear.",
    "C": "That surface contact would be articular rather than bursal.",
    "D": "With both surfaces preserved, the defect is intratendinous rather than open to the bursa."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-en-07",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "What does the term PASTA lesion denote at the supraspinatus footprint?",
  "options": [
    {
      "id": "A",
      "text": "A bursal-sided partial defect at the tendon insertion"
    },
    {
      "id": "B",
      "text": "An articular-sided partial avulsion at the tendon insertion"
    },
    {
      "id": "C",
      "text": "An intratendinous defect without contact with either surface"
    },
    {
      "id": "D",
      "text": "A full-thickness defect connecting joint and bursa"
    }
  ],
  "correct": "B",
  "explanation": "PASTA stands for Partial Articular Surface Tendon Avulsion: an articular-sided partial avulsion at the footprint. The term describes location and extent, not a proven cause of pain by itself. An internal posterosuperior impingement pattern may occur in overhead athletes in the appropriate clinical context.",
  "wrongExplanations": {
    "A": "PASTA refers to the articular surface, not a bursal-sided partial defect.",
    "C": "A purely intratendinous defect has no surface contact; PASTA reaches the joint-facing footprint.",
    "D": "Partial means that the full tendon thickness between the surfaces is not disrupted."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/; https://pubmed.ncbi.nlm.nih.gov/22959196/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pubmed.ncbi.nlm.nih.gov/16762713/"
},
    {
  "id": "rotatorenmanschette-en-08",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Text vignette: MRI shows a fluid-equivalent cleft and fibre defect within the supraspinatus tendon. Both tendon surfaces remain intact. Which classification fits best?",
  "options": [
    {
      "id": "A",
      "text": "Tendinopathy without a structural defect"
    },
    {
      "id": "B",
      "text": "Intratendinous partial tear"
    },
    {
      "id": "C",
      "text": "Bursal-sided partial tear"
    },
    {
      "id": "D",
      "text": "Articular-sided partial tear"
    }
  ],
  "correct": "B",
  "explanation": "An intratendinous tear lies within the tendon without reaching the articular or bursal surface. Fluid-equivalent signal and the stated fibre defect support that interpretation here. Increased T2 signal alone is insufficient: an anatomically intact degenerative tendon may also be T2-bright.",
  "wrongExplanations": {
    "A": "The vignette describes a fibre defect in addition to signal change, beyond signal-only tendinopathy.",
    "C": "A bursal-sided tear reaches the bursal surface, which is intact in the vignette.",
    "D": "An articular tear reaches the joint surface, which remains intact here."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/; https://pubmed.ncbi.nlm.nih.gov/20578021/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2465433/"
},
    {
  "id": "rotatorenmanschette-en-09",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Despite nonoperative treatment, symptoms persist and a PASTA lesion has a defect involving 60% of tendon thickness. Which interpretation is correct?",
  "options": [
    {
      "id": "A",
      "text": "More than half the tendon thickness is affected; repair is considered in the clinical context."
    },
    {
      "id": "B",
      "text": "More than half the anteroposterior footprint width is involved, thereby specifying tear depth."
    },
    {
      "id": "C",
      "text": "A full-thickness tear is present because the boundary to full tendon thickness is 50%."
    },
    {
      "id": "D",
      "text": "More than half the footprint area is involved, thereby specifying tear depth."
    }
  ],
  "correct": "A",
  "explanation": "The 50% refers to tendon thickness or tear depth. Mediolateral exposed footprint can estimate depth arthroscopically; area or anteroposterior width is not equivalent. Consider symptoms, function and previous treatment; the measurement alone does not mandate surgery.",
  "wrongExplanations": {
    "B": "Anteroposterior extent and tear depth are different dimensions; the question specifies the proportion of tendon thickness.",
    "C": "A full-thickness tear traverses the entire thickness; 60% remains a high-grade partial defect.",
    "D": "Area is not thickness. The stated depth proportion cannot be directly inferred from percentage footprint area."
  },
  "sources": [
    "https://pubmed.ncbi.nlm.nih.gov/15007313/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/"
  ]
},
    {
  "id": "rotatorenmanschette-en-10",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which direct MRI finding corresponds to a full-thickness rotator cuff defect?",
  "options": [
    {
      "id": "A",
      "text": "An articular-surface fluid defect with intact bursal fibres"
    },
    {
      "id": "B",
      "text": "A continuous tendon defect containing fluid between the joint and bursal surfaces"
    },
    {
      "id": "C",
      "text": "A bursal-surface fluid defect with intact articular fibres"
    },
    {
      "id": "D",
      "text": "An internal fluid defect with both tendon surfaces intact"
    }
  ],
  "correct": "B",
  "explanation": "Full-thickness describes disruption through the tendon from articular to bursal surface; a continuous fluid-filled defect is a typical direct sign. It does not automatically mean that the entire anteroposterior tendon width is affected or that the stump is retracted.",
  "wrongExplanations": {
    "A": "Preserved bursal fibres mean the defect is articular-sided and partial, not through the full thickness.",
    "C": "Preserved articular fibres describe a bursal-sided partial defect here.",
    "D": "A defect without communication to either surface is intratendinous."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5483776/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-en-11",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which reporting parameter is described by the commonly used Patte retraction grade?",
  "options": [
    {
      "id": "A",
      "text": "The proportion of fat relative to muscle"
    },
    {
      "id": "B",
      "text": "The position of the retracted tendon stump"
    },
    {
      "id": "C",
      "text": "The anteroposterior extent of the tendon defect"
    },
    {
      "id": "D",
      "text": "The depth of a partial defect relative to tendon thickness"
    }
  ],
  "correct": "B",
  "explanation": "The Patte retraction grade describes tendon-stump position, for example close to the footprint or retracted to the glenoid. Document retraction, defect size and muscle quality separately. The original Patte classification considered several characteristics and was not limited to this single parameter.",
  "wrongExplanations": {
    "A": "The fat-to-muscle proportion assesses fatty degeneration, not the retraction grade requested here.",
    "C": "Anteroposterior extent describes defect width, not the medial position of the stump.",
    "D": "Tear depth and tendon retraction are separate measurements."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323151/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4278262/"
},
    {
  "id": "rotatorenmanschette-en-12",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which observation describes a positive tangent sign on the sagittal-oblique shoulder Y view?",
  "options": [
    {
      "id": "A",
      "text": "The supraspinatus belly fails to cross above the line between the superior coracoid and scapular-spine margins"
    },
    {
      "id": "B",
      "text": "The supraspinatus belly clearly crosses above that same line"
    },
    {
      "id": "C",
      "text": "Fat exceeds muscle within the supraspinatus"
    },
    {
      "id": "D",
      "text": "The tendon stump is retracted to glenoid level"
    }
  ],
  "correct": "A",
  "explanation": "The reference line joins the superior coracoid margin and superior scapular-spine margin. Failure of the supraspinatus belly to cross it supports muscle atrophy. Fatty infiltration and tendon retraction are separate reporting parameters.",
  "wrongExplanations": {
    "B": "Crossing the line is a negative rather than positive tangent sign.",
    "C": "The fat-to-muscle proportion describes fatty degeneration, not the geometric tangent sign.",
    "D": "That describes tendon retraction; the tangent sign assesses the muscle belly against its reference line."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/9525755/"
},
    {
  "id": "rotatorenmanschette-en-13",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Which feature is described by the Goutallier classification?",
  "options": [
    {
      "id": "A",
      "text": "Retraction of the tendon stump"
    },
    {
      "id": "B",
      "text": "Fatty infiltration of muscle, from grade 0 to4"
    },
    {
      "id": "C",
      "text": "Depth of a partial tendon defect"
    },
    {
      "id": "D",
      "text": "Anteroposterior width of a full-thickness tear"
    }
  ],
  "correct": "B",
  "explanation": "Goutallier describes fatty infiltration from grade 0 (no fat) to grade 4 (more fat than muscle). High grades are an adverse prognostic factor for healing but do not alone determine repairability or individual functional benefit; integrate the other tendon, muscle and clinical findings.",
  "wrongExplanations": {
    "A": "Retraction and fatty infiltration are separate parameters; Goutallier grades the muscle.",
    "C": "Tear depth describes the tendon rather than the fat-to-muscle proportion.",
    "D": "Anteroposterior tear width measures extent, not muscle quality."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8020238/; https://pubmed.ncbi.nlm.nih.gov/17418325/"
},
    {
  "id": "rotatorenmanschette-en-14",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "Text vignette: a spur on the acromial undersurface projects into the subacromial space. Which mechanical relationship fits anatomically?",
  "options": [
    {
      "id": "A",
      "text": "Narrowing between the coracoid and lesser tuberosity at subscapularis"
    },
    {
      "id": "B",
      "text": "A possible bony narrowing factor at the subacromial tendon–bursa passage"
    },
    {
      "id": "C",
      "text": "Contact of the posterior articular cuff with the posterosuperior glenoid"
    },
    {
      "id": "D",
      "text": "Instability of the long head of biceps at the medial pulley"
    }
  ],
  "correct": "B",
  "explanation": "The stated location fits a possible subacromial outlet narrowing. A spur or Bigliani shape alone proves neither symptomatic impingement nor a tear: combine morphology with tendon/bursal findings and clinical assessment. Spurs may be associated with cuff change and can also develop secondarily.",
  "wrongExplanations": {
    "A": "That is a subcoracoid relationship anterior to the humeral head, not the stated acromial undersurface.",
    "C": "That describes intra-articular posterosuperior contact; the spur is in the subacromial outlet.",
    "D": "The medial biceps pulley is a different anatomic region from the stated subacromial passage."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16337525/; https://pubmed.ncbi.nlm.nih.gov/12934022/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3725773/; https://pubmed.ncbi.nlm.nih.gov/22959196/"
},
    {
  "id": "rotatorenmanschette-en-15",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "MRI shows the long head of biceps medially outside the bicipital groove. Which region particularly warrants targeted assessment for associated injury?",
  "options": [
    {
      "id": "A",
      "text": "Supraspinatus insertion on the greater tuberosity"
    },
    {
      "id": "B",
      "text": "Upper subscapularis and biceps pulley"
    },
    {
      "id": "C",
      "text": "Posterior infraspinatus insertion"
    },
    {
      "id": "D",
      "text": "Posteroinferior teres-minor insertion"
    }
  ],
  "correct": "B",
  "explanation": "Medial subluxation/dislocation of the long head of biceps is an important clue to upper-subscapularis and supporting-structure injury. Assess the tendon and pulley directly; this indirect sign does not by itself define every tear’s extent. Conversely, a normally located biceps does not exclude a subscapularis lesion.",
  "wrongExplanations": {
    "A": "Supraspinatus belongs in cuff assessment, but medial biceps instability particularly directs attention to upper subscapularis/pulley here.",
    "C": "The posterior infraspinatus insertion is not the anterior biceps-supporting structure at issue here.",
    "D": "Teres minor belongs to the posterior cuff, not the medial biceps sling at upper subscapularis."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6151251/; https://pubmed.ncbi.nlm.nih.gov/1624486/"
}
  ],
  "fa": [
    ...GEHIRN_CHIARI_QUESTIONS.fa,
    ...GEHIRN_NF1_QUESTIONS.fa,
    ...GEHIRN_PRES_QUESTIONS.fa,
    ...MAMMA_MRT_QUESTIONS.fa,
    ...MAMMA_MRT_LESION_QUESTIONS.fa,
    ...MAMMA_KAISER_QUESTIONS.fa,
    ...MAMMA_MRT_SPECIAL_CARCINOMA_QUESTIONS.fa,
    ...MAMMOGRAPHY_BASICS_QUESTIONS.fa,
    ...MAMMOGRAPHY_CALCIFICATIONS_QUESTIONS.fa,
    ...CARDIOMYOPATHY_QUESTIONS.fa,
    ...ARVC_QUESTIONS.fa,
    ...MYOCARDIAL_INJURY_QUESTIONS.fa,
    ...FLEISCHNER_QUESTIONS.fa,
    ...CONTRAST_QUESTIONS.fa,
    ...DIVERTICULITIS_QUESTIONS.fa,
    ...PANCREATITIS_QUESTIONS.fa,
    ...STROKE_QUESTIONS.fa,
    ...ICB_QUESTIONS.fa,
    ...HIE_QUESTIONS.fa,
    ...SAB_QUESTIONS('fa'),
    ...EDH_QUESTIONS.fa,
    ...MIDLINE_CAVA_QUESTIONS.fa,
    ...SDH_QUESTIONS.fa,
    ...DISSECTION_QUESTIONS.fa,
    ...MOYAMOYA_QUESTIONS.fa,
    ...HMA_QUESTIONS.fa,
    ...CAA_QUESTIONS.fa,
    ...MIGRAINE_QUESTIONS.fa,
    ...CADASIL_QUESTIONS.fa,
    ...DVA_QUESTIONS.fa,
    ...KAVERNOM_QUESTIONS.fa,
    ...NPH_QUESTIONS.fa,
    ...TELEANGIEKTASIE_QUESTIONS.fa,
    ...SVT_QUESTIONS.fa,
    ...FRAKTUR_QUESTIONS.fa,
    ...DAVF_QUESTIONS.fa,
    ...AVM_QUESTIONS.fa,
    ...FRAKTUR_KINDER_QUESTIONS.fa,
    ...AK_LUXATION_QUESTIONS.fa,
    ...RADIUSKOPF_QUESTIONS.fa,
    ...UNTERARM_QUESTIONS.fa,
    ...DISTALE_RADIUS_QUESTIONS.fa,
    ...SCAPHOID_QUESTIONS.fa,
    ...THUMB_UCL_QUESTIONS.fa,
    ...KNIE_LIGAMENTE_QUESTIONS.fa,
    ...SPINE_TRAUMA_QUESTIONS.fa,
    ...HRCT_QUESTIONS.fa,
    ...MENISCUS_QUESTIONS.fa,
    {
      "id": "haemangiom-fa-01",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت همانژیوم کبدی را دقیق‌تر توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "مالفورماسیون کاورنوز غیرنئوپلاستیک"
        },
        {
          "id": "B",
          "text": "متاستاز داخل کبدی همراه نکروز"
        },
        {
          "id": "C",
          "text": "ضایعه پیش‌بدخیم هپاتوسلولار"
        },
        {
          "id": "D",
          "text": "آبسه باکتریال کبد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کبدی یک مالفورماسیون عروقی کاورنوز و غیرنئوپلاستیک است و شایع‌ترین تومور جامد خوش‌خیم کبد محسوب می‌شود."
    },
    {
      "id": "haemangiom-fa-02",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته سونوگرافی برای همانژیوم کوچک کبدی تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "ضایعه اکوژن و خوش‌حد"
        },
        {
          "id": "B",
          "text": "ضایعه هیپواکو و بدحد همراه با کشیدگی کپسول"
        },
        {
          "id": "C",
          "text": "اکوهای گاز با سایه خلفی"
        },
        {
          "id": "D",
          "text": "ضخیم‌شدن منتشر دیواره کیسه صفرا"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم تیپیک در سونوگرافی معمولاً اکوژن و خوش‌حد است. اگر مورفولوژی کلاسیک باشد، اغلب تصویربرداری بیشتر لازم نیست."
    },
    {
      "id": "haemangiom-fa-03",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام الگوی CT دینامیک برای همانژیوم کبدی کلاسیک است؟",
      "options": [
        {
          "id": "A",
          "text": "تقویت پس از تزریق ندولار محیطی و ناپیوسته با پرشدگی مرکزگرا"
        },
        {
          "id": "B",
          "text": "wash-in شریانی با واش‌اوت پورتال و کپسول"
        },
        {
          "id": "C",
          "text": "ضایعه نازک‌دیواره بدون تقویت پس از تزریق"
        },
        {
          "id": "D",
          "text": "رشد انفیلتراتیو منتشر در امتداد مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "الگوی کلاسیک همانژیوم، تقویت پس از تزریق ندولار و ناپیوسته محیطی است که در فازهای بعدی به صورت مرکزگرا پر می‌شود."
    },
    {
      "id": "haemangiom-fa-04",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "پدیده پدیده دیافراگم عنبیه در همانژیوم کبدی چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "پرشدگی ضایعه از محیط به مرکز"
        },
        {
          "id": "B",
          "text": "واش‌اوت مرکزی در فاز تأخیری"
        },
        {
          "id": "C",
          "text": "قطع ناگهانی پرفیوژن در ناف کبد"
        },
        {
          "id": "D",
          "text": "کپسول حلقوی آبسه"
        }
      ],
      "correct": "A",
      "explanation": "پدیده پدیده دیافراگم عنبیه یعنی پرشدگی مرکزگرا با ماده حاجب از حاشیه به سمت مرکز."
    },
    {
      "id": "haemangiom-fa-05",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته MRI برای همانژیوم کلاسیک کبدی بسیار تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "سیگنال بسیار بالا در T2 به‌صورت علامت لامپ روشن (Light-bulb sign)"
        },
        {
          "id": "B",
          "text": "ناحیه چربی T1 هایپراینتنس با افت سیگنال در opposed phase"
        },
        {
          "id": "C",
          "text": "سیگنال T2 پایین شبیه بافت فیبروتیک"
        },
        {
          "id": "D",
          "text": "فقط محدودیت انتشار مرکزی بدون تقویت پس از تزریق"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم کلاسیک در T2 بسیار روشن است و گاهی حتی از صفرا روشن‌تر دیده می‌شود. علامت لامپ روشن (Light-bulb sign) یک سرنخ مهم تشخیصی است."
    },
    {
      "id": "haemangiom-fa-06",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "الگوی تیپیک DWI/ADC در همانژیوم کبدی چیست؟",
      "options": [
        {
          "id": "A",
          "text": "DWI روشن و ADC بالا: اثر عبور سیگنال T2 (shine-through)"
        },
        {
          "id": "B",
          "text": "DWI روشن، ADC پایین: محدودیت قطعی"
        },
        {
          "id": "C",
          "text": "DWI تیره، ADC غیرقابل اندازه‌گیری"
        },
        {
          "id": "D",
          "text": "DWI و ADC همیشه طبیعی"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم ممکن است در مقادیر بالای b پرسیگنال باشد؛ اما ADC بالا نشان‌دهنده اثر عبور سیگنال T2 (shine-through) است، نه محدودیت واقعی انتشار."
    },
    {
      "id": "haemangiom-fa-07",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "همانژیوم تیپیک در فازهای تأخیری کنتراست چگونه دیده می‌شود؟",
      "options": [
        {
          "id": "A",
          "text": "به علت پرشدگی مرکزگرا به‌تدریج هموژن یا ایزواینتنس می‌شود"
        },
        {
          "id": "B",
          "text": "همیشه کاملاً هیپودنس و بدون تقویت پس از تزریق می‌ماند"
        },
        {
          "id": "C",
          "text": "واش‌اوت زودرس با پسودوکپسول"
        },
        {
          "id": "D",
          "text": "فقط حاشیه پر از گاز دارد"
        }
      ],
      "correct": "A",
      "explanation": "در فاز پورتال و تأخیری، پرشدگی مرکزگرا بیشتر می‌شود و ضایعه به دانسیته/سیگنال خون یا کبد نزدیک می‌شود."
    },
    {
      "id": "haemangiom-fa-08",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "چرا همانژیوم‌های بزرگ‌تر ممکن است ناهمگون دیده شوند؟",
      "options": [
        {
          "id": "A",
          "text": "به علت فیبروز، کلسیفیکاسیون یا ترومبوز"
        },
        {
          "id": "B",
          "text": "به علت تبدیل بدخیم اجباری"
        },
        {
          "id": "C",
          "text": "به علت هوا در مجاری صفراوی"
        },
        {
          "id": "D",
          "text": "به علت نفوذ چربی در قشر کلیه"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم‌های بزرگ‌تر ممکن است به علت فیبروز داخلی، کلسیفیکاسیون یا ترومبوز ناهمگون شوند. این به‌تنهایی به معنی بدخیمی نیست."
    },
    {
      "id": "haemangiom-fa-09",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام عبارت بیشتر با همانژیوم آتیپیک کبدی تطابق دارد؟",
      "options": [
        {
          "id": "A",
          "text": "نبود تقویت پس از تزریق ندولار محیطی کلاسیک، گاهی تقویت همگن و قوی شریانی"
        },
        {
          "id": "B",
          "text": "همیشه T2 کاملاً علامت لامپ روشن و پرشدگی مرکزگرای کلاسیک کامل"
        },
        {
          "id": "C",
          "text": "هیچ‌وقت تقویت پس از تزریق ندارد"
        },
        {
          "id": "D",
          "text": "همیشه گاز و سطح مایع دارد"
        }
      ],
      "correct": "A",
      "explanation": "همانژیوم آتیپیک ممکن است تقویت پس از تزریق ندولار محیطی و پرشدگی مرکزگرای کلاسیک را نداشته باشد و به جای آن تقویت همگن و قوی شریانی نشان دهد."
    },
    {
      "id": "haemangiom-fa-10",
      "tags": [
        "haemangiom",
        "leber",
        "abdomen"
      ],
      "fach": "abdomen",
      "question": "کدام یافته بیشتر کمک می‌کند همانژیوم با متاستاز اشتباه نشود؟",
      "options": [
        {
          "id": "A",
          "text": "ADC بالا و پرشدگی چندفازی مرکزگرا"
        },
        {
          "id": "B",
          "text": "ADC پایین و واش‌اوت سریع"
        },
        {
          "id": "C",
          "text": "رشد انفیلتراتیو نامنظم"
        },
        {
          "id": "D",
          "text": "کشیدگی کپسول همراه با اتساع مجاری صفراوی"
        }
      ],
      "correct": "A",
      "explanation": "ADC بالا علیه محدودیت انتشار واقعی است. همراه با پرشدگی مرکزگرای چندفازی، تشخیص همانژیوم را تقویت می‌کند."
    },
    {
      "id": "fnh-fa-01",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام گزینه هیپرپلازی ندولار فوکال (FNH) را به‌درستی توصیف می‌کند؟",
      "options": [
        { "id": "A", "text": "ضایعه خوش‌خیم و رژنراتیو کبد" },
        { "id": "B", "text": "تومور بدخیم اولیه کبد با پتانسیل متاستاز" },
        { "id": "C", "text": "آبسه باکتریایی کبد با ذوب مرکزی" },
        { "id": "D", "text": "ضایعه کیستیک با محتوای سروز" }
      ],
      "correct": "A",
      "explanation": "FNH یک ضایعه خوش‌خیم و رژنراتیو کبد است، معمولاً بدون علامت و بدون نیاز به درمان."
    },
    {
  "id": "fnh-fa-02",
  "tags": [
    "fnh",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "کدام گزینه درباره اپیدمیولوژی FNH صحیح است؟",
  "options": [
    {
      "id": "A",
      "text": "شایع‌ترین ضایعه خوش‌خیم کبد به‌طور کلی است"
    },
    {
      "id": "B",
      "text": "بعد از همانژیوم، دومین تومور جامد خوش‌خیم شایع کبد است و بیشتر در زنان دیده می‌شود"
    },
    {
      "id": "C",
      "text": "بیشتر در مردان مسن دیده می‌شود"
    },
    {
      "id": "D",
      "text": "یک ضایعه پره‌کانسر با خطر بالای بدخیمی است"
    }
  ],
  "correct": "B",
  "explanation": "بعد از همانژیوم، FNH دومین تومور جامد خوش‌خیم شایع کبد است؛ بیشتر در بالغین جوان تا میانسال با غلبه واضح در زنان."
},
    {
      "id": "fnh-fa-03",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام یافته داپلر برای FNH تیپیک است؟",
      "options": [
        { "id": "A", "text": "عروق مرکزی با شاخه‌های رادیال (الگوی spoke-wheel)" },
        { "id": "B", "text": "نبود کامل عروق در ضایعه" },
        { "id": "C", "text": "فقط عروق وریدی محیطی بدون عروق مرکزی" },
        { "id": "D", "text": "فیستول شریانی-وریدی با جریان شانت" }
      ],
      "correct": "A",
      "explanation": "الگوی spoke-wheel یعنی یک رگ مرکزی با شاخه‌های شعاعی؛ این یافته برای FNH تیپیک اما به‌تنهایی غیرقطعی است."
    },
    {
      "id": "fnh-fa-04",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "رفتار FNH تیپیک در فاز شریانی زودرس CT چگونه است؟",
      "options": [
        { "id": "A", "text": "تقویت پس از تزریق ندولار محیطی و ناپیوسته" },
        { "id": "B", "text": "تقویت پس از تزریق قوی و هموژن" },
        { "id": "C", "text": "تقویت شریانی هتروژن همراه با واش‌اوت و کپسول در کبد پرخطر" },
        { "id": "D", "text": "تقویت ندولار محیطی و ناپیوسته با پرشدگی مرکزگرا" }
      ],
      "correct": "B",
      "explanation": "برخلاف همانژیوم، FNH در فاز شریانی زودرس تقویت پس از تزریق قوی و هموژن دارد، بدون تقویت پس از تزریق ندولار محیطی."
    },
    {
      "id": "fnh-fa-05",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ویژگی تیپیک FNH در فاز پورتال و تأخیری چیست؟",
      "options": [
        { "id": "A", "text": "واش‌اوت واضح با هیپودنسیته نسبت به کبد" },
        { "id": "B", "text": "بدون واش‌اوت، با تطابق سریع با پارانشیم کبد" },
        { "id": "C", "text": "ندول‌های محیطیِ در حال تقویت با پرشدگی تدریجی مرکزگرا" },
        { "id": "D", "text": "تقویت شریانی با احتمال واش‌اوت در آدنوم هپاتوسلولار" }
      ],
      "correct": "B",
      "explanation": "نبود واش‌اوت همراه با تطابق سریع با الگوی تیپیک FNH سازگار است، اما به‌تنهایی HCC را رد نمی‌کند. زمینهٔ خطر و ارزیابی کامل فازها همچنان مهم‌اند."
    },
    {
      "id": "fnh-fa-06",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "ضایعه FNH معمولاً در T1 و T2 چگونه دیده می‌شود؟",
      "options": [
        { "id": "A", "text": "هایپراینتنس بسیار واضح در T2، مشابه مایع ساده" },
        { "id": "B", "text": "ایزو تا کمی هیپواینتنس در T1 و ایزو تا کمی هایپراینتنس در T2" },
        { "id": "C", "text": "افت سیگنال در T1 opposed-phase به‌علت چربی داخل‌سلولی" },
        { "id": "D", "text": "هیپوسیگنال T1 و هایپرسیگنال T2 همراه با محدودیت انتشار" }
      ],
      "correct": "B",
      "explanation": "FNH معمولاً نسبت به پارانشیم کبد در T1 ایزو تا کمی هیپواینتنس و در T2 ایزو تا کمی هایپراینتنس است، بنابراین در تصاویر بدون کنتراست اغلب فقط به‌طور خفیف قابل مشاهده است."
    },
    {
      "id": "fnh-fa-07",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "اسکار مرکزی FNH در MRI چگونه رفتار می‌کند؟",
      "options": [
        { "id": "A", "text": "هایپراینتنس در T2، هیپواینتنس در T1، با تقویت تأخیری" },
        { "id": "B", "text": "هیپوسیگنال در T1 و T2 با تقویت تأخیری کم یا غایب" },
        { "id": "C", "text": "هایپرسیگنال T2، اما با تقویت شریانی زودرس شدید" },
        { "id": "D", "text": "هایپرسیگنال در T1 و T2، بدون تقویت تأخیری" }
      ],
      "correct": "A",
      "explanation": "اسکار مرکزی در T2 هایپراینتنس، در T1 هیپواینتنس است و تقویت تأخیری دارد - تیپیک در حدود ۷۰٪ موارد."
    },
    {
      "id": "fnh-fa-08",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام سیگنال در فاز هپاتوبیلیاری MRI بیشتر به نفع FNH نسبت به آدنوم هپاتوسلولار است؟",
      "options": [
        { "id": "A", "text": "FNH معمولاً ایزو تا هایپرسیگنال است؛ آدنوم‌ها بیشتر هیپوسیگنال‌اند" },
        { "id": "B", "text": "FNH معمولاً هیپوسیگنال است؛ آدنوم‌ها معمولاً ایزو تا هایپرسیگنال‌اند" },
        { "id": "C", "text": "هر دو ضایعه معمولاً به‌وضوح هایپرسیگنال‌اند" },
        { "id": "D", "text": "فاز هپاتوبیلیاری به افتراق این دو کمک نمی‌کند" }
      ],
      "correct": "A",
      "explanation": "FNH اغلب مادهٔ حاجب اختصاصی فاز هپاتوبیلیاری را جذب می‌کند و ایزو تا هایپرسیگنال می‌شود؛ بسیاری از آدنوم‌ها هیپوسیگنال می‌مانند. این الگو به افتراق کمک می‌کند اما به‌دلیل زیرگروه‌ها و استثناها قطعی نیست. منبع: ACG 2024."
    },
    {
      "id": "fnh-fa-09",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام ویژگی‌ها می‌توانند در FNH آتیپیک دیده شوند؟",
      "options": [
        { "id": "A", "text": "نبود اسکار مرکزی، ظاهر هتروژن، پسودوکپسول یا چربی داخل ضایعه" },
        { "id": "B", "text": "تقویت شریانی هموژن بدون واش‌اوت و همراه با اسکار مرکزی" },
        { "id": "C", "text": "تقویت ندولار محیطی با پرشدگی مرکزگرا" },
        { "id": "D", "text": "تقویت شریانی با واش‌اوت و کپسول در کبد پرخطر" }
      ],
      "correct": "A",
      "explanation": "FNH آتیپیک (~۲۰٪) ممکن است بدون اسکار مرکزی باشد یا ظاهر هتروژن، پسودوکپسول، فقدان تقویت اسکار یا چربی داخل ضایعه نشان دهد، که افتراق از سایر تومورهای کبدی را دشوار می‌کند."
    },
    {
      "id": "fnh-fa-10",
      "tags": ["fnh", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام عبارت دربارهٔ FNH تیپیک با تشخیص تصویری مطمئن و بدون علامت درست است؟",
      "options": [
        { "id": "A", "text": "درمان و معمولاً پیگیری لازم نیست؛ بیماری زمینه‌ای عروقی کبد استثناست" },
        { "id": "B", "text": "برای همهٔ FNHهای تیپیک، MRI سالانه لازم است" },
        { "id": "C", "text": "حتی با مجموعهٔ یافته‌های تصویری تیپیک، بیوپسی به‌طور روتین لازم است" },
        { "id": "D", "text": "وجود یک ویژگی آتیپیک به‌تنهایی نیازمند رزکسیون فوری است" }
      ],
      "correct": "A",
      "explanation": "طبق راهنمای EASL، در FNH تیپیک درمان و پیگیری روتین لازم نیست؛ بیماری زمینه‌ای عروقی کبد استثناست. تصویربرداری آتیپیک باید در تیم تخصصی ارزیابی شود و به‌تنهایی به معنی نیاز به رزکسیون نیست."
    },
    {
      "id": "avm-fa-01",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مالفورماسیون شریانی-وریدی (AVM) کبد از نظر پاتوفیزیولوژیک با چه چیزی مشخص می‌شود؟",
      "options": [
        { "id": "A", "text": "ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط" },
        { "id": "B", "text": "یک توده رژنراتیو خوش‌خیم متشکل از بافت کبدی هیپرپلاستیک" },
        { "id": "C", "text": "یک توده کیستیک حاوی مایع سروز" },
        { "id": "D", "text": "تجمع فوکال چربی در پارانشیم کبد" }
      ],
      "correct": "A",
      "explanation": "AVM کبدی یک ارتباط مستقیم و غیرطبیعی بین یک شریان و یک عروق وریدی بدون بستر مویرگی واسط است که باعث جریان خون مستقیم با سرعت بالا و مقاومت پایین از سمت شریانی به وریدی می‌شود."
    },
    {
      "id": "avm-fa-02",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام یافتهٔ عروقی به نفع شانت آرتریوپورتال است؟",
      "options": [
        { "id": "A", "text": "اپاسیفیکاسیون زودرس یک ورید کبدی از طریق شریان کبدی" },
        { "id": "B", "text": "اپاسیفیکاسیون زودرس یک شاخهٔ ورید پورت از طریق شریان کبدی" },
        { "id": "C", "text": "ارتباط بین شاخهٔ ورید پورت و ورید کبدی" },
        { "id": "D", "text": "اپاسیفیکاسیون دیررس ورید پورت پس از عبور طبیعی از کبد" }
      ],
      "correct": "B",
      "explanation": "ارتباط آرتریوپورتال باعث اپاسیفیکاسیون زودرس یک شاخهٔ ورید پورت در فاز شریانی می‌شود. اپاسیفیکاسیون زودرس ورید کبدی به نفع شانت آرتریوونوس است."
    },
    {
      "id": "avm-fa-03",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مهم‌ترین علت کنژنیتال AVM‌های متعدد کبدی کدام بیماری است؟",
      "options": [
        { "id": "A", "text": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu)" },
        { "id": "B", "text": "بیماری ویلسون" },
        { "id": "C", "text": "هموکروماتوز" },
        { "id": "D", "text": "کمبود آلفا-1-آنتی‌تریپسین" }
      ],
      "correct": "A",
      "explanation": "تلانژکتازی هموراژیک ارثی (HHT، بیماری Osler-Weber-Rendu) مهم‌ترین علت کنژنیتال شانت‌های شریانی-وریدی متعدد و منتشر کبدی است."
    },
    {
      "id": "avm-fa-04",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام علت بیشتر با AVM کبدی اکتسابی مطابقت دارد؟",
      "options": [
        { "id": "A", "text": "علت ایاتروژنیک، پس از بیوپسی کبد یا انجام TIPS" },
        { "id": "B", "text": "کیست کبدی کنژنیتال" },
        { "id": "C", "text": "هپاتیت ویروسی مزمن به‌تنهایی" },
        { "id": "D", "text": "تغییر فیزیولوژیک مرتبط با سن" }
      ],
      "correct": "A",
      "explanation": "AVM‌های کبدی اکتسابی معمولاً ناشی از تروما یا علل ایاتروژنیک مانند بیوپسی کبد، TIPS یا جراحی هستند."
    },
    {
      "id": "avm-fa-05",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "کدام شکل موج داپلر اسپکترال در ورید کبدی طبیعی انتظار می‌رود؟",
      "options": [
        { "id": "A", "text": "جریان نسبتاً پیوسته و به‌سوی کبد، مانند ورید پورت" },
        { "id": "B", "text": "جریان وابسته به چرخهٔ قلب و معمولاً سه‌فازی" },
        { "id": "C", "text": "جریان شریانی پیوسته با سرعت بالا" },
        { "id": "D", "text": "نبود فیزیولوژیک جریان قابل‌اندازه‌گیری" }
      ],
      "correct": "B",
      "explanation": "جریان طبیعی ورید کبدی وابسته به چرخهٔ قلب و معمولاً سه‌فازی است؛ جریان ورید پورت معمولاً به‌سوی کبد و نسبتاً پیوسته است. شکل موج آرتریالیزه بسته به رگ درگیر می‌تواند مطرح‌کنندهٔ شانت باشد، اما باید در زمینهٔ بالینی تفسیر شود."
    },
    {
      "id": "avm-fa-06",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "اندکس مقاومتی (RI) شریان تغذیه‌کننده در یک شانت شریانی-وریدی معمولاً چگونه تغییر می‌کند؟",
      "options": [
        { "id": "A", "text": "به‌طور قابل توجهی افزایش می‌یابد" },
        { "id": "B", "text": "به‌طور قابل توجهی کاهش می‌یابد" },
        { "id": "C", "text": "نسبت به سمت مقابل بدون تغییر است" },
        { "id": "D", "text": "قابل اندازه‌گیری نیست" }
      ],
      "correct": "B",
      "explanation": "به دلیل مقاومت پایین در شانت، اندکس مقاومتی شریان تغذیه‌کننده به‌طور قابل توجهی کاهش می‌یابد که با سرعت دیاستولیک بالا قابل تشخیص است."
    },
    {
      "id": "avm-fa-07",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مهم‌ترین علامت CT برای AVM کبدی کدام است؟",
      "options": [
        { "id": "A", "text": "پرشدگی سانتریپتال کنتراست در فاز دیر" },
        { "id": "B", "text": "اپاسیفیکاسیون زودرس ورید تخلیه‌کننده در فاز شریانی (\"early venous filling sign\")" },
        { "id": "C", "text": "ضایعه هیپودنس همگن در تمام فازها" },
        { "id": "D", "text": "کلسیفیکاسیون در مرکز ضایعه" }
      ],
      "correct": "B",
      "explanation": "\"علامت پرشدگی زودرس وریدی\" - اپاسیفیکاسیون زودرس ورید تخلیه‌کننده در فاز شریانی - یافته کلیدی AVM کبدی در CT و MRI است."
    },
    {
      "id": "avm-fa-08",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "هیپرپرفیوژن فوکال و گوه‌ای‌شکل اطراف یک AVM در فاز شریانی زودرس چه نام دارد؟",
      "options": [
        { "id": "A", "text": "Wash-out" },
        { "id": "B", "text": "اسکار مرکزی" },
        { "id": "C", "text": "اختلاف گذرای تراکم/سیگنال کبدی (THAD/THID)" },
        { "id": "D", "text": "پسوکپسول" }
      ],
      "correct": "C",
      "explanation": "هیپرپرفیوژن گذرا، فوکال یا گوه‌ای‌شکل اطراف یک شانت شریانی-وریدی THAD/THID نامیده می‌شود و می‌تواند یک ضایعه هیپرواسکولار مانند FNH یا HCC را تقلید کند."
    },
    {
      "id": "avm-fa-09",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "مالفورماسیون‌های شریانی-وریدی معمولاً در سکانس‌های T1 و T2 وزن‌دار MRI چگونه دیده می‌شوند؟",
      "options": [
        { "id": "A", "text": "هیپراینتنس همگن با تجمع آرام و سانتریپتال کنتراست مانند هماانژیوم" },
        { "id": "B", "text": "به‌صورت ساختارهای سرپیژینوس بدون سیگنال (فقدان سیگنال جریان (flow void)) به دلیل جریان سریع" },
        { "id": "C", "text": "به‌صورت سیگنال معادل چربی در تمام سکانس‌ها" },
        { "id": "D", "text": "به‌صورت توده کیستیک با مرز مشخص و سطح مایع" }
      ],
      "correct": "B",
      "explanation": "جریان سریع خون در عروق متسع باعث ایجاد فقدان سیگنال جریان (flow void) - ساختارهای سرپیژینوس بدون سیگنال - در سکانس‌های T1 و T2 می‌شود."
    },
    {
      "id": "avm-fa-10",
      "tags": ["avm", "leber", "abdomen"],
      "fach": "abdomen",
      "question": "درگیری کبدی شدید مرتبط با HHT همراه با شانت‌های شریانی-وریدی متعدد چه عارضه بالینی می‌تواند داشته باشد؟",
      "options": [
        { "id": "A", "text": "نارسایی حاد کلیه" },
        { "id": "B", "text": "نارسایی قلبی با برون‌ده بالا و هیپرتانسیون پورت" },
        { "id": "C", "text": "پانکراتیت حاد" },
        { "id": "D", "text": "هیپوتیروئیدی" }
      ],
      "correct": "B",
      "explanation": "شانت‌های شریانی-وریدی متعدد کبدی می‌توانند از طریق افزایش برون‌ده قلبی منجر به نارسایی قلبی با برون‌ده بالا شوند و از طریق شانت آرتریوپورتال باعث هیپرتانسیون پورت گردند."
    },
    {
  "id": "hcc-fa-01",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "چهار بزرگسال ضایعهٔ کبدی درمان‌نشده دارند؛ هیچ‌یک هپاتیت B مزمن یا سابقهٔ HCC ندارد. در کدام زمینه به‌کارگیری LI-RADS تشخیصی CT/MRI نسخهٔ ۲۰۱۸ مجاز است؟",
  "options": [
    {
      "id": "A",
      "text": "سیروز ناشی از هپاتیت C"
    },
    {
      "id": "B",
      "text": "استئاتوز متابولیک بدون سیروز"
    },
    {
      "id": "C",
      "text": "هپاتیت C مزمن بدون سیروز"
    },
    {
      "id": "D",
      "text": "سیروز ناشی از هپاتوپاتی احتقانی قلبی"
    }
  ],
  "correct": "A",
  "explanation": "LI-RADS CT/MRI نسخهٔ ۲۰۱۸ به جمعیت پرخطر بزرگسال تعریف‌شده با سیروز، HBV مزمن یا HCC فعلی/قبلی و تصویربرداری چندفازی مناسب نیاز دارد. برخی علل عروقی سیروز مستثنا هستند. خارج از گروه هدف، الگوی تیپیک شاهد غیرتهاجمی تشخیصی هم‌ارز نیست.",
  "wrongExplanations": {
    "B": "استئاتوز بدون سیروز و بدون سایر عوامل خطر ذکرشده در گروه هدف LI-RADS تشخیصی قرار نمی‌گیرد.",
    "C": "هپاتیت C به‌تنهایی بدون سیروز در اینجا شرایط گروه هدف نسخهٔ ۲۰۱۸ را ندارد؛ هپاتیت B مزمن وضعیت پذیرش جداگانه‌ای است.",
    "D": "ACR سیروز ناشی از احتقان قلبی و برخی بیماری‌های عروقی دیگر را مستثنا می‌کند، زیرا ندول‌های هیپرپلاستیک خوش‌خیم می‌توانند HCC را تقلید کنند."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-02",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "در جمعیت واجد شرایطِ پرخطر HCC، کدام الگوی چندفازی برای HCC کلاسیک است؟",
  "options": [
    {
      "id": "A",
      "text": "APHE غیرحاشیه‌ای و سپس واش‌اوت غیرمحیطی در فاز مجاز"
    },
    {
      "id": "B",
      "text": "ندول‌های محیطی ناپیوستهٔ دارای جذب با پرشدن پیشروندهٔ مرکزگرا"
    },
    {
      "id": "C",
      "text": "حلقهٔ شریانی دارای جذب و جذب تأخیری مرکزی"
    },
    {
      "id": "D",
      "text": "جذب شریانی همگن و بیشتر از کبد با همسان‌شدن بعدی با کبد"
    }
  ],
  "correct": "A",
  "explanation": "APHE غیرحاشیه‌ای و واش‌اوت غیرمحیطی الگوی دینامیک کلاسیک را می‌سازند. تعیین ردهٔ رسمی علاوه بر آن به اندازه، گروه هدف و سایر قواعد الگوریتم نیاز دارد. APHE به‌تنهایی اختصاصی نیست.",
  "wrongExplanations": {
    "B": "این دینامیک ندولار عروقی و پرشدن برای همانژیوم تیپیک است، نه الگوی HCC مورد سؤال.",
    "C": "حلقهٔ شریانی همراه جذب پیشروندهٔ مرکزی الگوی هشدار هدف‌مانند برای بدخیمی غیراختصاصی HCC است و با APHE غیرحاشیه‌ای تفاوت دارد.",
    "D": "این الگو می‌تواند در ضایعات هیپرواسکولار خوش‌خیم مانند FNH تیپیک دیده شود. واش‌اوت غیرمحیطی مورد سؤال وجود ندارد."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-03",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "در MRI با گادوکسیتات، کدام مقایسهٔ زمانی می‌تواند ویژگی اصلی «واش‌اوت غیرمحیطی» را اثبات کند؟",
  "options": [
    {
      "id": "A",
      "text": "ضایعه‌ای که قبلاً جذب داشته، در فاز پورتال جذب کمترِ نسبی و غیرمحیطی نسبت به کبد نشان می‌دهد"
    },
    {
      "id": "B",
      "text": "ضایعه در فاز پورتال هم‌سیگنال است و تنها در فاز انتقالی نسبتاً کم‌سیگنال می‌شود"
    },
    {
      "id": "C",
      "text": "ضایعه در فاز پورتال هم‌سیگنال است و تنها در فاز هپاتوبیلیاری نسبتاً کم‌سیگنال می‌شود"
    },
    {
      "id": "D",
      "text": "ضایعه پیش از تزریق کم‌سیگنال است و بدون تغییر زمانی اثبات‌شدهٔ جذب، در فاز پورتال تیره می‌ماند"
    }
  ],
  "correct": "A",
  "explanation": "در گادوکسیتات، واش‌اوت به‌عنوان ویژگی اصلی فقط در فاز پورتال ارزیابی می‌شود. کم‌سیگنالی انتقالی یا هپاتوبیلیاری می‌تواند ناشی از جذب کبد باشد و ویژگی کمکی است، نه جایگزین این واش‌اوت. با مادهٔ حاجب خارج‌سلولی، فاز تأخیری مجاز نیز قابل استفاده است.",
  "wrongExplanations": {
    "B": "کم‌سیگنالی که فقط در فاز انتقالی ظاهر می‌شود، در گادوکسیتات واش‌اوتِ ویژگی اصلی محسوب نمی‌شود.",
    "C": "کم‌سیگنالی هپاتوبیلیاری یافتهٔ حمایتی بدخیمی است، اما اختصاصی HCC و واش‌اوتِ ویژگی اصلی نیست.",
    "D": "کم‌سیگنالی ثابت به‌تنهایی کاهش زمانی جذب نسبی را نشان نمی‌دهد. برای آن باید فاز زودتر مناسبِ پس از تزریق با فاز بعدی مقایسه شود."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-04",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "کدام یافتهٔ محیطی بیش از بقیه با ویژگی اصلی LI-RADS یعنی «کپسول دارای جذب مادهٔ حاجب» مطابقت دارد؟",
  "options": [
    {
      "id": "A",
      "text": "حاشیهٔ صاف و یکنواختِ دارای جذب در فاز پورتال، تأخیری یا انتقالی"
    },
    {
      "id": "B",
      "text": "حلقهٔ شریانی ضخیم و نامنظم دور ضایعه‌ای با جذب کمتر مرکزی"
    },
    {
      "id": "C",
      "text": "ندول‌های محیطی مجزا و ناپیوستهٔ دارای جذب با پرشدن مرکزی"
    },
    {
      "id": "D",
      "text": "حاشیهٔ محیطی قابل تشخیص بدون جذب اثبات‌شدهٔ مادهٔ حاجب"
    }
  ],
  "correct": "A",
  "explanation": "کپسول دارای جذب، حاشیهٔ صاف، یکنواخت و واضحی است که از بافت فیبروزی اطراف ندول‌های زمینه‌ای برجسته‌تر است. این نمای تصویربرداری است، نه اثبات بافت‌شناختی مستقلِ کپسول یا HCC.",
  "wrongExplanations": {
    "B": "حلقهٔ شریانی با نمای کپسول صاف در فاز بعد متفاوت است و می‌تواند در طبقه‌بندی LR-M نقش داشته باشد.",
    "C": "ندول‌های محیطی دارای جذب با پرشدن بیشتر به نفع همانژیوم‌اند و حاشیهٔ کپسول یکنواخت ایجاد نمی‌کنند.",
    "D": "بدون جذب اثبات‌شده، ویژگی اصلی «کپسول دارای جذب» احراز نمی‌شود؛ کپسول بدون جذب جداگانه به‌عنوان ویژگی کمکی مطرح است."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-05",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "HCC در فاز هپاتوبیلیاری MRI با گادوکسیتات اغلب نسبت به کبد چگونه دیده می‌شود؟",
  "options": [
    {
      "id": "A",
      "text": "کم‌سیگنال"
    },
    {
      "id": "B",
      "text": "هم‌سیگنال"
    },
    {
      "id": "C",
      "text": "پُرسیگنال"
    },
    {
      "id": "D",
      "text": "سیگنال مرکزی بالاتر با حاشیهٔ کم‌سیگنال محیطیِ هدف‌مانند"
    }
  ],
  "correct": "A",
  "explanation": "بسیاری از HCCها جذب هپاتوبیلیاری کمتری دارند که از جمله با کاهش بیان ناقل‌های جذب هپاتوسلولار مرتبط است. حفظ یا افزایش بیان ناقل می‌تواند HCC هم‌سیگنال/پُرسیگنال را توضیح دهد. بنابراین سیگنال به‌تنهایی نه HCC را ثابت می‌کند و نه خوش‌خیمی را.",
  "wrongExplanations": {
    "B": "HCC هم‌سیگنال با جذب حفظ‌شده دیده می‌شود، اما شایع‌ترین الگو نیست. هم‌سیگنالی HCC را رد نمی‌کند.",
    "C": "HCC پُرسیگنال نیز با بیان مناسب ناقل ممکن است، اما کم‌سیگنالی شایع‌تر است.",
    "D": "الگوی هدف‌مانند هپاتوبیلیاری با الگوی کلاسیک همگن کم‌سیگنال متفاوت است و می‌تواند ارزیابی LR-M را مطرح کند؛ اختصاصی HCC نیست."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/20663969/"
},
    {
  "id": "hcc-fa-06",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "کدام ترکیب از محدودیت انتشار واقعی به‌عنوان ویژگی کمکی در ضایعهٔ مشکوک به HCC حمایت می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "سیگنال بالای DWI همراه ADC پایین متناظر"
    },
    {
      "id": "B",
      "text": "سیگنال بالای DWI با ADC حفظ‌شده یا بالا و سیگنال شدید T2"
    },
    {
      "id": "C",
      "text": "سیگنال پایین DWI همراه ADC بالا"
    },
    {
      "id": "D",
      "text": "سیگنال بالای DWI همراه ADC غیرقابل استفاده به‌علت آرتیفکت"
    }
  ],
  "correct": "A",
  "explanation": "روشنایی DWI با کاهش متناظر ADC از محدودیت واقعی حمایت می‌کند. این ویژگی کمکی اختصاصی HCC نیست و به‌تنهایی نمی‌تواند ضایعه را به LR-5 ارتقا دهد.",
  "wrongExplanations": {
    "B": "این ترکیب بیشتر از T2 shine-through حمایت می‌کند تا محدودیت اثبات‌شده؛ آن هم به‌تنهایی خوش‌خیمی را ثابت نمی‌کند.",
    "C": "سیگنال پایین DWI و ADC بالا از محدودیت انتشار مورد سؤال حمایت نمی‌کنند.",
    "D": "بدون ADC قابل تفسیر، روشنایی DWI به‌تنهایی تأیید قابل اعتماد محدودیت را فراهم نمی‌کند."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-07",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "در نقص پرشدگی ورید پورت، کدام یافتهٔ تکمیلی قوی‌ترین شاهد تومور داخل ورید است؟",
  "options": [
    {
      "id": "A",
      "text": "جذب قطعی مادهٔ حاجب در بافت نرم داخل لومن ورید، با تأیید نسبت به تصویر پیش از تزریق"
    },
    {
      "id": "B",
      "text": "اتساع ورید بدون جذب اثبات‌شدهٔ داخل لومن"
    },
    {
      "id": "C",
      "text": "محدودیت انتشار در نقص پرشدگی بدون جذب اثبات‌شده"
    },
    {
      "id": "D",
      "text": "تماس نقص پرشدگی با تودهٔ کبدی بدون جذب اثبات‌شده"
    }
  ],
  "correct": "A",
  "explanation": "معیار اصلی، بافت نرم داخل ورید با جذب قطعی مادهٔ حاجب است. وسعت و وریدهای درگیر گزارش شوند. LR-TIV مترادف HCC نیست؛ بدخیمی‌های دیگر نیز می‌توانند به ورید تهاجم کنند.",
  "wrongExplanations": {
    "B": "اتساع ورید یک سرنخ است، اما به‌تنهایی ترومبوز توموری را قطعی نمی‌کند.",
    "C": "محدودیت انتشار سرنخ تکمیلی است، اما جای اثبات قطعی بافت نرم دارای جذب را نمی‌گیرد.",
    "D": "مجاورت با توده شک را افزایش می‌دهد، اما بدون جذب اثبات‌شدهٔ داخل لومن معیار اصلی تعیین‌کننده نیست."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-08",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "کدام الگو با HCC نفوذی سازگار است و باید بررسی هدفمند بدخیمی را برانگیزد؟",
  "options": [
    {
      "id": "A",
      "text": "رشد نفوذی با مرز نامشخص در چند سگمان، جذب متغیر و تهاجم عروقی مشکوک"
    },
    {
      "id": "B",
      "text": "ندول منفرد با مرز واضح، APHE همگن و کپسول صاف"
    },
    {
      "id": "C",
      "text": "جذب شریانی گوه‌ای بیشتر با عروق بدون تغییر مسیر و بدون توده"
    },
    {
      "id": "D",
      "text": "ناحیهٔ فیبروتیک جغرافیایی با فرورفتگی کپسول و جذب تأخیری افزاینده"
    }
  ],
  "correct": "A",
  "explanation": "HCC نفوذی می‌تواند با پارانشیم سیروتیک درهم‌آمیزد و ویژگی‌های تیپیک جذب را فقط به‌صورت ناهمگن یا کانونی نشان دهد. تهاجم عروقی و کل الگوی چندفازی سرنخ‌های مهم‌اند؛ بررسی هدفمند همچنان لازم است.",
  "wrongExplanations": {
    "B": "این الگو بیشتر ندولار است تا رشد نفوذی. HCC می‌تواند ندولار باشد، اما پرسش دربارهٔ نوع نفوذی است.",
    "C": "یافتهٔ گوه‌ای بدون اثر توده‌ای و با مسیر عروقی حفظ‌شده بیشتر به نفع تغییر پرفیوژن است و با رشد مشکوک به بدخیمی توصیف‌شده تفاوت دارد.",
    "D": "این ترکیب بیشتر فیبروز به‌هم‌پیوسته را مطرح می‌کند که افتراق مهمی است؛ نباید با الگوی تهاجمیِ ترکیب مورد سؤال یکی دانسته شود."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3538368/"
},
    {
  "id": "hcc-fa-09",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "کدام دینامیک MRI چندفازی با مادهٔ حاجب خارج‌سلولی در زمینهٔ خطر مناسب، HCC را نسبت به FNH تیپیک بیشتر مطرح می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "APHE غیرحاشیه‌ای با واش‌اوت غیرمحیطی پورتال یا تأخیری"
    },
    {
      "id": "B",
      "text": "جذب شریانی همگن و بیشتر از کبد با هم‌سیگنالی بعدی با کبد"
    },
    {
      "id": "C",
      "text": "جذب زودرس بیشتر از کبد، همسان‌شدن بعدی با کبد و اسکار مرکزی دارای جذب تأخیری"
    },
    {
      "id": "D",
      "text": "ندول‌های محیطی دارای جذب با پرشدن مرکزگرا و رفتار مشابه مخزن خون"
    }
  ],
  "correct": "A",
  "explanation": "FNH تیپیک جذب شریانی قوی دارد، اما واش‌اوت غیرمحیطی ندارد. واش‌اوت ذکرشده در زمینهٔ مناسب بیشتر به نفع HCC است، اما به‌تنهایی ردهٔ کامل یا بافت‌شناسی را اثبات نمی‌کند.",
  "wrongExplanations": {
    "B": "این دینامیک همگن بدون واش‌اوت می‌تواند با FNH تیپیک سازگار باشد و ویژگی مورد سؤالِ بیشتر به نفع HCC نیست.",
    "C": "اسکار مرکزی دارای جذب تأخیری همراه همسان‌شدن سایر بخش‌ها با کبد با FNH تیپیک سازگار است. اسکار مرکزی با کپسول محیطی اشتباه نشود.",
    "D": "این دینامیک پرشدن ندولار بیشتر به نفع همانژیوم است، نه الگوی تیپیک HCC."
  },
  "source": "https://geiselmed.dartmouth.edu/radiology/wp-content/uploads/sites/47/2019/04/LI-RADS_Core.pdf"
},
    {
  "id": "hcc-fa-10",
  "tags": [
    "hcc",
    "leber",
    "abdomen"
  ],
  "fach": "abdomen",
  "question": "سناریوی متنی: گزارش تصویربرداری HCC تعداد/اندازهٔ تومور، سگمان‌ها، تهاجم عروقی و متاستازها را کامل ثبت کرده است. کدام اطلاعات بالینی اضافی برای مرحله‌بندی BCLC اساسی‌اند؟",
  "options": [
    {
      "id": "A",
      "text": "عملکرد کبد/دکمپنسیشن و وضعیت عملکردی ECOG"
    },
    {
      "id": "B",
      "text": "درجهٔ تمایز بافت‌شناختی و شاخص Ki-67"
    },
    {
      "id": "C",
      "text": "مقدار AFP و بار ویروسی هپاتیت زمینه‌ای"
    },
    {
      "id": "D",
      "text": "سن تقویمی و شاخص تودهٔ بدنی"
    }
  ],
  "correct": "A",
  "explanation": "BCLC بار تومور را با عملکرد کبد و وضعیت عملکردی ترکیب می‌کند. تصویربرداری سهم آناتومیک را فراهم می‌کند و بدون این اطلاعات بالینی، مرحله و درمان را تعیین نمی‌کند.",
  "wrongExplanations": {
    "B": "درجه و تکثیر می‌توانند دربارهٔ زیست‌شناسی تومور اطلاع دهند، اما جای عناصر بالینی اصلی BCLC یعنی عملکرد کبد و وضعیت عملکردی را نمی‌گیرند.",
    "C": "AFP و بار ویروسی ممکن است برای پیش‌آگهی، علت یا درمان‌های منتخب مهم باشند؛ مرحله‌بندی عملکردی همچنان به عملکرد کبد و ECOG نیاز دارد.",
    "D": "سن و BMI بر تصمیم فردی اثر دارند، اما جای سنجش مستقیم ذخیرهٔ کبد و وضعیت عملکردی را نمی‌گیرند."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC10663390/"
},
    {
      "id": "sarkoidose-fa-01",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام ویژگی هیستولوژیک برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "گرانولوم‌های پنیری"
        },
        {
          "id": "B",
          "text": "گرانولوم‌های غیرپنیری"
        },
        {
          "id": "C",
          "text": "میکروآبسه‌های ائوزینوفیلیک"
        },
        {
          "id": "D",
          "text": "لانه‌های توموری اسکواموس"
        }
      ],
      "correct": "B",
      "explanation": "سارکوئیدوز یک بیماری سیستمیک گرانولوماتوز با علت ناشناخته است. گرانولوم‌های غیرپنیری برای آن تیپیک هستند."
    },
    {
      "id": "sarkoidose-fa-02",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام الگوی توزیع ندول‌ها در HRCT برای سارکوئیدوز تیپیک است؟",
      "options": [
        {
          "id": "A",
          "text": "پری‌لنفاتیک در امتداد فیشورها، پلور و دسته‌های برونکوواسکولار"
        },
        {
          "id": "B",
          "text": "کاملاً رندوم هماتوژن بدون ارتباط با فیشور"
        },
        {
          "id": "C",
          "text": "فقط نمای لانه‌زنبوری (Honeycombing) بازال ساب‌پلورال"
        },
        {
          "id": "D",
          "text": "فقط Tree-in-bud سنترلوبولار"
        }
      ],
      "correct": "A",
      "explanation": "سارکوئیدوز معمولاً میکروندول‌های ۲–۴ میلی‌متری شارپ با توزیع پری‌لنفاتیک در امتداد فیشورها، پلور، سپتا و دسته‌های برونکوواسکولار نشان می‌دهد."
    },
    {
      "id": "sarkoidose-fa-03",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "علامت 1-2-3 در سارکوئیدوز چه چیزی را توصیف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "هیلوم راست، هیلوم چپ و ناحیه پارا تراکئال راست"
        },
        {
          "id": "B",
          "text": "سه کاویته در لوب فوقانی راست"
        },
        {
          "id": "C",
          "text": "سه زون فیبروز ریه"
        },
        {
          "id": "D",
          "text": "سه مرحله سارکوئیدوز قلبی"
        }
      ],
      "correct": "A",
      "explanation": "علامت 1-2-3 توزیع تیپیک لنف‌نودها را نشان می‌دهد: هیلوم راست، هیلوم چپ و پارا تراکئال راست."
    },
    {
      "id": "sarkoidose-fa-04",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام مرحله Scadding فقط لنفادنوپاتی بی‌هیلار بدون درگیری پارانشیم دارد؟",
      "options": [
        {
          "id": "A",
          "text": "مرحله 0"
        },
        {
          "id": "B",
          "text": "مرحله I"
        },
        {
          "id": "C",
          "text": "مرحله III"
        },
        {
          "id": "D",
          "text": "مرحله IV"
        }
      ],
      "correct": "B",
      "explanation": "مرحله I در Scadding یعنی فقط لنفادنوپاتی بی‌هیلار با پارانشیم طبیعی."
    },
    {
      "id": "sarkoidose-fa-05",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "مرحله II در Scadding به چه معناست؟",
      "options": [
        {
          "id": "A",
          "text": "فقط فیبروز"
        },
        {
          "id": "B",
          "text": "درگیری پارانشیم بدون لنفادنوپاتی"
        },
        {
          "id": "C",
          "text": "لنفادنوپاتی بی‌هیلار همراه با درگیری پارانشیم"
        },
        {
          "id": "D",
          "text": "رادیوگرافی قفسه سینه طبیعی"
        }
      ],
      "correct": "C",
      "explanation": "مرحله II یعنی BHL به همراه تغییرات پارانشیم ریه. مرحله III پارانشیم بدون BHL و مرحله IV فیبروز است."
    },
    {
      "id": "sarkoidose-fa-06",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام جمله درباره کلسیفیکاسیون Eggshell درست است؟",
      "options": [
        {
          "id": "A",
          "text": "برای سارکوئیدوز پاتوگنومونیک است"
        },
        {
          "id": "B",
          "text": "در سیلیکوز هم دیده می‌شود"
        },
        {
          "id": "C",
          "text": "همیشه لنفوم را اثبات می‌کند"
        },
        {
          "id": "D",
          "text": "فقط در آزبستوز رخ می‌دهد"
        }
      ],
      "correct": "B",
      "explanation": "کلسیفیکاسیون شبیه پوسته تخم‌مرغ می‌تواند در سارکوئیدوز دیده شود، اما اختصاصی نیست و در سیلیکوز هم رخ می‌دهد."
    },
    {
      "id": "sarkoidose-fa-07",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "Sarcoid Galaxy Sign چیست؟",
      "options": [
        {
          "id": "A",
          "text": "ندول بزرگ با ندول‌های ماهواره‌ای کوچک متعدد اطراف آن"
        },
        {
          "id": "B",
          "text": "Ground-glass منتشر بدون ندول"
        },
        {
          "id": "C",
          "text": "پلاک پلور کلسیفیه"
        },
        {
          "id": "D",
          "text": "آمبولی مرکزی ریه"
        }
      ],
      "correct": "A",
      "explanation": "Sarcoid Galaxy Sign شامل تجمع بزرگ‌تر گرانولوم است که با ندول‌های ماهواره‌ای کوچک احاطه شده است. این علامت اختصاصی نیست و در سل هم ممکن است دیده شود."
    },
    {
      "id": "sarkoidose-fa-08",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام تشخیص افتراقی معمولاً ضخیم‌شدن ندولار و نامنظم سپتا را به‌صورت یک‌طرفه یا نامتقارن ایجاد می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "لنفانژیوز کارسینوماتوز"
        },
        {
          "id": "B",
          "text": "ادم قلبی ریه با خطوط سپتای صاف و دوطرفه"
        },
        {
          "id": "C",
          "text": "سارکوئیدوز با ندول‌های پری‌لنفاتیک متقارن"
        },
        {
          "id": "D",
          "text": "الگوی UIP با رتیکولاسیون ساب‌پلورال و هانی‌کامینگ"
        }
      ],
      "correct": "A",
      "explanation": "لنفانژیوز کارسینوماتوز اغلب باعث ضخیم‌شدن نامنظم و ندولار سپتا می‌شود و معمولاً نامتقارن یا یک‌طرفه است. بیمار از نظر بالینی غالباً بدحال‌تر است."
    },
    {
      "id": "sarkoidose-fa-09",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام سه‌گانه سندرم Heerfordt را تعریف می‌کند؟",
      "options": [
        {
          "id": "A",
          "text": "یووئیت، پاروتیت و فلج فاسیال"
        },
        {
          "id": "B",
          "text": "آسم، سینوزیت و ائوزینوفیلی"
        },
        {
          "id": "C",
          "text": "آرتریت، اورتریت و کونژنکتیویت"
        },
        {
          "id": "D",
          "text": "هموپتزی، گلومرولونفریت و سینوزیت"
        }
      ],
      "correct": "A",
      "explanation": "سندرم Heerfordt یکی از تظاهرات سارکوئیدوز است و شامل یووئیت، پاروتیت و فلج فاسیال می‌شود."
    },
    {
      "id": "sarkoidose-fa-10",
      "tags": [
        "sarkoidose",
        "thorax",
        "lung"
      ],
      "fach": "thorax",
      "question": "کدام روش برای نمایش اسکار یا فیبروز میوکارد در سارکوئیدوز قلبی مناسب‌تر است؟",
      "options": [
        {
          "id": "A",
          "text": "MRI با تقویت دیررس گادولینیوم (LGE)"
        },
        {
          "id": "B",
          "text": "FDG-PET برای نمایش التهاب فعال، بدون مشخص‌کردن مستقیم اسکار"
        },
        {
          "id": "C",
          "text": "اکوکاردیوگرافی برای ارزیابی عملکرد، با توان محدود در مشخصه‌سازی بافت"
        },
        {
          "id": "D",
          "text": "CT آنژیوگرافی کرونر برای ارزیابی شریان‌های کرونر"
        }
      ],
      "correct": "A",
      "explanation": "MRI قلب با LGE اسکار و فیبروز غیرایسکمیک میوکارد را نشان می‌دهد. FDG-PET برای ارزیابی التهاب فعال مکمل MRI است؛ این دو روش به پرسش‌های بالینی متفاوت پاسخ می‌دهند."
    },
    {
  "id": "rotatorenmanschette-fa-01",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "کدام چهار عضله روتاتور کاف را تشکیل می‌دهند؟",
  "options": [
    {
      "id": "A",
      "text": "سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور، ساب‌اسکاپولاریس"
    },
    {
      "id": "B",
      "text": "سوپراسپیناتوس، اینفراسپیناتوس، ترس میجر، ساب‌اسکاپولاریس"
    },
    {
      "id": "C",
      "text": "سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور، دلتوئید"
    },
    {
      "id": "D",
      "text": "سوپراسپیناتوس، سر بلند بایسپس، ترس مینور، ساب‌اسکاپولاریس"
    }
  ],
  "correct": "A",
  "explanation": "چهار عضلهٔ کاف عبارت‌اند از سوپراسپیناتوس، اینفراسپیناتوس، ترس مینور و ساب‌اسکاپولاریس (SITS). تاندون‌های آن‌ها با رشته‌های کپسول و رباط‌ها در سازهٔ نگه‌دارندهٔ اطراف سر هومروس درهم‌تنیده‌اند.",
  "wrongExplanations": {
    "B": "ترس مینور عضو کاف است؛ ترس میجر از چهار عضلهٔ SITS نیست.",
    "C": "ساب‌اسکاپولاریس بخش قدامی کاف را تکمیل می‌کند؛ دلتوئید جایگزین آن نیست.",
    "D": "سر بلند بایسپس ارتباط نزدیکی با پولی دارد، اما جای اینفراسپیناتوس را در کاف نمی‌گیرد."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/1624486/; https://pubmed.ncbi.nlm.nih.gov/12647876/"
},
    {
  "id": "rotatorenmanschette-fa-02",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "کدام بخش به‌طور کلاسیک «ناحیهٔ بحرانی» تاندون سوپراسپیناتوس نامیده می‌شود؟",
  "options": [
    {
      "id": "A",
      "text": "بخش تاندون نزدیک محل اتصال به توبرکل بزرگ"
    },
    {
      "id": "B",
      "text": "محل اتصال عضله به تاندون در سمت مدیال آکرومیون"
    },
    {
      "id": "C",
      "text": "منشأ عضله در حفرهٔ سوپرااسپینوس"
    },
    {
      "id": "D",
      "text": "محل اتصال تاندون ساب‌اسکاپولاریس به توبرکل کوچک"
    }
  ],
  "correct": "A",
  "explanation": "این اصطلاح به ناحیه‌ای نزدیک اتصال تاندون سوپراسپیناتوس اشاره دارد که در توصیف‌های تاریخی خون‌رسانی نسبتاً کمتری داشته است. پرفیوژن با ناحیه و بارگذاری تغییر می‌کند؛ این امر نه ناحیه‌ای همواره بدون عروق و نه علت منفرد تمام پارگی‌ها را ثابت می‌کند.",
  "wrongExplanations": {
    "B": "محل اتصال عضله به تاندون مدیال‌تر است و ناحیهٔ بحرانی کلاسیک نزدیک اتصال استخوانی نیست.",
    "C": "این اصطلاح به تاندون نزدیک اتصال هومرالی اشاره دارد، نه منشأ عضله روی اسکاپولا.",
    "D": "این نشانهٔ آناتومیک مربوط به ساب‌اسکاپولاریس است، نه تاندون سوپراسپیناتوس."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323147/; https://pubmed.ncbi.nlm.nih.gov/18647848/; https://pubmed.ncbi.nlm.nih.gov/26412209/"
},
    {
  "id": "rotatorenmanschette-fa-03",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "عضلهٔ ساب‌اسکاپولاریس به‌طور عمده در کدام حرکت مشارکت می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "چرخش خارجی بازو"
    },
    {
      "id": "B",
      "text": "ابداکسیون بازو"
    },
    {
      "id": "C",
      "text": "چرخش داخلی بازو"
    },
    {
      "id": "D",
      "text": "ابداکسیون افقی بازو"
    }
  ],
  "correct": "C",
  "explanation": "ساب‌اسکاپولاریس در چرخش داخلی و پایداری گلنوهومرال نقش دارد. سهم عملکردی آن از جمله به وضعیت بازو و بخش عضله وابسته است؛ این حرکت عملکرد انحصاری یک عضله نیست.",
  "wrongExplanations": {
    "A": "اینفراسپیناتوس و ترس مینور از چرخاننده‌های خارجی مهم‌اند؛ حرکت عمدهٔ مورد سؤال برای ساب‌اسکاپولاریس، چرخش داخلی است.",
    "B": "دلتوئید و سوپراسپیناتوس در ابداکسیون نقش عمده دارند؛ این حرکت عمدهٔ مورد سؤال نیست.",
    "D": "ابداکسیون افقی جهت حرکت دیگری است؛ سهم چرخشی عمدهٔ مورد سؤال برای ساب‌اسکاپولاریس، چرخش داخلی است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/10888162/; https://pubmed.ncbi.nlm.nih.gov/28867549/"
},
    {
  "id": "rotatorenmanschette-fa-04",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "در MRI شانه بدون تزریق مادهٔ حاجب و بدون آرتروگرافی باید نقص‌های روتاتور کاف در چند نما بررسی شوند. کدام گروه سکانس این هدف را بهتر پشتیبانی می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "T1 کرونال مایل، T1 آگزیال و T1 ساژیتال مایل"
    },
    {
      "id": "B",
      "text": "T2 فت‌ساپرس کرونال مایل، PD فت‌ساپرس آگزیال و T1 ساژیتال مایل"
    },
    {
      "id": "C",
      "text": "T1 کرونال مایل، T1 آگزیال و GRE ساژیتال مایل"
    },
    {
      "id": "D",
      "text": "PD فت‌ساپرس آگزیال، T1 کرونال مایل و T1 ساژیتال مایل"
    }
  ],
  "correct": "B",
  "explanation": "گروه مناسب تصاویر حساس به مایع و فت‌ساپرس را در بیش از یک نما با T1 برای آناتومی و کیفیت عضله ترکیب می‌کند. پروتکل کامل متناسب با سؤال و دستگاه تنظیم می‌شود؛ این انتخاب تشخیص بی‌خطای تمام پارگی‌های جزئی را تضمین نمی‌کند.",
  "wrongExplanations": {
    "A": "T1 آناتومی را نشان می‌دهد، اما ارزیابی چندنمایی حساس به مایع و فت‌ساپرسِ مورد سؤال را فراهم نمی‌کند.",
    "C": "این گروه جای ارزیابی چندنمایی حساس به مایع را نمی‌گیرد؛ GRE می‌تواند برای برخی پرسش‌ها مکمل باشد.",
    "D": "در اینجا بررسی حساس به مایع به نمای آگزیال محدود است؛ گروه دیگر نمای کرونال مایل را نیز می‌افزاید."
  },
  "source": "https://www.essr.org/content-essr/uploads/2016/10/ESSR-MRI-Protocols-Shoulder.pdf; https://gravitas.acr.org/PPTS/DownloadPreviewDocument?DocId=45&ReleaseId=2"
},
    {
  "id": "rotatorenmanschette-fa-05",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "سناریوی متنی: تاندونی با پیوستگی حفظ‌شده حدود ۵۵ درجه نسبت به B0 قرار دارد. سیگنال در تصویر با TE کوتاه افزایش یافته و در TE طولانی‌تر به‌وضوح کاهش می‌یابد. کدام توضیح مناسب‌تر است؟",
  "options": [
    {
      "id": "A",
      "text": "پارگی جزئی داخل تاندونی"
    },
    {
      "id": "B",
      "text": "پدیدهٔ مجیک‌انگل وابسته به جهت"
    },
    {
      "id": "C",
      "text": "دژنراسیون موکوئیدی تاندون"
    },
    {
      "id": "D",
      "text": "رسوب کلسیم داخل تاندون"
    }
  ],
  "correct": "B",
  "explanation": "تاندون طبیعی می‌تواند نزدیک زاویهٔ ۵۵ درجه نسبت به B0 در TE کوتاه پُرسیگنال شود. TE، جهت و مورفولوژی اهمیت دارند، نه صرفاً نام T1 یا PD یا T2. کاهش در TE طولانی‌تر همراه با حفظ رشته‌ها در اینجا به نفع مجیک‌انگل است؛ از یک تصویر منفرد پارگی نتیجه نگیرید.",
  "wrongExplanations": {
    "A": "پارگی به مورفولوژی نقص سازگار نیاز دارد؛ متن رشته‌های سالم و تغییر سیگنال وابسته به TE را توصیف می‌کند.",
    "C": "دژنراسیون می‌تواند سیگنال تاندون را تغییر دهد، اما ترکیب زاویه و وابستگی به TE در اینجا بیشتر به نفع اثر جهت است.",
    "D": "رسوب کلسیم این افزایش سیگنال وابسته به جهت در TE کوتاه را توضیح نمی‌دهد."
  },
  "source": "https://pubs.rsna.org/doi/10.1148/radiology.181.2.1924777; https://pubmed.ncbi.nlm.nih.gov/16709684/; https://pubmed.ncbi.nlm.nih.gov/20578021/"
},
    {
  "id": "rotatorenmanschette-fa-06",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "علاوه بر مایع در بورس ساب‌آکرومیال، کدام یافتهٔ تاندونی از پارگی جزئی سمت بورسال سوپراسپیناتوس حمایت می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "نقص حاوی مایع در تمام ضخامت تاندون، از سطح مفصلی تا بورسال"
    },
    {
      "id": "B",
      "text": "نقص سطحی با سیگنال هم‌ارز مایع تا بورس، با حفظ رشته‌های سمت مفصلی"
    },
    {
      "id": "C",
      "text": "نقص با سیگنال هم‌ارز مایع تا سطح مفصلی، با حفظ سطح بورسال"
    },
    {
      "id": "D",
      "text": "نقص موضعی داخل تاندون با حفظ هر دو سطح"
    }
  ],
  "correct": "B",
  "explanation": "نقص مستقیم به سطح بورسال می‌رسد، اما تمام ضخامت تاندون را قطع نمی‌کند؛ رشته‌های مفصلی حفظ می‌شوند. مایع بورس به‌تنهایی با سطح سالم تاندون پارگی را ثابت نمی‌کند. مورفولوژی نقص را در چند نما بررسی کنید.",
  "wrongExplanations": {
    "A": "نقص پیوسته از مفصل تا بورس، پارگی تمام‌ضخامت را توصیف می‌کند، نه پارگی جزئی صرفاً بورسال.",
    "C": "این تماس با سطح، مفصلی است نه بورسال.",
    "D": "با حفظ هر دو سطح، نقص داخل تاندونی است و به بورس باز نمی‌شود."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-fa-07",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "اصطلاح ضایعهٔ PASTA در محل اتصال سوپراسپیناتوس به چه معناست؟",
  "options": [
    {
      "id": "A",
      "text": "نقص جزئی سمت بورسال در محل اتصال تاندون"
    },
    {
      "id": "B",
      "text": "جداشدگی جزئی سمت مفصلی در محل اتصال تاندون"
    },
    {
      "id": "C",
      "text": "نقص داخل تاندونی بدون ارتباط با هیچ‌یک از دو سطح"
    },
    {
      "id": "D",
      "text": "نقص تمام‌ضخامت با ارتباط بین مفصل و بورس"
    }
  ],
  "correct": "B",
  "explanation": "PASTA مخفف Partial Articular Surface Tendon Avulsion است: جداشدگی جزئی سمت مفصلی در محل اتصال. این اصطلاح محل و وسعت را توصیف می‌کند و به‌تنهایی علت درد را ثابت نمی‌کند. در ورزشکاران بالای سر، الگوی ایمپینجمنت داخلی خلفی‌فوقانی ممکن است در زمینهٔ بالینی مناسب وجود داشته باشد.",
  "wrongExplanations": {
    "A": "PASTA به سطح مفصلی اشاره دارد، نه نقص جزئی سمت بورسال.",
    "C": "نقص صرفاً داخل تاندونی ارتباط سطحی ندارد؛ PASTA به سمت مفصلیِ محل اتصال می‌رسد.",
    "D": "جزئی یعنی تمام ضخامت تاندون بین دو سطح قطع نشده است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/; https://pubmed.ncbi.nlm.nih.gov/22959196/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pubmed.ncbi.nlm.nih.gov/16762713/"
},
    {
  "id": "rotatorenmanschette-fa-08",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "سناریوی متنی: MRI شکافی با سیگنال هم‌ارز مایع و نقص رشته‌ها درون تاندون سوپراسپیناتوس نشان می‌دهد. هر دو سطح تاندون سالم‌اند. کدام طبقه‌بندی مناسب‌تر است؟",
  "options": [
    {
      "id": "A",
      "text": "تاندینوپاتی بدون نقص ساختاری"
    },
    {
      "id": "B",
      "text": "پارگی جزئی داخل تاندونی"
    },
    {
      "id": "C",
      "text": "پارگی جزئی سمت بورسال"
    },
    {
      "id": "D",
      "text": "پارگی جزئی سمت مفصلی"
    }
  ],
  "correct": "B",
  "explanation": "پارگی داخل تاندونی درون تاندون و بدون ارتباط با سطح مفصلی یا بورسال است. سیگنال هم‌ارز مایع و نقص رشته‌های ذکرشده در اینجا از این تفسیر حمایت می‌کنند. افزایش سیگنال T2 به‌تنهایی کافی نیست؛ تاندون دژنراتیو با ساختار سالم نیز ممکن است در T2 پُرسیگنال باشد.",
  "wrongExplanations": {
    "A": "متن علاوه بر تغییر سیگنال، نقص رشته‌ها را توصیف می‌کند؛ این فراتر از تاندینوپاتی با تغییر سیگنال صرف است.",
    "C": "پارگی بورسال به سطح بورس می‌رسد؛ این سطح در متن سالم است.",
    "D": "پارگی مفصلی به سطح مفصل می‌رسد؛ این سطح در اینجا سالم مانده است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/; https://pubmed.ncbi.nlm.nih.gov/20578021/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2465433/"
},
    {
  "id": "rotatorenmanschette-fa-09",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "با وجود درمان غیرجراحی، علائم ادامه دارند و نقص یک ضایعهٔ PASTA، ۶۰٪ ضخامت تاندون را درگیر می‌کند. کدام تفسیر درست است؟",
  "options": [
    {
      "id": "A",
      "text": "بیش از نصف ضخامت تاندون درگیر است؛ ترمیم در زمینهٔ بالینی بررسی می‌شود."
    },
    {
      "id": "B",
      "text": "بیش از نصف عرض قدامی‌خلفی محل اتصال درگیر است و بدین‌ترتیب عمق نقص مشخص می‌شود."
    },
    {
      "id": "C",
      "text": "پارگی تمام‌ضخامت وجود دارد، چون مرز تمام ضخامت تاندون ۵۰٪ است."
    },
    {
      "id": "D",
      "text": "بیش از نصف مساحت محل اتصال درگیر است و بدین‌ترتیب عمق نقص مشخص می‌شود."
    }
  ],
  "correct": "A",
  "explanation": "۵۰٪ به ضخامت تاندون یا عمق پارگی اشاره دارد. پهنای داخلی‌خارجی footprint نمایان می‌تواند در آرتروسکوپی عمق را تخمین بزند؛ مساحت یا عرض قدامی‌خلفی معادل آن نیست. علائم، عملکرد و درمان قبلی نیز لحاظ شوند؛ اندازه‌گیری به‌تنهایی جراحی را الزامی نمی‌کند.",
  "wrongExplanations": {
    "B": "گسترش قدامی‌خلفی و عمق نقص جهت‌های اندازه‌گیری متفاوتی‌اند؛ سؤال سهم ضخامت تاندون را مشخص کرده است.",
    "C": "پارگی تمام‌ضخامت تمام ضخامت را قطع می‌کند؛ ۶۰٪ همچنان نقص جزئی با درجهٔ بالا است.",
    "D": "مساحت معادل ضخامت نیست. سهم عمق ذکرشده را نمی‌توان مستقیماً از درصد مساحت محل اتصال نتیجه گرفت."
  },
  "sources": [
    "https://pubmed.ncbi.nlm.nih.gov/15007313/",
    "https://pmc.ncbi.nlm.nih.gov/articles/PMC3728419/"
  ]
},
    {
  "id": "rotatorenmanschette-fa-10",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "کدام یافتهٔ مستقیم MRI با نقص تمام‌ضخامت روتاتور کاف مطابقت دارد؟",
  "options": [
    {
      "id": "A",
      "text": "نقص حاوی مایع در سطح مفصلی با حفظ رشته‌های بورسال"
    },
    {
      "id": "B",
      "text": "نقص پیوستهٔ تاندون حاوی مایع بین سطح مفصلی و بورسال"
    },
    {
      "id": "C",
      "text": "نقص حاوی مایع در سطح بورسال با حفظ رشته‌های مفصلی"
    },
    {
      "id": "D",
      "text": "نقص حاوی مایع داخل تاندون با حفظ هر دو سطح"
    }
  ],
  "correct": "B",
  "explanation": "تمام‌ضخامت به قطع تاندون از سطح مفصلی تا بورسال اشاره دارد؛ نقص پیوستهٔ حاوی مایع نشانهٔ مستقیم تیپیک است. این الزاماً به معنی درگیری تمام عرض قدامی‌خلفی تاندون یا رتراکشن انتهای آن نیست.",
  "wrongExplanations": {
    "A": "حفظ رشته‌های بورسال یعنی نقص از سمت مفصلی و جزئی است، نه در تمام ضخامت.",
    "C": "حفظ رشته‌های مفصلی در اینجا نقص جزئی سمت بورسال را توصیف می‌کند.",
    "D": "نقص بدون ارتباط با هیچ‌یک از دو سطح، داخل تاندونی است."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5483776/; https://pmc.ncbi.nlm.nih.gov/articles/PMC2930161/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4733769/"
},
    {
  "id": "rotatorenmanschette-fa-11",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "درجهٔ رتراکشن متداول بر اساس Patte کدام پارامتر گزارش را توصیف می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "نسبت چربی به بافت عضله"
    },
    {
      "id": "B",
      "text": "موقعیت انتهای تاندونِ رتراکت‌شده"
    },
    {
      "id": "C",
      "text": "گسترش قدامی‌خلفی نقص تاندون"
    },
    {
      "id": "D",
      "text": "عمق نقص جزئی نسبت به ضخامت تاندون"
    }
  ],
  "correct": "B",
  "explanation": "درجهٔ رتراکشن Patte موقعیت انتهای تاندون را توصیف می‌کند، مثلاً نزدیک محل اتصال یا عقب‌کشیده تا گلنوئید. رتراکشن، اندازهٔ نقص و کیفیت عضله را جداگانه ثبت کنید. طبقه‌بندی اصلی Patte چند ویژگی را در نظر می‌گرفت و به این پارامتر منفرد محدود نبود.",
  "wrongExplanations": {
    "A": "نسبت چربی به عضله مربوط به ارزیابی دژنراسیون چربی است، نه درجهٔ رتراکشن مورد سؤال.",
    "C": "گسترش قدامی‌خلفی عرض نقص را توصیف می‌کند، نه موقعیت مدیال انتهای تاندون.",
    "D": "عمق نقص و رتراکشن تاندون دو اندازهٔ جداگانه‌اند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/2323151/; https://pmc.ncbi.nlm.nih.gov/articles/PMC4278262/"
},
    {
  "id": "rotatorenmanschette-fa-12",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "کدام مشاهده علامت تانژانت مثبت را در نمای Y ساژیتال مایل شانه توصیف می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "شکم سوپراسپیناتوس از خط بین لبهٔ فوقانی کوراکوئید و خار اسکاپولا بالاتر نمی‌رود"
    },
    {
      "id": "B",
      "text": "شکم سوپراسپیناتوس به‌وضوح از همان خط بالاتر می‌رود"
    },
    {
      "id": "C",
      "text": "چربی داخل سوپراسپیناتوس از بافت عضله بیشتر است"
    },
    {
      "id": "D",
      "text": "انتهای تاندون تا سطح گلنوئید رتراکت شده است"
    }
  ],
  "correct": "A",
  "explanation": "خط مرجع لبهٔ فوقانی کوراکوئید را به لبهٔ فوقانی خار اسکاپولا وصل می‌کند. بالاتر نرفتن شکم سوپراسپیناتوس از این خط به نفع آتروفی عضله است. نفوذ چربی و رتراکشن تاندون پارامترهای گزارش جداگانه‌ای هستند.",
  "wrongExplanations": {
    "B": "عبور از خط علامت تانژانت منفی است، نه مثبت.",
    "C": "نسبت چربی به عضله دژنراسیون چربی را توصیف می‌کند و تعریف علامت هندسی تانژانت نیست.",
    "D": "این توصیف رتراکشن تاندون است؛ علامت تانژانت شکم عضله را نسبت به خط مرجع ارزیابی می‌کند."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/9525755/"
},
    {
  "id": "rotatorenmanschette-fa-13",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "طبقه‌بندی Goutallier کدام ویژگی را توصیف می‌کند؟",
  "options": [
    {
      "id": "A",
      "text": "رتراکشن انتهای تاندون"
    },
    {
      "id": "B",
      "text": "نفوذ چربی در عضله، از درجهٔ ۰ تا ۴"
    },
    {
      "id": "C",
      "text": "عمق نقص جزئی تاندون"
    },
    {
      "id": "D",
      "text": "عرض قدامی‌خلفی پارگی تمام‌ضخامت"
    }
  ],
  "correct": "B",
  "explanation": "Goutallier نفوذ چربی را از درجهٔ ۰ (بدون چربی) تا درجهٔ ۴ (چربی بیشتر از عضله) توصیف می‌کند. درجات بالا عامل پیش‌آگهی نامطلوب برای ترمیم‌اند، اما به‌تنهایی قابلیت ترمیم یا منفعت عملکردی فرد را تعیین نمی‌کنند؛ سایر یافته‌های تاندون، عضله و بالین نیز باید لحاظ شوند.",
  "wrongExplanations": {
    "A": "رتراکشن و نفوذ چربی دو پارامتر متفاوت‌اند؛ Goutallier عضله را درجه‌بندی می‌کند.",
    "C": "عمق نقص تاندون را توصیف می‌کند، نه نسبت چربی به عضله.",
    "D": "عرض قدامی‌خلفی پارگی اندازهٔ وسعت است و درجه‌بندی کیفیت عضله نیست."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/8020238/; https://pubmed.ncbi.nlm.nih.gov/17418325/"
},
    {
  "id": "rotatorenmanschette-fa-14",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "سناریوی متنی: خاری در سطح زیرین آکرومیون به فضای ساب‌آکرومیال برجسته شده است. کدام ارتباط مکانیکی از نظر آناتومیک مناسب است؟",
  "options": [
    {
      "id": "A",
      "text": "تنگی بین کوراکوئید و توبرکل کوچک در محل ساب‌اسکاپولاریس"
    },
    {
      "id": "B",
      "text": "عامل استخوانیِ احتمالی تنگی در محل عبور تاندون و بورس ساب‌آکرومیال"
    },
    {
      "id": "C",
      "text": "تماس بخش خلفیِ مفصلی کاف با گلنوئید خلفی‌فوقانی"
    },
    {
      "id": "D",
      "text": "ناپایداری سر بلند بایسپس در پولی مدیال"
    }
  ],
  "correct": "B",
  "explanation": "محل ذکرشده با تنگی احتمالی خروجی ساب‌آکرومیال سازگار است. خار یا تیپ شکلی Bigliani به‌تنهایی نه ایمپینجمنت بالینی و نه پارگی را ثابت می‌کند؛ مورفولوژی، یافته‌های تاندون و بورس و بالین را با هم بسنجید. خارها می‌توانند با تغییرات کاف همراه باشند و به‌طور ثانویه نیز ایجاد شوند.",
  "wrongExplanations": {
    "A": "این ارتباط ساب‌کوراکوئید در جلوی سر هومروس است، نه سطح زیرین آکرومیونِ ذکرشده.",
    "C": "این توصیف تماس داخل‌مفصلی خلفی‌فوقانی است؛ خار در خروجی ساب‌آکرومیال قرار دارد.",
    "D": "پولی مدیال بایسپس ناحیه‌ای متفاوت از محل عبور ساب‌آکرومیالِ ذکرشده است."
  },
  "source": "https://pubmed.ncbi.nlm.nih.gov/16337525/; https://pubmed.ncbi.nlm.nih.gov/12934022/; https://pmc.ncbi.nlm.nih.gov/articles/PMC3725773/; https://pubmed.ncbi.nlm.nih.gov/22959196/"
},
    {
  "id": "rotatorenmanschette-fa-15",
  "tags": [
    "rotatorenmanschette",
    "schulter"
  ],
  "fach": "msk",
  "question": "در MRI، سر بلند بایسپس در سمت مدیال خارج از شیار بایسپس قرار دارد. کدام ناحیه باید به‌طور ویژه از نظر آسیب همراه بررسی شود؟",
  "options": [
    {
      "id": "A",
      "text": "محل اتصال سوپراسپیناتوس به توبرکل بزرگ"
    },
    {
      "id": "B",
      "text": "بخش فوقانی ساب‌اسکاپولاریس و پولی بایسپس"
    },
    {
      "id": "C",
      "text": "محل اتصال خلفی اینفراسپیناتوس"
    },
    {
      "id": "D",
      "text": "محل اتصال خلفی‌تحتانی ترس مینور"
    }
  ],
  "correct": "B",
  "explanation": "نیمه‌دررفتگی یا دررفتگی مدیال سر بلند بایسپس سرنخ مهم آسیب بخش فوقانی ساب‌اسکاپولاریس و سازهٔ نگه‌دارنده است. تاندون و پولی را مستقیم بررسی کنید؛ این علامت غیرمستقیم به‌تنهایی وسعت هر پارگی را تعیین نمی‌کند. برعکس، موقعیت طبیعی بایسپس ضایعهٔ ساب‌اسکاپولاریس را رد نمی‌کند.",
  "wrongExplanations": {
    "A": "سوپراسپیناتوس بخشی از ارزیابی کاف است، اما ناپایداری مدیال بایسپس در اینجا توجه را به‌ویژه به ساب‌اسکاپولاریس فوقانی و پولی جلب می‌کند.",
    "C": "اتصال خلفی اینفراسپیناتوس سازهٔ قدامی نگه‌دارندهٔ بایسپسِ مورد سؤال نیست.",
    "D": "ترس مینور عضو کاف خلفی است، نه نگه‌دارندهٔ مدیال بایسپس در بخش فوقانی ساب‌اسکاپولاریس."
  },
  "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC6151251/; https://pubmed.ncbi.nlm.nih.gov/1624486/"
}
  ]
}

const SPINE_DISC_QUESTION_SEEDS = [
  {
    id: 'protrusion-base',
    question: { de: 'In derselben MRT-Ebene ist die Basis des vorgewölbten Bandscheibenmaterials breiter als seine maximale Ausdehnung über den Diskusraum hinaus. Wie heißt die Morphologie?', en: 'In the same MRI plane, the base of the displaced disc material is wider than its greatest extension beyond the disc space. What is the morphology?', fa: 'در همان صفحهٔ MRI، پهنای قاعدهٔ مادهٔ جابه‌جاشدهٔ دیسک از بیشترین گسترش آن به بیرون فضای دیسک بیشتر است. مورفولوژی چیست؟' },
    options: [
      { de: 'Protrusion', en: 'Protrusion', fa: 'پروتروژن' },
      { de: 'Extrusion', en: 'Extrusion', fa: 'اکستروژن' },
      { de: 'Sequestration', en: 'Sequestration', fa: 'سکوستراسیون' },
      { de: 'Diffuse Bandscheibenwölbung (Bulging)', en: 'Diffuse disc bulging', fa: 'برجستگی منتشر دیسک (Bulging)' },
    ], correct: 'A',
    explanation: { de: 'Bei einer Protrusion ist die Basis des fokal verlagerten Materials in derselben Ebene breiter als seine über den Diskusraum hinausragende Komponente. Entscheidend ist die Morphologie, nicht eine vermutete Ursache.', en: 'In a protrusion, the base of the focal displacement is wider than the component extending beyond the disc space when measured in the same plane. The term describes morphology, not a presumed cause.', fa: 'در پروتروژن، قاعدهٔ جابه‌جایی کانونی در همان صفحه از بخش بیرون‌زده از فضای دیسک پهن‌تر است. این اصطلاح مورفولوژی را توصیف می‌کند، نه علت فرضی را.' },
    wrong: { B: { de: 'Bei einer Extrusion ist der verlagerte Anteil in derselben Ebene größer als die Basis oder es besteht keine Kontinuität.', en: 'In extrusion, the displaced component is wider than its base in the same plane, or continuity is absent.', fa: 'در اکستروژن، بخش جابه‌جاشده در همان صفحه از قاعده پهن‌تر است یا پیوستگی وجود ندارد.' }, C: { de: 'Eine Sequestration ist ein Sonderfall der Extrusion ohne Verbindung zum Ursprungsdiskus.', en: 'Sequestration is an extrusion with no continuity to the parent disc.', fa: 'سکوستراسیون نوعی اکستروژن است که با دیسک مادر پیوستگی ندارد.' }, D: { de: 'Bulging bezeichnet eine diffuse Konturverbreiterung und ist nicht gleichbedeutend mit einer fokalen Protrusion.', en: 'Bulging describes diffuse contour extension and is not synonymous with focal protrusion.', fa: 'Bulging گسترش منتشر کانتور است و مترادف پروتروژن کانونی نیست.' } },
  },
  {
    id: 'sequester-continuity',
    question: { de: 'Ein extrudiertes Bandscheibenfragment liegt im Spinalkanal, hat aber keine erkennbare Verbindung mehr zum Ursprungsdiskus. Welche Bezeichnung ist am präzisesten?', en: 'An extruded disc fragment lies in the spinal canal but has no visible continuity with its parent disc. Which term is most precise?', fa: 'قطعه‌ای اکسترودشده در کانال نخاعی دیده می‌شود، اما دیگر ارتباط قابل مشاهده‌ای با دیسک مادر ندارد. دقیق‌ترین اصطلاح چیست؟' },
    options: [
      { de: 'Sequestration / freies Fragment', en: 'Sequestration / free fragment', fa: 'سکوستراسیون / قطعهٔ آزاد' },
      { de: 'Protrusion', en: 'Protrusion', fa: 'پروتروژن' },
      { de: 'Diffuse Bandscheibenwölbung', en: 'Diffuse disc bulging', fa: 'برجستگی منتشر دیسک' },
      { de: 'Intakte Bandscheibenkontur', en: 'Intact disc contour', fa: 'کانتور سالم دیسک' },
    ], correct: 'A',
    explanation: { de: 'Der Verlust der Kontinuität zum Ursprungsdiskus kennzeichnet die Sequestration. Eine Extrusion kann dagegen noch mit dem Diskus in Verbindung stehen.', en: 'Loss of continuity with the parent disc defines sequestration. An extrusion may remain connected to the disc.', fa: 'ازبین‌رفتن پیوستگی با دیسک مادر مشخصهٔ سکوستراسیون است؛ اکستروژن ممکن است همچنان متصل باشد.' },
    wrong: { B: { de: 'Eine Protrusion wird durch das Verhältnis von Basis und vorgewölbtem Anteil beschrieben; ein freies Fragment ist keine Protrusion.', en: 'Protrusion is defined by the relationship of base to displaced component; a free fragment is not a protrusion.', fa: 'پروتروژن با نسبت قاعده به بخش جابه‌جا‌شده تعریف می‌شود؛ قطعهٔ آزاد پروتروژن نیست.' }, C: { de: 'Eine diffuse Wölbung ist nicht dasselbe wie ein abgelöstes fokales Fragment.', en: 'Diffuse bulging is not the same as a detached focal fragment.', fa: 'برجستگی منتشر با قطعهٔ کانونی جداشده یکسان نیست.' }, D: { de: 'Ein loses Fragment zeigt gerade, dass die Kontinuität nicht erhalten ist.', en: 'A free fragment means continuity is not preserved.', fa: 'قطعهٔ آزاد نشان می‌دهد که پیوستگی حفظ نشده است.' } },
  },
  {
    id: 'foraminal-zone',
    question: { de: 'Eine fokale Bandscheibenherniation liegt innerhalb des Neuroforamens. Welche axiale Lokalisation beschreibt das?', en: 'A focal disc herniation lies within the neural foramen. Which axial location describes it?', fa: 'فتق کانونی دیسک درون فورامن عصبی قرار دارد. کدام محل‌یابی آکسیال آن را توصیف می‌کند؟' },
    options: [
      { de: 'Foraminal', en: 'Foraminal', fa: 'فورامینال' },
      { de: 'Zentral / median', en: 'Central / median', fa: 'مرکزی / مدیان' },
      { de: 'Subartikulär / paramedian', en: 'Subarticular / paramedian', fa: 'ساب‌آرتیکولار / پارامدیان' },
      { de: 'Extraforaminal', en: 'Extraforaminal', fa: 'خارج‌فورامینال' },
    ], correct: 'A',
    explanation: { de: 'Foraminal bedeutet innerhalb des Neuroforamens. Eine extraforaminale Läsion liegt lateral davon; die genaue Etage und tatsächlich betroffene Struktur zusätzlich nennen.', en: 'Foraminal means within the neural foramen. An extraforaminal lesion lies lateral to it; also state the level and structure actually affected.', fa: 'فورامینال یعنی درون فورامن عصبی. ضایعهٔ خارج‌فورامینال در سمت خارجی آن قرار دارد؛ سطح و ساختار واقعاً درگیر را نیز مشخص کنید.' },
    wrong: { B: { de: 'Zentral/median liegt die Läsion im mittleren Kanalbereich, nicht im Neuroforamen.', en: 'Central/median describes the midline canal region, not the neural foramen.', fa: 'مرکزی/مدیان به ناحیهٔ میانی کانال اشاره دارد، نه فورامن عصبی.' }, C: { de: 'Subartikulär/paramedian liegt die Läsion im lateralen Rezessus vor dem Neuroforamen.', en: 'Subarticular/paramedian describes the lateral recess before the neural foramen.', fa: 'ساب‌آرتیکولار/پارامدیان به رِسِس جانبی، پیش از فورامن عصبی، اشاره دارد.' }, D: { de: 'Extraforaminal liegt die Läsion außerhalb und lateral des Neuroforamens.', en: 'Extraforaminal means outside and lateral to the neural foramen.', fa: 'خارج‌فورامینال یعنی بیرون و در سمت خارجی فورامن عصبی.' } },
  },
  {
    id: 'subarticular-location',
    question: { de: 'Welche Aussage zur paramedianen/subartikulären Bandscheibenherniation ist am ehesten zutreffend?', en: 'Which statement about a paramedian/subarticular disc herniation is most accurate?', fa: 'کدام عبارت دربارهٔ فتق پارامدیان/ساب‌آرتیکولار دیسک دقیق‌تر است؟' },
    options: [
      { de: 'Sie kann die traversierende Nervenwurzel bedrängen; Etage und tatsächlichen Befund mit angeben.', en: 'It may affect the traversing nerve root; state the level and actual finding.', fa: 'ممکن است بر ریشهٔ عصبی عبوری فشار وارد کند؛ سطح و یافتهٔ واقعی را نیز ذکر کنید.' },
      { de: 'Sie liegt definitionsgemäß außerhalb des Neuroforamens.', en: 'By definition, it lies outside the neural foramen.', fa: 'طبق تعریف، بیرون فورامن عصبی قرار دارد.' },
      { de: 'Sie betrifft unabhängig von der Etage immer das Myelon.', en: 'It always affects the spinal cord, regardless of level.', fa: 'صرف‌نظر از سطح، همیشه نخاع را درگیر می‌کند.' },
      { de: 'Die axiale Lokalisation allein beweist eine klinische Radikulopathie.', en: 'Axial location alone proves clinical radiculopathy.', fa: 'محل‌یابی آکسیال به‌تنهایی رادیکولوپاتی بالینی را ثابت می‌کند.' },
    ], correct: 'A',
    explanation: { de: 'Paramediane/subartikuläre Herniationen können die traversierende Wurzel bedrängen. Das ist eine anatomische Möglichkeit, kein Beweis für Symptome; Etage und beobachtete neurale Beziehung beschreiben.', en: 'Paramedian/subarticular herniations may affect the traversing root. This is an anatomic possibility, not proof of symptoms; describe the level and observed neural relationship.', fa: 'فتق پارامدیان/ساب‌آرتیکولار ممکن است ریشهٔ عبوری را درگیر کند. این یک امکان آناتومیک است، نه اثبات علائم؛ سطح و رابطهٔ عصبی مشاهده‌شده را توصیف کنید.' },
    wrong: { B: { de: 'Außerhalb des Neuroforamens ist extraforaminal; subartikulär liegt medial davon im lateralen Rezessus.', en: 'Outside the neural foramen is extraforaminal; subarticular is medial to it in the lateral recess.', fa: 'بیرون فورامن عصبی خارج‌فورامینال است؛ ساب‌آرتیکولار در سمت داخلی آن و در رِسِس جانبی قرار دارد.' }, C: { de: 'Die betroffene neurale Struktur hängt von der Wirbelsäulenetage ab; im unteren LWS-Bereich verlaufen Cauda-equina-Wurzeln statt Myelon.', en: 'The neural structure depends on level; in the lower lumbar spine, cauda equina roots rather than cord are present.', fa: 'ساختار عصبی درگیر به سطح بستگی دارد؛ در بخش پایینی کمر ریشه‌های دم‌اسبی وجود دارند، نه نخاع.' }, D: { de: 'Ein Bildmuster allein beweist keine individuelle Symptomursache.', en: 'An imaging pattern alone does not prove an individual symptom cause.', fa: 'الگوی تصویری به‌تنهایی علت علائم فرد را ثابت نمی‌کند.' } },
  },
]

const SPINE_DISC_QUESTIONS = Object.fromEntries(['de', 'en', 'fa'].map(lang => [lang, SPINE_DISC_QUESTION_SEEDS.map(seed => ({
  id: `bandscheibenpathologien-${lang}-${seed.id}`,
  fach: 'wirbelsaeule',
  tags: ['bandscheibenpathologien'],
  question: seed.question[lang],
  options: seed.options.map((option, index) => ({ id: String.fromCharCode(65 + index), text: option[lang] })),
  correct: seed.correct,
  explanation: seed.explanation[lang],
  wrongExplanations: Object.fromEntries(Object.entries(seed.wrong).map(([id, text]) => [id, text[lang]])),
  source: 'Wirbelsäule.pdf PDF S. 6 / printed p. 5; Fardon et al., Spine J. 2014;14:2525–2545 (morphology)',
}))]))

export const QUESTION_BANK = Object.fromEntries(
  Object.entries(LEGACY_QUESTION_BANK).map(([lang, questions]) => [
    lang,
    [...questions.filter(question => !question.id.startsWith('haemangiom-')), ...DWI_ADC_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-shine-through`)), ...(HEMANGIOMA_QUESTIONS[lang] || []), ...(PELVIC_RING_QUESTIONS[lang] || []), ...(VANCOUVER_QUESTIONS[lang] || []), ...(PROXIMAL_FEMUR_QUESTIONS[lang] || []), ...(DISTAL_FEMUR_QUESTIONS[lang] || []), ...(FEMORAL_SHAFT_QUESTIONS[lang] || []), ...(TIBIAL_PLATEAU_QUESTIONS[lang] || []), ...(ANKLE_TRAUMA_QUESTIONS[lang] || []), ...(SHOULDER_IMPINGEMENT_QUESTIONS[lang] || []), ...(PATELLA_STRECKAPPARAT_QUESTIONS[lang] || []), ...KOLLOID_QUESTIONS.filter(question => question.id.startsWith(`kolloidzyste-${lang}-`)), ...UIP_IPF_QUESTIONS.filter(question => question.id.startsWith(`uip-ipf-${lang}-`)), ...BRONCHIECTASIS_QUESTIONS.filter(question => question.id.startsWith(`bronchiektasen-${lang}-`)), ...RENAL_TRAUMA_QUESTIONS.filter(question => question.id.startsWith(`nierentrauma-${lang}-`)), ...(ADPKD_QUESTIONS[lang] || []), ...PULMONARY_EDEMA_QUESTIONS.filter(question => question.id.startsWith(`lungenoedem-${lang}-`)), ...PULMONARY_HYPERTENSION_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-haemodynamics`) || question.id.endsWith(`-${lang}-ct-signs`)), ...DUAL_ENERGY_CT_QUESTIONS.filter(question => question.id.startsWith(`dual-energy-ct-${lang}-`)), ...MR_PERFUSION_QUESTIONS.filter(question => question.id.startsWith(`mrt-perfusion-${lang}-`)), ...TECHNIK_CINE_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-motion-flow`)), ...TECHNIK_BOLD_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-mechanism`)), ...MRI_ARTIFACT_QUESTIONS.filter(question => question.id.startsWith(`mri-artifacts-${lang}-`)), ...MRI_SAFETY_QUESTIONS.filter(question => question.id === `mri-safety-${lang}-hotspot`), ...MRI_SAFETY_PREGNANCY_QUESTIONS.filter(question => question.id === `mri-safety-${lang}-pregnancy`), ...MRI_SPIN_ECHO_QUESTIONS.filter(question => question.id === `mrt-spin-echo-${lang}-pd`), ...MRI_GRADIENT_ECHO_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-refocusing`)), ...MRI_INVERSION_RECOVERY_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-targets`)), ...MRI_FAT_SUPPRESSION_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-stir`) || question.id.endsWith(`-${lang}-opposed-phase`)), ...MRI_FUNDAMENTALS_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-resonance`)), ...MRI_QUALITY_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-shimming-coil`)), ...MR_ANGIOGRAPHY_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-venc`)), ...CT_QUALITY_QUESTIONS.filter(question => question.id.startsWith(`ct-quality-${lang}-`)), ...CT_PERFUSION_QUESTIONS.filter(question => question.id.startsWith(`ct-perfusion-${lang}-`)), ...CT_RECONSTRUCTION_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-window-kernel`)), ...HRCT_TECHNIK_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-expiratory`)), ...CT_PROTOCOL_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-pancreas-phase`)), ...MR_MYEL_QUESTIONS[lang], ...ATELECTASIS_QUESTIONS[lang], ...LCH_QUESTIONS[lang], ...CF_QUESTIONS[lang], ...BRONCHIOLITIS_QUESTIONS[lang], ...HP_QUESTIONS[lang], ...THORAX_PNEUMONIA_QUESTIONS.filter(q => q.id.includes(`-${lang}-`)), ...CYST_QUESTIONS[lang], ...PECTUS_QUESTIONS.filter(q => q.id.includes(`-${lang}-`)), ...SPINE_DEGENERATIVE_COMPLETION_QUESTIONS[lang], ...SPINE_INFECTIOUS_QUESTIONS[lang], ...SPINE_METABOLIC_QUESTIONS[lang], ...SPINE_COMPLETION_QUESTIONS[lang], ...SPINE_PATTERN_QUESTIONS[lang], ...THORAX_EXISTING_QUESTIONS[lang], ...REMAINING_BLOCK_QUESTIONS.filter(q => q.id.endsWith(`-${lang}-01`)), ...ACCESS_QUESTIONS.filter(q => q.id.endsWith(`-${lang}-01`)), ...CT_BASICS_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-01`)), ...(TECHNIK_ROENTGEN_QUESTIONS[lang] || []), ...Object.entries(ABDOMEN_THORAX_REGISTERED_QUESTIONS).filter(([key]) => key !== 'pneumonie-muster').map(([, question]) => question[lang]), ...MSK_SPINE_REGISTERED_QUESTIONS.map(question => question[lang]), ...SPINE_MODIC_QUESTIONS.filter(question => question.id.endsWith(`-${lang}-modic-ii-signal`)), ...(WRIST_EXTENSOR_QUESTIONS[lang] || []), ...(DE_QUERVAIN_QUESTIONS[lang] || []), ...(PROXIMAL_HUMERUS_QUESTIONS[lang] || []), ...METACARPAL_BASE_QUESTIONS[lang], ...BONE_INFARCT_QUESTIONS[lang], ...EOSINOPHILIC_GRANULOMA_QUESTIONS[lang], ...FMD_QUESTIONS[lang], ...FACET_QUESTIONS[lang], ...SPINE_DISC_QUESTIONS[lang], ...PCNSL_QUESTIONS[lang], ...MEDULLO_QUESTIONS[lang], ...MENING_QUESTIONS[lang], ...RECIST_QUESTIONS[lang], ...ORMOND_QUESTIONS[lang], ...EPIPLOICA_QUESTIONS[lang], ...PANNICULITIS_QUESTIONS[lang], ...PERITONEAL_QUESTIONS[lang], ...BRAIN_METASTASES_QUESTIONS[lang]],
  ])
)

for (const lang of Object.keys(QUESTION_BANK)) {
  QUESTION_BANK[lang].push(...LIVER_VESSELS_QUESTIONS.filter(question => question.id.startsWith(`liver-vessels-${lang}-`)))
}

for (const lang of Object.keys(QUESTION_BANK)) {
  QUESTION_BANK[lang].push(WIRBELMETASTASEN_QUESTIONS.find(question => question.id === `wirbelmetastasen-${lang}-ivory-vs-destructive`))
  QUESTION_BANK[lang].push(SPINAL_INTRAMEDULLARY_TUMOR_QUESTIONS.find(question => question.id === `spinal-intramedullary-${lang}-pattern-comparison`))
  QUESTION_BANK[lang].push(SPINAL_EXTRAMEDULLARY_QUESTIONS.find(question => question.id === `spinal-extramedullary-${lang}-pdf-patterns`))
  QUESTION_BANK[lang].push(TECHNIK_FLUORO_ZOOM_QUESTIONS.find(question => question.id === `fluoro-zoom-${lang}-digital-vs-acquisition`))
  QUESTION_BANK[lang].push(TECHNIK_ENTRANCE_KERMA_QUESTIONS.find(question => question.id === `entrance-kerma-${lang}-backscatter`))
  QUESTION_BANK[lang].push(...(MSK_BONE_AGGRESSIVENESS_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(GIST_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(VOLVULUS_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(PNET_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(HEPATIC_ANGIOMYOLIPOMA_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(PSC_MRCP_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(FOREIGN_BODY_ASPIRATION_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(LIVER_MRI_PROTOCOL_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(OSTEOCHONDROSIS_DISSECANS_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(SHOULDER_INSTABILITY_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(LUNG_CARCINOMA_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(NEUROFORAMENSTENOSE_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(COPD_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(ATRT_QUESTIONS[lang] || []))
  QUESTION_BANK[lang].push(...(DIFFUSE_GLIOMA_QUESTIONS[lang] || []))
}

for (const lang of ['de', 'en', 'fa']) {
  QUESTION_BANK[lang].push(...STERNUM_RIB_QUESTIONS[lang], ...GLENOHUMERAL_OA_QUESTIONS[lang], ...UPPER_ARTERY_QUESTIONS[lang])
}

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...CIRRHOSIS_QUESTIONS[lang])

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...ABDOMEN_GI_QUESTIONS[lang])

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...FLC_QUESTIONS[lang])

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...LIRADS_QUESTIONS[lang])

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...ABDOMEN_EXISTING_QUESTIONS[lang])

for (const lang of ['de','en','fa']) QUESTION_BANK[lang].push(...qualityQuestions(lang))

export const MCQ_TOPIC_GROUPS = [
  ...ABDOMEN_EXISTING_TOPIC_GROUPS,
  LIRADS_TOPIC_GROUP,
  FLC_TOPIC_GROUP,
  ...ABDOMEN_GI_TOPIC_GROUPS,
  CIRRHOSIS_TOPIC_GROUP,
  { fachId: 'msk', kapitelId: 'msk-trauma', title: STERNUM_RIB_COPY.title, topics: [{ id: STERNUM_RIB_ID, title: STERNUM_RIB_COPY.title }] },
  { fachId: 'msk', kapitelId: 'msk-schulter', title: GLENOHUMERAL_OA_LESSON.title, topics: [{ id: GLENOHUMERAL_OA_TOPIC_ID, title: GLENOHUMERAL_OA_LESSON.title }] },
  UPPER_ARTERY_TOPIC_GROUP,
  DIFFUSE_GLIOMA_TOPIC_GROUP,
  ATRT_TOPIC_GROUP,
  COPD_TOPIC_GROUP,
  NEUROFORAMENSTENOSE_TOPIC_GROUP,
  SHOULDER_INSTABILITY_TOPIC_GROUP,
  ADPKD_TOPIC_GROUP,
  {
    fachId: 'msk', kapitelId: 'msk-osteochondrosen',
    title: { de: 'Osteochondrosen', en: 'Osteochondroses', fa: 'استئوکندروزها' },
    topics: [{ id: 'morbus-scheuermann', title: { de: 'Morbus Scheuermann', en: "Scheuermann's disease", fa: 'بیماری شویرمان' } }],
  },
  MSK_BONE_AGGRESSIVENESS_TOPIC_GROUP,
  SPINE_MODIC_TOPIC_GROUP,
  { fachId: 'msk', kapitelId: 'msk-knee-lower-leg', title: { de: 'Knie & Unterschenkel', en: 'Knee & lower leg', fa: 'زانو و ساق' }, topics: [{ id: 'patella-streckapparat', title: { de: 'Patella & Streckapparat', en: 'Patella & extensor mechanism', fa: 'کشکک و مکانیسم اکستانسور' } }] },
  { fachId: 'msk', kapitelId: 'msk-knee-lower-leg', title: { de: 'Knie & Unterschenkel', en: 'Knee & lower leg', fa: 'زانو و ساق' }, topics: [{ id: 'patellafraktur-trauma', title: { de: 'Patellafraktur', en: 'Patellar fracture', fa: 'شکستگی کشکک' } }] },
  { fachId: 'msk', kapitelId: 'msk-schulter', title: { de: 'Schulter', en: 'Shoulder', fa: 'شانه' }, topics: [{ id: 'impingement-kalkschulter', title: { de: 'Schulter-Impingement', en: 'Shoulder impingement', fa: 'ایمپینجمنت شانه' } }] },
  { fachId: 'msk', kapitelId: 'msk-fuss', title: { de: 'Sprunggelenk & Fuß', en: 'Ankle & foot', fa: 'مچ پا و پا' }, topics: [{ id: 'osg-fraktur', title: { de: 'Sprunggelenktrauma', en: 'Ankle trauma', fa: 'ترومای مچ پا' } }] },
  { fachId: 'msk', kapitelId: 'msk-knee-lower-leg', title: { de: 'Knie & Unterschenkel', en: 'Knee & lower leg', fa: 'زانو و ساق' }, topics: [{ id: 'tibiakopffraktur', title: { de: 'Tibiakopffraktur', en: 'Tibial plateau fracture', fa: 'شکستگی پلاتوی تیبیا' } }] },
  { fachId: 'msk', kapitelId: 'msk-femoral-shaft', title: { de: 'Femurschaft', en: 'Femoral shaft', fa: 'تنهٔ فمور' }, topics: [{ id: 'femurschaftfraktur', title: { de: 'Femurschaftfraktur · AO 32', en: 'Femoral shaft fracture · AO 32', fa: 'شکستگی تنهٔ فمور · AO 32' } }] },
  { fachId: 'msk', kapitelId: 'msk-knee-lower-leg', title: { de: 'Knie & Unterschenkel', en: 'Knee & lower leg', fa: 'زانو و ساق' }, topics: [{ id: 'distale-femurfraktur', title: { de: 'Distale Femurfraktur', en: 'Distal femur fracture', fa: 'شکستگی دیستال فمور' } }] },
  { fachId: 'msk', kapitelId: 'msk-hip-pelvis', title: { de: 'Hüfte & Becken', en: 'Hip & pelvis', fa: 'لگن و مفصل ران' }, topics: [{ id: 'proximale-femurfraktur', title: { de: 'Proximale Femurfraktur', en: 'Proximal femoral fracture', fa: 'شکستگی پروگزیمال فمور' } }] },
  { fachId: 'msk', kapitelId: 'msk-hip-pelvis', title: { de: 'Hüfte & Becken', en: 'Hip & pelvis', fa: 'لگن و مفصل ران' }, topics: [{ id: 'periprothetische-femurfraktur', title: { de: 'Periprothetische Femurfraktur', en: 'Periprosthetic femoral fracture', fa: 'شکستگی اطراف پروتز فمور' } }] },
  { fachId: 'msk', kapitelId: 'msk-hip-pelvis', title: { de: 'Hüfte & Becken', en: 'Hip & pelvis', fa: 'لگن و مفصل ران' }, topics: [{ id: 'beckenringfraktur', title: { de: 'Beckenringfraktur', en: 'Pelvic ring fracture', fa: 'شکستگی حلقهٔ لگنی' } }] },
  { fachId: 'msk', kapitelId: 'msk-hand', title: { de: 'Hand & Handwurzel', en: 'Hand & carpus', fa: 'دست و کارپ' }, topics: [{ id: 'skaphoidfraktur', title: { de: 'Skaphoidfraktur', en: 'Scaphoid fracture', fa: 'شکستگی اسکافوئید' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-leber', title: { de: 'Leber', en: 'Liver', fa: 'کبد' }, topics: [{ id: 'hepatisches-angiomyolipom', title: { de: 'Hepatisches Angiomyolipom', en: 'Hepatic angiomyolipoma', fa: 'آنژیومیولیپوم کبدی' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-niere', title: { de: 'Niere', en: 'Kidney', fa: 'کلیه' }, topics: [{ id: 'nierentrauma', title: { de: 'Nierentrauma', en: 'Renal trauma', fa: 'تروما کلیه' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-gallenwege', title: { de: 'Gallenwege', en: 'Bile ducts', fa: 'مجاری صفراوی' }, topics: [{ id: 'psc-pbc', title: { de: 'PSC im MRCP', en: 'PSC on MRCP', fa: 'PSC در MRCP' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-gefaesse', title: { de: 'Aorta & viszerale Gefäße', en: 'Aorta & visceral vessels', fa: 'آئورت و عروق احشایی' }, topics: [{ id: 'fibromuskulaere-dysplasie', title: { de: 'Fibromuskuläre Dysplasie', en: 'Fibromuscular dysplasia', fa: 'دیسپلازی فیبروماسکولار' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-pankreas', title: { de: 'Pankreas', en: 'Pancreas', fa: 'پانکراس' }, topics: [{ id: 'pnet', title: { de: 'Neuroendokrine Tumoren (pNET)', en: 'Neuroendocrine tumours (pNET)', fa: 'تومورهای نورواندوکرین پانکراس (pNET)' } }] },
  TECHNIK_ROENTGEN_TOPIC_GROUP,
  TECHNIK_CINE_TOPIC_GROUP,
  TECHNIK_FLUORO_ZOOM_TOPIC_GROUP,
  TECHNIK_ENTRANCE_KERMA_TOPIC_GROUP,
  WIRBELMETASTASEN_TOPIC_GROUP,
  SPINAL_INTRAMEDULLARY_TUMOR_TOPIC_GROUP,
  SPINAL_EXTRAMEDULLARY_TOPIC_GROUP,
  TECHNIK_BOLD_TOPIC_GROUP,
  CT_BASICS_TOPIC_GROUP,
  MR_MYEL_TOPIC_GROUP,
  ATELECTASIS_TOPIC_GROUP,
  LCH_TOPIC_GROUP,
  CF_TOPIC_GROUP,
  BRONCHIOLITIS_TOPIC_GROUP,
  HP_TOPIC_GROUP,
  { fachId: 'thorax', kapitelId: 'thorax-pleura', title: THORAX_PNEUMONIA_TOPICS.find(t => t.id === 'pleuraempyem').title, topics: [THORAX_PNEUMONIA_TOPICS.find(t => t.id === 'pleuraempyem')] },
  CYST_TOPIC_GROUP,
  { fachId: 'thorax', kapitelId: 'thorax-thoraxwand', title: PECTUS_LESSON.title, topics: [{ id: 'pectus-excavatum', title: PECTUS_LESSON.title }] },
  ...SPINE_DEGENERATIVE_COMPLETION_TOPIC_GROUPS,
  ...SPINE_INFECTIOUS_TOPIC_GROUPS,
  ...SPINE_METABOLIC_TOPIC_GROUPS,
  ...SPINE_COMPLETION_TOPIC_GROUPS,
  ...SPINE_PATTERN_TOPIC_GROUPS,
  ...THORAX_EXISTING_TOPIC_GROUPS,
  ...REMAINING_BLOCK_TOPIC_GROUPS,
  ...ACCESS_TOPIC_GROUPS,
  CT_PERFUSION_TOPIC_GROUP,
  CT_RECONSTRUCTION_TOPIC_GROUP,
  HRCT_TECHNIK_TOPIC_GROUP,
  CT_PROTOCOL_TOPIC_GROUP,
  MRI_FUNDAMENTALS_TOPIC_GROUP,
  DUAL_ENERGY_CT_TOPIC_GROUP,
  MR_PERFUSION_TOPIC_GROUP,
  MRI_ARTIFACT_TOPIC_GROUP,
  MRI_SAFETY_TOPIC_GROUP,
  MRI_SPIN_ECHO_TOPIC_GROUP,
  MRI_GRADIENT_ECHO_TOPIC_GROUP,
  MRI_INVERSION_RECOVERY_TOPIC_GROUP,
  MRI_FAT_SUPPRESSION_TOPIC_GROUP,
  MR_ANGIOGRAPHY_TOPIC_GROUP,
  CT_QUALITY_TOPIC_GROUP,
  LIVER_MRI_PROTOCOL_TOPIC_GROUP,
  OSTEOCHONDROSIS_DISSECANS_TOPIC_GROUP,
  { fachId: 'msk', kapitelId: 'msk-hand', title: { de: 'Hand & Mittelhand', en: 'Hand & metacarpals', fa: 'دست و متاکارپ' }, topics: [{ id: 'metakarpale-frakturen', title: { de: 'Metakarpalbasisfrakturen', en: 'Metacarpal base fractures', fa: 'شکستگی‌های قاعدهٔ متاکارپ' } }, { id: 'bandverletzungen-daumen', title: { de: 'UCL-Verletzung am Daumen', en: 'Thumb UCL injury', fa: 'آسیب UCL شست' } }] },
  { fachId: 'msk', kapitelId: 'msk-shoulder-upper-arm', title: { de: 'Schulter & Oberarm', en: 'Shoulder & upper arm', fa: 'شانه و بازو' }, topics: [{ id: 'proximale-humerusfraktur', title: { de: 'Proximale Humerusfraktur', en: 'Proximal humerus fracture', fa: 'شکستگی پروگزیمال هومروس' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-peritoneum', title: { de: 'Peritoneum & Mesenterium', en: 'Peritoneum & mesentery', fa: 'پریتوئن و مزانتر' }, topics: [{ id: 'appendicitis-epiploica', title: { de: 'Epiploische Appendagitis', en: 'Epiploic appendagitis', fa: 'التهاب زائدهٔ چربی کولون' } }, { id: 'mesenteriale-panniculitis', title: { de: 'Mesenteriale Panniculitis', en: 'Mesenteric panniculitis', fa: 'پانیکولیت مزانتریک' } }, { id: 'peritonealkarzinose', title: { de: 'Peritonealkarzinose', en: 'Peritoneal carcinomatosis', fa: 'کارسینوماتوز پریتوئن' } }] },
  { fachId: 'technik', kapitelId: 'technik-onkologie', title: { de: 'Onkologische Verlaufsmessung', en: 'Oncological response measurement', fa: 'اندازه‌گیری پاسخ انکولوژیک' }, topics: [{ id: 'recist-1-1', title: { de: 'RECIST 1.1', en: 'RECIST 1.1', fa: 'RECIST 1.1' } }] },
  { fachId: 'abdomen', kapitelId: 'abdomen-retroperitoneum', title: { de: 'Retroperitoneum', en: 'Retroperitoneum', fa: 'رتروپریتوئن' }, topics: [{ id: 'morbus-ormond', title: { de: 'Morbus Ormond', en: 'Ormond disease', fa: 'بیماری اورموند' } }] },
  { fachId: 'gehirn', kapitelId: 'kopf-tumoren', title: { de: 'Hirntumoren', en: 'Brain tumours', fa: 'تومورهای مغزی' }, topics: [{ id: 'meningeom', title: { de: 'Meningeom', en: 'Meningioma', fa: 'مننژیوم' } }, { id: 'medulloblastom', title: { de: 'Medulloblastom', en: 'Medulloblastoma', fa: 'مدولوبلاستوم' } }, { id: 'lymphom-zns', title: { de: 'Primäres ZNS-Lymphom', en: 'Primary CNS lymphoma', fa: 'لنفوم اولیه سیستم عصبی مرکزی' } }, { id: 'metastasen-meningeosis', title: { de: 'Hirnmetastasen · parenchymal', en: 'Brain metastases · parenchymal', fa: 'متاستاز مغزی پارانشیمی' } }, { id: 'kolloidzyste', title: { de: 'Kolloidzyste', en: 'Colloid cyst', fa: 'کیست کلوئید' } }] },
  { fachId: 'thorax', kapitelId: 'thorax-lunge', title: { de: 'Lungenparenchymerkrankungen', en: 'Pulmonary parenchymal diseases', fa: 'بیماری‌های پارانشیم ریه' }, topics: [{ id: 'uip-ipf', title: { de: 'UIP / IPF', en: 'UIP / IPF', fa: 'UIP / IPF' } }, { id: 'lungenoedem', title: { de: 'Lungenödem · HRCT', en: 'Pulmonary oedema · HRCT', fa: 'ادم ریه · HRCT' } }] },
  { fachId: 'thorax', kapitelId: 'thorax-atemwege', title: { de: 'Atemwegserkrankungen', en: 'Airway diseases', fa: 'بیماری‌های راه‌های هوایی' }, topics: [{ id: 'bronchiektasen', title: { de: 'Bronchiektasen', en: 'Bronchiectasis', fa: 'برونشکتازی' } }] },
  { fachId: 'msk', kapitelId: 'msk-knochennekrosen', title: { de: 'Knochennekrosen', en: 'Bone necrosis', fa: 'نکروزهای استخوانی' }, topics: [{ id: 'knocheninfarkt', title: { de: 'Knocheninfarkt', en: 'Bone infarct', fa: 'انفارکت استخوان' } }] },
  { fachId: 'msk', kapitelId: 'msk-knochentumoren', title: { de: 'Tumorähnliche Läsionen', en: 'Tumour-like lesions', fa: 'ضایعات شبه‌توموری' }, topics: [{ id: 'eosinophiles-granulom', title: { de: 'Langerhans-Zell-Histiozytose des Knochens', en: 'Osseous Langerhans cell histiocytosis', fa: 'هیستیوسیتوز سلول لانگرهانس در استخوان' } }] },
  ...ABDOMEN_THORAX_REGISTERED_TOPIC_GROUPS,
  PULMONARY_HYPERTENSION_TOPIC_GROUP,
  LIVER_VESSELS_TOPIC_GROUP,
  { fachId: 'wirbelsaeule', kapitelId: 'ws-entzuendlich', title: { de: 'Entzündliche Erkrankungen', en: 'Inflammatory diseases', fa: 'بیماری‌های التهابی' }, topics: [
    { id: 'spondylodiszitis', title: { de: 'Spondylodiszitis', en: 'Spondylodiscitis', fa: 'اسپوندیلودی‌سکیت' } },
    { id: 'morbus-bechterew-ws', title: { de: 'Morbus Bechterew', en: 'Ankylosing spondylitis', fa: 'اسپوندیلیت آنکیلوزان' } },
  ] },
  {
    fachId: 'msk', kapitelId: 'msk-knochentumoren',
    title: { de: 'Knochentumoren', en: 'Bone tumours', fa: 'تومورهای استخوان' },
    topics: [{ id: 'knochentumor-grundlagen', title: { de: 'Grundlagen & Klassifikation', en: 'Fundamentals & classification', fa: 'مبانی و طبقه‌بندی' } }],
  },
  {
    fachId: 'gehirn', kapitelId: 'kopf-kopfschmerz',
    title: { de: '9. Kopfschmerz & Migräne', en: '9. Headache & Migraine', fa: '۹. سردرد و میگرن' },
    topics: [{ id: 'migraene', title: { de: 'Migräne', en: 'Migraine', fa: 'میگرن' } }],
  },
  { fachId: 'thorax', kapitelId: 'thorax-tumoren', title: { de: 'Lungentumoren', en: 'Lung tumours', fa: 'تومورهای ریه' }, topics: [{ id: 'fleischner-kriterien', title: { de: 'Fleischner-Kriterien', en: 'Fleischner criteria', fa: 'معیارهای Fleischner' } }] },
  LUNG_CARCINOMA_TOPIC_GROUP,
  {
    fachId: 'thorax',
    kapitelId: 'thorax-kardio',
    title: { de: 'Herz / Kardio-MRT', en: 'Heart / Cardiac MRI', fa: 'قلب / MRI قلب' },
    topics: [
      { id: 'myokardinfarkt-differentialdiagnosen', title: { de: 'Kardio-MRT bei Troponinanstieg', en: 'Cardiac MRI in troponin elevation', fa: 'MRI قلب در افزایش تروپونین' } },
      { id: 'kardiomyopathien', title: { de: 'Kardiomyopathien: Kardio-MRT', en: 'Cardiomyopathies: cardiac MRI', fa: 'کاردیومیوپاتی‌ها: MRI قلب' } },
      { id: 'arvc', title: { de: 'Arrhythmogene Kardiomyopathie', en: 'Arrhythmogenic cardiomyopathy', fa: 'کاردیومیوپاتی آریتموژنیک' } },
    ],
  },
  {
    fachId: 'mamma',
    kapitelId: 'mamma-bildgebung',
    title: { de: 'Bildgebung', en: 'Imaging', fa: 'تصویربرداری' },
    topics: [
      { id: 'mamma-mrt-basics', title: { de: 'Mamma-MRT: Basics', en: 'Breast MRI: Basics', fa: 'MRI پستان: مبانی' } },
      { id: 'mamma-mrt-laesionscharakterisierung', title: { de: 'Mamma-MRT: Läsionscharakterisierung', en: 'Breast MRI: Lesion Characterisation', fa: 'MRI پستان: ارزیابی ضایعه' } },
      { id: 'mamma-mrt-kaiser-score', title: { de: 'Mamma-MRT: Kaiser Score', en: 'Breast MRI: Kaiser Score', fa: "MRI پستان: امتیاز کایزر" } },
      { id: 'mamma-mrt-besondere-mammakarzinome', title: { de: 'Mamma-MRT: besondere Mammakarzinome', en: 'Breast MRI: special carcinoma subtypes', fa: 'MRI پستان: انواع خاص کارسینوم پستان' } },
      { id: 'mammographie-grundlagen', title: { de: 'Mammographie: Grundlagen der Befundung', en: 'Mammography: Reporting Fundamentals', fa: 'ماموگرافی: مبانی گزارش‌نویسی' } },
      { id: 'mammographie-mikrokalk', title: { de: 'Mammographie: Verkalkungen', en: 'Mammography: Calcifications', fa: 'ماموگرافی: کلسیفیکاسیون‌ها' } },
    ],
  },
  {
    fachId: 'thorax',
    kapitelId: 'thorax-grundlagen',
    title: { de: '2. Grundlagen der Thoraxbildgebung', en: '2. Fundamentals of Thoracic Imaging', fa: '۲. مبانی تصویربرداری قفسه سینه' },
    topics: [
      { id: 'hrct-dichteanhebung', title: { de: 'HRCT: Dichteanhebung', en: 'HRCT: Increased Density', fa: 'HRCT: افزایش دانسیته' } },
      { id: 'hrct-retikulaer-nodulaer', title: { de: 'HRCT: Retikulär & Nodulär', en: 'HRCT: Reticular & Nodular', fa: 'HRCT: رتیکولار و ندولار' } },
      { id: 'hrct-architekturmuster', title: { de: 'HRCT: Architekturmuster', en: 'HRCT: Architectural Patterns', fa: 'HRCT: الگوهای معماری' } },
      { id: 'hrct-dichteminderung', title: { de: 'HRCT: Dichteminderung', en: 'HRCT: Decreased Density', fa: 'HRCT: کاهش دانسیته' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-anatomie',
    title: { de: '1. Anatomie & Normalvarianten', en: '1. Anatomy & Normal Variants', fa: '۱. آناتومی و واریانت‌های طبیعی' },
    topics: [
      { id: 'liquorraeume-ventrikelsystem', title: { de: 'Liquorräume / Ventrikelsystem', en: 'CSF spaces / ventricular system', fa: 'فضاهای مایع مغزی‌نخاعی / سیستم بطنی' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-vaskulaer',
    title: { de: '2. Vaskuläre Erkrankungen', en: '2. Vascular Diseases', fa: '۲. بیماری‌های عروقی' },
    topics: [
      { id: 'ischaemischer-schlaganfall', title: { de: 'Ischämischer Schlaganfall', en: 'Ischaemic Stroke', fa: 'سکته مغزی ایسکمیک' } },
      { id: 'intrazerebrale-blutung', title: { de: 'Intrazerebrale Blutung', en: 'Intracerebral Haemorrhage', fa: 'خونریزی داخل مغزی' } },
      { id: 'subarachnoidalblutung', title: { de: 'Subarachnoidalblutung', en: 'Subarachnoid haemorrhage', fa: 'خونریزی ساب‌آراکنوئید' } },
      { id: 'subdurale-blutung', title: { de: 'Subduralhämatom', en: 'Subdural haematoma', fa: 'هماتوم ساب‌دورال' } },
      { id: 'gefaessdissektion-hirn', title: { de: 'Dissektion hirnversorgender Gefäße', en: 'Cervicocephalic arterial dissection', fa: 'دیسکشن عروق مغزی و گردنی' } },
      { id: 'hypertensive-mikroangiopathie', title: { de: 'Hypertensive Mikroangiopathie', en: 'Hypertensive microangiopathy', fa: 'میکروآنژیوپاتی هیپرتانسیو' } },
      { id: 'caa', title: { de: 'Zerebrale Amyloidangiopathie', en: 'Cerebral amyloid angiopathy', fa: 'آنژیوپاتی آمیلوئید مغزی' } },
      { id: 'moya-moya', title: { de: 'Moyamoya-Erkrankung', en: 'Moyamoya disease', fa: 'بیماری مویامویا' } },
      { id: 'hypoxisch-ischaemische-hirnschaedigung', title: { de: 'Hypoxisch-ischämische Hirnschädigung', en: 'Hypoxic-ischaemic brain injury', fa: 'آسیب مغزی هیپوکسیک-ایسکمیک' } },
      { id: 'cadasil', title: { de: 'CADASIL', en: 'CADASIL', fa: 'CADASIL' } },
      { id: 'dva', title: { de: 'Developmental Venous Anomaly', en: 'Developmental Venous Anomaly', fa: 'آنومالی وریدی تکاملی' } },
      { id: 'kavernom', title: { de: 'Kavernom', en: 'Cavernoma', fa: 'کاورنوم' } },
      { id: 'kapillaere-teleangiektasie', title: { de: 'Kapilläre Teleangiektasie', en: 'Capillary telangiectasia', fa: 'تلانژکتازی مویرگی' } },
      { id: 'sinusvenenthrombose', title: { de: 'Sinus- und Hirnvenenthrombose', en: 'Cerebral venous thrombosis', fa: 'ترومبوز سینوس و وریدهای مغزی' } },
      { id: 'davf', title: { de: 'Durale AV-Fistel (dAVF)', en: 'Dural Arteriovenous Fistula (dAVF)', fa: 'فیستول دورال AV (dAVF)' } },
      { id: 'avm-zns', title: { de: 'Arteriovenöse Malformation (AVM)', en: 'Arteriovenous Malformation (AVM)', fa: 'مالفورماسیون شریانی-وریدی (AVM)' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-liquor',
    title: { de: '7. Liquorzirkulationsstörungen & intrakranieller Druck', en: '7. CSF Circulation Disorders & Intracranial Pressure', fa: '۷. اختلالات گردش مایع مغزی‌نخاعی و فشار داخل جمجمه' },
    topics: [
      { id: 'normaldruckhydrozephalus', title: { de: 'Normaldruckhydrozephalus', en: 'Normal pressure hydrocephalus', fa: 'هیدروسفالی فشار طبیعی' } },
    ],
  },
  {
    fachId: 'gehirn',
    kapitelId: 'kopf-trauma',
    title: { de: '8. Trauma', en: '8. Trauma', fa: '۸. تروما' },
    topics: [
      { id: 'epidurale-blutung', title: { de: 'Epiduralhämatom', en: 'Epidural haematoma', fa: 'هماتوم اپیدورال' } },
    ],
  },
  {
    fachId: 'technik',
    kapitelId: 'technik-kontrastmittel',
    title: { de: '9. Kontrastmittel', en: '9. Contrast Media', fa: '۹. مواد حاجب' },
    topics: CONTRAST_TOPICS.map(({ id, title }) => ({ id, title })),
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-trauma',
    title: { de: '10. Traumatologie & Frakturen', en: '10. Trauma & Fractures', fa: '۱۰. تروما و شکستگی‌ها' },
    topics: [
      { id: 'frakturbeschreibung', title: { de: 'Frakturbeschreibung', en: 'Fracture description', fa: 'توصیف شکستگی' } },
      { id: 'stressfrakturen', title: { de: 'Stressfrakturen', en: 'Stress fractures', fa: 'شکستگی‌های استرسی' } },
      { id: 'frakturen-kindesalter', title: { de: 'Frakturen im Kindesalter', en: 'Paediatric Fractures', fa: 'شکستگی‌های دوران کودکی' } },
      { id: 'ak-luxation', title: { de: 'Akromioklavikuläre Luxation', en: 'AC Joint Dislocation', fa: 'لوکساسیون مفصل AC' } },
      { id: 'radiuskoepfchenfraktur', title: { de: 'Radiusköpfchenfraktur', en: 'Radial Head Fracture', fa: 'شکستگی سر رادیوس' } },
      { id: 'unterarmschaftfrakturen', title: { de: 'Unterarmschaftfrakturen', en: 'Forearm Shaft Fractures', fa: 'شکستگی‌های تنه ساعد' } },
      { id: 'distale-radiusfraktur', title: { de: 'Distale Radiusfraktur', en: 'Distal Radius Fracture', fa: 'شکستگی دیستال رادیوس' } },
    ],
  },
  {
    fachId: 'wirbelsaeule',
    kapitelId: 'wirbelsaeule-trauma',
    title: { de: '6. Trauma', en: '6. Trauma', fa: '۶. تروما' },
    topics: [
      { id: 'kraniozervikaler-uebergang-trauma', title: { de: 'Kraniozervikaler Übergang', en: 'Craniocervical Junction', fa: 'محل اتصال کرانیوسرویکال' } },
      { id: 'hws-verletzungen', title: { de: 'HWS-Verletzungen', en: 'Cervical Spine Injuries', fa: 'آسیب‌های ستون فقرات گردنی' } },
      { id: 'bws-lws-frakturen', title: { de: 'BWS / LWS-Frakturen', en: 'Thoracic / Lumbar Spine Fractures', fa: 'شکستگی ستون فقرات توراسیک / کمری' } },
    ],
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-knie',
    title: { de: '15. Knie', en: '15. Knee', fa: '۱۵. زانو' },
    topics: [
      { id: 'meniskus', title: { de: 'Meniskus', en: 'Meniscus', fa: 'منیسک' } },
      { id: 'kreuzbaender', title: { de: 'Knie-Ligamente', en: 'Knee ligaments', fa: 'رباط‌های زانو' } },
    ],
  },
  {
    fachId: 'msk',
    kapitelId: 'msk-schulter',
    title: { de: '11. Schulter', en: '11. Shoulder', fa: '۱۱. شانه' },
    topics: [
      { id: 'rotatorenmanschette', title: { de: 'Rotatorenmanschette', en: 'Rotator Cuff', fa: 'روتاتور کاف' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-leber',
    title: { de: 'Leber', en: 'Liver', fa: 'کبد' },
    topics: [
      { id: 'haemangiom', title: { de: 'Leberhämangiom', en: 'Liver haemangioma', fa: 'همانژیوم کبد' } },
      { id: 'fnh', title: { de: 'FNH', en: 'FNH', fa: 'FNH' } },
      { id: 'hcc', title: { de: 'HCC', en: 'HCC', fa: 'HCC' } },
      { id: 'avm', title: { de: 'AVM der Leber', en: 'Hepatic AVM', fa: 'AVM کبد' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-pankreas',
    title: { de: 'Pankreas', en: 'Pancreas', fa: 'پانکراس' },
    topics: [
      { id: 'pankreatitis', title: { de: 'Pankreatitis', en: 'Pancreatitis', fa: 'پانکراتیت' } },
    ],
  },
  {
    fachId: 'abdomen',
    kapitelId: 'abdomen-gi-trakt',
    title: { de: 'Gastrointestinaltrakt', en: 'Gastrointestinal tract', fa: 'دستگاه گوارش' },
    topics: [
      { id: 'divertikulitis', title: { de: 'Divertikulitis', en: 'Diverticulitis', fa: 'دیورتیکولیت' } },
    ],
  },
  {
    fachId: 'thorax',
    kapitelId: 'thorax-lunge',
    title: { de: 'Lunge', en: 'Lung', fa: 'ریه' },
    topics: [
      { id: 'sarkoidose', title: { de: 'Sarkoidose', en: 'Sarcoidosis', fa: 'سارکوئیدوز' } },
    ],
  },
]

const registeredQualityTopics = new Set(MCQ_TOPIC_GROUPS.flatMap(group => group.topics.map(topic => topic.id)))
for (const topic of qualityTopics) {
  if (registeredQualityTopics.has(topic.id)) continue
  MCQ_TOPIC_GROUPS.push({ fachId: topic.subject, kapitelId: `${topic.subject}-clinical-review`, title: topic.title, topics: [{ id: topic.id, title: topic.title }] })
  registeredQualityTopics.add(topic.id)
}

export function getAvailableQuestionTopicIds() {
  const tags = new Set(QUESTION_BANK.de.flatMap(question => question.tags))
  return new Set(
    MCQ_TOPIC_GROUPS.flatMap(group => group.topics)
      .map(topic => topic.id)
      .filter(topicId => tags.has(topicId))
  )
}

// Persisted answers refer to option IDs. A substantive stem/option/key revision
// must start a fresh quiz session instead of regrading an old answer silently.
export function getQuestionSetVersion(topicIds = [], canonicalIds = []) {
  return selectedAssessmentVersion(assessmentVersionRecords(QUESTION_BANK), topicIds, canonicalIds)
}

export function getQuestionSetRevision(topicIds = [], canonicalIds = []) {
  const current=getQuestionSetVersion(topicIds, canonicalIds)
  const legacy=selectedAssessmentVersion(legacySessionBaseline.records, topicIds, canonicalIds)
  // Unchanged selections retain their exact v2 key and option-shuffle seed.
  return current===legacy ? null : current
}

export function countQuestions(themenIds) {
  const selected = new Set(themenIds)
  return QUESTION_BANK.de.filter(question => question.tags.some(tag => selected.has(tag))).length
}

export function getQuestions(themenIds, lang, n) {
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  const tagSet = new Set(themenIds)
  const filtered = all.filter(q => q.tags.some(t => tagSet.has(t)))
  const shuffled = [...filtered]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, n)
}

export function getQuestionsByIds(questionIds, lang) {
  const wanted = new Set(questionIds)
  const all = QUESTION_BANK[lang] || QUESTION_BANK.de
  return all.filter(question => wanted.has(question.id))
}

// Returns a shuffled list of question IDs for the given topics (language-independent).
export function shuffleQuestionIds(themenIds, n) {
  const all = QUESTION_BANK.de
  const tagSet = new Set(themenIds)
  const ids = all.filter(q => q.tags.some(t => tagSet.has(t))).map(q => q.id)
  for (let i = ids.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [ids[i], ids[j]] = [ids[j], ids[i]]
  }
  return ids.slice(0, n)
}

// Returns questions in the exact order of `deIds` for the given language.
// deIds are IDs from QUESTION_BANK.de (e.g. "divertikulitis-de-1").
// Locale tokens may occur inside the ID or at its end; retain existing saved IDs.
// Falls back to the DE question if no translation exists.
export function getQuestionsForIds(deIds, lang) {
  if (lang === 'de') {
    const byId = new Map(QUESTION_BANK.de.map(q => [q.id, q]))
    return deIds.map(id => byId.get(id)).filter(Boolean)
  }
  const targetBank = new Map((QUESTION_BANK[lang] || []).map(q => [canonicalAssessmentId(q.id), q]))
  const deBank = new Map(QUESTION_BANK.de.map(q => [q.id, q]))
  return deIds.map(deId => {
    return targetBank.get(deId) || deBank.get(deId)
  }).filter(Boolean)
}
