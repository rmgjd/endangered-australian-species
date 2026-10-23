const charts = [
  ['01','01_group_counts'],['02','02_status_heatmap'],['03','03_status_mosaic'],
  ['04','04_group_treemap'],['05','05_bird_decline_map'],['06','06_listings_symbol_map'],
  ['07','07_priority_places_map'],['08','08_state_intersections'],
  ['09','09_monitored_declines'],['10','10_priority_coverage'],['11','11_birds_mammals_states'],
  ['12','12_parrot_seasonal_flow']
];
const version = '20261023-hd-callouts-2';
const views = new Map();

async function renderCharts(){
  if(typeof vegaEmbed !== 'function'){
    document.querySelectorAll('.chart').forEach(el=>{el.innerHTML='<p class="chart-error">The chart library could not load. Check your connection and reload the page.</p>'});
    return;
  }
  await Promise.all(charts.map(async ([id,name])=>{
    const el=document.getElementById('chart-'+id);
    if(!el)return;
    try{
      const response=await fetch('specs/'+name+'.json?v='+version);
      if(!response.ok)throw new Error('Specification unavailable');
      const spec=await response.json();
      if(id==='01'){
        if(spec.layer)spec.layer.forEach(layer=>{if(layer.encoding?.x?.field==='count')layer.encoding.x.axis={tickCount:5}});
        else spec.encoding.x.axis={tickCount:5};
      }
      if(id==='11'){
        if(spec.layer)spec.layer.forEach(layer=>{if(layer.encoding?.x?.field==='count')layer.encoding.x.axis={tickCount:5}});
        else spec.encoding.x.axis={tickCount:5};
      }
      if(id==='09')spec.layer.forEach(layer=>{
        if(layer.encoding?.x?.field==='decline_pct'){
          layer.encoding.x.axis={tickCount:5};
          if(el.clientWidth<420)layer.encoding.x.title='Decline since 1985 (%)';
        }
      });
      // Give concatenated charts their actual plot width, including axis space.
      if(id==='08')spec.vconcat.forEach(panel=>{panel.width=Math.max(180,el.clientWidth-62)});
      if(id==='03' && el.clientWidth<420)Object.assign(spec.layer[1].mark,{angle:-50,align:'left'});
      if(id==='04' && spec.usermeta?.mobileTreemapValues){
        if(el.clientWidth<420)spec.data.values=spec.usermeta.mobileTreemapValues;
        spec.height=el.clientWidth<420?280:330;
        spec.layer[1].mark.fontSize=el.clientWidth<420?11:13;
        spec.layer[2].mark.fontSize=el.clientWidth<420?10:12;
        if(el.clientWidth<420){
          spec.layer[1].encoding.text.field='shortGroup';
          spec.data.values.forEach(row=>{
            row.detail=row.count+' · '+(row.share*100).toFixed(1)+'%';
            row.shortGroup={Amphibians:'Amphib.',Invertebrates:'Inverts.'}[row.group]||row.group;
          });
        }
      }
      if(id==='10'){
        spec.width=Math.min(660,el.clientWidth-20);
        spec.height=spec.width*5/22;
      }
      if(id==='05'){
        spec.height=Math.min(430,Math.max(270,el.clientWidth*.8));
        if(el.clientWidth<420)spec.layer.forEach(layer=>{if(layer.mark?.type==='text')layer.mark.fontSize=10});
      }
      if(id==='06'||id==='07'){
        const mapHeight=Math.min(360,Math.max(270,el.clientWidth*.8));
        const mapWidth=Math.max(200,el.clientWidth-16);
        if(id==='06')Object.assign(spec,{width:mapWidth,height:mapHeight});
        else if(spec.vconcat){
          Object.assign(spec.vconcat[0],{width:mapWidth,height:mapHeight});
          spec.vconcat[1].width=mapWidth;
        }else Object.assign(spec,{width:mapWidth,height:mapHeight});
        el.style.minHeight='0';
      }
      if(id==='12'){
        spec.height=el.clientWidth<420?330:430;
        if(el.clientWidth<420)spec.layer.forEach(layer=>{if(layer.mark?.type==='text')layer.mark.fontSize=10});
      }
      views.get(id)?.finalize();
      const result=await vegaEmbed(el,spec,{actions:false,renderer:'svg',hover:true});
      views.set(id,result.view);
    }catch(err){console.error(name,err);el.innerHTML='<p class="chart-error">This chart could not load. Its data and specification are linked in the page source.</p>'}
  }));
  document.querySelectorAll('.map-pair,.status-pair').forEach(pair=>{
    const elements=[...pair.querySelectorAll('.chart')];
    elements.forEach(el=>{el.style.minHeight='0'});
    if(window.innerWidth>760 && elements.every(el=>el.querySelector('svg'))){
      const commonHeight=Math.ceil(Math.max(...elements.map(el=>el.getBoundingClientRect().height)));
      elements.forEach(el=>{el.style.minHeight=commonHeight+'px'});
    }
  });
}

window.addEventListener('load',renderCharts);
let resizeTimer;
let previousWidth=window.innerWidth;
window.addEventListener('resize',()=>{
  if(window.innerWidth===previousWidth)return;
  previousWidth=window.innerWidth;
  clearTimeout(resizeTimer);
  resizeTimer=setTimeout(renderCharts,180);
});

