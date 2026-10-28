import {migrateSourceAnnotations} from './sourceRevisions.js';
import {useEffect,useState} from 'react';
const KEY='radyar.fatima.mhba.v1';
export const defaults={version:1,highlights:[],review:{},answers:{},exams:{},read:{},lastLesson:1,fontSize:19,annotation:{tool:'highlight',color:'yellow'},practice:{}};
export function useNotebook(){
 const [data,setData]=useState(()=>{try{const v=migrateSourceAnnotations(JSON.parse(localStorage.getItem(KEY)));return v?.version===1?{...defaults,...v}:defaults;}catch{return defaults;}});
 const [storageError,setStorageError]=useState(false);
 useEffect(()=>{try{localStorage.setItem(KEY,JSON.stringify(data));setStorageError(false);}catch{setStorageError(true);}},[data]);
 const patch=updater=>setData(prev=>typeof updater==='function'?updater(prev):{...prev,...updater});
 return [data,patch,storageError];
}
