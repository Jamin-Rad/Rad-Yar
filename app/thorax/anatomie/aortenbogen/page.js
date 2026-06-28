'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/providers/LanguageProvider'
import { useLessonReadStatus } from '@/hooks/useLessonReadStatus'
import { useMobileLearningLayout } from '@/hooks/useMobileLearningLayout'
import InProgressBanner from '@/components/InProgressBanner'
import styles from './page.module.css'

const L = (de, en, fa) => ({ de, en, fa })

const UI = {
  de: {
    toc: 'Inhaltsverzeichnis',
    sourceLabel: 'Dr. Zia',
    breadcrumbThorax: 'Thorax',
    breadcrumbChapter: 'Anatomie',
    back: 'Thorax',
    keyLabel: 'Merke',
    caveLabel: 'CAVE',
    mark: 'Als gelesen markieren',
    read: 'Als gelesen markiert',
    error: 'Bitte melde dich an, um deinen Lernfortschritt zu speichern.',
    signIn: 'Anmelden',
  },
  en: {
    toc: 'Contents',
    sourceLabel: 'Dr. Zia',
    breadcrumbThorax: 'Thorax',
    breadcrumbChapter: 'Anatomy',
    back: 'Thorax',
    keyLabel: 'Key point',
    caveLabel: 'Caution',
    mark: 'Mark as read',
    read: 'Marked as read',
    error: 'Please sign in to save your learning progress.',
    signIn: 'Sign in',
  },
  fa: {
    toc: 'فهرست مطالب',
    sourceLabel: 'Dr. Zia',
    breadcrumbThorax: 'قفسه سینه',
    breadcrumbChapter: 'آناتومی',
    back: 'قفسه سینه',
    keyLabel: 'نکته مهم',
    caveLabel: 'احتیاط',
    mark: 'علامت گذاری به عنوان خوانده شده',
    read: 'خوانده شده',
    error: 'برای ذخیره پیشرفت لطفا وارد شوید.',
    signIn: 'ورود',
  },
}

const LESSON = {
  route: '/thorax/anatomie/aortenbogen',
  title: L('Aortenbogen', 'Aortic arch', 'قوس آئورت'),
  subtitle: L(
    'Normale Anatomie, Abgangsmuster und wichtige Normvarianten sicher in CT und MRT erkennen.',
    'Normal anatomy, branching patterns and key variants in CT and MRI.',
    'شناخت آناتومی طبیعی، الگوی شاخه ها و واریانت های مهم در CT و MRI.'
  ),
  heroCards: [
    {
      value: L('3', '3', '۳'),
      label: L('klassische Abgänge', 'classic branches', 'شاخه کلاسیک'),
      text: L('Truncus brachiocephalicus, linke Karotis, linke Subclavia', 'Brachiocephalic trunk, left common carotid, left subclavian', 'تنه براکیوسفالیک، کاروتید مشترک چپ، ساب کلاوین چپ'),
    },
    {
      value: L('links', 'left', 'چپ'),
      label: L('typische Bogenlage', 'usual arch side', 'محل معمول قوس'),
      text: L('Aorta descendens links paravertebral', 'Descending aorta left paravertebral', 'آئورت نزولی در سمت چپ کنار مهره'),
    },
    {
      value: L('CTA', 'CTA', 'CTA'),
      label: L('beste Übersicht', 'best overview', 'نمای کلی بهتر'),
      text: L('Ostien, Wand, Ringbildung und Kompression', 'Ostia, wall, ring formation and compression', 'اوریفیس ها، دیواره، حلقه عروقی و فشار'),
    },
  ],
  sections: [
    { id: 'normal', label: L('Normalanatomie', 'Normal anatomy', 'آناتومی طبیعی') },
    { id: 'abgaenge', label: L('Abgänge', 'Branches', 'شاخه ها') },
    { id: 'varianten', label: L('Normvarianten', 'Variants', 'واریانت ها') },
    { id: 'ringe', label: L('Vaskuläre Ringe', 'Vascular rings', 'حلقه های عروقی') },
    { id: 'bildgebung', label: L('Bildgebung', 'Imaging', 'تصویربرداری') },
    { id: 'befundung', label: L('Befundung', 'Reporting', 'گزارش') },
    { id: 'fallstricke', label: L('Fallstricke', 'Pitfalls', 'دام ها') },
    { id: 'takehome', label: L('Take home', 'Take home', 'جمع بندی') },
  ],
  normal: {
    title: L('Normalanatomie des Aortenbogens', 'Normal anatomy of the aortic arch', 'آناتومی طبیعی قوس آئورت'),
    lead: L(
      'Der normale Aortenbogen ist linksseitig, zieht über den linken Hauptbronchus und geht links paravertebral in die Aorta descendens über. In der Routine zählen Seitenlage, Abgangsmuster und Beziehung zu Trachea und Ösophagus.',
      'The normal arch is left-sided, passes over the left main bronchus and continues as the left paravertebral descending aorta. Routine assessment focuses on side, branching pattern and relationship to the trachea and oesophagus.',
      'قوس طبیعی معمولا چپ است، از روی برونش اصلی چپ عبور می کند و به آئورت نزولی چپ پاراورتبرال تبدیل می شود. در گزارش روتین، سمت قوس، الگوی شاخه ها و ارتباط با تراشه و مری مهم است.'
    ),
    headers: [
      L('Merkmal', 'Feature', 'ویژگی'),
      L('Normalbefund', 'Normal finding', 'یافته طبیعی'),
      L('Radiologischer Hinweis', 'Radiological note', 'نکته رادیولوژی'),
    ],
    rows: [
      [
        L('Seitenlage', 'Side', 'سمت'),
        L('Linksseitiger Bogen mit links paravertebraler Aorta descendens.', 'Left-sided arch with a left paravertebral descending aorta.', 'قوس چپ با آئورت نزولی چپ پاراورتبرال.'),
        L('Axiale Serien zeigen die Seitenlage oft schneller als MIP-Bilder.', 'Axial images often show the side faster than MIPs.', 'تصاویر آکسیال معمولا سمت قوس را سریع تر از MIP نشان می دهند.'),
      ],
      [
        L('Abgangsreihenfolge', 'Branch order', 'ترتیب شاخه ها'),
        L('Truncus brachiocephalicus, A. carotis communis links, A. subclavia links.', 'Brachiocephalic trunk, left common carotid, left subclavian.', 'تنه براکیوسفالیک، کاروتید مشترک چپ، ساب کلاوین چپ.'),
        L('Bei Varianten immer Ursprung und Verlauf benennen.', 'For variants, name both origin and course.', 'در واریانت ها هم منشا و هم مسیر را بنویسید.'),
      ],
      [
        L('Topographie', 'Topography', 'توپوگرافی'),
        L('Bogen links der Trachea, über linkem Hauptbronchus, ventral des Ösophagus.', 'Arch left of the trachea, over the left main bronchus, anterior to the oesophagus.', 'قوس در سمت چپ تراشه، روی برونش اصلی چپ و قدام مری.'),
        L('Kompression von Trachea oder Ösophagus aktiv suchen.', 'Actively look for tracheal or oesophageal compression.', 'فشار روی تراشه یا مری را فعالانه جستجو کنید.'),
      ],
    ],
    key: L(
      'Normal ist nicht nur „linksseitig“: Der Befund sollte Seitenlage, drei Abgänge und unauffällige Beziehung zu Trachea/Ösophagus abdecken.',
      'Normal is not just “left-sided”: the report should cover arch side, three branches and an unremarkable relationship to the trachea/oesophagus.',
      'طبیعی فقط به معنی چپ بودن نیست؛ گزارش باید سمت قوس، سه شاخه و عدم فشار روی تراشه/مری را پوشش دهد.'
    ),
  },
  branches: {
    title: L('Supraaortale Abgänge lesen', 'Reading supra-aortic branches', 'خواندن شاخه های سوپرا آئورتیک'),
    lead: L(
      'Die wichtigste Routinefrage ist, ob ein klassisches Drei-Gefäß-Muster vorliegt oder ob ein gemeinsames Ostium, ein zusätzlicher Abgang oder eine aberrante Subclavia vorhanden ist.',
      'The key routine question is whether there is a classic three-vessel pattern or a common ostium, an additional branch or an aberrant subclavian artery.',
      'سوال اصلی این است که الگوی سه شاخه کلاسیک وجود دارد یا منشا مشترک، شاخه اضافی یا ساب کلاوین نابجا دیده می شود.'
    ),
    items: [
      {
        title: L('Klassisches Muster', 'Classic pattern', 'الگوی کلاسیک'),
        text: L('Drei getrennte Abgänge: Truncus brachiocephalicus, linke A. carotis communis, linke A. subclavia.', 'Three separate branches: brachiocephalic trunk, left common carotid and left subclavian artery.', 'سه شاخه جداگانه: تنه براکیوسفالیک، کاروتید مشترک چپ و ساب کلاوین چپ.'),
      },
      {
        title: L('Gemeinsames Ostium', 'Common ostium', 'اوریفیس مشترک'),
        text: L('Gemeinsamer Ursprung von Truncus brachiocephalicus und linker Karotis; häufige Variante und relevant für Katheterzugang.', 'Common origin of the brachiocephalic trunk and left carotid; common variant relevant for catheter access.', 'منشا مشترک تنه براکیوسفالیک و کاروتید چپ؛ واریانت شایع و مهم برای کاتتر.'),
      },
      {
        title: L('Direkte linke Vertebralis', 'Direct left vertebral artery', 'ورتبرال چپ مستقیم'),
        text: L('Zusätzlicher Abgang meist zwischen linker Karotis und linker Subclavia; Verlauf bis zum Foramen transversarium verfolgen.', 'Additional branch usually between the left carotid and left subclavian; trace it to the transverse foramen.', 'شاخه اضافی معمولا بین کاروتید چپ و ساب کلاوین چپ؛ مسیر آن را تا فورامن ترانسورس دنبال کنید.'),
      },
    ],
  },
  variants: {
    title: L('Wichtige Normvarianten', 'Key normal variants', 'واریانت های مهم'),
    lead: L(
      'Viele Aortenbogenvarianten sind Zufallsbefunde. Klinisch wichtig werden sie bei vaskulärem Ring, Kommerell-Divertikel, aneurysmatischer Erweiterung oder Interventionsplanung.',
      'Many arch variants are incidental. They become clinically important with a vascular ring, Kommerell diverticulum, aneurysmal dilatation or procedural planning.',
      'بسیاری از واریانت ها اتفاقی هستند. اهمیت بالینی زمانی است که حلقه عروقی، دیورتیکول کومرل، اتساع آنوریسمال یا برنامه ریزی مداخله وجود دارد.'
    ),
    headers: [
      L('Variante', 'Variant', 'واریانت'),
      L('Typisches Bild', 'Typical imaging appearance', 'ظاهر تیپیک'),
      L('Warum wichtig?', 'Why it matters', 'اهمیت'),
    ],
    rows: [
      [
        L('Gemeinsamer Ursprung TBC + LCCA', 'Common origin BCT + LCCA', 'منشا مشترک BCT و LCCA'),
        L('Zwei statt drei Ostien; linker Karotisabgang aus gemeinsamem Ursprung.', 'Two rather than three ostia; left carotid from a common origin.', 'دو اوریفیس به جای سه؛ کاروتید چپ از منشا مشترک.'),
        L('Katheterangiographie, OP-Planung, Stentgraft-Landezonen.', 'Catheter angiography, surgical planning, stent-graft landing zones.', 'آنژیوگرافی، برنامه جراحی، محل لندینگ استنت گرافت.'),
      ],
      [
        L('Linke Vertebralis aus dem Bogen', 'Left vertebral artery from the arch', 'ورتبرال چپ از قوس'),
        L('Separater kleiner Abgang zwischen LCCA und LSA.', 'Separate small branch between LCCA and LSA.', 'شاخه کوچک جدا بین LCCA و LSA.'),
        L('Nicht als Kollaterale oder Pathologie fehlinterpretieren.', 'Do not misread it as a collateral or pathology.', 'با کولترال یا پاتولوژی اشتباه نشود.'),
      ],
      [
        L('Aberrante rechte Subclavia', 'Aberrant right subclavian artery', 'ساب کلاوین راست نابجا'),
        L('Letzter Abgang distal der linken Subclavia, meist retroösophagealer Verlauf nach rechts.', 'Last branch distal to the left subclavian, usually retro-oesophageal to the right.', 'آخرین شاخه پس از ساب کلاوین چپ، معمولا پشت مری به سمت راست.'),
        L('Dysphagia lusoria, Kommerell-Divertikel und OP-Zugänge beachten.', 'Consider dysphagia lusoria, Kommerell diverticulum and surgical access.', 'دیسفاژی لوسوریا، دیورتیکول کومرل و مسیر جراحی مهم است.'),
      ],
      [
        L('Rechter Aortenbogen', 'Right aortic arch', 'قوس آئورت راست'),
        L('Bogen und Aorta descendens rechts; Spiegelbild oder aberrante linke Subclavia möglich.', 'Arch and descending aorta on the right; mirror-image branching or aberrant left subclavian possible.', 'قوس و آئورت نزولی در راست؛ می تواند آینه ای یا با ساب کلاوین چپ نابجا باشد.'),
        L('Mit aberranter linker Subclavia und Ligamentum arteriosum kann ein Ring entstehen.', 'With aberrant left subclavian and ligamentum arteriosum a ring may form.', 'با ساب کلاوین چپ نابجا و لیگامان شریانی ممکن است حلقه ایجاد شود.'),
      ],
      [
        L('Doppelter Aortenbogen', 'Double aortic arch', 'قوس آئورت دوتایی'),
        L('Rechter und linker Bogen umschließen Trachea und Ösophagus.', 'Right and left arches encircle the trachea and oesophagus.', 'قوس راست و چپ تراشه و مری را احاطه می کنند.'),
        L('Kompletter vaskulärer Ring; Kompression aktiv beschreiben.', 'Complete vascular ring; actively report compression.', 'حلقه عروقی کامل؛ فشار را حتما گزارش کنید.'),
      ],
    ],
  },
  rings: {
    title: L('Vaskuläre Ringe und Kompression', 'Vascular rings and compression', 'حلقه عروقی و فشار'),
    lead: L(
      'Nicht jede Variante ist ein Problem. Entscheidend ist, ob Trachea und Ösophagus von Gefäßen oder Ligamentanteilen eingeengt werden.',
      'Not every variant is a problem. The decisive point is whether vessels or ligamentous components narrow the trachea and oesophagus.',
      'هر واریانت مشکل ساز نیست. نکته مهم این است که آیا عروق یا لیگامان ها تراشه و مری را تنگ می کنند یا نه.'
    ),
    items: [
      {
        title: L('Doppelter Aortenbogen', 'Double aortic arch', 'قوس دوتایی'),
        text: L('Klassischer kompletter Ring. Dominanz des rechten oder linken Bogens und Einengung von Trachea/Ösophagus beschreiben.', 'Classic complete ring. Report dominant arch and narrowing of the trachea/oesophagus.', 'حلقه کامل کلاسیک. قوس غالب و تنگی تراشه/مری را گزارش کنید.'),
      },
      {
        title: L('Rechter Bogen mit aberranter linker Subclavia', 'Right arch with aberrant left subclavian', 'قوس راست با ساب کلاوین چپ نابجا'),
        text: L('Kann mit linksseitigem Ligamentum arteriosum einen Ring bilden; Kommerell-Divertikel suchen.', 'May form a ring with a left ligamentum arteriosum; look for Kommerell diverticulum.', 'ممکن است با لیگامان شریانی چپ حلقه بسازد؛ دیورتیکول کومرل را جستجو کنید.'),
      },
      {
        title: L('Aberrante rechte Subclavia', 'Aberrant right subclavian', 'ساب کلاوین راست نابجا'),
        text: L('Meist asymptomatisch, aber retroösophagealer Verlauf kann Ösophaguskompression erklären.', 'Usually asymptomatic, but the retro-oesophageal course can explain oesophageal compression.', 'اغلب بدون علامت است اما مسیر پشت مری می تواند فشار روی مری را توضیح دهد.'),
      },
    ],
    cave: L(
      'Bei Kindern und bei Dysphagie, Stridor oder rezidivierenden Atemwegsproblemen muss die Beziehung zu Trachea und Ösophagus ausdrücklich im Befund stehen.',
      'In children and in dysphagia, stridor or recurrent airway symptoms, the relationship to the trachea and oesophagus must be stated explicitly.',
      'در کودکان و در دیسفاژی، استریدور یا علائم مکرر راه هوایی، ارتباط با تراشه و مری باید صریحا در گزارش نوشته شود.'
    ),
  },
  imaging: {
    title: L('Bildgebung: CT, MRT und Rekonstruktionen', 'Imaging: CT, MRI and reconstructions', 'تصویربرداری: CT، MRI و بازسازی ها'),
    lead: L(
      'Die Diagnose entsteht aus axialen Bildern plus MIP/VR-Rekonstruktionen. Axialbilder bleiben entscheidend für Kompression, Wandpathologie und die Beziehung zu Trachea und Ösophagus.',
      'Diagnosis combines axial images with MIP/VR reconstructions. Axial images remain essential for compression, wall pathology and relation to the trachea and oesophagus.',
      'تشخیص از ترکیب تصاویر آکسیال و بازسازی MIP/VR به دست می آید. تصاویر آکسیال برای فشار، پاتولوژی دیواره و ارتباط با تراشه/مری ضروری هستند.'
    ),
    items: [
      {
        title: L('CTA', 'CTA', 'CTA'),
        text: L('Beste Akut- und Planungsmodalität: Ostien, Abgangswinkel, Plaques, Aneurysma, Dissektion und Kommerell-Divertikel.', 'Best acute and planning modality: ostia, branch angles, plaques, aneurysm, dissection and Kommerell diverticulum.', 'بهترین روش برای اورژانس و برنامه ریزی: اوریفیس ها، زاویه شاخه ها، پلاک، آنوریسم، دیسکشن و دیورتیکول کومرل.'),
      },
      {
        title: L('MRT/MRA', 'MRI/MRA', 'MRI/MRA'),
        text: L('Hilfreich bei Kindern, Verlaufskontrollen und komplexen kongenitalen Varianten ohne Strahlenexposition.', 'Useful in children, follow-up and complex congenital variants without radiation.', 'در کودکان، پیگیری و واریانت های مادرزادی پیچیده بدون اشعه مفید است.'),
      },
      {
        title: L('Rekonstruktionen', 'Reconstructions', 'بازسازی ها'),
        text: L('MIP/VR für Übersicht, Curved MPR für Gefäßverlauf, axial für Trachea/Ösophagus und Wand.', 'MIP/VR for overview, curved MPR for vessel course, axial images for trachea/oesophagus and wall.', 'MIP/VR برای نمای کلی، curved MPR برای مسیر عروق، آکسیال برای تراشه/مری و دیواره.'),
      },
    ],
  },
  reporting: {
    title: L('Strukturierter Befund', 'Structured report', 'گزارش ساختارمند'),
    lead: L(
      'Ein guter Befund benennt die Anatomie so, dass interventionelle, chirurgische und klinische Fragen beantwortet werden.',
      'A good report names the anatomy in a way that answers interventional, surgical and clinical questions.',
      'گزارش خوب آناتومی را طوری بیان می کند که سوالات مداخله ای، جراحی و بالینی پاسخ داده شود.'
    ),
    items: [
      {
        title: L('1. Seitenlage', '1. Arch side', '۱. سمت قوس'),
        text: L('Linksseitiger oder rechtsseitiger Aortenbogen; Lage der Aorta descendens.', 'Left- or right-sided arch; side of the descending aorta.', 'قوس چپ یا راست؛ محل آئورت نزولی.'),
      },
      {
        title: L('2. Abgangsmuster', '2. Branching pattern', '۲. الگوی شاخه ها'),
        text: L('Klassische drei Abgänge oder Variante mit Ursprung und Verlauf jedes Gefäßes.', 'Classic three-branch pattern or variant with origin and course of each vessel.', 'سه شاخه کلاسیک یا واریانت با منشا و مسیر هر رگ.'),
      },
      {
        title: L('3. Relevanz', '3. Relevance', '۳. اهمیت'),
        text: L('Kompression, Ringbildung, Kommerell-Divertikel, Aneurysma, Stenose, Plaques oder Dissektion.', 'Compression, ring formation, Kommerell diverticulum, aneurysm, stenosis, plaque or dissection.', 'فشار، حلقه، دیورتیکول کومرل، آنوریسم، تنگی، پلاک یا دیسکشن.'),
      },
      {
        title: L('4. Planung', '4. Planning', '۴. برنامه ریزی'),
        text: L('Bei Interventionen Ostien, Landezonen, Gefäßdurchmesser und Zugangswege erwähnen.', 'For procedures mention ostia, landing zones, vessel diameters and access routes.', 'برای مداخلات اوریفیس ها، لندینگ زون، قطر عروق و مسیر دسترسی را ذکر کنید.'),
      },
    ],
    key: L(
      'Beispiel: Linksseitiger Aortenbogen mit gemeinsamem Ursprung von Truncus brachiocephalicus und linker A. carotis communis; keine Ringbildung, keine Kompression von Trachea oder Ösophagus.',
      'Example: Left-sided aortic arch with common origin of the brachiocephalic trunk and left common carotid artery; no ring formation and no tracheal or oesophageal compression.',
      'مثال: قوس آئورت چپ با منشا مشترک تنه براکیوسفالیک و کاروتید مشترک چپ؛ بدون حلقه و بدون فشار روی تراشه یا مری.'
    ),
  },
  pitfalls: {
    title: L('Fallstricke', 'Pitfalls', 'دام ها'),
    lead: L(
      'Fehler entstehen meist, wenn eine Variante nur benannt, aber ihr Verlauf und ihre klinische Relevanz nicht geprüft werden.',
      'Errors usually occur when a variant is named but its course and clinical relevance are not assessed.',
      'خطا معمولا وقتی رخ می دهد که واریانت فقط نام برده شود اما مسیر و اهمیت بالینی آن بررسی نشود.'
    ),
    items: [
      {
        title: L('„Boviner Bogen“ ungenau', '“Bovine arch” is imprecise', 'اصطلاح bovine دقیق نیست'),
        text: L('Besser: gemeinsamer Ursprung von Truncus brachiocephalicus und linker A. carotis communis.', 'Better: common origin of the brachiocephalic trunk and left common carotid artery.', 'بهتر است نوشته شود: منشا مشترک تنه براکیوسفالیک و کاروتید مشترک چپ.'),
      },
      {
        title: L('Nur VR-Bild ansehen', 'Looking only at VR', 'فقط دیدن VR'),
        text: L('VR zeigt die Übersicht, aber Kompression, Plaque, Wandhämatom und kleine Ostien sieht man besser axial/MPR.', 'VR gives overview, but compression, plaque, wall haematoma and small ostia are better on axial/MPR.', 'VR نمای کلی می دهد اما فشار، پلاک، هماتوم دیواره و اوریفیس کوچک در آکسیال/MPR بهتر دیده می شوند.'),
      },
      {
        title: L('Aberrante Subclavia unterschätzen', 'Underestimating aberrant subclavian artery', 'دست کم گرفتن ساب کلاوین نابجا'),
        text: L('Immer retroösophagealen Verlauf, Ösophaguskompression und Kommerell-Divertikel prüfen.', 'Always assess retro-oesophageal course, oesophageal compression and Kommerell diverticulum.', 'همیشه مسیر پشت مری، فشار روی مری و دیورتیکول کومرل بررسی شود.'),
      },
    ],
  },
  takehome: [
    {
      title: L('Normalmuster sauber kennen', 'Know the normal pattern', 'الگوی طبیعی را دقیق بدانید'),
      text: L('Linksseitiger Bogen mit drei Abgängen ist die Referenz für jede Variante.', 'A left-sided arch with three branches is the reference for every variant.', 'قوس چپ با سه شاخه مرجع مقایسه برای همه واریانت هاست.'),
    },
    {
      title: L('Ursprung und Verlauf beschreiben', 'Describe origin and course', 'منشا و مسیر را بنویسید'),
      text: L('Eine Variante ist nur dann vollständig beschrieben, wenn klar ist, welches Gefäß wo entspringt und wohin es zieht.', 'A variant is complete only when origin and course of the vessel are clear.', 'واریانت زمانی کامل گزارش شده که منشا و مسیر رگ روشن باشد.'),
    },
    {
      title: L('Relevanz aktiv suchen', 'Actively search relevance', 'اهمیت را فعالانه جستجو کنید'),
      text: L('Ringbildung, Kompression, Kommerell-Divertikel, Aneurysma und Interventionsplanung entscheiden über die Bedeutung.', 'Ring formation, compression, Kommerell diverticulum, aneurysm and procedural planning determine significance.', 'حلقه، فشار، دیورتیکول کومرل، آنوریسم و برنامه مداخله اهمیت را تعیین می کنند.'),
    },
  ],
}

function localize(value, lang) {
  if (value && typeof value === 'object' && !Array.isArray(value) && 'de' in value) return value[lang] || value.de
  return value
}

function useCopy() {
  const { lang: contextLang } = useLanguage()
  const [urlLang, setUrlLang] = useState(null)

  useEffect(() => {
    const readUrlLang = () => {
      const value = new URLSearchParams(window.location.search).get('lang')
      setUrlLang(['de', 'en', 'fa'].includes(value) ? value : null)
    }
    readUrlLang()
    window.addEventListener('popstate', readUrlLang)
    return () => window.removeEventListener('popstate', readUrlLang)
  }, [])

  const lang = urlLang || contextLang
  const c = value => localize(value, lang)
  return { lang, c, ui: UI[lang] || UI.de }
}

function ReadButton({ isRead, onClick, authError }) {
  const { lang } = useLanguage()
  const copy = UI[lang] || UI.de
  return (
    <div className={styles.readControl}>
      <button type="button" className={`${styles.readButton} ${isRead ? styles.readButtonActive : ''}`} onClick={onClick}>
        <span className={styles.readCheck} aria-hidden="true">{isRead ? '✓' : ''}</span>
        <span>{isRead ? copy.read : copy.mark}</span>
      </button>
      {authError && <div className={styles.readError} role="alert"><span>{copy.error}</span><Link href="/sign-in">{copy.signIn}</Link></div>}
    </div>
  )
}

function Table({ headers, rows }) {
  const { lang, c } = useCopy()
  return (
    <div className={styles.tableWrap} dir={lang === 'fa' ? 'rtl' : 'ltr'}>
      <table className={styles.table}>
        <thead><tr>{headers.map(header => <th key={c(header)}>{c(header)}</th>)}</tr></thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>{row.map((cell, cellIndex) => <td key={`${rowIndex}-${cellIndex}`}>{c(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Cards({ items }) {
  const { c } = useCopy()
  return (
    <div className={styles.cardsGrid}>
      {items.map(item => (
        <article className={styles.infoCard} key={c(item.title)}>
          <h3>{c(item.title)}</h3>
          <p>{c(item.text)}</p>
        </article>
      ))}
    </div>
  )
}

function Callout({ type = 'note', label, children }) {
  return (
    <div className={`${styles.callout} ${type === 'cave' ? styles.cave : ''}`.trim()}>
      <strong>{label}</strong>
      <p>{children}</p>
    </div>
  )
}

function Section({ id, title, lead, children }) {
  const isMobile = useMobileLearningLayout()
  const [open, setOpen] = useState(true)

  useEffect(() => setOpen(!isMobile), [isMobile, id])

  return (
    <section id={id} className={styles.section}>
      <button className={styles.sectionHeader} type="button" onClick={() => setOpen(value => !value)} aria-expanded={open}>
        <h2>{title}</h2>
        <span>{open ? '−' : '+'}</span>
      </button>
      {open && <div className={styles.sectionBody}>{lead && <p className={styles.lead}>{lead}</p>}{children}</div>}
    </section>
  )
}

export default function AortenbogenPage() {
  const { lang, c, ui } = useCopy()
  const isRTL = lang === 'fa'
  const [activeId, setActiveId] = useState(LESSON.sections[0].id)
  const { isRead, toggleRead, authError } = useLessonReadStatus('aortenbogen')
  const sectionIds = useMemo(() => LESSON.sections.map(section => section.id), [])
  const withLang = href => lang === 'de' ? href : (href.includes('?') ? `${href}&lang=${lang}` : `${href}?lang=${lang}`)

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const element = document.getElementById(id)
      if (!element) return null
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) setActiveId(id)
      }, { rootMargin: '-18% 0px -72% 0px', threshold: 0.01 })
      observer.observe(element)
      return observer
    })
    return () => observers.forEach(observer => observer?.disconnect())
  }, [sectionIds])

  return (
    <main className={styles.page} dir={isRTL ? 'rtl' : 'ltr'} lang={lang}>
      <InProgressBanner lang={lang} />
      <header className={styles.header}>
        <div className={styles.breadcrumb}>
          <Link href={withLang('/')}>RadYar</Link><span>›</span>
          <Link href={withLang('/lernen/thorax')}>{ui.breadcrumbThorax}</Link><span>›</span>
          <span>{ui.breadcrumbChapter}</span>
        </div>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <span className={styles.sourceBadge}>{ui.sourceLabel}</span>
            <h1>{c(LESSON.title)}</h1>
            <p>{c(LESSON.subtitle)}</p>
            <div className={styles.actions}>
              <Link href={withLang('/lernen/thorax')} className={styles.actionBtn}>{ui.back}</Link>
            </div>
          </div>
          <div className={styles.heroStats}>
            {LESSON.heroCards.map(card => (
              <div className={styles.heroStat} key={c(card.label)}>
                <strong>{c(card.value)}</strong><span>{c(card.label)}</span><small>{c(card.text)}</small>
              </div>
            ))}
          </div>
        </div>
      </header>

      <div className={styles.readBar}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sideTitle}>{ui.toc}</div>
          {LESSON.sections.map(section => (
            <button
              type="button"
              key={section.id}
              className={`${styles.sideItem} ${activeId === section.id ? styles.sideItemActive : ''}`}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              <span className={styles.sideMarker} aria-hidden="true" />
              <strong>{c(section.label)}</strong>
            </button>
          ))}
        </aside>

        <div className={styles.main}>
          <Section id="normal" title={c(LESSON.normal.title)} lead={c(LESSON.normal.lead)}>
            <div className={styles.figureGrid}>
              <Table headers={LESSON.normal.headers} rows={LESSON.normal.rows} />
              <figure className={styles.figure}>
                <Image src="/aortenbogen/normal-aortenbogen.svg" alt={c(L('Schema normaler Aortenbogen', 'Diagram of a normal aortic arch', 'شماتیک قوس طبیعی آئورت'))} width={960} height={560} priority />
                <figcaption>{c(L('Normales Drei-Gefäß-Muster mit linksseitigem Aortenbogen.', 'Normal three-vessel pattern with a left-sided aortic arch.', 'الگوی طبیعی سه شاخه با قوس آئورت چپ.'))}</figcaption>
              </figure>
            </div>
            <Callout label={ui.keyLabel}>{c(LESSON.normal.key)}</Callout>
          </Section>

          <Section id="abgaenge" title={c(LESSON.branches.title)} lead={c(LESSON.branches.lead)}>
            <Cards items={LESSON.branches.items} />
          </Section>

          <Section id="varianten" title={c(LESSON.variants.title)} lead={c(LESSON.variants.lead)}>
            <figure className={styles.figure}>
              <Image src="/aortenbogen/aortenbogen-varianten.svg" alt={c(L('Schema wichtiger Aortenbogenvarianten', 'Diagram of key aortic arch variants', 'شماتیک واریانت های مهم قوس آئورت'))} width={1200} height={760} />
              <figcaption>{c(L('Varianten nach Ursprung, Seitenlage und Beziehung zu Trachea/Ösophagus einordnen.', 'Classify variants by origin, arch side and relation to trachea/oesophagus.', 'واریانت ها را بر اساس منشا، سمت قوس و ارتباط با تراشه/مری طبقه بندی کنید.'))}</figcaption>
            </figure>
            <Table headers={LESSON.variants.headers} rows={LESSON.variants.rows} />
          </Section>

          <Section id="ringe" title={c(LESSON.rings.title)} lead={c(LESSON.rings.lead)}>
            <Cards items={LESSON.rings.items} />
            <Callout type="cave" label={ui.caveLabel}>{c(LESSON.rings.cave)}</Callout>
          </Section>

          <Section id="bildgebung" title={c(LESSON.imaging.title)} lead={c(LESSON.imaging.lead)}>
            <Cards items={LESSON.imaging.items} />
          </Section>

          <Section id="befundung" title={c(LESSON.reporting.title)} lead={c(LESSON.reporting.lead)}>
            <Cards items={LESSON.reporting.items} />
            <Callout label={ui.keyLabel}>{c(LESSON.reporting.key)}</Callout>
          </Section>

          <Section id="fallstricke" title={c(LESSON.pitfalls.title)} lead={c(LESSON.pitfalls.lead)}>
            <Cards items={LESSON.pitfalls.items} />
          </Section>

          <Section id="takehome" title={c(L('Take home message', 'Take home message', 'جمع بندی'))}>
            <div className={styles.takeHomeGrid}>
              {LESSON.takehome.map((item, index) => (
                <div className={styles.takeHomeItem} key={c(item.title)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{c(item.title)}</h3><p>{c(item.text)}</p></div>
                </div>
              ))}
            </div>
          </Section>

          <div className={styles.readBarBottom}><ReadButton isRead={isRead} onClick={toggleRead} authError={authError} /></div>
        </div>
      </div>
    </main>
  )
}
