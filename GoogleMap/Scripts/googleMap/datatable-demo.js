"strict mode"
class DatatableDemo {
    constructor() {
        this.dataTableDemo = $('#datatable_demo').DataTable(
            {
            columns: [
        { data: 'name' },
        { data: 'north' },
        { data: 'south' },
        { data: 'east' },
        { data: 'west' },
        { data: 'centerlat' },
        { data: 'centerlng' },
        { data: 'radius' },
        { data: 'latlist' },
        { data: 'lnglist' },
            ]}
    );
        this.mydata = [
    {
        "name": "Rectangle-test",
        "north": "100",
        "south": "110",
        "east": "50",
        "west": "60",
        "centerlat": "",
        "centerlng": "",
        "radius": "",
        "latlist": "",
        "lnglist": "",
    },
    {
        "name": "Circle-test",
        "north": "",
        "south": "",
        "east": "",
        "west": "",
        "centerlat": "100",
        "centerlng": "50",
        "radius": "200",
        "latlist": "",
        "lnglist": "",
    },
    {
        "name": "Polygon-test",
        "north": "",
        "south": "",
        "east": "",
        "west": "",
        "centerlat": "",
        "centerlng": "",
        "radius": "",
        "latlist": "100, 110, 120",
        "lnglist": "50, 60, 70",
    }
        ];
    }
    init() {
        let me = this;
        this.createTable(me.mydata);
        $.post('GoogleMap/GetTemp', function (data) {
            console.log(data);
            if (data == null) return;
            me.createTable(data);
        });
    }

    createTable(mydata) {
        let me = this;
        for (var i = 0; i < mydata.length; i++)
        me.dataTableDemo.row.add(mydata[i]).draw().node();
        //me.table = me.dataTableDemo.DataTable({
        //    data: me.mydata,
        //    columns: [
        //{ data: 'name' },
        //{ data: 'north' },
        //{ data: 'south' },
        //{ data: 'east' },
        //{ data: 'west' },
        //{ data: 'centerlat' },
        //{ data: 'centerlng' },
        //{ data: 'radius' },
        //{ data: 'latlist' },
        //{ data: 'lnglist' },
    //]
    //    });
    }
}