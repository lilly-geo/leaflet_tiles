const map = L.map('map', {
    center: [38.3, -97], // [latitude, longitude]
    zoom: 5, // 0 = whole world, ~18-19 = street level
    zoomControl: false // removes the plus/minus buttons
});

const streets = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19, 
    attribution: 'Tiles &copy; Esri'
})

const satellite = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 16,
	attribution: 'Tiles &copy; <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

const topo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 16,
	attribution: 'Tiles &copy; <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});

const cdb_dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key={apikey}', {
	attribution: 'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20,
	apikey: 'cb1_4uo4_1_1e523474189b433f09ba1f59'
});

const nasa_night = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
});

const cdb_street = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key={apikey}', {
	attribution: 'Tiles &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 20,
	apikey: 'cb1_4uo4_1_1e523474189b433f09ba1f59'
});

const forthos = L.tileLayer('https://data.geopf.fr/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=ORTHOIMAGERY.ORTHOPHOTOS&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: 'Tiles &copy; <a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 19,
	format: 'image/jpeg',
	style: 'normal'
});

const tpo_grey = L.tileLayer('https://sgx.geodatenzentrum.de/wmts_topplus_open/tile/1.0.0/web_grau/default/WEBMERCATOR/{z}/{y}/{x}.png', {
	maxZoom: 18,
	attribution: 'Tiles &copy; <a href="https://www.bkg.bund.de">Federal Agency for Cartography and Geodesy (BKG), Germany</a>'
});

const natgeo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}).addTo(map);   // on by default

const watercolor = L.tileLayer('https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key={apikey}', {
    attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 16,   // Watercolor has missing tiles above zoom 16
    apikey: '0f13d5c0-5751-4b21-92c6-dd80a7425043'
});

// Create the control with all layers
L.control.layers(
    { "Esri Nat Geo": natgeo, "Esri Streets": streets,
        "USGS Satellite": satellite, "USGS Topography": topo,
        "CartoDB Dark Matter": cdb_dark, "CartoDB Voyager": cdb_street,
        "GIBS NASA Earth at Night": nasa_night, "France Orthoimagery": forthos,
        "Top Plus Open Grey": tpo_grey, "Stadia Stamen Watercolor": watercolor
     },
).addTo(map);

// ---- Info window ----
const tileInfo = {
    "Esri Nat Geo": {
        desc: "A National Geographic-style reference map with a hand-drawn look, showing place names and boundaries.",
        provider: "Esri", url: "https://www.esri.com"
    },
    "Esri Streets": {
        desc: "A street map of the world showing roads, cities, parks and points of interest.",
        provider: "Esri", url: "https://www.esri.com"
    },
    "USGS Satellite": {
        desc: "Satellite imagery of the United States, with no labels.",
        provider: "U.S. Geological Survey (USGS)", url: "https://www.usgs.gov"
    },
    "USGS Topography": {
        desc: "A topographic map with contour lines, water features and land cover from The National Map.",
        provider: "U.S. Geological Survey (USGS)", url: "https://www.usgs.gov"
    },
    "CartoDB Dark Matter": {
        desc: "A dark-mode basemap with light labels, popular for data visualizations that need to stand out.",
        provider: "CARTO", url: "https://carto.com"
    },
    "CartoDB Voyager": {
        desc: "A clean, modern street basemap with soft colors and clear labels.",
        provider: "CARTO", url: "https://carto.com"
    },
    "GIBS NASA Earth at Night": {
        desc: "NASA's VIIRS 'Black Marble' view of Earth at night, showing city lights from space (2012 composite).",
        provider: "NASA Global Imagery Browse Services (GIBS)", url: "https://earthdata.nasa.gov/gibs"
    },
    "France Orthoimagery": {
        desc: "High-resolution aerial photographs (orthophotos), with the best coverage over France.",
        provider: "Geoportail (IGN France)", url: "https://www.geoportail.gouv.fr"
    },
    "Top Plus Open Grey": {
        desc: "A grayscale, low-contrast basemap of Germany and Europe that works well as a quiet background for other data.",
        provider: "Federal Agency for Cartography and Geodesy (BKG), Germany", url: "https://www.bkg.bund.de"
    },
    "Stadia Stamen Watercolor": {
    desc: "A hand-painted look with watercolor design and a paper texture.",
    provider: "Stamen Design (hosted by Stadia Maps)", url: "https://stamen.com"
    }
};
 
const infoWindow = L.control({ position: 'bottomleft' });
 
infoWindow.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info-window');
    // keep clicks/scrolls on the box from moving the map
    L.DomEvent.disableClickPropagation(this._div);
    L.DomEvent.disableScrollPropagation(this._div);
    return this._div;
};
 
infoWindow.update = function (name) {
    const info = tileInfo[name];
    this._div.innerHTML = info
        ? `<h4>${name}</h4>
           <p>${info.desc}</p>
           <p class="provider">Provider: <a href="${info.url}" target="_blank" rel="noopener">${info.provider}</a></p>`
        : '';
};
 
infoWindow.addTo(map);
infoWindow.update("Esri Nat Geo"); // the layer that is on by default
 
// Update whenever a different base layer is chosen
map.on('baselayerchange', function (e) {
    infoWindow.update(e.name);
});
 