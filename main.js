const charts = [
  ['01','01_group_counts'],['02','02_status_heatmap'],['03','03_status_mosaic'],
  ['04','04_group_treemap'],['05','05_bird_decline_map'],['06','06_listings_symbol_map'],
  ['07','07_priority_places_map'],['08','08_state_intersections'],
  ['09','09_monitored_declines'],['10','10_priority_coverage'],['11','11_birds_mammals_states']
];

async function renderCharts(){
  if(typeof vegaEmbed !== 'function'){
    document.querySelectorAll('.chart').forEach(el=>{el.innerHTML='<p class="chart-error">The chart library could not load. Check your connection and reload the page.</p>'});
    return;
  }
  await Promise.all(charts.map(async ([id,name])=>{
    const el=document.getElementById('chart-'+id);
    try{
      const response=await fetch('specs/'+name+'.json');
      if(!response.ok)throw new Error('Specification unavailable');
      const spec=await response.json();
      await vegaEmbed(el,spec,{actions:false,renderer:'svg',hover:true});
    }catch(err){console.error(name,err);el.innerHTML='<p class="chart-error">This chart could not load. Its data and specification are linked in the page source.</p>'}
  }));
}

window.addEventListener('load',renderCharts);
