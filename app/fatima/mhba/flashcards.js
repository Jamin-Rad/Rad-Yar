import {atomicCards} from './flashcardContent.js';
const definitions={
1:[
 'Ein empfundenes Mangelgefühl.','Ein durch Kaufkraft gedecktes Bedürfnis.','Am Markt wirksam gewordener Bedarf.','Begrenzte Mittel im Verhältnis zu den Bedürfnissen.','Die finanzielle Fähigkeit, Güter zu kaufen.',
 'Die eingesetzten Ressourcen.','Verbrauchte Mittel oder geleistete Anstrengung.','Das erzielte Ergebnis bzw. der wirtschaftliche Zufluss.','Bereits festgelegt.','Ein günstiges Verhältnis zwischen Aufwand und Ertrag.',
 'Die Lehre vom Wirtschaften einzelner Betriebe.','Die Lehre von wirtschaftlichen Zusammenhängen zwischen Wirtschaftssubjekten.','Mehrere Branchen betreffend.','Auf eine einzelne Wirtschaftseinheit bezogen.',
 'Die Aufteilung von Aufgaben auf spezialisierte Personen oder Einheiten.','Die Konkurrenz zwischen Marktteilnehmern.','Das Verhältnis von Output zu eingesetzten Produktionsfaktoren.','Smiths Bild für dezentrale Koordination durch Eigeninteresse und Wettbewerb.','Eine Wirtschaftspolitik, die staatliche Macht durch Lenkung der Wirtschaft stärken will.',
 'Ein Vorteil durch geringere Opportunitätskosten.','Der entgangene Nutzen der besten nicht gewählten Alternative.','Die Konzentration auf bestimmte Tätigkeiten oder Produkte.','Handel ohne bzw. mit möglichst geringen staatlichen Handelshemmnissen.',
 'Ein Mittel zur Begleichung von Verpflichtungen.','Ein gemeinsamer Maßstab für Preise und Werte.','Eine Wirtschaftseinheit, die überwiegend den Eigenbedarf deckt.','Eine Wirtschaftseinheit, die überwiegend für Fremdbedarf produziert.','Eine Wirtschaftseinheit in öffentlicher Trägerschaft.',
 'Der Wettbewerb zwischen bestehenden Konkurrenten.','Ein Käufer von Gütern oder Leistungen.','Ein Anbieter von Vorleistungen oder Waren.','Ein Gut oder eine Leistung, das einen ähnlichen Bedarf anders deckt.','Die Fähigkeit, Vertragsbedingungen zu beeinflussen.',
 'Kosten der Anbahnung, Vereinbarung und Kontrolle eines Austauschs.','Die Kontrolle von Ergebnissen oder vereinbarten Leistungen.','Die Zusammenfassung aufeinanderfolgender Wertschöpfungsstufen in einer Organisation.','Ein durch Regeln oder Normen bedingtes Hindernis der Zusammenarbeit.','Die Freiheit, eigene Entscheidungen zu treffen.',
],
5:[
 'Die rechtliche Organisationsform eines Unternehmens.','Eine an einer Gesellschaft beteiligte Person.','Ohne betragsmäßige Begrenzung.','Jeder Schuldner kann für die ganze noch offene Schuld in Anspruch genommen werden.','Das persönliche Vermögen einer Person.',
 'Das satzungsmäßige Kapital einer GmbH.','Das satzungsmäßige Kapital einer AG.','Ein persönlich haftender Gesellschafter einer KG.','Ein grundsätzlich in seiner Außenhaftung begrenzter Gesellschafter einer KG.',
 'Die interne Leitung des Unternehmens.','Das rechtsgeschäftliche Handeln für das Unternehmen gegenüber Dritten.','Das Leitungsorgan, etwa einer AG.','Das Organ zur Überwachung der Unternehmensleitung.','Die Versammlung der Aktionäre einer AG.','Die Versammlung der Gesellschafter, etwa einer GmbH.',
 'Die grundlegende Verfassung einer Organisation.','Der Beitrag eines Gesellschafters zum Gesellschaftsvermögen.','Eine Pflicht, über die ursprüngliche Einlage hinaus weitere Mittel bereitzustellen.','Ein zurückbehaltener Eigenkapitalbestandteil.','Auf die Förderung der Allgemeinheit ausgerichtet.',
 'Ein Zusammenschluss zur gemeinschaftlichen Förderung seiner Mitglieder.','Ein einem bestimmten Zweck gewidmetes Vermögen.','Eine mitgliedschaftlich organisierte juristische Person des öffentlichen Rechts.','Eine auf Benutzer ausgerichtete öffentlich-rechtliche Einrichtung.',
 'Ein öffentlicher Betrieb innerhalb der allgemeinen Verwaltung.','Ein organisatorisch verselbständigter öffentlicher Betrieb ohne eigene Rechtspersönlichkeit.','Eine Pflicht zur Veröffentlichung bestimmter Unternehmensinformationen.','Preise für Leistungen zwischen verbundenen Einheiten.',
],
};

export function buildFlashcards(lesson){
 const authored=atomicCards[lesson.id];
 if(!authored)return lesson.cards;
 const core=authored.map(card=>({...card,lessonId:lesson.id,official:false,atomic:true,chapterTitle:lesson.chapters.find(c=>c.id===card.chapterId)?.fa}));
 const words=lesson.cards.filter(c=>c.source==='vocabulary').map((card,i)=>({...card,model:definitions[lesson.id][i],atomic:true,official:false}));
 return [...core,...words];
}

export const studyCards=lesson=>lesson.flashcards||lesson.cards;
