const L=(de,en,fa)=>({de,en,fa})
const definition=(id,count,initialFrame,label,extension='jpg')=>({
  id,initialFrame,label,
  frames:Array.from({length:count},(_,index)=>`/caa/exams/radiopaedia/stacks/${id}/${String(index+1).padStart(3,'0')}.${extension}`),
})

export const CAA_EXAM_SERIES={
  '40475-ct':definition('40475-ct',35,8,L('CT · nativ · axial','CT · non-contrast · axial','CT · بدون کنتراست · محوری'),'png'),
  '40475-gre':definition('40475-gre',22,13,L('MRT · T2*-GRE · axial','MRI · T2*-GRE · axial','MRI · T2*-GRE · محوری'),'png'),
  '40475-cta-followup':definition('40475-cta-followup',36,12,L('CT · angiographische Phase · axial','CT · angiographic phase · axial','CT · فاز آنژیوگرافیک · محوری'),'png'),
  '147140-flair':definition('147140-flair',22,10,L('MRT · FLAIR · axial','MRI · FLAIR · axial','MRI · FLAIR · محوری')),
  '147140-swi-minip':definition('147140-swi-minip',80,31,L('MRT · SWI minIP · axial','MRI · SWI minIP · axial','MRI · SWI minIP · محوری'),'jpeg'),
  '147140-swi':definition('147140-swi',80,44,L('MRT · SWI · axial','MRI · SWI · axial','MRI · SWI · محوری')),
  '147140-dwi':definition('147140-dwi',22,9,L('MRT · DWI b1000 · axial','MRI · DWI b1000 · axial','MRI · DWI b1000 · محوری')),
  '147140-adc':definition('147140-adc',23,10,L('MRT · ADC · axial','MRI · ADC · axial','MRI · ADC · محوری')),
  '147140-t1c':definition('147140-t1c',122,48,L('MRT · T1 C+ · axial','MRI · T1 C+ · axial','MRI · T1 C+ · محوری')),
  '58758-ct-axial':definition('58758-ct-axial',51,25,L('CT · nativ · axial','CT · non-contrast · axial','CT · بدون کنتراست · محوری'),'jpeg'),
  '58758-ct-coronal':definition('58758-ct-coronal',63,25,L('CT · nativ · koronal','CT · non-contrast · coronal','CT · بدون کنتراست · کرونال'),'jpeg'),
}

// Explicit per-step whitelists: never accumulate all unlocked sequences.
const STAGE_SERIES={
  'caa-radiopaedia-40475':[
    [],['40475-ct'],['40475-ct'],['40475-gre'],['40475-cta-followup'],[],
  ],
  'caa-radiopaedia-147140':[
    ['147140-flair'],
    ['147140-dwi','147140-adc','147140-flair'],
    ['147140-swi-minip','147140-swi','147140-flair'],
    ['147140-flair','147140-swi-minip','147140-swi','147140-dwi','147140-adc','147140-t1c'],
  ],
  'caa-radiopaedia-58758':[
    ['58758-ct-axial'],
    ['58758-ct-coronal','58758-ct-axial'],
    ['58758-ct-axial','58758-ct-coronal'],
  ],
}

export function getCaseStageSeries(caseId,stageIndex){
  return (STAGE_SERIES[caseId]?.[stageIndex] || []).map(id=>CAA_EXAM_SERIES[id])
}
