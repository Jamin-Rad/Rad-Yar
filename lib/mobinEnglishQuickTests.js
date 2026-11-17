// New bank IDs preserve earlier written-test results without reinterpreting them.
const vocabulary = [
 ['Zugang / Zutritt','access','acess','acces','excess'],
 ['Passagier / Fahrgast','passenger','pasenger','passanger','passengger'],
 ['Kopfsteinpflaster','cobblestone','cobblston','cobbelstone','cobblestoun'],
 ['Wolkenkratzer','skyscraper','skyscaper','skyscrapper','skyscraber'],
 ['Kathedrale','cathedral','cathedrel','cathredal','cathedralle'],
 ['Blindenhund','guide dog','guyde dog','gied dog','guid dog'],
 ['kämpfte / stritt','fought','fighted','fougt','faught'],
 ['egoistisch','selfish','selfisch','selfesh','selffish'],
 ['Sehenswürdigkeiten','sights and attractions','sites and atractions','sights and attracions','sides and attractions'],
 ['Fähre','ferry','fary','ferri','fery'],
 ['Hafen (britisches Englisch)','harbour','harbur','harber','habour'],
 ['Gebäude','building','bilding','buidling','buildung'],
 ['Fahrer / Fahrerin','driver','drivver','dreiver','drifer'],
 ['Treppe','stairs','staires','stears','stairss'],
 ['sich fortbewegen','to get around','to get arround','to get araund','to get a round'],
 ['einer Meinung sein mit','to agree with','to aggree with','to agre with','to agree whit'],
 ['einsteigen / hineingelangen','to get into','to get intwo','to get innto','to get intu'],
 ['Bahnhof','station','staition','stasion','stattion'],
 ['Multiple Sklerose','multiple sclerosis','multiple scleroses','multipel sclerosis','multiple sklerosis'],
 ['Brücke','bridge','brigde','brige','bridje'],
]
const meaning = [
 ['Money is tight, but I still want to visit the museum. Was bedeutet still hier?','trotzdem','still / leise','auch','nicht mehr'],
 ['The bus has wheelchair access. Welche Aussage passt?','Menschen im Rollstuhl können den Bus benutzen.','Der Bus hat keinen Eingang.','Im Bus ist nur ein Fahrgast erlaubt.','Alle müssen die Treppe benutzen.'],
 ['She is selfish. Welche Erklärung passt?','Sie denkt nur an sich.','Sie kann nicht sehen.','Sie stimmt allen zu.','Sie hat wenig Geld.'],
 ['Welche Wortgruppe bedeutet Verkehrsmittel?','transport','sights and attractions','area','air'],
 ['The skirt is too tight. Was bedeutet tight hier?','zu eng','zu teuer','zu knapp an Geld','zu groß'],
 ['Welche Aussage bedeutet Ich stimme dir zu?','I agree with you.','I fight with you.','I get around with you.','I get into you.'],
 ['I also like the ferry. Was bedeutet also hier?','auch','also / folglich','trotzdem','nur'],
 ['We need fresh air. Was bedeutet air?','Luft','Gebiet','Aufzug','Flughafen'],
 ['A guide dog helps a blind person. Was bedeutet blind?','nicht sehen können','nicht hören können','nicht laufen können','egoistisch sein'],
 ['Welche Wortgruppe bezeichnet die Londoner U-Bahn?','the Tube','the lift','the harbour','the ramp'],
]
const grammar = [
 ['The twins ___ visit the market tomorrow.','are going to','is going to','are going','going to'],
 ['Welche Frage ist vollständig richtig?','Where are you going to stay?','Where you are going to stay?','Where are you going stay?','Where do you going to stay?'],
 ['Is Maya going to buy a ticket? — No, ___.',"she isn't","she doesn't","she not","she aren't"],
 ['Welche Verneinung ist richtig?','We are not going to take the train.','We do not going to take the train.','We are not going take the train.','We not are going to take the train.'],
 ['Are you going to visit the castle? — Yes, ___.','I am',"I'm",'I do','I going'],
 ['He is going to ___ the lift.','use','uses','using','used'],
 ['When ___ your sister going to leave?','is','are','does','do'],
 ['This route is ___ than the other one. (good)','better','best','more good','the better'],
 ['This is ___ view of the three. (beautiful)','the most beautiful','more beautiful','the beautifulest','most beautiful than'],
 ['The bus is not as ___ as a cab.','expensive','more expensive','most expensive','expensiver'],
 ['The new bridge is ___ than the old one. (high)','higher','highest','more higher','the highest'],
 ['Which is ___ museum in this area? (interesting)','the most interesting','more interesting','the interestingest','most interesting than'],
 ['Money is ___ this month than last month. (tight)','tighter','tightter','tightest','more tighter'],
 ['This is ___ idea of all. (bad)','the worst','the worse','the baddest','worse'],
 ['The park is ___ than the busy street. (relaxing)','more relaxing','relaxinger','most relaxing','the more relaxing'],
 ['What ___ after school? (you / do; Plan)','are you going to do','you are going to do','do you going to do','are you going do'],
 ['The children ___ buy any flowers. (Verneinung)',"aren't going to","isn't going to","don't going to","aren't going"],
 ['Are Ben and Mia going to come? — Yes, ___.','they are',"they're",'they do','they going'],
 ['Welche Frage ist korrekt?','Is your brother going to catch the ferry?','Does your brother going to catch the ferry?','Is going your brother to catch the ferry?','Are your brother going to catch the ferry?'],
 ['I ___ the museum tomorrow. (visit; Plan)','am going to visit','am going to visiting','going to visit','am go to visit'],
 ['Is Sam going to walk? — No, ___.',"he isn't","he doesn't","he aren't","he not is"],
 ['They are going to ___ at the station.','meet','meets','meeting','met'],
 ['Taking the lift is ___ than using the stairs. (easy)','easier','easyer','more easier','easiest'],
 ['This is ___ market in town. (big)','the biggest','the bigest','bigger','the most biggest'],
 ['This journey is ___ than yesterday’s. (bad)','worse','worst','badder','more bad'],
 ['The museum is ___ than the station. (nice)','nicer','more nicer','nicest','the nicer'],
 ['Our hotel is as ___ as yours. (small)','small','smaller','smallest','more small'],
 ['That is ___ stop on our trip. (important)','the most important','the more important','importantest','most important than'],
 ['This station is ___ than the one near the park. (busy)','busier','busyer','busiest','more busier'],
 ['Of these three routes, this one is ___. (good)','the best','better','the better','the most good'],
]
function question(row, id, group, index) {
 const [prompt, answer, ...wrong] = row
 const options = [answer, ...wrong]
 const shift = (index * 7 + Math.floor(index / 4)) % 4
 return { id, group, prompt, answer, options: [...options.slice(shift), ...options.slice(0, shift)], explain: `Richtig: ${answer}.` }
}
export const NOVEMBER_QUICK_TESTS = [0, 1].map(t => {
 const words = vocabulary.slice(t * 10, t * 10 + 10).map((r,i)=>question([`Welche Schreibweise bedeutet „${r[0]}“?`,...r.slice(1)],`quick-${t}-spell-${i}`,'Rechtschreibung',i+t))
 const meanings = meaning.slice(t * 5, t * 5 + 5).map((r,i)=>question(r,`quick-${t}-meaning-${i}`,'Bedeutung im Kontext',i+2+t))
 const rules = grammar.slice(t * 15, t * 15 + 15).map((r,i)=>question(r,`quick-${t}-grammar-${i}`,'Grammatik',i+1+t))
 // Alternate skills rather than putting all grammar questions at the end.
 const questions = rules.flatMap((q,i)=>[q, i%3===2 ? meanings[Math.floor(i/3)] : words[i-Math.floor(i/3)]])
 return { id:`nov18-quick-${t+1}`,title:`Mixed Test ${t+1}`,kind:'test',description:'30 schwierige Multiple-Choice-Fragen · Wortschatz, Schreibweise & Grammatik',questions }
})
