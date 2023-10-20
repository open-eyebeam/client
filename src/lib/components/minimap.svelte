<script>
  let minimap;
  let mapSource;
</script>

<style>
  #minimap {
    position: relative;
    width: 200px; 
    height: 120px; 
    top: 30px;
    background: rgba(200, 200, 200, 0.6);
    overflow: hidden;
  }
  .minimap-content {
    position: relative;
    transform: scale(0.15);
  }
  .minimap-content * {
    transform: none !important;
  }
</style>
<div id="map" bind:this={mapSource}>
  <slot></slot>
</div>

<div bind:this={minimap} id="minimap" >
    <div class="minimap-content">
      <slot></slot>
    </div>
</div>

