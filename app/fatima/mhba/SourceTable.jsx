import React from 'react';
const numericCell=value=>/^[\d۰-۹.,٫٬٪%+\-−–—]+$/u.test(value);
export default function SourceTable({table,label}){return <div className="source-translated-table"><table><caption>{label} · فارسی</caption><thead><tr>{table.head.map((cell,i)=><th scope="col" key={i}>{cell}</th>)}</tr></thead><tbody>{table.rows.map((cells,i)=><tr key={i}>{cells.map((cell,j)=>{
 const numeric=numericCell(cell);const props={className:numeric?'source-table-number':undefined,dir:numeric?'ltr':undefined};
 return j===0?<th key={j} scope="row" {...props}>{cell}</th>:<td key={j} {...props}>{cell}</td>;
})}</tr>)}</tbody></table></div>;}
