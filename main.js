const charts = [
  ['01','01_group_counts'],['02','02_status_heatmap'],['03','03_status_mosaic'],
  ['04','04_group_treemap'],['05','05_bird_decline_map'],['06','06_listings_symbol_map'],
  ['07','07_priority_places_map'],['08','08_state_intersections'],
  ['09','09_monitored_declines'],['10','10_priority_coverage'],['11','11_birds_mammals_states']
];
const version = '20261014-regional-maps-3';
const views = new Map();

async function renderCharts(){
  if(typeof vegaEmbed !== 'function'){
    document.querySelectorAll('.chart').forEach(el=>{el.innerHTML='<p class="chart-error">The chart library could not load. Check your connection and reload the page.</p>'});
    return;
  }
  await Promise.all(charts.map(async ([id,name])=>{
    const el=document.getElementById('chart-'+id);
    try{
      const response=await fetch('specs/'+name+'.json?v='+version);
      if(!response.ok)throw new Error('Specification unavailable');
      const spec=await response.json();
      // Give concatenated charts their actual plot width, including axis space.
      if(id==='08')spec.vconcat.forEach(panel=>{panel.width=Math.max(180,el.clientWidth-62)});
      if(id==='03' && el.clientWidth<420)Object.assign(spec.layer[1].mark,{angle:-50,align:'left'});
      if(id==='10'){
        spec.width=Math.min(660,el.clientWidth-20);
        spec.height=spec.width*5/22;
      }
      if(['05','06','07'].includes(id))spec.height=Math.min(id==='05'?440:340,Math.max(230,el.clientWidth*.85));
      views.get(id)?.finalize();
      const result=await vegaEmbed(el,spec,{actions:false,renderer:'svg',hover:true});
      views.set(id,result.view);
    }catch(err){console.error(name,err);el.innerHTML='<p class="chart-error">This chart could not load. Its data and specification are linked in the page source.</p>'}
  }));
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
