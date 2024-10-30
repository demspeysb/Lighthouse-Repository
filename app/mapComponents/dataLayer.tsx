export class dataLayer {
    dataFile: object;
    style: google.maps.Data.StyleOptions;
    layer: google.maps.Data;

    constructor(dataFile: object, style: google.maps.Data.StyleOptions) {
      this.dataFile = dataFile;
      this.style = style;
      this.layer = new google.maps.Data();
      this.layer.addGeoJson(this.dataFile);
      this.layer.setStyle(this.style);
    }
  
  }
  