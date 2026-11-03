'use strict';
const $=id=>document.getElementById(id);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let embedded=[],active=[],selected=null,pending=null,backupAvailable=false,activeName='Embedded SFDA list';
const dbName='DrugCalculation360SFDA_v1';
function openDB(){return new Promise((resolve,reject)=>{const q=indexedDB.open(dbName,1);q.onupgradeneeded=()=>q.result.createObjectStore('databases');q.onsuccess=()=>resolve(q.result);q.onerror=()=>reject(q.error);});}
async function readStore(key){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('databases','readonly'),r=tx.objectStore('databases').get(key);r.onsuccess=()=>{db.close();resolve(r.result)};r.onerror=()=>{db.close();reject(r.error)};});}
async function writeStore(key,val){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('databases','readwrite');tx.objectStore('databases').put(val,key);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)};});}
async function deleteStore(key){const db=await openDB();return new Promise((resolve,reject)=>{const tx=db.transaction('databases','readwrite');tx.objectStore('databases').delete(key);tx.oncomplete=()=>{db.close();resolve()};tx.onerror=()=>{db.close();reject(tx.error)};});}
function clean(v){return String(v??'').trim();}
function field(row,names){const keys=Object.keys(row);const canon=s=>String(s).toLowerCase().replace(/[^a-z0-9]/g,'');for(const n of names){const k=keys.find(k=>canon(k)===canon(n));if(k&&row[k]!=null)return clean(row[k]);}return '';}
function normalise(row){return {reg:field(row,['reg','registration number','registration no','registration','registrationnumber','sfda registration number','drug registration number','sfda_no']),trade:field(row,['trade','trade name','trade_name','brand','brand name','brandname','drug name','product name','productname','medicine name','medication name']),sci:field(row,['sci','scientific name','scientificname','generic','generic name','genericname','active ingredient','activeingredient']),formRaw:field(row,['formRaw','dosage form','dosageform','form','pharmaceutical form','drug form']),cat:field(row,['cat','category','drug type']),sDisplay:field(row,['sDisplay','strength','strength display','concentration','drug strength']),conc:field(row,['conc','concentration value']),concUnit:field(row,['concUnit','concentration unit']),cVol:field(row,['cVol','volume','pack volume','volume ml']),cpp:field(row,['cpp','content per pack','pack size','packsize','package size','package contents']),upp:field(row,['upp','units per pack']),price:field(row,['price','public price','publicprice','retail price','unit price']),gtin:field(row,['gtin','barcode','ean'])};}
function normalizeRows(rows){if(!Array.isArray(rows))throw Error('Expected an array of medication records.');if(rows.length>150000)throw Error('File exceeds 150,000 records.');const cleaned=rows.map(normalise).filter(r=>r.trade||r.sci);if(!cleaned.length)throw Error('No recognizable drug-name column. Expected Trade Name / Brand / Scientific Name / Generic Name.');return cleaned;}
function showActive(){ $('db-indicator').textContent=active.length ? active.length.toLocaleString()+' medications ready for search' : 'No medications loaded'; $('active-badge').textContent=activeName; $('restore').disabled=!backupAvailable; }
function setSelected(row){selected=row;$('selected').classList.remove('hidden');$('selected').innerHTML=`<b>${esc(row.trade||row.sci)}</b> <span class="sub">${esc(row.sci)} · ${esc(row.formRaw)} · ${esc(row.sDisplay)} · Registration: ${esc(row.reg||'not available')}</span>`;$('strength').value=row.sDisplay||''; const packUnits=Number(row.upp)||Number(row.cpp);$('pack').value=packUnits>0?String(packUnits):'';$('form').value=row.formRaw||'';if(Number(row.price)>0)$('price').value=row.price;else $('price').value='';$('mgml').value='';const inferred=verifiedMgPerMl(row);if(inferred!==null)$('mgml').value=String(inferred); const solid=/tablet|capsule|solid_oral/i.test(row.formRaw+' '+row.cat);$('unit').value=solid?'tablet':'mg';$('dose-extra').classList.toggle('hidden',solid);$('dose-label').textContent=solid?'Prescribed tablets / capsules per dose':'Prescribed amount per dose';refreshFormFields();$('search-results').innerHTML='';$('search').value='';$('drug-info').innerHTML=infoMarkup(row);clearResult();}
function infoMarkup(r){return '<div class="info-table">'+[['Trade name',r.trade],['Scientific name',r.sci],['Registration',r.reg],['Strength',r.sDisplay],['Form',r.formRaw],['Category',r.cat],['Pack contents',r.cpp],['Pack volume (mL)',r.cVol],['Units per pack',r.upp],['Listed price',r.price],['GTIN',r.gtin]].map(([k,v])=>`<span>${esc(k)}</span><b>${esc(v||'Not available')}</b>`).join('')+'</div>';}
let searchTimer;function doSearch(){const q=$('search').value.trim().toLowerCase();if(!q){$('search-results').innerHTML='';return;}const hits=active.filter(r=>[r.trade,r.sci,r.reg,r.gtin].some(v=>String(v||'').toLowerCase().includes(q))).slice(0,15);$('search-results').innerHTML=hits.length?hits.map((r,i)=>`<button class="item" data-hit="${i}"><b>${esc(r.trade||r.sci)}</b><small>${esc(r.sci)} · ${esc(r.sDisplay)} · ${esc(r.reg)}</small></button>`).join(''):'<p class="sub">No matching products in the active list.</p>';hits.forEach((r,i)=>$('search-results').querySelector(`[data-hit="${i}"]`).addEventListener('click',()=>setSelected(r)));}
$('search').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(doSearch,80)});
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-tab]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('[id^="pane-"]').forEach(x=>x.classList.add('hidden'));$('pane-'+b.dataset.tab).classList.remove('hidden');}));
function clearResult(){$('calc-result').innerHTML='';$('quantity-result').textContent='Calculate a prescription to see required quantity, whole packs and optional cost.';}
function reset(){for(const id of ['age','weight','amount','frequency','days','pack','price','mgml','strength','form','search'])$(id).value='';$('mode').value='direct';refreshWeightField();$('unit').value='mg';$('dose-extra').classList.remove('hidden');$('dose-label').textContent='Prescribed amount per dose';selected=null;$('selected').classList.add('hidden');$('search-results').innerHTML='';$('drug-info').textContent='Select a product to display available data.';clearResult();}
$('reset').addEventListener('click',reset);$('clear-calc').addEventListener('click',()=>{for(const id of ['amount','frequency','days','pack','mgml'])$(id).value='';clearResult();});
function positive(id){const s=$(id).value.trim(),n=Number(s);return s!==''&&Number.isFinite(n)&&n>0?n:null;}
function fmt(n){return Number(n).toLocaleString('en-US',{maximumFractionDigits:3});}
// Only interpret explicitly supplied concentration and packaging; never guess drop factors or vial reuse.
function verifiedMgPerMl(row){
 const cu=String(row.concUnit||'').toLowerCase().replace(/\s+/g,'');
 if(Number(row.conc)>0 && /^(mg\/ml|mgperml)$/.test(cu))return Number(row.conc);
 const st=String(row.sDisplay||'');
 const m=st.match(/(\d+(?:\.\d+)?)\s*(mg|g|mcg|µg)\s*\/\s*(\d+(?:\.\d+)?)?\s*m[lL]/i);
 if(!m)return null;
 return Number(m[1])*({g:1000,mg:1,mcg:.001,'µg':.001}[m[2].toLowerCase()]||1)/Number(m[3]||1);
}
function strengthMgPerSolid(row){
 const st=String(row.sDisplay||'');
 if(/\//.test(st)||/\b(combination|plus)\b/i.test(st))return null;
 const m=st.match(/^\s*(\d+(?:\.\d+)?)\s*(mg|g|mcg|µg)\s*$/i);
 if(!m)return null;
 return Number(m[1])*({g:1000,mg:1,mcg:.001,'µg':.001}[m[2].toLowerCase()]||1);
}
function classify(row){const s=(row.formRaw+' '+row.cat).toLowerCase();if(/tablet|capsule|solid_oral/.test(s))return 'solid';if(/injection|injectable|infusion|ampou|vial|syringe/.test(s))return 'injectable';if(/eye drop|ear drop|ophthalmic|otic|drops?/.test(s))return 'drops';if(/solution|suspension|syrup|oral liquid|elixir|liquid/.test(s))return 'liquid';return 'other';}
function refreshFormFields(){
 const kind=selected?classify(selected):'other', unit=$('unit').value;
 const needsConc=(kind==='liquid'||kind==='drops'||kind==='injectable')&&['mg','g','mcg'].includes(unit);
 $('dose-extra').classList.toggle('hidden',!needsConc);
 $('pack').parentElement.querySelector('label').textContent=kind==='solid'?'Tablets / capsules per pack':kind==='liquid'?'Bottle volume (mL)':kind==='drops'?'Bottle volume (mL; not drops)':kind==='injectable'?'Units / vials per pack':'Pack contents (verified matching unit)';
 $('dose-label').textContent=kind==='solid'&&['tablet','capsule'].includes(unit)?'Prescribed tablets / capsules per dose':'Prescribed amount per dose';
 $('pack').value=selected?(kind==='liquid'||kind==='drops'?(Number(selected.cVol)>0?selected.cVol:''):(Number(selected.upp)>0?selected.upp:Number(selected.cpp)>0?selected.cpp:'')):'';
}
$('unit').addEventListener('change',()=>{refreshFormFields();clearResult();});
$('mode').addEventListener('change',()=>{refreshWeightField();clearResult();});
function refreshWeightField(){$('weight-field').classList.toggle('hidden',$('mode').value!=='kg');}
refreshWeightField();
function calculatePrescription(){
 const fail=m=>{$('calc-result').innerHTML='<p class="err">'+esc(m)+'</p>';$('quantity-result').textContent='Calculation unavailable: '+m;};
 if(!selected){fail('Choose a medication from the search results first.');return;}
 const mode=$('mode').value,amount=positive('amount'),w=positive('weight'),freq=positive('frequency'),days=positive('days'),unit=$('unit').value;
 if(!amount){fail('Enter the prescribed amount per dose.');return;}
 if(!freq){fail('Enter how many times the medicine is taken per day.');return;}
 if(!days){fail('Enter treatment duration in days.');return;}
 if(mode==='kg'&&!w){fail('Enter patient weight for the per-kg calculation.');return;}
 const kind=classify(selected),per=amount*(mode==='kg'?w:1),daily=per*freq,total=daily*days;
 const factor={mg:1,g:1000,mcg:.001};
 let quantity=null,quantityUnit='',volume=null,note='',packs=null,cost=null;
 const pack=positive('pack');
 if(kind==='solid'){
  quantityUnit=/tablet/i.test(selected.formRaw)?'tablets':/capsule/i.test(selected.formRaw)?'capsules':'units';
  if((unit==='tablet'&&quantityUnit==='tablets')||(unit==='capsule'&&quantityUnit==='capsules')||(unit==='unit'&&quantityUnit==='units'))quantity=total;
  else if(['tablet','capsule','unit'].includes(unit))note='The prescribed unit does not match the selected product form.';
  else if(unit in factor){const strength=strengthMgPerSolid(selected);if(strength)quantity=total*factor[unit]/strength;else note='Strength is missing or ambiguous. Cannot convert mg to tablets/capsules.';}
  else note='Dose unit is incompatible with this solid product.';
  if(quantity!==null){const perDose=quantity/(freq*days);if(Math.abs(perDose-Math.round(perDose))>1e-7){note='Fractional tablets/capsules require product-specific divisibility verification; pack count withheld.';}}
  if(quantity!==null&&!note&&pack)packs=Math.ceil(quantity/pack);
 }else if(kind==='liquid'){
  quantityUnit='mL';
  if(unit==='mL'){quantity=total;volume=per;}
  else if(unit in factor){const mgml=positive('mgml');if(mgml){quantity=total*factor[unit]/mgml;volume=per*factor[unit]/mgml;}else note='Verified concentration (mg/mL) is required to convert prescribed dose to mL.';}
  else note='For liquids, use mL or a mass unit with verified mg/mL concentration.';
  if(quantity!==null&&!note&&pack)packs=Math.ceil(quantity/pack);
 }else if(kind==='drops'){
  // Drop size is not universal; a mL-to-drop conversion must never be assumed.
  if(unit==='mL'){quantity=total;quantityUnit='mL';volume=per;if(pack)packs=Math.ceil(quantity/pack);}
  else if(unit in factor){const mgml=positive('mgml');if(mgml){quantity=total*factor[unit]/mgml;quantityUnit='mL';volume=per*factor[unit]/mgml;if(pack)packs=Math.ceil(quantity/pack);}else note='Enter verified mg/mL concentration to calculate liquid volume.';}
  else if(unit==='drop'){quantity=total;quantityUnit='drops';note='Drops per mL is product/device-specific. Bottle count cannot be calculated without a verified drop factor.';}
  else note='Incompatible dose unit for drops.';
 }else if(kind==='injectable'){
  if(unit==='vial'){quantity=total;quantityUnit='vials';if(pack)packs=Math.ceil(quantity/pack);}
  else if(unit==='mL'){quantity=total;quantityUnit='mL';volume=per;note='Injectable pack count withheld: vial/ampoule volume, single-use status and dose-level wastage must be verified.';}
  else if(unit in factor){const mgml=positive('mgml');if(mgml){quantity=total*factor[unit]/mgml;quantityUnit='mL';volume=per*factor[unit]/mgml;note='Injectable pack count withheld: verify vial/ampoule volume, reconstitution and single-use wastage.';}else note='Verified injectable concentration (mg/mL) is required; pack count withheld.';}
  else note='Dose unit is incompatible with the selected injectable product.';
 }else{
  note='Product form cannot be reliably classified. Pack calculation withheld until verified product units are available.';
 }
 if(packs!==null&&positive('price'))cost=packs*positive('price');
 const metrics=[['Per administration',fmt(per)+' '+unit],['Daily prescribed total',fmt(daily)+' '+unit],['Course prescribed total',fmt(total)+' '+unit],['Required '+(quantityUnit||'product units'),quantity===null?'Not available':fmt(quantity)+' '+quantityUnit],['Whole packs',packs===null?'Not calculated':fmt(packs)],['Estimated cost',cost===null?'Not available':fmt(cost)+' SAR']];
 if(volume!==null)metrics.push(['Volume per dose',fmt(volume)+' mL']);
 const result='<div class="results">'+metrics.map(([label,value])=>'<span class="metric"><small>'+esc(label)+'</small><b>'+esc(value)+'</b></span>').join('')+'</div>'+(note?'<p class="err">'+esc(note)+'</p>':'')+(packs===null&&!note?'<p class="sub">Whole packs require verified compatible pack contents.</p>':'')+'<p class="sub">Quantity arithmetic only; not a therapeutic dosing recommendation. Verify product strength, administration route and labeling.</p>';
 $('calc-result').innerHTML=result;$('quantity-result').innerHTML=result;
}
$('calculate').addEventListener('click',calculatePrescription);

function parseCsv(text){const rows=[];let row=[],cell='',quoted=false;for(let i=0;i<text.length;i++){const c=text[i];if(quoted){if(c==='"'&&text[i+1]==='"'){cell+='"';i++;}else if(c==='"')quoted=false;else cell+=c;}else if(c==='"')quoted=true;else if(c===','){row.push(cell);cell='';}else if(c==='\n'||c==='\r'){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(x=>x!==''))rows.push(row);row=[];cell='';}else cell+=c;}row.push(cell);if(row.some(x=>x!==''))rows.push(row);if(rows.length<2)throw Error('CSV contains no data rows.');const heads=rows[0].map((h,i)=>h||'Column '+(i+1));return rows.slice(1).map(r=>Object.fromEntries(heads.map((h,i)=>[h,r[i]||''])));}
function parseSpreadsheet(bytes){if(typeof XLSX==='undefined'||!XLSX.read)throw Error('Excel parser is not available.');const wb=XLSX.read(bytes,{type:'array',cellDates:false});const sheet=wb.Sheets[wb.SheetNames[0]];if(!sheet)throw Error('Workbook has no sheets.');return XLSX.utils.sheet_to_json(sheet,{defval:''});}
function parseJson(text){const j=JSON.parse(text);if(Array.isArray(j))return j;if(Array.isArray(j.rows)){if(Array.isArray(j.fields)&&Array.isArray(j.rows[0]))return j.rows.map(r=>Object.fromEntries(j.fields.map((f,i)=>[f,r[i]])));return j.rows;}for(const key of ['drugs','products','medications','data','items'])if(Array.isArray(j[key]))return j[key];throw Error('JSON must contain an array of products or rows.');}
async function parseFile(file){const name=file.name.toLowerCase();if(file.size>90*1024*1024)throw Error('Maximum upload size is 90 MB.');if(name.endsWith('.zip')){if(typeof JSZip==='undefined')throw Error('ZIP parser unavailable.');const z=await JSZip.loadAsync(file);const names=Object.keys(z.files).filter(n=>!z.files[n].dir&&/\.(csv|json|xlsx|xls)$/i.test(n));if(names.length!==1)throw Error('ZIP must contain exactly one supported drug-data file.');const n=names[0];const blob=await z.files[n].async('blob');return parseFile(new File([blob],n));}if(name.endsWith('.csv'))return parseCsv(await file.text());if(name.endsWith('.json'))return parseJson(await file.text());if(/\.xlsx?$/.test(name))return parseSpreadsheet(await file.arrayBuffer());throw Error('Unsupported file type. Use CSV, XLSX, XLS, JSON, or ZIP.');}
$('upload').addEventListener('change',async e=>{pending=null;$('replace').disabled=true;$('preview').innerHTML='';const file=e.target.files?.[0];if(!file)return;$('upload-status').textContent='Reading and validating file…';try{const records=await parseFile(file);const rows=normalizeRows(records);const duplicate=new Set(rows.map(r=>r.reg||r.trade+'|'+r.sci));pending={rows,name:file.name};$('upload-status').innerHTML=`<span class="ok">Validated: ${rows.length.toLocaleString()} recognized products · ${duplicate.size.toLocaleString()} unique identifiers · ${esc(file.name)}</span>`;$('preview').innerHTML='<p class="sub">Preview of first 5 products:</p>'+rows.slice(0,5).map(r=>`<div class="item"><b>${esc(r.trade||r.sci)}</b><small>${esc(r.sci)} · ${esc(r.sDisplay)} · ${esc(r.reg)}</small></div>`).join('');$('replace').disabled=false;}catch(err){$('upload-status').innerHTML=`<span class="err">Import rejected: ${esc(err.message)}</span>`;}});
$('replace').addEventListener('click',async()=>{if(!pending)return;if(!confirm(`Replace the active local drug database with ${pending.rows.length.toLocaleString()} records from ${pending.name}? A backup will be kept. This does not update other users or Netlify files.`))return;try{await writeStore('backup',{name:activeName,rows:activeName==='Embedded SFDA list'?null:active});await writeStore('active',pending);backupAvailable=true;active=pending.rows;activeName=pending.name;pending=null;$('replace').disabled=true;$('upload-status').innerHTML='<span class="ok">Local database replaced successfully.</span>';reset();showActive();}catch(err){$('upload-status').innerHTML=`<span class="err">Replacement failed: ${esc(err.message)}. Previous database remains active.</span>`;}});
$('restore').addEventListener('click',async()=>{const b=await readStore('backup');if(!b)return;if(!confirm('Restore the previous local drug database?'))return;await writeStore('active',b);await deleteStore('backup');backupAvailable=false;active=b.rows||embedded;activeName=b.name||'Embedded SFDA list';reset();showActive();$('upload-status').textContent='Previous database restored.';});
$('default').addEventListener('click',async()=>{if(!confirm('Restore the original embedded drug list for this browser?'))return;await writeStore('backup',{name:activeName,rows:activeName==='Embedded SFDA list'?null:active});await deleteStore('active');backupAvailable=true;active=embedded;activeName='Embedded SFDA list';reset();showActive();$('upload-status').textContent='Embedded drug list restored.';});
(async()=>{try{$('db-indicator').textContent='Loading medication database…';const r=await fetch('sfda-embedded.json',{cache:'no-store'});if(!r.ok)throw Error('Embedded file not found');const j=await r.json();embedded=normalizeRows(j.rows);if(!embedded.length)throw Error('Embedded medication database is empty');const saved=await readStore('active');const backup=await readStore('backup');backupAvailable=!!backup;active=Array.isArray(saved?.rows)&&saved.rows.length?saved.rows:embedded;activeName=saved?.name||'Embedded SFDA list';showActive();}catch(e){$('db-indicator').textContent='Database loading failed: '+e.message+' — check that sfda-embedded.json is deployed alongside this page.';}})();
