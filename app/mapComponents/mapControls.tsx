import { DataLayer } from "../mapComponents/dataLayer";
import { toggleLayer } from "../components/Map";

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

export function createDataLayerCheckbox(layerObject: DataLayer) {
  const layerName = layerObject.data.metaData.name;

  // Create the checkbox HTML with a React-friendly handler
  const layerCheckbox = document.createElement("div");
  layerCheckbox.className = "checkbox-wrapper-13";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `layerCheckbox${layerName}`;
  input.name = `layerCheckbox${layerName}`;
  input.onchange = () => toggleLayer(layerObject.layer); // Adjusted to be function-compatible

  const label = document.createElement("label");
  label.htmlFor = `layerCheckbox${layerName}`;
  label.textContent = layerName;

  layerCheckbox.appendChild(input);
  layerCheckbox.appendChild(label);

  // Append to the mapControls div
  return layerCheckbox;
}