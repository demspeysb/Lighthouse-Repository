import { DataLayer } from "./dataLayer";
import { toggleLayer } from "./Map";

/**
 * Creates a button to toggle the visibility of a data layer on a Google Map.
 * The button will either add or remove the specified data layer from the map.
 *
 * @param {google.maps.Map} map - The Google Map instance.
 * @param {google.maps.Data} layer - The data layer to be toggled.
 * @param {string} className - The CSS class name to be applied to the button.
 * @param {string} textContent - The text displayed on the button.
 * @returns {HTMLButtonElement} - The created button element.
 */
export function createDatalayerButton(map: google.maps.Map, layer: google.maps.Data, className: string, textContent: string) {
    const toggleButton = document.createElement("button");
    toggleButton.textContent = textContent;
    toggleButton.classList.add(className);

    // Toggle button to show/hide markers
    toggleButton.addEventListener('click', () => {
      if (layer.getMap()) {
        layer.setMap(null);  // Remove the layer if it is currently visible
      } else {
        layer.setMap(map);  // Add the layer to the map if it is hidden
        console.log("layer added");
      }
    });
  
  return toggleButton;
}

/**
 * Creates a checkbox for toggling the visibility of a data layer.
 * When the checkbox is changed, it triggers the toggleLayer function to update the layer's visibility.
 *
 * @param {DataLayer} layerObject - The DataLayer object containing the layer and its metadata.
 * @returns {HTMLDivElement} - The checkbox wrapper element containing the checkbox and label.
 */
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

  // Return the complete checkbox element to be appended to the map controls
  return layerCheckbox;
}
