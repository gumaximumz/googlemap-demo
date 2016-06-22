'use stict'
class Map {
    constructor() {
        this._getPointUrl = null;
        this._getPolygonUrl = null;
        this._getStationUrl = null;
        this._getUrlCircle = null;
        this._getUrlRectangle = null;
        this.saveRectangleUrl = null;
        this.savePolygonUrl = null;
        this.saveCircleUrl = null;
        this.clear = null;
        this.btnClear = $('#Clear');
        this.btnDrawing = $('#Create');
        this.btnEdit = $('#edit');
        this.circles = [];
        this.btnCircle = $('#Circle');
        this.btnPolygon = $('#Polygon');
        this.btnRectangle = $('#Rectangle');
        this.gMap = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 13.232323, lng: 100.644 },
            zoom: 8
        });
    }

    get getRectangleUrl() {
        return this._getUrlRectangle;
    }

    set getRectangleUrl(value) {
        this._getUrlRectangle = value;
    }

    get getPolygonUrl() {
        return this._getPolygonUrl;
    }

    set getPolygonUrl(value) {
        this._getPolygonUrl = value;
    }

    get getCircleUrl() {
        return this._getUrlCircle;
    }

    set getCircleUrl(value) {
        this._getUrlCircle = value;
    }

    init() {
        var me = this;

        $.get(this.getPolygonUrl, function (points) {
            me.addPolygon(points);
        });


        $.get(this.getCircleUrl, function (points) {
            me.addCircle(points);
        })

        $.get(this.getRectangleUrl, function (points) {
            me.addRectangle(points);
        })

        me.btnClear.click(() => {
            $.get(me.clear)
            location.reload();
        });

        me.btnEdit.click(() => {
            me.drawingMode(null)
        });

        me.btnDrawing.click(() => {
            me.createDrawing()
        });

        me.btnCircle.click(() => {
            me.drawingMode(google.maps.drawing.OverlayType.CIRCLE)
        }
        );

        me.btnPolygon.click(() => {
            me.drawingMode(google.maps.drawing.OverlayType.POLYGON)
        });

        me.btnRectangle.click(() => {
            me.drawingMode(google.maps.drawing.OverlayType.RECTANGLE)
        });

    }

    addCircle(beacon) {
        if (beacon == null) return;
        var me = this;
        for (var i = 0; i < beacon.length; i++) {
            var circle = new google.maps.Circle({
                strokeColor: '#00FF00',
                strokeOpacity: 0.8,
                fillColor: '#FF00FF',
                fillOpacity: 0.35,
                map: me.gMap,
                center: new google.maps.LatLng(Number(beacon[i].lat), Number(beacon[i].lng)),
                radius: Number(beacon[i].radius)
            });
            var contentString = '<div id="content">' + '<h1 id="firstHeading" class="firstHeading">Beacon worth ' + beacon.creds + ' credits</h1>' + '</div>';

            var beaconinfowindow = new google.maps.InfoWindow({
                content: contentString
            });
            circle.addListener('click', function () {
                beaconinfowindow.open(me.gMap, circle);
            });
        }
    }

    addPolygon(polygons) {
        if (polygons == null) return;
        var me = this;

        for (var i = 0; i < polygons.length; i++) {
            var polygon = new google.maps.Polygon({
                paths: polygons[i].Path,
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                draggable: true
            });
            polygon.setMap(me.gMap);
        }

    }

    addRectangle(Rectangle) {
        var me = this;
        if (Rectangle == null) return;
        for (var i = 0; i < Rectangle.length; i++) {
            var rectangle = new google.maps.Rectangle({
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#0000FF',
                fillOpacity: 0.35,
                map: me.gMap,
                bounds: {
                    north: Rectangle[i].NorthEast.lat,
                    south: Rectangle[i].SouthWest.lat,
                    east: Rectangle[i].NorthEast.lng,
                    west: Rectangle[i].SouthWest.lng
                }
            });
        }
    }



    createDrawing() {
        var me = this;
        me.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: [
                google.maps.drawing.OverlayType.MARKER,
                google.maps.drawing.OverlayType.CIRCLE,
                google.maps.drawing.OverlayType.POLYGON,
                google.maps.drawing.OverlayType.POLYLINE,
                google.maps.drawing.OverlayType.RECTANGLE]
            },
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        me.drawingManager.setMap(me.gMap);
        google.maps.event.addListener(me.drawingManager, 'circlecomplete', me.onCircleComplete);
        google.maps.event.addListener(me.drawingManager, 'rectanglecomplete', me.onRectangleComplete);
        google.maps.event.addListener(me.drawingManager, 'polygoncomplete', me.onPolygonComplete);
    }

    drawingMode(type) {
        var me = this;
        me.drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: type,
            drawingControl: true,
        });

        me.drawingManager.setMap(me.gMap);
        google.maps.event.addListener(me.drawingManager, 'circlecomplete', me.onCircleComplete);
        google.maps.event.addListener(me.drawingManager, 'rectanglecomplete', me.onRectangleComplete);
        google.maps.event.addListener(me.drawingManager, 'polygoncomplete', me.onPolygonComplete);
        //me.addrow();
    }

    onCircleComplete(shape) {
        var me = this;
        if (shape == null || (!(shape instanceof google.maps.Circle))) return;
        var circles = {
            lat: shape.getCenter().lat(),
            lng: shape.getCenter().lng(),
            radius: shape.getRadius()
        };
        $.post('GoogleMap/SaveCircle', { circle: circles },
            function (data) {
                console.log(data);
                addrow(data);
            });
    }

    onRectangleComplete(shape) {
        if (shape == null || (!(shape instanceof google.maps.Rectangle))) return;
        var rectangle = {
            NorthEast: {
                lat: shape.getBounds().getNorthEast().lat(),
                lng: shape.getBounds().getNorthEast().lng()
            },
            SouthWest: {
                lat: shape.getBounds().getSouthWest().lat(),
                lng: shape.getBounds().getSouthWest().lng()
            }
        }

        console.log(rectangle)
        $.post('GoogleMap/SaveRectangle', { rectangle: rectangle },
            function (data) {
                console.log(data);
                addrow(data);
            })
    }

    onPolygonComplete(shape) {
        if (shape == null || (!(shape instanceof google.maps.Polygon))) return;
        var polygons = [];
        for (var i = 0; i < shape.getPath().length; i++) {
            polygons.push({
                lat: shape.getPath().getAt(i).lat(),
                lng: shape.getPath().getAt(i).lng()
            })
        }
        console.log(polygons)
        $.post('GoogleMap/SavePolygon', { polygons: polygons },
            function (data) {
                console.log(data);
                addrow(data);
            })
    }


}

function addrow(data) {
    let datatableDemo = new DatatableDemo();
    datatableDemo.dataTableDemo.row.add(data).draw().node();
}
