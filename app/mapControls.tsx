export function createDatalayerButton(map: google.maps.Map, layer: google.maps.Data, className: string, textContent: string) {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = textContent;
    toggleButton.classList.add(className);

    // Toggle button to show/hide markers
    toggleButton.addEventListener('click', () => {
      if (layer.getMap()) {
        layer.setMap(null);  // Remove the layer
      } else {
        layer.setMap(map);  // Add the layer back
        console.log("layer added");
      }
    });
  
    return toggleButton;
  }